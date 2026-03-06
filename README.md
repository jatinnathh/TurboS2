# TurboS2 -- Hospital Administrative Analytics Dashboard

TurboS2 is a high-fidelity, data-rich administrative analytics dashboard purpose-built for modern hospital management. It provides a complete operational overview spanning patient flow, staffing, finance, departmental performance, and resource utilization -- all rendered through interactive visualizations powered by Recharts and smooth animations via Framer Motion.

The application is organized into a polished landing page that introduces the platform, a login gateway, and a full-featured dashboard containing eleven distinct analytics modules accessible through a collapsible sidebar.

---

## Table of Contents

- [Landing Page](#landing-page)
- [Dashboard Overview](#dashboard-overview)
  - [Main Analytics Dashboard](#main-analytics-dashboard)
  - [Patient Management](#patient-management)
  - [Staff Management](#staff-management)
  - [Appointments](#appointments)
  - [Department Performance](#department-performance)
  - [Payments and Billing](#payments-and-billing)
  - [Human Resources](#human-resources)
  - [Salaries and Payroll](#salaries-and-payroll)
  - [Room Management](#room-management)
  - [Ambulance Fleet](#ambulance-fleet)
  - [Support and Tickets](#support-and-tickets)
- [Shared UI Components](#shared-ui-components)
- [Tech Stack](#tech-stack)
- [Database Schema](#database-schema)
- [Design Philosophy](#design-philosophy)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)

---

## Landing Page

The public landing page serves as the entry point to TurboS2 and is built with scroll-driven animations and a dark, premium aesthetic.

- **Floating Navigation Bar** -- A glassmorphic fixed nav with anchor links to each section and a call-to-action button linking to the login page.
- **Scroll Progress Indicator** -- A gradient progress bar at the top of the viewport that fills as the user scrolls.
- **Hero Section** -- Animated headline and tagline introducing the platform with a gradient call-to-action button.
- **Stats Section** -- Numeric highlights of the platform's scale (patients managed, departments, staff, etc.).
- **Features Section** -- Card-based overview of core capabilities such as analytics, scheduling, and fleet management.
- **Departments Section** -- Visual grid of hospital departments supported by the system.
- **Analytics Preview** -- A live replica of the actual dashboard charts (workload distribution pie and resolution trend bar chart) rendered with real Recharts components, giving visitors a preview of the dashboard's data visualizations before logging in.
- **Testimonials Section** -- Quotes from fictional hospital administrators highlighting the platform's value.
- **Call-to-Action Section** -- Final section encouraging sign-up with a prominent button.

---

## Dashboard Overview

After logging in, users enter the dashboard which features a **collapsible dark sidebar** with icon-based navigation to all eleven modules. The sidebar supports both expanded (label + icon) and collapsed (icon-only) states. A "Back to Site" link returns the user to the landing page.

Every dashboard page shares a consistent layout pattern:

1. A sticky header displaying the page title and description.
2. A **sticky Analytics Toolbar** (pinned below the header) with time range controls (Monthly / Quarterly / Yearly) and a department filter dropdown. Both controls feature animated pill indicators powered by Framer Motion.
3. **Summary stat cards** at the top of each page, each containing a headline number and an inline **sparkline** chart for at-a-glance trend context.
4. Interactive **Recharts-powered visualizations** (bar charts, line charts, area charts, pie charts, heatmaps, and radar charts).
5. **Sortable data tables** with click-to-sort column headers (ascending/descending toggle with visual indicators).

### Main Analytics Dashboard

The home page of the dashboard aggregates hospital-wide metrics into a single view.

**Summary Cards** (with sparklines):
- Total Patients, Today's Appointments, Total Revenue, and Bed Occupancy, each with percentage change indicators.

**Workload Distribution Section:**
- Doctor Workload Utilization -- Ranked list of top or bottom performing doctors by utilization percentage, filterable by department. Each doctor shows active cases versus max capacity with animated progress bars color-coded by severity (green, amber, red).
- Department Workload Distribution -- Animated horizontal bars showing each department's workload, paired with a donut-style pie chart for proportional distribution.
- Hourly Patient Load Distribution -- A dual-axis stacked area chart breaking down patient volume by type (Emergency, Outpatient, Admissions) across each hour of the day.
- Patient Load Heatmap -- A grid-based heatmap showing hourly patient intensity by day of the week. Colors range from green (low) to red (high) with hover tooltips showing exact counts. Includes a gradient legend.
- Department Workload Trends -- Multi-line chart tracking capacity utilization over time for Emergency, ICU, Cardiology, Orthopedics, and Neurology. Responds to the global time range filter.
- Staff Utilization Breakdown -- Horizontal stacked bar chart showing time allocation across Clinical, Admin, and Idle categories for each staff role.

**Resolution Trends Section:**
- Resolution Trends -- Grouped bar chart displaying Resolved, Pending, and Escalated case counts per period.
- Average Resolution Time -- Area chart showing the average hours to resolve cases over time.
- Average Handling Time by Department -- Grouped bar chart showing Wait, Treatment, and Discharge times (in minutes) per department, filterable by department selection.
- Bed Turnover Rate -- Multi-line chart comparing turnover rates for General Ward, ICU, and Private beds.
- Recent Activity Feed -- A scrollable list of recent hospital events (admissions, surgeries, discharges, lab results, appointments, prescriptions) with color-coded type indicators and timestamps.

**Additional Sections:**
- Patient Status -- Stacked bar chart showing Patient In, Patient Out, Discharged, and Emergency counts with its own independent time range selector.
- Treatment Type -- Line chart comparing General, Surgery, and ICU treatment volumes over a weekly period.
- Revenue Summary -- Grouped bar chart showing revenue streams by period.
- Top Doctors -- A card grid showcasing featured doctors with avatar initials, name, and specialty.

---

### Patient Management

A dedicated page for monitoring all patient-related data.

- **Stat Cards:** Total Patients, Currently Admitted, ICU Patients, and Discharged counts -- all dynamically computed from the current department filter.
- **Admission vs Discharge Trend:** Line chart tracking monthly admissions and discharges side by side.
- **Patient Demographics:** Grouped bar chart breaking down patient counts by age group and gender (Male / Female).
- **Patient Records Table:** A full sortable and searchable table displaying: ID, Name, Age, Gender, Blood Type (badge), Department, Doctor, Status (color-coded: Admitted, Under Treatment, Recovering, ICU, Discharged), and Condition (color-coded: Stable, Critical, Moderate, Recovered).

---

### Staff Management

- **Stat Cards:** Total Staff, On Duty Now, On Leave, and Off Duty.
- **Staff by Department:** Grouped bar chart showing counts of Doctors, Nurses, and Technicians per department.
- **Shift Distribution:** Donut pie chart showing the distribution of Morning, Afternoon, and Night shifts.
- **Staff Directory Table:** Sortable table with columns for ID, Name, Role, Department, Shift (badge), Status (color-coded), Experience, and Patients Today.

---

### Appointments

- **Stat Cards:** Total Appointments, Confirmed, Pending, and In Progress.
- **Appointment Trend:** Multi-line chart showing Scheduled, Completed, and Cancelled appointments over time. Responds to the time range filter.
- **Appointments by Type:** Donut pie chart breaking down appointments by type (Check-up, Follow-up, Emergency, Consultation, Surgery, Lab).
- **Upcoming Appointments Table:** Sortable table with status filter buttons (All, Confirmed, Pending, Scheduled). Columns include ID, Patient, Doctor, Department, Date, Time, Type (badge), and Status (color-coded).

---

### Department Performance

A comprehensive view comparing all hospital departments. Uses its own department filter toolbar with animated tab indicators.

- **Department Cards:** Top-4 department summary cards showing patient count, average wait time, satisfaction percentage, and an animated occupancy progress bar.
- **Revenue by Department:** Horizontal bar chart comparing department revenue.
- **Revenue Distribution:** Donut pie chart with labeled percentage slices.
- **Department Performance Radar:** A radar (spider) chart comparing Satisfaction, Occupancy, and Success Rate across all departments simultaneously.
- **Department Overview Table:** Full sortable table with columns for Department, Patients, Satisfaction, Revenue, Occupancy (with inline progress bar), Success Rate, Average Wait, Beds, and Doctors. Column headers are clickable for ascending/descending sort.

---

### Payments and Billing

- **Primary Stat Cards:** Total Billed, Collected, Outstanding, and Collection Rate.
- **Statistical Summary Cards:** Three dedicated cards showing Mean (Average Bill), Median Bill, and Mode (Most Frequent bill amount). These are computed dynamically from the filtered payment records.
- **Revenue Trends:** Dual-line area chart comparing Revenue and Expenses over time.
- **Department Revenue:** Horizontal bar chart ranking departments by revenue.
- **Payment Records Table:** Sortable table with status filter buttons (All, Paid, Partial, Pending). Columns include Invoice ID, Patient, Department, Amount, Paid, Status (color-coded), Date, and Method.

---

### Human Resources

- **Stat Cards:** Total Employees, Active Today, On Leave, and Open Positions.
- **Attendance Rate:** Multi-line chart tracking Present, Absent, and Leave rates over time. Responds to the time range filter.
- **Hiring Pipeline Chart:** Grouped bar chart showing the pipeline stages (Applicants, Shortlisted, Interviewed, Offered) for each open role.
- **Hiring Pipeline Details Table:** Sortable table with columns for Position, Applicants, Shortlisted, Interviewed, Offered, and a computed Conversion rate percentage.

---

### Salaries and Payroll

- **Stat Cards:** Annual Payroll, Monthly Average, Total Bonuses, and Overtime Cost.
- **Monthly Payroll Trend:** Multi-line chart showing Base Payroll, Bonuses, and Overtime costs per month.
- **Average Salary by Role:** Horizontal bar chart comparing average salaries across roles (Surgeon, Specialist, General Practitioner, Nurse, Technician, Admin, Support).
- **Salary Ranges by Role Table:** Sortable table with columns for Role, Headcount, Min Salary, Avg Salary, Max Salary, and Range Spread (shown as an inline progress bar with dollar value).

---

### Room Management

- **Stat Cards:** Total Rooms, Occupied, Available, and Occupancy Rate (percentage).
- **Occupancy by Room Type:** Grouped bar chart showing Total vs Occupied beds for each room type (General Ward, ICU, Private Suite, Emergency, Maternity, Pediatric).
- **Room Directory Table:** Sortable table with columns for Room ID, Type, Floor, Beds, Occupied (formatted as occupied/total), Status (color-coded: Available, Occupied, Full, Critical, In Use), Patient, and Rate/Day.

---

### Ambulance Fleet

- **Stat Cards:** Total Fleet, Active Now, Available, and Average Response Time (minutes, computed dynamically).
- **Response Time vs Target:** Dual-line chart comparing actual average response time against the target threshold, with the target shown as a dashed line.
- **Dispatches by Hour:** Bar chart showing dispatch frequency across each hour of the day.
- **Fleet Status Table:** Sortable table with columns for Unit ID, Type, Driver, Status (color-coded: Available, On Route, At Scene, Maintenance), Location, Last Service date, and Mileage.

---

### Support and Tickets

- **Stat Cards:** Total Tickets, Open, In Progress, and Resolved.
- **Resolution Trends (Weekly):** Grouped bar chart showing Resolved, Pending, and Escalated ticket counts per week.
- **Satisfaction Score Trend:** Line chart tracking the satisfaction score over time.
- **Tickets by Category:** A visual card grid showing each category (Equipment, Billing, IT, Maintenance, Clinical, Scheduling, Other) with total count, a progress bar of resolution percentage, and the resolved percentage label.
- **Support Tickets Table:** Sortable table with status filter buttons (All, Open, In Progress, Resolved). Columns include ID, Title, Priority (color-coded: Critical, High, Medium, Low), Status, Assignee, Department, Category (badge), and Created date.

---

## Shared UI Components

The following reusable components are shared across all dashboard pages to maintain consistency:

**AnalyticsToolbar** -- A sticky control bar providing:
- Time range segmented control (Monthly / Quarterly / Yearly) with animated pill indicator.
- Department dropdown selector supporting: All, Emergency, Cardiology, Neurology, Orthopedics, Pediatrics, Oncology, and ICU.
- Optional doctor ranking toggle (Top / Bottom) for the main dashboard.

**SortableTable** -- A generic, type-safe table component supporting:
- Click-to-sort column headers with ascending/descending toggle and visual sort-direction indicators.
- Custom cell renderers for badges, formatted values, and inline visualizations.
- Custom sort value extractors for columns where display value differs from sort value.
- Empty state messaging.
- Row click handlers.

**Sparkline** -- A compact inline line chart (SVG-based via Recharts) used inside stat cards to show micro-trends without axis clutter.

**dataUtils** -- Utility functions for data manipulation:
- `aggregateByTimeRange` -- Aggregates monthly data into quarterly or yearly buckets (sum or average mode).
- `filterByDepartment` -- Filters any dataset by a department field.
- `rankDoctors` -- Sorts and slices doctor data for top/bottom performer views.

---

## Tech Stack

| Layer           | Technology                                                                 |
|-----------------|---------------------------------------------------------------------------|
| Framework       | [Next.js 16](https://nextjs.org/) (App Router)                           |
| UI Library      | [React 19](https://react.dev/)                                           |
| Database / ORM  | [Prisma 5](https://www.prisma.io/) with PostgreSQL                       |
| Visualization   | [Recharts 3](https://recharts.org/) (Bar, Line, Area, Pie, Radar charts) |
| Styling         | [Tailwind CSS 4](https://tailwindcss.com/)                               |
| Animations      | [Framer Motion 12](https://www.framer.com/motion/)                       |
| Language        | TypeScript 5                                                              |

---

## Database Schema

The application uses Prisma ORM with PostgreSQL. The schema defines the following models:

| Model                  | Purpose                                                                                   |
|------------------------|-------------------------------------------------------------------------------------------|
| `Patient`              | Core patient records (name, age, gender, blood type, department, doctor, status, condition)|
| `Doctor`               | Doctor profiles (name, specialty, department, patient count, rating)                       |
| `Staff`                | Staff directory (name, role, department, shift, status, experience, daily patient load)    |
| `Appointment`          | Appointment scheduling (patient, doctor, department, date/time, type, status)              |
| `Payment`              | Billing records (patient, department, amount, paid, status, date, method)                  |
| `Room`                 | Room inventory (type, floor, bed count, occupancy, status, patient, daily rate)            |
| `Ambulance`            | Fleet tracking (type, driver, status, location, last service date, mileage)                |
| `DoctorWorkload`       | Aggregated doctor workload metrics (active cases, max capacity, consultations, surgeries)  |
| `DepartmentWorkload`   | Department-level workload percentage with associated color                                 |
| `SalaryRange`          | Compensation benchmarking by role (headcount, min/avg/max salary, range spread)            |
| `DepartmentPerformance`| Department KPIs (patients, satisfaction, revenue, occupancy, success rate, wait, resources) |

---

## Design Philosophy

TurboS2 follows a "Visual First" design approach:

- **Glassmorphism and Backdrop Blur** -- The landing page navigation, dashboard headers, and toolbar all use frosted-glass effects with `backdrop-blur` for a layered, modern look.
- **Animated Indicators** -- Sparklines inside stat cards, animated progress bars on doctor and department workload views, and Framer Motion spring transitions on tab indicators provide immediate visual feedback without clutter.
- **Collapsible Sidebar** -- The dark-themed sidebar gracefully transitions between expanded (icon + label) and collapsed (icon-only) modes with smooth width animation.
- **Sticky Toolbars** -- The Analytics Toolbar sticks below the page header so filters remain accessible while scrolling through long pages.
- **Color-Coded Status System** -- Consistent color conventions throughout: green for healthy/available/resolved, amber for warning/pending, red for critical/overdue, blue for in-progress, and purple for primary/highlighted values.
- **Responsive Layout** -- CSS Grid with responsive breakpoints transitions from single-column (mobile) to four-column (desktop) layouts for stat cards and chart grids.
- **Harmonious Palette** -- A curated set of purple, pink, blue, amber, emerald, and red tones ensures visual coherence across all eleven modules.

---

## Project Structure

```
TurboS2/
  app/
    page.tsx                        # Landing page (public)
    layout.tsx                      # Root layout
    globals.css                     # Global styles and CSS variables
    login/                          # Login page
    components/
      sections/
        HeroSection.tsx             # Landing hero section
        StatsSection.tsx            # Landing stats section
        FeaturesSection.tsx         # Landing features section
        DepartmentsSection.tsx      # Landing departments section
        AnalyticsPreview.tsx        # Landing analytics preview (live charts)
        TestimonialsSection.tsx     # Landing testimonials section
        CTASection.tsx              # Landing call-to-action section
    dashboard/
      layout.tsx                    # Dashboard shell (collapsible sidebar)
      page.tsx                      # Main analytics dashboard
      AnalyticsToolbar.tsx          # Shared sticky toolbar component
      SortableTable.tsx             # Shared sortable table component
      Sparkline.tsx                 # Shared sparkline component
      data.ts                       # All dashboard data and mock datasets
      dataUtils.ts                  # Aggregation, filtering, and ranking utilities
      patients/page.tsx             # Patient management page
      staff/page.tsx                # Staff management page
      appointments/page.tsx         # Appointments page
      departments/page.tsx          # Department performance page
      payments/page.tsx             # Payments and billing page
      hr/page.tsx                   # Human resources page
      salaries/page.tsx             # Salaries and payroll page
      rooms/page.tsx                # Room management page
      ambulance/page.tsx            # Ambulance fleet page
      support/page.tsx              # Support tickets page
    api/
      department-workload/          # Department workload API route
      doctor-workload/              # Doctor workload API route
      doctors/                      # Doctors API route
  lib/
    prisma.ts                       # Prisma client singleton
  prisma/
    schema.prisma                   # Database schema (11 models)
  public/                           # Static assets
```

---

## Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- PostgreSQL database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jatinnathh/TurboS2.git
   cd TurboS2
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the project root with your database connection string:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/turbos2"
   ```

4. Push the database schema:
   ```bash
   npx prisma db push
   ```

5. Generate the Prisma client:
   ```bash
   npx prisma generate
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser to view the landing page. Navigate to the dashboard via the login page.

### Build for Production

```bash
npm run build
npm start
```

---

Built for Hospital Administrators.
