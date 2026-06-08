import { useState } from "react";

const COLORS = {
  purple: { bg: "#EEEDFE", border: "#7F77DD", text: "#3C3489" },
  teal:   { bg: "#E1F5EE", border: "#1D9E75", text: "#085041" },
  amber:  { bg: "#FAEEDA", border: "#BA7517", text: "#633806" },
  coral:  { bg: "#FAECE7", border: "#D85A30", text: "#4A1B0C" },
  blue:   { bg: "#E6F1FB", border: "#378ADD", text: "#0C447C" },
  red:    { bg: "#FCEBEB", border: "#E24B4A", text: "#791F1F" },
  green:  { bg: "#EAF3DE", border: "#639922", text: "#27500A" },
  gray:   { bg: "#F1EFE8", border: "#888780", text: "#2C2C2A" },
};

const EVENT_TYPES = [
  {id:"legal",    label:"Legal",        color:"purple"},
  {id:"financial",label:"Financiero",   color:"amber"},
  {id:"comms",    label:"Comunicación", color:"blue"},
  {id:"evidence", label:"Evidencia",    color:"teal"},
  {id:"testimony",label:"Testimonio",   color:"coral"},
  {id:"other",    label:"Otro",         color:"gray"},
];
const DOC_TYPES = [
  {id:"google_drive",label:"Google Drive",icon:"ti-brand-google-drive"},
  {id:"icloud",      label:"iCloud",      icon:"ti-cloud"},
  {id:"dropbox",     label:"Dropbox",     icon:"ti-brand-dropbox"},
  {id:"local",       label:"Disco local", icon:"ti-device-laptop"},
  {id:"other",       label:"Otro",        icon:"ti-link"},
];
const RELATED_TYPES = [
  {id:"carpeta",   label:"Carpeta",    color:"purple"},
  {id:"caso",      label:"Caso",       color:"blue"},
  {id:"expediente",label:"Expediente", color:"teal"},
  {id:"denuncia",  label:"Denuncia",   color:"coral"},
  {id:"amparo",    label:"Amparo",     color:"amber"},
  {id:"otro",      label:"Otro",       color:"gray"},
];
const RELATION_TYPES = [
  {id:"derivado_de",label:"Derivado de", icon:"ti-arrow-fork"},
  {id:"paralelo_a", label:"Paralelo a",  icon:"ti-arrows-split-2"},
  {id:"precede_a",  label:"Precede a",   icon:"ti-arrow-right"},
  {id:"complementa",label:"Complementa", icon:"ti-puzzle"},
  {id:"consolida",  label:"Consolida",   icon:"ti-git-merge"},
  {id:"otro",       label:"Otro",        icon:"ti-link"},
];
const PERSON_ROLES = [
  {id:"testigo",   label:"Testigo",    color:"teal"},
  {id:"perito",    label:"Perito",     color:"purple"},
  {id:"funcionario",label:"Funcionario",color:"blue"},
  {id:"familiar",  label:"Familiar",   color:"coral"},
  {id:"otro",      label:"Otro",       color:"gray"},
];

const SEED = {
  caseInfo: {
    title:"Custodia de menores — Familia García",
    folderNo:"FAM-2024-00312",
    court:"Juzgado 3ro Familiar",
    status:"En proceso",
    accountNo:"",
    address:"Col. Del Valle, CDMX",
    opponent:"Juan García Pérez",
    notes:"Proceso de custodia iniciado en marzo 2024. Se busca la guarda y custodia de los menores Diego (8) y Sofía (6). El padre incumple acuerdos de convivencia y no aporta pensión alimenticia desde enero 2024.",
  },
  events: [
    {id:"e1",date:"2024-01-10",type:"financial",title:"Último pago de pensión recibido",description:"Último depósito de $4,500 MXN. Desde esta fecha no hubo más pagos.",attachedDocs:[]},
    {id:"e2",date:"2024-03-01",type:"legal",title:"Inicio de proceso de custodia",description:"Primera reunión con abogado. Se decide iniciar demanda formal.",attachedDocs:[]},
    {id:"e3",date:"2024-04-15",type:"comms",title:"Incumplimiento de visita acordada",description:"El padre no se presentó a la visita pactada del 15 de abril. Hay mensaje de WhatsApp como evidencia.",attachedDocs:[]},
    {id:"e4",date:"2024-06-20",type:"evidence",title:"Reporte escolar entregado",description:"La escuela emitió reporte de inasistencias durante estancias con el padre.",attachedDocs:[]},
  ],
  documents: [
    {id:"d1",name:"Acta de nacimiento — Diego García.pdf",  type:"google_drive",url:"https://drive.google.com/example1",tags:["acta","diego"],     dateAdded:"2024-03-01"},
    {id:"d2",name:"Acta de nacimiento — Sofía García.pdf",  type:"google_drive",url:"https://drive.google.com/example2",tags:["acta","sofia"],     dateAdded:"2024-03-01"},
    {id:"d3",name:"Comprobante pensión enero 2024.pdf",     type:"icloud",      url:"",                                  tags:["pensión","finanzas"],dateAdded:"2024-01-10"},
    {id:"d4",name:"Acta de matrimonio.pdf",                 type:"google_drive",url:"https://drive.google.com/example3",tags:["acta","legal"],      dateAdded:"2024-03-01"},
  ],
  notes: [
    {id:"n1",date:"2024-05-10",author:"María García",type:"testimony",title:"Testimonio de vecina — Sra. López",content:"La vecina del 3er piso afirma haber escuchado discusiones frecuentes cuando los niños estaban con el padre. Está dispuesta a declarar."},
    {id:"n2",date:"2024-06-01",author:"María García",type:"other",   title:"Descripción de hechos para el abogado",content:"Desde la separación en diciembre 2023, el padre ha incumplido sistemáticamente los acuerdos de convivencia. Ha dejado a los menores solos en múltiples ocasiones y no cubre los gastos escolares acordados."},
  ],
  relatedCases: [
    {id:"r1",type:"denuncia",relation:"paralelo_a",number:"DEN-2024-0055",authority:"Ministerio Público",status:"Abierto",description:"Denuncia por incumplimiento de obligaciones alimentarias.",dateOpened:"2024-02-15"},
  ],
  pendingRequests: [
    {id:"p1",requestedBy:"Abogado Ramírez",date:"2024-06-25",description:"Descripción de hechos por escrito (cronológica)",done:false},
    {id:"p2",requestedBy:"Abogado Ramírez",date:"2024-06-25",description:"Actas de nacimiento de ambos menores",done:true},
    {id:"p3",requestedBy:"Juzgado 3ro Familiar",date:"2024-07-01",description:"Comprobante de domicilio actual",done:false},
    {id:"p4",requestedBy:"Abogado Ramírez",date:"2024-07-05",description:"Estados de cuenta bancarios enero–junio 2024",done:false},
  ],
  people: [
    {id:"pe1",role:"testigo",   name:"Carmen López Vda. de Ruiz",phone:"55 1234 5678",email:"",notes:"Vecina del edificio. Estuvo presente en incidente del 3 de mayo."},
    {id:"pe2",role:"perito",    name:"Dr. Ignacio Fuentes",       phone:"55 9876 5432",email:"ifuentes@peritajes.mx",notes:"Perito psicológico designado por el juzgado."},
    {id:"pe3",role:"funcionario",name:"Lic. Alma Reyes",          phone:"",            email:"areyes@dif.gob.mx",notes:"Trabajadora social del DIF asignada al caso."},
  ],
  upcomingDates: [
    {id:"ud1",date:"2024-08-14",title:"Audiencia preliminar",location:"Juzgado 3ro Familiar, Sala 2",notes:"Llegar 30 min antes. Llevar identificación y expediente completo."},
    {id:"ud2",date:"2024-09-01",title:"Entrega de pruebas documentales",location:"Juzgado 3ro Familiar",notes:"Plazo máximo para entregar todos los documentos probatorios."},
    {id:"ud3",date:"2024-10-20",title:"Visita de trabajo social al domicilio",location:"Domicilio de la promovente",notes:"La trabajadora social del DIF realizará visita de evaluación."},
  ],
};

const LS = "case_dashboard_v2";
function load() { try { const r = localStorage.getItem(LS); return r ? JSON.parse(r) : SEED; } catch { return SEED; } }
function save(d) { try { localStorage.setItem(LS, JSON.stringify(d)); } catch {} }

