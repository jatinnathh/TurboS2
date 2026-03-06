// ══════════════════════════════════════════════════
// Hospital Admin Analytics — Seeded Data Module
// ══════════════════════════════════════════════════

// ── Dashboard Summary ──
export const summaryStats = [
  { label: 'Total Patients', value: '12,345', change: '+65%', positive: true, icon: 'patients' },
  { label: 'Appointments', value: '1,847', change: '+12%', positive: true, icon: 'appointments' },
  { label: 'Revenue', value: '$3.2M', change: '+8.4%', positive: true, icon: 'revenue' },
  { label: 'Bed Occupancy', value: '87%', change: '-2.1%', positive: false, icon: 'beds' },
];

export const patientStatusData = [
  { month: 'Jan', patientIn: 820, patientOut: 650, discharged: 430, emergency: 180 },
  { month: 'Feb', patientIn: 750, patientOut: 580, discharged: 390, emergency: 210 },
  { month: 'Mar', patientIn: 890, patientOut: 720, discharged: 510, emergency: 165 },
  { month: 'Apr', patientIn: 960, patientOut: 760, discharged: 480, emergency: 230 },
  { month: 'May', patientIn: 1040, patientOut: 850, discharged: 560, emergency: 195 },
  { month: 'Jun', patientIn: 880, patientOut: 690, discharged: 450, emergency: 240 },
  { month: 'Jul', patientIn: 930, patientOut: 780, discharged: 520, emergency: 175 },
  { month: 'Aug', patientIn: 1100, patientOut: 910, discharged: 600, emergency: 260 },
  { month: 'Sep', patientIn: 1050, patientOut: 870, discharged: 570, emergency: 220 },
  { month: 'Oct', patientIn: 980, patientOut: 810, discharged: 540, emergency: 200 },
  { month: 'Nov', patientIn: 870, patientOut: 720, discharged: 490, emergency: 185 },
  { month: 'Dec', patientIn: 950, patientOut: 790, discharged: 530, emergency: 250 },
];

export const treatmentTypeData = [
  { day: 'Sat', general: 120, surgery: 45, icu: 28 },
  { day: 'Sun', general: 95, surgery: 38, icu: 32 },
  { day: 'Mon', general: 180, surgery: 72, icu: 41 },
  { day: 'Tue', general: 210, surgery: 85, icu: 55 },
  { day: 'Wed', general: 195, surgery: 78, icu: 48 },
  { day: 'Thu', general: 240, surgery: 92, icu: 60 },
  { day: 'Fri', general: 260, surgery: 105, icu: 65 },
];

export const revenueSummaryData = [
  { month: 'Jul', running: 580000, cycling: 320000 },
  { month: 'Aug', running: 620000, cycling: 280000 },
  { month: 'Sep', running: 710000, cycling: 410000 },
  { month: 'Oct', running: 680000, cycling: 350000 },
  { month: 'Nov', running: 750000, cycling: 420000 },
  { month: 'Dec', running: 820000, cycling: 480000 },
];

export const topDoctors = [
  { name: 'Dr. Carla Westervelt', specialty: 'Orthopedic', patients: 342, rating: 4.9, color: '#FF2D55' },
  { name: 'Dr. Lincoln Levin', specialty: 'Neurologist', patients: 289, rating: 4.8, color: '#7C3AED' },
  { name: 'Dr. Alena Bator', specialty: 'Cardiologist', patients: 315, rating: 4.9, color: '#3B82F6' },
  { name: 'Dr. Alfonso Workman', specialty: 'Dentist', patients: 267, rating: 4.7, color: '#10B981' },
];

export const departmentWorkload = [
  { name: 'Emergency', workload: 92, color: '#FF2D55' },
  { name: 'Cardiology', workload: 78, color: '#7C3AED' },
  { name: 'Neurology', workload: 65, color: '#3B82F6' },
  { name: 'Orthopedics', workload: 71, color: '#F59E0B' },
  { name: 'Pediatrics', workload: 58, color: '#10B981' },
  { name: 'Oncology', workload: 84, color: '#EC4899' },
];

