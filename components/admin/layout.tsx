"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  CalendarIcon,
  Home,
  LogOut,
  Settings,
  Users,
  MenuIcon,
  Bed,
  Menu,
  DollarSign,
  X,
} from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
          <div className="hidden md:flex items-center space-x-4">
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
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-navy-100 hover:bg-navy-800"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-navy-800 p-4">
          <nav className="space-y-2">
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
            <Button
              variant="ghost"
              className="w-full justify-start text-navy-100 hover:bg-navy-700 hover:text-white"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-3" />
              ออกจากระบบ
            </Button>
          </nav>
        </div>
      )}

      {/* Admin Sidebar and Content */}
      <div className="flex">
        {/* Sidebar - Hidden on mobile */}
        <aside className="hidden md:block w-64 bg-navy-800 shadow-sm h-[calc(100vh-64px)] p-4">
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
        <main className="flex-1 p-6 bg-navy-50">{children}</main>
      </div>
    </div>
  )
}
