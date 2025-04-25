"use client"

import { type ReactNode, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Bell, Calendar, FileText, Heart, Home, LogOut, Menu, MessageSquare, Settings, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useToast } from "@/components/ui/use-toast"

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    })
    router.push("/")
  }

  const navigationItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Appointments", href: "/dashboard/appointments", icon: Calendar },
    { name: "Medical Records", href: "/dashboard/records", icon: FileText },
    { name: "Health Tips", href: "/dashboard/health-tips", icon: Heart },
    { name: "Messages", href: "/dashboard/messages", icon: MessageSquare },
    { name: "Profile", href: "/dashboard/profile", icon: User },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-blue-50 to-white">
      <header className="sticky top-0 z-10 border-b bg-white shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/dashboard">
              <div className="flex items-center gap-2">
                <Image src="/images/logo.png" alt="MediCare Logo" width={40} height={40} className="h-10 w-10" />
                <span className="text-xl font-bold text-blue-600">MediCare</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
            </Button>

            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-6 flex flex-col gap-1">
                  {navigationItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center gap-3 rounded-md px-4 py-2 ${
                          isActive ? "bg-blue-100 text-blue-700 font-medium" : "hover:bg-gray-100"
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Icon className={`h-5 w-5 ${isActive ? "text-blue-600" : ""}`} />
                        <span>{item.name}</span>
                      </Link>
                    )
                  })}
                  <button
                    onClick={handleLogout}
                    className="mt-4 flex items-center gap-3 rounded-md px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="container flex-1 w-full mx-auto py-8">{children}</main>

      <footer className="border-t border-gray-200 bg-white py-4">
        <div className="container text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} MediCare. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