export const recentActivity = [
  { action: 'Patient admitted', department: 'Emergency', time: '2 min ago', type: 'admit' },
  { action: 'Surgery completed', department: 'Cardiology', time: '15 min ago', type: 'surgery' },
  { action: 'Patient discharged', department: 'Orthopedics', time: '32 min ago', type: 'discharge' },
  { action: 'Lab results ready', department: 'Pathology', time: '45 min ago', type: 'lab' },
  { action: 'New appointment', department: 'Neurology', time: '1 hr ago', type: 'appointment' },
  { action: 'Prescription issued', department: 'Pediatrics', time: '1.5 hr ago', type: 'prescription' },
];

// ── Patients Page ──
export const patientsList = [
  { id: 'P-1001', name: 'Sarah Johnson', age: 34, gender: 'Female', bloodType: 'A+', department: 'Cardiology', doctor: 'Dr. Alena Bator', status: 'Admitted', admitDate: '2024-11-28', condition: 'Stable' },
  { id: 'P-1002', name: 'Michael Chen', age: 56, gender: 'Male', bloodType: 'O+', department: 'Neurology', doctor: 'Dr. Lincoln Levin', status: 'Under Treatment', admitDate: '2024-11-25', condition: 'Critical' },
  { id: 'P-1003', name: 'Emily Davis', age: 28, gender: 'Female', bloodType: 'B-', department: 'Orthopedics', doctor: 'Dr. Carla Westervelt', status: 'Recovering', admitDate: '2024-11-20', condition: 'Stable' },
  { id: 'P-1004', name: 'James Wilson', age: 45, gender: 'Male', bloodType: 'AB+', department: 'Emergency', doctor: 'Dr. Alfonso Workman', status: 'ICU', admitDate: '2024-12-01', condition: 'Critical' },
  { id: 'P-1005', name: 'Maria Garcia', age: 62, gender: 'Female', bloodType: 'O-', department: 'Oncology', doctor: 'Dr. Alena Bator', status: 'Under Treatment', admitDate: '2024-11-15', condition: 'Moderate' },
  { id: 'P-1006', name: 'Robert Brown', age: 38, gender: 'Male', bloodType: 'A-', department: 'Pediatrics', doctor: 'Dr. Lincoln Levin', status: 'Discharged', admitDate: '2024-11-10', condition: 'Recovered' },
  { id: 'P-1007', name: 'Amanda Lee', age: 71, gender: 'Female', bloodType: 'B+', department: 'Cardiology', doctor: 'Dr. Carla Westervelt', status: 'Admitted', admitDate: '2024-12-02', condition: 'Stable' },
  { id: 'P-1008', name: 'David Martinez', age: 50, gender: 'Male', bloodType: 'O+', department: 'Neurology', doctor: 'Dr. Alfonso Workman', status: 'Under Treatment', admitDate: '2024-11-22', condition: 'Moderate' },
];

export const patientDemographics = [
  { ageGroup: '0-18', male: 320, female: 280 },
  { ageGroup: '19-35', male: 580, female: 620 },
  { ageGroup: '36-50', male: 450, female: 410 },
  { ageGroup: '51-65', male: 390, female: 420 },
  { ageGroup: '65+', male: 310, female: 360 },
];

export const admissionTrend = [
  { month: 'Jan', admissions: 420, discharges: 380 },
  { month: 'Feb', admissions: 380, discharges: 350 },
  { month: 'Mar', admissions: 510, discharges: 470 },
  { month: 'Apr', admissions: 480, discharges: 460 },
  { month: 'May', admissions: 560, discharges: 520 },
  { month: 'Jun', admissions: 450, discharges: 430 },
  { month: 'Jul', admissions: 520, discharges: 490 },
  { month: 'Aug', admissions: 600, discharges: 560 },
  { month: 'Sep', admissions: 570, discharges: 540 },
  { month: 'Oct', admissions: 540, discharges: 510 },
  { month: 'Nov', admissions: 490, discharges: 470 },
  { month: 'Dec', admissions: 530, discharges: 500 },
];

