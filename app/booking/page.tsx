"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { th } from "date-fns/locale"
import { CalendarIcon, ChevronLeft, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

const services = [
  { id: "thai", name: "นวดแผนไทย", duration: "60 นาที", price: 500 },
  { id: "aroma", name: "นวดน้ำมันอโรมา", duration: "90 นาที", price: 800 },
  { id: "pressure", name: "นวดกดจุด", duration: "60 นาที", price: 600 },
  { id: "head", name: "นวดศีรษะ ไหล่ และคอ", duration: "45 นาที", price: 400 },
  { id: "foot", name: "นวดฝ่าเท้า", duration: "45 นาที", price: 400 },
  { id: "package", name: "แพ็คเกจพิเศษ", duration: "120 นาที", price: 1200 },
]

const hours = Array.from({ length: 13 }, (_, i) => (i + 10).toString().padStart(2, "0")).filter(
  (hour) => Number.parseInt(hour) < 22,
)
const minutes = ["00", "15", "30", "45"]

export default function BookingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState("")
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState<{ hour: string; minute: string } | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    notes: "",
  })

  const handleServiceSelect = (value: string) => {
    setSelectedService(value)
    setStep(2)
  }

  const handleDateSelect = (date: Date | undefined) => {
    setDate(date)
  }

  const handleTimeSelect = (type: "hour" | "minute", value: string) => {
    setTime((prev) => {
      const newTime = prev ? { ...prev } : { hour: "10", minute: "00" }
      if (type === "hour") {
        newTime.hour = value
      } else {
        newTime.minute = value
      }
      return newTime
    })

    if (time?.hour && time?.minute) {
      setStep(3)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Here you would typically send the booking data to your backend
    console.log({
      service: selectedService,
      date,
      time: time ? `${time.hour}:${time.minute}` : "",
      ...formData,
    })

    // For now, just redirect to a confirmation page
    router.push("/booking/confirmation")
  }

  const selectedServiceDetails = services.find((service) => service.id === selectedService)

  return (
    <div className="min-h-screen bg-amber-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center text-amber-600 hover:text-amber-800 mb-8">
          <ChevronLeft className="h-4 w-4 mr-1" />
          กลับไปหน้าหลัก
        </Link>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">จองคิวนวด</CardTitle>
            <CardDescription>กรุณาเลือกบริการ วันและเวลาที่ต้องการ</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-amber-500 text-white" : "bg-gray-200"}`}
                  >
                    1
                  </div>
                  <div className="ml-2 font-medium">เลือกบริการ</div>
                </div>
                <div className="h-0.5 w-12 bg-gray-200"></div>
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-amber-500 text-white" : "bg-gray-200"}`}
                  >
                    2
                  </div>
                  <div className="ml-2 font-medium">เลือกวันและเวลา</div>
                </div>
                <div className="h-0.5 w-12 bg-gray-200"></div>
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? "bg-amber-500 text-white" : "bg-gray-200"}`}
                  >
                    3
                  </div>
                  <div className="ml-2 font-medium">ข้อมูลส่วนตัว</div>
                </div>
              </div>
            </div>

            {step === 1 && (
              <div>
                <h3 className="text-lg font-medium mb-4">เลือกบริการที่ต้องการ</h3>
                <RadioGroup value={selectedService} onValueChange={handleServiceSelect}>
                  <div className="grid gap-4">
                    {services.map((service) => (
                      <div key={service.id}>
                        <RadioGroupItem value={service.id} id={service.id} className="peer sr-only" />
                        <Label
                          htmlFor={service.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border-2 border-muted bg-white p-4 hover:bg-gray-50 hover:border-amber-200 peer-data-[state=checked]:border-amber-500 [&:has([data-state=checked])]:border-amber-500 cursor-pointer"
                        >
                          <div className="flex flex-col space-y-1">
                            <span className="text-lg font-medium">{service.name}</span>
                            <span className="text-sm text-gray-500 flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {service.duration}
                            </span>
                          </div>
                          <div className="text-lg font-semibold text-amber-600 mt-2 sm:mt-0">
                            {service.price.toLocaleString()} บาท
                          </div>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            )}

            {step === 2 && (
              <div>
                <Button
                  variant="ghost"
                  className="mb-4 text-amber-600 hover:text-amber-800 hover:bg-amber-50 -ml-2"
                  onClick={() => setStep(1)}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  กลับไปเลือกบริการ
                </Button>

                <div className="grid gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">บริการที่เลือก</h3>
                    <div className="bg-amber-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{selectedServiceDetails?.name}</p>
                          <p className="text-sm text-gray-500">{selectedServiceDetails?.duration}</p>
                        </div>
                        <p className="font-semibold text-amber-600">
                          {selectedServiceDetails?.price.toLocaleString()} บาท
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">เลือกวันที่</h3>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP", { locale: th }) : <span>เลือกวันที่</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={handleDateSelect}
                          initialFocus
                          disabled={(date) => {
                            // Disable dates in the past
                            const today = new Date()
                            today.setHours(0, 0, 0, 0)

                            // Disable dates more than 30 days in the future
                            const thirtyDaysFromNow = new Date()
                            thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)

                            return date < today || date > thirtyDaysFromNow
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {date && (
                    <div>
                      <h3 className="text-lg font-medium mb-4">เลือกเวลา</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="hour">ชั่วโมง</Label>
                          <Select value={time?.hour} onValueChange={(value) => handleTimeSelect("hour", value)}>
                            <SelectTrigger id="hour">
                              <SelectValue placeholder="เลือกชั่วโมง" />
                            </SelectTrigger>
                            <SelectContent>
                              {hours.map((hour) => (
                                <SelectItem key={hour} value={hour}>
                                  {hour}:00
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="minute">นาที</Label>
                          <Select value={time?.minute} onValueChange={(value) => handleTimeSelect("minute", value)}>
                            <SelectTrigger id="minute">
                              <SelectValue placeholder="เลือกนาที" />
                            </SelectTrigger>
                            <SelectContent>
                              {minutes.map((minute) => (
                                <SelectItem key={minute} value={minute}>
                                  {minute}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      {time?.hour && time?.minute && (
                        <div className="mt-4">
                          <Button onClick={() => setStep(3)} className="w-full bg-amber-500 hover:bg-amber-600">
                            ยืนยันเวลา {time.hour}:{time.minute} น.
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === 3 && (
              <form onSubmit={handleSubmit}>
                <Button
                  type="button"
                  variant="ghost"
                  className="mb-4 text-amber-600 hover:text-amber-800 hover:bg-amber-50 -ml-2"
                  onClick={() => setStep(2)}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  กลับไปเลือกวันและเวลา
                </Button>

                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">รายละเอียดการจอง</h3>
                  <div className="bg-amber-50 p-4 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">บริการ:</span>
                      <span className="font-medium">{selectedServiceDetails?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">วันที่:</span>
                      <span className="font-medium">{date ? format(date, "PPP", { locale: th }) : ""}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">เวลา:</span>
                      <span className="font-medium">{time ? `${time.hour}:${time.minute} น.` : ""}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">ราคา:</span>
                      <span className="font-medium text-amber-600">
                        {selectedServiceDetails?.price.toLocaleString()} บาท
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">ชื่อ-นามสกุล</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="กรุณากรอกชื่อ-นามสกุล"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="กรุณากรอกเบอร์โทรศัพท์"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">อีเมล (ไม่บังคับ)</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="กรุณากรอกอีเมล"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="notes">หมายเหตุเพิ่มเติม (ไม่บังคับ)</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      placeholder="หากมีความต้องการพิเศษ กรุณาระบุที่นี่"
                      value={formData.notes}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600">
                    ยืนยันการจอง
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
