"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2 } from "lucide-react"
import AdminLayout from "@/components/admin/layout"

// Mock data for rooms
const mockRooms = [
  {
    id: "1",
    name: "ห้อง 1",
    type: "ห้องนวดทั่วไป",
    description: "ห้องนวดขนาดมาตรฐาน เหมาะสำหรับนวดแผนไทยและนวดกดจุด",
    status: "available",
    features: ["เตียงนวด", "เครื่องปรับอากาศ", "เพลงบำบัด"],
  },
  {
    id: "2",
    name: "ห้อง 2",
    type: "ห้องนวดทั่วไป",
    description: "ห้องนวดขนาดมาตรฐาน เหมาะสำหรับนวดแผนไทยและนวดกดจุด",
    status: "occupied",
    features: ["เตียงนวด", "เครื่องปรับอากาศ", "เพลงบำบัด"],
  },
  {
    id: "3",
    name: "ห้อง 3",
    type: "ห้องนวดน้ำมัน",
    description: "ห้องนวดสำหรับนวดน้ำมันอโรมา มีห้องอาบน้ำในตัว",
    status: "maintenance",
    features: ["เตียงนวด", "เครื่องปรับอากาศ", "เพลงบำบัด", "ห้องอาบน้ำ"],
  },
  {
    id: "4",
    name: "ห้อง 4",
    type: "ห้องนวดเท้า",
    description: "ห้องนวดสำหรับนวดฝ่าเท้าโดยเฉพาะ",
    status: "available",
    features: ["เก้าอี้นวดเท้า", "เครื่องปรับอากาศ", "โทรทัศน์"],
  },
  {
    id: "5",
    name: "ห้อง VIP",
    type: "ห้องนวด VIP",
    description: "ห้องนวดขนาดใหญ่ มีสิ่งอำนวยความสะดวกครบครัน เหมาะสำหรับคู่รักหรือครอบครัว",
    status: "available",
    features: ["เตียงนวดขนาดใหญ่", "เครื่องปรับอากาศ", "เพลงบำบัด", "ห้องอาบน้ำ", "ห้องซาวน่า"],
  },
]

export default function RoomsPage() {
  const [rooms, setRooms] = useState(mockRooms)
  const [editingRoom, setEditingRoom] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAddRoom = (roomData: any) => {
    // In a real app, you would send this data to your backend
    const newRoom = {
      id: (rooms.length + 1).toString(),
      ...roomData,
    }
    setRooms([...rooms, newRoom])
    setIsDialogOpen(false)
  }

  const handleEditRoom = (roomData: any) => {
    // In a real app, you would send this data to your backend
    const updatedRooms = rooms.map((room) => (room.id === roomData.id ? { ...room, ...roomData } : room))
    setRooms(updatedRooms)
    setEditingRoom(null)
    setIsDialogOpen(false)
  }

  const handleDeleteRoom = (roomId: string) => {
    // In a real app, you would send this request to your backend
    if (window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบห้องนี้?")) {
      const updatedRooms = rooms.filter((room) => room.id !== roomId)
      setRooms(updatedRooms)
    }
  }

  const handleToggleStatus = (roomId: string) => {
    // In a real app, you would send this request to your backend
    const updatedRooms = rooms.map((room) => {
      if (room.id === roomId) {
        const newStatus = room.status === "available" ? "occupied" : "available"
        return { ...room, status: newStatus }
      }
      return room
    })
    setRooms(updatedRooms)
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-navy-900">จัดการห้องนวด</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gold-500 hover:bg-gold-600 text-navy-900">
                <Plus className="h-4 w-4 mr-2" />
                เพิ่มห้องใหม่
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-navy-50 border-navy-200">
              <DialogHeader>
                <DialogTitle className="text-navy-900">{editingRoom ? "แก้ไขห้องนวด" : "เพิ่มห้องนวดใหม่"}</DialogTitle>
              </DialogHeader>
              <RoomForm
                initialData={editingRoom}
                onSubmit={editingRoom ? handleEditRoom : handleAddRoom}
                onCancel={() => {
                  setEditingRoom(null)
                  setIsDialogOpen(false)
                }}
              />
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <Card key={room.id} className="bg-navy-100 border-navy-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-navy-900">{room.name}</CardTitle>
                <Badge
                  className={
                    room.status === "available"
                      ? "bg-green-100 text-green-800"
                      : room.status === "occupied"
                        ? "bg-red-100 text-red-800"
                        : "bg-amber-100 text-amber-800"
                  }
                >
                  {room.status === "available" ? "ว่าง" : room.status === "occupied" ? "ไม่ว่าง" : "ปิดปรับปรุง"}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-navy-600">{room.type}</p>
                    <p className="text-navy-700 mt-1">{room.description}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-navy-800 mb-1">สิ่งอำนวยความสะดวก:</p>
                    <div className="flex flex-wrap gap-1">
                      {room.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="bg-navy-50 text-navy-700 border-navy-200">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={room.status === "available"}
                        onCheckedChange={() => handleToggleStatus(room.id)}
                        disabled={room.status === "maintenance"}
                      />
                      <Label className="text-navy-800">{room.status === "available" ? "ว่าง" : "ไม่ว่าง"}</Label>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-navy-300 text-navy-800 hover:bg-navy-200"
                        onClick={() => {
                          setEditingRoom(room)
                          setIsDialogOpen(true)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-300 text-red-800 hover:bg-red-100"
                        onClick={() => handleDeleteRoom(room.id)}
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

function RoomForm({ initialData, onSubmit, onCancel }: any) {
  const [formData, setFormData] = useState({
    id: initialData?.id || "",
    name: initialData?.name || "",
    type: initialData?.type || "",
    description: initialData?.description || "",
    status: initialData?.status || "available",
    features: initialData?.features?.join(", ") || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      features: formData.features
        .split(",")
        .map((feature) => feature.trim())
        .filter(Boolean),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name" className="text-navy-800">
          ชื่อห้อง
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
        <Label htmlFor="type" className="text-navy-800">
          ประเภทห้อง
        </Label>
        <Input
          id="type"
          name="type"
          value={formData.type}
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
      <div>
        <Label htmlFor="features" className="text-navy-800">
          สิ่งอำนวยความสะดวก (คั่นด้วยเครื่องหมายคอมม่า)
        </Label>
        <Textarea
          id="features"
          name="features"
          value={formData.features}
          onChange={handleChange}
          placeholder="เช่น เตียงนวด, เครื่องปรับอากาศ, เพลงบำบัด"
          className="bg-navy-100 border-navy-200"
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
              id="available"
              name="status"
              value="available"
              checked={formData.status === "available"}
              onChange={handleChange}
              className="text-gold-500 focus:ring-gold-500"
            />
            <Label htmlFor="available" className="text-navy-800">
              ว่าง
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="occupied"
              name="status"
              value="occupied"
              checked={formData.status === "occupied"}
              onChange={handleChange}
              className="text-gold-500 focus:ring-gold-500"
            />
            <Label htmlFor="occupied" className="text-navy-800">
              ไม่ว่าง
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="maintenance"
              name="status"
              value="maintenance"
              checked={formData.status === "maintenance"}
              onChange={handleChange}
              className="text-gold-500 focus:ring-gold-500"
            />
            <Label htmlFor="maintenance" className="text-navy-800">
              ปิดปรับปรุง
            </Label>
          </div>
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="submit" className="bg-gold-500 hover:bg-gold-600 text-navy-900">
          {initialData ? "บันทึกการแก้ไข" : "เพิ่มห้อง"}
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
