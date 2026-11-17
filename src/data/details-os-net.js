/* ============================================================
 * 节点内部详细拆解：操作系统 / 网络 / 接入
 * 结构：KB.DETAILS[节点id] = { groups: [{ name, items: [{ name, desc }] }] }
 * 有这份数据的节点，进入内部 3D 时用它替换 nodes*.js 里简略的 children。
 * ============================================================ */
window.KB = window.KB || {};
KB.DETAILS = KB.DETAILS || {};

KB.DETAILS.linux = { groups: [
  { name: '文件与目录', items: [
    { name: 'ls / cd / pwd', desc: '列目录、切换、打印当前路径；ls -lah 是日常起手式。' },
    { name: 'mkdir / rmdir / rm', desc: '建目录、删空目录、递归删除；rm -rf 是事故高发区。' },
    { name: 'cp / mv / ln', desc: '复制、移动改名、硬链接与软链接的区别。' },
    { name: 'find / locate', desc: '按名字、大小、时间、权限找文件；配合 -exec 批量处理。' },
    { name: 'stat / file / tree', desc: '看 inode 元信息、判断文件真实类型、树状浏览目录。' },
    { name: '重定向与管道', desc: '> >> 2> 与 | 的组合，把命令串成流水线。' },
    { name: '环境变量与 PATH', desc: 'export、/.bashrc、命令找不到时先查 PATH。' },
    { name: 'tar / gzip / zip', desc: '打包与压缩；tar -xzvf 解压、-czvf 打包。' }
  ] },
  { name: '文本处理', items: [
    { name: 'cat / less / head / tail', desc: '查看文件；tail -f 跟日志是运维基本动作。' },
    { name: 'grep / egrep', desc: '按正则过滤行；-r 递归、-n 行号、-v 反选。' },
    { name: 'sed', desc: '流式替换与删除；sed -i 直接改文件前先备份。' },
    { name: 'awk', desc: '按列处理文本、统计求和；日志分析的主力。' },
    { name: 'sort / uniq / wc', desc: '排序、去重、计数；sort | uniq -c 是频率统计套路。' },
    { name: 'cut / tr / xargs', desc: '切列、字符替换、把输入变成命令行参数。' },
    { name: 'diff / patch', desc: '比较文件差异、打补丁；看配置改了什么。' }
  ] },
  { name: '权限与用户', items: [
    { name: 'chmod / chown / chgrp', desc: 'rwx 三段权限、数字表示法、属主与属组。' },
    { name: 'umask', desc: '新建文件的默认权限掩码，决定为什么是 644/755。' },
    { name: 'SUID / SGID / 粘滞位', desc: 'passwd 为什么能改 shadow；/tmp 为什么人人可写却删不了别人的文件。' },
    { name: 'sudo / su', desc: '提权的两种方式；sudoers 配置与最小权限。' },
    { name: 'useradd / usermod / passwd', desc: '账号、用户组、密码策略；/etc/passwd 与 /etc/shadow。' },
    { name: 'ACL 与属性', desc: 'setfacl 给单个用户授权；chattr +i 防误删。' }
  ] },
  { name: '进程与资源', items: [
    { name: 'ps / pstree', desc: '看进程树与启动参数；ps aux 是排查入口。' },
    { name: 'top / htop', desc: '实时看 CPU、内存、负载；先看 load 与 %wa。' },
    { name: 'kill / pkill / killall', desc: 'SIGTERM 优雅退出、SIGKILL 强杀，以及为什么先 TERM。' },
    { name: 'nice / renice / taskset', desc: '调优先级、绑 CPU 核；压测时避免互相干扰。' },
    { name: 'free / vmstat / iostat', desc: '内存、上下文切换、磁盘 IO 的基础观测。' },
    { name: 'lsof / fuser', desc: '谁占着文件或端口；删除文件但空间没释放时用它。' },
    { name: 'ulimit / cgroup', desc: '文件句柄、进程数上限；容器资源限制的底层。' },
    { name: 'nohup / screen / tmux', desc: '让长任务在断开 SSH 后继续跑。' }
  ] },
  { name: '存储与包管理', items: [
    { name: 'df / du', desc: '看磁盘剩余与目录占用；du -sh * 找大文件。' },
    { name: 'mount / fstab', desc: '挂载磁盘与开机自动挂载；云盘扩容后的必备步骤。' },
    { name: 'fdisk / parted / lsblk', desc: '分区与查看块设备。' },
    { name: 'inode 与 df -i', desc: '大量小文件会把 inode 用完，磁盘却还有空间。' },
    { name: 'apt / dpkg', desc: 'Debian 系安装、卸载、查依赖；dpkg -l 看已装包。' },
    { name: 'yum / dnf / rpm', desc: 'RHEL 系包管理；rpm -qa 与仓库源配置。' },
    { name: 'swap 与内存回收', desc: 'swap 分区、swappiness、OOM 触发顺序。' },
    { name: '日志轮转 logrotate', desc: '防止日志把磁盘写满；按大小与天数切割。' }
  ] },
  { name: '网络与远程', items: [
    { name: 'ip / ifconfig', desc: '看地址、路由、网卡状态；ip addr 与 ip route。' },
    { name: 'ss / netstat', desc: '看监听端口与连接状态；ss -lntp 查谁占了端口。' },
    { name: 'ping / traceroute / mtr', desc: '连通性与路径质量；mtr 能区分哪一跳丢包。' },
    { name: 'curl / wget', desc: '调接口、下载文件；curl -I 看响应头。' },
    { name: 'ssh / ssh-keygen', desc: '密钥登录、端口转发、跳板机配置。' },
    { name: 'scp / rsync', desc: '传文件；rsync 增量同步、断点续传。' },
    { name: 'tcpdump', desc: '服务器侧抓包；配合 Wireshark 分析。' },
    { name: 'iptables / nftables', desc: '防火墙规则、NAT 与端口转发。' },
    { name: 'dig / nslookup / host', desc: '域名解析排查；先查本地 DNS 再看权威服务器。' }
  ] },
  { name: '服务与系统', items: [
    { name: 'systemctl 与 unit', desc: '启停服务、开机自启、查看状态；unit 文件怎么写。' },
    { name: 'journalctl', desc: '看 systemd 日志；-u 服务、-f 跟踪、--since 时间范围。' },
    { name: 'crontab / systemd timer', desc: '定时任务；环境变量与 PATH 是 cron 最常见的坑。' },
    { name: '启动流程', desc: 'BIOS/UEFI → GRUB → 内核 → initramfs → systemd → target。' },
    { name: 'sysctl', desc: '内核参数调优；文件句柄、端口范围、转发开关。' },
    { name: '主机名与时区', desc: 'hostnamectl、timedatectl；集群时间不同步会引发诡异问题。' },
    { name: '用户登录审计', desc: 'last、lastb、who；异常登录从哪看。' }
  ] },
  { name: '排障与安全', items: [
    { name: 'CPU 飙高排查', desc: 'top → 找进程 → top -H 找线程 → 栈或火焰图。' },
    { name: '内存不足排查', desc: 'free、dmesg 看 OOM、/proc/meminfo 与泄漏进程。' },
    { name: '磁盘 IO 排查', desc: 'iostat -x、iotop；%util 与 await 一起看。' },
    { name: '网络不通排查', desc: '从本机 → 网关 → 目标端口的逐层排除法。' },
    { name: 'SSH 安全加固', desc: '禁 root 密码登录、只留密钥、改端口、Fail2ban。' },
    { name: '防火墙基线', desc: '只开需要的端口；ufw / firewalld 的默认策略。' },
    { name: 'SELinux / AppArmor', desc: '强制访问控制；被拦时的审计日志在哪。' },
    { name: '最小权限运行服务', desc: '专用用户、只读挂载、禁止 shell 登录。' }
  ] }
] };

