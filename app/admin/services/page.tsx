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
import { Plus, Edit, Trash2 } from "lucide-react"
import AdminLayout from "@/components/admin/layout"

// Mock data for services
const mockServices = [
  {
    id: "1",
    name: "นวดแผนไทย",
    description: "นวดแผนไทยโบราณช่วยปรับสมดุลร่างกาย บรรเทาอาการปวดเมื่อย และเพิ่มความยืดหยุ่นของกล้ามเนื้อ",
    duration: "60 นาที",
    price: 500,
    image: "/traditional-thai-stretch.png",
  },
  {
    id: "2",
    name: "นวดน้ำมันอโรมา",
    description: "นวดด้วยน้ำมันหอมระเหยช่วยให้ร่างกายและจิตใจผ่อนคลาย ลดความเครียด และบำรุงผิวพรรณ",
    duration: "90 นาที",
    price: 800,
    image: "/serene-massage.png",
  },
  {
    id: "3",
    name: "นวดกดจุด",
    description: "นวดกดจุดช่วยกระตุ้นการไหลเวียนของเลือด บรรเทาอาการปวด และปรับสมดุลพลังงานในร่างกาย",
    duration: "60 นาที",
    price: 600,
    image: "/placeholder.svg?key=5pucw",
  },
  {
    id: "4",
    name: "นวดศีรษะ ไหล่ และคอ",
    description: "นวดเฉพาะส่วนบนของร่างกายช่วยบรรเทาความตึงเครียด ลดอาการปวดศีรษะ และผ่อนคลายกล้ามเนื้อบริเวณคอและไหล่",
    duration: "45 นาที",
    price: 400,
    image: "/serene-shoulder-head-massage.png",
  },
  {
    id: "5",
    name: "นวดฝ่าเท้า",
    description: "นวดกดจุดสะท้อนบนฝ่าเท้าช่วยกระตุ้นการทำงานของอวัยวะต่างๆ ในร่างกาย และช่วยให้รู้สึกผ่อนคลาย",
    duration: "45 นาที",
    price: 400,
    image: "/relaxing-foot-massage.png",
  },
  {
    id: "6",
    name: "แพ็คเกจพิเศษ",
    description: "แพ็คเกจนวดผสมผสานที่ออกแบบมาเพื่อการผ่อนคลายอย่างเต็มรูปแบบ ทั้งร่างกายและจิตใจ",
    duration: "120 นาที",
    price: 1200,
    image: "/serene-spa-retreat.png",
  },
]

export default function ServicesPage() {
  const [services, setServices] = useState(mockServices)
  const [editingService, setEditingService] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAddService = (serviceData: any) => {
    // In a real app, you would send this data to your backend
    const newService = {
      id: (services.length + 1).toString(),
      ...serviceData,
    }
    setServices([...services, newService])
    setIsDialogOpen(false)
  }

  const handleEditService = (serviceData: any) => {
    // In a real app, you would send this data to your backend
    const updatedServices = services.map((service) =>
      service.id === serviceData.id ? { ...service, ...serviceData } : service,
    )
    setServices(updatedServices)
    setEditingService(null)
    setIsDialogOpen(false)
  }

  const handleDeleteService = (serviceId: string) => {
    // In a real app, you would send this request to your backend
    if (window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบบริการนี้?")) {
      const updatedServices = services.filter((service) => service.id !== serviceId)
      setServices(updatedServices)
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-navy-900">จัดการบริการ</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gold-500 hover:bg-gold-600 text-navy-900">
                <Plus className="h-4 w-4 mr-2" />
                เพิ่มบริการใหม่
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-navy-50 border-navy-200">
              <DialogHeader>
                <DialogTitle className="text-navy-900">{editingService ? "แก้ไขบริการ" : "เพิ่มบริการใหม่"}</DialogTitle>
              </DialogHeader>
              <ServiceForm
                initialData={editingService}
                onSubmit={editingService ? handleEditService : handleAddService}
                onCancel={() => {
                  setEditingService(null)
                  setIsDialogOpen(false)
                }}
              />
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="bg-navy-100 border-navy-200 overflow-hidden">
              <div className="relative h-48 w-full">
                <Image src={service.image || "/placeholder.svg"} alt={service.name} fill className="object-cover" />
              </div>
              <CardHeader>
                <CardTitle className="text-navy-900">{service.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-navy-700">{service.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="text-navy-800">
                      <span className="font-medium">{service.duration}</span> | {service.price.toLocaleString()} บาท
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-navy-300 text-navy-800 hover:bg-navy-200"
                        onClick={() => {
                          setEditingService(service)
                          setIsDialogOpen(true)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-300 text-red-800 hover:bg-red-100"
                        onClick={() => handleDeleteService(service.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}

function ServiceForm({ initialData, onSubmit, onCancel }: any) {
  const [formData, setFormData] = useState({
    id: initialData?.id || "",
    name: initialData?.name || "",
    description: initialData?.description || "",
    duration: initialData?.duration || "",
    price: initialData?.price || "",
    image: initialData?.image || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      price: Number(formData.price),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name" className="text-navy-800">
          ชื่อบริการ
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
        <Label htmlFor="description" className="text-navy-800">
          รายละเอียด
        </Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="bg-navy-100 border-navy-200"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="duration" className="text-navy-800">
            ระยะเวลา
          </Label>
          <Input
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="เช่น 60 นาที"
            className="bg-navy-100 border-navy-200"
            required
          />
        </div>
        <div>
          <Label htmlFor="price" className="text-navy-800">
            ราคา (บาท)
          </Label>
          <Input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            className="bg-navy-100 border-navy-200"
            required
          />
        </div>
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
      <div className="flex justify-end space-x-2">
        <Button type="submit" className="bg-gold-500 hover:bg-gold-600 text-navy-900">
          {initialData ? "บันทึกการแก้ไข" : "เพิ่มบริการ"}
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
