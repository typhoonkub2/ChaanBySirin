"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Plus, Edit, Trash2, Phone, Mail, Clock } from "lucide-react"
import { format } from "date-fns"
import { th } from "date-fns/locale"
import AdminLayout from "@/components/admin/layout"

// Mock data for staff
const mockStaff = [
  {
    id: "1",
    name: "คุณสมศรี ใจดี",
    position: "พนักงานนวดอาวุโส",
    phone: "081-234-5678",
    email: "somsri@example.com",
    specialties: ["นวดแผนไทย", "นวดน้ำมันอโรมา", "นวดกดจุด"],
    experience: "10 ปี",
    status: "active",
    image: "/serene-massage.png",
    schedule: [
      { day: "จันทร์", time: "10:00 - 18:00" },
      { day: "พุธ", time: "10:00 - 18:00" },
      { day: "ศุกร์", time: "10:00 - 18:00" },
      { day: "เสาร์", time: "12:00 - 20:00" },
    ],
  },
  {
    id: "2",
    name: "คุณวิภา สุขใจ",
    position: "พนักงานนวด",
    phone: "089-876-5432",
    email: "wipa@example.com",
    specialties: ["นวดน้ำมันอโรมา", "นวดศีรษะ ไหล่ และคอ"],
    experience: "5 ปี",
    status: "active",
    image: "/serene-massage.png",
    schedule: [
      { day: "อังคาร", time: "10:00 - 18:00" },
      { day: "พฤหัสบดี", time: "10:00 - 18:00" },
      { day: "เสาร์", time: "10:00 - 18:00" },
      { day: "อาทิตย์", time: "12:00 - 20:00" },
    ],
  },
  {
    id: "3",
    name: "คุณนิภา รักสุขภาพ",
    position: "พนักงานนวด",
    phone: "062-345-6789",
    email: "nipa@example.com",
    specialties: ["นวดฝ่าเท้า", "นวดกดจุด"],
    experience: "3 ปี",
    status: "active",
    image: "/serene-thai-massage.png",
    schedule: [
      { day: "จันทร์", time: "12:00 - 20:00" },
      { day: "พุธ", time: "12:00 - 20:00" },
      { day: "ศุกร์", time: "12:00 - 20:00" },
      { day: "อาทิตย์", time: "10:00 - 18:00" },
    ],
  },
  {
    id: "4",
    name: "คุณปราณี สวัสดี",
    position: "พนักงานนวด",
    phone: "091-234-5678",
    email: "pranee@example.com",
    specialties: ["นวดแผนไทย", "นวดศีรษะ ไหล่ และคอ", "นวดฝ่าเท้า"],
    experience: "7 ปี",
    status: "leave",
    image: "/empathetic-therapy-session.png",
    schedule: [
      { day: "อังคาร", time: "12:00 - 20:00" },
      { day: "พฤหัสบดี", time: "12:00 - 20:00" },
      { day: "เสาร์", time: "10:00 - 18:00" },
      { day: "อาทิตย์", time: "10:00 - 18:00" },
    ],
  },
]