KB.DETAILS.shell = { groups: [
  { name: '语法基础', items: [
    { name: '变量与引号', desc: '单引号不展开、双引号展开；export 与局部变量。' },
    { name: '条件判断', desc: 'if / test / [[ ]]；文件存在、字符串比较、数值比较。' },
    { name: '循环', desc: 'for / while / until；遍历文件用 while read 更稳。' },
    { name: '函数', desc: '参数 $1..$n、返回值、local 变量与作用域。' },
    { name: '退出码与 set -e', desc: '命令成功与否怎么判断；set -euo pipefail 的副作用。' },
    { name: '数组与关联数组', desc: 'bash 数组、遍历、长度；关联数组当小字典用。' }
  ] },
  { name: '文本与管道', items: [
    { name: '管道与子进程', desc: '每个管道段是子进程；变量在管道里会丢。' },
    { name: '命令替换', desc: '$() 与反引号；嵌套引用的写法。' },
    { name: 'xargs 与并行', desc: '把列表变成参数；xargs -P 并行处理。' },
    { name: '文本三剑客配合', desc: 'grep 过滤 → sed 清洗 → awk 统计的典型流水线。' },
    { name: 'jq 处理 JSON', desc: '接口返回、日志里的 JSON 提取与格式化。' },
    { name: 'awk 进阶', desc: '按分隔符取列、条件统计、输出格式化。' }
  ] },
  { name: '脚本实战', items: [
    { name: '参数解析', desc: 'getopts 与手写解析；-h 帮助与默认值。' },
    { name: '日志与错误处理', desc: '统一日志格式、trap 清理临时文件。' },
    { name: '幂等脚本', desc: '重复执行结果一致；先判断再创建。' },
    { name: '安全写法', desc: '变量加引号、避免 eval、临时文件用 mktemp。' },
    { name: '常见运维脚本', desc: '备份、清理、巡检、批量分发。' },
    { name: '调试技巧', desc: 'bash -x、set -x、shellcheck 静态检查。' }
  ] }
] };

