{{/*
=============================================================
_helpers.tpl — Funciones reutilizables para todos los templates
Las funciones van entre {{- define "nombre" }} y {{- end }}
Se llaman con {{ include "nombre" . }} en cualquier template
=============================================================
*/}}

{{/*
Nombre base de la aplicación
Usa el nombre del chart pero permite sobreescribirlo
*/}}
{{- define "devops-app.name" -}}
{{- .Chart.Name }}
{{- end }}

{{/*
Nombre completo del release
Combina el nombre del release + nombre del chart
Ejemplo: devops-app-devops-app → lo trunca a 63 chars (límite de Kubernetes)
*/}}
{{- define "devops-app.fullname" -}}
{{- printf "%s-%s" .Release.Name .Chart.Name | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Labels estándar — se añaden a TODOS los recursos de Kubernetes
Permiten identificar, filtrar y agrupar recursos
*/}}
{{- define "devops-app.labels" -}}
app.kubernetes.io/name: {{ include "devops-app.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
environment: {{ .Values.global.environment }}
{{- end }}

{{/*
Selector labels — usados por Services para encontrar sus Pods
Más restrictivos que los labels completos
*/}}
{{- define "devops-app.selectorLabels" -}}
app.kubernetes.io/name: {{ include "devops-app.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Nombre del Secret de Kubernetes que guarda las credenciales de DB
*/}}
{{- define "devops-app.secretName" -}}
{{- include "devops-app.fullname" . }}-secret
{{- end }}

{{/*
Nombre del ConfigMap con variables de configuración
*/}}
{{- define "devops-app.configName" -}}
{{- include "devops-app.fullname" . }}-config
{{- end }}
