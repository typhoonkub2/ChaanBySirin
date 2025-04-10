export interface Service {
  id: string
  name: string
  description: string
  duration: string
  price: number
  image: string
}

export interface Booking {
  id: string
  customerName: string
  phone: string
  email?: string
  service: string
  date: Date
  time: string
  notes?: string
  status: "pending" | "confirmed" | "cancelled"
  createdAt: Date
}

export interface Customer {
  id: string
  name: string
  phone: string
  email?: string
  bookings: string[] // Booking IDs
  createdAt: Date
}
