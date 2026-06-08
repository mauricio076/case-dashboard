// expediente-app.jsx — App, Sidebar, GlobalSearch, Modals, mount (Lucide icons)
// Calls lucide.createIcons() via useLayoutEffect after every render

const {
  useState: useStateApp,
  useEffect: useEffectApp,
  useLayoutEffect: useLayoutEffectApp,
  useRef: useRefApp,
  useCallback: useCallbackApp,
} = React;

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

// ── Sidebar ────────────────────────────────────────────────────────────────
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
      width: 224, flexShrink: 0,
      background: "var(--sidebar-bg)",
      borderRight: "1px solid var(--sidebar-border)",
      display: "flex", flexDirection: "column",
      height: "100vh", overflow: "hidden",
      transition: "background 220ms cubic-bezier(0.22,1,0.36,1)",
    }}>
      {/* Identity */}
      <div style={{ padding:"20px 16px 16px", borderBottom:"1px solid var(--sidebar-border)" }}>
        <div style={{
          fontFamily: "var(--font-lockup)", fontWeight: 700,
          fontSize: 10, letterSpacing: "0.20em", textTransform: "uppercase",
          color: "var(--sidebar-accent)", marginBottom: 8,
        }}>
          Expediente
        </div>
        <h1 style={{
          margin: "0 0 4px", fontSize: 15, fontWeight: 600,
          fontFamily: "var(--font-display)",
          fontVariationSettings: "'SOFT' 30, 'opsz' 30",
          color: "var(--sidebar-active-fg)",
          lineHeight: 1.3, letterSpacing: "-0.01em",
        }}>
          {caseInfo.title}
        </h1>
        <div style={{ fontSize: 11, color: "var(--sidebar-fg)", fontFamily: "var(--font-mono)", marginBottom: 8 }}>
          {caseInfo.folderNo}
        </div>
        <span style={{
          display: "inline-flex", alignItems: "center",
          background: sc.bg, color: sc.text, border: `1px solid ${sc.border}`,
          borderRadius: 999, fontSize: 10, padding: "2px 8px", fontWeight: 600,
        }}>
          {caseInfo.status}
        </span>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: "auto", padding: "8px" }}>
        {NAV_ITEMS.map(item => {
          const active = activeTab === item.id;
          const badge = item.id === "pending" ? pendingCount : 0;
          return (
            <button key={item.id} onClick={() => onTab(item.id)} style={{
              width: "100%", display: "flex", alignItems: "center", gap: 9,
              padding: "8px 10px", borderRadius: "var(--radius-md)",
              border: active ? "1px solid var(--sidebar-border)" : "1px solid transparent",
              background: active ? "var(--sidebar-active-bg)" : "transparent",
              color: active ? "var(--sidebar-active-fg)" : "var(--sidebar-fg)",
              cursor: "pointer", fontSize: 13, fontWeight: active ? 500 : 400,
              marginBottom: 1, textAlign: "left",
              transition: "all 120ms cubic-bezier(0.22,1,0.36,1)",
              fontFamily: "var(--font-sans)",
            }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = "rgba(128,128,128,0.08)"; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
            >
              <Icon name={item.icon} size={15} />
              <span style={{ flex: 1 }}>{item.label}</span>
              {badge > 0 && (
                <span style={{
                  background:"#FCEBEB", color:"#791F1F", border:"1px solid #E24B4A",
                  borderRadius: 999, fontSize: 10, padding: "0 5px",
                  fontWeight: 700, lineHeight: "16px", minWidth: 18, textAlign: "center",
                }}>
                  {badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding:"12px 16px 16px", borderTop:"1px solid var(--sidebar-border)" }}>
        {caseInfo.court && (
          <div style={{ fontSize: 11, color: "var(--sidebar-fg)", marginBottom: nextDate ? 6 : 0, lineHeight: 1.4 }}>
            {caseInfo.court}
          </div>
        )}
        {nextDate && (
          <div style={{ display:"flex", alignItems:"flex-start", gap: 5 }}>
            <Icon name="calendar-days" size={11} color="var(--sidebar-accent)" style={{ marginTop: 1 }} />
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

// ── GlobalSearch ───────────────────────────────────────────────────────────
const GlobalSearch = ({ data, onNavigate, onClose }) => {
  const [query, setQuery] = useStateApp("");
  const inputRef = useRefApp(null);

  useEffectApp(() => { inputRef.current?.focus(); }, []);
  useEffectApp(() => {
    const fn = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  const results = query.trim().length < 2 ? [] : (() => {
    const q = query.toLowerCase();
    const res = [];
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
    <div style={{
      position:"fixed", inset:0, background:"rgba(28,43,43,0.44)",
      display:"flex", alignItems:"flex-start", justifyContent:"center",
      zIndex:800, paddingTop:"14vh",
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        width:"min(560px,90vw)", background:"#FFFFFF",
        border:"1px solid rgba(28,43,43,0.12)", borderRadius:"var(--radius-xl)",
        boxShadow:"0 20px 48px -16px rgba(28,43,43,0.30)", overflow:"hidden",
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, padding:"14px 16px", borderBottom:"1px solid rgba(28,43,43,0.10)" }}>
          <Icon name="search" size={17} color="var(--fg-3)" />
          <input
            ref={inputRef} value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Buscar en el expediente…"
            style={{
              flex:1, border:"none", outline:"none", background:"transparent",
              fontSize:15, color:"var(--fg-1)", fontFamily:"var(--font-sans)",
            }}
          />
          <Btn onClick={onClose} variant="ghost" style={{ padding:"4px 8px" }}>
            <Icon name="x" size={14} />
          </Btn>
        </div>
        {query.trim().length < 2 ? (
          <div style={{ padding:"14px 16px", fontSize:12, color:"var(--fg-3)" }}>
            Escribe al menos 2 caracteres para buscar…
          </div>
        ) : results.length === 0 ? (
          <div style={{ padding:"20px 16px", fontSize:13, color:"var(--fg-3)" }}>
            Sin resultados para «{query}»
          </div>
        ) : (
          <div style={{ maxHeight:"50vh", overflowY:"auto" }}>
            {results.map((r, i) => (
              <div key={i}
                onClick={() => { onNavigate(r.tab); onClose(); }}
                style={{
                  display:"flex", gap:10, alignItems:"center",
                  padding:"10px 16px", cursor:"pointer",
                  borderBottom: i < results.length - 1 ? "1px solid rgba(28,43,43,0.07)" : "none",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#F3F1EC"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <Badge color={r.color} label={r.label} />
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:13, fontWeight:500, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{r.title}</div>
                  {r.sub && <div style={{ fontSize:11, color:"var(--fg-3)", marginTop:1 }}>{r.sub}</div>}
                </div>
                {r.url && (
                  <a href={r.url} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={{ color:"var(--fg-3)" }}>
                    <Icon name="external-link" size={13} />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ── Modal Forms ────────────────────────────────────────────────────────────
const EventModal = ({ form, setForm, onSave, onClose }) => (
  <Modal title={form.id ? "Editar evento" : "Nuevo evento"} onClose={onClose} onSave={onSave}>
    <Field label="Fecha" type="date" value={form.date||""} onChange={v => setForm(f => ({...f, date:v}))} required />
    <Field label="Tipo" as="select" value={form.type||"legal"} onChange={v => setForm(f => ({...f, type:v}))}
      options={EVENT_TYPES.map(t => ({ value:t.id, label:t.label }))} />
    <Field label="Título" value={form.title||""} onChange={v => setForm(f => ({...f, title:v}))} required placeholder="Breve descripción del evento" />
    <Field label="Descripción" as="textarea" rows={3} value={form.description||""} onChange={v => setForm(f => ({...f, description:v}))} placeholder="Detalles adicionales…" />
  </Modal>
);

const DocModal = ({ form, setForm, onSave, onClose }) => (
  <Modal title={form.id ? "Editar documento" : "Nuevo documento"} onClose={onClose} onSave={onSave}>
    <Field label="Nombre del archivo" value={form.name||""} onChange={v => setForm(f => ({...f, name:v}))} required placeholder="Ej. Acta de nacimiento.pdf" />
    <Field label="Fuente" as="select" value={form.type||"google_drive"} onChange={v => setForm(f => ({...f, type:v}))}
      options={DOC_TYPES.map(t => ({ value:t.id, label:t.label }))} />
    <Field label="URL / enlace al archivo" type="url" value={form.url||""} onChange={v => setForm(f => ({...f, url:v}))} placeholder="https://…" />
    <Field label="Etiquetas (separadas por coma)" value={form.tags||""} onChange={v => setForm(f => ({...f, tags:v}))} placeholder="Ej. legal, original, pendiente" />
    <Field label="Fecha de incorporación" type="date" value={form.dateAdded||""} onChange={v => setForm(f => ({...f, dateAdded:v}))} />
  </Modal>
);

const NoteModal = ({ form, setForm, onSave, onClose }) => (
  <Modal title={form.id ? "Editar nota" : "Nueva nota"} onClose={onClose} onSave={onSave}>
    <Field label="Título" value={form.title||""} onChange={v => setForm(f => ({...f, title:v}))} required />
    <Field label="Tipo" as="select" value={form.type||"other"} onChange={v => setForm(f => ({...f, type:v}))}
      options={EVENT_TYPES.map(t => ({ value:t.id, label:t.label }))} />
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
    <Field label="Rol" as="select" value={form.role||"testigo"} onChange={v => setForm(f => ({...f, role:v}))}
      options={PERSON_ROLES.map(r => ({ value:r.id, label:r.label }))} />
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
    <Field label="Tipo" as="select" value={form.type||"carpeta"} onChange={v => setForm(f => ({...f, type:v}))}
      options={RELATED_TYPES.map(t => ({ value:t.id, label:t.label }))} />
    <Field label="Relación con este caso" as="select" value={form.relation||"derivado_de"} onChange={v => setForm(f => ({...f, relation:v}))}
      options={RELATION_TYPES.map(t => ({ value:t.id, label:t.label }))} />
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
    <Field label="Estado" as="select" value={form.status||"En proceso"} onChange={v => setForm(f => ({...f, status:v}))}
      options={[
        { value:"En proceso", label:"En proceso" },
        { value:"En pausa",   label:"En pausa"   },
        { value:"Resuelto",   label:"Resuelto"   },
        { value:"Archivado",  label:"Archivado"  },
      ]} />
    <Field label="Contraparte (opcional)" value={form.opponent||""} onChange={v => setForm(f => ({...f, opponent:v}))} />
    <Field label="Descripción general del caso" as="textarea" rows={4} value={form.notes||""} onChange={v => setForm(f => ({...f, notes:v}))} placeholder="Hechos principales y contexto del proceso…" />
  </Modal>
);

// ── App ────────────────────────────────────────────────────────────────────
function App() {
  const [data,       setData]       = useStateApp(loadData);
  const [tab,        setTab]        = useStateApp("summary");
  const [modal,      setModal]      = useStateApp(null);
  const [form,       setForm]       = useStateApp({});
  const [showSearch, setShowSearch] = useStateApp(false);

  // Tweaks — 3 visual themes
  const [t, setTweak] = useTweaks({ estilo: "papel" });
  const theme = THEMES[t.estilo] || THEMES.papel;

  // ── Lucide icon rendering after every React paint ───────────────────────
  useLayoutEffectApp(() => {
    if (window.lucide) window.lucide.createIcons();
  });

  const upd = useCallbackApp(d => { setData(d); saveData(d); }, []);
  const closeModal = useCallbackApp(() => { setModal(null); setForm({}); }, []);

  const today = new Date().toISOString().slice(0, 10);
  const pendingCount = (data.pendingRequests || []).filter(p => !p.done).length;
  const nextDate = [...(data.upcomingDates || [])]
    .filter(d => d.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))[0];

  // ⌘K shortcut
  useEffectApp(() => {
    const fn = e => { if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setShowSearch(true); } };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

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
    setForm(defaults[type] || {});
    setModal(type);
  };

  const openEdit = (type, item) => {
    setForm(type === "doc" ? { ...item, tags: tagsStr(item.tags) } : { ...item });
    setModal(type);
  };

  const save = {
    event: () => {
      if (!form.title || !form.date) return;
      const isNew = !form.id;
      const ev = { ...form, id: form.id || "e" + Date.now(), attachedDocs: form.attachedDocs || [] };
      const events = (isNew ? [...data.events, ev] : data.events.map(e => e.id === ev.id ? ev : e))
        .sort((a, b) => a.date.localeCompare(b.date));
      upd({ ...data, events }); closeModal();
    },
    doc: () => {
      if (!form.name) return;
      const isNew = !form.id;
      const doc = { ...form, id: form.id || "d" + Date.now(), tags: tagsArr(form.tags) };
      upd({ ...data, documents: isNew ? [...data.documents, doc] : data.documents.map(d => d.id === doc.id ? doc : d) });
      closeModal();
    },
    note: () => {
      if (!form.title) return;
      const isNew = !form.id;
      const n = { ...form, id: form.id || "n" + Date.now() };
      upd({ ...data, notes: isNew ? [...(data.notes||[]), n] : (data.notes||[]).map(x => x.id === n.id ? n : x) });
      closeModal();
    },
    pending: () => {
      if (!form.description) return;
      const isNew = !form.id;
      const p = { ...form, id: form.id || "p" + Date.now() };
      upd({ ...data, pendingRequests: isNew ? [...(data.pendingRequests||[]), p] : (data.pendingRequests||[]).map(x => x.id === p.id ? p : x) });
      closeModal();
    },
    person: () => {
      if (!form.name) return;
      const isNew = !form.id;
      const p = { ...form, id: form.id || "pe" + Date.now() };
      upd({ ...data, people: isNew ? [...(data.people||[]), p] : (data.people||[]).map(x => x.id === p.id ? p : x) });
      closeModal();
    },
    date: () => {
      if (!form.title || !form.date) return;
      const isNew = !form.id;
      const d = { ...form, id: form.id || "ud" + Date.now() };
      const dates = (isNew ? [...(data.upcomingDates||[]), d] : (data.upcomingDates||[]).map(x => x.id === d.id ? d : x))
        .sort((a, b) => a.date.localeCompare(b.date));
      upd({ ...data, upcomingDates: dates }); closeModal();
    },
    related: () => {
      if (!form.number) return;
      const isNew = !form.id;
      const r = { ...form, id: form.id || "r" + Date.now() };
      upd({ ...data, relatedCases: isNew ? [...(data.relatedCases||[]), r] : (data.relatedCases||[]).map(x => x.id === r.id ? r : x) });
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
    ...data,
    pendingRequests: (data.pendingRequests||[]).map(p => p.id === id ? { ...p, done: !p.done } : p),
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
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `expediente_${data.caseInfo.folderNo || "caso"}_${today}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div style={{ display:"flex", height:"100vh", overflow:"hidden", ...theme }}>

      {/* Sidebar */}
      <Sidebar
        activeTab={tab} onTab={setTab}
        caseInfo={data.caseInfo}
        pendingCount={pendingCount}
        nextDate={nextDate}
      />

      {/* Main */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0, background:"var(--content-bg)", transition:"background 220ms ease" }}>

        {/* Top bar */}
        <div style={{
          display:"flex", alignItems:"center", gap:8, padding:"10px 20px",
          borderBottom:"1px solid rgba(28,43,43,0.10)",
          background:"var(--card-bg)", flexShrink:0,
          transition:"background 220ms ease",
        }}>
          <button onClick={() => setShowSearch(true)} style={{
            flex:1, display:"flex", alignItems:"center", gap:8,
            padding:"7px 12px", borderRadius:"var(--radius-sm)",
            border:"1px solid rgba(28,43,43,0.14)",
            background:"rgba(28,43,43,0.03)",
            color:"var(--fg-3)", cursor:"text", textAlign:"left",
            fontFamily:"var(--font-sans)", fontSize:13, maxWidth:480,
          }}>
            <Icon name="search" size={14} />
            <span>Buscar en el expediente…</span>
            <span style={{ marginLeft:"auto", fontSize:11, opacity:0.6 }}>⌘K</span>
          </button>
          <Btn onClick={exportJSON} variant="ghost" title="Exportar JSON" style={{ padding:"7px 10px", flexShrink:0 }}>
            <Icon name="download" size={14} />
          </Btn>
        </div>

        {/* Section content */}
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

      {/* Modals */}
      {modal==="event"   && <EventModal   form={form} setForm={setForm} onSave={save.event}   onClose={closeModal} />}
      {modal==="doc"     && <DocModal     form={form} setForm={setForm} onSave={save.doc}     onClose={closeModal} />}
      {modal==="note"    && <NoteModal    form={form} setForm={setForm} onSave={save.note}    onClose={closeModal} />}
      {modal==="pending" && <PendingModal form={form} setForm={setForm} onSave={save.pending} onClose={closeModal} />}
      {modal==="person"  && <PersonModal  form={form} setForm={setForm} onSave={save.person}  onClose={closeModal} />}
      {modal==="date"    && <DateModal    form={form} setForm={setForm} onSave={save.date}    onClose={closeModal} />}
      {modal==="related" && <RelatedModal form={form} setForm={setForm} onSave={save.related} onClose={closeModal} />}
      {modal==="case"    && <CaseModal    form={form} setForm={setForm} onSave={save.case}    onClose={closeModal} />}

      {/* Global search */}
      {showSearch && <GlobalSearch data={data} onNavigate={setTab} onClose={() => setShowSearch(false)} />}

      {/* Tweaks */}
      <TweaksPanel title="Estilos">
        <TweakSection label="Tema visual" />
        <TweakRadio label="Estilo" value={t.estilo} options={["papel","tinta","lavanda"]} onChange={v => setTweak("estilo", v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
