"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Plus, Search, CalendarIcon, ArrowUpCircle, ArrowDownCircle, DollarSign } from "lucide-react"
import { format } from "date-fns"
import { th } from "date-fns/locale"
import { cn } from "@/lib/utils"
import AdminLayout from "@/components/admin/layout"

// Mock data for transactions
const mockTransactions = [
  {
    id: "1",
    date: new Date(2025, 3, 10),
    type: "income",
    category: "บริการนวด",
    amount: 1500,
    description: "นวดแผนไทย 2 คน, นวดน้ำมันอโรมา 1 คน",
    staff: "คุณสมศรี",
  },
  {
    id: "2",
    date: new Date(2025, 3, 10),
    type: "income",
    category: "บริการนวด",
    amount: 800,
    description: "นวดน้ำมันอโรมา 1 คน",
    staff: "คุณวิภา",
  },
  {
    id: "3",
    date: new Date(2025, 3, 10),
    type: "expense",
    category: "วัสดุสิ้นเปลือง",
    amount: 500,
    description: "น้ำมันนวด, ผ้าเช็ดตัว",
    staff: "คุณสมศรี",
  },
  {
    id: "4",
    date: new Date(2025, 3, 11),
    type: "income",
    category: "บริการนวด",
    amount: 2000,
    description: "แพ็คเกจพิเศษ 1 คน, นวดฝ่าเท้า 2 คน",
    staff: "คุณนิภา",
  },
  {
    id: "5",
    date: new Date(2025, 3, 11),
    type: "expense",
    category: "ค่าสาธารณูปโภค",
    amount: 1200,
    description: "ค่าไฟฟ้าประจำเดือน",
    staff: "คุณสมศรี",
  },
  {
    id: "6",
    date: new Date(2025, 3, 12),
    type: "income",
    category: "บริการนวด",
    amount: 1800,
    description: "นวดแผนไทย 1 คน, นวดน้ำมันอโรมา 1 คน, นวดฝ่าเท้า 1 คน",
    staff: "คุณวิภา",
  },
  {
    id: "7",
    date: new Date(2025, 3, 12),
    type: "expense",
    category: "เงินเดือนพนักงาน",
    amount: 3000,
    description: "เงินเดือนพนักงานนวด (บางส่วน)",
    staff: "คุณสมศรี",
  },
]

