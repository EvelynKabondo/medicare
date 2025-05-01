import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function WelcomePage() {
  return (
    <div className="flex min-h-screen items-center flex-col bg-gradient-to-b from-blue-100 to-blue-200">
      <header className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="MediCare Logo" width={40} height={40} className="h-10 w-10" />
          <span className="text-xl font-bold text-blue-600">Mwaiwathu Private Hospital</span>
        </div>
      </header>
      <main className="container flex flex-1 flex-col items-center justify-center py-12">
        <div className="mx-auto max-w-md text-center">
          <h1 className="text-4xl font-bold tracking-tight text-blue-600 sm:text-5xl">Doctor's Appointment System</h1>
          <p className="mt-4 text-lg text-gray-600">
            Book appointments with qualified doctors, track your medical history, and manage your healthcare journey.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/login">
                Login
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              <Link href="/signup">Create Account</Link>
            </Button>
          </div>
        </div>
        <div className="mt-12">
          <Image src="/images/doctors.png" alt="Doctors" width={600} height={400} className="rounded-lg shadow-lg" />
        </div>
      </main>
      <footer className="border-t border-gray-200 bg-white py-6">
        <div className="container text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Mwaiwathu Private Hospital. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