KB.DETAILS.tcpip = { groups: [
  { name: '连接建立', items: [
    { name: '三次握手', desc: 'SYN、SYN-ACK、ACK；为什么两次不够。' },
    { name: '四次挥手与 TIME_WAIT', desc: '主动关闭方为什么等 2MSL；端口耗尽怎么办。' },
    { name: 'SYN 队列与半连接', desc: 'backlog、SYN flood 与 syncookies。' },
    { name: '端口与五元组', desc: '一条连接由源 IP/端口、目的 IP/端口、协议唯一确定。' },
    { name: 'TCP 状态机', desc: 'LISTEN、ESTABLISHED、CLOSE_WAIT 各自意味着什么。' }
  ] },
  { name: '可靠传输', items: [
    { name: '序号与确认', desc: 'seq/ack 如何保证不丢不乱。' },
    { name: '重传机制', desc: '超时重传与快速重传；RTO 怎么估。' },
    { name: '滑动窗口', desc: '流量控制；接收窗口为 0 意味着什么。' },
    { name: '拥塞控制', desc: '慢启动、拥塞避免、快速恢复；BBR 的区别。' },
    { name: 'Nagle 与延迟 ACK', desc: '小包合并与 40ms 延迟的经典组合坑。' },
    { name: '粘包与拆包', desc: 'TCP 是字节流；应用层要自己定长度或分隔符。' }
  ] },
  { name: 'Socket 编程', items: [
    { name: 'socket / bind / listen', desc: '服务端三步起手；backlog 的含义。' },
    { name: 'accept / connect', desc: '阻塞与非阻塞；accept 队列满会怎样。' },
    { name: 'read / write 与缓冲区', desc: '内核缓冲区、半包读写与循环写。' },
    { name: 'IO 多路复用', desc: 'select / poll / epoll 的差异与适用场景。' },
    { name: 'SO_REUSEADDR / SO_KEEPALIVE', desc: '重启时端口占用、死连接探测。' },
    { name: 'TCP_NODELAY', desc: '关掉 Nagle，低延迟场景常用。' }
  ] },
  { name: '排障观测', items: [
    { name: 'ss 看连接', desc: 'ss -s 汇总、ss -tan state time-wait。' },
    { name: 'tcpdump 抓包', desc: '按端口、主机过滤；先抓再分析。' },
    { name: '内核参数', desc: 'somaxconn、tcp_tw_reuse、rmem/wmem。' },
    { name: '延迟与丢包定位', desc: 'ping/mtr 看路径，抓包看重传。' },
    { name: '连接数上限', desc: '文件句柄、端口范围、conntrack 表。' }
  ] }
] };

KB.DETAILS['http2-quic'] = { groups: [
  { name: '报文与语义', items: [
    { name: '请求与响应结构', desc: '方法、路径、头部、正文；状态码分类。' },
    { name: '常见头部', desc: 'Host、Content-Type、Authorization、User-Agent。' },
    { name: '状态码', desc: '2xx/3xx/4xx/5xx；301 与 302、502 与 504 的区别。' },
    { name: 'Cookie 与 Session', desc: 'Set-Cookie、Domain/Path、HttpOnly/Secure。' },
    { name: '内容协商与压缩', desc: 'Accept 系列、gzip/br、分块传输。' }
  ] },
  { name: '缓存与连接', items: [
    { name: '强缓存', desc: 'Cache-Control max-age、Expires；不发请求直接用本地。' },
    { name: '协商缓存', desc: 'ETag/If-None-Match、Last-Modified；304 的流程。' },
    { name: 'Keep-Alive', desc: '连接复用与超时；服务端 keepalive_timeout。' },
    { name: '重定向与 HSTS', desc: '301/302/307/308 的差别；HTTPS 强制跳转。' }
  ] },
  { name: 'HTTP/2', items: [
    { name: '二进制分帧', desc: 'HEADERS/DATA 帧；不再是文本协议。' },
    { name: '多路复用', desc: '一个连接并发多个流；解决队头阻塞的一部分。' },
    { name: '头部压缩 HPACK', desc: '静态表与动态表；为什么头部开销大幅下降。' },
    { name: '服务端推送', desc: 'Push 的初衷与被弃用的原因。' }
  ] },
  { name: 'HTTP/3 与 QUIC', items: [
    { name: '基于 UDP', desc: '在用户态实现可靠传输，绕过 TCP 队头阻塞。' },
    { name: '0-RTT 与连接迁移', desc: '复用会话快速建连；换网不断线。' },
    { name: 'TLS 1.3 集成', desc: '握手与加密一体化。' },
    { name: '部署与兼容', desc: 'Alt-Svc、UDP 端口放行、CDN 支持情况。' }
  ] },
  { name: '安全与跨域', items: [
    { name: '同源策略', desc: '协议 + 域名 + 端口；跨域到底限制了什么。' },
    { name: 'CORS', desc: '预检请求、允许头、携带 Cookie 的条件。' },
    { name: 'CSP', desc: '内容安全策略，限制脚本来源。' },
    { name: '常见攻击面', desc: '请求走私、头部注入、开放重定向。' }
  ] }
] };

