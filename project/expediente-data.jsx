// expediente-data.jsx — Constants, seed data, themes, localStorage helpers
// Exports everything to window for use by other Babel scripts

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
  { id:"google_drive", label:"Google Drive",  icon:"ti-brand-google-drive" },
  { id:"icloud",       label:"iCloud",        icon:"ti-cloud"              },
  { id:"dropbox",      label:"Dropbox",       icon:"ti-brand-dropbox"      },
  { id:"local",        label:"Disco local",   icon:"ti-device-laptop"      },
  { id:"other",        label:"Otro enlace",   icon:"ti-link"               },
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

// Three visual themes — applied as CSS custom property overrides on the app root
const THEMES = {
  papel: {
    "--sidebar-bg":        "#F7F7F6",
    "--sidebar-fg":        "#6E7676",
    "--sidebar-active-bg": "#FFFFFF",
    "--sidebar-active-fg": "#1C2B2B",
    "--sidebar-accent":    "#D27653",
    "--sidebar-border":    "rgba(28,43,43,0.12)",
    "--content-bg":        "#F3F1EC",
    "--card-bg":           "#FFFFFF",
    "--card-border":       "rgba(28,43,43,0.12)",
  },
  tinta: {
    "--sidebar-bg":        "#1F1F1E",
    "--sidebar-fg":        "rgba(243,241,236,0.58)",
    "--sidebar-active-bg": "rgba(255,255,255,0.09)",
    "--sidebar-active-fg": "#F3F1EC",
    "--sidebar-accent":    "#D27653",
    "--sidebar-border":    "rgba(243,241,236,0.12)",
    "--content-bg":        "#F3F1EC",
    "--card-bg":           "#FFFFFF",
    "--card-border":       "rgba(28,43,43,0.12)",
  },
  lavanda: {
    "--sidebar-bg":        "#ECEBEF",
    "--sidebar-fg":        "#6E7676",
    "--sidebar-active-bg": "#FFFFFF",
    "--sidebar-active-fg": "#1C2B2B",
    "--sidebar-accent":    "#6E6E78",
    "--sidebar-border":    "rgba(28,43,43,0.10)",
    "--content-bg":        "#F7F7F6",
    "--card-bg":           "#F3F1EC",
    "--card-border":       "rgba(28,43,43,0.10)",
  },
};

const SEED = {
  caseInfo: {
    title:    "Demanda de alimentos",
    folderNo: "FAM-2024-0041",
    court:    "Juzgado 5to Familiar, CDMX",
    status:   "En proceso",
    opponent: "",
    notes:    "Proceso para establecer pensión alimenticia. Se busca garantizar la manutención de los menores conforme a la ley familiar vigente.",
  },
  events: [
    { id:"e1", date:"2024-01-15", type:"comms",    title:"Carta notarial de solicitud",        description:"Envío de carta notarial solicitando acuerdo voluntario de pensión.", attachedDocs:[] },
    { id:"e2", date:"2024-02-20", type:"legal",    title:"Presentación de demanda",            description:"Radicación oficial del expediente ante el juzgado familiar.", attachedDocs:["d1"] },
    { id:"e3", date:"2024-04-10", type:"evidence", title:"Entrega de documentos probatorios",  description:"Actas de nacimiento y comprobantes de gastos escolares.", attachedDocs:["d2","d3"] },
    { id:"e4", date:"2024-06-05", type:"legal",    title:"Audiencia de conciliación",          description:"Primera audiencia. No se llegó a acuerdo.", attachedDocs:[] },
  ],
  documents: [
    { id:"d1", name:"Demanda inicial.pdf",                  type:"google_drive", url:"https://drive.google.com", tags:["legal","principal"],  dateAdded:"2024-02-20" },
    { id:"d2", name:"Actas de nacimiento (menores).pdf",    type:"icloud",       url:"",                        tags:["identificación"],      dateAdded:"2024-04-10" },
    { id:"d3", name:"Comprobantes gastos escolares.pdf",    type:"google_drive", url:"",                        tags:["gastos","educación"],  dateAdded:"2024-04-10" },
  ],
  notes: [
    { id:"n1", date:"2024-03-12", author:"Titular", type:"testimony", title:"Testimonio de testigo directo",  content:"Persona presente durante hechos clave. Dispuesta a declarar ante el juzgado." },
    { id:"n2", date:"2024-05-01", author:"Titular", type:"other",     title:"Descripción de hechos",          content:"Cronología de los eventos desde el inicio del conflicto. Incluye incumplimientos sistemáticos." },
  ],
  relatedCases: [
    { id:"r1", type:"denuncia", relation:"paralelo_a", number:"DEN-2024-012", authority:"Ministerio Público", status:"Abierto", description:"Denuncia por incumplimiento de obligaciones alimentarias.", dateOpened:"2024-03-01" },
  ],
  pendingRequests: [
    { id:"p1", requestedBy:"Abogado", date:"2024-06-10", description:"Estados de cuenta bancarios (últimos 6 meses)",  done:false },
    { id:"p2", requestedBy:"Juzgado", date:"2024-06-15", description:"Comprobante de domicilio actual",                done:false },
    { id:"p3", requestedBy:"Abogado", date:"2024-05-20", description:"Actas de nacimiento de los menores",             done:true  },
  ],
  people: [
    { id:"pe1", role:"testigo",     name:"Testigo directo",      phone:"55 0000 0000", email:"",                       notes:"Presente durante los hechos principales." },
    { id:"pe2", role:"funcionario", name:"Lic. Secretario",      phone:"",            email:"contacto@juzgado.gob.mx", notes:"Secretario asignado al expediente." },
  ],
  upcomingDates: [
    { id:"ud1", date:"2026-08-05", title:"Audiencia de pruebas",          location:"Juzgado 5to Familiar, Sala 3", notes:"Llevar originales y copias certificadas." },
    { id:"ud2", date:"2026-09-20", title:"Plazo para presentar alegatos",  location:"Juzgado 5to Familiar",        notes:"Fecha límite improrrogable." },
  ],
};

const LS_KEY = "expediente_v1";

function loadData() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : SEED;
  } catch { return SEED; }
}

function saveData(d) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(d)); } catch {}
}

Object.assign(window, {
  COLORS, EVENT_TYPES, DOC_TYPES, RELATED_TYPES, RELATION_TYPES,
  PERSON_ROLES, THEMES, SEED, loadData, saveData,
});