// ── Staff Page ──
export const staffList = [
  { id: 'S-001', name: 'Dr. Carla Westervelt', role: 'Senior Surgeon', department: 'Orthopedics', shift: 'Day', status: 'On Duty', phone: '555-0101', experience: '12 yrs', patientsToday: 8 },
  { id: 'S-002', name: 'Dr. Lincoln Levin', role: 'Neurologist', department: 'Neurology', shift: 'Day', status: 'On Duty', phone: '555-0102', experience: '15 yrs', patientsToday: 6 },
  { id: 'S-003', name: 'Dr. Alena Bator', role: 'Cardiologist', department: 'Cardiology', shift: 'Night', status: 'Off Duty', phone: '555-0103', experience: '10 yrs', patientsToday: 0 },
  { id: 'S-004', name: 'Dr. Alfonso Workman', role: 'General Physician', department: 'Emergency', shift: 'Day', status: 'On Duty', phone: '555-0104', experience: '8 yrs', patientsToday: 12 },
  { id: 'S-005', name: 'Nurse Patricia Hall', role: 'Head Nurse', department: 'ICU', shift: 'Night', status: 'On Duty', phone: '555-0105', experience: '18 yrs', patientsToday: 15 },
  { id: 'S-006', name: 'Nurse James Reed', role: 'Registered Nurse', department: 'Pediatrics', shift: 'Day', status: 'On Duty', phone: '555-0106', experience: '5 yrs', patientsToday: 10 },
  { id: 'S-007', name: 'Dr. Sophia Turner', role: 'Oncologist', department: 'Oncology', shift: 'Day', status: 'On Leave', phone: '555-0107', experience: '20 yrs', patientsToday: 0 },
  { id: 'S-008', name: 'Tech. Ryan Morris', role: 'Lab Technician', department: 'Pathology', shift: 'Day', status: 'On Duty', phone: '555-0108', experience: '6 yrs', patientsToday: 22 },
];

export const staffByDepartment = [
  { department: 'Emergency', doctors: 12, nurses: 24, technicians: 8 },
  { department: 'Cardiology', doctors: 8, nurses: 16, technicians: 5 },
  { department: 'Neurology', doctors: 6, nurses: 12, technicians: 4 },
  { department: 'Orthopedics', doctors: 7, nurses: 14, technicians: 3 },
  { department: 'Pediatrics', doctors: 5, nurses: 18, technicians: 4 },
  { department: 'Oncology', doctors: 6, nurses: 10, technicians: 6 },
  { department: 'ICU', doctors: 10, nurses: 30, technicians: 8 },
];

export const shiftDistribution = [
  { shift: 'Morning (6AM-2PM)', count: 145 },
  { shift: 'Afternoon (2PM-10PM)', count: 120 },
  { shift: 'Night (10PM-6AM)', count: 85 },
];

// ── Appointments Page ──
export const appointmentsList = [
  { id: 'A-5001', patient: 'Sarah Johnson', doctor: 'Dr. Alena Bator', department: 'Cardiology', date: '2024-12-03', time: '09:00 AM', type: 'Follow-up', status: 'Confirmed' },
  { id: 'A-5002', patient: 'Michael Chen', doctor: 'Dr. Lincoln Levin', department: 'Neurology', date: '2024-12-03', time: '10:30 AM', type: 'Consultation', status: 'Confirmed' },
  { id: 'A-5003', patient: 'Emily Davis', doctor: 'Dr. Carla Westervelt', department: 'Orthopedics', date: '2024-12-03', time: '11:00 AM', type: 'Surgery Prep', status: 'Pending' },
  { id: 'A-5004', patient: 'James Wilson', doctor: 'Dr. Alfonso Workman', department: 'Emergency', date: '2024-12-03', time: '02:00 PM', type: 'Emergency', status: 'In Progress' },
  { id: 'A-5005', patient: 'Maria Garcia', doctor: 'Dr. Sophia Turner', department: 'Oncology', date: '2024-12-04', time: '09:30 AM', type: 'Chemotherapy', status: 'Scheduled' },
  { id: 'A-5006', patient: 'Robert Brown', doctor: 'Dr. Lincoln Levin', department: 'Neurology', date: '2024-12-04', time: '11:00 AM', type: 'MRI Scan', status: 'Scheduled' },
  { id: 'A-5007', patient: 'Amanda Lee', doctor: 'Dr. Alena Bator', department: 'Cardiology', date: '2024-12-04', time: '03:00 PM', type: 'ECG Test', status: 'Confirmed' },
  { id: 'A-5008', patient: 'David Martinez', doctor: 'Dr. Carla Westervelt', department: 'Orthopedics', date: '2024-12-05', time: '10:00 AM', type: 'X-Ray', status: 'Scheduled' },
];

