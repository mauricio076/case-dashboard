// expediente-views.jsx — All 8 section views (Lucide icons via Icon component)
// Requires window globals: COLORS, EVENT_TYPES, DOC_TYPES, PERSON_ROLES, RELATED_TYPES, RELATION_TYPES
//   Icon, Badge, Btn, ActionBtns, Card, SectionHeader, EmptyState, SearchBar
// Exports to window: ResumenView, PendientesView, FechasView, TimelineView,
//   DocumentosView, PersonasView, NotasView, RelacionadosView

const { useState: useStateV } = React;

const MiniLink = ({ onClick, label }) => (
  <button onClick={onClick} style={{
    background: "none", border: "none", cursor: "pointer",
    fontSize: 12, color: "var(--fg-3)", textDecoration: "underline",
    padding: 0, fontFamily: "var(--font-sans)",
  }}>{label}</button>
);

// ── Resumen ───────────────────────────────────────────────────────────────
const ResumenView = ({ data, onEditCase, onGoTo }) => {
  const ci = data.caseInfo;
  const pendingCount = (data.pendingRequests || []).filter(p => !p.done).length;
  const today = new Date().toISOString().slice(0, 10);
  const nextDate = [...(data.upcomingDates || [])]
    .filter(d => d.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))[0];

  const metrics = [
    { label: "Eventos",        val: data.events.length,              icon: "timer",          tab: "timeline" },
    { label: "Documentos",     val: data.documents.length,           icon: "files",          tab: "docs"     },
    { label: "Pendientes",     val: pendingCount,                    icon: "check-square-2", tab: "pending", alert: pendingCount > 0 },
    { label: "Personas clave", val: (data.people || []).length,      icon: "users",          tab: "people"   },
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <p style={{ margin: "0 0 12px", fontSize: 14, lineHeight: 1.75, color: "var(--fg-2)", maxWidth: 640 }}>
          {ci.notes || <span style={{ color: "var(--fg-3)" }}>Sin descripción. Edita los datos del caso para agregar una.</span>}
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          {ci.court && (
            <span style={{ fontSize: 12, color: "var(--fg-3)", display: "flex", alignItems: "center", gap: 5 }}>
              <Icon name="building-2" size={12} />
              {ci.court}
            </span>
          )}
          {ci.opponent && (
            <span style={{ fontSize: 12, color: "var(--fg-3)", display: "flex", alignItems: "center", gap: 5 }}>
              <Icon name="user" size={12} />
              Contraparte: {ci.opponent}
            </span>
          )}
        </div>
      </div>

      {/* Metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 8, marginBottom: 24 }}>
        {metrics.map(m => (
          <div key={m.label} onClick={() => onGoTo(m.tab)}
            style={{
              background: "var(--card-bg)", border: "1px solid var(--card-border)",
              borderRadius: "var(--radius-md)", padding: "14px 16px",
              cursor: "pointer", transition: "box-shadow 120ms ease",
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 12px -4px rgba(28,43,43,0.14)"}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
          >
            <div style={{ fontSize: 11, color: "var(--fg-3)", marginBottom: 6, display: "flex", alignItems: "center", gap: 5 }}>
              <Icon name={m.icon} size={12} />
              {m.label}
            </div>
            <div style={{
              fontSize: 30, fontWeight: 600, lineHeight: 1,
              color: m.alert ? "#B04A3A" : "var(--fg-1)",
              fontVariantNumeric: "tabular-nums",
            }}>
              {m.val}
            </div>
          </div>
        ))}
      </div>

      {/* Next date */}
      {nextDate && (
        <div onClick={() => onGoTo("dates")}
          style={{
            display: "flex", alignItems: "center", gap: 14,
            padding: "12px 16px", marginBottom: 16,
            background: "var(--card-bg)", border: "1px solid var(--card-border)",
            borderRadius: "var(--radius-md)", cursor: "pointer",
          }}
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

      {/* Pending preview */}
      {pendingCount > 0 && (
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 500 }}>Sin completar</span>
            <MiniLink onClick={() => onGoTo("pending")} label="Ver todos" />
          </div>
          {(data.pendingRequests || []).filter(p => !p.done).slice(0, 3).map(p => (
            <div key={p.id} style={{
              display: "flex", alignItems: "flex-start", gap: 10,
              padding: "9px 0", borderBottom: "1px solid rgba(28,43,43,0.08)",
            }}>
              <Icon name="circle" size={13} color="#B04A3A" style={{ marginTop: 2 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13 }}>{p.description}</div>
                {p.requestedBy && <div style={{ fontSize: 11, color: "var(--fg-3)", marginTop: 2 }}>{p.requestedBy}</div>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Recent events */}
      {data.events.length > 0 && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 500 }}>Eventos recientes</span>
            <MiniLink onClick={() => onGoTo("timeline")} label="Ver todos" />
          </div>
          {[...data.events].reverse().slice(0, 4).map(ev => {
            const et = EVENT_TYPES.find(t => t.id === ev.type) || EVENT_TYPES[5];
            return (
              <div key={ev.id} style={{
                display: "flex", gap: 10, alignItems: "center",
                padding: "9px 0", borderBottom: "1px solid rgba(28,43,43,0.08)",
              }}>
                <span style={{ fontSize: 11, color: "var(--fg-3)", minWidth: 84, flexShrink: 0, fontFamily: "var(--font-mono)" }}>
                  {ev.date}
                </span>
                <Badge color={et.color} label={et.label} />
                <span style={{ fontSize: 13, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {ev.title}
                </span>
              </div>
            );
          })}
        </div>
      )}

      <div style={{ borderTop: "1px solid rgba(28,43,43,0.08)", marginTop: 20, paddingTop: 16 }}>
        <Btn onClick={onEditCase} variant="ghost">
          <Icon name="ti-edit" size={13} />Editar datos del caso
        </Btn>
      </div>
    </div>
  );
};

// ── Pendientes ────────────────────────────────────────────────────────────
const PendientesView = ({ data, onToggle, onAdd, onEdit, onDelete }) => {
  const pending = data.pendingRequests || [];
  const count = pending.filter(p => !p.done).length;

  return (
    <div>
      <SectionHeader
        title={`${count} pendiente${count !== 1 ? "s" : ""} sin completar`}
        subtitle="Documentos e información solicitados por tu abogado, el juzgado u otras partes."
        action={<Btn onClick={onAdd} variant="outline"><Icon name="ti-plus" size={13} />Agregar</Btn>}
      />
      {pending.length === 0 && (
        <EmptyState icon="check-square-2" message="Sin pendientes registrados." action={
          <Btn onClick={onAdd} variant="outline"><Icon name="ti-plus" size={13} />Agregar pendiente</Btn>
        } />
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {pending.map(p => (
          <Card key={p.id} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
            <button onClick={() => onToggle(p.id)} style={{
              background: "none", border: "none", cursor: "pointer", padding: 0, paddingTop: 1, flexShrink: 0,
            }}>
              <Icon name={p.done ? "circle-check" : "circle"} size={20} color={p.done ? "#2F5A4E" : "#B04A3A"} />
            </button>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: 13, fontWeight: p.done ? 400 : 500,
                textDecoration: p.done ? "line-through" : "none",
                color: p.done ? "var(--fg-3)" : "var(--fg-1)", lineHeight: 1.5,
              }}>
                {p.description}
              </div>
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

// ── Fechas ────────────────────────────────────────────────────────────────
const FechasView = ({ data, onAdd, onEdit, onDelete }) => {
  const today = new Date().toISOString().slice(0, 10);
  const dates = [...(data.upcomingDates || [])].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div>
      <SectionHeader
        title="Fechas importantes"
        subtitle="Audiencias, entregas, visitas y plazos."
        action={<Btn onClick={onAdd} variant="outline"><Icon name="ti-plus" size={13} />Agregar</Btn>}
      />
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
                    <span style={{
                      fontSize: 12, fontFamily: "var(--font-mono)", fontWeight: 500,
                      color: isPast ? "var(--fg-3)" : "#C58B2A",
                    }}>{d.date}</span>
                    {isPast && <Badge color="gray" label="Pasada" />}
                    {isNext && <Badge color="amber" label="Próxima" />}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>{d.title}</div>
                  {d.location && (
                    <div style={{ fontSize: 12, color: "var(--fg-3)", display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}>
                      <Icon name="map-pin" size={12} />{d.location}
                    </div>
                  )}
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

// ── Timeline ──────────────────────────────────────────────────────────────
const TimelineView = ({ data, onAdd, onEdit, onDelete, onToggleDocLink }) => {
  const [filterType, setFilterType] = useStateV("all");
  const [linkingEvent, setLinkingEvent] = useStateV(null);

  const filtered = filterType === "all" ? data.events : data.events.filter(e => e.type === filterType);

  return (
    <div>
      <SectionHeader
        title="Timeline"
        subtitle={(() => {
          const oldest = data.events[0];
          return oldest
            ? `Desde ${oldest.date} · ${data.events.length} evento${data.events.length !== 1 ? "s" : ""}`
            : "Cronología de todos los eventos del caso.";
        })()}
        action={<Btn onClick={onAdd} variant="outline"><Icon name="ti-plus" size={13} />Agregar evento</Btn>}
      />

      {/* Type filter chips */}
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 20 }}>
        {[{ id: "all", label: "Todos" }, ...EVENT_TYPES].map(et => {
          const active = filterType === et.id;
          const c = et.color ? COLORS[et.color] : null;
          return (
            <button key={et.id} onClick={() => setFilterType(et.id)} style={{
              fontSize: 11, padding: "4px 10px", borderRadius: 999,
              border: `1px solid ${active && c ? c.border : active ? "var(--fg-2)" : "rgba(28,43,43,0.14)"}`,
              background: active && c ? c.bg : active ? "var(--fg-1)" : "transparent",
              color: active && c ? c.text : active ? "var(--card-bg)" : "var(--fg-3)",
              cursor: "pointer", fontWeight: active ? 600 : 400,
              transition: "all 120ms ease", fontFamily: "var(--font-sans)",
            }}>
              {et.label}
            </button>
          );
        })}
      </div>

      {/* Timeline list */}
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
                position: "absolute", left: -18, top: 18,
                width: 9, height: 9, borderRadius: "50%",
                background: c.border, border: "2px solid var(--content-bg, #F3F1EC)", zIndex: 1,
              }} />
              <Card>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 5 }}>
                      <span style={{ fontSize: 11, color: "var(--fg-3)", fontFamily: "var(--font-mono)", flexShrink: 0 }}>
                        {ev.date}
                      </span>
                      <Badge color={et.color} label={et.label} />
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 500, marginBottom: ev.description ? 4 : 0 }}>{ev.title}</div>
                    {ev.description && (
                      <p style={{ margin: 0, fontSize: 12, color: "var(--fg-2)", lineHeight: 1.65 }}>{ev.description}</p>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                    <Btn onClick={() => setLinkingEvent(isLinking ? null : ev.id)} variant="ghost" title="Vincular documentos" style={{ padding: "5px 8px" }}>
                      <Icon name="paperclip" size={13} />
                      {(ev.attachedDocs || []).length > 0 && (
                        <span style={{
                          background: "var(--fg-3)", color: "var(--card-bg)",
                          borderRadius: 999, fontSize: 10, padding: "0 4px",
                          lineHeight: "14px", minWidth: 14, textAlign: "center",
                        }}>
                          {ev.attachedDocs.length}
                        </span>
                      )}
                    </Btn>
                    <ActionBtns onEdit={() => onEdit(ev)} onDelete={() => onDelete(ev.id)} />
                  </div>
                </div>

                {/* Attached docs */}
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
                          border: "1px solid rgba(28,43,43,0.12)",
                          borderRadius: "var(--radius-sm)", padding: "2px 8px",
                          textDecoration: "none", color: "var(--fg-2)",
                        }}>
                          <Icon name={dt.icon} size={11} />
                          <span style={{ maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {doc.name}
                          </span>
                        </a>
                      );
                    })}
                  </div>
                )}

                {/* Link docs panel */}
                {isLinking && (
                  <div style={{
                    marginTop: 12, padding: "12px 14px",
                    background: "rgba(28,43,43,0.03)",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid rgba(28,43,43,0.10)",
                  }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: "var(--fg-3)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      Vincular documentos
                    </div>
                    {data.documents.length === 0 && (
                      <p style={{ fontSize: 12, color: "var(--fg-3)", margin: 0 }}>Sin documentos disponibles.</p>
                    )}
                    {data.documents.map(doc => {
                      const dt = DOC_TYPES.find(d => d.id === doc.type) || DOC_TYPES[4];
                      const linked = (ev.attachedDocs || []).includes(doc.id);
                      return (
                        <div key={doc.id} onClick={() => onToggleDocLink(ev.id, doc.id)}
                          style={{
                            display: "flex", alignItems: "center", gap: 8,
                            padding: "6px 8px", borderRadius: "var(--radius-sm)",
                            cursor: "pointer", marginBottom: 2,
                            background: linked ? "#E1F5EE" : "transparent",
                          }}
                          onMouseEnter={e => { if (!linked) e.currentTarget.style.background = "rgba(28,43,43,0.04)"; }}
                          onMouseLeave={e => { if (!linked) e.currentTarget.style.background = "transparent"; }}
                        >
                          <Icon name={linked ? "check" : "circle"} size={13} color={linked ? "#085041" : "var(--fg-3)"} />
                          <Icon name={dt.icon} size={12} color="var(--fg-3)" />
                          <span style={{
                            fontSize: 12, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                            fontWeight: linked ? 500 : 400, color: linked ? "#085041" : "var(--fg-1)",
                          }}>
                            {doc.name}
                          </span>
                        </div>
                      );
                    })}
                    <div style={{ marginTop: 8 }}>
                      <Btn onClick={() => setLinkingEvent(null)} variant="ghost" style={{ fontSize: 12 }}>Cerrar</Btn>
                    </div>
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

// ── Documentos ────────────────────────────────────────────────────────────
const DocumentosView = ({ data, onAdd, onEdit, onDelete }) => {
  const [search, setSearch] = useStateV("");
  const [filterType, setFilterType] = useStateV("all");

  const filtered = data.documents.filter(doc => {
    const q = search.toLowerCase();
    const matchSearch = !q || doc.name.toLowerCase().includes(q) || (doc.tags || []).some(t => t.toLowerCase().includes(q));
    const matchType = filterType === "all" || doc.type === filterType;
    return matchSearch && matchType;
  });

  return (
    <div>
      <SectionHeader
        title="Documentos"
        subtitle="Repositorio de archivos vinculados al caso."
        action={<Btn onClick={onAdd} variant="outline"><Icon name="ti-plus" size={13} />Agregar</Btn>}
      />
      <div style={{ display: "flex", gap: 8, marginBottom: 14, alignItems: "center", flexWrap: "wrap" }}>
        <SearchBar value={search} onChange={setSearch} placeholder="Buscar por nombre o etiqueta…" style={{ flex: 1, minWidth: 180 }} />
        <select value={filterType} onChange={e => setFilterType(e.target.value)} style={{ fontSize: 12, padding: "7px 10px", flexShrink: 0 }}>
          <option value="all">Todos los tipos</option>
          {DOC_TYPES.map(dt => <option key={dt.id} value={dt.id}>{dt.label}</option>)}
        </select>
      </div>
      {filtered.length === 0 && (
        <EmptyState icon="files" message={search ? `Sin resultados para "${search}".` : "Sin documentos registrados."} action={
          !search && <Btn onClick={onAdd} variant="outline"><Icon name="ti-plus" size={13} />Agregar documento</Btn>
        } />
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {filtered.map(doc => {
          const dt = DOC_TYPES.find(d => d.id === doc.type) || DOC_TYPES[4];
          return (
            <Card key={doc.id} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Icon name={dt.icon} size={20} color="var(--fg-3)" />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {doc.name}
                </div>
                <div style={{ fontSize: 11, color: "var(--fg-3)", marginTop: 3, display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
                  <span>{dt.label}</span>
                  {doc.dateAdded && <span>· {doc.dateAdded}</span>}
                  {(doc.tags || []).map(t => (
                    <span key={t} style={{
                      background: "rgba(28,43,43,0.06)", border: "1px solid rgba(28,43,43,0.12)",
                      borderRadius: 999, fontSize: 10, padding: "1px 6px",
                    }}>{t}</span>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", gap: 4, flexShrink: 0, alignItems: "center" }}>
                {doc.url && (
                  <a href={doc.url} target="_blank" rel="noreferrer" style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    padding: "5px 8px", borderRadius: "var(--radius-sm)",
                    border: "1px solid rgba(28,43,43,0.14)", color: "var(--fg-2)",
                    textDecoration: "none",
                  }}>
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

// ── Personas ──────────────────────────────────────────────────────────────
const PersonasView = ({ data, onAdd, onEdit, onDelete }) => {
  const people = data.people || [];
  return (
    <div>
      <SectionHeader
        title="Personas clave"
        subtitle="Testigos, peritos, funcionarios y contactos relevantes."
        action={<Btn onClick={onAdd} variant="outline"><Icon name="ti-plus" size={13} />Agregar</Btn>}
      />
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
                    {p.phone && (
                      <span style={{ fontSize: 12, color: "var(--fg-2)", display: "flex", alignItems: "center", gap: 5 }}>
                        <Icon name="phone" size={12} />{p.phone}
                      </span>
                    )}
                    {p.email && (
                      <a href={`mailto:${p.email}`} style={{ fontSize: 12, color: "var(--fg-2)", display: "flex", alignItems: "center", gap: 5, textDecoration: "none" }}>
                        <Icon name="mail" size={12} />{p.email}
                      </a>
                    )}
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

// ── Notas ─────────────────────────────────────────────────────────────────
const NotasView = ({ data, onAdd, onEdit, onDelete }) => {
  const notes = data.notes || [];
  return (
    <div>
      <SectionHeader
        title="Notas y testimonios"
        subtitle="Texto libre: hechos, testimonios no oficiales, correos relevantes."
        action={<Btn onClick={onAdd} variant="outline"><Icon name="ti-plus" size={13} />Agregar</Btn>}
      />
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
              {(n.date || n.author) && (
                <div style={{ fontSize: 11, color: "var(--fg-3)", marginBottom: 8 }}>
                  {n.date}{n.author && <span> · {n.author}</span>}
                </div>
              )}
              <p style={{ margin: 0, fontSize: 13, color: "var(--fg-2)", lineHeight: 1.75, whiteSpace: "pre-wrap" }}>{n.content}</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

// ── Relacionados ──────────────────────────────────────────────────────────
const RelacionadosView = ({ data, onAdd, onEdit, onDelete }) => {
  const cases = data.relatedCases || [];
  return (
    <div>
      <SectionHeader
        title="Casos relacionados"
        subtitle="Expedientes, denuncias o carpetas vinculadas a este caso."
        action={<Btn onClick={onAdd} variant="outline"><Icon name="ti-plus" size={13} />Agregar</Btn>}
      />
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
                  {r.authority && (
                    <div style={{ fontSize: 12, color: "var(--fg-2)", marginBottom: 4, display: "flex", alignItems: "center", gap: 5 }}>
                      <Icon name="building-2" size={12} />{r.authority}
                    </div>
                  )}
                  {r.description && <p style={{ margin: 0, fontSize: 12, color: "var(--fg-2)", lineHeight: 1.6 }}>{r.description}</p>}
                  {r.dateOpened && (
                    <div style={{ fontSize: 11, color: "var(--fg-3)", marginTop: 6 }}>
                      Abierto: <span style={{ fontFamily: "var(--font-mono)" }}>{r.dateOpened}</span>
                    </div>
                  )}
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

Object.assign(window, {
  ResumenView, PendientesView, FechasView, TimelineView,
  DocumentosView, PersonasView, NotasView, RelacionadosView,
});
