# Expediente — Guía de despliegue en Cloudflare

> **Entornos (Wrangler environments):**
> - **Desarrollo (por defecto):** `dev.axlotl.dev` — worker `expediente-dev`,
>   base de datos D1 `expediente-dev`.
> - **Producción (opcional, para más adelante):** `axlotl.dev` — worker
>   `expediente`, base de datos D1 `expediente`.
>
> La zona `axlotl.dev` debe existir en la misma cuenta de Cloudflare; al
> desplegar, Wrangler crea el registro DNS del subdominio y el certificado
> automáticamente (custom domain).

## Despliegue automático (recomendado)

El objetivo por defecto es el **entorno de desarrollo** (`dev.axlotl.dev`).

### A) Script todo-en-uno

```bash
export CLOUDFLARE_API_TOKEN=...     # token con permisos Workers + D1 + Routes
export CLOUDFLARE_ACCOUNT_ID=...    # id de tu cuenta
export APP_PASSWORD=...             # contraseña de la app (solo 1ª vez / al cambiar)
export JWT_SECRET=$(openssl rand -base64 32)
npm ci
npm run deploy:dev                  # -> dev.axlotl.dev   (entorno de desarrollo)
# npm run deploy:prod               # -> axlotl.dev       (producción, cuando quieras)
```

`deploy:dev` (en `scripts/deploy.sh`) es idempotente: crea la base de datos
D1 `expediente-dev` si no existe, escribe su `database_id` en `wrangler.toml`,
aplica `schema.sql`, configura los secretos y despliega el worker a
`dev.axlotl.dev`. Internamente usa `wrangler deploy --env dev`.

### B) GitHub Actions

El workflow `.github/workflows/deploy.yml` despliega en cada push a `main`.
Solo necesitas añadir estos *repository secrets* (Settings → Secrets and
variables → Actions):

| Secret | Requerido | Para qué |
|---|---|---|
| `CLOUDFLARE_API_TOKEN` | sí | autenticación |
| `CLOUDFLARE_ACCOUNT_ID` | recomendado | seleccionar la cuenta |
| `APP_PASSWORD` | 1ª vez | contraseña de login |
| `JWT_SECRET` | 1ª vez | firma de sesiones |

---

## Despliegue manual (paso a paso)

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

## Paso 2 — Crear la base de datos D1 (entorno de desarrollo)

```bash
npx wrangler d1 create expediente-dev
```

Wrangler mostrará algo como:
```
✅ Successfully created DB 'expediente-dev' in region WEUR
Created your new D1 database.
[[d1_databases]]
binding = "DB"
database_name = "expediente-dev"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

**Copia el `database_id`** y pégalo en el bloque `[[env.dev.d1_databases]]` de
`wrangler.toml`:

```toml
[[env.dev.d1_databases]]
binding = "DB"
database_name = "expediente-dev"
database_id = "TU_DATABASE_ID_AQUI"
```

---

## Paso 3 — Crear la tabla en la base de datos

```bash
# Localmente (para desarrollo con `wrangler dev`):
npx wrangler d1 execute expediente --local --file=schema.sql

# En el D1 remoto del entorno dev:
npx wrangler d1 execute expediente-dev --remote --file=schema.sql
```

---

## Paso 4 — Configurar contraseña y secretos (entorno dev)

```bash
# Contraseña de acceso a la app:
npx wrangler secret put APP_PASSWORD --env dev
# Escribe tu contraseña cuando se te pida.

# Clave para firmar las sesiones (genera una aleatoria):
npx wrangler secret put JWT_SECRET --env dev
# Pega cualquier cadena larga y aleatoria, por ejemplo:
# openssl rand -base64 32
```

El usuario por defecto es `admin`. Si quieres cambiarlo, edita el bloque
`[env.dev]` de `wrangler.toml`:
```toml
[env.dev]
vars = { APP_USERNAME = "tu_usuario" }
```

---

## Paso 5 — Desplegar (entorno de desarrollo)

```bash
npm run deploy           # = wrangler deploy --env dev
```

Wrangler publicará el worker en el subdominio de desarrollo:
```
✅ Deployed to https://dev.axlotl.dev
```

> `dev.axlotl.dev` está definido en el bloque `[env.dev]` de `wrangler.toml`
> mediante `routes` con `custom_domain = true`. La zona `axlotl.dev` debe estar
> en tu cuenta de Cloudflare; Wrangler crea el DNS del subdominio y el
> certificado al desplegar.
>
> Para producción (`axlotl.dev`) más adelante: `npm run deploy:prod`.

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
