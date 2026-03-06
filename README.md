# TurboS2 -- Hospital Administrative Analytics Dashboard

A comprehensive, interactive analytics dashboard that provides hospital administrators with insights into operational activity, workload distribution, and resolution trends using structured visualizations.

Built with Next.js, Recharts, and Framer Motion. Fully deployable on Vercel.

---

## Live Demo

Deploy your own instance with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/jatinnathh/TurboS2)

---

## Features

### Landing Page
- Scroll-animated 3D hero section with real dashboard preview inside a monitor frame
- Animated stat counters, feature cards, department overview, and testimonials
- Scroll progress indicator and floating navigation bar
- Call-to-action section with footer

### Analytics Dashboard (11 Pages)

| Page | Route | Visualizations |
|------|-------|---------------|
| **Main Dashboard** | `/dashboard` | Workload Distribution (doctor utilization bars, department workload), Hourly Patient Load (area chart), Department Workload Trends (line chart), Staff Utilization (stacked bars), Monthly Resolution Trends (grouped bars), Avg Resolution Time (area chart), Avg Handling Time by Dept (grouped bars), Bed Turnover Rate (line chart), Patient Status (stacked bars), Treatment Types (line chart), Revenue Summary (bar chart) |
| **Patients** | `/dashboard/patients` | Admission vs Discharge trend, Patient Demographics, Searchable patient records table |
| **Staff** | `/dashboard/staff` | Staff by Department (grouped bars), Shift Distribution (pie chart), Staff directory table |
| **Appointments** | `/dashboard/appointments` | Appointment trend lines, Type distribution (pie chart), Filterable appointments table |
| **Departments** | `/dashboard/departments` | Revenue by Dept (horizontal bars), Performance radar chart, Department comparison table |
| **Payments** | `/dashboard/payments` | Revenue vs Expenses (area chart), Revenue by Dept (bars), Filterable billing records |
| **Human Resources** | `/dashboard/hr` | Attendance rate trends, Hiring pipeline (grouped bars), Conversion rate table |
| **Salaries** | `/dashboard/salaries` | Payroll trend lines, Avg salary by role (bars), Salary range table with spread |
| **Rooms** | `/dashboard/rooms` | Occupancy by room type (bars), Room directory with status badges |
| **Ambulance** | `/dashboard/ambulance` | Response time vs target (line chart), Hourly dispatch (bars), Fleet status table |
| **Support** | `/dashboard/support` | Resolution trends (bars), Satisfaction score (line chart), Category breakdown, Filterable tickets |

### Key Dashboard Capabilities
- **Workload Distribution** -- Per-doctor capacity utilization with red/amber/green indicators, department workload percentages, hourly operational load analysis
- **Resolution Trends** -- Monthly case resolution tracking, average resolution time monitoring, escalation rate analysis
- **Handling Time Analysis** -- Wait, treatment, and discharge time breakdowns by department
- **Staff Utilization** -- Clinical vs admin vs idle time split by role
- **Interactive Filters** -- Searchable tables, status filter buttons, time period selectors
- **Animated Charts** -- Scroll-triggered animations on all visualizations using Framer Motion

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| [Next.js 16](https://nextjs.org/) | React framework with App Router |
| [Recharts](https://recharts.org/) | Data visualization (Bar, Line, Area, Pie, Radar charts) |
| [Framer Motion](https://www.framer.com/motion/) | Animations and scroll-based transitions |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first styling |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |

---

## Project Structure

```
app/
  page.tsx                          # Landing page (scroll sections)
  layout.tsx                        # Root layout (fonts, metadata)
  globals.css                       # Design system (dark theme, glassmorphism)
  components/
    sections/
      HeroSection.tsx              # Hero with real dashboard preview
      StatsSection.tsx             # Animated stat counters
      FeaturesSection.tsx          # Feature cards grid
      DepartmentsSection.tsx       # Department overview cards
      AnalyticsPreview.tsx         # Resolution trends preview
      TestimonialsSection.tsx      # Testimonial cards
      CTASection.tsx               # Call-to-action + footer
  dashboard/
    layout.tsx                     # Shared sidebar layout
    page.tsx                       # Main analytics dashboard
    data.ts                        # Seeded data module (470+ lines)
    patients/page.tsx
    staff/page.tsx
    appointments/page.tsx
    departments/page.tsx
    payments/page.tsx
    hr/page.tsx
    salaries/page.tsx
    rooms/page.tsx
    ambulance/page.tsx
    support/page.tsx
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/jatinnathh/TurboS2.git
cd TurboS2
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) -- the landing page loads. Click "Dashboard" to enter the analytics dashboard.

### Production Build

```bash
npm run build
npm start
```

---

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Deploy -- no environment variables required, no database needed

All data is seeded client-side in `app/dashboard/data.ts`. No external APIs or databases are used.

### Build Output

All 11 dashboard routes + landing page are statically generated:

```
Route (app)
  /                          Landing page
  /dashboard                 Main analytics
  /dashboard/patients        Patient records
  /dashboard/staff           Staff management
  /dashboard/appointments    Scheduling
  /dashboard/departments     Department metrics
  /dashboard/payments        Billing analytics
  /dashboard/hr              Human resources
  /dashboard/salaries        Payroll tracking
  /dashboard/rooms           Room management
  /dashboard/ambulance       Fleet monitoring
  /dashboard/support         Ticket management
```

---

## Design

- **Theme**: Light dashboard with dark sidebar (`#0f172a`) for contrast
- **Accent Colors**: Purple (`#7C3AED`), Pink (`#EC4899`), Coral (`#FF2D55`)
- **Typography**: Geist Sans and Geist Mono from Google Fonts
- **Landing Page**: Dark medical theme with glassmorphism, gradients, and glow effects
- **Responsive**: Adapts from 1 to 4 column grids across all breakpoints

---

## Problem Statement

> Build a dashboard that provides hospital administrators with insights into operational activity, such as workload distribution or resolution trends, using structured visualizations.

This project directly addresses this by implementing:
1. **Workload Distribution** -- Doctor utilization, department capacity, hourly patient load, staff time allocation
2. **Resolution Trends** -- Monthly case resolution, avg resolution time, escalation rates, handling time analysis
3. **Structured Visualizations** -- 20+ interactive charts across 11 dashboard pages, all powered by real seeded data
