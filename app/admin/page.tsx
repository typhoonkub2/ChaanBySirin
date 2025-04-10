import { redirect } from "next/navigation"

export default function AdminPage() {
  // ในแอปพลิเคชันจริง คุณควรตรวจสอบการยืนยันตัวตนที่นี่
  // และ redirect ถ้าผู้ใช้ไม่ได้ล็อกอิน

  // สำหรับตัวอย่าง เราจะ redirect ไปที่หน้า dashboard โดยตรง
  redirect("/admin/dashboard")
}
