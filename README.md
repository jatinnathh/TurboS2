# TurboS2 — Hospital Administrative Analytics Dashboard

TurboS2 is a high-fidelity, high-performance administrative analytics dashboard designed for modern hospital management. Built with a focus on real-time data visualization and operational efficiency, it provides a comprehensive overview of hospital workloads, patient flow, financial health, and resource utilization.

## 🚀 Key Modules & Features

### 📊 Global Analytics
- **Workload Distribution**: Dynamic tracking of doctor and department utilization.
- **Resolution Trends**: Multi-stage case monitoring (Resolved vs. Pending vs. Escalated).
- **Patient Load Intensity**: Dual-axis area charts for peak hour distribution and a high-density heatmap for weekly load patterns.
- **Sticky Activity Toolbar**: Global filters for time range (Monthly/Quarterly/Yearly) and department-specific focus.

### 👥 Patient & Staff Management
- **Universal Patient Records**: Sortable, searchable database with live status (Admitted/ICU/Discharged) and condition tracking.
- **Staff Directory**: Comprehensive listing of clinical and administrative staff with shift distribution and real-time "On Duty" status.
- **Demographic Insights**: Detailed breakdown of patient age groups and admission trends.

### 🏥 Operational Excellence
- **Appointment Scheduling**: Visual trend analysis of scheduled vs. completed visits and categorization by appointment type.
- **Ambulance Fleet**: Real-time fleet status (Available/On Route/Maintenance) and response time benchmarking against performance targets.
- **Room Management**: Granular occupancy tracking by floor and room type (General/ICU/Private).

### 💰 Financial & HR Analytics
- **Payments & Billing**: Comprehensive revenue tracking with advanced statistical summaries (Mean, Median, and Mode billing) and collection rate metrics.
- **Payroll & Salaries**: Detailed compensation analysis by role, monthly payroll trends, and salary range benchmarking.
- **Hiring Pipeline**: Multi-stage recruitment tracking from application to offer conversion.

### 🛠️ Service & Support
- **Support Tickets**: Integrated issue tracking with priority-based resolution trends and satisfaction score monitoring.

## 🏗️ Technical Architecture

### Tech Stack
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://reactjs.org/)
- **Database/ORM**: [Prisma](https://www.prisma.io/) with PostgreSQL
- **Visualization**: [Recharts](https://recharts.org/) for high-fidelity interactive data modeling
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for smooth micro-interactions

### Database Schema (Prisma)
The application utilizes a robust relational schema including:
- `Patient`, `Doctor`, `Staff`: Core entities.
- `Appointment`, `Payment`, `Ambulance`, `Room`: Operational entities.
- `DoctorWorkload`, `DepartmentWorkload`, `SalaryRange`: Aggregated analytics models.

## 🎨 Design Philosophy
TurboS2 adheres to a "Visual First" design philosophy:
- **Glassmorphism**: Subtle backdrops and blurred containers for a premium, airy feel.
- **Dynamic Indicators**: Sparklines and micro-animations provide immediate context without clutter.
- **Responsive Layout**: Fluid transition between desktop-first analytics and mobile-accessible views.
- **Harmonious Palette**: Professional typography coupled with color-coded status indicators (Emergency/Critical/Stable).

## 🛠️ Getting Started

### Prerequisites
- Node.js (Latest LTS)
- PostgreSQL database

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/jatinnathh/TurboS2.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file with `DATABASE_URL`.
4. Run migrations:
   ```bash
   npx prisma db push
   ```
5. Start development server:
   ```bash
   npm run dev
   ```

---
Built with ❤️ for Hospital Administrators.
