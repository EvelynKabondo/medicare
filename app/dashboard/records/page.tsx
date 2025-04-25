import { FileText, Download, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardLayout from "@/components/layout/dashboard-layout"

export default function RecordsPage() {
  // Sample medical records data
  const labResults = [
    {
      id: 1,
      name: "Complete Blood Count (CBC)",
      date: "April 15, 2025",
      doctor: "Dr. Sarah Johnson",
      status: "Normal",
    },
    {
      id: 2,
      name: "Lipid Panel",
      date: "April 15, 2025",
      doctor: "Dr. Sarah Johnson",
      status: "Abnormal",
    },
    {
      id: 3,
      name: "Urinalysis",
      date: "January 10, 2025",
      doctor: "Dr. Michael Chen",
      status: "Normal",
    },
  ]

  const medications = [
    {
      id: 1,
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      prescribedBy: "Dr. Robert Williams",
      startDate: "March 20, 2025",
      refillsRemaining: 2,
    },
    {
      id: 2,
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      prescribedBy: "Dr. Sarah Johnson",
      startDate: "April 15, 2025",
      refillsRemaining: 3,
    },
  ]

  const allergies = [
    {
      id: 1,
      name: "Penicillin",
      reaction: "Rash",
      severity: "Moderate",
    },
    {
      id: 2,
      name: "Peanuts",
      reaction: "Anaphylaxis",
      severity: "Severe",
    },
  ]

  const immunizations = [
    {
      id: 1,
      name: "Influenza (Flu)",
      date: "October 5, 2024",
      provider: "MediCare Clinic",
    },
    {
      id: 2,
      name: "COVID-19",
      date: "January 15, 2024",
      provider: "MediCare Clinic",
    },
    {
      id: 3,
      name: "Tetanus, Diphtheria, Pertussis (Tdap)",
      date: "May 20, 2023",
      provider: "Community Health Center",
    },
  ]

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Medical Records</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Lock className="mr-2 h-4 w-4" />
          Request Records Access
        </Button>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="lab-results">Lab Results</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="allergies">Allergies</TabsTrigger>
          <TabsTrigger value="immunizations">Immunizations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Lab Results</CardTitle>
                <CardDescription>Recent laboratory test results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {labResults.slice(0, 2).map((result) => (
                    <div key={result.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div>
                        <h3 className="font-medium">{result.name}</h3>
                        <p className="text-sm text-gray-500">{result.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded-full px-2 py-1 text-xs ${
                            result.status === "Normal" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {result.status}
                        </span>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Medications</CardTitle>
                <CardDescription>Prescribed medications and dosages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {medications.map((medication) => (
                    <div key={medication.id} className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{medication.name}</h3>
                        <span className="text-sm text-gray-500">Refills: {medication.refillsRemaining}</span>
                      </div>
                      <p className="text-sm text-gray-700">
                        {medication.dosage}, {medication.frequency}
                      </p>
                      <p className="text-sm text-gray-500">
                        Prescribed by {medication.prescribedBy} on {new Date(medication.startDate).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Allergies</CardTitle>
                <CardDescription>Known allergies and reactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allergies.map((allergy) => (
                    <div key={allergy.id} className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{allergy.name}</h3>
                        <span
                          className={`rounded-full px-2 py-1 text-xs ${
                            allergy.severity === "Mild"
                              ? "bg-blue-100 text-blue-800"
                              : allergy.severity === "Moderate"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {allergy.severity}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">Reaction: {allergy.reaction}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Immunizations</CardTitle>
                <CardDescription>Vaccination history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {immunizations.map((immunization) => (
                    <div key={immunization.id} className="rounded-lg border p-4">
                      <h3 className="font-medium">{immunization.name}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(immunization.date).toLocaleDateString()} at {immunization.provider}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="lab-results">
          <Card>
            <CardHeader>
              <CardTitle>Laboratory Test Results</CardTitle>
              <CardDescription>Complete history of your lab tests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {labResults.map((result) => (
                  <div key={result.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <h3 className="font-medium">{result.name}</h3>
                      <p className="text-sm text-gray-500">
                        {result.date} • Ordered by {result.doctor}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full px-2 py-1 text-xs ${
                          result.status === "Normal" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {result.status}
                      </span>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        View
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medications">
          <Card>
            <CardHeader>
              <CardTitle>Medications</CardTitle>
              <CardDescription>Current and past medications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="mb-4 font-medium">Current Medications</h3>
                  <div className="space-y-4">
                    {medications.map((medication) => (
                      <div key={medication.id} className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{medication.name}</h3>
                          <span className="text-sm text-gray-500">Refills: {medication.refillsRemaining}</span>
                        </div>
                        <p className="text-sm text-gray-700">
                          {medication.dosage}, {medication.frequency}
                        </p>
                        <p className="text-sm text-gray-500">
                          Prescribed by {medication.prescribedBy} on{" "}
                          {new Date(medication.startDate).toLocaleDateString()}
                        </p>
                        <div className="mt-2">
                          <Button variant="outline" size="sm">
                            Request Refill
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 font-medium">Medication History</h3>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Amoxicillin</h3>
                      <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-800">Completed</span>
                    </div>
                    <p className="text-sm text-gray-700">500mg, Three times daily for 10 days</p>
                    <p className="text-sm text-gray-500">
                      Prescribed by Dr. Sarah Johnson on {new Date("2025-01-05").toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="allergies">
          <Card>
            <CardHeader>
              <CardTitle>Allergies</CardTitle>
              <CardDescription>Known allergies and adverse reactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {allergies.map((allergy) => (
                  <div key={allergy.id} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{allergy.name}</h3>
                      <span
                        className={`rounded-full px-2 py-1 text-xs ${
                          allergy.severity === "Mild"
                            ? "bg-blue-100 text-blue-800"
                            : allergy.severity === "Moderate"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {allergy.severity}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">Reaction: {allergy.reaction}</p>
                  </div>
                ))}
                <Button variant="outline">Add New Allergy</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="immunizations">
          <Card>
            <CardHeader>
              <CardTitle>Immunizations</CardTitle>
              <CardDescription>Vaccination history and records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {immunizations.map((immunization) => (
                  <div key={immunization.id} className="rounded-lg border p-4">
                    <h3 className="font-medium">{immunization.name}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(immunization.date).toLocaleDateString()} at {immunization.provider}
                    </p>
                    <div className="mt-2">
                      <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        Download Record
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}
