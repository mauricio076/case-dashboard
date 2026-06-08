// expediente-ui.jsx — Shared UI components (Lucide icons via data-lucide)
// Requires: COLORS from window
// Exports to window: Icon, Badge, Btn, ActionBtns, Card, SectionHeader, EmptyState, Field, Modal, SearchBar

const { useState: useStateUI } = React;

// ── Icon map: Tabler → Lucide ─────────────────────────────────────────────
const ICON_MAP = {
  "ti-layout-dashboard":   "layout-dashboard",
  "ti-checklist":          "check-square-2",
  "ti-calendar-event":     "calendar-days",
  "ti-timeline":           "timer",
  "ti-files":              "files",
  "ti-users":              "users",
  "ti-notes":              "notebook-text",
  "ti-folders":            "folder-open",
  "ti-edit":               "pencil",
  "ti-trash":              "trash-2",
  "ti-plus":               "plus",
  "ti-search":             "search",
  "ti-x":                  "x",
  "ti-circle":             "circle",
  "ti-circle-check":       "circle-check",
  "ti-chevron-right":      "chevron-right",
  "ti-external-link":      "external-link",
  "ti-paperclip":          "paperclip",
  "ti-check":              "check",
  "ti-download":           "download",
  "ti-menu-2":             "menu",
  "ti-building":           "building-2",
  "ti-map-pin":            "map-pin",
  "ti-phone":              "phone",
  "ti-mail":               "mail",
  "ti-user":               "user",
  "ti-calendar-off":       "calendar-x",
  "ti-inbox":              "inbox",
  "ti-brand-google-drive": "hard-drive",
  "ti-cloud":              "cloud",
  "ti-brand-dropbox":      "cloud",
  "ti-device-laptop":      "laptop-minimal",
  "ti-link":               "link",
  "ti-calendar":           "calendar",
  "ti-file-download":      "download",
};

// ── Icon ──────────────────────────────────────────────────────────────────
// name: "ti-edit" (tabler style, looked up in ICON_MAP) OR direct Lucide name
const Icon = ({ name, size = 14, style = {}, color }) => {
  const lucideName = name.startsWith("ti-")
    ? (ICON_MAP[name] || name.replace(/^ti-/, ""))
    : name;
  return (
    <i
      data-lucide={lucideName}
      style={{
        width: size, height: size,
        display: "inline-block", flexShrink: 0,
        lineHeight: 1, color,
        ...style,
      }}
    />
  );
};

// ── Badge ─────────────────────────────────────────────────────────────────
const Badge = ({ color = "gray", label }) => {
  const c = COLORS[color] || COLORS.gray;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      background: c.bg, color: c.text, border: `1px solid ${c.border}`,
      borderRadius: 999, fontSize: 11, padding: "2px 8px",
      fontWeight: 600, whiteSpace: "nowrap", lineHeight: 1.45,
      fontFamily: "var(--font-sans)", letterSpacing: "0.01em",
    }}>
      {label}
    </span>
  );
};

