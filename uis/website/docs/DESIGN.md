# DESIGN.md — Nexova Design System & Architecture Specification

## 1. Project Overview & Multi-Device Scope
- **Company:** Nexova
- **Industry:** Human Resources, Executive Recruitment, and Talent Acquisition
- **Founded:** 2011
- **Headquarters:** Valencia, Spain (Calle Colón 28, 46004)
- **International Hub:** Miami, Florida, USA (801 Brickell Ave, Suite 900, FL 33131)
- **Employees:** ~120 | **Annual Revenue:** ~$8M
- **Target Clients:** Mid-sized companies in Technology, Retail, and Financial Services.
- **Core Purpose:** Deliver a high-conversion, accessible, responsive B2B corporate portal comprising the Corporate Landing Page (`index.html`), the Candidate Talent Registration Form (`application.html`), and interactive client-side validation (`validation.js`), natively supporting both **Desktop (1440px / 1200px container)** and **Mobile (375px–390px fluid)** form factors.

---

## 2. Design Principles & Audience Separation
1. **Credibility & Authority (B2B Precision):** Refined, established executive atmosphere. Generous whitespace, clean geometric layouts, clear typographic hierarchy, avoiding whimsical micro-trends or playful cartoon elements.
2. **Dual-Audience Journey Separation:** Strictly isolate the Business Decision-Maker path (Inquiries & Corporate Services -> `contacto@nexova.com`) from the Professional Talent path (Candidates -> `application.html`).
3. **Inclusive Accessibility First (WCAG 2.2 AA):** Minimum 4.5:1 contrast for normal text, 3:1 for large text and UI components. Visual indicators beyond color alone for errors (icons + live announcements). High-visibility focus rings (`focus-visible:ring-2 focus-visible:ring-[#087F78]`).
4. **Resilient Fluid Architecture:** Systematic layout scaling across Mobile (375px), Tablet (768px), and Desktop (1200px–1440px) engineered with standard Tailwind CSS utility tokens.

---

## 3. Brand Identity & Color Tokens

