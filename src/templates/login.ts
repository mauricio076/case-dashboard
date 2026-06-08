export function getLoginHtml(error?: string): string {
  const errorHtml = error
    ? `<div class="error" role="alert">${escapeHtml(error)}</div>`
    : ''

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Expediente — Acceso</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&family=Inter:wght@400;500;600&family=Barlow+Condensed:wght@700&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      height: 100%;
      font-family: 'Inter', -apple-system, system-ui, sans-serif;
      background: #F3F1EC;
      color: #1C2B2B;
      -webkit-font-smoothing: antialiased;
    }
    main {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }
    .card {
      background: #FFFFFF;
      border: 1px solid rgba(28,43,43,0.12);
      border-radius: 20px;
      padding: 40px 36px;
      width: min(380px, 100%);
      box-shadow: 0 8px 32px -8px rgba(28,43,43,0.10);
    }
    .eyebrow {
      font-family: 'Barlow Condensed', sans-serif;
      font-weight: 700;
      font-size: 10px;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: #D27653;
      margin-bottom: 14px;
    }
    h1 {
      font-family: 'Fraunces', Georgia, serif;
      font-weight: 600;
      font-size: 26px;
      line-height: 1.2;
      color: #1C2B2B;
      margin-bottom: 28px;
      letter-spacing: -0.02em;
    }
    .error {
      background: #FCEBEB;
      border: 1px solid rgba(226,75,74,0.4);
      color: #791F1F;
      border-radius: 8px;
      padding: 10px 14px;
      font-size: 13px;
      margin-bottom: 20px;
      line-height: 1.5;
    }
    form { display: flex; flex-direction: column; gap: 14px; }
    label {
      display: flex;
      flex-direction: column;
      gap: 5px;
      font-size: 12px;
      font-weight: 500;
      color: #4A5656;
    }
    input {
      font-family: inherit;
      font-size: 14px;
      border: 1px solid rgba(28,43,43,0.22);
      border-radius: 6px;
      padding: 10px 12px;
      background: #FFFFFF;
      color: #1C2B2B;
      outline: none;
      transition: border-color 120ms ease, box-shadow 120ms ease;
    }
    input:focus {
      border-color: #D27653;
      box-shadow: 0 0 0 3px rgba(210,118,83,0.12);
    }
    input::placeholder { color: #8E9494; }
    button[type="submit"] {
      font-family: inherit;
      font-size: 14px;
      font-weight: 500;
      padding: 11px 16px;
      border-radius: 6px;
      border: none;
      background: #D27653;
      color: #FFFFFF;
      cursor: pointer;
      margin-top: 4px;
      transition: background 120ms ease, transform 120ms ease;
    }
    button[type="submit"]:hover { background: #C46A4A; transform: translateY(-1px); }
    button[type="submit"]:active { background: #A85638; transform: scale(0.985); }
    .footer {
      margin-top: 24px;
      padding-top: 16px;
      border-top: 1px solid rgba(28,43,43,0.10);
      font-size: 11px;
      color: #8E9494;
      text-align: center;
      line-height: 1.6;
    }
  </style>
</head>
<body>
  <main>
    <div class="card">
      <div class="eyebrow">Expediente</div>
      <h1>Acceso seguro</h1>
      ${errorHtml}
      <form method="POST" action="/login">
        <label>
          Usuario
          <input name="username" type="text" autocomplete="username"
                 required autofocus placeholder="admin" />
        </label>
        <label>
          Contraseña
          <input name="password" type="password"
                 autocomplete="current-password" required />
        </label>
        <button type="submit">Entrar</button>
      </form>
      <div class="footer">Acceso restringido &middot; Uso personal</div>
    </div>
  </main>
</body>
</html>`
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
