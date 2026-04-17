// Mock data for the clinic
export type DoctorTier = "blue" | "green";

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  tier: DoctorTier; // blue = senior, green = junior
  email: string;
  phone: string;
  patients: number;
  status: "active" | "on-leave";
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female";
  phone: string;
  email: string;
  lastVisit: string;
  doctor: string;
  status: "active" | "discharged" | "pending";
  bloodGroup: string;
}

export interface Appointment {
  id: string;
  patient: string;
  doctorId: string;
  doctorName: string;
  tier: DoctorTier;
  time: string; // HH:mm
  date: string; // YYYY-MM-DD
  reason: string;
  status: "confirmed" | "pending" | "completed" | "cancelled";
}

export interface Ward {
  id: string;
  number: string;
  type: "General" | "Private" | "ICU" | "Maternity";
  floor: number;
  status: "free" | "occupied" | "cleaning";
  patient?: string;
}

export interface Invoice {
  id: string;
  patient: string;
  amount: number;
  date: string;
  service: string;
  status: "paid" | "pending" | "overdue";
}

export const doctors: Doctor[] = [
  { id: "d1", name: "Dr. Adaeze Okonkwo", specialization: "Cardiology", tier: "blue", email: "a.okonkwo@medicore.com", phone: "+234 803 111 2233", patients: 142, status: "active" },
  { id: "d2", name: "Dr. James Carter", specialization: "Neurology", tier: "blue", email: "j.carter@medicore.com", phone: "+234 803 222 3344", patients: 98, status: "active" },
  { id: "d3", name: "Dr. Priya Menon", specialization: "Pediatrics", tier: "green", email: "p.menon@medicore.com", phone: "+234 803 333 4455", patients: 64, status: "active" },
  { id: "d4", name: "Dr. Tunde Bello", specialization: "Orthopedics", tier: "blue", email: "t.bello@medicore.com", phone: "+234 803 444 5566", patients: 121, status: "on-leave" },
  { id: "d5", name: "Dr. Sara Ahmed", specialization: "Dermatology", tier: "green", email: "s.ahmed@medicore.com", phone: "+234 803 555 6677", patients: 45, status: "active" },
  { id: "d6", name: "Dr. Michael Lee", specialization: "General Practice", tier: "green", email: "m.lee@medicore.com", phone: "+234 803 666 7788", patients: 88, status: "active" },
];

export const patients: Patient[] = [
  { id: "p1", name: "Emeka Johnson", age: 34, gender: "Male", phone: "+234 802 100 1001", email: "emeka.j@mail.com", lastVisit: "2025-04-12", doctor: "Dr. Adaeze Okonkwo", status: "active", bloodGroup: "O+" },
  { id: "p2", name: "Linda Williams", age: 28, gender: "Female", phone: "+234 802 100 1002", email: "linda.w@mail.com", lastVisit: "2025-04-10", doctor: "Dr. Priya Menon", status: "active", bloodGroup: "A+" },
  { id: "p3", name: "Robert Smith", age: 56, gender: "Male", phone: "+234 802 100 1003", email: "rob.s@mail.com", lastVisit: "2025-04-08", doctor: "Dr. James Carter", status: "discharged", bloodGroup: "B+" },
  { id: "p4", name: "Aisha Bello", age: 41, gender: "Female", phone: "+234 802 100 1004", email: "aisha.b@mail.com", lastVisit: "2025-04-15", doctor: "Dr. Tunde Bello", status: "pending", bloodGroup: "AB+" },
  { id: "p5", name: "David Chen", age: 19, gender: "Male", phone: "+234 802 100 1005", email: "d.chen@mail.com", lastVisit: "2025-04-14", doctor: "Dr. Michael Lee", status: "active", bloodGroup: "O-" },
  { id: "p6", name: "Grace Adeyemi", age: 62, gender: "Female", phone: "+234 802 100 1006", email: "g.ade@mail.com", lastVisit: "2025-04-11", doctor: "Dr. Adaeze Okonkwo", status: "active", bloodGroup: "A-" },
  { id: "p7", name: "Kemi Olu", age: 7, gender: "Female", phone: "+234 802 100 1007", email: "kemi.o@mail.com", lastVisit: "2025-04-09", doctor: "Dr. Priya Menon", status: "active", bloodGroup: "B-" },
  { id: "p8", name: "Marcus Allen", age: 45, gender: "Male", phone: "+234 802 100 1008", email: "marcus.a@mail.com", lastVisit: "2025-04-13", doctor: "Dr. Sara Ahmed", status: "pending", bloodGroup: "O+" },
];

