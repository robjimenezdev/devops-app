# ============================================================
# STAGE 1 — builder
# Instalamos dependencias de producción
# ============================================================
FROM node:22-alpine AS builder

WORKDIR /app

# Copiamos solo package.json primero
# Docker cachea esta capa — si no cambia, no reinstala paquetes
COPY package.json .

# Solo dependencias de producción (sin devDependencies)
RUN npm install --omit=dev

# ============================================================
# STAGE 2 — runtime
# Imagen final limpia, solo lo que necesita la app para correr
# ============================================================
FROM node:22-alpine AS runtime

WORKDIR /app

# Creamos usuario no-root por seguridad
# Nunca correr una app como root en producción
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copiamos node_modules del stage anterior (ya compilados)
COPY --from=builder /app/node_modules ./node_modules

# Copiamos el código fuente
COPY index.js .
COPY package.json .

# Asignamos permisos al usuario no-root
RUN chown -R appuser:appgroup /app
USER appuser

# Puerto que expone el contenedor (documentativo)
EXPOSE 3000

# Healthcheck: Docker comprueba si el servicio está vivo
# --interval: cada 30s | --timeout: máx 5s respuesta
# --start-period: espera 10s al arrancar antes de chequear
# --retries: 3 fallos seguidos = contenedor unhealthy
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1

CMD ["node", "index.js"]