export default function FinancePage() {
  const [transactions, setTransactions] = useState(mockTransactions)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")

  // Calculate totals
  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

  const totalExpense = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

  const netProfit = totalIncome - totalExpense

  // Filter transactions based on search term and type
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.staff.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = typeFilter === "all" || transaction.type === typeFilter

    return matchesSearch && matchesType
  })

  // Filter transactions for the selected date
  const transactionsForSelectedDate = selectedDate
    ? transactions.filter(
        (transaction) =>
          transaction.date.getDate() === selectedDate.getDate() &&
          transaction.date.getMonth() === selectedDate.getMonth() &&
          transaction.date.getFullYear() === selectedDate.getFullYear(),
      )
    : []

  const handleAddTransaction = (transactionData: any) => {
    // In a real app, you would send this data to your backend
    const newTransaction = {
      id: (transactions.length + 1).toString(),
      ...transactionData,
    }
    setTransactions([...transactions, newTransaction])
    setIsDialogOpen(false)
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-navy-900">บันทึกรายรับรายจ่าย</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gold-500 hover:bg-gold-600 text-navy-900">
                <Plus className="h-4 w-4 mr-2" />
                เพิ่มรายการใหม่
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-navy-50 border-navy-200">
              <DialogHeader>
                <DialogTitle className="text-navy-900">เพิ่มรายการรายรับรายจ่าย</DialogTitle>
              </DialogHeader>
              <TransactionForm onSubmit={handleAddTransaction} onCancel={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="bg-navy-100 border-navy-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-navy-700">รายรับทั้งหมด</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <ArrowUpCircle className="h-5 w-5 text-green-600 mr-2" />
                <div className="text-2xl font-bold text-green-700">฿{totalIncome.toLocaleString()}</div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-navy-100 border-navy-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-navy-700">รายจ่ายทั้งหมด</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <ArrowDownCircle className="h-5 w-5 text-red-600 mr-2" />
                <div className="text-2xl font-bold text-red-700">฿{totalExpense.toLocaleString()}</div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-navy-100 border-navy-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-navy-700">กำไรสุทธิ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-gold-600 mr-2" />
                <div className="text-2xl font-bold text-navy-900">฿{netProfit.toLocaleString()}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="list" className="space-y-4">
          <TabsList className="bg-navy-200">
            <TabsTrigger value="list" className="data-[state=active]:bg-gold-500 data-[state=active]:text-navy-900">
              รายการทั้งหมด
            </TabsTrigger>
            <TabsTrigger value="calendar" className="data-[state=active]:bg-gold-500 data-[state=active]:text-navy-900">
              ดูตามวันที่
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            <Card className="bg-navy-100 border-navy-200">
              <CardHeader>
                <CardTitle className="text-navy-900">รายการรายรับรายจ่ายทั้งหมด</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-navy-500" />
                    <Input
                      type="search"
                      placeholder="ค้นหาตามหมวดหมู่, รายละเอียด, พนักงาน"
                      className="pl-8 bg-navy-50 border-navy-200"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[180px] bg-navy-50 border-navy-200">
                      <SelectValue placeholder="กรองตามประเภท" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">ทั้งหมด</SelectItem>
                      <SelectItem value="income">รายรับ</SelectItem>
                      <SelectItem value="expense">รายจ่าย</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="rounded-md border border-navy-200 bg-navy-50">
                  <div className="grid grid-cols-6 bg-navy-200 p-3 rounded-t-md">
                    <div className="font-medium text-navy-900">วันที่</div>
                    <div className="font-medium text-navy-900">ประเภท</div>
                    <div className="font-medium text-navy-900">หมวดหมู่</div>
                    <div className="font-medium text-navy-900">จำนวนเงิน</div>
                    <div className="font-medium text-navy-900">รายละเอียด</div>
                    <div className="font-medium text-navy-900">พนักงาน</div>
                  </div>
                  <div className="divide-y divide-navy-200">
                    {filteredTransactions.length > 0 ? (
                      filteredTransactions.map((transaction) => (
                        <div key={transaction.id} className="grid grid-cols-6 p-3 items-center">
                          <div className="text-navy-800">{format(transaction.date, "d MMM yyyy", { locale: th })}</div>
                          <div>
                            {transaction.type === "income" ? (
                              <div className="flex items-center text-green-700">
                                <ArrowUpCircle className="h-4 w-4 mr-1" />
                                <span>รายรับ</span>
                              </div>
                            ) : (
                              <div className="flex items-center text-red-700">
                                <ArrowDownCircle className="h-4 w-4 mr-1" />
                                <span>รายจ่าย</span>
                              </div>
                            )}
                          </div>
                          <div className="text-navy-800">{transaction.category}</div>
                          <div
                            className={
                              transaction.type === "income" ? "text-green-700 font-medium" : "text-red-700 font-medium"
                            }
                          >
                            {transaction.type === "income" ? "+" : "-"}฿{transaction.amount.toLocaleString()}
                          </div>
                          <div className="text-navy-800 truncate">{transaction.description}</div>
                          <div className="text-navy-800">{transaction.staff}</div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-navy-600">ไม่พบข้อมูลรายการที่ตรงกับเงื่อนไขการค้นหา</div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar">
            <Card className="bg-navy-100 border-navy-200">
              <CardHeader>
                <CardTitle className="text-navy-900">รายการตามวันที่</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border border-navy-200 bg-navy-50"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-navy-900 mb-4">
                      รายการวันที่ {selectedDate ? format(selectedDate, "d MMMM yyyy", { locale: th }) : ""}
                    </h3>

                    {transactionsForSelectedDate.length > 0 ? (
                      <div className="space-y-4">
                        {transactionsForSelectedDate.map((transaction) => (
                          <div key={transaction.id} className="p-4 rounded-lg bg-navy-50 border border-navy-200">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center">
                                  {transaction.type === "income" ? (
                                    <ArrowUpCircle className="h-4 w-4 text-green-600 mr-2" />
                                  ) : (
                                    <ArrowDownCircle className="h-4 w-4 text-red-600 mr-2" />
                                  )}
                                  <p className="font-medium text-navy-900">{transaction.category}</p>
                                </div>
                                <p className="text-sm text-navy-600 mt-1">{transaction.description}</p>
                                <p className="text-sm text-navy-600">พนักงาน: {transaction.staff}</p>
                              </div>
                              <div
                                className={
                                  transaction.type === "income"
                                    ? "text-green-700 font-medium"
                                    : "text-red-700 font-medium"
                                }
                              >
                                {transaction.type === "income" ? "+" : "-"}฿{transaction.amount.toLocaleString()}
                              </div>
                            </div>
                          </div>
                        ))}

                        <div className="p-4 rounded-lg bg-navy-200 mt-4">
                          <div className="flex justify-between items-center">
                            <p className="font-medium text-navy-900">รวมรายรับ:</p>
                            <p className="text-green-700 font-medium">
                              +฿
                              {transactionsForSelectedDate
                                .filter((t) => t.type === "income")
                                .reduce((sum, t) => sum + t.amount, 0)
                                .toLocaleString()}
                            </p>
                          </div>
                          <div className="flex justify-between items-center mt-1">
                            <p className="font-medium text-navy-900">รวมรายจ่าย:</p>
                            <p className="text-red-700 font-medium">
                              -฿
                              {transactionsForSelectedDate
                                .filter((t) => t.type === "expense")
                                .reduce((sum, t) => sum + t.amount, 0)
                                .toLocaleString()}
                            </p>
                          </div>
                          <div className="border-t border-navy-300 my-2"></div>
                          <div className="flex justify-between items-center">
                            <p className="font-medium text-navy-900">สรุปสุทธิ:</p>
                            <p className="text-navy-900 font-bold">
                              ฿
                              {(
                                transactionsForSelectedDate
                                  .filter((t) => t.type === "income")
                                  .reduce((sum, t) => sum + t.amount, 0) -
                                transactionsForSelectedDate
                                  .filter((t) => t.type === "expense")
                                  .reduce((sum, t) => sum + t.amount, 0)
                              ).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-40 text-center bg-navy-50 rounded-lg border border-navy-200">
                        <DollarSign className="h-10 w-10 text-navy-300 mb-2" />
                        <p className="text-navy-600">ไม่มีรายการในวันที่เลือก</p>
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

function TransactionForm({ onSubmit, onCancel }: any) {
  const [formData, setFormData] = useState({
    date: new Date(),
    type: "income",
    category: "",
    amount: "",
    description: "",
    staff: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setFormData((prev) => ({ ...prev, date }))
    }
  }

  const handleTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, type: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      amount: Number(formData.amount),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="date" className="text-navy-800">
          วันที่
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal bg-navy-50 border-navy-200",
                !formData.date && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formData.date ? format(formData.date, "PPP", { locale: th }) : <span>เลือกวันที่</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={formData.date} onSelect={handleDateSelect} initialFocus />
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <Label htmlFor="type" className="text-navy-800">
          ประเภท
        </Label>
        <Select value={formData.type} onValueChange={handleTypeChange}>
          <SelectTrigger id="type" className="bg-navy-50 border-navy-200">
            <SelectValue placeholder="เลือกประเภท" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="income">รายรับ</SelectItem>
            <SelectItem value="expense">รายจ่าย</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="category" className="text-navy-800">
          หมวดหมู่
        </Label>
        <Input
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder={formData.type === "income" ? "เช่น บริการนวด, ขายผลิตภัณฑ์" : "เช่น วัสดุสิ้นเปลือง, ค่าสาธารณูปโภค"}
          className="bg-navy-100 border-navy-200"
          required
        />
      </div>
      <div>
        <Label htmlFor="amount" className="text-navy-800">
          จำนวนเงิน (บาท)
        </Label>
        <Input
          id="amount"
          name="amount"
          type="number"
          value={formData.amount}
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
        <Label htmlFor="staff" className="text-navy-800">
          พนักงาน
        </Label>
        <Input
          id="staff"
          name="staff"
          value={formData.staff}
          onChange={handleChange}
          className="bg-navy-100 border-navy-200"
          required
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="submit" className="bg-gold-500 hover:bg-gold-600 text-navy-900">
          บันทึกรายการ
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
