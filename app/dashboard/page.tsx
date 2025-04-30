import Link from "next/link"
import { Calendar, ChevronRight, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import DashboardLayout from "@/components/layout/dashboard-layout"

export default function DashboardPage() {
  const appointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Kapitawo",
      specialty: "General Practitioner",
      date: "2025-05-10",
      time: "10:00 AM",
      status: "Upcoming",
    },
    {
      id: 2,
      doctor: "Dr. Michael Kabondo",
      specialty: "Dermatologist",
      date: "2025-04-28",
      time: "2:30 PM",
      status: "Completed",
    },
  ]

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Welcome, John</h1>
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link href="/dashboard/book-appointment">Book Appointment</Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>Your scheduled appointments</CardDescription>
          </CardHeader>
          <CardContent>
            {appointments.filter((a) => a.status === "Upcoming").length > 0 ? (
              <div className="space-y-4">
                {appointments
                  .filter((a) => a.status === "Upcoming")
                  .map((appointment) => (
                    <div key={appointment.id} className="rounded-lg border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="font-medium">{appointment.doctor}</h3>
                        <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                          {appointment.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{appointment.specialty}</p>
                      <div className="mt-2 flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span>{new Date(appointment.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span>{appointment.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="py-4 text-center text-gray-500">No upcoming appointments</div>
            )}
            <Link
              href="/dashboard/appointments"
              className="mt-4 flex items-center justify-center text-sm text-blue-600 hover:underline"
            >
              View all appointments
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Medical Records</CardTitle>
            <CardDescription>Your health information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="font-medium">Recent Lab Results</h3>
                <p className="text-sm text-gray-500">Blood work - April 15, 2025</p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="font-medium">Prescription Refills</h3>
                <p className="text-sm text-gray-500">2 medications need refill</p>
              </div>
            </div>
            <Link
              href="/dashboard/records"
              className="mt-4 flex items-center justify-center text-sm text-blue-600 hover:underline"
            >
              View all records
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Health Tips</CardTitle>
            <CardDescription>Personalized for you</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="font-medium">Stay Hydrated</h3>
                <p className="text-sm text-gray-500">Remember to drink at least 8 glasses of water daily.</p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="font-medium">Exercise Regularly</h3>
                <p className="text-sm text-gray-500">Aim for 30 minutes of moderate activity most days.</p>
              </div>
            </div>
            <Link
              href="/dashboard/health-tips"
              className="mt-4 flex items-center justify-center text-sm text-blue-600 hover:underline"
            >
              View all tips
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
