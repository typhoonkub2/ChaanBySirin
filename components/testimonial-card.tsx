import Image from "next/image"
import { Star, StarHalf } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface TestimonialCardProps {
  name: string
  text: string
  rating: number
  image: string
}

export default function TestimonialCard({ name, text, rating, image }: TestimonialCardProps) {
  return (
    <Card className="h-full bg-navy-200">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
            <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
          </div>
          <div>
            <h4 className="font-semibold text-navy-900">{name}</h4>
            <div className="flex text-gold-500">
              {[...Array(Math.floor(rating))].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
              {rating % 1 !== 0 && <StarHalf className="h-4 w-4 fill-current" />}
            </div>
          </div>
        </div>
        <p className="text-navy-700 italic">"{text}"</p>
      </CardContent>
    </Card>
  )
}
