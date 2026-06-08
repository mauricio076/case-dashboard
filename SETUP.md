# Expediente — Guía de despliegue en Cloudflare

## Requisitos previos

- Cuenta de Cloudflare (cloudflare.com)
- Node.js 18+ instalado
- Wrangler CLI: ya incluido en `devDependencies`

---

## Paso 1 — Instalar dependencias

```bash
npm install
```

---

## Paso 2 — Crear la base de datos D1

```bash
npx wrangler d1 create expediente
```

Wrangler mostrará algo como:
```
✅ Successfully created DB 'expediente' in region WEUR
Created your new D1 database.
[[d1_databases]]
binding = "DB"
database_name = "expediente"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

**Copia el `database_id`** y pégalo en `wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "expediente"
database_id = "TU_DATABASE_ID_AQUI"
```

---

## Paso 3 — Crear la tabla en la base de datos

```bash
# Localmente (para desarrollo):
npx wrangler d1 execute expediente --local --file=schema.sql

# En producción (Cloudflare):
npx wrangler d1 execute expediente --remote --file=schema.sql
```

---

## Paso 4 — Configurar contraseña y secretos

```bash
# Contraseña de acceso a la app:
npx wrangler secret put APP_PASSWORD
# Escribe tu contraseña cuando se te pida.

# Clave para firmar las sesiones (genera una aleatoria):
npx wrangler secret put JWT_SECRET
# Pega cualquier cadena larga y aleatoria, por ejemplo:
# openssl rand -base64 32
```

El usuario por defecto es `admin`. Si quieres cambiarlo, edita `wrangler.toml`:
```toml
[vars]
APP_USERNAME = "tu_usuario"
```

---

## Paso 5 — Desplegar

```bash
npm run deploy
```

Wrangler mostrará la URL de tu worker:
```
✅ Deployed to https://expediente.TU_CUENTA.workers.dev
```

---

## Desarrollo local

```bash
# Primero crea la tabla local:
npx wrangler d1 execute expediente --local --file=schema.sql

# Inicia el servidor de desarrollo:
npm run dev
```

La app estará en http://localhost:8787

En desarrollo, si `APP_PASSWORD` no está configurada como secret, la app mostrará un error de configuración. Puedes usar un archivo `.dev.vars` para desarrollo:

```bash
# .dev.vars (NO hacer commit de este archivo)
APP_PASSWORD=mi_contraseña_local
JWT_SECRET=dev-secret-local
```

---

## Cambiar el usuario o contraseña

- **Usuario**: edita `APP_USERNAME` en `wrangler.toml` y redespliega con `npm run deploy`
- **Contraseña**: `npx wrangler secret put APP_PASSWORD` y redespliega

---

## Exportar los datos

Desde la app, el botón ↓ en la barra superior descarga todos los datos del expediente como JSON.

También puedes consultarlos directamente en D1:
```bash
npx wrangler d1 execute expediente --remote --command "SELECT updated_at FROM case_data WHERE key='main'"
```

---

## Estructura de archivos

```
src/
  index.ts              # Worker principal (Hono)
  auth.ts               # Firma HMAC-SHA256 para sesiones
  templates/
    app.ts              # HTML de la app (React + JSX inline)
    login.ts            # Página de inicio de sesión
schema.sql              # Esquema de D1 (una sola tabla)
wrangler.toml           # Configuración de Cloudflare
```
