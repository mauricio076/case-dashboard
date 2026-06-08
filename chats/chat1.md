# Sistema Gestión Casos Legales

_Started 2026-06-07 20:58 UTC_

---

## User

<system-info comment="Only acknowledge these if relevant">
Project title is now "Case Dashboard"
Project currently has 1 file(s)
Current date is now June 7, 2026
</system-info>

<attached_files>
- uploads/case_dashboard.tsx
</attached_files>

<pasted_text name="Pasted text (50 lines)">
Diseña un design system y UI para una aplicación web llamada "Expediente" — un dashboard personal para organizar un caso legal (demanda, custodia, denuncia, etc.).

### Usuario objetivo
Ciudadano común que lleva un proceso legal. No es abogado. Necesita:
- Tener sus documentos a la mano (links a Google Drive, iCloud, Dropbox)
- Recordar qué le han pedido y qué ya entregó
- No perder información si cambia de abogado
- Saber qué fechas importantes tiene próximas

### Tono y personalidad
- Confiable y ordenado, pero no frío ni judicial
- Semi-formal: transmite seriedad sin intimidar
- Accesible para personas no técnicas

### Secciones de la app
1. **Resumen** — Vista ejecutiva: descripción del caso, métricas, pendientes urgentes, próxima fecha
2. **Pendientes** — Lista de lo que han solicitado (abogado, juzgado). Checkbox para marcar completado. Badge con conteo de pendientes sin resolver.
3. **Fechas importantes** — Audiencias, entregas, visitas. Alerta de próxima fecha en el header.
4. **Timeline** — Eventos cronológicos del caso con tipos: Legal, Financiero, Comunicación, Evidencia, Testimonio, Otro. Cada evento puede tener documentos vinculados.
5. **Documentos** — Repositorio de links a archivos en la nube (Google Drive, iCloud, Dropbox, disco local). Con etiquetas y búsqueda.
6. **Personas clave** — Testigos, peritos, funcionarios, familiares. Con datos de contacto y notas.
7. **Notas y testimonios** — Texto libre: descripciones de hechos, testimonios no oficiales, correos relevantes.
8. **Casos relacionados** — Otras carpetas o expedientes vinculados, con tipo de relación (derivado de, paralelo a, precede a, etc.)

### Design system requerido
- Paleta semántica por tipo de evento (no decorativa):
  - Legal → púrpura
  - Financiero → ámbar
  - Comunicación → azul
  - Evidencia → verde/teal
  - Testimonio → coral
  - Otro → gris
  - Pendiente sin completar → rojo
  - Completado → verde
- Tipografía: sans-serif moderna, legible en móvil y desktop
- Componentes: Badge, Card, Tab, ActionButton (editar/borrar), Modal, Field, SectionHeader
- Barra de búsqueda global siempre visible
- Dropdown de resultados con fondo sólido (no transparente)
- Botones de acción (editar/borrar) con fondo y borde visibles — nunca invisible sobre fondo blanco

### Plataforma objetivo
- Web responsive (mobile-first)
- Deployment en Cloudflare Workers + D1 (SQLite)
- Autenticación simple (un usuario o grupo familiar reducido)

### Entregables esperados
- Tokens de color, tipografía y espaciado
- Componentes base en Figma
- Variantes light/dark
- Especificaciones para handover a desarrollo
</pasted_text>

<!-- The user explicitly selected the following skills for this project, as attachments to their message. These are not optional context — they define how you work. Use them. -->
<attached-skill name="Hi-fi design">
Create a high-fidelity, polished design.

Follow this general design process (use the todo list to remember):
(1) ask questions, (2) find existing UI kits and collect design context — copy ALL relevant components and read ALL relevant examples; ask the user if you can't find them, (3) start your file with assumptions + context + design reasoning (as if you are a junior designer and the user is your manager), with placeholders for the designs, and show it to the user early, (4) build out the designs and show the user again ASAP; append some next steps, (5) use your tools to check, verify and iterate on the design.

