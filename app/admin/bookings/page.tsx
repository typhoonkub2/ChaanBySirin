"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { format, addDays, subDays, parseISO, isSameDay, isToday } from "date-fns"
import { th } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Settings, Plus } from "lucide-react"
import AdminLayout from "@/components/admin/layout"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

// Mock data for staff
const mockStaff = [
  {
    id: "1",
    name: "คุณสมศรี",
    avatar: "/serene-massage.png",
    color: "#c7d2fe",
    workingHours: {
      start: 10, // เริ่มทำงาน 10:00 น.
      end: 18, // เลิกงาน 18:00 น.
      workingDays: [1, 3, 5, 6], // จันทร์, พุธ, ศุกร์, เสาร์ (0 = อาทิตย์, 1 = จันทร์, ...)
    },
  },
  {
    id: "2",
    name: "คุณวิภา",
    avatar: "/serene-massage.png",
    color: "#bfdbfe",
    workingHours: {
      start: 10,
      end: 18,
      workingDays: [2, 4, 6, 0], // อังคาร, พฤหัส, เสาร์, อาทิตย์
    },
  },
  {
    id: "3",
    name: "คุณนิภา",
    avatar: "/serene-thai-massage.png",
    color: "#ddd6fe",
    workingHours: {
      start: 12,
      end: 20,
      workingDays: [1, 3, 5, 0], // จันทร์, พุธ, ศุกร์, อาทิตย์
    },
  },
  {
    id: "4",
    name: "คุณปราณี",
    avatar: "/empathetic-therapy-session.png",
    color: "#fecaca",
    workingHours: {
      start: 12,
      end: 20,
      workingDays: [2, 4, 6, 0], // อังคาร, พฤหัส, เสาร์, อาทิตย์
    },
  },
]

// Mock data for rooms
const mockRooms = [
  { id: "1", name: "ห้อง 1", type: "ห้องนวดทั่วไป" },
  { id: "2", name: "ห้อง 2", type: "ห้องนวดทั่วไป" },
  { id: "3", name: "ห้อง 3", type: "ห้องนวดน้ำมัน" },
  { id: "4", name: "ห้อง 4", type: "ห้องนวดเท้า" },
  { id: "5", name: "ห้อง VIP", type: "ห้องนวด VIP" },
]

