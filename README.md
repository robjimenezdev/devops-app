# DevOps Demo App — Gestión de Contactos

App de 3 capas para practicar infraestructura DevOps completa.

## Stack
- **Frontend:** HTML/CSS/JS puro (Nginx en producción)
- **Backend:** Node.js 22 + Express + REST API
- **Base de datos:** PostgreSQL 15

## Estructura
```
devops-app/
├── frontend/
│   └── index.html
├── backend/
│   ├── index.js
│   └── package.json
└── README.md
```

## API Endpoints
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /health | Health check |
| GET | /contacts | Listar contactos |
| POST | /contacts | Crear contacto |
| DELETE | /contacts/:id | Eliminar contacto |

## Variables de entorno (backend)
| Variable | Default | Descripción |
|----------|---------|-------------|
| PORT | 3000 | Puerto del servidor |
| DB_HOST | localhost | Host PostgreSQL |
| DB_PORT | 5432 | Puerto PostgreSQL |
| DB_NAME | contactsdb | Nombre de la DB |
| DB_USER | admin | Usuario DB |
| DB_PASSWORD | admin123 | Password DB |

## Fases del proyecto
- [x] Fase 1: Aplicación base
- [ ] Fase 2: Docker + Docker Compose
- [ ] Fase 3: Kubernetes + Helm
- [ ] Fase 4: GitHub Actions CI/CD
