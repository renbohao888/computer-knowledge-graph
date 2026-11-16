# 计算机知识体系 · 3D 交互图谱
# 静态站点，用 nginx 托管；镜像里只放运行需要的文件。
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html/index.html
COPY src /usr/share/nginx/html/src

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -qO- http://127.0.0.1/ > /dev/null || exit 1