// Mock data for bookings
const mockBookings = [
  {
    id: "1",
    customerId: "c1",
    customerName: "คุณนภา วงศ์สุวรรณ",
    phone: "081-234-5678",
    email: "napa@example.com",
    serviceId: "s1",
    serviceName: "นวดแผนไทย",
    startTime: "2025-04-09T14:00:00",
    endTime: "2025-04-09T15:00:00",
    staffId: "1",
    roomId: "1",
    status: "confirmed",
    notes: "ลูกค้าแพ้น้ำมันมะพร้าว",
    price: 500,
  },
  {
    id: "2",
    customerId: "c2",
    customerName: "คุณสมชาย ใจดี",
    phone: "089-876-5432",
    email: "somchai@example.com",
    serviceId: "s2",
    serviceName: "นวดน้ำมันอโรมา",
    startTime: "2025-04-09T16:00:00",
    endTime: "2025-04-09T17:30:00",
    staffId: "2",
    roomId: "3",
    status: "confirmed",
    notes: "",
    price: 800,
  },
  {
    id: "3",
    customerId: "c3",
    customerName: "คุณวิภา รักสุขภาพ",
    phone: "062-345-6789",
    email: "",
    serviceId: "s3",
    serviceName: "นวดกดจุด",
    startTime: "2025-04-09T10:00:00",
    endTime: "2025-04-09T11:00:00",
    staffId: "3",
    roomId: "2",
    status: "pending",
    notes: "ลูกค้าต้องการหมอนเสริม",
    price: 600,
  },
  {
    id: "4",
    customerId: "c4",
    customerName: "คุณประเสริฐ มั่งมี",
    phone: "091-234-5678",
    email: "prasert@example.com",
    serviceId: "s6",
    serviceName: "แพ็คเกจพิเศษ",
    startTime: "2025-04-09T17:00:00",
    endTime: "2025-04-09T19:00:00",
    staffId: "3",
    roomId: "5",
    status: "confirmed",
    notes: "",
    price: 1200,
  },
  {
    id: "5",
    customerId: "c5",
    customerName: "คุณสุดา ดีงาม",
    phone: "084-567-8901",
    email: "suda@example.com",
    serviceId: "s5",
    serviceName: "นวดฝ่าเท้า",
    startTime: "2025-04-09T19:00:00",
    endTime: "2025-04-09T19:45:00",
    staffId: "2",
    roomId: "4",
    status: "confirmed",
    notes: "",
    price: 400,
  },
  {
    id: "6",
    customerId: "c6",
    customerName: "คุณมานี มีสุข",
    phone: "095-678-1234",
    email: "manee@example.com",
    serviceId: "s4",
    serviceName: "นวดศีรษะ ไหล่ และคอ",
    startTime: "2025-04-10T13:00:00",
    endTime: "2025-04-10T13:45:00",
    staffId: "1",
    roomId: "2",
    status: "confirmed",
    notes: "",
    price: 400,
  },
  // เพิ่มการจองในช่วงเวลากลางคืน
  {
    id: "7",
    customerId: "c7",
    customerName: "คุณสมหมาย นอนดึก",
    phone: "098-765-4321",
    email: "somsommai@example.com",
    serviceId: "s1",
    serviceName: "นวดแผนไทย",
    startTime: "2025-04-09T23:00:00",
    endTime: "2025-04-10T00:00:00",
    staffId: "4",
    roomId: "1",
    status: "confirmed",
    notes: "ลูกค้าต้องการนวดช่วงดึก",
    price: 500,
  },
  {
    id: "8",
    customerId: "c8",
    customerName: "คุณเช้าตรู่ ตื่นเช้า",
    phone: "087-654-3210",
    email: "earlybird@example.com",
    serviceId: "s2",
    serviceName: "นวดน้ำมันอโรมา",
    startTime: "2025-04-09T06:00:00",
    endTime: "2025-04-09T07:30:00",
    staffId: "1",
    roomId: "3",
    status: "confirmed",
    notes: "ลูกค้าต้องการนวดช่วงเช้าตรู่",
    price: 800,
  },
]

// Mock data for services
const mockServices = [
  { id: "s1", name: "นวดแผนไทย", duration: 60, price: 500 },
  { id: "s2", name: "นวดน้ำมันอโรมา", duration: 90, price: 800 },
  { id: "s3", name: "นวดกดจุด", duration: 60, price: 600 },
  { id: "s4", name: "นวดศีรษะ ไหล่ และคอ", duration: 45, price: 400 },
  { id: "s5", name: "นวดฝ่าเท้า", duration: 45, price: 400 },
  { id: "s6", name: "แพ็คเกจพิเศษ", duration: 120, price: 1200 },
]

// Time slots for 24 hours
const timeSlots = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, "0")
  return `${hour}:00`
})

// ฟังก์ชันตรวจสอบว่าช่วงเวลาใดเป็นเวลาทำงานของพนักงานหรือไม่
const isWorkingHour = (staff: any, date: Date, hour: number): boolean => {
  // ตรวจสอบว่าเป็นวันทำงานของพนักงานหรือไม่
  const dayOfWeek = date.getDay() // 0 = อาทิตย์, 1 = จันทร์, ...
  if (!staff.workingHours.workingDays.includes(dayOfWeek)) {
    return false
  }

  // ตรวจสอบว่าเป็นเวลาทำงานของพนักงานหรือไม่
  return hour >= staff.workingHours.start && hour < staff.workingHours.end
}