Good hi-fi designs do not start from scratch — they are rooted in existing design context. Ask the user to Import their codebase, or find a suitable UI kit / design resources, or ask for screenshots of existing UI. You MUST spend time trying to acquire design context, including components. If you cannot find them, ask the user for them. In the Import menu, they can link a local codebase, provide screenshots or Figma links; they can also link another project. Mocking a full product from scratch is a LAST RESORT and will lead to poor design. If stuck, try listing design assets and ls'ing design system files — be proactive! Some designs may need multiple design systems — get them all. Use the starter components (device frames and the like) to get high-quality scaffolding for free.

When presenting several options or explorations side-by-side, lay them out clearly: give the page a neutral gray background, put each option in its own labeled frame (a small heading + a white rounded card sized to its content), and group related options into sections.

When designing, asking many good questions is ESSENTIAL.

Give options: try to give 3+ variations across several dimensions. Mix by-the-book designs that match existing patterns with new and novel interactions, including interesting layouts, metaphors, and visual styles. Have some options that use color or advanced CSS; some with iconography and some without. Start your variations basic and get more advanced and creative as you go! Try remixing the brand assets and visual DNA in interesting ways — play with scale, fills, texture, visual rhythm, layering, novel layouts, type treatments. The goal is not the perfect option; it's exploring atomic variations the user can mix and match.

CSS, HTML, JS and SVG are amazing. Users often don't know what they can do. Surprise the user.

If you do not have an icon, asset or component, draw a placeholder: in hi-fi design, a placeholder is better than a bad attempt at the real thing.
</attached-skill>

<attached-skill name="Interactive prototype">
Create a fully interactive prototype with realistic state management and transitions. Use React useState/useEffect for dynamic behavior. Include hover states, click interactions, form validation, animated transitions, and multi-step navigation flows. It should feel like a real working app, not a static mockup.
</attached-skill>

<attached-skill name="QS Studio Design System (design system)">
[Design System] This project uses the **QS Studio Design System** design system. This is a binding choice for visual style — every visual must follow it. Don't invent colors, type, spacing, or components not grounded here.

Scope: the design system is a visual style reference only. Its guide may describe example products, brands, or people that are unrelated to the user and unrelated to the subject of this conversation. Never treat anything in the design system as a fact about the user, their work, or the topic they asked about.

    Explore it to find what you need:
    - Always copy out the fonts and colors you need
    - For prototypes and designs, always copy out any relevant components
    - If the design system contains existing mocks of products, and you were asked to design or prototype something similar, copy and fork those mocks to start your design. This helps you make high-quality designs.

    Explore it quickly to find relevant UI kits (e.g. mocks of existing products you can copy and fork)

Full system at `/projects/019df80c-4bcb-7845-a4cb-8d285d9eaf2a/`. Its guide is reproduced below so you don't need to fetch it:

<design-system-guide>
# QS Studio — Design System

&gt; A two-spouse software studio in Bergen, Norway with Mexican DNA.
&gt; Software engineering ("Q") + project management, technology integration &amp; PR ("S").
&gt; Creators of **Junto**, the travel companion that anticipates.

This system speaks for two sibling brands that share a single visual canvas:

| Brand        | Role                              | Voice              | Wordmark face     | Accent           |
|--------------|-----------------------------------|--------------------|--------------------|------------------|
| **QS Studio** | Parent studio — consulting, B2B, app creation | Modernist, restrained | Barlow Condensed 700/400, between two monoline rules | Lavender-grey `#B4B2BC` |
| **Junto**     | Flagship product — a travel companion that anticipates | Soft, humanist, warm | Fraunces 600 SOFT 30, lowercase, with terracotta tittle on the j | Terracotta `#D27653` |

Both ride on the same warm-black canvas (`#1F1F1E`) and a paper cream
(`#F3F1EC` / `#F7F7F6`). The studio sits behind the curtain; the product
gets the warmth.