// ── Btn ───────────────────────────────────────────────────────────────────
const Btn = ({ onClick, children, variant = "ghost", danger = false, disabled = false, style = {}, title, type = "button" }) => {
  const [over, setOver] = useStateUI(false);
  const [press, setPress] = useStateUI(false);

  let bg, borderColor, color;
  if (variant === "primary") {
    bg = over ? "#C46A4A" : "#D27653";
    borderColor = over ? "#A85638" : "#C46A4A";
    color = "#FFFFFF";
  } else if (variant === "outline") {
    bg = over ? "rgba(28,43,43,0.05)" : "transparent";
    borderColor = "rgba(28,43,43,0.22)";
    color = "var(--fg-2)";
  } else {
    bg = over ? "rgba(28,43,43,0.06)" : "transparent";
    borderColor = over ? "rgba(28,43,43,0.20)" : "rgba(28,43,43,0.14)";
    color = danger ? "#B04A3A" : "var(--fg-2)";
  }

  return (
    <button
      type={type} onClick={onClick} disabled={disabled} title={title}
      onMouseEnter={() => setOver(true)}
      onMouseLeave={() => { setOver(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 5,
        fontSize: 13, fontWeight: 500, padding: "6px 10px",
        borderRadius: "var(--radius-sm)", border: `1px solid ${borderColor}`,
        background: bg, color, cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        transition: "all 120ms cubic-bezier(0.22,1,0.36,1)",
        transform: press ? "scale(0.985)" : over ? "translateY(-1px)" : "none",
        fontFamily: "var(--font-sans)", lineHeight: 1,
        ...style,
      }}
    >
      {children}
    </button>
  );
};

// ── ActionBtns ────────────────────────────────────────────────────────────
const ActionBtns = ({ onEdit, onDelete }) => (
  <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
    <Btn onClick={onEdit}   variant="ghost"       title="Editar">
      <Icon name="ti-edit"  size={13} />
    </Btn>
    <Btn onClick={onDelete} variant="ghost" danger title="Eliminar">
      <Icon name="ti-trash" size={13} />
    </Btn>
  </div>
);

// ── Card ──────────────────────────────────────────────────────────────────
const Card = ({ children, style = {}, onClick }) => (
  <div onClick={onClick} style={{
    background: "var(--card-bg)",
    border: "1px solid var(--card-border)",
    borderRadius: "var(--radius-lg)",
    padding: "14px 16px",
    ...style,
  }}>
    {children}
  </div>
);

// ── SectionHeader ─────────────────────────────────────────────────────────
const SectionHeader = ({ title, subtitle, action }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
    <div>
      <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: "var(--fg-1)", letterSpacing: "-0.01em", lineHeight: 1.3 }}>
        {title}
      </h2>
      {subtitle && <p style={{ margin: "4px 0 0", fontSize: 12, color: "var(--fg-3)", lineHeight: 1.4 }}>{subtitle}</p>}
    </div>
    {action && <div style={{ flexShrink: 0, marginLeft: 12 }}>{action}</div>}
  </div>
);

// ── EmptyState ────────────────────────────────────────────────────────────
const EmptyState = ({ icon = "inbox", message, action }) => (
  <div style={{
    display: "flex", flexDirection: "column", alignItems: "center",
    justifyContent: "center", padding: "48px 24px", gap: 12,
    color: "var(--fg-3)", textAlign: "center",
  }}>
    <Icon name={icon.startsWith("ti-") ? icon : icon} size={28} style={{ opacity: 0.35 }} />
    <p style={{ margin: 0, fontSize: 13 }}>{message}</p>
    {action}
  </div>
);

// ── Field ─────────────────────────────────────────────────────────────────
const Field = ({ label, value, onChange, type = "text", as, rows = 3, options, required, placeholder }) => (
  <div style={{ marginBottom: 12 }}>
    <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "var(--fg-2)", marginBottom: 4 }}>
      {label}
      {required && <span style={{ color: "#B04A3A", marginLeft: 2 }}>*</span>}
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

// ── Modal ─────────────────────────────────────────────────────────────────
const Modal = ({ title, onClose, children, onSave, saveLabel = "Guardar" }) => (
  <div style={{
    position: "fixed", inset: 0, background: "rgba(28,43,43,0.48)",
    display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 900, padding: "1rem",
  }} onClick={onClose}>
    <div onClick={e => e.stopPropagation()} style={{
      background: "#FFFFFF",
      border: "1px solid rgba(28,43,43,0.12)",
      borderRadius: "var(--radius-xl)",
      padding: "1.5rem",
      width: "min(520px,100%)",
      maxHeight: "88vh", overflowY: "auto",
      boxShadow: "0 20px 48px -16px rgba(28,43,43,0.30)",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: "var(--fg-1)" }}>{title}</h3>
        <Btn onClick={onClose} variant="ghost" style={{ padding: "4px 8px" }}>
          <Icon name="ti-x" size={14} />
        </Btn>
      </div>
      {children}
      {onSave && (
        <div style={{
          display: "flex", justifyContent: "flex-end", gap: 8,
          marginTop: 20, paddingTop: 16,
          borderTop: "1px solid rgba(28,43,43,0.10)",
        }}>
          <Btn onClick={onClose} variant="outline">Cancelar</Btn>
          <Btn onClick={onSave}  variant="primary">{saveLabel}</Btn>
        </div>
      )}
    </div>
  </div>
);

// ── SearchBar ─────────────────────────────────────────────────────────────
const SearchBar = ({ value, onChange, placeholder = "Buscar…", style = {} }) => (
  <div style={{ position: "relative", ...style }}>
    <Icon name="ti-search" size={14} style={{
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
        <Icon name="ti-x" size={11} />
      </button>
    )}
  </div>
);

Object.assign(window, { Icon, Badge, Btn, ActionBtns, Card, SectionHeader, EmptyState, Field, Modal, SearchBar });