KB.DETAILS['network-debug'] = { groups: [
  { name: '分层排查', items: [
    { name: '先确认范围', desc: '本机、局域网、公网；单点还是全部。' },
    { name: '物理与链路', desc: '网线、网卡状态、丢包与错包计数。' },
    { name: 'IP 与路由', desc: '能否到网关、路由表是否正确。' },
    { name: '端口与进程', desc: '服务是否监听、防火墙是否放行。' },
    { name: 'DNS', desc: '解析到的是不是你以为的地址。' }
  ] },
  { name: '抓包工具', items: [
    { name: 'tcpdump 常用参数', desc: '-i 网卡、-nn 不解析、-w 存文件、port/host 过滤。' },
    { name: 'Wireshark 过滤', desc: '显示过滤器与追踪流；看握手与重传。' },
    { name: 'curl 诊断', desc: '-v 看握手、-w 看各阶段耗时、--resolve 指定 IP。' },
    { name: 'ss / netstat', desc: '连接状态分布；CLOSE_WAIT 堆积说明应用没关连接。' },
    { name: 'mtr / traceroute', desc: '路径上哪一跳开始异常。' },
    { name: '应用层日志', desc: '网关、Nginx、服务日志对照时间线。' }
  ] },
  { name: '常见故障', items: [
    { name: '连接被拒绝', desc: '端口没监听或被防火墙 reject。' },
    { name: '连接超时', desc: '丢包、路由黑洞、安全组未放行。' },
    { name: '偶发慢请求', desc: 'DNS 慢、TLS 握手、后端长尾。' },
    { name: '大量 TIME_WAIT', desc: '短连接过多；连接池或内核参数。' },
    { name: '带宽打满', desc: 'iftop/nethogs 找流量来源。' },
    { name: 'MTU 与分片', desc: 'VPN/隧道场景下大包不通。' }
  ] }
] };

KB.DETAILS.nginx = { groups: [
  { name: '配置基础', items: [
    { name: 'server / location', desc: '虚拟主机与路径匹配优先级。' },
    { name: 'root 与 alias', desc: '拼接规则不同，最容易配错的一对。' },
    { name: 'try_files', desc: 'SPA history 路由回退到 index.html。' },
    { name: 'include 与变量', desc: '拆分配置、内置变量与自定义变量。' },
    { name: 'reload 与测试', desc: 'nginx -t 先验配置，reload 不断连接。' }
  ] },
  { name: '反向代理与负载', items: [
    { name: 'proxy_pass', desc: '路径改写规则；带不带斜杠结果不同。' },
    { name: '转发头', desc: 'Host、X-Real-IP、X-Forwarded-For。' },
    { name: 'upstream', desc: '多后端、权重、健康检查。' },
    { name: '负载算法', desc: '轮询、权重、ip_hash、least_conn。' },
    { name: '超时与重试', desc: 'proxy_connect/read_timeout 与重试次数。' }
  ] },
  { name: '性能与安全', items: [
    { name: 'gzip / brotli', desc: '压缩类型与最小长度；别压图片。' },
    { name: '缓存', desc: 'proxy_cache 与静态资源 expires。' },
    { name: '限流限连', desc: 'limit_req、limit_conn 保护后端。' },
    { name: 'HTTPS 配置', desc: '证书链、TLS 版本、HSTS、OCSP stapling。' },
    { name: '日志与排障', desc: 'access_log 格式、错误日志级别、request_time。' }
  ] }
] };