---

## Sources

| What | Where |
|------|-------|
| Brand reference (Fraunces / Barlow Condensed lockups, two QS variants) | `assets/brand/junto-qs-studio-reference.png` (provided by user) |
| Verbal brief (excerpt) | "No pretentious, serious but willing to experiment. Consulting + App Creation + B2B. Reference first before cold outreach. Start under the radar but make the right choices from day 1 to allow us to scale." |
| Product tagline | "Junto, the travel companion that anticipates." |

No codebase or Figma file was provided yet, so the UI kits in this system are
the studio's *first hi-fi pass* — designed against the brief and the wordmark
reference. They are intended as a starting point to iterate against the real
product surfaces once those exist.

---

## Index — what's in this folder

```
README.md                       ← you are here (brand bible)
SKILL.md                        ← agent-skill manifest (Claude Code-compatible)
colors_and_type.css             ← all design tokens as CSS vars + semantic styles
fonts/                          ← font notes (Google Fonts CDN; flagged substitutions)
assets/
  brand/
    junto-qs-studio-reference.png   ← original lockup reference
    qs-studio-lockup.svg            ← QS Studio wordmark, current
    qs-studio-lockup-tittle.svg     ← QS Studio variant 1 (lowercase i with dot)
    qs-studio-lockup-titlecase.svg  ← QS Studio variant 2 (Title case)
    junto-wordmark.svg              ← Junto wordmark
    junto-mark-dot.svg              ← Junto's standalone "dot" mark
ui_kits/
  qs-studio-site/         ← the studio's marketing site (interactive)
  junto-app/              ← the Junto product (interactive)
preview/                        ← preview cards rendered in the Design System tab
```

A short manifest also lives at the bottom of this README.

---

## Content fundamentals

The two brands share a tone but diverge on register.

### Voice — shared

- **Plain, never pretentious.** No "We are a digital innovation partner." Say
  what you do: "We build software. And we use it before we ship it."
- **Lowercase by default**, in body and headlines. Reserve Title Case for
  proper nouns and the QS Studio lockup itself. Never SHOUTY CAPS in body.
- **"We", not "I"**, even when one of the two is writing. The studio is two
  people; the voice is plural. Speak *to* readers as **"you"** — direct, not
  marketing-broadcast.
- **Concrete over abstract.** "Six months from idea to App Store" beats
  "Rapid prototyping methodology."
- **Bilingual by nature, monolingual by sentence.** Mexican DNA shows in
  small details (a *con cariño* in a footer, *abrazo* on a thank-you page) —
  never in mid-sentence code-switching. Norwegian shows up the same way.
- **No emoji in product or marketing copy.** The brand does not need them
  to be warm; the type does the warmth. (One quiet exception: a single
  rotating glyph in the email signature is fine.)
- **Reference first, cold outreach last.** Copy on the contact page should
  invite *introductions*, not form-fills.

### Casing &amp; punctuation

- Sentence case for headlines, buttons, nav, CTAs. **"Read the case study"**, not "Read The Case Study".
- En dash (`–`) for ranges, em dash (`—`) with thin spaces for clauses, never the hyphen-minus.
- Norwegian quotation marks `«…»` are acceptable in editorial pieces; otherwise straight curly quotes `"…"`.
- Numbers under 10 spelled out in body, numerals in UI / data.

### Vibe

Imagine a small atelier window in Bergen on a wet October evening: warm
light, restrained typography, one terracotta object on the table. Quiet
confidence. **No exclamation marks.** No urgency. No FOMO copy.

### Examples

| ✅ On-brand | ❌ Off-brand |
|------------|-------------|
| "We build software, and use it before we ship it." | "🚀 We're a passionate team of innovators!" |
| "Junto, the travel companion that anticipates." | "Junto: AI-powered travel for the modern explorer ✈️" |
| "Tell us a friend's name. We'll start there." | "Sign up now to unlock exclusive features!" |
| "From Bergen, with Mexican DNA." | "A globally-minded, full-stack solutions provider." |
| "We took six months. We're glad we did." | "Lightning-fast turnaround guaranteed!" |

