"use client"

import { useState } from "react"
import Link from "next/link"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function BookingCta() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card className="bg-navy-100 shadow-lg overflow-hidden">
      <CardContent className="p-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-navy-900">พร้อมที่จะผ่อนคลายกับเรา?</h3>
            <p className="text-navy-700 mb-6">จองคิวนวดล่วงหน้าเพื่อความสะดวกและรับสิทธิพิเศษสำหรับลูกค้าที่จองผ่านเว็บไซต์</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-navy-800">จองคิวล่วงหน้าได้สูงสุด 30 วัน</span>
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-navy-800">ส่วนลด 10% สำหรับการจองครั้งแรก</span>
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-navy-800">สะสมแต้มเพื่อรับสิทธิพิเศษ</span>
              </li>
            </ul>
            <Button
              asChild
              size="lg"
              className={`rounded-full px-8 py-6 text-lg transition-transform bg-gold-500 hover:bg-gold-600 text-navy-900 ${isHovered ? "scale-105" : ""}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Link href="/booking">
                <CalendarIcon className="mr-2 h-5 w-5" />
                จองคิวนวด
              </Link>
            </Button>
          </div>
          <div className="bg-navy-50 p-6 rounded-lg">
            <h4 className="text-lg font-semibold mb-4 text-navy-900">ขั้นตอนการจอง</h4>
            <ol className="space-y-4">
              <li className="flex">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gold-500 text-navy-900 flex items-center justify-center mr-3">
                  1
                </div>
                <div>
                  <h5 className="font-medium text-navy-900">เลือกบริการ</h5>
                  <p className="text-sm text-navy-700">เลือกบริการนวดที่คุณต้องการ</p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gold-500 text-navy-900 flex items-center justify-center mr-3">
                  2
                </div>
                <div>
                  <h5 className="font-medium text-navy-900">เลือกวันและเวลา</h5>
                  <p className="text-sm text-navy-700">เลือกวันและเวลาที่สะดวก</p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gold-500 text-navy-900 flex items-center justify-center mr-3">
                  3
                </div>
                <div>
                  <h5 className="font-medium text-navy-900">กรอกข้อมูล</h5>
                  <p className="text-sm text-navy-700">กรอกข้อมูลส่วนตัวและข้อมูลการติดต่อ</p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gold-500 text-navy-900 flex items-center justify-center mr-3">
                  4
                </div>
                <div>
                  <h5 className="font-medium text-navy-900">ยืนยันการจอง</h5>
                  <p className="text-sm text-navy-700">รับการยืนยันการจองทางอีเมลหรือ SMS</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
