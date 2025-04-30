"use client"

import { useState } from "react"
import { Calendar, Clock, Filter, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"

export default function AppointmentsPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Sample appointment data
  const appointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Kapitawo",
      specialty: "General Practitioner",
      date: "2025-05-10",
      time: "10:00 AM",
      reason: "Annual checkup",
      status: "upcoming",
    },
    {
      id: 2,
      doctor: "Dr. Michael Kabondo",
      specialty: "Dermatologist",
      date: "2025-04-28",
      time: "2:30 PM",
      reason: "Skin rash examination",
      status: "completed",
    },
    {
      id: 3,
      doctor: "Dr. Emily Silwamba",
      specialty: "Orthopedic Surgeon",
      date: "2025-05-15",
      time: "11:30 AM",
      reason: "Knee pain consultation",
      status: "upcoming",
    },
    {
      id: 4,
      doctor: "Dr. Robert Kamanga",
      specialty: "Cardiologist",
      date: "2025-03-20",
      time: "9:00 AM",
      reason: "Heart palpitations",
      status: "completed",
    },
    {
      id: 5,
      doctor: "Dr. Lisa Banda",
      specialty: "Gynecologist",
      date: "2025-06-05",
      time: "3:45 PM",
      reason: "Annual women's health exam",
      status: "upcoming",
    },
  ]

  const handleReschedule = (id: number) => {
    toast({
      title: "Reschedule requested",
      description: `You've requested to reschedule appointment #${id}. Our staff will contact you shortly.`,
    })
  }

  const handleCancel = (id: number) => {
    toast({
      title: "Appointment cancelled",
      description: `Appointment #${id} has been cancelled.`,
      variant: "destructive",
    })
  }

  // Filter appointments based on search query and status filter
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.reason.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Appointments</h1>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Manage Your Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="completed">Past</TabsTrigger>
              </TabsList>

              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search appointments..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="all" className="mt-6">
              <div className="space-y-4">
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((appointment) => (
                    <div key={appointment.id} className="rounded-lg border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="font-medium">{appointment.doctor}</h3>
                        <span
                          className={`rounded-full px-2 py-1 text-xs ${
                            appointment.status === "upcoming"
                              ? "bg-blue-100 text-blue-800"
                              : appointment.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{appointment.specialty}</p>
                      <p className="text-sm text-gray-700">{appointment.reason}</p>
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
                      {appointment.status === "upcoming" && (
                        <div className="mt-4 flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleReschedule(appointment.id)}>
                            Reschedule
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:bg-red-50 hover:text-red-700"
                            onClick={() => handleCancel(appointment.id)}
                          >
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="rounded-lg border border-dashed p-8 text-center">
                    <p className="text-gray-500">No appointments found matching your criteria.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="upcoming" className="mt-6">
              <div className="space-y-4">
                {filteredAppointments.filter((a) => a.status === "upcoming").length > 0 ? (
                  filteredAppointments
                    .filter((a) => a.status === "upcoming")
                    .map((appointment) => (
                      <div key={appointment.id} className="rounded-lg border p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <h3 className="font-medium">{appointment.doctor}</h3>
                          <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">Upcoming</span>
                        </div>
                        <p className="text-sm text-gray-500">{appointment.specialty}</p>
                        <p className="text-sm text-gray-700">{appointment.reason}</p>
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
                        <div className="mt-4 flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleReschedule(appointment.id)}>
                            Reschedule
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:bg-red-50 hover:text-red-700"
                            onClick={() => handleCancel(appointment.id)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="rounded-lg border border-dashed p-8 text-center">
                    <p className="text-gray-500">No upcoming appointments found.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="mt-6">
              <div className="space-y-4">
                {filteredAppointments.filter((a) => a.status === "completed").length > 0 ? (
                  filteredAppointments
                    .filter((a) => a.status === "completed")
                    .map((appointment) => (
                      <div key={appointment.id} className="rounded-lg border p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <h3 className="font-medium">{appointment.doctor}</h3>
                          <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">Completed</span>
                        </div>
                        <p className="text-sm text-gray-500">{appointment.specialty}</p>
                        <p className="text-sm text-gray-700">{appointment.reason}</p>
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
                        <div className="mt-4">
                          <Button variant="outline" size="sm">
                            View Summary
                          </Button>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="rounded-lg border border-dashed p-8 text-center">
                    <p className="text-gray-500">No past appointments found.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
