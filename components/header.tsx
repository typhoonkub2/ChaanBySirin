"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <div className="relative h-14 w-auto">
            <Image
              src="/CHAAN_LOGO_2-02.png"
              alt="Chaan Massage by Sirin"
              width={140}
              height={56}
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className={`font-medium hover:text-gold-500 transition-colors ${isScrolled ? "text-navy-900" : "text-white"}`}
          >
            หน้าหลัก
          </Link>
          <Link
            href="#about"
            className={`font-medium hover:text-gold-500 transition-colors ${isScrolled ? "text-navy-900" : "text-white"}`}
          >
            เกี่ยวกับเรา
          </Link>
          <Link
            href="#services"
            className={`font-medium hover:text-gold-500 transition-colors ${isScrolled ? "text-navy-900" : "text-white"}`}
          >
            บริการ
          </Link>
          <Link
            href="#testimonials"
            className={`font-medium hover:text-gold-500 transition-colors ${isScrolled ? "text-navy-900" : "text-white"}`}
          >
            รีวิว
          </Link>
          <Link
            href="#contact"
            className={`font-medium hover:text-gold-500 transition-colors ${isScrolled ? "text-navy-900" : "text-white"}`}
          >
            ติดต่อ
          </Link>
          <Button asChild size="sm" className="rounded-full px-6 bg-gold-500 hover:bg-gold-600 text-navy-900">
            <Link href="/booking">จองคิว</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            <X className={`h-6 w-6 ${isScrolled ? "text-navy-900" : "text-white"}`} />
          ) : (
            <Menu className={`h-6 w-6 ${isScrolled ? "text-navy-900" : "text-white"}`} />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              href="/"
              className="font-medium text-navy-900 hover:text-gold-500 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              หน้าหลัก
            </Link>
            <Link
              href="#about"
              className="font-medium text-navy-900 hover:text-gold-500 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              เกี่ยวกับเรา
            </Link>
            <Link
              href="#services"
              className="font-medium text-navy-900 hover:text-gold-500 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              บริการ
            </Link>
            <Link
              href="#testimonials"
              className="font-medium text-navy-900 hover:text-gold-500 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              รีวิว
            </Link>
            <Link
              href="#contact"
              className="font-medium text-navy-900 hover:text-gold-500 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ติดต่อ
            </Link>
            <Button asChild size="sm" className="rounded-full px-6 w-full bg-gold-500 hover:bg-gold-600 text-navy-900">
              <Link href="/booking" onClick={() => setIsMobileMenuOpen(false)}>
                จองคิว
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
