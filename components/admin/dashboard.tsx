"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { th } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  CalendarIcon,
  CheckCircle,
  Clock,
  Home,
  LogOut,
  Settings,
  Users,
  XCircle,
  DollarSign,
  Bed,
  Menu,
} from "lucide-react"

// Mock data for bookings
const mockBookings = [
  {
    id: "1",
    customerName: "คุณนภา วงศ์สุวรรณ",
    phone: "081-234-5678",
    service: "นวดแผนไทย",
    date: new Date(2025, 3, 10, 14, 0),
    status: "confirmed",
  },
  {
    id: "2",
    customerName: "คุณสมชาย ใจดี",
    phone: "089-876-5432",
    service: "นวดน้ำมันอโรมา",
    date: new Date(2025, 3, 10, 16, 0),
    status: "confirmed",
  },
  {
    id: "3",
    customerName: "คุณวิภา รักสุขภาพ",
    phone: "062-345-6789",
    service: "นวดกดจุด",
    date: new Date(2025, 3, 11, 10, 0),
    status: "pending",
  },
  {
    id: "4",
    customerName: "คุณประเสริฐ มั่งมี",
    phone: "091-234-5678",
    service: "แพ็คเกจพิเศษ",
    date: new Date(2025, 3, 12, 13, 0),
    status: "confirmed",
  },
  {
    id: "5",
    customerName: "คุณสุดา ดีงาม",
    phone: "084-567-8901",
    service: "นวดฝ่าเท้า",
    date: new Date(2025, 3, 12, 15, 0),
    status: "cancelled",
  },
]