const Badge = ({ color="gray", label }) => {
  const c = COLORS[color]||COLORS.gray;
  return <span style={{background:c.bg,color:c.text,border:`1px solid ${c.border}`,borderRadius:6,fontSize:11,padding:"2px 8px",fontWeight:600,whiteSpace:"nowrap"}}>{label}</span>;
};

const Btn = ({ onClick, children, style={} }) => (
  <button onClick={onClick} style={{cursor:"pointer",fontSize:12,padding:"5px 10px",borderRadius:6,border:"1px solid var(--color-border-secondary)",background:"var(--color-background-secondary)",color:"var(--color-text-secondary)",display:"inline-flex",alignItems:"center",gap:4,...style}}>{children}</button>
);

const Tab = ({ active, onClick, icon, label, badge }) => (
  <button onClick={onClick} style={{display:"flex",alignItems:"center",gap:6,padding:"7px 12px",background:active?"var(--color-background-primary)":"transparent",border:active?"1px solid var(--color-border-tertiary)":"1px solid transparent",borderRadius:8,cursor:"pointer",color:active?"var(--color-text-primary)":"var(--color-text-secondary)",fontSize:13,fontWeight:active?500:400,position:"relative"}}>
    <i className={`ti ${icon}`} style={{fontSize:15}} />
    {label}
    {badge > 0 && <span style={{background:COLORS.red.bg,color:COLORS.red.text,border:`1px solid ${COLORS.red.border}`,borderRadius:10,fontSize:10,padding:"0 5px",fontWeight:700,lineHeight:"16px"}}>{badge}</span>}
  </button>
);