---

## Visual foundations

### Surfaces &amp; background

- **Two cream tones, one ink.** Junto sits on `--paper-junto` (`#F3F1EC`).
  QS Studio sits on `--paper-qs` (`#F7F7F6`). Inverted moments use the
  warm-black canvas `--ink-1000` (`#1F1F1E`).
- **No gradients on hero surfaces.** Flat fills only. The one gradient we
  allow is a faint *protection gradient* under fixed top bars on inverted
  pages, ~40px tall, `rgba(31,31,30, 0.85) → 0`.
- **Backgrounds are paper, not glass.** No backdrop-blur; no glassmorphism.
- **No repeating patterns or textures** at launch. The cream itself is the
  texture. (We may, later, introduce one *very* faint Mexican papel-picado
  silhouette as a single section break — flagged for future exploration.)
- **Imagery vibe:** warm, slightly desaturated, often grainy 35mm. Never
  cool-blue stock. When in doubt, lean Wes Anderson over Apple-clean. For
  Junto specifically: travel photography with people *in* it, mid-action,
  not posed landscapes.

### Color use

- **One accent at a time.** Pages use either Junto-terracotta *or*
  QS-lavender, rarely both. The shared studio voice (footers, legal,
  cross-brand pages) uses neither — only ink and rules.
- **Terracotta is small and precious.** One per screen: a dot, a single
  underline, one button. Never a terracotta hero band.
- **Lavender carries a lot more area** because it's a near-neutral.
- **Pine** (`--pine-500`) is the supportive color for "positive / success"
  signals; we never use a generic Bootstrap green.

### Typography rules

- **Fraunces** at SOFT 30, opsz 30, weight 600 for hero / display moments.
  Lowercase headlines preferred. Optical-size matters — never use opsz 9
  for big sizes.
- **Barlow Condensed** at 400/700 for the QS lockup specifically, and for
  eyebrows / labels in caps with `letter-spacing: 0.18em`.
- **Inter** carries body and UI. We considered Söhne/Untitled — both better
  fits long-term, flagged as a future swap once licensed.
- **JetBrains Mono** for code only.
- **Numbers always tabular** in tables and data UIs (`font-variant-numeric: tabular-nums`).

### Borders, rules, and hairlines

- The QS lockup taught us: **a single hairline rule above and below**, the
  full width of an element, is one of our best devices. Use it as a
  section break, around eyebrows in headers, around metadata on cards.
- Hairlines are `1px solid rgba(28, 43, 43, 0.18)` on cream, or
  `rgba(243, 241, 236, 0.18)` on ink.
- **Rule, then space.** Always at least 24px of breathing room between a
  rule and the next text element.

### Corner radii

- **Cards:** 14–20px (`--radius-lg` / `--radius-xl`). Generous, paper-like.
- **Inputs / chips:** 4px (`--radius-sm`). Crisp.
- **Pills (status chips, tags):** fully rounded.
- **Images:** 8px on small thumbnails, square or 14px on large hero images.
- **Buttons:** 999px (pill) on Junto-leaning surfaces; 6px on QS-leaning.

### Shadow / elevation

- **Matte system.** No big drop-shadows.
- Elevation 1: a single hairline (`--shadow-hairline`) — this is the
  default for all cards.
- Elevation 2: a 1px shadow + hairline — interactive cards on hover.
- Elevation 3: 20px soft shadow at -20px y-offset, 25% alpha, *only* for
  modal dialogs and floating menus.
- We do **not** use inner shadows except inside form inputs (a 1px dark
  hairline at top to suggest a slight inset).

### Hover &amp; press

- **Hover = darken accent + 1px raise.** Buttons go from `--accent` to
  `--accent-hover` in 220ms ease-out, and translate `-1px` on Y.