export const appointments: Appointment[] = [
  { id: "a1", patient: "Emeka Johnson", doctorId: "d1", doctorName: "Dr. Adaeze Okonkwo", tier: "blue", time: "09:00", date: "2025-04-17", reason: "Cardio follow-up", status: "confirmed" },
  { id: "a2", patient: "Linda Williams", doctorId: "d3", doctorName: "Dr. Priya Menon", tier: "green", time: "09:30", date: "2025-04-17", reason: "Child check-up", status: "confirmed" },
  { id: "a3", patient: "Robert Smith", doctorId: "d2", doctorName: "Dr. James Carter", tier: "blue", time: "10:00", date: "2025-04-17", reason: "Migraine consult", status: "completed" },
  { id: "a4", patient: "Aisha Bello", doctorId: "d4", doctorName: "Dr. Tunde Bello", tier: "blue", time: "11:00", date: "2025-04-17", reason: "Knee pain", status: "pending" },
  { id: "a5", patient: "David Chen", doctorId: "d6", doctorName: "Dr. Michael Lee", tier: "green", time: "13:30", date: "2025-04-17", reason: "Fever", status: "confirmed" },
  { id: "a6", patient: "Grace Adeyemi", doctorId: "d1", doctorName: "Dr. Adaeze Okonkwo", tier: "blue", time: "14:30", date: "2025-04-17", reason: "BP review", status: "confirmed" },
  { id: "a7", patient: "Marcus Allen", doctorId: "d5", doctorName: "Dr. Sara Ahmed", tier: "green", time: "15:00", date: "2025-04-17", reason: "Skin rash", status: "pending" },
  { id: "a8", patient: "Kemi Olu", doctorId: "d3", doctorName: "Dr. Priya Menon", tier: "green", time: "16:00", date: "2025-04-17", reason: "Vaccination", status: "cancelled" },
];

export const wards: Ward[] = Array.from({ length: 24 }).map((_, i) => {
  const types: Ward["type"][] = ["General", "Private", "ICU", "Maternity"];
  const statuses: Ward["status"][] = ["free", "occupied", "occupied", "free", "cleaning", "free"];
  const status = statuses[i % statuses.length];
  return {
    id: `w${i + 1}`,
    number: `W-${100 + i}`,
    type: types[i % types.length],
    floor: Math.floor(i / 8) + 1,
    status,
    patient: status === "occupied" ? patients[i % patients.length].name : undefined,
  };
});

export const invoices: Invoice[] = [
  { id: "INV-1024", patient: "Emeka Johnson", amount: 45000, date: "2025-04-12", service: "Cardio consult + ECG", status: "paid" },
  { id: "INV-1025", patient: "Linda Williams", amount: 12000, date: "2025-04-10", service: "Pediatric check-up", status: "paid" },
  { id: "INV-1026", patient: "Aisha Bello", amount: 78000, date: "2025-04-15", service: "X-Ray + Consult", status: "pending" },
  { id: "INV-1027", patient: "David Chen", amount: 8500, date: "2025-04-14", service: "GP Consult", status: "paid" },
  { id: "INV-1028", patient: "Grace Adeyemi", amount: 32000, date: "2025-04-11", service: "BP review + Meds", status: "overdue" },
  { id: "INV-1029", patient: "Marcus Allen", amount: 15000, date: "2025-04-13", service: "Dermatology consult", status: "pending" },
];

export const appointmentTrend = [
  { day: "Mon", appointments: 24, completed: 20 },
  { day: "Tue", appointments: 32, completed: 28 },
  { day: "Wed", appointments: 28, completed: 26 },
  { day: "Thu", appointments: 41, completed: 35 },
  { day: "Fri", appointments: 38, completed: 33 },
  { day: "Sat", appointments: 22, completed: 19 },
  { day: "Sun", appointments: 12, completed: 10 },
];

export const revenueTrend = [
  { month: "Nov", revenue: 1.8 },
  { month: "Dec", revenue: 2.1 },
  { month: "Jan", revenue: 2.4 },
  { month: "Feb", revenue: 2.2 },
  { month: "Mar", revenue: 2.9 },
  { month: "Apr", revenue: 3.4 },
];

export const recentActivity = [
  { id: 1, who: "Dr. Adaeze Okonkwo", action: "completed appointment with", target: "Emeka Johnson", time: "5m ago", tier: "blue" as DoctorTier },
  { id: 2, who: "Receptionist Tola", action: "scheduled appointment for", target: "Aisha Bello", time: "18m ago" },
  { id: 3, who: "Dr. Priya Menon", action: "added prescription for", target: "Kemi Olu", time: "32m ago", tier: "green" as DoctorTier },
  { id: 4, who: "Billing", action: "issued invoice", target: "INV-1029", time: "1h ago" },
  { id: 5, who: "Ward W-104", action: "marked as", target: "cleaning", time: "2h ago" },
];
