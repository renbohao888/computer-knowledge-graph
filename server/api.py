#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""零依赖服务：托管静态页面 + 读写 data/content.json

页面上的「写教程 / 编辑教程」通过这个服务保存，内容进 JSON 文件，
不进代码，也不需要重建镜像。整个应用只需要 python3，没有第三方依赖。

    python3 server/api.py                        # 本机开发，默认 127.0.0.1:8000
    CKG_API_HOST=0.0.0.0 CKG_API_PORT=80 python3 server/api.py   # 容器内

环境变量：
    CKG_DATA_DIR     数据目录（默认 ../data，容器里挂到 /data）
    CKG_STATIC_DIR   静态文件根目录（默认仓库根目录；容器里是 /app）
    CKG_API_HOST     监听地址（默认 127.0.0.1，compose 里设 0.0.0.0）
    CKG_API_PORT     端口（默认 8000，容器里是 80）

接口：
    GET  /api/content   读取全部用户补充内容
    PUT  /api/content   覆盖保存（整体 JSON，原子写入，保留上一版备份）
    GET  /api/health    健康检查
"""
import json
import os
import shutil
import tempfile
import threading
import time
import urllib.parse
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

HERE = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.abspath(os.environ.get("CKG_DATA_DIR") or os.path.join(HERE, "..", "data"))
STATIC_DIR = os.path.abspath(os.environ.get("CKG_STATIC_DIR") or os.path.join(HERE, ".."))
CONTENT_FILE = os.path.join(DATA_DIR, "content.json")
BACKUP_FILE = os.path.join(DATA_DIR, "content.backup.json")
HOST = os.environ.get("CKG_API_HOST") or "127.0.0.1"
PORT = int(os.environ.get("CKG_API_PORT") or 8000)
MAX_BODY = 2 * 1024 * 1024  # 2MB，教程纯文本足够

MIME = {
    ".html": "text/html; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
    ".db": "application/octet-stream",
}

# 允许的内容块字段，和前端 articles.js 的块格式保持一致
BLOCK_KEYS = {"h", "p", "ul", "code", "lang", "tip", "links"}
LOCK = threading.Lock()


def empty_content():
    return {"version": 1, "updatedAt": None, "articles": {}}


def read_content():
    try:
        with open(CONTENT_FILE, encoding="utf-8") as f:
            data = json.load(f)
    except (OSError, ValueError):
        return empty_content()
    if not isinstance(data, dict) or not isinstance(data.get("articles"), dict):
        return empty_content()
    data.setdefault("version", 1)
    data.setdefault("updatedAt", None)
    return data


def validate(data):
    """只做结构校验：body 是对象、articles 是 id→块数组、块字段受控。"""
    if not isinstance(data, dict):
        raise ValueError("body 必须是 JSON 对象")
    articles = data.get("articles")
    if not isinstance(articles, dict):
        raise ValueError("articles 必须是对象")
    if len(articles) > 2000:
        raise ValueError("教程条目过多")
    for node_id, blocks in articles.items():
        if not isinstance(node_id, str) or not node_id.strip():
            raise ValueError("文章 id 非法")
        if not isinstance(blocks, list) or len(blocks) > 500:
            raise ValueError(f"{node_id}: 内容块列表非法")
        for block in blocks:
            if not isinstance(block, dict) or not block:
                raise ValueError(f"{node_id}: 内容块必须是对象")
            unknown = set(block) - BLOCK_KEYS
            if unknown:
                raise ValueError(f"{node_id}: 未知块字段 {','.join(sorted(unknown))}")
            if "links" in block:
                links = block["links"]
                if not isinstance(links, list) or len(links) > 50:
                    raise ValueError(f"{node_id}: links 必须是数组")
                for item in links:
                    if not isinstance(item, dict):
                        raise ValueError(f"{node_id}: 链接格式不对")
                    url = str(item.get("u") or "")
                    if not (url.startswith("http://") or url.startswith("https://")):
                        raise ValueError(f"{node_id}: 链接只允许 http(s)")


def write_content(data):
    """原子写入：先写临时文件再替换；替换前把旧版留作 content.backup.json。"""
    os.makedirs(DATA_DIR, exist_ok=True)
    if os.path.exists(CONTENT_FILE):
        try:
            shutil.copyfile(CONTENT_FILE, BACKUP_FILE)
        except OSError:
            pass
    fd, tmp = tempfile.mkstemp(dir=DATA_DIR, prefix=".content-", suffix=".tmp")
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
            f.write("\n")
        os.replace(tmp, CONTENT_FILE)
    finally:
        if os.path.exists(tmp):
            try:
                os.remove(tmp)
            except OSError:
                pass


class Handler(BaseHTTPRequestHandler):
    server_version = "CKGContent/1.0"
    protocol_version = "HTTP/1.1"

    def _json(self, code, obj):
        body = json.dumps(obj, ensure_ascii=False).encode("utf-8")
        self.send_response(code)
        self.send_header("content-type", "application/json; charset=utf-8")
        self.send_header("cache-control", "no-store")
        self.send_header("content-length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        path = self.path.split("?")[0].rstrip("/")
        if path == "/api/content":
            self._json(200, read_content())
        elif path == "/api/health":
            self._json(200, {"ok": True, "file": CONTENT_FILE})
        elif path.startswith("/api/"):
            self._json(404, {"error": "not found"})
        else:
            self._static(self.path)

    def _static(self, raw_path):
        """静态文件 + 单页应用回退：找不到的路径一律回 index.html。"""
        rel = urllib.parse.unquote(raw_path.split("?")[0]).lstrip("/")
        target = os.path.abspath(os.path.join(STATIC_DIR, rel or "index.html"))
        if not target.startswith(STATIC_DIR):
            self._json(403, {"error": "forbidden"})
            return
        if not os.path.isfile(target):
            target = os.path.join(STATIC_DIR, "index.html")
        try:
            with open(target, "rb") as f:
                body = f.read()
        except OSError:
            self._json(404, {"error": "not found"})
            return

        ext = os.path.splitext(target)[1].lower()
        no_cache = ext in (".html", ".js", ".css", ".json")
        self.send_response(200)
        self.send_header("content-type", MIME.get(ext, "application/octet-stream"))
        self.send_header("cache-control", "no-cache" if no_cache else "public, max-age=604800")
        self.send_header("content-length", str(len(body)))
        self.send_header("x-content-type-options", "nosniff")
        self.end_headers()
        self.wfile.write(body)

    def do_PUT(self):
        try:
            length = int(self.headers.get("content-length") or 0)
        except ValueError:
            length = 0
        if length <= 0:
            return self._json(400, {"error": "请求体为空"})
        if length > MAX_BODY:
            return self._json(413, {"error": "内容超过 2MB"})

        raw = self.rfile.read(length)
        try:
            data = json.loads(raw.decode("utf-8"))
            validate(data)
        except (ValueError, UnicodeDecodeError) as exc:
            return self._json(400, {"error": str(exc)})

        data["version"] = 1
        data["updatedAt"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
        with LOCK:
            write_content(data)
        self._json(200, {"ok": True, "updatedAt": data["updatedAt"]})

    def log_message(self, fmt, *args):
        print("[api] " + (fmt % args))


def main():
    server = ThreadingHTTPServer((HOST, PORT), Handler)
    print(f"页面 → http://{HOST}:{PORT}/  (静态目录 {STATIC_DIR})")
    print(f"内容 API → http://{HOST}:{PORT}/api/content  (数据目录 {DATA_DIR})")
    server.serve_forever()


if __name__ == "__main__":
    main()