export const appointmentsByType = [
  { type: 'Consultation', count: 450 },
  { type: 'Follow-up', count: 380 },
  { type: 'Surgery', count: 120 },
  { type: 'Emergency', count: 210 },
  { type: 'Lab Test', count: 340 },
  { type: 'Therapy', count: 180 },
];

export const appointmentTrend = [
  { month: 'Jan', scheduled: 310, completed: 285, cancelled: 25 },
  { month: 'Feb', scheduled: 290, completed: 260, cancelled: 30 },
  { month: 'Mar', scheduled: 380, completed: 350, cancelled: 30 },
  { month: 'Apr', scheduled: 360, completed: 330, cancelled: 30 },
  { month: 'May', scheduled: 420, completed: 390, cancelled: 30 },
  { month: 'Jun', scheduled: 350, completed: 320, cancelled: 30 },
  { month: 'Jul', scheduled: 400, completed: 370, cancelled: 30 },
  { month: 'Aug', scheduled: 460, completed: 430, cancelled: 30 },
  { month: 'Sep', scheduled: 440, completed: 400, cancelled: 40 },
  { month: 'Oct', scheduled: 410, completed: 380, cancelled: 30 },
  { month: 'Nov', scheduled: 370, completed: 340, cancelled: 30 },
  { month: 'Dec', scheduled: 390, completed: 360, cancelled: 30 },
];

// ── Department Page ──
export const departmentPerformance = [
  { name: 'Emergency', patients: 2450, avgWait: '12 min', satisfaction: 88, revenue: 1200000, beds: 45, occupancy: 92, doctors: 12, success: 94 },
  { name: 'Cardiology', patients: 1890, avgWait: '18 min', satisfaction: 92, revenue: 980000, beds: 30, occupancy: 78, doctors: 8, success: 97 },
  { name: 'Neurology', patients: 1420, avgWait: '22 min', satisfaction: 90, revenue: 850000, beds: 25, occupancy: 65, doctors: 6, success: 95 },
  { name: 'Orthopedics', patients: 1650, avgWait: '15 min', satisfaction: 91, revenue: 920000, beds: 28, occupancy: 71, doctors: 7, success: 96 },
  { name: 'Pediatrics', patients: 1200, avgWait: '10 min', satisfaction: 95, revenue: 680000, beds: 35, occupancy: 58, doctors: 5, success: 98 },
  { name: 'Oncology', patients: 980, avgWait: '25 min', satisfaction: 87, revenue: 1100000, beds: 20, occupancy: 84, doctors: 6, success: 89 },
  { name: 'ICU', patients: 650, avgWait: '5 min', satisfaction: 85, revenue: 1500000, beds: 40, occupancy: 95, doctors: 10, success: 82 },
];

// ── Payment Page ──
export const paymentRecords = [
  { id: 'INV-2001', patient: 'Sarah Johnson', department: 'Cardiology', amount: 15200, paid: 15200, status: 'Paid', date: '2024-11-28', method: 'Insurance' },
  { id: 'INV-2002', patient: 'Michael Chen', department: 'Neurology', amount: 28500, paid: 20000, status: 'Partial', date: '2024-11-25', method: 'Cash' },
  { id: 'INV-2003', patient: 'Emily Davis', department: 'Orthopedics', amount: 12800, paid: 12800, status: 'Paid', date: '2024-11-20', method: 'Card' },
  { id: 'INV-2004', patient: 'James Wilson', department: 'Emergency', amount: 45000, paid: 0, status: 'Pending', date: '2024-12-01', method: '-' },
  { id: 'INV-2005', patient: 'Maria Garcia', department: 'Oncology', amount: 62000, paid: 40000, status: 'Partial', date: '2024-11-15', method: 'Insurance' },
  { id: 'INV-2006', patient: 'Robert Brown', department: 'Pediatrics', amount: 8500, paid: 8500, status: 'Paid', date: '2024-11-10', method: 'Card' },
  { id: 'INV-2007', patient: 'Amanda Lee', department: 'Cardiology', amount: 22000, paid: 0, status: 'Pending', date: '2024-12-02', method: '-' },
  { id: 'INV-2008', patient: 'David Martinez', department: 'Neurology', amount: 18700, paid: 18700, status: 'Paid', date: '2024-11-22', method: 'Insurance' },
];

