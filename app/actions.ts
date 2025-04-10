"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import type { Booking } from "@/lib/types"

// In a real application, this would interact with a database
// For now, we'll just simulate the booking process

export async function createBooking(formData: FormData) {
  // Simulate server processing time
  await new Promise((resolve) => setTimeout(resolve, 1500))

  const service = formData.get("service") as string
  const date = formData.get("date") as string
  const time = formData.get("time") as string
  const name = formData.get("name") as string
  const phone = formData.get("phone") as string
  const email = formData.get("email") as string
  const notes = formData.get("notes") as string

  // Validate the data
  if (!service || !date || !time || !name || !phone) {
    return {
      error: "กรุณากรอกข้อมูลให้ครบถ้วน",
    }
  }

  // In a real app, you would save this to a database
  const booking: Partial<Booking> = {
    id: Math.random().toString(36).substring(2, 9),
    customerName: name,
    phone,
    email: email || undefined,
    service,
    date: new Date(date),
    time,
    notes: notes || undefined,
    status: "pending",
    createdAt: new Date(),
  }

  console.log("Created booking:", booking)

  // Revalidate the bookings page to show the new booking
  revalidatePath("/admin/bookings")

  // Redirect to confirmation page
  redirect("/booking/confirmation")
}

export async function updateBookingStatus(id: string, status: "confirmed" | "cancelled") {
  // Simulate server processing time
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // In a real app, you would update the booking in the database
  console.log(`Updated booking ${id} status to ${status}`)

  // Revalidate the bookings page to show the updated booking
  revalidatePath("/admin/bookings")

  return { success: true }
}