- **Press = `--accent-press` + scale(0.985).** Returns to rest in 120ms.
- Cards: hover lifts the hairline to `--rule-strong` and adds elevation 2.
- Links: hover thickens the underline color from accent to accent-hover.
  Never change the *text* color on hover; only the underline.
- **Focus state is the same hairline, but at 2px and in `--accent`.**

### Animation

- **Easing:** `cubic-bezier(0.22, 1, 0.36, 1)` for almost everything (out-quad).
- **Durations:** 120ms (fast/press), 220ms (default), 480ms (entrance).
- **No bounces** in product UI. Reserve `--ease-spring` for one place: the
  Junto "anticipate" loading dot, which softly springs.
- **Page transitions:** crossfade + 8px upward slide on the new page, no
  parallax.
- **Reduced-motion:** every transition has a `prefers-reduced-motion`
  fallback that drops to instant.

### Layout rules

- **Desktop grid:** 12-col, 80px outer gutter, 24px inner gutter. Max line
  length on body copy: 64ch.
- **Mobile grid:** 4-col, 20px outer gutter, 16px inner gutter.
- **Fixed elements:** the top nav is fixed and 64px tall on desktop, 56px
  on mobile. It always carries a 1px hairline at the bottom — *never* a
  shadow. On dark pages, the nav sits over a 40px protection gradient.
- **Footer** is full-bleed ink (`--ink-1000`) with cream type. Always.

### Transparency &amp; blur

- **Avoid both,** with two exceptions:
  - The protection gradient under fixed nav (above).
  - Disabled states use 0.45 opacity. (Never gray-out; always dim.)
- No `backdrop-filter: blur`. The brand is paper; paper isn't translucent.

### Cards — the canonical pattern

Used dozens of times in the system. The recipe:

```
background:    var(--paper-qs)  /* or --bg-elevated #FFF on dark pages */
border:        1px solid var(--rule)
border-radius: var(--radius-lg)   /* 14px */
padding:       24px
shadow:        none at rest, --shadow-md on hover
```

A card never has a *colored left border*. (We've all seen that pattern. It's
not us.) A card never has a header bar in a different fill. The only
internal divider is a hairline `--rule`.

---

## Iconography

