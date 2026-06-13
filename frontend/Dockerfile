# ============================================================
# STAGE 1 — builder
# En un proyecto real con React/Vue aquí harías: npm run build
# Nos genera la carpeta /dist o /build con los estáticos
# ============================================================
FROM node:22-alpine AS builder

WORKDIR /app

# Copiamos todo el frontend
COPY . .

# Si fuera React: RUN npm install && npm run build
# Como es HTML puro, solo creamos la carpeta dist
RUN mkdir -p dist && cp index.html dist/

# ============================================================
# STAGE 2 — runtime
# Nginx Alpine: imagen ultra ligera ~8MB
# Solo sirve los ficheros estáticos, nada más
# ============================================================
FROM nginx:alpine AS runtime

# Eliminamos la config por defecto de Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copiamos nuestra config personalizada
COPY nginx.conf /etc/nginx/conf.d/app.conf

# Copiamos los estáticos del stage builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx corre en puerto 80 dentro del contenedor
EXPOSE 80

# Healthcheck: comprueba que Nginx responde
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:80 || exit 1

# Nginx arranca en foreground (necesario en Docker)
CMD ["nginx", "-g", "daemon off;"]
