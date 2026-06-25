# 🔧 trt.Ino2Block – Arduino → Blockly Konverter
# Statische WebApp via nginx

FROM nginx:alpine

LABEL maintainer="therealteacher <github@arbeitermili.eu>"
LABEL description="trt.Ino2Block – Arduino C++ zu Blockly XML Konverter für den Unterricht"
LABEL version="1.0"

# Nginx-Konfiguration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# App-Dateien
COPY index.html /usr/share/nginx/html/index.html
COPY app.js     /usr/share/nginx/html/app.js
COPY style.css  /usr/share/nginx/html/style.css

# Docs / Landing Page
COPY docs/index.html /usr/share/nginx/html/docs/index.html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost/index.html || exit 1

CMD ["nginx", "-g", "daemon off;"]