export default function AdminDashboard() {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  // Filter bookings for the selected date
  const bookingsForSelectedDate = selectedDate
    ? mockBookings.filter(
        (booking) =>
          booking.date.getDate() === selectedDate.getDate() &&
          booking.date.getMonth() === selectedDate.getMonth() &&
          booking.date.getFullYear() === selectedDate.getFullYear(),
      )
    : []

  // Count bookings by status
  const confirmedCount = mockBookings.filter((b) => b.status === "confirmed").length
  const pendingCount = mockBookings.filter((b) => b.status === "pending").length
  const cancelledCount = mockBookings.filter((b) => b.status === "cancelled").length

  const handleLogout = () => {
    // In a real app, you would clear authentication state here
    router.push("/admin/login")
  }

  return (
    <div className="min-h-screen bg-navy-50">
      {/* Admin Header */}
      <header className="bg-navy-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/CHAAN_LOGO_2-02.png"
              alt="Chaan Massage by Sirin"
              width={140}
              height={56}
              className="object-contain"
            />
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-navy-100">สวัสดี, แอดมิน</span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="text-navy-100 border-navy-700 hover:bg-navy-800 hover:text-white"
            >
              <LogOut className="h-4 w-4 mr-2" />
              ออกจากระบบ
            </Button>
          </div>
        </div>
      </header>

      {/* Admin Sidebar and Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-navy-800 shadow-sm h-[calc(100vh-64px)] p-4">
          <nav className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start text-navy-100 hover:bg-navy-700 hover:text-white"
              asChild
            >
              <Link href="/admin/dashboard">
                <BarChart3 className="h-5 w-5 mr-3" />
                แดชบอร์ด
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-navy-100 hover:bg-navy-700 hover:text-white"
              asChild
            >
              <Link href="/admin/bookings">
                <CalendarIcon className="h-5 w-5 mr-3" />
                จัดการการจอง
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-navy-100 hover:bg-navy-700 hover:text-white"
              asChild
            >
              <Link href="/admin/services">
                <Menu className="h-5 w-5 mr-3" />
                จัดการบริการ
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-navy-100 hover:bg-navy-700 hover:text-white"
              asChild
            >
              <Link href="/admin/rooms">
                <Bed className="h-5 w-5 mr-3" />
                จัดการห้องนวด
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-navy-100 hover:bg-navy-700 hover:text-white"
              asChild
            >
              <Link href="/admin/staff">
                <Users className="h-5 w-5 mr-3" />
                จัดการพนักงาน
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-navy-100 hover:bg-navy-700 hover:text-white"
              asChild
            >
              <Link href="/admin/finance">
                <DollarSign className="h-5 w-5 mr-3" />
                บันทึกรายรับรายจ่าย
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-navy-100 hover:bg-navy-700 hover:text-white"
              asChild
            >
              <Link href="/admin/settings">
                <Settings className="h-5 w-5 mr-3" />
                ตั้งค่า
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-navy-100 hover:bg-navy-700 hover:text-white"
              asChild
            >
              <Link href="/">
                <Home className="h-5 w-5 mr-3" />
                ไปที่หน้าเว็บไซต์
              </Link>
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-navy-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-navy-900">แดชบอร์ด</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="bg-navy-100 border-navy-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-navy-700">การจองทั้งหมด</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-navy-900">{mockBookings.length}</div>
                  <p className="text-xs text-navy-600 mt-1">+2 จากเมื่อวาน</p>
                </CardContent>
              </Card>
              <Card className="bg-navy-100 border-navy-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-navy-700">การจองวันนี้</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-navy-900">2</div>
                  <p className="text-xs text-navy-600 mt-1">เหลืออีก 3 ช่วงเวลาว่าง</p>
                </CardContent>
              </Card>
              <Card className="bg-navy-100 border-navy-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-navy-700">รายได้ประจำเดือน</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-navy-900">฿15,200</div>
                  <p className="text-xs text-navy-600 mt-1">+12% จากเดือนที่แล้ว</p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="calendar" className="space-y-4">
              <TabsList className="mb-4 bg-navy-200">
                <TabsTrigger
                  value="calendar"
                  className="data-[state=active]:bg-gold-500 data-[state=active]:text-navy-900"
                >
                  ปฏิทินการจอง
                </TabsTrigger>
                <TabsTrigger
                  value="bookings"
                  className="data-[state=active]:bg-gold-500 data-[state=active]:text-navy-900"
                >
                  รายการจองล่าสุด
                </TabsTrigger>
              </TabsList>

              <TabsContent value="calendar">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-navy-100 border-navy-200">
                    <CardHeader>
                      <CardTitle className="text-navy-900">ปฏิทิน</CardTitle>
                      <CardDescription className="text-navy-600">เลือกวันเพื่อดูการจอง</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-md border border-navy-200 bg-navy-50"
                      />
                    </CardContent>
                  </Card>

                  <Card className="bg-navy-100 border-navy-200">
                    <CardHeader>
                      <CardTitle className="text-navy-900">
                        การจองวันที่ {selectedDate ? format(selectedDate, "d MMMM yyyy", { locale: th }) : ""}
                      </CardTitle>
                      <CardDescription className="text-navy-600">
                        {bookingsForSelectedDate.length > 0 ? `${bookingsForSelectedDate.length} การจอง` : "ไม่มีการจอง"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {bookingsForSelectedDate.length > 0 ? (
                        <div className="space-y-4">
                          {bookingsForSelectedDate.map((booking) => (
                            <div
                              key={booking.id}
                              className="flex items-center justify-between border-b border-navy-200 pb-3"
                            >
                              <div>
                                <p className="font-medium text-navy-900">{booking.customerName}</p>
                                <p className="text-sm text-navy-600">{booking.service}</p>
                                <p className="text-sm text-navy-600">
                                  {format(booking.date, "HH:mm", { locale: th })} น.
                                </p>
                              </div>
                              <div>
                                <Badge
                                  className={
                                    booking.status === "confirmed"
                                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                                      : booking.status === "pending"
                                        ? "bg-gold-100 text-gold-800 hover:bg-gold-100"
                                        : "bg-red-100 text-red-800 hover:bg-red-100"
                                  }
                                >
                                  {booking.status === "confirmed"
                                    ? "ยืนยันแล้ว"
                                    : booking.status === "pending"
                                      ? "รอยืนยัน"
                                      : "ยกเลิก"}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-40 text-center">
                          <CalendarIcon className="h-10 w-10 text-navy-300 mb-2" />
                          <p className="text-navy-600">ไม่มีการจองในวันที่เลือก</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="bookings">
                <Card className="bg-navy-100 border-navy-200">
                  <CardHeader>
                    <CardTitle className="text-navy-900">การจองล่าสุด</CardTitle>
                    <CardDescription className="text-navy-600">รายการจองทั้งหมดในระบบ</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <Card className="bg-green-50 border-green-100">
                          <CardContent className="p-4 flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                            <div>
                              <p className="text-sm font-medium text-green-800">ยืนยันแล้ว</p>
                              <p className="text-xl font-bold text-green-900">{confirmedCount}</p>
                            </div>
                          </CardContent>
                        </Card>
                        <Card className="bg-gold-50 border-gold-100">
                          <CardContent className="p-4 flex items-center">
                            <Clock className="h-5 w-5 text-gold-600 mr-2" />
                            <div>
                              <p className="text-sm font-medium text-gold-800">รอยืนยัน</p>
                              <p className="text-xl font-bold text-gold-900">{pendingCount}</p>
                            </div>
                          </CardContent>
                        </Card>
                        <Card className="bg-red-50 border-red-100">
                          <CardContent className="p-4 flex items-center">
                            <XCircle className="h-5 w-5 text-red-600 mr-2" />
                            <div>
                              <p className="text-sm font-medium text-red-800">ยกเลิก</p>
                              <p className="text-xl font-bold text-red-900">{cancelledCount}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="rounded-md border border-navy-200 bg-navy-50">
                        <div className="grid grid-cols-6 bg-navy-200 p-3 rounded-t-md">
                          <div className="col-span-2 font-medium text-navy-900">ลูกค้า</div>
                          <div className="font-medium text-navy-900">บริการ</div>
                          <div className="font-medium text-navy-900">วันที่</div>
                          <div className="font-medium text-navy-900">เวลา</div>
                          <div className="font-medium text-navy-900">สถานะ</div>
                        </div>
                        <div className="divide-y divide-navy-200">
                          {mockBookings.map((booking) => (
                            <div key={booking.id} className="grid grid-cols-6 p-3 items-center">
                              <div className="col-span-2">
                                <div className="font-medium text-navy-900">{booking.customerName}</div>
                                <div className="text-sm text-navy-600">{booking.phone}</div>
                              </div>
                              <div className="text-navy-800">{booking.service}</div>
                              <div className="text-navy-800">{format(booking.date, "d MMM yyyy", { locale: th })}</div>
                              <div className="text-navy-800">{format(booking.date, "HH:mm", { locale: th })} น.</div>
                              <div>
                                <Badge
                                  className={
                                    booking.status === "confirmed"
                                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                                      : booking.status === "pending"
                                        ? "bg-gold-100 text-gold-800 hover:bg-gold-100"
                                        : "bg-red-100 text-red-800 hover:bg-red-100"
                                  }
                                >
                                  {booking.status === "confirmed"
                                    ? "ยืนยันแล้ว"
                                    : booking.status === "pending"
                                      ? "รอยืนยัน"
                                      : "ยกเลิก"}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
