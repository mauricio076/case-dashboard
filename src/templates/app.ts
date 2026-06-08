export function getAppHtml(): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Expediente</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,400&family=Inter:wght@300;400;500;600&family=Barlow+Condensed:wght@400;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
  <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
  <style>
    :root {
      --ink-1000: #1F1F1E; --ink-900: #1C2B2B; --ink-800: #2A3A3A;
      --ink-700: #4A5656;  --ink-600: #6E7676;  --ink-500: #8E9494;
      --paper-junto: #F3F1EC; --paper-qs: #F7F7F6; --paper-100: #F0EFEA; --paper-200: #E4E2DC;
      --terracotta-700: #A85638; --terracotta-600: #C46A4A; --terracotta-500: #D27653;
      --terracotta-100: #F5DACB; --terracotta-50: #FBEEE5;
      --lavender-700: #6E6E78; --lavender-600: #8E8E98; --lavender-500: #B4B2BC;
      --lavender-200: #DEDDE3; --lavender-100: #ECEBEF;
      --pine-700: #1F3A33; --pine-500: #2F5A4E; --pine-300: #6B8B7F;
      --signal-positive: #2F5A4E; --signal-warn: #C58B2A;
      --signal-negative: #B04A3A; --signal-info: #4A6E78;
      --bg: var(--paper-junto); --bg-elevated: #FFFFFF; --bg-inset: var(--paper-100);
      --surface-card: var(--paper-qs);
      --fg: var(--ink-900); --fg-1: var(--ink-900); --fg-2: var(--ink-700); --fg-3: var(--ink-500);
      --accent: var(--terracotta-500); --accent-hover: var(--terracotta-600); --accent-press: var(--terracotta-700);
      --rule: rgba(28,43,43,0.12); --rule-strong: rgba(28,43,43,0.28); --rule-on-ink: rgba(243,241,236,0.12);
      --font-display: 'Fraunces', Georgia, serif;
      --font-lockup: 'Barlow Condensed', 'Helvetica Neue Condensed', sans-serif;
      --font-sans: 'Inter', -apple-system, system-ui, sans-serif;
      --font-mono: 'JetBrains Mono', 'IBM Plex Mono', ui-monospace, monospace;
      --t-body-lg: 18px; --t-body: 16px; --t-body-sm: 14px; --t-caption: 12px;
      --space-1: 4px; --space-2: 8px; --space-3: 12px; --space-4: 16px;
      --space-5: 24px; --space-6: 32px; --space-7: 48px; --space-8: 64px;
      --radius-xs: 2px; --radius-sm: 4px; --radius-md: 8px; --radius-lg: 14px;
      --radius-xl: 20px; --radius-2xl: 28px; --radius-pill: 999px;
      --shadow-hairline: 0 0 0 1px var(--rule);
      --shadow-sm: 0 1px 2px rgba(28,43,43,0.06);
      --shadow-md: 0 6px 18px -8px rgba(28,43,43,0.18);
      --shadow-lg: 0 20px 40px -20px rgba(28,43,43,0.25);
      --ease-out: cubic-bezier(0.22,1,0.36,1); --ease-in-out: cubic-bezier(0.65,0,0.35,1);
      --dur-fast: 120ms; --dur-base: 220ms; --dur-slow: 480ms;
      --sidebar-bg: var(--paper-qs); --sidebar-fg: var(--ink-600);
      --sidebar-active-bg: #FFFFFF; --sidebar-active-fg: var(--ink-900);
      --sidebar-accent: var(--terracotta-500); --sidebar-border: var(--rule);
      --content-bg: var(--paper-junto); --card-bg: #FFFFFF; --card-border: var(--rule);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { height: 100%; font-family: var(--font-sans); background: var(--content-bg);
      color: var(--fg-1); font-size: 14px; line-height: 1.5;
      -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; }
    #root { height: 100vh; display: flex; overflow: hidden; }
    input, textarea, select {
      font-family: var(--font-sans); font-size: 13px;
      border: 1px solid rgba(28,43,43,0.22); border-radius: var(--radius-sm);
      padding: 8px 10px; background: var(--bg-elevated); color: var(--fg-1); outline: none;
      transition: border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out);
    }
    input:focus, textarea:focus, select:focus {
      border-color: var(--terracotta-500); box-shadow: 0 0 0 3px var(--terracotta-50);
    }
    input::placeholder, textarea::placeholder { color: var(--fg-3); }
    textarea { resize: vertical; }
    select { cursor: pointer; appearance: auto; }
    button { cursor: pointer; font-family: var(--font-sans); }
    ::-webkit-scrollbar { width: 5px; height: 5px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: rgba(28,43,43,0.18); border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: rgba(28,43,43,0.30); }
    ::selection { background: var(--terracotta-100); color: var(--ink-900); }
    aside { transition: background 220ms cubic-bezier(0.22,1,0.36,1); }
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes fadein { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
    @media print { .sidebar-wrapper { display: none !important; } }
    @media (max-width: 640px) {
      .sidebar-wrapper { display: none !important; }
      .sidebar-wrapper.open { display: flex !important; position: fixed !important; z-index: 50; }
    }
  </style>
</head>
<body>
  <div id="root"></div>
  <script src="https://unpkg.com/react@18.3.1/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js"></script>
  <script type="text/babel">
  // ── React hooks ─────────────────────────────────────────────────────────────
  const { useState, useEffect, useLayoutEffect, useRef, useCallback } = React;

  // ── Design tokens: event/doc/person types ───────────────────────────────────
  const COLORS = {
    purple: { bg:"#EEEDFE", border:"#7F77DD", text:"#3C3489" },
    teal:   { bg:"#E1F5EE", border:"#1D9E75", text:"#085041" },
    amber:  { bg:"#FAEEDA", border:"#BA7517", text:"#633806" },
    coral:  { bg:"#FAECE7", border:"#D85A30", text:"#4A1B0C" },
    blue:   { bg:"#E6F1FB", border:"#378ADD", text:"#0C447C" },
    red:    { bg:"#FCEBEB", border:"#E24B4A", text:"#791F1F" },
    green:  { bg:"#EAF3DE", border:"#639922", text:"#27500A" },
    gray:   { bg:"#F1EFE8", border:"#888780", text:"#2C2C2A" },
  };
  const EVENT_TYPES = [
    { id:"legal",     label:"Legal",        color:"purple" },
    { id:"financial", label:"Financiero",   color:"amber"  },
    { id:"comms",     label:"Comunicación", color:"blue"   },
    { id:"evidence",  label:"Evidencia",    color:"teal"   },
    { id:"testimony", label:"Testimonio",   color:"coral"  },
    { id:"other",     label:"Otro",         color:"gray"   },
  ];
  const DOC_TYPES = [
    { id:"google_drive", label:"Google Drive", icon:"hard-drive" },
    { id:"icloud",       label:"iCloud",       icon:"cloud"      },
    { id:"dropbox",      label:"Dropbox",      icon:"cloud"      },
    { id:"local",        label:"Disco local",  icon:"laptop-minimal" },
    { id:"other",        label:"Otro enlace",  icon:"link"       },
  ];
  const RELATED_TYPES = [
    { id:"carpeta",    label:"Carpeta",    color:"purple" },
    { id:"caso",       label:"Caso",       color:"blue"   },
    { id:"expediente", label:"Expediente", color:"teal"   },
    { id:"denuncia",   label:"Denuncia",   color:"coral"  },
    { id:"amparo",     label:"Amparo",     color:"amber"  },
    { id:"otro",       label:"Otro",       color:"gray"   },
  ];
  const RELATION_TYPES = [
    { id:"derivado_de", label:"Derivado de" },
    { id:"paralelo_a",  label:"Paralelo a"  },
    { id:"precede_a",   label:"Precede a"   },
    { id:"complementa", label:"Complementa" },
    { id:"consolida",   label:"Consolida"   },
    { id:"otro",        label:"Otro"        },
  ];
  const PERSON_ROLES = [
    { id:"testigo",     label:"Testigo",     color:"teal"   },
    { id:"perito",      label:"Perito",      color:"purple" },
    { id:"funcionario", label:"Funcionario", color:"blue"   },
    { id:"familiar",    label:"Familiar",    color:"coral"  },
    { id:"otro",        label:"Otro",        color:"gray"   },
  ];
  const THEMES = {
    papel: {
      "--sidebar-bg": "#F7F7F6", "--sidebar-fg": "#6E7676",
      "--sidebar-active-bg": "#FFFFFF", "--sidebar-active-fg": "#1C2B2B",
      "--sidebar-accent": "#D27653", "--sidebar-border": "rgba(28,43,43,0.12)",
      "--content-bg": "#F3F1EC", "--card-bg": "#FFFFFF", "--card-border": "rgba(28,43,43,0.12)",
    },
    tinta: {
      "--sidebar-bg": "#1F1F1E", "--sidebar-fg": "rgba(243,241,236,0.58)",
      "--sidebar-active-bg": "rgba(255,255,255,0.09)", "--sidebar-active-fg": "#F3F1EC",
      "--sidebar-accent": "#D27653", "--sidebar-border": "rgba(243,241,236,0.12)",
      "--content-bg": "#F3F1EC", "--card-bg": "#FFFFFF", "--card-border": "rgba(28,43,43,0.12)",
    },
    lavanda: {
      "--sidebar-bg": "#ECEBEF", "--sidebar-fg": "#6E7676",
      "--sidebar-active-bg": "#FFFFFF", "--sidebar-active-fg": "#1C2B2B",
      "--sidebar-accent": "#6E6E78", "--sidebar-border": "rgba(28,43,43,0.10)",
      "--content-bg": "#F7F7F6", "--card-bg": "#F3F1EC", "--card-border": "rgba(28,43,43,0.10)",
    },
  };

  // ── Icon component (Lucide SVG via data-lucide attribute) ───────────────────
  const Icon = ({ name, size = 14, style = {}, color }) => (
    <i data-lucide={name} style={{
      width: size, height: size, display: "inline-block", flexShrink: 0,
      lineHeight: 1, color, ...style,
    }} />
  );

  // ── Badge ───────────────────────────────────────────────────────────────────
  const Badge = ({ color = "gray", label }) => {
    const c = COLORS[color] || COLORS.gray;
    return (
      <span style={{
        display: "inline-flex", alignItems: "center",
        background: c.bg, color: c.text, border: \`1px solid \${c.border}\`,
        borderRadius: 999, fontSize: 11, padding: "2px 8px",
        fontWeight: 600, whiteSpace: "nowrap", lineHeight: 1.45,
        fontFamily: "var(--font-sans)", letterSpacing: "0.01em",
      }}>{label}</span>
    );
  };

  // ── Btn ─────────────────────────────────────────────────────────────────────
  const Btn = ({ onClick, children, variant = "ghost", danger = false, disabled = false, style = {}, title, type = "button" }) => {
    const [over, setOver] = useState(false);
    const [press, setPress] = useState(false);
    let bg, borderColor, color;
    if (variant === "primary") {
      bg = over ? "#C46A4A" : "#D27653"; borderColor = over ? "#A85638" : "#C46A4A"; color = "#FFFFFF";
    } else if (variant === "outline") {
      bg = over ? "rgba(28,43,43,0.05)" : "transparent"; borderColor = "rgba(28,43,43,0.22)"; color = "var(--fg-2)";
    } else {
      bg = over ? "rgba(28,43,43,0.06)" : "transparent";
      borderColor = over ? "rgba(28,43,43,0.20)" : "rgba(28,43,43,0.14)";
      color = danger ? "#B04A3A" : "var(--fg-2)";
    }
    return (
      <button type={type} onClick={onClick} disabled={disabled} title={title}
        onMouseEnter={() => setOver(true)}
        onMouseLeave={() => { setOver(false); setPress(false); }}
        onMouseDown={() => setPress(true)} onMouseUp={() => setPress(false)}
        style={{
          display: "inline-flex", alignItems: "center", gap: 5,
          fontSize: 13, fontWeight: 500, padding: "6px 10px",
          borderRadius: "var(--radius-sm)", border: \`1px solid \${borderColor}\`,
          background: bg, color, cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.45 : 1, transition: "all 120ms cubic-bezier(0.22,1,0.36,1)",
          transform: press ? "scale(0.985)" : over ? "translateY(-1px)" : "none",
          fontFamily: "var(--font-sans)", lineHeight: 1, ...style,
        }}>{children}</button>
    );
  };

  // ── ActionBtns ──────────────────────────────────────────────────────────────
  const ActionBtns = ({ onEdit, onDelete }) => (
    <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
      <Btn onClick={onEdit}   variant="ghost"       title="Editar"><Icon name="pencil" size={13} /></Btn>
      <Btn onClick={onDelete} variant="ghost" danger title="Eliminar"><Icon name="trash-2" size={13} /></Btn>
    </div>
  );

  // ── Card ────────────────────────────────────────────────────────────────────
  const Card = ({ children, style = {}, onClick }) => (
    <div onClick={onClick} style={{
      background: "var(--card-bg)", border: "1px solid var(--card-border)",
      borderRadius: "var(--radius-lg)", padding: "14px 16px", ...style,
    }}>{children}</div>
  );

  // ── SectionHeader ───────────────────────────────────────────────────────────
  const SectionHeader = ({ title, subtitle, action }) => (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
      <div>
        <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: "var(--fg-1)", letterSpacing: "-0.01em", lineHeight: 1.3 }}>{title}</h2>
        {subtitle && <p style={{ margin: "4px 0 0", fontSize: 12, color: "var(--fg-3)", lineHeight: 1.4 }}>{subtitle}</p>}
      </div>
      {action && <div style={{ flexShrink: 0, marginLeft: 12 }}>{action}</div>}
    </div>
  );

  // ── EmptyState ──────────────────────────────────────────────────────────────
  const EmptyState = ({ icon = "inbox", message, action }) => (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", padding: "48px 24px", gap: 12,
      color: "var(--fg-3)", textAlign: "center",
    }}>
      <Icon name={icon} size={28} style={{ opacity: 0.35 }} />
      <p style={{ margin: 0, fontSize: 13 }}>{message}</p>
      {action}
    </div>
  );

  // ── Field ───────────────────────────────────────────────────────────────────
  const Field = ({ label, value, onChange, type = "text", as, rows = 3, options, required, placeholder }) => (
    <div style={{ marginBottom: 12 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "var(--fg-2)", marginBottom: 4 }}>
        {label}{required && <span style={{ color: "#B04A3A", marginLeft: 2 }}>*</span>}
      </label>
      {as === "textarea" ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows} placeholder={placeholder}
          style={{ width: "100%", boxSizing: "border-box", fontFamily: "var(--font-sans)", fontSize: 13 }} />
      ) : as === "select" ? (
        <select value={value} onChange={e => onChange(e.target.value)} style={{ width: "100%", fontSize: 13 }}>
          {(options || []).map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      ) : (
        <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          style={{ width: "100%", boxSizing: "border-box", fontSize: 13 }} />
      )}
    </div>
  );

  // ── Modal ───────────────────────────────────────────────────────────────────
  const Modal = ({ title, onClose, children, onSave, saveLabel = "Guardar" }) => (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(28,43,43,0.48)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 900, padding: "1rem",
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#FFFFFF", border: "1px solid rgba(28,43,43,0.12)",
        borderRadius: "var(--radius-xl)", padding: "1.5rem",
        width: "min(520px,100%)", maxHeight: "88vh", overflowY: "auto",
        boxShadow: "0 20px 48px -16px rgba(28,43,43,0.30)",
        animation: "fadein 180ms ease-out",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: "var(--fg-1)" }}>{title}</h3>
          <Btn onClick={onClose} variant="ghost" style={{ padding: "4px 8px" }}><Icon name="x" size={14} /></Btn>
        </div>
        {children}
        {onSave && (
          <div style={{
            display: "flex", justifyContent: "flex-end", gap: 8,
            marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(28,43,43,0.10)",
          }}>
            <Btn onClick={onClose} variant="outline">Cancelar</Btn>
            <Btn onClick={onSave} variant="primary">{saveLabel}</Btn>
          </div>
        )}
      </div>
    </div>
  );

  // ── SearchBar ───────────────────────────────────────────────────────────────
  const SearchBar = ({ value, onChange, placeholder = "Buscar…", style = {} }) => (
    <div style={{ position: "relative", ...style }}>
      <Icon name="search" size={14} style={{
        position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)",
        color: "var(--fg-3)", pointerEvents: "none",
      }} />
      <input placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)}
        style={{ width: "100%", boxSizing: "border-box", paddingLeft: 32, paddingRight: value ? 30 : 10 }} />
      {value && (
        <button onClick={() => onChange("")} style={{
          position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)",
          background: "none", border: "none", cursor: "pointer",
          color: "var(--fg-3)", display: "flex", alignItems: "center", padding: 2,
        }}>
          <Icon name="x" size={11} />
        </button>
      )}
    </div>
  );

  // ── MiniLink ────────────────────────────────────────────────────────────────
  const MiniLink = ({ onClick, label }) => (
    <button onClick={onClick} style={{
      background: "none", border: "none", cursor: "pointer",
      fontSize: 12, color: "var(--fg-3)", textDecoration: "underline",
      padding: 0, fontFamily: "var(--font-sans)",
    }}>{label}</button>
  );

  // ── ResumenView ─────────────────────────────────────────────────────────────
  const ResumenView = ({ data, onEditCase, onGoTo }) => {
    const ci = data.caseInfo;
    const pendingCount = (data.pendingRequests || []).filter(p => !p.done).length;
    const today = new Date().toISOString().slice(0, 10);
    const nextDate = [...(data.upcomingDates || [])].filter(d => d.date >= today)
      .sort((a, b) => a.date.localeCompare(b.date))[0];
    const metrics = [
      { label: "Eventos",        val: data.events.length,            icon: "timer",          tab: "timeline" },
      { label: "Documentos",     val: data.documents.length,         icon: "files",          tab: "docs"     },
      { label: "Pendientes",     val: pendingCount,                  icon: "check-square-2", tab: "pending", alert: pendingCount > 0 },
      { label: "Personas clave", val: (data.people || []).length,    icon: "users",          tab: "people"   },
    ];
    return (
      <div>
        <div style={{ marginBottom: 24 }}>
          <p style={{ margin: "0 0 12px", fontSize: 14, lineHeight: 1.75, color: "var(--fg-2)", maxWidth: 640 }}>
            {ci.notes || <span style={{ color: "var(--fg-3)" }}>Sin descripción. Edita los datos del caso para agregar una.</span>}
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            {ci.court && <span style={{ fontSize: 12, color: "var(--fg-3)", display: "flex", alignItems: "center", gap: 5 }}>
              <Icon name="building-2" size={12} />{ci.court}
            </span>}
            {ci.opponent && <span style={{ fontSize: 12, color: "var(--fg-3)", display: "flex", alignItems: "center", gap: 5 }}>
              <Icon name="user" size={12} />Contraparte: {ci.opponent}
            </span>}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))", gap: 8, marginBottom: 24 }}>
          {metrics.map(m => (
            <div key={m.label} onClick={() => onGoTo(m.tab)}
              style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "var(--radius-md)", padding: "14px 16px", cursor: "pointer", transition: "box-shadow 120ms ease" }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 12px -4px rgba(28,43,43,0.14)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
            >
              <div style={{ fontSize: 11, color: "var(--fg-3)", marginBottom: 6, display: "flex", alignItems: "center", gap: 5 }}>
                <Icon name={m.icon} size={12} />{m.label}
              </div>
              <div style={{ fontSize: 30, fontWeight: 600, lineHeight: 1, color: m.alert ? "#B04A3A" : "var(--fg-1)", fontVariantNumeric: "tabular-nums" }}>{m.val}</div>
            </div>
          ))}
        </div>
        {nextDate && (
          <div onClick={() => onGoTo("dates")}
            style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", marginBottom: 16,
              background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "var(--radius-md)", cursor: "pointer" }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 12px -4px rgba(28,43,43,0.14)"}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
          >
            <Icon name="calendar-days" size={20} color="#C58B2A" />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: "var(--fg-3)", marginBottom: 2 }}>Próxima fecha</div>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{nextDate.title}</div>
              <div style={{ fontSize: 12, color: "var(--fg-3)", marginTop: 1 }}>
                <span style={{ fontFamily: "var(--font-mono)" }}>{nextDate.date}</span>
                {nextDate.location && <span> · {nextDate.location}</span>}
              </div>
            </div>
            <Icon name="chevron-right" size={14} color="var(--fg-3)" />
          </div>
        )}
        {pendingCount > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 500 }}>Sin completar</span>
              <MiniLink onClick={() => onGoTo("pending")} label="Ver todos" />
            </div>
            {(data.pendingRequests || []).filter(p => !p.done).slice(0, 3).map(p => (
              <div key={p.id} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "9px 0", borderBottom: "1px solid rgba(28,43,43,0.08)" }}>
                <Icon name="circle" size={13} color="#B04A3A" style={{ marginTop: 2 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13 }}>{p.description}</div>
                  {p.requestedBy && <div style={{ fontSize: 11, color: "var(--fg-3)", marginTop: 2 }}>{p.requestedBy}</div>}
                </div>
              </div>
            ))}
          </div>
        )}
        {data.events.length > 0 && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 500 }}>Eventos recientes</span>
              <MiniLink onClick={() => onGoTo("timeline")} label="Ver todos" />
            </div>
            {[...data.events].reverse().slice(0, 4).map(ev => {
              const et = EVENT_TYPES.find(t => t.id === ev.type) || EVENT_TYPES[5];
              return (
                <div key={ev.id} style={{ display: "flex", gap: 10, alignItems: "center", padding: "9px 0", borderBottom: "1px solid rgba(28,43,43,0.08)" }}>
                  <span style={{ fontSize: 11, color: "var(--fg-3)", minWidth: 84, flexShrink: 0, fontFamily: "var(--font-mono)" }}>{ev.date}</span>
                  <Badge color={et.color} label={et.label} />
                  <span style={{ fontSize: 13, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ev.title}</span>
                </div>
              );
            })}
          </div>
        )}
        <div style={{ borderTop: "1px solid rgba(28,43,43,0.08)", marginTop: 20, paddingTop: 16 }}>
          <Btn onClick={onEditCase} variant="ghost"><Icon name="pencil" size={13} />Editar datos del caso</Btn>
        </div>
      </div>
    );
  };

  // ── PendientesView ──────────────────────────────────────────────────────────
  const PendientesView = ({ data, onToggle, onAdd, onEdit, onDelete }) => {
    const pending = data.pendingRequests || [];
    const count = pending.filter(p => !p.done).length;
    return (
      <div>
        <SectionHeader
          title={count + " pendiente" + (count !== 1 ? "s" : "") + " sin completar"}
          subtitle="Documentos e información solicitados por tu abogado, el juzgado u otras partes."
          action={<Btn onClick={onAdd} variant="outline"><Icon name="plus" size={13} />Agregar</Btn>}
        />
        {pending.length === 0 && <EmptyState icon="check-square-2" message="Sin pendientes registrados." action={
          <Btn onClick={onAdd} variant="outline"><Icon name="plus" size={13} />Agregar pendiente</Btn>
        } />}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {pending.map(p => (
            <Card key={p.id} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <button onClick={() => onToggle(p.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, paddingTop: 1, flexShrink: 0 }}>
                <Icon name={p.done ? "circle-check" : "circle"} size={20} color={p.done ? "#2F5A4E" : "#B04A3A"} />
              </button>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: p.done ? 400 : 500, textDecoration: p.done ? "line-through" : "none", color: p.done ? "var(--fg-3)" : "var(--fg-1)", lineHeight: 1.5 }}>{p.description}</div>
                <div style={{ fontSize: 11, color: "var(--fg-3)", marginTop: 4, display: "flex", gap: 6 }}>
                  {p.requestedBy && <span>Solicitado por <strong style={{ fontWeight: 500 }}>{p.requestedBy}</strong></span>}
                  {p.date && <span>· {p.date}</span>}
                </div>
              </div>
              <ActionBtns onEdit={() => onEdit(p)} onDelete={() => onDelete(p.id)} />
            </Card>
          ))}
        </div>
      </div>
    );
  };

  // ── FechasView ──────────────────────────────────────────────────────────────
  const FechasView = ({ data, onAdd, onEdit, onDelete }) => {
    const today = new Date().toISOString().slice(0, 10);
    const dates = [...(data.upcomingDates || [])].sort((a, b) => a.date.localeCompare(b.date));
    return (
      <div>
        <SectionHeader title="Fechas importantes" subtitle="Audiencias, entregas, visitas y plazos."
          action={<Btn onClick={onAdd} variant="outline"><Icon name="plus" size={13} />Agregar</Btn>} />
        {dates.length === 0 && <EmptyState icon="calendar-x" message="Sin fechas registradas." />}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {dates.map(d => {
            const isPast = d.date < today;
            const isNext = !isPast && dates.filter(x => x.date >= today)[0]?.id === d.id;
            return (
              <Card key={d.id} style={{ borderLeft: isNext ? "3px solid #C58B2A" : "3px solid transparent" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 12, fontFamily: "var(--font-mono)", fontWeight: 500, color: isPast ? "var(--fg-3)" : "#C58B2A" }}>{d.date}</span>
                      {isPast && <Badge color="gray" label="Pasada" />}
                      {isNext && <Badge color="amber" label="Próxima" />}
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>{d.title}</div>
                    {d.location && <div style={{ fontSize: 12, color: "var(--fg-3)", display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}><Icon name="map-pin" size={12} />{d.location}</div>}
                    {d.notes && <p style={{ margin: 0, fontSize: 12, color: "var(--fg-2)", lineHeight: 1.6 }}>{d.notes}</p>}
                  </div>
                  <ActionBtns onEdit={() => onEdit(d)} onDelete={() => onDelete(d.id)} />
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    );
  };

  // ── TimelineView ────────────────────────────────────────────────────────────
  const TimelineView = ({ data, onAdd, onEdit, onDelete, onToggleDocLink }) => {
    const [filterType, setFilterType] = useState("all");
    const [linkingEvent, setLinkingEvent] = useState(null);
    const filtered = filterType === "all" ? data.events : data.events.filter(e => e.type === filterType);
    const oldest = data.events[0];
    const subtitle = oldest
      ? "Desde " + oldest.date + " \xB7 " + data.events.length + " evento" + (data.events.length !== 1 ? "s" : "")
      : "Cronología de todos los eventos del caso.";
    return (
      <div>
        <SectionHeader title="Timeline" subtitle={subtitle}
          action={<Btn onClick={onAdd} variant="outline"><Icon name="plus" size={13} />Agregar evento</Btn>} />
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 20 }}>
          {[{ id: "all", label: "Todos" }, ...EVENT_TYPES].map(et => {
            const active = filterType === et.id;
            const c = et.color ? COLORS[et.color] : null;
            return (
              <button key={et.id} onClick={() => setFilterType(et.id)} style={{
                fontSize: 11, padding: "4px 10px", borderRadius: 999,
                border: \`1px solid \${active && c ? c.border : active ? "var(--fg-2)" : "rgba(28,43,43,0.14)"}\`,
                background: active && c ? c.bg : active ? "var(--fg-1)" : "transparent",
                color: active && c ? c.text : active ? "var(--card-bg)" : "var(--fg-3)",
                cursor: "pointer", fontWeight: active ? 600 : 400,
                transition: "all 120ms ease", fontFamily: "var(--font-sans)",
              }}>{et.label}</button>
            );
          })}
        </div>
        <div style={{ position: "relative", paddingLeft: 18 }}>
          <div style={{ position: "absolute", left: 7, top: 8, bottom: 0, width: 1, background: "rgba(28,43,43,0.10)" }} />
          {filtered.length === 0 && <EmptyState icon="timer" message="No hay eventos de este tipo." />}
          {filtered.map(ev => {
            const et = EVENT_TYPES.find(t => t.id === ev.type) || EVENT_TYPES[5];
            const c = COLORS[et.color];
            const isLinking = linkingEvent === ev.id;
            return (
              <div key={ev.id} style={{ position: "relative", marginBottom: 10 }}>
                <div style={{
                  position: "absolute", left: -18, top: 18, width: 9, height: 9, borderRadius: "50%",
                  background: c.border, border: "2px solid var(--content-bg,#F3F1EC)", zIndex: 1,
                }} />
                <Card>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 5 }}>
                        <span style={{ fontSize: 11, color: "var(--fg-3)", fontFamily: "var(--font-mono)", flexShrink: 0 }}>{ev.date}</span>
                        <Badge color={et.color} label={et.label} />
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 500, marginBottom: ev.description ? 4 : 0 }}>{ev.title}</div>
                      {ev.description && <p style={{ margin: 0, fontSize: 12, color: "var(--fg-2)", lineHeight: 1.65 }}>{ev.description}</p>}
                    </div>
                    <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                      <Btn onClick={() => setLinkingEvent(isLinking ? null : ev.id)} variant="ghost" title="Vincular documentos" style={{ padding: "5px 8px" }}>
                        <Icon name="paperclip" size={13} />
                        {(ev.attachedDocs || []).length > 0 && (
                          <span style={{ background: "var(--fg-3)", color: "var(--card-bg)", borderRadius: 999, fontSize: 10, padding: "0 4px", lineHeight: "14px", minWidth: 14, textAlign: "center" }}>
                            {ev.attachedDocs.length}
                          </span>
                        )}
                      </Btn>
                      <ActionBtns onEdit={() => onEdit(ev)} onDelete={() => onDelete(ev.id)} />
                    </div>
                  </div>
                  {(ev.attachedDocs || []).length > 0 && !isLinking && (
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 10 }}>
                      {ev.attachedDocs.map(docId => {
                        const doc = data.documents.find(d => d.id === docId);
                        if (!doc) return null;
                        const dt = DOC_TYPES.find(d => d.id === doc.type) || DOC_TYPES[4];
                        return (
                          <a key={docId} href={doc.url || "#"} target="_blank" rel="noreferrer" style={{
                            display: "inline-flex", alignItems: "center", gap: 4,
                            fontSize: 11, background: "rgba(28,43,43,0.05)",
                            border: "1px solid rgba(28,43,43,0.12)", borderRadius: "var(--radius-sm)",
                            padding: "2px 8px", textDecoration: "none", color: "var(--fg-2)",
                          }}>
                            <Icon name={dt.icon} size={11} />
                            <span style={{ maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{doc.name}</span>
                          </a>
                        );
                      })}
                    </div>
                  )}
                  {isLinking && (
                    <div style={{ marginTop: 12, padding: "12px 14px", background: "rgba(28,43,43,0.03)", borderRadius: "var(--radius-md)", border: "1px solid rgba(28,43,43,0.10)" }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: "var(--fg-3)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>Vincular documentos</div>
                      {data.documents.length === 0 && <p style={{ fontSize: 12, color: "var(--fg-3)", margin: 0 }}>Sin documentos disponibles.</p>}
                      {data.documents.map(doc => {
                        const dt = DOC_TYPES.find(d => d.id === doc.type) || DOC_TYPES[4];
                        const linked = (ev.attachedDocs || []).includes(doc.id);
                        return (
                          <div key={doc.id} onClick={() => onToggleDocLink(ev.id, doc.id)}
                            style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 8px", borderRadius: "var(--radius-sm)", cursor: "pointer", marginBottom: 2, background: linked ? "#E1F5EE" : "transparent" }}
                            onMouseEnter={e => { if (!linked) e.currentTarget.style.background = "rgba(28,43,43,0.04)"; }}
                            onMouseLeave={e => { if (!linked) e.currentTarget.style.background = "transparent"; }}
                          >
                            <Icon name={linked ? "check" : "circle"} size={13} color={linked ? "#085041" : "var(--fg-3)"} />
                            <Icon name={dt.icon} size={12} color="var(--fg-3)" />
                            <span style={{ fontSize: 12, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontWeight: linked ? 500 : 400, color: linked ? "#085041" : "var(--fg-1)" }}>{doc.name}</span>
                          </div>
                        );
                      })}
                      <div style={{ marginTop: 8 }}><Btn onClick={() => setLinkingEvent(null)} variant="ghost" style={{ fontSize: 12 }}>Cerrar</Btn></div>
                    </div>
                  )}
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ── DocumentosView ──────────────────────────────────────────────────────────
  const DocumentosView = ({ data, onAdd, onEdit, onDelete }) => {
    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState("all");
    const filtered = data.documents.filter(doc => {
      const q = search.toLowerCase();
      const matchSearch = !q || doc.name.toLowerCase().includes(q) || (doc.tags || []).some(t => t.toLowerCase().includes(q));
      const matchType = filterType === "all" || doc.type === filterType;
      return matchSearch && matchType;
    });
    return (
      <div>
        <SectionHeader title="Documentos" subtitle="Repositorio de archivos vinculados al caso."
          action={<Btn onClick={onAdd} variant="outline"><Icon name="plus" size={13} />Agregar</Btn>} />
        <div style={{ display: "flex", gap: 8, marginBottom: 14, alignItems: "center", flexWrap: "wrap" }}>
          <SearchBar value={search} onChange={setSearch} placeholder="Buscar por nombre o etiqueta…" style={{ flex: 1, minWidth: 180 }} />
          <select value={filterType} onChange={e => setFilterType(e.target.value)} style={{ fontSize: 12, padding: "7px 10px", flexShrink: 0 }}>
            <option value="all">Todos los tipos</option>
            {DOC_TYPES.map(dt => <option key={dt.id} value={dt.id}>{dt.label}</option>)}
          </select>
        </div>
        {filtered.length === 0 && <EmptyState icon="files" message={search ? "Sin resultados para «" + search + "»." : "Sin documentos registrados."} action={
          !search && <Btn onClick={onAdd} variant="outline"><Icon name="plus" size={13} />Agregar documento</Btn>
        } />}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {filtered.map(doc => {
            const dt = DOC_TYPES.find(d => d.id === doc.type) || DOC_TYPES[4];
            return (
              <Card key={doc.id} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Icon name={dt.icon} size={20} color="var(--fg-3)" />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{doc.name}</div>
                  <div style={{ fontSize: 11, color: "var(--fg-3)", marginTop: 3, display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
                    <span>{dt.label}</span>
                    {doc.dateAdded && <span>· {doc.dateAdded}</span>}
                    {(doc.tags || []).map(t => (
                      <span key={t} style={{ background: "rgba(28,43,43,0.06)", border: "1px solid rgba(28,43,43,0.12)", borderRadius: 999, fontSize: 10, padding: "1px 6px" }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 4, flexShrink: 0, alignItems: "center" }}>
                  {doc.url && (
                    <a href={doc.url} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "5px 8px", borderRadius: "var(--radius-sm)", border: "1px solid rgba(28,43,43,0.14)", color: "var(--fg-2)", textDecoration: "none" }}>
                      <Icon name="external-link" size={13} />
                    </a>
                  )}
                  <ActionBtns onEdit={() => onEdit(doc)} onDelete={() => onDelete(doc.id)} />
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    );
  };

  // ── PersonasView ────────────────────────────────────────────────────────────
  const PersonasView = ({ data, onAdd, onEdit, onDelete }) => {
    const people = data.people || [];
    return (
      <div>
        <SectionHeader title="Personas clave" subtitle="Testigos, peritos, funcionarios y contactos relevantes."
          action={<Btn onClick={onAdd} variant="outline"><Icon name="plus" size={13} />Agregar</Btn>} />
        {people.length === 0 && <EmptyState icon="users" message="Sin personas registradas." />}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {people.map(p => {
            const pr = PERSON_ROLES.find(r => r.id === p.role) || PERSON_ROLES[4];
            return (
              <Card key={p.id}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                      <Badge color={pr.color} label={pr.label} />
                      <span style={{ fontSize: 14, fontWeight: 500 }}>{p.name}</span>
                    </div>
                    <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                      {p.phone && <span style={{ fontSize: 12, color: "var(--fg-2)", display: "flex", alignItems: "center", gap: 5 }}><Icon name="phone" size={12} />{p.phone}</span>}
                      {p.email && <a href={"mailto:" + p.email} style={{ fontSize: 12, color: "var(--fg-2)", display: "flex", alignItems: "center", gap: 5, textDecoration: "none" }}><Icon name="mail" size={12} />{p.email}</a>}
                    </div>
                    {p.notes && <p style={{ margin: "8px 0 0", fontSize: 12, color: "var(--fg-2)", lineHeight: 1.65 }}>{p.notes}</p>}
                  </div>
                  <ActionBtns onEdit={() => onEdit(p)} onDelete={() => onDelete(p.id)} />
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    );
  };

  // ── NotasView ───────────────────────────────────────────────────────────────
  const NotasView = ({ data, onAdd, onEdit, onDelete }) => {
    const notes = data.notes || [];
    return (
      <div>
        <SectionHeader title="Notas y testimonios" subtitle="Texto libre: hechos, testimonios no oficiales, correos relevantes."
          action={<Btn onClick={onAdd} variant="outline"><Icon name="plus" size={13} />Agregar</Btn>} />
        {notes.length === 0 && <EmptyState icon="notebook-text" message="Sin notas registradas." />}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {notes.map(n => {
            const et = EVENT_TYPES.find(t => t.id === n.type) || EVENT_TYPES[5];
            return (
              <Card key={n.id}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                    <Badge color={et.color} label={et.label} />
                    <span style={{ fontSize: 14, fontWeight: 500 }}>{n.title}</span>
                  </div>
                  <ActionBtns onEdit={() => onEdit(n)} onDelete={() => onDelete(n.id)} />
                </div>
                {(n.date || n.author) && <div style={{ fontSize: 11, color: "var(--fg-3)", marginBottom: 8 }}>{n.date}{n.author && <span> · {n.author}</span>}</div>}
                <p style={{ margin: 0, fontSize: 13, color: "var(--fg-2)", lineHeight: 1.75, whiteSpace: "pre-wrap" }}>{n.content}</p>
              </Card>
            );
          })}
        </div>
      </div>
    );
  };

  // ── RelacionadosView ────────────────────────────────────────────────────────
  const RelacionadosView = ({ data, onAdd, onEdit, onDelete }) => {
    const cases = data.relatedCases || [];
    return (
      <div>
        <SectionHeader title="Casos relacionados" subtitle="Expedientes, denuncias o carpetas vinculadas a este caso."
          action={<Btn onClick={onAdd} variant="outline"><Icon name="plus" size={13} />Agregar</Btn>} />
        {cases.length === 0 && <EmptyState icon="folder-open" message="Sin casos relacionados." />}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {cases.map(r => {
            const rt = RELATED_TYPES.find(t => t.id === r.type) || RELATED_TYPES[5];
            const rel = RELATION_TYPES.find(x => x.id === r.relation);
            return (
              <Card key={r.id}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 6 }}>
                      <Badge color={rt.color} label={rt.label} />
                      <span style={{ fontSize: 14, fontWeight: 500 }}>{r.number}</span>
                      {rel && <span style={{ fontSize: 12, color: "var(--fg-3)" }}>{rel.label}</span>}
                      {r.status && <span style={{ fontSize: 11, color: "var(--fg-3)", marginLeft: "auto" }}>{r.status}</span>}
                    </div>
                    {r.authority && <div style={{ fontSize: 12, color: "var(--fg-2)", marginBottom: 4, display: "flex", alignItems: "center", gap: 5 }}><Icon name="building-2" size={12} />{r.authority}</div>}
                    {r.description && <p style={{ margin: 0, fontSize: 12, color: "var(--fg-2)", lineHeight: 1.6 }}>{r.description}</p>}
                    {r.dateOpened && <div style={{ fontSize: 11, color: "var(--fg-3)", marginTop: 6 }}>Abierto: <span style={{ fontFamily: "var(--font-mono)" }}>{r.dateOpened}</span></div>}
                  </div>
                  <ActionBtns onEdit={() => onEdit(r)} onDelete={() => onDelete(r.id)} />
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    );
  };

  // ── Nav items ───────────────────────────────────────────────────────────────
  const NAV_ITEMS = [
    { id:"summary",  icon:"layout-dashboard",  label:"Resumen"        },
    { id:"pending",  icon:"check-square-2",     label:"Pendientes"     },
    { id:"dates",    icon:"calendar-days",       label:"Fechas"         },
    { id:"timeline", icon:"timer",              label:"Timeline"       },
    { id:"docs",     icon:"files",              label:"Documentos"     },
    { id:"people",   icon:"users",              label:"Personas clave" },
    { id:"notes",    icon:"notebook-text",      label:"Notas"          },
    { id:"related",  icon:"folder-open",        label:"Relacionados"   },
  ];

  // ── Sidebar ─────────────────────────────────────────────────────────────────
  const Sidebar = ({ activeTab, onTab, caseInfo, pendingCount, nextDate }) => {
    const statusColors = {
      "En proceso": { bg:"#FAEEDA", text:"#633806", border:"#BA7517" },
      "En pausa":   { bg:"#FCEBEB", text:"#791F1F", border:"#E24B4A" },
      "Resuelto":   { bg:"#EAF3DE", text:"#27500A", border:"#639922" },
      "Archivado":  { bg:"#F1EFE8", text:"#2C2C2A", border:"#888780" },
    };
    const sc = statusColors[caseInfo.status] || statusColors["En proceso"];
    return (
      <aside style={{
        width: 224, flexShrink: 0, background: "var(--sidebar-bg)",
        borderRight: "1px solid var(--sidebar-border)",
        display: "flex", flexDirection: "column",
        height: "100vh", overflow: "hidden",
        transition: "background 220ms cubic-bezier(0.22,1,0.36,1)",
      }}>
        <div style={{ padding:"20px 16px 16px", borderBottom:"1px solid var(--sidebar-border)" }}>
          <div style={{ fontFamily:"var(--font-lockup)", fontWeight:700, fontSize:10, letterSpacing:"0.20em", textTransform:"uppercase", color:"var(--sidebar-accent)", marginBottom:8 }}>
            Expediente
          </div>
          <h1 style={{ margin:"0 0 4px", fontSize:15, fontWeight:600, fontFamily:"var(--font-display)", fontVariationSettings:"'SOFT' 30, 'opsz' 30", color:"var(--sidebar-active-fg)", lineHeight:1.3, letterSpacing:"-0.01em" }}>
            {caseInfo.title || "Mi caso"}
          </h1>
          {caseInfo.folderNo && <div style={{ fontSize:11, color:"var(--sidebar-fg)", fontFamily:"var(--font-mono)", marginBottom:8 }}>{caseInfo.folderNo}</div>}
          <span style={{ display:"inline-flex", alignItems:"center", background:sc.bg, color:sc.text, border:\`1px solid \${sc.border}\`, borderRadius:999, fontSize:10, padding:"2px 8px", fontWeight:600 }}>
            {caseInfo.status}
          </span>
        </div>
        <nav style={{ flex:1, overflowY:"auto", padding:"8px" }}>
          {NAV_ITEMS.map(item => {
            const active = activeTab === item.id;
            const badge = item.id === "pending" ? pendingCount : 0;
            return (
              <button key={item.id} onClick={() => onTab(item.id)} style={{
                width:"100%", display:"flex", alignItems:"center", gap:9,
                padding:"8px 10px", borderRadius:"var(--radius-md)",
                border: active ? "1px solid var(--sidebar-border)" : "1px solid transparent",
                background: active ? "var(--sidebar-active-bg)" : "transparent",
                color: active ? "var(--sidebar-active-fg)" : "var(--sidebar-fg)",
                cursor:"pointer", fontSize:13, fontWeight: active ? 500 : 400,
                marginBottom:1, textAlign:"left",
                transition:"all 120ms cubic-bezier(0.22,1,0.36,1)",
                fontFamily:"var(--font-sans)",
              }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = "rgba(128,128,128,0.08)"; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
              >
                <Icon name={item.icon} size={15} />
                <span style={{ flex:1 }}>{item.label}</span>
                {badge > 0 && (
                  <span style={{ background:"#FCEBEB", color:"#791F1F", border:"1px solid #E24B4A", borderRadius:999, fontSize:10, padding:"0 5px", fontWeight:700, lineHeight:"16px", minWidth:18, textAlign:"center" }}>{badge}</span>
                )}
              </button>
            );
          })}
        </nav>
        <div style={{ padding:"12px 16px 16px", borderTop:"1px solid var(--sidebar-border)" }}>
          {caseInfo.court && <div style={{ fontSize:11, color:"var(--sidebar-fg)", marginBottom: nextDate ? 6 : 0, lineHeight:1.4 }}>{caseInfo.court}</div>}
          {nextDate && (
            <div style={{ display:"flex", alignItems:"flex-start", gap:5 }}>
              <Icon name="calendar-days" size={11} color="var(--sidebar-accent)" style={{ marginTop:1 }} />
              <div>
                <div style={{ fontSize:10, color:"var(--sidebar-accent)", fontWeight:500, lineHeight:1.4 }}>{nextDate.date}</div>
                <div style={{ fontSize:10, color:"var(--sidebar-fg)", lineHeight:1.4 }}>{nextDate.title}</div>
              </div>
            </div>
          )}
        </div>
      </aside>
    );
  };

  // ── GlobalSearch ────────────────────────────────────────────────────────────
  const GlobalSearch = ({ data, onNavigate, onClose }) => {
    const [query, setQuery] = useState("");
    const inputRef = useRef(null);
    useEffect(() => { inputRef.current?.focus(); }, []);
    useEffect(() => {
      const fn = e => { if (e.key === "Escape") onClose(); };
      window.addEventListener("keydown", fn);
      return () => window.removeEventListener("keydown", fn);
    }, [onClose]);
    const results = query.trim().length < 2 ? [] : (() => {
      const q = query.toLowerCase(); const res = [];
      data.events.forEach(ev => {
        if ([ev.title, ev.description, ev.date].some(f => f?.toLowerCase().includes(q))) {
          const et = EVENT_TYPES.find(t => t.id === ev.type) || EVENT_TYPES[5];
          res.push({ color:et.color, label:et.label, title:ev.title, sub:ev.date, tab:"timeline" });
        }
      });
      data.documents.forEach(doc => {
        if ([doc.name, ...(doc.tags||[])].some(f => f?.toLowerCase().includes(q)))
          res.push({ color:"teal", label:"Documento", title:doc.name, sub:doc.dateAdded, url:doc.url, tab:"docs" });
      });
      (data.notes||[]).forEach(n => {
        if ([n.title, n.content, n.author].some(f => f?.toLowerCase().includes(q))) {
          const et = EVENT_TYPES.find(t => t.id === n.type) || EVENT_TYPES[5];
          res.push({ color:et.color, label:et.label, title:n.title, sub:n.date, tab:"notes" });
        }
      });
      (data.pendingRequests||[]).forEach(p => {
        if ([p.description, p.requestedBy].some(f => f?.toLowerCase().includes(q)))
          res.push({ color:p.done?"green":"red", label:p.done?"Completado":"Pendiente", title:p.description, sub:p.requestedBy, tab:"pending" });
      });
      (data.people||[]).forEach(p => {
        if ([p.name, p.notes, p.phone, p.email].some(f => f?.toLowerCase().includes(q))) {
          const pr = PERSON_ROLES.find(r => r.id === p.role) || PERSON_ROLES[4];
          res.push({ color:pr.color, label:pr.label, title:p.name, sub:p.phone||p.email, tab:"people" });
        }
      });
      return res.slice(0, 12);
    })();
    return (
      <div style={{ position:"fixed", inset:0, background:"rgba(28,43,43,0.44)", display:"flex", alignItems:"flex-start", justifyContent:"center", zIndex:800, paddingTop:"14vh" }} onClick={onClose}>
        <div onClick={e => e.stopPropagation()} style={{ width:"min(560px,90vw)", background:"#FFFFFF", border:"1px solid rgba(28,43,43,0.12)", borderRadius:"var(--radius-xl)", boxShadow:"0 20px 48px -16px rgba(28,43,43,0.30)", overflow:"hidden", animation:"fadein 150ms ease-out" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, padding:"14px 16px", borderBottom:"1px solid rgba(28,43,43,0.10)" }}>
            <Icon name="search" size={17} color="var(--fg-3)" />
            <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar en el expediente…" style={{ flex:1, border:"none", outline:"none", background:"transparent", fontSize:15, color:"var(--fg-1)", fontFamily:"var(--font-sans)" }} />
            <Btn onClick={onClose} variant="ghost" style={{ padding:"4px 8px" }}><Icon name="x" size={14} /></Btn>
          </div>
          {query.trim().length < 2 ? (
            <div style={{ padding:"14px 16px", fontSize:12, color:"var(--fg-3)" }}>Escribe al menos 2 caracteres para buscar…</div>
          ) : results.length === 0 ? (
            <div style={{ padding:"20px 16px", fontSize:13, color:"var(--fg-3)" }}>Sin resultados para «{query}»</div>
          ) : (
            <div style={{ maxHeight:"50vh", overflowY:"auto" }}>
              {results.map((r, i) => (
                <div key={i} onClick={() => { onNavigate(r.tab); onClose(); }}
                  style={{ display:"flex", gap:10, alignItems:"center", padding:"10px 16px", cursor:"pointer", borderBottom: i < results.length-1 ? "1px solid rgba(28,43,43,0.07)" : "none" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#F3F1EC"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <Badge color={r.color} label={r.label} />
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13, fontWeight:500, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{r.title}</div>
                    {r.sub && <div style={{ fontSize:11, color:"var(--fg-3)", marginTop:1 }}>{r.sub}</div>}
                  </div>
                  {r.url && <a href={r.url} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={{ color:"var(--fg-3)" }}><Icon name="external-link" size={13} /></a>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // ── Modal forms ─────────────────────────────────────────────────────────────
  const EventModal = ({ form, setForm, onSave, onClose }) => (
    <Modal title={form.id ? "Editar evento" : "Nuevo evento"} onClose={onClose} onSave={onSave}>
      <Field label="Fecha" type="date" value={form.date||""} onChange={v => setForm(f => ({...f, date:v}))} required />
      <Field label="Tipo" as="select" value={form.type||"legal"} onChange={v => setForm(f => ({...f, type:v}))} options={EVENT_TYPES.map(t => ({ value:t.id, label:t.label }))} />
      <Field label="Título" value={form.title||""} onChange={v => setForm(f => ({...f, title:v}))} required placeholder="Breve descripción del evento" />
      <Field label="Descripción" as="textarea" rows={3} value={form.description||""} onChange={v => setForm(f => ({...f, description:v}))} placeholder="Detalles adicionales…" />
    </Modal>
  );
  const DocModal = ({ form, setForm, onSave, onClose }) => (
    <Modal title={form.id ? "Editar documento" : "Nuevo documento"} onClose={onClose} onSave={onSave}>
      <Field label="Nombre del archivo" value={form.name||""} onChange={v => setForm(f => ({...f, name:v}))} required placeholder="Ej. Acta de nacimiento.pdf" />
      <Field label="Fuente" as="select" value={form.type||"google_drive"} onChange={v => setForm(f => ({...f, type:v}))} options={DOC_TYPES.map(t => ({ value:t.id, label:t.label }))} />
      <Field label="URL / enlace al archivo" type="url" value={form.url||""} onChange={v => setForm(f => ({...f, url:v}))} placeholder="https://…" />
      <Field label="Etiquetas (separadas por coma)" value={form.tags||""} onChange={v => setForm(f => ({...f, tags:v}))} placeholder="Ej. legal, original, pendiente" />
      <Field label="Fecha de incorporación" type="date" value={form.dateAdded||""} onChange={v => setForm(f => ({...f, dateAdded:v}))} />
    </Modal>
  );
  const NoteModal = ({ form, setForm, onSave, onClose }) => (
    <Modal title={form.id ? "Editar nota" : "Nueva nota"} onClose={onClose} onSave={onSave}>
      <Field label="Título" value={form.title||""} onChange={v => setForm(f => ({...f, title:v}))} required />
      <Field label="Tipo" as="select" value={form.type||"other"} onChange={v => setForm(f => ({...f, type:v}))} options={EVENT_TYPES.map(t => ({ value:t.id, label:t.label }))} />
      <Field label="Fecha" type="date" value={form.date||""} onChange={v => setForm(f => ({...f, date:v}))} />
      <Field label="Autor / fuente" value={form.author||""} onChange={v => setForm(f => ({...f, author:v}))} placeholder="Nombre de quien lo reporta" />
      <Field label="Contenido" as="textarea" rows={6} value={form.content||""} onChange={v => setForm(f => ({...f, content:v}))} required />
    </Modal>
  );
  const PendingModal = ({ form, setForm, onSave, onClose }) => (
    <Modal title={form.id ? "Editar pendiente" : "Nuevo pendiente"} onClose={onClose} onSave={onSave}>
      <Field label="Descripción de lo solicitado" value={form.description||""} onChange={v => setForm(f => ({...f, description:v}))} required placeholder="Ej. Comprobante de domicilio actual" />
      <Field label="Solicitado por" value={form.requestedBy||""} onChange={v => setForm(f => ({...f, requestedBy:v}))} placeholder="Ej. Abogado, Juzgado…" />
      <Field label="Fecha límite" type="date" value={form.date||""} onChange={v => setForm(f => ({...f, date:v}))} />
    </Modal>
  );
  const PersonModal = ({ form, setForm, onSave, onClose }) => (
    <Modal title={form.id ? "Editar persona" : "Nueva persona clave"} onClose={onClose} onSave={onSave}>
      <Field label="Nombre completo" value={form.name||""} onChange={v => setForm(f => ({...f, name:v}))} required />
      <Field label="Rol" as="select" value={form.role||"testigo"} onChange={v => setForm(f => ({...f, role:v}))} options={PERSON_ROLES.map(r => ({ value:r.id, label:r.label }))} />
      <Field label="Teléfono" value={form.phone||""} onChange={v => setForm(f => ({...f, phone:v}))} placeholder="55 0000 0000" />
      <Field label="Email" type="email" value={form.email||""} onChange={v => setForm(f => ({...f, email:v}))} />
      <Field label="Notas / contexto" as="textarea" rows={3} value={form.notes||""} onChange={v => setForm(f => ({...f, notes:v}))} />
    </Modal>
  );
  const DateModal = ({ form, setForm, onSave, onClose }) => (
    <Modal title={form.id ? "Editar fecha" : "Nueva fecha importante"} onClose={onClose} onSave={onSave}>
      <Field label="Fecha" type="date" value={form.date||""} onChange={v => setForm(f => ({...f, date:v}))} required />
      <Field label="Descripción del evento" value={form.title||""} onChange={v => setForm(f => ({...f, title:v}))} required placeholder="Ej. Audiencia preliminar" />
      <Field label="Lugar" value={form.location||""} onChange={v => setForm(f => ({...f, location:v}))} placeholder="Juzgado, sala, domicilio…" />
      <Field label="Notas adicionales" as="textarea" rows={3} value={form.notes||""} onChange={v => setForm(f => ({...f, notes:v}))} />
    </Modal>
  );
  const RelatedModal = ({ form, setForm, onSave, onClose }) => (
    <Modal title={form.id ? "Editar relacionado" : "Nuevo caso relacionado"} onClose={onClose} onSave={onSave}>
      <Field label="Número de expediente / folio" value={form.number||""} onChange={v => setForm(f => ({...f, number:v}))} required placeholder="Ej. DEN-2024-012" />
      <Field label="Tipo" as="select" value={form.type||"carpeta"} onChange={v => setForm(f => ({...f, type:v}))} options={RELATED_TYPES.map(t => ({ value:t.id, label:t.label }))} />
      <Field label="Relación con este caso" as="select" value={form.relation||"derivado_de"} onChange={v => setForm(f => ({...f, relation:v}))} options={RELATION_TYPES.map(t => ({ value:t.id, label:t.label }))} />
      <Field label="Autoridad / instancia" value={form.authority||""} onChange={v => setForm(f => ({...f, authority:v}))} placeholder="Ministerio Público, Juzgado…" />
      <Field label="Estado" value={form.status||""} onChange={v => setForm(f => ({...f, status:v}))} placeholder="Abierto, Cerrado, En proceso…" />
      <Field label="Descripción" as="textarea" rows={3} value={form.description||""} onChange={v => setForm(f => ({...f, description:v}))} />
      <Field label="Fecha de apertura" type="date" value={form.dateOpened||""} onChange={v => setForm(f => ({...f, dateOpened:v}))} />
    </Modal>
  );
  const CaseModal = ({ form, setForm, onSave, onClose }) => (
    <Modal title="Datos del caso" onClose={onClose} onSave={onSave}>
      <Field label="Nombre / título del caso" value={form.title||""} onChange={v => setForm(f => ({...f, title:v}))} required />
      <Field label="Número de expediente / folio" value={form.folderNo||""} onChange={v => setForm(f => ({...f, folderNo:v}))} placeholder="Ej. FAM-2024-0041" />
      <Field label="Juzgado / instancia" value={form.court||""} onChange={v => setForm(f => ({...f, court:v}))} />
      <Field label="Estado" as="select" value={form.status||"En proceso"} onChange={v => setForm(f => ({...f, status:v}))} options={[
        { value:"En proceso", label:"En proceso" }, { value:"En pausa", label:"En pausa" },
        { value:"Resuelto", label:"Resuelto" },    { value:"Archivado", label:"Archivado" },
      ]} />
      <Field label="Contraparte (opcional)" value={form.opponent||""} onChange={v => setForm(f => ({...f, opponent:v}))} />
      <Field label="Descripción general del caso" as="textarea" rows={4} value={form.notes||""} onChange={v => setForm(f => ({...f, notes:v}))} placeholder="Hechos principales y contexto del proceso…" />
    </Modal>
  );

  // ── Loading / Error states ──────────────────────────────────────────────────
  const LoadingState = () => (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100vh", background:"#F3F1EC" }}>
      <div style={{ textAlign:"center", color:"#8E9494" }}>
        <Icon name="loader" size={28} style={{ opacity:0.5, animation:"spin 1s linear infinite" }} />
        <p style={{ marginTop:12, fontSize:13 }}>Cargando expediente…</p>
      </div>
    </div>
  );
  const ErrorState = ({ message }) => (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100vh", background:"#F3F1EC" }}>
      <div style={{ textAlign:"center", color:"#B04A3A", maxWidth:320, padding:24 }}>
        <Icon name="alert-circle" size={32} />
        <p style={{ marginTop:12, fontSize:14, fontWeight:500 }}>Error al cargar el expediente</p>
        <p style={{ fontSize:12, color:"#6E7676", marginTop:6, lineHeight:1.6 }}>{message}</p>
        <button onClick={() => window.location.reload()} style={{ marginTop:16, fontFamily:"var(--font-sans)", fontSize:13, padding:"8px 16px", borderRadius:"var(--radius-sm)", border:"1px solid rgba(28,43,43,0.22)", background:"transparent", color:"var(--fg-2)", cursor:"pointer" }}>Reintentar</button>
      </div>
    </div>
  );

  // ── Save status indicator ───────────────────────────────────────────────────
  const SaveIndicator = ({ status }) => {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
      if (status === "saving") { setVisible(true); return; }
      if (status === "saved") {
        setVisible(true);
        const t = setTimeout(() => setVisible(false), 2000);
        return () => clearTimeout(t);
      }
      if (status === "error") { setVisible(true); }
    }, [status]);
    if (!visible) return null;
    const cfg = {
      saving: { color:"#C58B2A", text:"Guardando…" },
      saved:  { color:"#2F5A4E", text:"Guardado" },
      error:  { color:"#B04A3A", text:"Error al guardar" },
    }[status] || {};
    return (
      <span style={{ fontSize:11, color:cfg.color, display:"flex", alignItems:"center", gap:4, transition:"opacity 300ms ease" }}>
        {status === "saving" && <Icon name="loader" size={11} style={{ animation:"spin 1s linear infinite" }} />}
        {status === "saved"  && <Icon name="check" size={11} />}
        {status === "error"  && <Icon name="alert-circle" size={11} />}
        {cfg.text}
      </span>
    );
  };

  // ── App ─────────────────────────────────────────────────────────────────────
  function App() {
    const [data,       setData]       = useState(null);
    const [loading,    setLoading]    = useState(true);
    const [loadError,  setLoadError]  = useState(null);
    const [tab,        setTab]        = useState("summary");
    const [modal,      setModal]      = useState(null);
    const [form,       setForm]       = useState({});
    const [showSearch, setShowSearch] = useState(false);
    const [theme,      setTheme]      = useState("papel");
    const [saveStatus, setSaveStatus] = useState("saved");
    const saveTimer   = useRef(null);
    const pendingData = useRef(null);

    // Load data from API on mount
    useEffect(() => {
      fetch("/api/data")
        .then(r => {
          if (r.status === 401) { window.location.href = "/login"; return null; }
          if (!r.ok) throw new Error("HTTP " + r.status);
          return r.json();
        })
        .then(d => { if (d) { setData(d); setLoading(false); } })
        .catch(err => { setLoadError(err.message); setLoading(false); });
    }, []);

    // Render Lucide icons after every paint
    useLayoutEffect(() => { if (window.lucide) window.lucide.createIcons(); });

    // Flush pending save on tab close
    useEffect(() => {
      const handler = () => {
        if (pendingData.current) {
          const blob = new Blob([JSON.stringify(pendingData.current)], { type:"application/json" });
          navigator.sendBeacon("/api/data", blob);
        }
      };
      window.addEventListener("unload", handler);
      return () => window.removeEventListener("unload", handler);
    }, []);

    // ⌘K global search
    useEffect(() => {
      const fn = e => { if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setShowSearch(true); } };
      window.addEventListener("keydown", fn);
      return () => window.removeEventListener("keydown", fn);
    }, []);

    // Ctrl+S manual save
    const doSave = useCallback(async (d) => {
      setSaveStatus("saving");
      try {
        const r = await fetch("/api/data", { method:"PUT", headers:{"Content-Type":"application/json"}, body:JSON.stringify(d) });
        if (r.status === 401) { window.location.href = "/login"; return; }
        setSaveStatus(r.ok ? "saved" : "error");
        if (r.ok) pendingData.current = null;
      } catch { setSaveStatus("error"); }
    }, []);

    useEffect(() => {
      const fn = e => {
        if ((e.metaKey || e.ctrlKey) && e.key === "s") {
          e.preventDefault();
          if (saveTimer.current) { clearTimeout(saveTimer.current); saveTimer.current = null; }
          if (pendingData.current) doSave(pendingData.current);
        }
      };
      window.addEventListener("keydown", fn);
      return () => window.removeEventListener("keydown", fn);
    }, [doSave]);

    const upd = useCallback(d => {
      setData(d);
      pendingData.current = d;
      setSaveStatus("saving");
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => { doSave(d); }, 600);
    }, [doSave]);

    const closeModal = useCallback(() => { setModal(null); setForm({}); }, []);

    if (loading) return <LoadingState />;
    if (loadError) return <ErrorState message={loadError} />;
    if (!data) return null;

    const today = new Date().toISOString().slice(0, 10);
    const pendingCount = (data.pendingRequests || []).filter(p => !p.done).length;
    const nextDate = [...(data.upcomingDates || [])].filter(d => d.date >= today).sort((a,b) => a.date.localeCompare(b.date))[0];
    const themeVars = THEMES[theme] || THEMES.papel;
    const themeOrder = ["papel", "tinta", "lavanda"];

    const tagsStr = arr => (arr || []).join(", ");
    const tagsArr = s => s ? s.split(",").map(x => x.trim()).filter(Boolean) : [];

    const openAdd = type => {
      const defaults = {
        event:   { date:today, type:"legal",       title:"", description:"", attachedDocs:[] },
        doc:     { name:"",    type:"google_drive", url:"",  tags:"",         dateAdded:today  },
        note:    { date:today, type:"other",        title:"", content:"",    author:""        },
        pending: { date:today, requestedBy:"",      description:"", done:false               },
        person:  { role:"testigo", name:"",         phone:"", email:"",      notes:""         },
        date:    { date:today, title:"",            location:"", notes:""                     },
        related: { type:"carpeta", relation:"derivado_de", number:"", authority:"", status:"", description:"", dateOpened:today },
        case:    { ...data.caseInfo },
      };
      setForm(defaults[type] || {}); setModal(type);
    };
    const openEdit = (type, item) => {
      setForm(type === "doc" ? { ...item, tags: tagsStr(item.tags) } : { ...item });
      setModal(type);
    };

    const save = {
      event: () => {
        if (!form.title || !form.date) return;
        const ev = { ...form, id: form.id || "e" + Date.now(), attachedDocs: form.attachedDocs || [] };
        const events = (form.id ? data.events.map(e => e.id === ev.id ? ev : e) : [...data.events, ev])
          .sort((a,b) => a.date.localeCompare(b.date));
        upd({ ...data, events }); closeModal();
      },
      doc: () => {
        if (!form.name) return;
        const doc = { ...form, id: form.id || "d" + Date.now(), tags: tagsArr(form.tags) };
        upd({ ...data, documents: form.id ? data.documents.map(d => d.id === doc.id ? doc : d) : [...data.documents, doc] });
        closeModal();
      },
      note: () => {
        if (!form.title) return;
        const n = { ...form, id: form.id || "n" + Date.now() };
        upd({ ...data, notes: form.id ? (data.notes||[]).map(x => x.id === n.id ? n : x) : [...(data.notes||[]), n] });
        closeModal();
      },
      pending: () => {
        if (!form.description) return;
        const p = { ...form, id: form.id || "p" + Date.now() };
        upd({ ...data, pendingRequests: form.id ? (data.pendingRequests||[]).map(x => x.id === p.id ? p : x) : [...(data.pendingRequests||[]), p] });
        closeModal();
      },
      person: () => {
        if (!form.name) return;
        const p = { ...form, id: form.id || "pe" + Date.now() };
        upd({ ...data, people: form.id ? (data.people||[]).map(x => x.id === p.id ? p : x) : [...(data.people||[]), p] });
        closeModal();
      },
      date: () => {
        if (!form.title || !form.date) return;
        const d = { ...form, id: form.id || "ud" + Date.now() };
        const dates = (form.id ? (data.upcomingDates||[]).map(x => x.id === d.id ? d : x) : [...(data.upcomingDates||[]), d])
          .sort((a,b) => a.date.localeCompare(b.date));
        upd({ ...data, upcomingDates: dates }); closeModal();
      },
      related: () => {
        if (!form.number) return;
        const r = { ...form, id: form.id || "r" + Date.now() };
        upd({ ...data, relatedCases: form.id ? (data.relatedCases||[]).map(x => x.id === r.id ? r : x) : [...(data.relatedCases||[]), r] });
        closeModal();
      },
      case: () => { upd({ ...data, caseInfo: form }); closeModal(); },
    };

    const del = {
      event:   id => upd({ ...data, events:         data.events.filter(e => e.id !== id) }),
      doc:     id => upd({ ...data, documents:       data.documents.filter(d => d.id !== id) }),
      note:    id => upd({ ...data, notes:           (data.notes||[]).filter(n => n.id !== id) }),
      pending: id => upd({ ...data, pendingRequests: (data.pendingRequests||[]).filter(p => p.id !== id) }),
      person:  id => upd({ ...data, people:          (data.people||[]).filter(p => p.id !== id) }),
      date:    id => upd({ ...data, upcomingDates:   (data.upcomingDates||[]).filter(d => d.id !== id) }),
      related: id => upd({ ...data, relatedCases:    (data.relatedCases||[]).filter(r => r.id !== id) }),
    };

    const togglePending = id => upd({
      ...data, pendingRequests: (data.pendingRequests||[]).map(p => p.id === id ? { ...p, done:!p.done } : p),
    });
    const toggleDocLink = (evId, docId) => {
      const events = data.events.map(ev => {
        if (ev.id !== evId) return ev;
        const l = ev.attachedDocs || [];
        return { ...ev, attachedDocs: l.includes(docId) ? l.filter(d => d !== docId) : [...l, docId] };
      });
      upd({ ...data, events });
    };
    const exportJSON = () => {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type:"application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "expediente_" + (data.caseInfo.folderNo || "caso") + "_" + today + ".json";
      a.click(); URL.revokeObjectURL(a.href);
    };
    const logout = () => {
      fetch("/logout", { method:"POST" }).finally(() => { window.location.href = "/login"; });
    };

    return (
      <div style={{ display:"flex", height:"100vh", overflow:"hidden", ...themeVars }}>
        <Sidebar activeTab={tab} onTab={setTab} caseInfo={data.caseInfo} pendingCount={pendingCount} nextDate={nextDate} />
        <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0, background:"var(--content-bg)", transition:"background 220ms ease" }}>
          {/* Top bar */}
          <div style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 20px", borderBottom:"1px solid rgba(28,43,43,0.10)", background:"var(--card-bg)", flexShrink:0, transition:"background 220ms ease" }}>
            <button onClick={() => setShowSearch(true)} style={{ flex:1, display:"flex", alignItems:"center", gap:8, padding:"7px 12px", borderRadius:"var(--radius-sm)", border:"1px solid rgba(28,43,43,0.14)", background:"rgba(28,43,43,0.03)", color:"var(--fg-3)", cursor:"text", textAlign:"left", fontFamily:"var(--font-sans)", fontSize:13, maxWidth:480 }}>
              <Icon name="search" size={14} />
              <span>Buscar en el expediente…</span>
              <span style={{ marginLeft:"auto", fontSize:11, opacity:0.6 }}>⌘K</span>
            </button>
            <SaveIndicator status={saveStatus} />
            <Btn onClick={() => { const idx = themeOrder.indexOf(theme); setTheme(themeOrder[(idx+1) % themeOrder.length]); }} variant="ghost" title={"Tema: " + theme} style={{ padding:"7px 10px", flexShrink:0 }}>
              <Icon name="palette" size={14} />
            </Btn>
            <Btn onClick={exportJSON} variant="ghost" title="Exportar JSON" style={{ padding:"7px 10px", flexShrink:0 }}>
              <Icon name="download" size={14} />
            </Btn>
            <Btn onClick={logout} variant="ghost" title="Cerrar sesión" style={{ padding:"7px 10px", flexShrink:0 }}>
              <Icon name="log-out" size={14} />
            </Btn>
          </div>
          {/* Content */}
          <div style={{ flex:1, overflowY:"auto", padding:"24px 28px" }}>
            {tab==="summary"  && <ResumenView     data={data} onEditCase={() => openAdd("case")} onGoTo={setTab} />}
            {tab==="pending"  && <PendientesView  data={data} onToggle={togglePending} onAdd={() => openAdd("pending")} onEdit={p => openEdit("pending",p)} onDelete={del.pending} />}
            {tab==="dates"    && <FechasView      data={data} onAdd={() => openAdd("date")}    onEdit={d => openEdit("date",d)}    onDelete={del.date}    />}
            {tab==="timeline" && <TimelineView    data={data} onAdd={() => openAdd("event")}   onEdit={e => openEdit("event",e)}   onDelete={del.event}   onToggleDocLink={toggleDocLink} />}
            {tab==="docs"     && <DocumentosView  data={data} onAdd={() => openAdd("doc")}     onEdit={d => openEdit("doc",d)}     onDelete={del.doc}     />}
            {tab==="people"   && <PersonasView    data={data} onAdd={() => openAdd("person")}  onEdit={p => openEdit("person",p)}  onDelete={del.person}  />}
            {tab==="notes"    && <NotasView       data={data} onAdd={() => openAdd("note")}    onEdit={n => openEdit("note",n)}    onDelete={del.note}    />}
            {tab==="related"  && <RelacionadosView data={data} onAdd={() => openAdd("related")} onEdit={r => openEdit("related",r)} onDelete={del.related} />}
          </div>
        </div>

        {modal==="event"   && <EventModal   form={form} setForm={setForm} onSave={save.event}   onClose={closeModal} />}
        {modal==="doc"     && <DocModal     form={form} setForm={setForm} onSave={save.doc}     onClose={closeModal} />}
        {modal==="note"    && <NoteModal    form={form} setForm={setForm} onSave={save.note}    onClose={closeModal} />}
        {modal==="pending" && <PendingModal form={form} setForm={setForm} onSave={save.pending} onClose={closeModal} />}
        {modal==="person"  && <PersonModal  form={form} setForm={setForm} onSave={save.person}  onClose={closeModal} />}
        {modal==="date"    && <DateModal    form={form} setForm={setForm} onSave={save.date}    onClose={closeModal} />}
        {modal==="related" && <RelatedModal form={form} setForm={setForm} onSave={save.related} onClose={closeModal} />}
        {modal==="case"    && <CaseModal    form={form} setForm={setForm} onSave={save.case}    onClose={closeModal} />}

        {showSearch && <GlobalSearch data={data} onNavigate={setTab} onClose={() => setShowSearch(false)} />}
      </div>
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
  </script>
</body>
</html>`
}