### 3.1 Color Palette & Semantic Tokens
| Token Name | HEX Code | CSS Custom Property | Semantic Role | WCAG Contrast (on #FFF) |
|---|---|---|---|---|
| `color-primary` | `#17324D` | `--color-primary` | Primary headers, brand anchors, navigation chrome | 11.8:1 (AAA) |
| `color-primary-hover`| `#244966` | `--color-primary-hover`| Interactive hover states for primary dark elements | 8.6:1 (AAA) |
| `color-accent` | `#087F78` | `--color-accent` | Primary CTAs, active badges, key highlights | 4.6:1 (AA) |
| `color-accent-hover`| `#066560` | `--color-accent-hover`| Interactive button hover & focused states | 5.8:1 (AA) |
| `color-bg` | `#FFFFFF` | `--color-bg` | Main canvas, card bodies, dropdown surfaces | Baseline |
| `color-surface` | `#F5F8FA` | `--color-surface` | Section alternations, input fills, subtle tiles | 1.1:1 (Structural) |
| `color-text-primary`| `#17212B` | `--color-text-primary` | Headings, body copy, form labels | 14.5:1 (AAA) |
| `color-text-secondary`| `#536473` | `--color-text-secondary`| Subtitles, helper text, metadata | 5.4:1 (AA) |
| `color-border` | `#D5DFE6` | `--color-border` | Input borders, dividers, subtle outlines | 1.4:1 (3.2:1 against surface) |
| `color-border-focus`| `#087F78` | `--color-border-focus`| Active input focus borders & outlines | 4.6:1 (AA) |
| `color-error` | `#B42318` | `--color-error` | Validation error text, error icons, alerts | 5.2:1 (AA) |
| `color-error-bg` | `#FEF3F2` | `--color-error-bg` | Error badge and alert container backgrounds | 1.1:1 (Structural) |
| `color-success` | `#067647` | `--color-success` | Success badges, checkmark icons, confirmations| 5.1:1 (AA) |
| `color-success-bg`| `#EDFDF5` | `--color-success-bg`| Successful input validation & banner backgrounds| 1.1:1 (Structural) |

---

## 4. Typography System
Font family: `Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`

| Scale Role | Font Size (Desktop) | Font Size (Mobile) | Line Height | Font Weight | Tailwind Class |
|---|---|---|---|---|---|
| **Display / Hero H1** | 44px (2.75rem) | 32px (2rem) | 1.15 | 800 (Extrabold) | `text-3xl md:text-5xl font-extrabold tracking-tight` |
| **Section Title H2** | 32px (2.0rem) | 26px (1.625rem) | 1.25 | 700 (Bold) | `text-2xl md:text-3xl font-bold tracking-tight` |
| **Card / Subhead H3** | 20px (1.25rem) | 18px (1.125rem) | 1.35 | 600 (Semibold) | `text-lg md:text-xl font-semibold` |
| **Body Large (Intro)**| 18px (1.125rem) | 16px (1rem) | 1.55 | 400 (Regular) | `text-base md:text-lg` |
| **Body Regular** | 16px (1.0rem) | 15px (0.9375rem) | 1.6 | 400 (Regular) | `text-sm md:text-base` |
| **Body Small / Meta** | 14px (0.875rem) | 13px (0.8125rem) | 1.5 | 400 / 500 | `text-xs md:text-sm` |
| **Form Label** | 14px (0.875rem) | 14px (0.875rem) | 1.4 | 600 (Semibold) | `text-sm font-semibold text-[#17212B]` |
| **Form Helper / Error**| 12px (0.75rem) | 12px (0.75rem) | 1.4 | 500 (Medium) | `text-xs font-medium` |
| **Button Text** | 15px (0.9375rem) | 15px (0.9375rem) | 1.0 | 600 (Semibold) | `text-sm md:text-base font-semibold` |

---

## 5. Spacing, Grid & Multi-Viewport Layout Structure
- **Base Rhythm:** 8px systematic spacing (`4px, 8px, 16px, 24px, 32px, 48px, 64px, 80px`).
- **Container Architecture:**
  - **Desktop (1440px viewport):** Centered container `max-w-7xl` (1280px) or `max-w-6xl` (1152px) with `px-8 mx-auto`.
  - **Form Container (Desktop):** Centered card container `max-w-4xl` (896px) or `max-w-3xl` (768px) with two-column responsive form groupings (`grid grid-cols-1 md:grid-cols-2 gap-6`).
  - **Mobile (375px–390px):** Single-column stacked layout with `px-4 sm:px-6`.
- **Desktop Navigation:**
  - Horizontal top navigation bar with brand wordmark, primary links (*Inicio, Servicios, Talento, Contacto*), and high-contrast CTA button *"Únete al talento"*.
- **Mobile Navigation:**
  - Sticky top bar with quick actions, hamburger menu drawer, and optional bottom tab navigation bar for immediate fingertip access.

---

## 6. Page Specifications & Responsive Behaviors

### 6.1 Corporate Landing Page (`index.html`)
1. **Header & Navigation:**
   - Desktop: Persistent top bar, links with active indicator (`border-b-2 border-[#087F78]`), direct telephone links.
   - Mobile: Collapsible accessible drawer with `aria-expanded` and clear touch targets (≥ 44px).
2. **Hero Section:**
   - Exact Headline: *"Construimos equipos excepcionales para empresas en crecimiento"*
   - Exact Subtitle: *"Consultora de recursos humanos y adquisición de talento con más de 10 años ayudando a empresas de tecnología, retail y servicios financieros a encontrar y desarrollar el mejor talento."*
   - Desktop: Two-column layout with left copy/CTAs and right high-fidelity corporate photography with guarantee badge overlay.
   - Mobile: Vertically stacked layout prioritizing primary CTA above the fold.
3. **Services Section (`#servicios`):**
   - 3-column desktop grid / 1-column mobile stack:
     - **Headhunting Ejecutivo:** Búsqueda y selección de perfiles ejecutivos y mandos medios. Proceso personalizado con garantía de reemplazo.
     - **Outsourcing de Atención al Cliente:** Equipos especializados para empresas tecnológicas. Formación continua y supervisión dedicada.
     - **Formación Corporativa:** Programas de soft skills y liderazgo. Cursos presenciales y en línea adaptados a cada organización.
4. **Why Nexova Section (`#por-que-nexova`):**
   - 4 Exact briefing stats & metrics:
     - `12 años` de experiencia en el mercado latinoamericano.
     - `España & EE. UU.` Presencia regional consolidada (Valencia y Miami).
     - `+500` procesos exitosos de selección completados.
     - `Tecnología, Retail & Finanzas` Especialización sectorial contrastada.
5. **Contact Section (`#contacto`):**
   - Targeted directly to enterprise decision-makers.
   - Email: `contacto@nexova.com` | Valencia: `+34 960 123 456` | Miami: `+1 305 555 0191`.
6. **Footer:**
   - Copyright `© 2025 Nexova. Todos los derechos reservados.`, social links (LinkedIn, Instagram).

---

### 6.2 Talent Registration Form (`application.html`)
1. **Business Clarification Notice:**
   - High-visibility banner: *"¿Eres una empresa buscando talento? Escríbenos a contacto@nexova.com"*.
2. **Fieldsets & Field Layout:**
   - **Desktop:** Multi-column layout pairing related fields (Nombre/Email, Teléfono/País, Experiencia/Sector/Inglés) and 4-column horizontal cards for Availability.
   - **Mobile:** Single-column stacked fields with comfortable vertical rhythm (16px–24px gaps).
   - **11 Exact Fields & Rules:**
     1. *Nombre completo:* `text`, required, min 2 words. Error: `"El nombre debe contener al menos nombre y apellido"`.
     2. *Email profesional:* `email`, required, email regex. Error: `"Ingresa un email válido (ejemplo: nombre@empresa.com)"`.
     3. *Teléfono:* `tel`, required, international format with country code. Error: `"El teléfono debe incluir código de país (ejemplo: +34 612 345 678)"`.
     4. *País de residencia:* `select`, required, options `[España, Estados Unidos, Otro]`. Error: `"Selecciona tu país de residencia"`.
     5. *Años de experiencia:* `number`, required, 0–50. Error: `"Los años de experiencia deben estar entre 0 y 50"`.
     6. *Sector de interés:* `select`, required, options `[Tecnología, Retail, Servicios Financieros, Consultoría, Otro]`. Error: `"Selecciona el sector de tu interés"`.
     7. *Nivel de inglés:* `select`, required, options `[Básico, Intermedio, Avanzado, Nativo]`. Error: `"Indica tu nivel de inglés"`.
     8. *Disponibilidad:* `radio`, required, options `[Inmediata, 1 mes, 2-3 meses, Solo explorando]`. Error: `"Selecciona tu disponibilidad"`.
     9. *LinkedIn:* `url`, optional, valid URL starting with `http://` or `https://` if filled. Error: `"Si incluyes LinkedIn, debe ser una URL válida"`.
     10. *Comentarios adicionales:* `textarea`, optional, max 500 characters, live counter. Error: `"Los comentarios no pueden exceder 500 caracteres (quedan X)"`.
     11. *Acepto política de datos:* `checkbox`, required. Error: `"Debes aceptar la política de tratamiento de datos para continuar"`.
3. **Form Actions:**
   - Primary: *"Enviar registro"* (`#087F78`).
   - Secondary: *"Limpiar formulario"* (Neutral outline).
4. **Success State:**
   - Title: *"¡Gracias por tu interés en Nexova!"*
   - Copy: *"Hemos recibido tu información. Nuestro equipo de selección la revisará y te contactaremos en caso de que tu perfil encaje con alguna de nuestras oportunidades actuales o futuras."*

---

## 7. Interactive Validation Architecture (`validation.js`)
- Real-time inline validation on `blur` and `input`.
- Dynamic counter updating `quedan X caracteres`.
- Keyboard accessible radio cards with `focus-visible` states.
- Screen reader binding via `aria-invalid="true"` and `aria-describedby="[field]-error"`.

---

## 8. Tailwind CSS Configuration Guide
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        nexova: {
          primary: '#17324D',
          'primary-hover': '#244966',
          accent: '#087F78',
          'accent-hover': '#066560',
          surface: '#F5F8FA',
          'text-primary': '#17212B',
          'text-secondary': '#536473',
          border: '#D5DFE6',
          error: '#B42318',
          'error-bg': '#FEF3F2',
          success: '#067647',
          'success-bg': '#EDFDF5',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        '8xl': '1440px',
      }
    }
  }
}
```