export default function BookingsPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<"staff" | "room">("staff")
  const [selectedStaff, setSelectedStaff] = useState<string>("all")
  const [isNewBookingDialogOpen, setIsNewBookingDialogOpen] = useState(false)
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [scrollPosition, setScrollPosition] = useState(0)
  const gridContainerRef = useRef<HTMLDivElement>(null)

  // อัพเดตเวลาปัจจุบันทุก 1 นาที
  useEffect(() => {
    // อัพเดตทันทีเมื่อโหลดคอมโพเนนต์
    setCurrentTime(new Date())

    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000) // 60000 ms = 1 นาที

    return () => clearInterval(interval)
  }, [])

  // ติดตามตำแหน่งการ scroll
  useEffect(() => {
    const handleScroll = () => {
      if (gridContainerRef.current) {
        setScrollPosition(gridContainerRef.current.scrollTop)
      }
    }

    const container = gridContainerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll)
      return () => {
        container.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  // คำนวณตำแหน่งของเส้นเวลาปัจจุบัน
  const calculateCurrentTimePosition = () => {
    const hours = currentTime.getHours()
    const minutes = currentTime.getMinutes()

    // คำนวณตำแหน่งเป็นเปอร์เซ็นต์ของวัน (24 ชั่วโมง)
    const totalMinutesInDay = 24 * 60 // 24 ชั่วโมง = 1440 นาที
    const minutesSinceMidnight = hours * 60 + minutes

    return (minutesSinceMidnight / totalMinutesInDay) * 100
  }

  const currentTimePosition = calculateCurrentTimePosition()

  // Filter bookings for the selected date
  const bookingsForSelectedDate = mockBookings.filter((booking) => {
    const bookingDate = parseISO(booking.startTime)
    return isSameDay(bookingDate, selectedDate)
  })

  const handlePreviousDay = () => {
    setSelectedDate((prev) => subDays(prev, 1))
  }

  const handleNextDay = () => {
    setSelectedDate((prev) => addDays(prev, 1))
  }

  const handleToday = () => {
    setSelectedDate(new Date())
  }

  const getBookingsForTimeSlotAndResource = (timeSlot: string, resourceId: string) => {
    const [hour] = timeSlot.split(":")
    const startHour = Number.parseInt(hour, 10)

    return bookingsForSelectedDate.filter((booking) => {
      const bookingStartTime = parseISO(booking.startTime)
      const bookingStartHour = bookingStartTime.getHours()

      const isForResource = viewMode === "staff" ? booking.staffId === resourceId : booking.roomId === resourceId

      return isForResource && bookingStartHour === startHour
    })
  }

  const getBookingDurationInHours = (booking: any) => {
    const start = parseISO(booking.startTime)
    const end = parseISO(booking.endTime)
    return (end.getTime() - start.getTime()) / (1000 * 60 * 60)
  }

  const getBookingStartMinutes = (booking: any) => {
    const start = parseISO(booking.startTime)
    return start.getMinutes()
  }

  const getResourceList = () => {
    if (viewMode === "staff") {
      if (selectedStaff === "all") {
        return mockStaff
      }
      return mockStaff.filter((staff) => staff.id === selectedStaff)
    } else {
      return mockRooms
    }
  }

  const resources = getResourceList()

  // คำนวณตำแหน่งของเส้นเวลาปัจจุบันโดยคำนึงถึงการ scroll
  const getCurrentTimeIndicatorStyle = () => {
    const headerHeight = 80 // ความสูงของส่วนหัวตาราง
    const timeSlotHeight = 60 // ความสูงของแต่ละช่วงเวลา

    const hours = currentTime.getHours()
    const minutes = currentTime.getMinutes()

    // คำนวณตำแหน่งจากจำนวนชั่วโมงและนาที
    const hourPosition = hours * timeSlotHeight
    const minutePosition = (minutes / 60) * timeSlotHeight

    return {
      top: `${headerHeight + hourPosition + minutePosition}px`,
      zIndex: 20,
    }
  }

  // ฟังก์ชันเลื่อนไปยังเวลาปัจจุบัน
  const scrollToCurrentTime = () => {
    if (gridContainerRef.current) {
      const hours = currentTime.getHours()
      const timeSlotHeight = 60 // ความสูงของแต่ละช่วงเวลา
      const headerHeight = 80 // ความสูงของส่วนหัวตาราง

      // คำนวณตำแหน่งที่ต้องเลื่อนไป (ลบด้วยความสูงบางส่วนเพื่อให้เห็นช่วงเวลาก่อนหน้า)
      const scrollPosition = hours * timeSlotHeight - 120

      gridContainerRef.current.scrollTop = Math.max(0, scrollPosition)
    }
  }

  // เลื่อนไปยังเวลาปัจจุบันเมื่อกดปุ่ม "วันนี้"
  useEffect(() => {
    if (isToday(selectedDate)) {
      scrollToCurrentTime()
    }
  }, [selectedDate])

  return (
    <AdminLayout>
      <div className="max-w-full mx-auto">
        <div className="flex flex-col space-y-4">
          {/* Header Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 sticky top-0 z-20 bg-navy-50 py-4">
            <div className="flex items-center space-x-2">
              <Button variant="outline" className="rounded-full bg-white hover:bg-navy-50" onClick={handleToday}>
                วันนี้
              </Button>

              <div className="flex items-center border rounded-full overflow-hidden">
                <Button variant="ghost" size="icon" onClick={handlePreviousDay} className="rounded-none border-r">
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" className="min-w-[140px] justify-center font-normal">
                      {format(selectedDate, "EEE d MMM", { locale: th })}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        if (date) {
                          setSelectedDate(date)
                          setIsDatePickerOpen(false)
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <Button variant="ghost" size="icon" onClick={handleNextDay} className="rounded-none border-l">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <Select value={viewMode} onValueChange={(value: "staff" | "room") => setViewMode(value)}>
                <SelectTrigger className="w-[180px] bg-white">
                  <SelectValue placeholder="เลือกมุมมอง" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="staff">มุมมองตามพนักงาน</SelectItem>
                  <SelectItem value="room">มุมมองตามห้อง</SelectItem>
                </SelectContent>
              </Select>

              {viewMode === "staff" && (
                <Select value={selectedStaff} onValueChange={setSelectedStaff}>
                  <SelectTrigger className="w-[180px] bg-white">
                    <SelectValue placeholder="เลือกพนักงาน" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">พนักงานทั้งหมด</SelectItem>
                    {mockStaff.map((staff) => (
                      <SelectItem key={staff.id} value={staff.id}>
                        {staff.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" className="rounded-full bg-white">
                <Settings className="h-4 w-4" />
              </Button>

              <Dialog open={isNewBookingDialogOpen} onOpenChange={setIsNewBookingDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gold-500 hover:bg-gold-600 text-navy-900">
                    <Plus className="h-4 w-4 mr-2" />
                    เพิ่มการจอง
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-navy-50 border-navy-200">
                  <DialogHeader>
                    <DialogTitle className="text-navy-900">เพิ่มการจองใหม่</DialogTitle>
                  </DialogHeader>
                  <NewBookingForm
                    onSubmit={() => setIsNewBookingDialogOpen(false)}
                    onCancel={() => setIsNewBookingDialogOpen(false)}
                    staff={mockStaff}
                    rooms={mockRooms}
                    services={mockServices}
                    selectedDate={selectedDate}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="bg-white rounded-md border shadow-sm overflow-hidden">
            <div className="min-w-[800px] relative">
              {/* Resource Headers - Fixed */}
              <div
                className="grid sticky top-0 z-10 bg-white"
                style={{ gridTemplateColumns: `80px repeat(${resources.length}, 1fr)` }}
              >
                <div className="border-b border-r h-20"></div>
                {resources.map((resource) => (
                  <div key={resource.id} className="border-b p-2 flex flex-col items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-1 overflow-hidden">
                      {viewMode === "staff" && (
                        <div
                          className="text-2xl font-bold text-blue-500"
                          style={{ backgroundColor: (resource as any).color }}
                        >
                          {resource.name.charAt(0)}
                        </div>
                      )}
                      {viewMode === "room" && (
                        <div className="text-2xl font-bold text-blue-500">{resource.name.split(" ")[1]}</div>
                      )}
                    </div>
                    <div className="text-sm font-medium text-center">{resource.name}</div>
                  </div>
                ))}
              </div>

              {/* Scrollable Time Slots Container */}
              <div ref={gridContainerRef} className="overflow-y-auto" style={{ height: "calc(100vh - 200px)" }}>
                {/* Time Slots */}
                {timeSlots.map((timeSlot) => (
                  <div
                    key={timeSlot}
                    className="grid"
                    style={{ gridTemplateColumns: `80px repeat(${resources.length}, 1fr)` }}
                  >
                    <div className="border-r border-b p-2 text-sm text-gray-500 -mt-2.5 sticky left-0 bg-white z-[5]">
                      {timeSlot}
                    </div>

                    {resources.map((resource) => {
                      const bookings = getBookingsForTimeSlotAndResource(timeSlot, resource.id)
                      const hour = Number.parseInt(timeSlot.split(":")[0], 10)

                      // ตรวจสอบว่าเป็นเวลาทำงานของพนักงานหรือไม่ (เฉพาะในมุมมองตามพนักงาน)
                      const isWorkingTime = viewMode === "staff" ? isWorkingHour(resource, selectedDate, hour) : true // ในมุมมองตามห้อง ไม่ต้องตรวจสอบเวลาทำงาน

                      return (
                        <div
                          key={`${timeSlot}-${resource.id}`}
                          className={`border-b min-h-[60px] relative ${!isWorkingTime ? "bg-gray-100" : ""}`}
                        >
                          {bookings.map((booking) => {
                            const durationHours = getBookingDurationInHours(booking)
                            const startMinutes = getBookingStartMinutes(booking)
                            const startPercentage = (startMinutes / 60) * 100
                            const heightPercentage = durationHours * 100 - 2 // -2 for border

                            const staff = mockStaff.find((s) => s.id === booking.staffId)
                            const backgroundColor =
                              viewMode === "staff"
                                ? booking.status === "confirmed"
                                  ? (staff as any).color
                                  : "#f3f4f6"
                                : booking.status === "confirmed"
                                  ? "#c7d2fe"
                                  : "#f3f4f6"

                            return (
                              <div
                                key={booking.id}
                                className="absolute left-0 right-0 mx-1 rounded overflow-hidden border shadow-sm cursor-pointer hover:brightness-95 transition-all"
                                style={{
                                  top: `${startPercentage}%`,
                                  height: `${heightPercentage}%`,
                                  backgroundColor,
                                  borderColor: booking.status === "confirmed" ? "transparent" : "#d1d5db",
                                }}
                                onClick={() => {
                                  // Handle booking click
                                  console.log("Booking clicked:", booking)
                                }}
                              >
                                <div className="p-1 text-xs">
                                  <div className="font-medium truncate">
                                    {format(parseISO(booking.startTime), "HH:mm")} -{" "}
                                    {format(parseISO(booking.endTime), "HH:mm")}
                                  </div>
                                  <div className="truncate">{booking.serviceName}</div>
                                  <div className="truncate">{booking.customerName}</div>
                                  {viewMode === "room" && (
                                    <div className="truncate text-xs opacity-75">
                                      {mockStaff.find((s) => s.id === booking.staffId)?.name}
                                    </div>
                                  )}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>

              {/* Current Time Indicator - แสดงเฉพาะเมื่อวันที่ที่เลือกเป็นวันปัจจุบัน */}
              {isToday(selectedDate) && (
                <div className="absolute left-0 right-0 pointer-events-none" style={getCurrentTimeIndicatorStyle()}>
                  <div className="flex items-center w-full">
                    <div className="w-[80px] flex items-center justify-end pr-2">
                      <div className="h-4 w-4 rounded-full bg-red-500 animate-pulse"></div>
                    </div>
                    <div className="h-[2px] bg-red-500 flex-1"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

function NewBookingForm({ onSubmit, onCancel, staff, rooms, services, selectedDate }: any) {
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    email: "",
    serviceId: "",
    date: selectedDate,
    startTime: "10:00",
    staffId: "",
    roomId: "",
    notes: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setFormData((prev) => ({ ...prev, date }))
    }
  }

  const handleServiceChange = (value: string) => {
    setFormData((prev) => ({ ...prev, serviceId: value }))
  }

  const handleStaffChange = (value: string) => {
    setFormData((prev) => ({ ...prev, staffId: value }))
  }

  const handleRoomChange = (value: string) => {
    setFormData((prev) => ({ ...prev, roomId: value }))
  }

  const handleTimeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, startTime: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    onSubmit(formData)
  }

  // Generate time options for 24 hours in 15-minute intervals
  const timeOptions = []
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const formattedHour = hour.toString().padStart(2, "0")
      const formattedMinute = minute.toString().padStart(2, "0")
      timeOptions.push(`${formattedHour}:${formattedMinute}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="customerName" className="text-navy-800">
            ชื่อลูกค้า
          </Label>
          <Input
            id="customerName"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            className="bg-navy-100 border-navy-200"
            required
          />
        </div>
        <div>
          <Label htmlFor="phone" className="text-navy-800">
            เบอร์โทรศัพท์
          </Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="bg-navy-100 border-navy-200"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="email" className="text-navy-800">
          อีเมล (ไม่บังคับ)
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="bg-navy-100 border-navy-200"
        />
      </div>

      <div>
        <Label htmlFor="service" className="text-navy-800">
          บริการ
        </Label>
        <Select value={formData.serviceId} onValueChange={handleServiceChange}>
          <SelectTrigger id="service" className="bg-navy-50 border-navy-200">
            <SelectValue placeholder="เลือกบริการ" />
          </SelectTrigger>
          <SelectContent>
            {services.map((service: any) => (
              <SelectItem key={service.id} value={service.id}>
                {service.name} ({service.duration} นาที, {service.price} บาท)
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="date" className="text-navy-800">
            วันที่
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal bg-navy-50 border-navy-200",
                  !formData.date && "text-muted-foreground",
                )}
              >
                <ChevronRight className="mr-2 h-4 w-4" />
                {formData.date ? format(formData.date, "PPP", { locale: th }) : <span>เลือกวันที่</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={formData.date} onSelect={handleDateSelect} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label htmlFor="time" className="text-navy-800">
            เวลา
          </Label>
          <Select value={formData.startTime} onValueChange={handleTimeChange}>
            <SelectTrigger id="time" className="bg-navy-50 border-navy-200">
              <SelectValue placeholder="เลือกเวลา" />
            </SelectTrigger>
            <SelectContent>
              {timeOptions.map((time) => (
                <SelectItem key={time} value={time}>
                  {time} น.
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="staff" className="text-navy-800">
            พนักงานนวด
          </Label>
          <Select value={formData.staffId} onValueChange={handleStaffChange}>
            <SelectTrigger id="staff" className="bg-navy-50 border-navy-200">
              <SelectValue placeholder="เลือกพนักงาน" />
            </SelectTrigger>
            <SelectContent>
              {staff.map((s: any) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="room" className="text-navy-800">
            ห้อง
          </Label>
          <Select value={formData.roomId} onValueChange={handleRoomChange}>
            <SelectTrigger id="room" className="bg-navy-50 border-navy-200">
              <SelectValue placeholder="เลือกห้อง" />
            </SelectTrigger>
            <SelectContent>
              {rooms.map((room: any) => (
                <SelectItem key={room.id} value={room.id}>
                  {room.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="notes" className="text-navy-800">
          หมายเหตุ (ไม่บังคับ)
        </Label>
        <Textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="bg-navy-100 border-navy-200"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="submit" className="bg-gold-500 hover:bg-gold-600 text-navy-900">
          บันทึกการจอง
        </Button>
        <Button
          type="button"
          variant="outline"
          className="border-navy-300 text-navy-800 hover:bg-navy-200"
          onClick={onCancel}
        >
          ยกเลิก
        </Button>
      </div>
    </form>
  )
}