export const revenueByDepartment = [
  { department: 'Emergency', revenue: 1200000 },
  { department: 'Cardiology', revenue: 980000 },
  { department: 'Neurology', revenue: 850000 },
  { department: 'Orthopedics', revenue: 920000 },
  { department: 'Pediatrics', revenue: 680000 },
  { department: 'Oncology', revenue: 1100000 },
  { department: 'ICU', revenue: 1500000 },
];

export const monthlyRevenue = [
  { month: 'Jan', revenue: 520000, expenses: 380000 },
  { month: 'Feb', revenue: 480000, expenses: 360000 },
  { month: 'Mar', revenue: 610000, expenses: 420000 },
  { month: 'Apr', revenue: 580000, expenses: 400000 },
  { month: 'May', revenue: 650000, expenses: 440000 },
  { month: 'Jun', revenue: 540000, expenses: 390000 },
  { month: 'Jul', revenue: 600000, expenses: 410000 },
  { month: 'Aug', revenue: 720000, expenses: 480000 },
  { month: 'Sep', revenue: 690000, expenses: 460000 },
  { month: 'Oct', revenue: 640000, expenses: 430000 },
  { month: 'Nov', revenue: 580000, expenses: 400000 },
  { month: 'Dec', revenue: 710000, expenses: 470000 },
];

// ── HR Page ──
export const hrMetrics = {
  totalEmployees: 485,
  activeToday: 342,
  onLeave: 28,
  openPositions: 15,
};

export const attendanceData = [
  { month: 'Jan', present: 92, absent: 5, leave: 3 },
  { month: 'Feb', present: 90, absent: 6, leave: 4 },
  { month: 'Mar', present: 94, absent: 3, leave: 3 },
  { month: 'Apr', present: 91, absent: 5, leave: 4 },
  { month: 'May', present: 93, absent: 4, leave: 3 },
  { month: 'Jun', present: 89, absent: 6, leave: 5 },
  { month: 'Jul', present: 91, absent: 5, leave: 4 },
  { month: 'Aug', present: 88, absent: 7, leave: 5 },
  { month: 'Sep', present: 92, absent: 4, leave: 4 },
  { month: 'Oct', present: 93, absent: 4, leave: 3 },
  { month: 'Nov', present: 90, absent: 6, leave: 4 },
  { month: 'Dec', present: 87, absent: 8, leave: 5 },
];

export const hiringPipeline = [
  { role: 'Cardiologist', applicants: 24, shortlisted: 8, interviewed: 4, offered: 1 },
  { role: 'Registered Nurse', applicants: 56, shortlisted: 20, interviewed: 12, offered: 5 },
  { role: 'Lab Technician', applicants: 32, shortlisted: 12, interviewed: 6, offered: 2 },
  { role: 'Radiologist', applicants: 18, shortlisted: 6, interviewed: 3, offered: 1 },
  { role: 'Pharmacist', applicants: 28, shortlisted: 10, interviewed: 5, offered: 2 },
];

// ── Salaries Page ──
export const salaryByRole = [
  { role: 'Senior Surgeon', avgSalary: 280000, min: 220000, max: 350000, count: 15 },
  { role: 'Specialist Doctor', avgSalary: 210000, min: 170000, max: 260000, count: 28 },
  { role: 'General Physician', avgSalary: 150000, min: 120000, max: 190000, count: 22 },
  { role: 'Head Nurse', avgSalary: 85000, min: 70000, max: 100000, count: 18 },
  { role: 'Registered Nurse', avgSalary: 62000, min: 48000, max: 78000, count: 120 },
  { role: 'Lab Technician', avgSalary: 55000, min: 42000, max: 68000, count: 35 },
  { role: 'Administrative', avgSalary: 48000, min: 35000, max: 62000, count: 45 },
];