KB.DETAILS.dns = { groups: [
  { name: '解析流程', items: [
    { name: '递归与迭代', desc: '本地 DNS 递归，根/顶级/权威迭代查询。' },
    { name: '缓存与 TTL', desc: '各级缓存；改解析为什么要等 TTL。' },
    { name: 'hosts 文件', desc: '本机优先；临时绕过 DNS 的办法。' },
    { name: '解析顺序', desc: '/etc/nsswitch.conf 与 systemd-resolved。' }
  ] },
  { name: '记录类型', items: [
    { name: 'A / AAAA', desc: 'IPv4 与 IPv6 地址记录。' },
    { name: 'CNAME', desc: '别名；为什么不能和 MX 共存。' },
    { name: 'MX / TXT / NS', desc: '邮件、验证与域名服务器。' },
    { name: 'SRV', desc: '服务发现里的主机与端口。' }
  ] },
  { name: '排障', items: [
    { name: 'dig 用法', desc: '+short、@指定服务器、+trace。' },
    { name: '解析不一致', desc: '多地 DNS 缓存、权威记录未生效。' },
    { name: '域名劫持与污染', desc: 'DNSSEC 与 DoH/DoT。' },
    { name: 'CDN 调度', desc: 'CNAME 到 CDN，按地域返回不同 IP。' }
  ] }
] };

KB.DETAILS['osi-model'] = { groups: [
  { name: '分层模型', items: [
    { name: '物理层', desc: '电信号、光信号、接口标准。' },
    { name: '数据链路层', desc: 'MAC、以太网帧、交换机。' },
    { name: '网络层', desc: 'IP、路由、分片。' },
    { name: '传输层', desc: 'TCP/UDP、端口。' },
    { name: '应用层', desc: 'HTTP、DNS、MQTT 等协议。' }
  ] },
  { name: '封装与解封装', items: [
    { name: '逐层加头', desc: '应用数据 → TCP 段 → IP 包 → 帧。' },
    { name: 'MTU 与分片', desc: '以太网 1500；分片在哪里发生。' },
    { name: '排障时先定位层', desc: 'ping 通不代表端口通，端口通不代表应用正常。' },
    { name: '四层与七层负载', desc: 'LVS 看 IP/端口，Nginx 能看 URL/头。' }
  ] }
] };

KB.DETAILS['ip-routing'] = { groups: [
  { name: '地址与子网', items: [
    { name: 'CIDR', desc: '192.168.1.0/24 表示什么；可用地址数。' },
    { name: '私有地址', desc: '10/8、172.16/12、192.168/16。' },
    { name: '子网划分', desc: '掩码与网段、广播地址。' },
    { name: 'IPv6 基础', desc: '地址长度、缩写规则、常见前缀。' }
  ] },
  { name: '路由', items: [
    { name: '路由表', desc: '最长前缀匹配；默认路由。' },
    { name: '静态路由', desc: '手工加路由与持久化。' },
    { name: '动态路由', desc: 'OSPF/BGP 的适用场景。' },
    { name: '策略路由', desc: '多网卡、多出口的选择。' }
  ] },
  { name: 'NAT 与转发', items: [
    { name: 'SNAT / DNAT', desc: '源地址转换与端口映射。' },
    { name: 'iptables 转发', desc: 'ip_forward、FORWARD 链。' },
    { name: '云上 VPC', desc: '子网、路由表、安全组与 NAT 网关。' }
  ] }
] };

KB.DETAILS.virtualization = { groups: [
  { name: '虚拟化类型', items: [
    { name: '全虚拟化', desc: 'VMware/KVM，客户机不改内核。' },
    { name: '半虚拟化', desc: 'Xen 的 hypercall；性能更好但要改内核。' },
    { name: '容器', desc: '共享内核，隔离的是进程与资源视图。' },
    { name: '硬件辅助', desc: 'VT-x/AMD-V 与 IOMMU。' }
  ] },
  { name: '资源隔离', items: [
    { name: 'CPU 虚拟化', desc: 'vCPU 与超分。' },
    { name: '内存虚拟化', desc: '影子页表与 EPT。' },
    { name: 'IO 虚拟化', desc: 'virtio、直通与 SR-IOV。' },
    { name: 'cgroup 与 namespace', desc: '容器隔离的底层机制。' }
  ] },
  { name: '实验环境', items: [
    { name: 'VirtualBox / VMware', desc: '桌面级虚拟机；快照与仅主机网络。' },
    { name: 'KVM / QEMU', desc: 'Linux 原生虚拟化；virsh 管理。' },
    { name: '云主机', desc: '安全组、密钥登录、快照与镜像。' }
  ] }
] };