export default function StaffPage() {
  const [staff, setStaff] = useState(mockStaff)
  const [editingStaff, setEditingStaff] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const handleAddStaff = (staffData: any) => {
    // In a real app, you would send this data to your backend
    const newStaff = {
      id: (staff.length + 1).toString(),
      ...staffData,
    }
    setStaff([...staff, newStaff])
    setIsDialogOpen(false)
  }

  const handleEditStaff = (staffData: any) => {
    // In a real app, you would send this data to your backend
    const updatedStaff = staff.map((s) => (s.id === staffData.id ? { ...s, ...staffData } : s))
    setStaff(updatedStaff)
    setEditingStaff(null)
    setIsDialogOpen(false)
  }

  const handleDeleteStaff = (staffId: string) => {
    // In a real app, you would send this request to your backend
    if (window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบพนักงานนี้?")) {
      const updatedStaff = staff.filter((s) => s.id !== staffId)
      setStaff(updatedStaff)
    }
  }

  // Get day of week for selected date
  const getDayOfWeek = (date: Date) => {
    const days = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"]
    return days[date.getDay()]
  }

  // Filter staff working on selected date
  const getStaffForSelectedDate = () => {
    if (!selectedDate) return []

    const dayOfWeek = getDayOfWeek(selectedDate)
    return staff
      .filter((s) => s.status === "active" && s.schedule.some((sch) => sch.day === dayOfWeek))
      .map((s) => {
        const scheduleForDay = s.schedule.find((sch) => sch.day === dayOfWeek)
        return {
          ...s,
          workingHours: scheduleForDay?.time || "",
        }
      })
  }

  const staffForSelectedDate = getStaffForSelectedDate()

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-navy-900">จัดการพนักงานนวด</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gold-500 hover:bg-gold-600 text-navy-900">
                <Plus className="h-4 w-4 mr-2" />
                เพิ่มพนักงานใหม่
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-navy-50 border-navy-200">
              <DialogHeader>
                <DialogTitle className="text-navy-900">{editingStaff ? "แก้ไขข้อมูลพนักงาน" : "เพิ่มพนักงานใหม่"}</DialogTitle>
              </DialogHeader>
              <StaffForm
                initialData={editingStaff}
                onSubmit={editingStaff ? handleEditStaff : handleAddStaff}
                onCancel={() => {
                  setEditingStaff(null)
                  setIsDialogOpen(false)
                }}
              />
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="list" className="space-y-4">
          <TabsList className="bg-navy-200">
            <TabsTrigger value="list" className="data-[state=active]:bg-gold-500 data-[state=active]:text-navy-900">
              รายชื่อพนักงาน
            </TabsTrigger>
            <TabsTrigger value="schedule" className="data-[state=active]:bg-gold-500 data-[state=active]:text-navy-900">
              ตารางการทำงาน
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {staff.map((s) => (
                <Card key={s.id} className="bg-navy-100 border-navy-200 overflow-hidden">
                  <div className="relative h-48 w-full">
                    <Image src={s.image || "/placeholder.svg"} alt={s.name} fill className="object-cover" />
                    <div className="absolute top-2 right-2">
                      <Badge
                        className={
                          s.status === "active" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                        }
                      >
                        {s.status === "active" ? "ทำงาน" : "ลา"}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-navy-900">{s.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-navy-700">
                        {s.position} • ประสบการณ์ {s.experience}
                      </p>

                      <div>
                        <p className="text-sm font-medium text-navy-800 mb-1">ความเชี่ยวชาญ:</p>
                        <div className="flex flex-wrap gap-1">
                          {s.specialties.map((specialty, index) => (
                            <Badge key={index} variant="outline" className="bg-navy-50 text-navy-700 border-navy-200">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center text-navy-700">
                          <Phone className="h-4 w-4 mr-2" />
                          <span>{s.phone}</span>
                        </div>
                        <div className="flex items-center text-navy-700">
                          <Mail className="h-4 w-4 mr-2" />
                          <span>{s.email}</span>
                        </div>
                      </div>

                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-navy-300 text-navy-800 hover:bg-navy-200"
                          onClick={() => {
                            setEditingStaff(s)
                            setIsDialogOpen(true)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-300 text-red-800 hover:bg-red-100"
                          onClick={() => handleDeleteStaff(s.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="schedule">
            <Card className="bg-navy-100 border-navy-200">
              <CardHeader>
                <CardTitle className="text-navy-900">ตารางการทำงานของพนักงาน</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-navy-900 mb-4">เลือกวันที่</h3>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border border-navy-200 bg-navy-50"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-navy-900 mb-4">
                      พนักงานที่ทำงานวันที่ {selectedDate ? format(selectedDate, "d MMMM yyyy", { locale: th }) : ""}
                      {selectedDate && ` (${getDayOfWeek(selectedDate)})`}
                    </h3>

                    {staffForSelectedDate.length > 0 ? (
                      <div className="space-y-4">
                        {staffForSelectedDate.map((s) => (
                          <div key={s.id} className="p-4 rounded-lg bg-navy-50 border border-navy-200">
                            <div className="flex items-start">
                              <div className="relative h-12 w-12 rounded-full overflow-hidden mr-3">
                                <Image src={s.image || "/placeholder.svg"} alt={s.name} fill className="object-cover" />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-navy-900">{s.name}</p>
                                <p className="text-sm text-navy-600">{s.position}</p>
                                <div className="flex items-center text-navy-700 mt-1">
                                  <Clock className="h-4 w-4 mr-1" />
                                  <span className="text-sm">{s.workingHours}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-40 text-center bg-navy-50 rounded-lg border border-navy-200">
                        <Clock className="h-10 w-10 text-navy-300 mb-2" />
                        <p className="text-navy-600">ไม่มีพนักงานทำงานในวันที่เลือก</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}

function StaffForm({ initialData, onSubmit, onCancel }: any) {
  const [formData, setFormData] = useState({
    id: initialData?.id || "",
    name: initialData?.name || "",
    position: initialData?.position || "",
    phone: initialData?.phone || "",
    email: initialData?.email || "",
    specialties: initialData?.specialties?.join(", ") || "",
    experience: initialData?.experience || "",
    status: initialData?.status || "active",
    image: initialData?.image || "/serene-massage.png",
    schedule: initialData?.schedule || [
      { day: "จันทร์", time: "10:00 - 18:00" },
      { day: "พุธ", time: "10:00 - 18:00" },
      { day: "ศุกร์", time: "10:00 - 18:00" },
    ],
  })

  const [scheduleText, setScheduleText] = useState(
    initialData?.schedule
      ? initialData.schedule.map((s: any) => `${s.day}: ${s.time}`).join("\n")
      : "จันทร์: 10:00 - 18:00\nพุธ: 10:00 - 18:00\nศุกร์: 10:00 - 18:00",
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleScheduleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setScheduleText(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Parse schedule from text
    const scheduleLines = scheduleText.split("\n").filter(Boolean)
    const schedule = scheduleLines.map((line) => {
      const [day, time] = line.split(":").map((part) => part.trim())
      return { day, time }
    })

    onSubmit({
      ...formData,
      specialties: formData.specialties
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      schedule,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name" className="text-navy-800">
          ชื่อ-นามสกุล
        </Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="bg-navy-100 border-navy-200"
          required
        />
      </div>
      <div>
        <Label htmlFor="position" className="text-navy-800">
          ตำแหน่ง
        </Label>
        <Input
          id="position"
          name="position"
          value={formData.position}
          onChange={handleChange}
          className="bg-navy-100 border-navy-200"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
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
        <div>
          <Label htmlFor="email" className="text-navy-800">
            อีเมล
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-navy-100 border-navy-200"
            required
          />
        </div>
      </div>
      <div>
        <Label htmlFor="specialties" className="text-navy-800">
          ความเชี่ยวชาญ (คั่นด้วยเครื่องหมายคอมม่า)
        </Label>
        <Input
          id="specialties"
          name="specialties"
          value={formData.specialties}
          onChange={handleChange}
          placeholder="เช่น นวดแผนไทย, นวดน้ำมันอโรมา, นวดกดจุด"
          className="bg-navy-100 border-navy-200"
          required
        />
      </div>
      <div>
        <Label htmlFor="experience" className="text-navy-800">
          ประสบการณ์
        </Label>
        <Input
          id="experience"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          placeholder="เช่น 5 ปี"
          className="bg-navy-100 border-navy-200"
          required
        />
      </div>
      <div>
        <Label htmlFor="image" className="text-navy-800">
          URL รูปภาพ
        </Label>
        <Input
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="bg-navy-100 border-navy-200"
          required
        />
      </div>
      <div>
        <Label htmlFor="schedule" className="text-navy-800">
          ตารางการทำงาน (วัน: เวลา)
        </Label>
        <Textarea
          id="schedule"
          value={scheduleText}
          onChange={handleScheduleChange}
          placeholder="จันทร์: 10:00 - 18:00&#10;พุธ: 10:00 - 18:00&#10;ศุกร์: 10:00 - 18:00"
          className="bg-navy-100 border-navy-200 font-mono"
          rows={5}
          required
        />
      </div>
      <div>
        <Label htmlFor="status" className="text-navy-800">
          สถานะ
        </Label>
        <div className="flex items-center space-x-4 mt-2">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="active"
              name="status"
              value="active"
              checked={formData.status === "active"}
              onChange={handleChange}
              className="text-gold-500 focus:ring-gold-500"
            />
            <Label htmlFor="active" className="text-navy-800">
              ทำงาน
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="leave"
              name="status"
              value="leave"
              checked={formData.status === "leave"}
              onChange={handleChange}
              className="text-gold-500 focus:ring-gold-500"
            />
            <Label htmlFor="leave" className="text-navy-800">
              ลา
            </Label>
          </div>
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="submit" className="bg-gold-500 hover:bg-gold-600 text-navy-900">
          {initialData ? "บันทึกการแก้ไข" : "เพิ่มพนักงาน"}
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