export const payrollMonthly = [
  { month: 'Jan', totalPayroll: 2100000, bonuses: 85000, overtime: 120000 },
  { month: 'Feb', totalPayroll: 2100000, bonuses: 60000, overtime: 110000 },
  { month: 'Mar', totalPayroll: 2150000, bonuses: 90000, overtime: 135000 },
  { month: 'Apr', totalPayroll: 2150000, bonuses: 70000, overtime: 125000 },
  { month: 'May', totalPayroll: 2200000, bonuses: 95000, overtime: 140000 },
  { month: 'Jun', totalPayroll: 2200000, bonuses: 75000, overtime: 115000 },
  { month: 'Jul', totalPayroll: 2250000, bonuses: 80000, overtime: 130000 },
  { month: 'Aug', totalPayroll: 2250000, bonuses: 100000, overtime: 150000 },
  { month: 'Sep', totalPayroll: 2300000, bonuses: 85000, overtime: 145000 },
  { month: 'Oct', totalPayroll: 2300000, bonuses: 90000, overtime: 135000 },
  { month: 'Nov', totalPayroll: 2350000, bonuses: 110000, overtime: 125000 },
  { month: 'Dec', totalPayroll: 2400000, bonuses: 200000, overtime: 160000 },
];

// ── Rooms Page ──
export const roomsList = [
  { id: 'R-101', type: 'General Ward', floor: 1, beds: 6, occupied: 5, status: 'Occupied', patient: 'Sarah Johnson', rate: 200 },
  { id: 'R-102', type: 'General Ward', floor: 1, beds: 6, occupied: 4, status: 'Available', patient: '-', rate: 200 },
  { id: 'R-201', type: 'Semi-Private', floor: 2, beds: 2, occupied: 2, status: 'Full', patient: 'Michael Chen', rate: 450 },
  { id: 'R-202', type: 'Private', floor: 2, beds: 1, occupied: 1, status: 'Occupied', patient: 'Emily Davis', rate: 800 },
  { id: 'R-301', type: 'ICU', floor: 3, beds: 1, occupied: 1, status: 'Critical', patient: 'James Wilson', rate: 2500 },
  { id: 'R-302', type: 'ICU', floor: 3, beds: 1, occupied: 0, status: 'Available', patient: '-', rate: 2500 },
  { id: 'R-303', type: 'ICU', floor: 3, beds: 1, occupied: 1, status: 'Critical', patient: 'Maria Garcia', rate: 2500 },
  { id: 'R-401', type: 'Operation Theater', floor: 4, beds: 1, occupied: 0, status: 'Available', patient: '-', rate: 5000 },
  { id: 'R-402', type: 'Operation Theater', floor: 4, beds: 1, occupied: 1, status: 'In Use', patient: '-', rate: 5000 },
  { id: 'R-501', type: 'VIP Suite', floor: 5, beds: 1, occupied: 1, status: 'Occupied', patient: 'Amanda Lee', rate: 1500 },
];

export const roomOccupancyByType = [
  { type: 'General Ward', total: 48, occupied: 38 },
  { type: 'Semi-Private', total: 20, occupied: 16 },
  { type: 'Private', total: 15, occupied: 12 },
  { type: 'ICU', total: 40, occupied: 38 },
  { type: 'Operation Theater', total: 8, occupied: 3 },
  { type: 'VIP Suite', total: 10, occupied: 7 },
];

// ── Ambulance Page ──
export const ambulanceFleet = [
  { id: 'AMB-01', type: 'Advanced Life Support', driver: 'John Smith', status: 'Available', location: 'Bay 1', lastService: '2024-11-15', mileage: 45200 },
  { id: 'AMB-02', type: 'Basic Life Support', driver: 'Mike Johnson', status: 'On Route', location: 'Downtown', lastService: '2024-11-20', mileage: 38900 },
  { id: 'AMB-03', type: 'Advanced Life Support', driver: 'Steve Williams', status: 'At Scene', location: 'North District', lastService: '2024-11-10', mileage: 52100 },
  { id: 'AMB-04', type: 'Basic Life Support', driver: 'Tom Davis', status: 'Available', location: 'Bay 3', lastService: '2024-11-25', mileage: 29700 },
  { id: 'AMB-05', type: 'Neonatal', driver: 'Chris Brown', status: 'Maintenance', location: 'Garage', lastService: '2024-12-01', mileage: 18500 },
  { id: 'AMB-06', type: 'Advanced Life Support', driver: 'Dan Wilson', status: 'On Route', location: 'East Side', lastService: '2024-11-18', mileage: 41300 },
];

