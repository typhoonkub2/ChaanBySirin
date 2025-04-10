"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronLeft } from "lucide-react"

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // In a real application, you would validate credentials against your backend
    // For demo purposes, we'll use a simple check
    if (username === "admin" && password === "password") {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/admin/dashboard")
    } else {
      setError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-navy-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Link href="/" className="inline-flex items-center text-gold-600 hover:text-gold-800 mb-4">
          <ChevronLeft className="h-4 w-4 mr-1" />
          กลับไปหน้าหลัก
        </Link>

        <Card className="shadow-lg bg-navy-100 border-navy-200">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <Image
                src="/CHAAN_LOGO_2-02.png"
                alt="Chaan Massage by Sirin"
                width={180}
                height={72}
                className="object-contain"
              />
            </div>
            <CardTitle className="text-2xl text-center text-navy-900">เข้าสู่ระบบแอดมิน</CardTitle>
            <CardDescription className="text-center text-navy-600">
              กรุณาเข้าสู่ระบบเพื่อจัดการการจองและตั้งค่าต่างๆ
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {error && <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm">{error}</div>}
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="username" className="text-navy-800">
                    ชื่อผู้ใช้
                  </Label>
                  <Input
                    id="username"
                    placeholder="กรุณากรอกชื่อผู้ใช้"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="bg-navy-50 border-navy-200 text-navy-900"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password" className="text-navy-800">
                    รหัสผ่าน
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="กรุณากรอกรหัสผ่าน"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-navy-50 border-navy-200 text-navy-900"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gold-500 hover:bg-gold-600 text-navy-900"
                  disabled={isLoading}
                >
                  {isLoading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-navy-600">หากลืมรหัสผ่าน กรุณาติดต่อผู้ดูแลระบบ</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
