import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Phone } from "lucide-react"
import ServiceCard from "@/components/service-card"
import TestimonialCard from "@/components/testimonial-card"
import BookingCta from "@/components/booking-cta"
import Header from "@/components/header"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-navy-50">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/tranquil-spa-retreat.png"
            alt="Chaan Massage by Sirin"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="mb-8 flex justify-center">
            <Image
              src="/CHAAN_LOGO_2-02.png"
              alt="Chaan Massage by Sirin"
              width={300}
              height={120}
              className="object-contain"
            />
          </div>
          <p className="text-xl sm:text-2xl text-white/90 mb-8">ผ่อนคลายร่างกายและจิตใจด้วยการนวดที่เป็นเอกลักษณ์ของเรา</p>
          <Button
            asChild
            size="lg"
            className="rounded-full px-8 py-6 text-lg bg-gold-500 hover:bg-gold-600 text-navy-900"
          >
            <Link href="#booking">จองคิวนวด</Link>
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-navy-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-navy-900">เกี่ยวกับเรา</h2>
            <div className="w-24 h-1 bg-gold-500 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="/serene-thai-spa.png"
                alt="About Chaan Massage"
                width={800}
                height={600}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-navy-900">ประสบการณ์การนวดที่เป็นเอกลักษณ์</h3>
              <p className="text-navy-800 mb-6">
                Chaan Massage by Sirin มอบประสบการณ์การนวดที่เป็นเอกลักษณ์ด้วยเทคนิคการนวดแบบไทยโบราณผสมผสานกับการนวดแบบสมัยใหม่
                ที่ช่วยบรรเทาอาการปวดเมื่อย คลายความตึงของกล้ามเนื้อ และช่วยให้ร่างกายและจิตใจผ่อนคลาย
              </p>
              <p className="text-navy-800 mb-6">
                ด้วยประสบการณ์กว่า 10 ปีของทีมนวดมืออาชีพของเรา เราให้ความสำคัญกับความต้องการเฉพาะบุคคลของลูกค้าแต่ละท่าน
                เพื่อมอบประสบการณ์การนวดที่ตรงตามความต้องการและช่วยฟื้นฟูสุขภาพของคุณอย่างแท้จริง
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gold-500 mr-2" />
                  <span className="text-navy-800">เปิดทุกวัน 10:00 - 22:00 น.</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gold-500 mr-2" />
                  <span className="text-navy-800">098-596-6162</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gold-500 mr-2" />
                  <span className="text-navy-800">10/6 นิมมานเหมินทร์ 17 ต.สุเทพ อ.เมือง จ.เชียงใหม่ 50200</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 px-4 sm:px-6 lg:px-8 bg-navy-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-navy-900">บริการของเรา</h2>
            <div className="w-24 h-1 bg-gold-500 mx-auto mb-6"></div>
            <p className="text-navy-800 max-w-2xl mx-auto">
              เราให้บริการนวดหลากหลายรูปแบบเพื่อตอบสนองความต้องการของลูกค้าทุกท่าน
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              title="นวดแผนไทย"
              description="นวดแผนไทยโบราณช่วยปรับสมดุลร่างกาย บรรเทาอาการปวดเมื่อย และเพิ่มความยืดหยุ่นของกล้ามเนื้อ"
              duration="60 นาที"
              price={500}
              image="/traditional-thai-stretch.png"
            />
            <ServiceCard
              title="นวดน้ำมันอโรมา"
              description="นวดด้วยน้ำมันหอมระเหยช่วยให้ร่างกายและจิตใจผ่อนคลาย ลดความเครียด และบำรุงผิวพรรณ"
              duration="90 นาที"
              price={800}
              image="/serene-massage.png"
            />
            <ServiceCard
              title="นวดกดจุด"
              description="นวดกดจุดช่วยกระตุ้นการไหลเวียนของเลือด บรรเทาอาการปวด และปรับสมดุลพลังงานในร่างกาย"
              duration="60 นาที"
              price={600}
              image="/placeholder.svg?key=5pucw"
            />
            <ServiceCard
              title="นวดศีรษะ ไหล่ และคอ"
              description="นวดเฉพาะส่วนบนของร่างกายช่วยบรรเทาความตึงเครียด ลดอาการปวดศีรษะ และผ่อนคลายกล้ามเนื้อบริเวณคอและไหล่"
              duration="45 นาที"
              price={400}
              image="/serene-shoulder-head-massage.png"
            />
            <ServiceCard
              title="นวดฝ่าเท้า"
              description="นวดกดจุดสะท้อนบนฝ่าเท้าช่วยกระตุ้นการทำงานของอวัยวะต่างๆ ในร่างกาย และช่วยให้รู้สึกผ่อนคลาย"
              duration="45 นาที"
              price={400}
              image="/relaxing-foot-massage.png"
            />
            <ServiceCard
              title="แพ็คเกจพิเศษ"
              description="แพ็คเกจนวดผสมผสานที่ออกแบบมาเพื่อการผ่อนคลายอย่างเต็มรูปแบบ ทั้งร่างกายและจิตใจ"
              duration="120 นาที"
              price={1200}
              image="/serene-spa-retreat.png"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 px-4 sm:px-6 lg:px-8 bg-navy-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-navy-900">เสียงจากลูกค้า</h2>
            <div className="w-24 h-1 bg-gold-500 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              name="คุณนภา วงศ์สุวรรณ"
              text="ประทับใจมากค่ะ นวดได้ตรงจุดที่ปวด หลังจากนวดเสร็จรู้สึกเบาสบายตัวมาก จะกลับมาใช้บริการอีกแน่นอนค่ะ"
              rating={5}
              image="/serene-asian-woman.png"
            />
            <TestimonialCard
              name="คุณสมชาย ใจดี"
              text="พนักงานนวดมีความชำนาญมาก บรรยากาศร้านก็ดี สะอาด เงียบสงบ ทำให้รู้สึกผ่อนคลายตั้งแต่ก้าวเข้าร้าน"
              rating={5}
              image="/placeholder.svg?key=ewoxr"
            />
            <TestimonialCard
              name="คุณวิภา รักสุขภาพ"
              text="มาใช้บริการประจำเดือนละครั้ง ช่วยให้อาการปวดหลังจากการทำงานหนักดีขึ้นมาก แนะนำสำหรับคนที่ทำงานออฟฟิศค่ะ"
              rating={4}
              image="/serene-gaze.png"
            />
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-16 px-4 sm:px-6 lg:px-8 bg-navy-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-navy-900">จองคิวนวด</h2>
            <div className="w-24 h-1 bg-gold-500 mx-auto mb-6"></div>
            <p className="text-navy-800 max-w-2xl mx-auto">
              จองคิวนวดล่วงหน้าเพื่อความสะดวกและรับสิทธิพิเศษสำหรับลูกค้าที่จองผ่านเว็บไซต์
            </p>
          </div>
          <BookingCta />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-navy-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-navy-900">ติดต่อเรา</h2>
            <div className="w-24 h-1 bg-gold-500 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-navy-200 p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-navy-900">ข้อมูลติดต่อ</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gold-500 mr-3 mt-1" />
                  <div>
                    <p className="font-medium text-navy-900">ที่อยู่</p>
                    <p className="text-navy-800">10/6 นิมมานเหมินทร์ 17 ต.สุเทพ อ.เมือง จ.เชียงใหม่ 50200</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-gold-500 mr-3 mt-1" />
                  <div>
                    <p className="font-medium text-navy-900">โทรศัพท์</p>
                    <p className="text-navy-800">098-596-6162</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-gold-500 mr-3 mt-1" />
                  <div>
                    <p className="font-medium text-navy-900">เวลาทำการ</p>
                    <p className="text-navy-800">ทุกวัน 10:00 - 22:00 น.</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4 text-navy-900">ติดตามเรา</h3>
                <div className="flex space-x-4">
                  <Link href="#" className="text-gold-500 hover:text-gold-600">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                  <Link href="#" className="text-gold-500 hover:text-gold-600">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                  <Link href="#" className="text-gold-500 hover:text-gold-600">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </Link>
                  <Link href="#" className="text-gold-500 hover:text-gold-600">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            <div>
              <div className="rounded-lg overflow-hidden h-[400px] shadow-md">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3777.067138219891!2d98.96454697519837!3d18.795161082352465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xeb8e1e4a6e5191d%3A0x39a3707df9861681!2sChaan%20Massage%20by%20Sirin!5e0!3m2!1sth!2sth!4v1744196331573!5m2!1sth!2sth"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Chaan Massage by Sirin location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="mb-4">
                <Image
                  src="/CHAAN_LOGO_2-02.png"
                  alt="Chaan Massage by Sirin"
                  width={180}
                  height={72}
                  className="object-contain"
                />
              </div>
              <p className="mb-4 text-navy-100">ประสบการณ์การนวดที่เป็นเอกลักษณ์เพื่อการผ่อนคลายอย่างแท้จริง</p>
              <p className="text-navy-200">
                &copy; {new Date().getFullYear()} Chaan Massage by Sirin. All rights reserved.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-gold-400">ลิงก์ด่วน</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-navy-100 hover:text-gold-400">
                    หน้าหลัก
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="text-navy-100 hover:text-gold-400">
                    เกี่ยวกับเรา
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="text-navy-100 hover:text-gold-400">
                    บริการ
                  </Link>
                </li>
                <li>
                  <Link href="#booking" className="text-navy-100 hover:text-gold-400">
                    จองคิว
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-navy-100 hover:text-gold-400">
                    ติดต่อเรา
                  </Link>
                </li>
                <li>
                  <Link href="/admin" className="text-navy-100 hover:text-gold-400">
                    สำหรับแอดมิน
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-gold-400">นโยบาย</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-navy-100 hover:text-gold-400">
                    นโยบายความเป็นส่วนตัว
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-navy-100 hover:text-gold-400">
                    ข้อกำหนดและเงื่อนไข
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-navy-100 hover:text-gold-400">
                    นโยบายการยกเลิก
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
