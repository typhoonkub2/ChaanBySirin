import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen bg-navy-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full shadow-lg bg-navy-100 border-navy-200">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-navy-900">จองคิวสำเร็จ!</CardTitle>
          <CardDescription className="text-navy-600">ขอบคุณที่ใช้บริการ Chaan Massage by Sirin</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-center text-navy-800">
              เราได้รับข้อมูลการจองของคุณเรียบร้อยแล้ว และจะส่งข้อความยืนยันไปยังเบอร์โทรศัพท์ที่คุณให้ไว้
            </p>
            <div className="bg-navy-200 p-4 rounded-lg">
              <p className="text-sm text-center text-navy-800">
                หากต้องการยกเลิกหรือเปลี่ยนแปลงการจอง กรุณาติดต่อเราล่วงหน้าอย่างน้อย 2 ชั่วโมง
                <br />
                โทร: 099-999-9999
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button asChild className="w-full bg-gold-500 hover:bg-gold-600 text-navy-900">
            <Link href="/">กลับไปหน้าหลัก</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full border-navy-300 text-navy-800 hover:bg-navy-200 hover:text-navy-900"
          >
            <Link href="/booking">จองคิวเพิ่มเติม</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
