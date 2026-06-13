# DevOps Demo App — Gestión de Contactos

App de 3 capas construida para practicar infraestructura DevOps completa.
Frontend + Backend + PostgreSQL desplegado en Kubernetes con Helm y CI/CD con GitHub Actions.

## Stack
- **Frontend:** HTML/CSS/JS + Nginx
- **Backend:** Node.js 22 + Express + REST API
- **Base de datos:** PostgreSQL 15
- **Contenedores:** Docker + Docker Compose (dev local)
- **Orquestación:** Kubernetes + Helm
- **CI/CD:** GitHub Actions

## Estructura
```
devops-app/
├── .env.example                  # plantilla de variables de entorno
├── .gitignore
├── docker-compose.yml            # solo desarrollo local
├── backend/
│   ├── Dockerfile
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── Dockerfile
│   ├── index.html
│   └── nginx.conf
├── helm/devops-app/
│   ├── Chart.yaml
│   ├── values.yaml               # valores por defecto
│   ├── values-dev.yaml
│   ├── values-staging.yaml
│   ├── values-prod.yaml
│   └── templates/
│       ├── _helpers.tpl
│       ├── configmap.yaml
│       ├── secret.yaml
│       ├── deployment-backend.yaml
│       ├── deployment-frontend.yaml
│       ├── deployment-db.yaml
│       ├── service-backend.yaml
│       ├── service-frontend.yaml
│       ├── service-db.yaml
│       ├── ingress.yaml
│       └── hpa.yaml
└── .github/workflows/
    ├── dev.yml                   # push a develop → deploy automático
    ├── staging.yml               # push a staging → deploy automático
    └── prod.yml                  # push a main → aprobación manual → deploy
```

## API Endpoints
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /health | Health check |
| GET | /contacts | Listar contactos |
| POST | /contacts | Crear contacto |
| DELETE | /contacts/:id | Eliminar contacto |

## Entornos
| Entorno | Rama | Despliegue | Réplicas |
|---------|------|------------|----------|
| dev | develop | Automático | 1 |
| staging | staging | Automático | 2 |
| prod | main | Aprobación manual | 3 |

## Desarrollo local
```bash
# 1. Copiar variables de entorno
cp .env.example .env

# 2. Editar .env con tus credenciales
nano .env

# 3. Levantar los 3 servicios
docker compose up --build

# App en http://localhost:8080
# API en http://localhost:3000
```

## Despliegue con Helm
```bash
# Dev
helm upgrade --install devops-app ./helm/devops-app \
  --namespace dev \
  --values ./helm/devops-app/values-dev.yaml \
  --set secret.dbUser=admin \
  --set secret.dbPassword=secreto

# Staging
helm upgrade --install devops-app ./helm/devops-app \
  --namespace staging \
  --values ./helm/devops-app/values-staging.yaml \
  --set secret.dbUser=admin \
  --set secret.dbPassword=secreto
```

## GitHub Secrets necesarios
| Secret | Descripción |
|--------|-------------|
| `DOCKER_USERNAME` | Usuario Docker Hub |
| `DOCKER_PASSWORD` | Password Docker Hub |
| `DB_USER` | Usuario PostgreSQL |
| `DB_PASSWORD` | Password PostgreSQL |
| `KUBECONFIG` | Credenciales del clúster Kubernetes |

## Fases del proyecto
- [x] Fase 1: Aplicación base (Node.js + PostgreSQL)
- [x] Fase 2: Docker + Docker Compose
- [x] Fase 3: Kubernetes + Helm (3 entornos)
- [x] Fase 4: GitHub Actions CI/CD
# trigger
