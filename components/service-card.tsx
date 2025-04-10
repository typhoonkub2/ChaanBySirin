import Image from "next/image"
import Link from "next/link"
import { Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface ServiceCardProps {
  title: string
  description: string
  duration: string
  price: number
  image: string
}

export default function ServiceCard({ title, description, duration, price, image }: ServiceCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg bg-navy-200">
      <div className="relative h-48 w-full">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2 text-navy-900">{title}</h3>
        <p className="text-navy-700 mb-4">{description}</p>
        <div className="flex items-center text-sm text-navy-600 mb-2">
          <Clock className="h-4 w-4 mr-1" />
          <span>{duration}</span>
        </div>
        <div className="text-lg font-semibold text-gold-600">{price.toLocaleString()} บาท</div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full bg-gold-500 hover:bg-gold-600 text-navy-900">
          <Link href="#booking">จองเลย</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