- **Library:** [Lucide](https://lucide.dev), 1.75px stroke, 20×20 default.
  We chose Lucide for its quiet humanist line — closer to the Fraunces/
  Inter pairing than Heroicons (which feels too clean) or Tabler (too
  geometric).
- Loaded from CDN in our prototypes:
  `&lt;script src="https://unpkg.com/lucide@latest"&gt;&lt;/script&gt;`
  See `ui_kits/qs-studio-site/index.html` for the include.
- **Substitution flag:** Lucide is a stand-in until QS commissions a small
  custom icon family. The 12 icons we use most often (`arrow-right`,
  `arrow-up-right`, `compass`, `map-pin`, `clock`, `bookmark`, `user`,
  `mail`, `globe`, `chevron-down`, `plus`, `x`) are good candidates for
  the eventual custom set.
- **No PNG icons.** SVG only. Color via `currentColor`.
- **No emoji** in product UI.
- **Unicode glyphs** as decoration: only `→`, `·`, `—`, `«…»` (Norwegian
  quotes), and `°` (used in Junto's weather chips). Nothing else.
- **Logos** live in `assets/brand/` as inline SVG; never raster.

---

## Fonts

**Inter** and **JetBrains Mono** are self-hosted from `fonts/` (variable
fonts, both axes available). **Fraunces** and **Barlow Condensed** still
come from Google Fonts CDN — drop their `.ttf` files into `fonts/` and add
`@font-face` rules to `colors_and_type.css` to self-host them too. See
`fonts/README.md` for production conversion notes.

---

## Manifest (TL;DR)

- **Tokens →** `colors_and_type.css`
- **Brand assets →** `assets/brand/`
- **Logos →** `assets/brand/qs-studio-lockup*.svg`, `assets/brand/junto-*.svg`
- **UI kits →** `ui_kits/qs-studio-site/`, `ui_kits/junto-app/`
- **Preview cards (rendered in Design System tab) →** `preview/`
- **Skill manifest →** `SKILL.md`

</design-system-guide>

CSS tokens: the guide may describe tokens in prose, but the exact `--*` names are defined in the design system's stylesheet(s) (`/projects/019df80c-4bcb-7845-a4cb-8d285d9eaf2a/colors_and_type.css`, `/projects/019df80c-4bcb-7845-a4cb-8d285d9eaf2a/ui_kits/junto-app/junto.css`, `/projects/019df80c-4bcb-7845-a4cb-8d285d9eaf2a/ui_kits/qs-studio-site/site.css`). The 112 custom properties it defines are:

--accent, --accent-hover, --accent-press, --accent-soft, --bg, --bg-elevated, --bg-ink, --bg-inset, --dur-base, --dur-fast, --dur-slow, --ease-in-out, --ease-out, --ease-spring, --eyebrow-tracking, --eyebrow-weight, --fg, --fg-1, --fg-2, --fg-3, --fg-on-ink, --fg-on-ink-1, --fg-on-ink-2, --fg-on-ink-3, --font-display, --font-lockup, --font-mono, --font-sans, --fraunces-soft, --ink-1000, --ink-500, --ink-600, --ink-700, --ink-800, --ink-900, --lavender-100, --lavender-200, --lavender-400, --lavender-500, --lavender-600, --lavender-700, --lh-loose, --lh-normal, --lh-snug, --lh-tight, --lk-size, --ls-eyebrow, --ls-normal, --ls-tight, --ls-tightest, --ls-wide, --ls-wider, --paper-100, --paper-200, --paper-300, --paper-50, --paper-junto, --paper-qs, --pine-300, --pine-500, --pine-700, --radius-2xl, --radius-lg, --radius-md, --radius-pill, --radius-sm, --radius-xl, --radius-xs, --rule, --rule-on-ink, --rule-strong, --shadow-hairline, --shadow-inset, --shadow-lg, --shadow-md, --shadow-sm, --signal-info, --signal-negative, --signal-positive, --signal-warn, --space-0, --space-1, --space-10, --space-2, --space-3, --space-4, --space-5, --space-6, --space-7, --space-8, --space-9, --surface-card, --t-body, --t-body-lg, --t-body-sm, --t-caption, --t-display-lg, --t-display-md, --t-display-sm, --t-display-xl, --t-eyebrow, --t-h1, --t-h2, --t-h3, --t-h4, --terracotta-100, --terracotta-300, --terracotta-400, --terracotta-50, --terracotta-500, --terracotta-600, --terracotta-700

Only use `var(--*)` names from that list. Never guess a token name — an unresolved `var()` silently falls back to the browser default.

For assets and UI kits beyond the guide: `read_file("/projects/019df80c-4bcb-7845-a4cb-8d285d9eaf2a/<path>")` and `copy_files` to bring them into the current project.
</attached-skill>

## Assistant

_[tool: read_file]_

_[tool: read_file]_

_[tool: questions_v2]_

## User

Questions answered:
- output_type: Prototipo interactivo completo (todas las secciones funcionando)
- mode: Light mode (crema/papel — la base del QS DS)
- priority_section: timeline, y documentos
- layout_style: 0
- variation_count: 3 — distintos enfoques de layout/color
- color_application: Solo en badges y etiquetas — UI neutro
- header_style: Minimalista — solo el nombre del caso y número de expediente
- typography_feel: Funcional y limpio — Inter para todo, Fraunces solo para el título del caso
- case_type: Hazlo genérico con datos mínimos
- extras: Esto es para mexico asi que en espanol. debe ser capaz de manejar y organizar toda la informacion, fuentes y tipos de forma minimalista y simple, es un lugar para tener todo accessible (indexado)

## Assistant

_[tool: update_todos]_

_[tool: copy_starter_component]_

Entendido. Voy a construir el prototipo completo ahora.

_[tool: write_file]_

_[tool: update_todos]_

_[tool: write_file]_

Voy a escribir todos los archivos restantes ahora.

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: update_todos]_

_[tool: done]_

_[tool: save_screenshot]_

_[tool: show_html]_

_[tool: show_html]_

_[tool: multi_screenshot]_

Se ve muy bien. La app está cargando correctamente. Voy a verificar a fondo y capturar más secciones.

_[tool: get_webview_logs]_

Funciona bien. Los íconos no están cargando — voy a corregir la URL del CDN de Tabler Icons.

_[tool: str_replace_edit]_

Sin errores de consola — el problema es la URL del CDN. Voy a actualizar a una versión específica y confiable.

_[tool: show_html]_

_[tool: update_todos]_

Los íconos siguen sin cargar — el font CDN no está disponible en el sandbox. Voy a migrar a Lucide (recomendado por el DS) que usa SVG y no depende de font files.

_[tool: str_replace_edit]_

Voy a actualizar los 4 archivos para usar Lucide SVG. Escribiendo todo en paralelo.

_[tool: write_file]_

Ahora reescribo los tres JSX para usar `Icon` con Lucide en todo el código.

_[tool: write_file]_

_[tool: write_file]_

_[tool: done]_

_[tool: show_html]_

_[tool: multi_screenshot]_

¡Los íconos funcionan perfectamente! Voy a verificar las secciones prioritarias (Timeline y Documentos) y los 3 temas.

_[tool: update_todos]_

Perfecto — íconos funcionando en todas las secciones. Timeline con dots de colores, filtros por tipo, documentos vinculados; Documentos con source icons y tags; Pendientes con estados. Voy a lanzar el verificador final.

_[tool: fork_verifier_agent]_

**Expediente** está listo. Aquí un resumen de lo que tiene:

---

**8 secciones completamente funcionales:**
- **Resumen** — métricas clickeables, próxima fecha, pendientes urgentes, eventos recientes
- **Pendientes** — checkboxes con estado, badge de conteo en sidebar
- **Fechas** — ordenadas, badge "Próxima" en la siguiente cita
- **Timeline** — filtros por tipo de evento, dots de color semántico, vinculación de documentos inline
- **Documentos** — búsqueda por nombre/etiqueta, filtro por fuente (Drive, iCloud, Dropbox…)
- **Personas clave** — badges por rol, email clickeable
- **Notas y testimonios** — texto libre, clasificadas por tipo
- **Casos relacionados** — con tipo de relación

**Sistema de diseño aplicado:**
- Tokens QS Studio (Fraunces en el título del caso, Inter en todo lo demás, JetBrains Mono para fechas/folios)
- Colores semánticos **sólo en badges** — paleta neutral en todo lo demás
- Íconos Lucide SVG (sin dependencia de font files)
- 3 temas visuales vía panel Tweaks: **Papel** · **Tinta** · **Lavanda**

**Todo persiste en localStorage.** El botón ↓ exporta JSON completo del expediente.

**Próximos pasos sugeridos:**
- Conectar a Cloudflare D1 (el modelo de datos ya está definido y es serializable)
- Añadir autenticación con Cloudflare Access
- Integrar el parser de texto con Claude API (ya hay un placeholder para ello)

## User

Agreagar la fecha del evento mas antiguo

## Assistant

_[tool: read_file]_

_[tool: grep]_

_[tool: str_replace_edit]_

_[tool: done]_

Listo. El subtítulo del Timeline ahora muestra la fecha del evento más antiguo y el conteo total, por ejemplo: **"Desde 2024-01-15 · 4 eventos"** — se actualiza automáticamente cuando se agregan o eliminan eventos.