export const responseTimeData = [
  { month: 'Jan', avgResponse: 8.2, target: 10 },
  { month: 'Feb', avgResponse: 7.8, target: 10 },
  { month: 'Mar', avgResponse: 9.1, target: 10 },
  { month: 'Apr', avgResponse: 7.5, target: 10 },
  { month: 'May', avgResponse: 8.8, target: 10 },
  { month: 'Jun', avgResponse: 9.5, target: 10 },
  { month: 'Jul', avgResponse: 8.0, target: 10 },
  { month: 'Aug', avgResponse: 7.2, target: 10 },
  { month: 'Sep', avgResponse: 8.6, target: 10 },
  { month: 'Oct', avgResponse: 7.9, target: 10 },
  { month: 'Nov', avgResponse: 8.3, target: 10 },
  { month: 'Dec', avgResponse: 9.0, target: 10 },
];

export const dispatchByHour = [
  { hour: '12AM', dispatches: 3 }, { hour: '2AM', dispatches: 2 }, { hour: '4AM', dispatches: 4 },
  { hour: '6AM', dispatches: 8 }, { hour: '8AM', dispatches: 15 }, { hour: '10AM', dispatches: 18 },
  { hour: '12PM', dispatches: 12 }, { hour: '2PM', dispatches: 14 }, { hour: '4PM', dispatches: 20 },
  { hour: '6PM', dispatches: 22 }, { hour: '8PM', dispatches: 16 }, { hour: '10PM', dispatches: 8 },
];

// ── Support Page ──
export const supportTickets = [
  { id: 'TK-3001', title: 'System login failure', priority: 'High', status: 'Open', assignee: 'IT Support', created: '2024-12-01', department: 'Emergency', category: 'Technical' },
  { id: 'TK-3002', title: 'Billing discrepancy for patient P-1002', priority: 'Medium', status: 'In Progress', assignee: 'Finance Team', created: '2024-11-30', department: 'Neurology', category: 'Billing' },
  { id: 'TK-3003', title: 'MRI machine calibration required', priority: 'High', status: 'In Progress', assignee: 'Maintenance', created: '2024-11-29', department: 'Radiology', category: 'Equipment' },
  { id: 'TK-3004', title: 'Patient complaint - wait time', priority: 'Low', status: 'Resolved', assignee: 'Patient Relations', created: '2024-11-28', department: 'Emergency', category: 'Complaint' },
  { id: 'TK-3005', title: 'Pharmacy stock shortage - insulin', priority: 'Critical', status: 'Open', assignee: 'Procurement', created: '2024-12-02', department: 'Pharmacy', category: 'Supply' },
  { id: 'TK-3006', title: 'Network outage in Ward B', priority: 'High', status: 'Resolved', assignee: 'IT Support', created: '2024-11-27', department: 'General', category: 'Technical' },
  { id: 'TK-3007', title: 'Staff scheduling conflict', priority: 'Medium', status: 'Open', assignee: 'HR Team', created: '2024-12-01', department: 'Pediatrics', category: 'HR' },
  { id: 'TK-3008', title: 'Elevator maintenance request', priority: 'Low', status: 'Scheduled', assignee: 'Maintenance', created: '2024-11-26', department: 'General', category: 'Facility' },
];

export const resolutionTrends = [
  { week: 'W1', resolved: 145, pending: 32, escalated: 8 },
  { week: 'W2', resolved: 162, pending: 28, escalated: 12 },
  { week: 'W3', resolved: 138, pending: 41, escalated: 6 },
  { week: 'W4', resolved: 175, pending: 22, escalated: 10 },
];

export const ticketsByCategory = [
  { category: 'Technical', count: 85, resolved: 72 },
  { category: 'Billing', count: 62, resolved: 55 },
  { category: 'Equipment', count: 45, resolved: 38 },
  { category: 'Complaint', count: 38, resolved: 35 },
  { category: 'Supply', count: 30, resolved: 22 },
  { category: 'HR', count: 28, resolved: 24 },
  { category: 'Facility', count: 35, resolved: 30 },
];

export const satisfactionScores = [
  { month: 'Jan', score: 4.2 }, { month: 'Feb', score: 4.1 }, { month: 'Mar', score: 4.3 },
  { month: 'Apr', score: 4.4 }, { month: 'May', score: 4.2 }, { month: 'Jun', score: 4.0 },
  { month: 'Jul', score: 4.3 }, { month: 'Aug', score: 4.5 }, { month: 'Sep', score: 4.4 },
  { month: 'Oct', score: 4.3 }, { month: 'Nov', score: 4.1 }, { month: 'Dec', score: 4.2 },
];