const Modal = ({ title, onClose, children }) => (
  <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:999}} onClick={onClose}>
    <div onClick={e=>e.stopPropagation()} style={{background:"canvas",borderRadius:12,border:"1px solid var(--color-border-tertiary)",padding:"1.5rem",width:"min(540px,95vw)",maxHeight:"85vh",overflowY:"auto"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <h3 style={{margin:0,fontSize:15,fontWeight:500}}>{title}</h3>
        <Btn onClick={onClose}><i className="ti ti-x" style={{fontSize:14}} /></Btn>
      </div>
      {children}
    </div>
  </div>
);

const Field = ({ label, value, onChange, type="text", as, rows=3, options }) => (
  <div style={{marginBottom:12}}>
    <label style={{display:"block",fontSize:12,color:"var(--color-text-secondary)",marginBottom:4}}>{label}</label>
    {as==="textarea"
      ? <textarea value={value} onChange={e=>onChange(e.target.value)} rows={rows} style={{width:"100%",boxSizing:"border-box",resize:"vertical",fontFamily:"var(--font-sans)"}} />
      : as==="select"
        ? <select value={value} onChange={e=>onChange(e.target.value)} style={{width:"100%"}}>
            {options.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        : <input type={type} value={value} onChange={e=>onChange(e.target.value)} style={{width:"100%",boxSizing:"border-box"}} />
    }
  </div>
);

const Card = ({ children, style={} }) => (
  <div style={{background:"var(--color-background-primary)",border:"1px solid var(--color-border-tertiary)",borderRadius:10,padding:"12px 14px",...style}}>{children}</div>
);

const SectionHeader = ({ title, action }) => (
  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
    <div style={{fontSize:13,fontWeight:500}}>{title}</div>
    {action}
  </div>
);

export default function App() {
  const [data, setData]         = useState(load);
  const [tab, setTab]           = useState("summary");
  const [modal, setModal]       = useState(null);
  const [form, setForm]         = useState({});
  const [parseText, setParseText] = useState("");
  const [parsing, setParsing]   = useState(false);
  const [filterType, setFilterType] = useState("all");
  const [searchDoc, setSearchDoc]   = useState("");
  const [globalSearch, setGlobalSearch] = useState("");
  const [showSearch, setShowSearch]     = useState(false);
  const [linkingEvent, setLinkingEvent] = useState(null);

  const upd = d => { setData(d); save(d); };
  const closeModal = () => { setModal(null); setForm({}); setParseText(""); };
  const tagsArr = s => s ? s.split(",").map(t=>t.trim()).filter(Boolean) : [];

  const toggleDocLink = (evId, docId) => {
    const events = data.events.map(ev => {
      if(ev.id!==evId) return ev;
      const l = ev.attachedDocs||[];
      return {...ev, attachedDocs: l.includes(docId)?l.filter(d=>d!==docId):[...l,docId]};
    });
    upd({...data,events});
  };

  // opens
  const o = {
    addEvent:    () => { setForm({date:new Date().toISOString().slice(0,10),type:"legal",title:"",description:"",attachedDocs:[]}); setModal("event"); },
    editEvent:   ev => { setForm({...ev}); setModal("event"); },
    addDoc:      () => { setForm({name:"",type:"google_drive",url:"",tags:"",dateAdded:new Date().toISOString().slice(0,10)}); setModal("doc"); },
    editDoc:     doc=>{ setForm({...doc,tags:(doc.tags||[]).join(", ")}); setModal("doc"); },
    addNote:     () => { setForm({date:new Date().toISOString().slice(0,10),author:"",type:"testimony",title:"",content:""}); setModal("note"); },
    editNote:    n  =>{ setForm({...n}); setModal("note"); },
    addRelated:  () => { setForm({type:"carpeta",relation:"derivado_de",number:"",authority:"",status:"",description:"",dateOpened:new Date().toISOString().slice(0,10)}); setModal("related"); },
    editRelated: r  =>{ setForm({...r}); setModal("related"); },
    addPending:  () => { setForm({requestedBy:"",date:new Date().toISOString().slice(0,10),description:"",done:false}); setModal("pending"); },
    editPending: p  =>{ setForm({...p}); setModal("pending"); },
    addPerson:   () => { setForm({role:"testigo",name:"",phone:"",email:"",notes:""}); setModal("person"); },
    editPerson:  p  =>{ setForm({...p}); setModal("person"); },
    addDate:     () => { setForm({date:new Date().toISOString().slice(0,10),title:"",location:"",notes:""}); setModal("date"); },
    editDate:    d  =>{ setForm({...d}); setModal("date"); },
    editCase:    () => { setForm({...data.caseInfo}); setModal("case"); },
  };

  // saves
  const s = {
    event:   () => { if(!form.title||!form.date) return; const isNew=!form.id; const ev={...form,id:form.id||"e"+Date.now(),attachedDocs:form.attachedDocs||[]}; upd({...data,events:(isNew?[...data.events,ev]:data.events.map(e=>e.id===ev.id?ev:e)).sort((a,b)=>a.date.localeCompare(b.date))}); closeModal(); },
    doc:     () => { if(!form.name) return; const isNew=!form.id; const doc={...form,id:form.id||"d"+Date.now(),tags:tagsArr(form.tags)}; upd({...data,documents:isNew?[...data.documents,doc]:data.documents.map(d=>d.id===doc.id?doc:d)}); closeModal(); },
    note:    () => { if(!form.title) return; const isNew=!form.id; const n={...form,id:form.id||"n"+Date.now()}; upd({...data,notes:isNew?[...data.notes,n]:data.notes.map(x=>x.id===n.id?n:x)}); closeModal(); },
    related: () => { if(!form.number) return; const isNew=!form.id; const r={...form,id:form.id||"r"+Date.now()}; upd({...data,relatedCases:isNew?[...(data.relatedCases||[]),r]:(data.relatedCases||[]).map(x=>x.id===r.id?r:x)}); closeModal(); },
    pending: () => { if(!form.description) return; const isNew=!form.id; const p={...form,id:form.id||"p"+Date.now()}; upd({...data,pendingRequests:isNew?[...(data.pendingRequests||[]),p]:(data.pendingRequests||[]).map(x=>x.id===p.id?p:x)}); closeModal(); },
    person:  () => { if(!form.name) return; const isNew=!form.id; const p={...form,id:form.id||"pe"+Date.now()}; upd({...data,people:isNew?[...(data.people||[]),p]:(data.people||[]).map(x=>x.id===p.id?p:x)}); closeModal(); },
    date:    () => { if(!form.title||!form.date) return; const isNew=!form.id; const d={...form,id:form.id||"ud"+Date.now()}; upd({...data,upcomingDates:isNew?[...(data.upcomingDates||[]),d].sort((a,b)=>a.date.localeCompare(b.date)):(data.upcomingDates||[]).map(x=>x.id===d.id?d:x)}); closeModal(); },
    case:    () => { upd({...data,caseInfo:form}); closeModal(); },
  };

  const del = {
    event:   id => upd({...data,events:data.events.filter(e=>e.id!==id)}),
    doc:     id => upd({...data,documents:data.documents.filter(d=>d.id!==id)}),
    note:    id => upd({...data,notes:data.notes.filter(n=>n.id!==id)}),
    related: id => upd({...data,relatedCases:(data.relatedCases||[]).filter(r=>r.id!==id)}),
    pending: id => upd({...data,pendingRequests:(data.pendingRequests||[]).filter(p=>p.id!==id)}),
    person:  id => upd({...data,people:(data.people||[]).filter(p=>p.id!==id)}),
    date:    id => upd({...data,upcomingDates:(data.upcomingDates||[]).filter(d=>d.id!==id)}),
  };

  const togglePending = id => {
    upd({...data,pendingRequests:(data.pendingRequests||[]).map(p=>p.id===id?{...p,done:!p.done}:p)});
  };

  const parseWithAI = async () => {
    if(!parseText.trim()) return;
    setParsing(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:`Analiza el siguiente texto y extrae eventos de una línea de tiempo legal/caso. Devuelve SOLO JSON válido, sin backticks ni texto extra. Formato: {"events":[{"date":"YYYY-MM-DD","type":"legal|financial|comms|evidence|testimony|other","title":"string","description":"string"}]}. Si no hay fecha exacta, usa una aproximada. Texto:\n\n${parseText}`}]})});
      const d = await res.json();
      const txt = d.content?.find(b=>b.type==="text")?.text||"";
      const parsed = JSON.parse(txt);
      if(parsed.events?.length) {
        const newEvs = parsed.events.map(e=>({...e,id:"e"+Date.now()+Math.random(),attachedDocs:[]}));
        upd({...data,events:[...data.events,...newEvs].sort((a,b)=>a.date.localeCompare(b.date))});
        closeModal();
      }
    } catch { alert("Error al parsear."); }
    setParsing(false);
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
    const a = document.createElement("a"); a.href=URL.createObjectURL(blob);
    a.download=`expediente_${data.caseInfo.folderNo||"caso"}_${new Date().toISOString().slice(0,10)}.json`;
    a.click(); URL.revokeObjectURL(a.href);
  };

  const exportPDF = () => {
    const w = window.open("","_blank");
    const ci = data.caseInfo;
    const typeColors = {legal:{bg:"#EEEDFE",border:"#7F77DD",text:"#3C3489"},financial:{bg:"#FAEEDA",border:"#BA7517",text:"#633806"},comms:{bg:"#E6F1FB",border:"#378ADD",text:"#0C447C"},evidence:{bg:"#E1F5EE",border:"#1D9E75",text:"#085041"},testimony:{bg:"#FAECE7",border:"#D85A30",text:"#4A1B0C"},other:{bg:"#F1EFE8",border:"#888780",text:"#2C2C2A"}};
    const badge = (type,label) => { const c=typeColors[type]||typeColors.other; return `<span style="background:${c.bg};color:${c.text};border:1px solid ${c.border};border-radius:4px;font-size:10px;padding:2px 7px;font-weight:600">${label}</span>`; };
    const statsHtml = EVENT_TYPES.map(et=>{ const count=data.events.filter(e=>e.type===et.id).length; if(!count) return ""; const c=typeColors[et.id]||typeColors.other; return `<div style="text-align:center;padding:10px 14px;background:${c.bg};border:1px solid ${c.border};border-radius:6px"><div style="font-size:22px;font-weight:700;color:${c.text}">${count}</div><div style="font-size:10px;color:${c.text};margin-top:2px">${et.label}</div></div>`; }).join("");
    const timelineHtml = data.events.map((ev,i)=>{ const et=EVENT_TYPES.find(t=>t.id===ev.type)||EVENT_TYPES[5]; const c=typeColors[ev.type]||typeColors.other; const linkedDocs=(ev.attachedDocs||[]).map(docId=>{ const doc=data.documents.find(d=>d.id===docId); return doc?`<span style="font-size:10px;background:#f0f0f0;border:1px solid #ddd;border-radius:3px;padding:1px 6px;margin-right:4px">📎 ${doc.name}</span>`:""; }).join(""); return `<div style="display:flex;gap:0;margin-bottom:0"><div style="display:flex;flex-direction:column;align-items:center;width:28px;flex-shrink:0"><div style="width:12px;height:12px;border-radius:50%;background:${c.border};border:2px solid white;box-shadow:0 0 0 1px ${c.border};margin-top:4px;flex-shrink:0"></div>${i<data.events.length-1?`<div style="width:2px;flex:1;background:#e0e0e0;margin-top:2px"></div>`:""}</div><div style="flex:1;padding:0 0 20px 12px"><div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap"><span style="font-size:11px;color:#888;font-family:monospace">${ev.date}</span>${badge(ev.type,et.label)}<strong style="font-size:13px">${ev.title}</strong></div>${ev.description?`<p style="margin:0 0 6px;font-size:12px;color:#444;line-height:1.6">${ev.description}</p>`:""}${linkedDocs?`<div style="margin-top:4px">${linkedDocs}</div>`:""}</div></div>`; }).join("");
    const docsHtml = data.documents.map(doc=>{ const dt=DOC_TYPES.find(d=>d.id===doc.type)||DOC_TYPES[4]; return `<div style="display:flex;align-items:flex-start;gap:12px;padding:10px 0;border-bottom:1px solid #eee"><div style="flex:1"><div style="font-size:13px;font-weight:600">${doc.name}</div><div style="font-size:11px;color:#666;margin-top:2px">${dt.label}${doc.dateAdded?" · "+doc.dateAdded:""}</div>${(doc.tags||[]).length?`<div style="margin-top:4px">${doc.tags.map(t=>`<span style="background:#f0f0f0;border-radius:3px;font-size:10px;padding:1px 6px;margin-right:4px">${t}</span>`).join("")}</div>`:""}</div>${doc.url?`<div style="font-size:10px;color:#378ADD">${doc.url}</div>`:""}</div>`; }).join("");
    const notesHtml = data.notes.map(n=>{ const et=EVENT_TYPES.find(t=>t.id===n.type)||EVENT_TYPES[5]; const c=typeColors[n.type]||typeColors.other; return `<div style="border-left:3px solid ${c.border};background:${c.bg};border-radius:0 6px 6px 0;padding:10px 14px;margin-bottom:12px"><div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;flex-wrap:wrap">${badge(n.type,et.label)}<strong style="font-size:13px">${n.title}</strong><span style="font-size:11px;color:#888;margin-left:auto">${n.date}${n.author?" · "+n.author:""}</span></div><p style="margin:0;font-size:12px;color:#444;line-height:1.7;white-space:pre-wrap">${n.content}</p></div>`; }).join("");
    const pendingHtml = (data.pendingRequests||[]).map(p=>`<tr><td>${p.done?"✅":"⬜"}</td><td>${p.description}</td><td>${p.requestedBy||""}</td><td>${p.date||""}</td></tr>`).join("");
    const peopleHtml = (data.people||[]).map(p=>{ const pr=PERSON_ROLES.find(r=>r.id===p.role)||PERSON_ROLES[4]; return `<tr><td>${pr.label}</td><td><strong>${p.name}</strong></td><td>${p.phone||""}</td><td>${p.email||""}</td><td style="font-size:11px;color:#666">${p.notes||""}</td></tr>`; }).join("");
    const datesHtml = (data.upcomingDates||[]).map(d=>`<tr><td><strong>${d.date}</strong></td><td>${d.title}</td><td>${d.location||""}</td><td style="font-size:11px;color:#666">${d.notes||""}</td></tr>`).join("");
    w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Expediente ${ci.folderNo}</title><style>*{box-sizing:border-box}body{font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:#111;padding:2.5rem 3rem;max-width:860px;margin:0 auto;line-height:1.5}h1{font-size:22px;font-weight:700;margin:0 0 4px}h2{font-size:13px;font-weight:700;margin:2rem 0 10px;padding-bottom:6px;border-bottom:2px solid #111;text-transform:uppercase;letter-spacing:.06em}.meta-grid{display:grid;grid-template-columns:1fr 1fr;gap:4px 24px;font-size:12px;color:#555;margin-bottom:14px}.meta-grid span{color:#111;font-weight:600}.desc-box{background:#f7f7f7;border-left:3px solid #bbb;padding:10px 16px;font-size:13px;color:#333;line-height:1.7;margin-bottom:12px;border-radius:0 4px 4px 0}.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(90px,1fr));gap:8px;margin-bottom:4px}table{width:100%;border-collapse:collapse;margin-bottom:1rem}th{background:#222;color:#fff;text-align:left;padding:6px 10px;font-size:11px}td{padding:7px 10px;border-bottom:1px solid #eee;vertical-align:top;font-size:12px}.footer{margin-top:3rem;font-size:10px;color:#aaa;border-top:1px solid #eee;padding-top:10px;display:flex;justify-content:space-between}@media print{body{padding:1.5rem 2rem}@page{margin:1.5cm}}</style></head><body>
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid #ddd">
      <div><div style="font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:#888;margin-bottom:4px">Reporte de expediente</div><h1>${ci.title}</h1><div style="font-size:12px;color:#666;margin-top:4px">${ci.folderNo} · ${ci.court}</div></div>
      <div style="text-align:right"><div style="font-size:11px;color:#888">Estado</div><div style="font-size:14px;font-weight:600">${ci.status}</div><div style="font-size:10px;color:#aaa;margin-top:8px">${new Date().toLocaleDateString("es-MX",{year:"numeric",month:"long",day:"numeric"})}</div></div>
    </div>
    <h2>Resumen ejecutivo</h2>
    <div class="meta-grid"><div>Contraparte: <span>${ci.opponent||"—"}</span></div><div>Juzgado: <span>${ci.court||"—"}</span></div><div>Domicilio: <span>${ci.address||"—"}</span></div><div>Cuenta: <span>${ci.accountNo||"—"}</span></div></div>
    <div class="desc-box">${ci.notes||""}</div>
    <div class="stats">${statsHtml}</div>
    <h2>Fechas importantes</h2>
    <table><thead><tr><th>Fecha</th><th>Evento</th><th>Lugar</th><th>Notas</th></tr></thead><tbody>${datesHtml||"<tr><td colspan=4 style='color:#999'>Sin fechas registradas</td></tr>"}</tbody></table>
    <h2>Pendientes solicitados</h2>
    <table><thead><tr><th>✓</th><th>Descripción</th><th>Solicitado por</th><th>Fecha</th></tr></thead><tbody>${pendingHtml||"<tr><td colspan=4 style='color:#999'>Sin pendientes</td></tr>"}</tbody></table>
    <h2>Timeline de eventos</h2>
    <div style="padding-left:4px">${timelineHtml||"<p style='color:#888'>Sin eventos.</p>"}</div>
    <h2>Documentos</h2>
    <div>${docsHtml||"<p style='color:#888'>Sin documentos.</p>"}</div>
    <h2>Personas clave</h2>
    <table><thead><tr><th>Rol</th><th>Nombre</th><th>Teléfono</th><th>Email</th><th>Notas</th></tr></thead><tbody>${peopleHtml||"<tr><td colspan=5 style='color:#999'>Sin personas registradas</td></tr>"}</tbody></table>
    <h2>Notas y testimonios</h2>
    <div>${notesHtml||"<p style='color:#888'>Sin notas.</p>"}</div>
    <div class="footer"><span>${ci.folderNo} — ${ci.title}</span><span>Generado ${new Date().toLocaleString("es-MX")} · Dashboard de caso POC</span></div>
    </body></html>`);
    w.document.close(); setTimeout(()=>w.print(),600);
  };

  // Search
  const searchResults = globalSearch.trim().length < 2 ? [] : (() => {
    const q = globalSearch.toLowerCase(); const res = [];
    data.events.forEach(ev=>{ if([ev.title,ev.description,ev.date].some(f=>f?.toLowerCase().includes(q))){ const et=EVENT_TYPES.find(t=>t.id===ev.type)||EVENT_TYPES[5]; res.push({kind:"event",color:et.color,label:et.label,title:ev.title,sub:ev.date,body:ev.description,id:ev.id,tab:"timeline"}); } });
    data.documents.forEach(doc=>{ if([doc.name,...(doc.tags||[])].some(f=>f?.toLowerCase().includes(q))){ res.push({kind:"doc",color:"teal",label:"Documento",title:doc.name,sub:doc.dateAdded,url:doc.url,id:doc.id,tab:"docs"}); } });
    data.notes.forEach(n=>{ if([n.title,n.content,n.author].some(f=>f?.toLowerCase().includes(q))){ const et=EVENT_TYPES.find(t=>t.id===n.type)||EVENT_TYPES[5]; res.push({kind:"note",color:et.color,label:et.label,title:n.title,sub:n.date,body:n.content,id:n.id,tab:"notes"}); } });
    (data.pendingRequests||[]).forEach(p=>{ if([p.description,p.requestedBy].some(f=>f?.toLowerCase().includes(q))){ res.push({kind:"pending",color:p.done?"green":"red",label:p.done?"Completado":"Pendiente",title:p.description,sub:p.requestedBy,id:p.id,tab:"pending"}); } });
    (data.people||[]).forEach(p=>{ if([p.name,p.notes,p.phone,p.email].some(f=>f?.toLowerCase().includes(q))){ const pr=PERSON_ROLES.find(r=>r.id===p.role)||PERSON_ROLES[4]; res.push({kind:"person",color:pr.color,label:pr.label,title:p.name,sub:p.phone,body:p.notes,id:p.id,tab:"people"}); } });
    return res;
  })();

  const ci = data.caseInfo;
  const pendingCount = (data.pendingRequests||[]).filter(p=>!p.done).length;
  const nextDate = (data.upcomingDates||[]).find(d=>d.date>=new Date().toISOString().slice(0,10));
  const filteredEvents = filterType==="all"?data.events:data.events.filter(e=>e.type===filterType);
  const filteredDocs   = data.documents.filter(d=>searchDoc===""||d.name.toLowerCase().includes(searchDoc.toLowerCase())||(d.tags||[]).some(t=>t.toLowerCase().includes(searchDoc.toLowerCase())));

  return (
    <div style={{fontFamily:"var(--font-sans)",color:"var(--color-text-primary)",padding:"1rem 0"}}>
      <h2 className="sr-only">Dashboard de caso</h2>

      {/* Header */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
        <div>
          <div style={{fontSize:11,color:"var(--color-text-secondary)",marginBottom:2,textTransform:"uppercase",letterSpacing:".05em"}}>Expediente</div>
          <h1 style={{fontSize:19,fontWeight:500,margin:0,lineHeight:1.3}}>{ci.title}</h1>
          <div style={{fontSize:12,color:"var(--color-text-secondary)",marginTop:3}}>{ci.folderNo} · {ci.court}</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:6}}>
          <Badge color={ci.status==="En proceso"?"amber":"teal"} label={ci.status} />
          <div style={{display:"flex",gap:5}}>
            <Btn onClick={exportJSON}><i className="ti ti-file-download" style={{fontSize:12}} />JSON</Btn>
            <Btn onClick={exportPDF}><i className="ti ti-printer" style={{fontSize:12}} />PDF</Btn>
          </div>
        </div>
      </div>

      {/* Próxima fecha alert */}
      {nextDate && (
        <div style={{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",background:COLORS.amber.bg,border:`1px solid ${COLORS.amber.border}`,borderRadius:8,marginBottom:12,fontSize:12}}>
          <i className="ti ti-calendar-event" style={{fontSize:16,color:COLORS.amber.text,flexShrink:0}} />
          <span style={{color:COLORS.amber.text}}><strong>Próxima fecha:</strong> {nextDate.date} — {nextDate.title}{nextDate.location?` · ${nextDate.location}`:""}</span>
          <button onClick={()=>setTab("dates")} style={{marginLeft:"auto",fontSize:11,background:"none",border:"none",cursor:"pointer",color:COLORS.amber.text,textDecoration:"underline",padding:0}}>Ver todas</button>
        </div>
      )}

      {/* Global search */}
      <div style={{position:"relative",marginBottom:14}}>
        <i className="ti ti-search" style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",fontSize:14,color:"var(--color-text-tertiary)",pointerEvents:"none"}} />
        <input placeholder="Buscar en todo el expediente…" value={globalSearch} onChange={e=>{setGlobalSearch(e.target.value);setShowSearch(true);}} onFocus={()=>setShowSearch(true)} style={{width:"100%",boxSizing:"border-box",paddingLeft:32}} />
        {showSearch && globalSearch.trim().length>=2 && (
          <div style={{position:"absolute",top:"calc(100% + 4px)",left:0,right:0,zIndex:200,background:"canvas",border:"1px solid var(--color-border-secondary)",borderRadius:10,maxHeight:340,overflowY:"auto"}}>
            {searchResults.length===0
              ? <div style={{padding:"1rem",fontSize:13,color:"var(--color-text-secondary)"}}>Sin resultados para "{globalSearch}"</div>
              : searchResults.map((r,i)=>(
                  <div key={r.id+i} onClick={()=>{setTab(r.tab);setShowSearch(false);setGlobalSearch("");}}
                    style={{display:"flex",gap:10,alignItems:"flex-start",padding:"9px 12px",cursor:"pointer",borderTop:i>0?"1px solid var(--color-border-tertiary)":"none"}}
                    onMouseEnter={e=>e.currentTarget.style.background="var(--color-background-secondary)"}
                    onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{display:"flex",gap:6,alignItems:"center",marginBottom:2,flexWrap:"wrap"}}><Badge color={r.color} label={r.label} /></div>
                      <div style={{fontSize:13,fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.title}</div>
                      {r.sub&&<div style={{fontSize:11,color:"var(--color-text-secondary)",marginTop:1}}>{r.sub}</div>}
                    </div>
                    {r.url&&<a href={r.url} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()} style={{color:"var(--color-text-tertiary)",textDecoration:"none"}}><i className="ti ti-external-link" style={{fontSize:13}} /></a>}
                  </div>
                ))
            }
          </div>
        )}
      </div>

      {/* Tabs */}
      <div style={{display:"flex",gap:3,marginBottom:18,flexWrap:"wrap",borderBottom:"1px solid var(--color-border-tertiary)",paddingBottom:8}}>
        {[
          {id:"summary", icon:"ti-layout-dashboard",label:"Resumen"},
          {id:"pending", icon:"ti-checklist",       label:"Pendientes", badge:pendingCount},
          {id:"dates",   icon:"ti-calendar-event",  label:"Fechas"},
          {id:"timeline",icon:"ti-timeline",         label:"Timeline"},
          {id:"docs",    icon:"ti-files",            label:"Documentos"},
          {id:"people",  icon:"ti-users",            label:"Personas clave"},
          {id:"notes",   icon:"ti-notes",            label:"Notas"},
          {id:"related", icon:"ti-folders",          label:"Relacionados"},
        ].map(t=><Tab key={t.id} active={tab===t.id} onClick={()=>setTab(t.id)} icon={t.icon} label={t.label} badge={t.badge} />)}
      </div>

      {/* SUMMARY */}
      {tab==="summary" && (
        <div>
          <div style={{background:"var(--color-background-secondary)",borderRadius:10,padding:"12px 16px",marginBottom:14}}>
            <p style={{margin:0,fontSize:13,lineHeight:1.7,color:"var(--color-text-secondary)"}}>{ci.notes}</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(110px,1fr))",gap:8,marginBottom:16}}>
            {[{label:"Eventos",val:data.events.length},{label:"Documentos",val:data.documents.length},{label:"Pendientes",val:pendingCount},{label:"Personas clave",val:(data.people||[]).length}].map(s=>(
              <div key={s.label} style={{background:"var(--color-background-secondary)",borderRadius:8,padding:"10px",textAlign:"center"}}>
                <div style={{fontSize:11,color:"var(--color-text-secondary)",marginBottom:2}}>{s.label}</div>
                <div style={{fontSize:26,fontWeight:500}}>{s.val}</div>
              </div>
            ))}
          </div>
          {pendingCount>0 && (
            <div style={{marginBottom:14}}>
              <SectionHeader title="Pendientes sin completar" action={<button onClick={()=>setTab("pending")} style={{fontSize:11,background:"none",border:"none",cursor:"pointer",color:"var(--color-text-secondary)",textDecoration:"underline",padding:0}}>Ver todos</button>} />
              {(data.pendingRequests||[]).filter(p=>!p.done).slice(0,3).map(p=>(
                <div key={p.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:"1px solid var(--color-border-tertiary)"}}>
                  <i className="ti ti-circle" style={{fontSize:14,color:COLORS.red.text,flexShrink:0}} />
                  <span style={{fontSize:13,flex:1}}>{p.description}</span>
                  <span style={{fontSize:11,color:"var(--color-text-tertiary)",flexShrink:0}}>{p.requestedBy}</span>
                </div>
              ))}
            </div>
          )}
          <div style={{marginBottom:14}}>
            <SectionHeader title="Últimos eventos" action={<button onClick={()=>setTab("timeline")} style={{fontSize:11,background:"none",border:"none",cursor:"pointer",color:"var(--color-text-secondary)",textDecoration:"underline",padding:0}}>Ver todos</button>} />
            {data.events.slice(-3).reverse().map(ev=>{ const et=EVENT_TYPES.find(t=>t.id===ev.type)||EVENT_TYPES[5]; return (
              <div key={ev.id} style={{display:"flex",gap:10,alignItems:"center",padding:"7px 0",borderBottom:"1px solid var(--color-border-tertiary)"}}>
                <span style={{fontSize:11,color:"var(--color-text-secondary)",minWidth:76,flexShrink:0}}>{ev.date}</span>
                <Badge color={et.color} label={et.label} />
                <span style={{fontSize:13}}>{ev.title}</span>
              </div>
            );})}
          </div>
          {(data.relatedCases||[]).length>0 && (
            <div style={{marginBottom:14}}>
              <SectionHeader title="Casos relacionados" action={<button onClick={()=>setTab("related")} style={{fontSize:11,background:"none",border:"none",cursor:"pointer",color:"var(--color-text-secondary)",textDecoration:"underline",padding:0}}>Ver todos</button>} />
              {(data.relatedCases||[]).map(r=>{ const rt=RELATED_TYPES.find(t=>t.id===r.type)||RELATED_TYPES[5]; const rel=RELATION_TYPES.find(x=>x.id===r.relation); return (
                <div key={r.id} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 10px",background:"var(--color-background-secondary)",borderRadius:8,border:"1px solid var(--color-border-tertiary)",marginBottom:6}}>
                  <Badge color={rt.color} label={rt.label} />
                  <span style={{fontSize:13,fontWeight:500}}>{r.number}</span>
                  {rel&&<span style={{fontSize:11,color:"var(--color-text-secondary)"}}>{rel.label}</span>}
                  <span style={{fontSize:11,color:"var(--color-text-tertiary)",marginLeft:"auto"}}>{r.status}</span>
                </div>
              );})}
            </div>
          )}
          <Btn onClick={o.editCase}><i className="ti ti-edit" style={{fontSize:12}} />Editar datos del caso</Btn>
        </div>
      )}

      {/* PENDING */}
      {tab==="pending" && (
        <div>
          <SectionHeader title={`${pendingCount} pendiente${pendingCount!==1?"s":""} sin completar`} action={<Btn onClick={o.addPending}><i className="ti ti-plus" style={{fontSize:12}} />Agregar</Btn>} />
          <p style={{fontSize:12,color:"var(--color-text-secondary)",marginTop:-4,marginBottom:14}}>Documentos e información que te han solicitado tu abogado, el juzgado u otras partes.</p>
          {(data.pendingRequests||[]).length===0&&<p style={{color:"var(--color-text-secondary)",fontSize:13}}>Sin pendientes.</p>}
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {(data.pendingRequests||[]).map(p=>(
              <Card key={p.id} style={{display:"flex",alignItems:"flex-start",gap:12}}>
                <button onClick={()=>togglePending(p.id)} style={{background:"none",border:"none",cursor:"pointer",padding:0,paddingTop:1,flexShrink:0}}>
                  <i className={`ti ${p.done?"ti-circle-check":"ti-circle"}`} style={{fontSize:20,color:p.done?COLORS.green.text:COLORS.red.text}} />
                </button>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:p.done?400:500,textDecoration:p.done?"line-through":"none",color:p.done?"var(--color-text-tertiary)":"var(--color-text-primary)"}}>{p.description}</div>
                  <div style={{fontSize:11,color:"var(--color-text-secondary)",marginTop:3}}>{p.requestedBy&&<span>Solicitado por: <strong style={{fontWeight:500}}>{p.requestedBy}</strong></span>}{p.date&&<span> · {p.date}</span>}</div>
                </div>
                <div style={{display:"flex",gap:4,flexShrink:0}}>
                  <Btn onClick={()=>o.editPending(p)}><i className="ti ti-edit" style={{fontSize:12}} /></Btn>
                  <Btn onClick={()=>del.pending(p.id)}><i className="ti ti-trash" style={{fontSize:12}} /></Btn>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* DATES */}
      {tab==="dates" && (
        <div>
          <SectionHeader title="Fechas importantes" action={<Btn onClick={o.addDate}><i className="ti ti-plus" style={{fontSize:12}} />Agregar</Btn>} />
          {(data.upcomingDates||[]).length===0&&<p style={{color:"var(--color-text-secondary)",fontSize:13}}>Sin fechas registradas.</p>}
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {(data.upcomingDates||[]).map(d=>{
              const past = d.date < new Date().toISOString().slice(0,10);
              return (
                <Card key={d.id} style={{borderLeft:`3px solid ${past?COLORS.gray.border:COLORS.amber.border}`,borderRadius:"0 10px 10px 0"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                    <div style={{flex:1}}>
                      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                        <span style={{fontSize:12,fontFamily:"monospace",fontWeight:600,color:past?COLORS.gray.text:COLORS.amber.text,background:past?COLORS.gray.bg:COLORS.amber.bg,padding:"2px 8px",borderRadius:4}}>{d.date}</span>
                        <span style={{fontSize:14,fontWeight:500}}>{d.title}</span>
                      </div>
                      {d.location&&<div style={{fontSize:12,color:"var(--color-text-secondary)",marginBottom:4}}><i className="ti ti-map-pin" style={{fontSize:12,marginRight:4}} />{d.location}</div>}
                      {d.notes&&<p style={{margin:0,fontSize:12,color:"var(--color-text-secondary)",lineHeight:1.6}}>{d.notes}</p>}
                    </div>
                    <div style={{display:"flex",gap:4,flexShrink:0,marginLeft:8}}>
                      <Btn onClick={()=>o.editDate(d)}><i className="ti ti-edit" style={{fontSize:12}} /></Btn>
                      <Btn onClick={()=>del.date(d.id)}><i className="ti ti-trash" style={{fontSize:12}} /></Btn>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* TIMELINE */}
      {tab==="timeline" && (
        <div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10,flexWrap:"wrap",gap:8}}>
            <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
              {[{id:"all",label:"Todos"},...EVENT_TYPES].map(et=>(
                <button key={et.id} onClick={()=>setFilterType(et.id)} style={{fontSize:11,padding:"3px 9px",background:filterType===et.id&&et.id!=="all"?COLORS[et.color]?.bg:filterType===et.id?"var(--color-background-info)":"transparent",color:filterType===et.id&&et.id!=="all"?COLORS[et.color]?.text:filterType===et.id?"var(--color-text-info)":"var(--color-text-secondary)",border:`1px solid ${filterType===et.id&&et.id!=="all"?COLORS[et.color]?.border:"var(--color-border-tertiary)"}`,borderRadius:6,cursor:"pointer"}}>{et.label}</button>
              ))}
            </div>
            <div style={{display:"flex",gap:5}}>
              <Btn onClick={o.addEvent}><i className="ti ti-plus" style={{fontSize:12}} />Agregar evento</Btn>
              <Btn onClick={()=>setModal("parse_text")}><i className="ti ti-wand" style={{fontSize:12}} />Parsear texto ↗</Btn>
            </div>
          </div>
          <div style={{position:"relative",paddingLeft:20}}>
            <div style={{position:"absolute",left:7,top:0,bottom:0,width:1,background:"var(--color-border-tertiary)"}} />
            {filteredEvents.length===0&&<p style={{color:"var(--color-text-secondary)",fontSize:13}}>No hay eventos.</p>}
            {filteredEvents.map(ev=>{ const et=EVENT_TYPES.find(t=>t.id===ev.type)||EVENT_TYPES[5]; const c=COLORS[et.color]; const isLinking=linkingEvent===ev.id; return (
              <div key={ev.id} style={{position:"relative",marginBottom:16}}>
                <div style={{position:"absolute",left:-20,top:8,width:10,height:10,borderRadius:"50%",background:c.border,border:"2px solid white"}} />
                <Card>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4,gap:8}}>
                    <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap",flex:1,minWidth:0}}>
                      <span style={{fontSize:11,color:"var(--color-text-secondary)",flexShrink:0,fontFamily:"monospace"}}>{ev.date}</span>
                      <Badge color={et.color} label={et.label} />
                      <span style={{fontSize:13,fontWeight:500}}>{ev.title}</span>
                    </div>
                    <div style={{display:"flex",gap:4,flexShrink:0}}>
                      <Btn onClick={()=>setLinkingEvent(isLinking?null:ev.id)}><i className="ti ti-paperclip" style={{fontSize:12}} />{(ev.attachedDocs||[]).length>0&&<span>{ev.attachedDocs.length}</span>}</Btn>
                      <Btn onClick={()=>o.editEvent(ev)}><i className="ti ti-edit" style={{fontSize:12}} /></Btn>
                      <Btn onClick={()=>del.event(ev.id)}><i className="ti ti-trash" style={{fontSize:12}} /></Btn>
                    </div>
                  </div>
                  {ev.description&&<p style={{margin:"0 0 6px",fontSize:12,color:"var(--color-text-secondary)",lineHeight:1.6}}>{ev.description}</p>}
                  {(ev.attachedDocs||[]).length>0&&!isLinking&&(
                    <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                      {ev.attachedDocs.map(docId=>{ const doc=data.documents.find(d=>d.id===docId); if(!doc) return null; const dt=DOC_TYPES.find(d=>d.id===doc.type)||DOC_TYPES[4]; return <a key={docId} href={doc.url||"#"} target="_blank" rel="noreferrer" style={{display:"flex",alignItems:"center",gap:4,fontSize:11,background:"var(--color-background-secondary)",border:"1px solid var(--color-border-tertiary)",borderRadius:5,padding:"2px 7px",textDecoration:"none",color:"var(--color-text-secondary)"}}><i className={`ti ${dt.icon}`} style={{fontSize:11}} /><span style={{maxWidth:140,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{doc.name}</span></a>; })}
                    </div>
                  )}
                  {isLinking&&(
                    <div style={{marginTop:8,padding:"10px 12px",background:"var(--color-background-secondary)",borderRadius:8,border:"1px solid var(--color-border-tertiary)"}}>
                      <div style={{fontSize:11,fontWeight:500,color:"var(--color-text-secondary)",marginBottom:8}}>Vincular documentos</div>
                      {data.documents.length===0&&<p style={{fontSize:12,color:"var(--color-text-tertiary)",margin:0}}>Sin documentos disponibles.</p>}
                      {data.documents.map(doc=>{ const dt=DOC_TYPES.find(d=>d.id===doc.type)||DOC_TYPES[4]; const linked=(ev.attachedDocs||[]).includes(doc.id); return <div key={doc.id} onClick={()=>toggleDocLink(ev.id,doc.id)} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 8px",borderRadius:6,cursor:"pointer",background:linked?COLORS.teal.bg:"transparent",marginBottom:2}} onMouseEnter={e=>{if(!linked)e.currentTarget.style.background="var(--color-background-primary)";}} onMouseLeave={e=>{if(!linked)e.currentTarget.style.background="transparent;"}}><i className={`ti ${linked?"ti-check":"ti-circle"}`} style={{fontSize:13,color:linked?COLORS.teal.text:"var(--color-text-tertiary)"}} /><i className={`ti ${dt.icon}`} style={{fontSize:12,color:"var(--color-text-secondary)"}} /><span style={{fontSize:12,flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",color:linked?COLORS.teal.text:"var(--color-text-primary)",fontWeight:linked?500:400}}>{doc.name}</span></div>; })}
                      <Btn onClick={()=>setLinkingEvent(null)} style={{marginTop:6}}>Cerrar</Btn>
                    </div>
                  )}
                </Card>
              </div>
            );})}
          </div>
        </div>
      )}

      {/* DOCS */}
      {tab==="docs" && (
        <div>
          <div style={{display:"flex",gap:8,marginBottom:12,alignItems:"center"}}>
            <input placeholder="Buscar por nombre o etiqueta..." value={searchDoc} onChange={e=>setSearchDoc(e.target.value)} style={{flex:1}} />
            <Btn onClick={o.addDoc}><i className="ti ti-plus" style={{fontSize:12}} />Agregar</Btn>
          </div>
          {filteredDocs.length===0&&<p style={{color:"var(--color-text-secondary)",fontSize:13}}>Sin documentos.</p>}
          <div style={{display:"flex",flexDirection:"column",gap:7}}>
            {filteredDocs.map(doc=>{ const dt=DOC_TYPES.find(d=>d.id===doc.type)||DOC_TYPES[4]; return (
              <Card key={doc.id} style={{display:"flex",alignItems:"center",gap:10}}>
                <i className={`ti ${dt.icon}`} style={{fontSize:18,color:"var(--color-text-secondary)",flexShrink:0}} />
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{doc.name}</div>
                  <div style={{fontSize:11,color:"var(--color-text-secondary)",marginTop:2,display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
                    <span>{dt.label}</span>{doc.dateAdded&&<span>· {doc.dateAdded}</span>}
                    {(doc.tags||[]).map(t=><span key={t} style={{background:"var(--color-background-secondary)",padding:"1px 5px",borderRadius:3,fontSize:10}}>{t}</span>)}
                  </div>
                </div>
                <div style={{display:"flex",gap:4,flexShrink:0}}>
                  {doc.url&&<a href={doc.url} target="_blank" rel="noreferrer" style={{display:"inline-flex",alignItems:"center",justifyContent:"center",padding:"5px 8px",borderRadius:6,background:"var(--color-background-secondary)",border:"1px solid var(--color-border-secondary)",color:"var(--color-text-secondary)",textDecoration:"none"}}><i className="ti ti-external-link" style={{fontSize:12}} /></a>}
                  <Btn onClick={()=>o.editDoc(doc)}><i className="ti ti-edit" style={{fontSize:12}} /></Btn>
                  <Btn onClick={()=>del.doc(doc.id)}><i className="ti ti-trash" style={{fontSize:12}} /></Btn>
                </div>
              </Card>
            );})}
          </div>
        </div>
      )}

      {/* PEOPLE */}
      {tab==="people" && (
        <div>
          <SectionHeader title="Personas clave" action={<Btn onClick={o.addPerson}><i className="ti ti-plus" style={{fontSize:12}} />Agregar</Btn>} />
          <p style={{fontSize:12,color:"var(--color-text-secondary)",marginTop:-4,marginBottom:14}}>Testigos, peritos, funcionarios y cualquier persona relevante para el caso.</p>
          {(data.people||[]).length===0&&<p style={{color:"var(--color-text-secondary)",fontSize:13}}>Sin personas registradas.</p>}
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {(data.people||[]).map(p=>{ const pr=PERSON_ROLES.find(r=>r.id===p.role)||PERSON_ROLES[4]; return (
              <Card key={p.id}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div style={{display:"flex",gap:10,alignItems:"flex-start",flex:1}}>
                    <div style={{width:36,height:36,borderRadius:"50%",background:COLORS[pr.color]?.bg,border:`1px solid ${COLORS[pr.color]?.border}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:13,fontWeight:600,color:COLORS[pr.color]?.text}}>
                      {p.name.split(" ").map(n=>n[0]).slice(0,2).join("")}
                    </div>
                    <div style={{flex:1}}>
                      <div style={{display:"flex",gap:6,alignItems:"center",marginBottom:4,flexWrap:"wrap"}}>
                        <span style={{fontSize:14,fontWeight:500}}>{p.name}</span>
                        <Badge color={pr.color} label={pr.label} />
                      </div>
                      <div style={{display:"flex",gap:12,flexWrap:"wrap",fontSize:12,color:"var(--color-text-secondary)"}}>
                        {p.phone&&<span><i className="ti ti-phone" style={{fontSize:12,marginRight:3}} />{p.phone}</span>}
                        {p.email&&<span><i className="ti ti-mail" style={{fontSize:12,marginRight:3}} />{p.email}</span>}
                      </div>
                      {p.notes&&<p style={{margin:"6px 0 0",fontSize:12,color:"var(--color-text-secondary)",lineHeight:1.6}}>{p.notes}</p>}
                    </div>
                  </div>
                  <div style={{display:"flex",gap:4,flexShrink:0,marginLeft:8}}>
                    <Btn onClick={()=>o.editPerson(p)}><i className="ti ti-edit" style={{fontSize:12}} /></Btn>
                    <Btn onClick={()=>del.person(p.id)}><i className="ti ti-trash" style={{fontSize:12}} /></Btn>
                  </div>
                </div>
              </Card>
            );})}
          </div>
        </div>
      )}

      {/* NOTES */}
      {tab==="notes" && (
        <div>
          <SectionHeader title="Notas y testimonios" action={<Btn onClick={o.addNote}><i className="ti ti-plus" style={{fontSize:12}} />Agregar</Btn>} />
          {data.notes.length===0&&<p style={{color:"var(--color-text-secondary)",fontSize:13}}>Sin notas.</p>}
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {data.notes.map(note=>{ const et=EVENT_TYPES.find(t=>t.id===note.type)||EVENT_TYPES[5]; const c=COLORS[et.color]; return (
              <Card key={note.id} style={{borderLeft:`3px solid ${c.border}`,borderRadius:"0 10px 10px 0"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
                    <Badge color={et.color} label={et.label} />
                    <span style={{fontSize:13,fontWeight:500}}>{note.title}</span>
                  </div>
                  <div style={{display:"flex",gap:4,flexShrink:0,marginLeft:8}}>
                    <Btn onClick={()=>o.editNote(note)}><i className="ti ti-edit" style={{fontSize:12}} /></Btn>
                    <Btn onClick={()=>del.note(note.id)}><i className="ti ti-trash" style={{fontSize:12}} /></Btn>
                  </div>
                </div>
                <p style={{margin:0,fontSize:12,lineHeight:1.7,color:"var(--color-text-secondary)",whiteSpace:"pre-wrap"}}>{note.content}</p>
                <div style={{fontSize:11,color:"var(--color-text-tertiary)",marginTop:6}}>{note.date}{note.author?` · ${note.author}`:""}</div>
              </Card>
            );})}
          </div>
        </div>
      )}

      {/* RELATED */}
      {tab==="related" && (
        <div>
          <SectionHeader title="Casos y carpetas relacionadas" action={<Btn onClick={o.addRelated}><i className="ti ti-plus" style={{fontSize:12}} />Agregar</Btn>} />
          {(data.relatedCases||[]).length===0&&<p style={{color:"var(--color-text-secondary)",fontSize:13}}>Sin casos relacionados.</p>}
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {(data.relatedCases||[]).map(r=>{ const rt=RELATED_TYPES.find(t=>t.id===r.type)||RELATED_TYPES[5]; const rel=RELATION_TYPES.find(x=>x.id===r.relation); return (
              <Card key={r.id}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center",marginBottom:6}}>
                      <Badge color={rt.color} label={rt.label} />
                      <span style={{fontSize:14,fontWeight:500}}>{r.number}</span>
                      {r.status&&<Badge color="gray" label={r.status} />}
                      {rel&&<span style={{display:"flex",alignItems:"center",gap:3,fontSize:11,color:"var(--color-text-secondary)",border:"1px solid var(--color-border-tertiary)",borderRadius:5,padding:"1px 7px"}}><i className={`ti ${rel.icon}`} style={{fontSize:11}} />{rel.label}</span>}
                    </div>
                    <div style={{display:"flex",gap:14,flexWrap:"wrap",fontSize:12,color:"var(--color-text-secondary)"}}>
                      {r.authority&&<span><i className="ti ti-building" style={{fontSize:12,marginRight:3}} />{r.authority}</span>}
                      {r.dateOpened&&<span><i className="ti ti-calendar" style={{fontSize:12,marginRight:3}} />{r.dateOpened}</span>}
                    </div>
                    {r.description&&<p style={{margin:"6px 0 0",fontSize:12,color:"var(--color-text-secondary)",lineHeight:1.6}}>{r.description}</p>}
                  </div>
                  <div style={{display:"flex",gap:4,flexShrink:0,marginLeft:8}}>
                    <Btn onClick={()=>o.editRelated(r)}><i className="ti ti-edit" style={{fontSize:12}} /></Btn>
                    <Btn onClick={()=>del.related(r.id)}><i className="ti ti-trash" style={{fontSize:12}} /></Btn>
                  </div>
                </div>
              </Card>
            );})}
          </div>
        </div>
      )}

      {/* MODALS */}
      {modal==="case" && (
        <Modal title="Editar datos del caso" onClose={closeModal}>
          {[["title","Título"],["folderNo","Número de carpeta"],["court","Juzgado / Autoridad"],["status","Estado"],["opponent","Contraparte"],["accountNo","Número de cuenta"],["address","Dirección"]].map(([k,l])=>(
            <Field key={k} label={l} value={form[k]||""} onChange={v=>setForm({...form,[k]:v})} />
          ))}
          <Field label="Descripción general" value={form.notes||""} onChange={v=>setForm({...form,notes:v})} as="textarea" rows={4} />
          <div style={{display:"flex",justifyContent:"flex-end",gap:8,marginTop:8}}><Btn onClick={closeModal}>Cancelar</Btn><Btn onClick={s.case} style={{fontWeight:500,color:"var(--color-text-primary)"}}>Guardar</Btn></div>
        </Modal>
      )}
      {modal==="event" && (
        <Modal title={form.id?"Editar evento":"Agregar evento"} onClose={closeModal}>
          <Field label="Fecha" type="date" value={form.date||""} onChange={v=>setForm({...form,date:v})} />
          <Field label="Tipo" as="select" value={form.type||"legal"} onChange={v=>setForm({...form,type:v})} options={EVENT_TYPES.map(t=>({value:t.id,label:t.label}))} />
          <Field label="Título" value={form.title||""} onChange={v=>setForm({...form,title:v})} />
          <Field label="Descripción" value={form.description||""} onChange={v=>setForm({...form,description:v})} as="textarea" />
          <div style={{display:"flex",justifyContent:"flex-end",gap:8,marginTop:8}}><Btn onClick={closeModal}>Cancelar</Btn><Btn onClick={s.event} style={{fontWeight:500,color:"var(--color-text-primary)"}}>Guardar</Btn></div>
        </Modal>
      )}
      {modal==="doc" && (
        <Modal title={form.id?"Editar documento":"Agregar documento"} onClose={closeModal}>
          <Field label="Nombre del archivo" value={form.name||""} onChange={v=>setForm({...form,name:v})} />
          <Field label="Origen" as="select" value={form.type||"google_drive"} onChange={v=>setForm({...form,type:v})} options={DOC_TYPES.map(d=>({value:d.id,label:d.label}))} />
          <Field label="URL / enlace directo" value={form.url||""} onChange={v=>setForm({...form,url:v})} />
          <Field label="Etiquetas (separadas por coma)" value={form.tags||""} onChange={v=>setForm({...form,tags:v})} />
          <Field label="Fecha" type="date" value={form.dateAdded||""} onChange={v=>setForm({...form,dateAdded:v})} />
          <div style={{display:"flex",justifyContent:"flex-end",gap:8,marginTop:8}}><Btn onClick={closeModal}>Cancelar</Btn><Btn onClick={s.doc} style={{fontWeight:500,color:"var(--color-text-primary)"}}>Guardar</Btn></div>
        </Modal>
      )}
      {modal==="note" && (
        <Modal title={form.id?"Editar nota":"Agregar nota / testimonio"} onClose={closeModal}>
          <Field label="Título" value={form.title||""} onChange={v=>setForm({...form,title:v})} />
          <Field label="Tipo" as="select" value={form.type||"testimony"} onChange={v=>setForm({...form,type:v})} options={EVENT_TYPES.map(t=>({value:t.id,label:t.label}))} />
          <Field label="Autor" value={form.author||""} onChange={v=>setForm({...form,author:v})} />
          <Field label="Fecha" type="date" value={form.date||""} onChange={v=>setForm({...form,date:v})} />
          <Field label="Contenido" value={form.content||""} onChange={v=>setForm({...form,content:v})} as="textarea" rows={6} />
          <div style={{display:"flex",justifyContent:"flex-end",gap:8,marginTop:8}}><Btn onClick={closeModal}>Cancelar</Btn><Btn onClick={s.note} style={{fontWeight:500,color:"var(--color-text-primary)"}}>Guardar</Btn></div>
        </Modal>
      )}
      {modal==="related" && (
        <Modal title={form.id?"Editar caso relacionado":"Agregar caso relacionado"} onClose={closeModal}>
          <Field label="Tipo" as="select" value={form.type||"carpeta"} onChange={v=>setForm({...form,type:v})} options={RELATED_TYPES.map(t=>({value:t.id,label:t.label}))} />
          <Field label="Relación con el caso principal" as="select" value={form.relation||"derivado_de"} onChange={v=>setForm({...form,relation:v})} options={RELATION_TYPES.map(t=>({value:t.id,label:t.label}))} />
          <Field label="Número de carpeta / expediente" value={form.number||""} onChange={v=>setForm({...form,number:v})} />
          <Field label="Autoridad / Juzgado" value={form.authority||""} onChange={v=>setForm({...form,authority:v})} />
          <Field label="Estado" value={form.status||""} onChange={v=>setForm({...form,status:v})} />
          <Field label="Fecha de apertura" type="date" value={form.dateOpened||""} onChange={v=>setForm({...form,dateOpened:v})} />
          <Field label="Descripción" value={form.description||""} onChange={v=>setForm({...form,description:v})} as="textarea" rows={3} />
          <div style={{display:"flex",justifyContent:"flex-end",gap:8,marginTop:8}}><Btn onClick={closeModal}>Cancelar</Btn><Btn onClick={s.related} style={{fontWeight:500,color:"var(--color-text-primary)"}}>Guardar</Btn></div>
        </Modal>
      )}
      {modal==="pending" && (
        <Modal title={form.id?"Editar pendiente":"Agregar pendiente"} onClose={closeModal}>
          <Field label="¿Qué te solicitaron?" value={form.description||""} onChange={v=>setForm({...form,description:v})} as="textarea" rows={3} />
          <Field label="Solicitado por (abogado, juzgado…)" value={form.requestedBy||""} onChange={v=>setForm({...form,requestedBy:v})} />
          <Field label="Fecha de solicitud" type="date" value={form.date||""} onChange={v=>setForm({...form,date:v})} />
          <div style={{display:"flex",justifyContent:"flex-end",gap:8,marginTop:8}}><Btn onClick={closeModal}>Cancelar</Btn><Btn onClick={s.pending} style={{fontWeight:500,color:"var(--color-text-primary)"}}>Guardar</Btn></div>
        </Modal>
      )}
      {modal==="person" && (
        <Modal title={form.id?"Editar persona":"Agregar persona clave"} onClose={closeModal}>
          <Field label="Nombre completo" value={form.name||""} onChange={v=>setForm({...form,name:v})} />
          <Field label="Rol" as="select" value={form.role||"testigo"} onChange={v=>setForm({...form,role:v})} options={PERSON_ROLES.map(r=>({value:r.id,label:r.label}))} />
          <Field label="Teléfono" value={form.phone||""} onChange={v=>setForm({...form,phone:v})} />
          <Field label="Correo electrónico" value={form.email||""} onChange={v=>setForm({...form,email:v})} />
          <Field label="Notas" value={form.notes||""} onChange={v=>setForm({...form,notes:v})} as="textarea" rows={3} />
          <div style={{display:"flex",justifyContent:"flex-end",gap:8,marginTop:8}}><Btn onClick={closeModal}>Cancelar</Btn><Btn onClick={s.person} style={{fontWeight:500,color:"var(--color-text-primary)"}}>Guardar</Btn></div>
        </Modal>
      )}
      {modal==="date" && (
        <Modal title={form.id?"Editar fecha":"Agregar fecha importante"} onClose={closeModal}>
          <Field label="Fecha" type="date" value={form.date||""} onChange={v=>setForm({...form,date:v})} />
          <Field label="Título (audiencia, entrega, visita…)" value={form.title||""} onChange={v=>setForm({...form,title:v})} />
          <Field label="Lugar" value={form.location||""} onChange={v=>setForm({...form,location:v})} />
          <Field label="Notas / instrucciones" value={form.notes||""} onChange={v=>setForm({...form,notes:v})} as="textarea" rows={3} />
          <div style={{display:"flex",justifyContent:"flex-end",gap:8,marginTop:8}}><Btn onClick={closeModal}>Cancelar</Btn><Btn onClick={s.date} style={{fontWeight:500,color:"var(--color-text-primary)"}}>Guardar</Btn></div>
        </Modal>
      )}
      {modal==="parse_text" && (
        <Modal title="Extraer eventos de texto libre con IA" onClose={closeModal}>
          <p style={{fontSize:12,color:"var(--color-text-secondary)",marginTop:0,lineHeight:1.6}}>Pega aquí un correo, conversación de WhatsApp, descripción de hechos o cualquier texto. La IA extraerá los eventos y los agregará al timeline automáticamente.</p>
          <textarea value={parseText} onChange={e=>setParseText(e.target.value)} rows={8} placeholder="Pega el texto aquí…" style={{width:"100%",boxSizing:"border-box",resize:"vertical",fontFamily:"var(--font-sans)"}} />
          <div style={{display:"flex",justifyContent:"flex-end",gap:8,marginTop:8}}><Btn onClick={closeModal}>Cancelar</Btn><Btn onClick={parseWithAI} style={{fontWeight:500,color:"var(--color-text-primary)"}}>{parsing?"Analizando...":"Extraer eventos ↗"}</Btn></div>
        </Modal>
      )}
    </div>
  );
}
