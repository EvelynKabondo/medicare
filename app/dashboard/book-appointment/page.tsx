"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar, Check, CreditCard } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

export default function BookAppointmentPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    symptoms: "",
    specialtyNeeded: "",
    preferredDate: "",
    preferredTime: "",
    paymentMethod: "mobileMoney",
    phoneNumber: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false)
      setCurrentStep(4) // Move to success step
      toast({
        title: "Payment successful",
        description: "Your appointment has been scheduled.",
      })
    }, 2000)
  }

  const handleFinish = () => {
    router.push("/dashboard")
  }

  const availableTimes = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
  ]

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-center text-2xl font-bold">Book an Appointment</h1>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    currentStep >= step ? "bg-blue-600 text-white" : "border border-gray-300 bg-white text-gray-400"
                  }`}
                >
                  {currentStep > step ? <Check className="h-4 w-4" /> : step}
                </div>
                <span className="mt-2 text-xs">
                  {step === 1 && "Symptoms"}
                  {step === 2 && "Schedule"}
                  {step === 3 && "Payment"}
                  {step === 4 && "Confirmation"}
                </span>
              </div>
            ))}
          </div>
          <div className="relative mt-2">
            <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-gray-200"></div>
            <div
              className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 bg-blue-600 transition-all duration-300"
              style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1: Symptoms */}
        {currentStep === 1 && (
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Describe your symptoms</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="symptoms">What symptoms are you experiencing?</Label>
                <Textarea
                  id="symptoms"
                  name="symptoms"
                  value={formData.symptoms}
                  onChange={handleChange}
                  placeholder="Please describe your symptoms in detail..."
                  className="h-32"
                  required
                />
              </div>

              <div>
                <Label htmlFor="specialtyNeeded">What type of doctor do you need?</Label>
                <Select
                  value={formData.specialtyNeeded}
                  onValueChange={(value) => handleSelectChange("specialtyNeeded", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Practitioner</SelectItem>
                    <SelectItem value="dermatology">Dermatologist</SelectItem>
                    <SelectItem value="cardiology">Cardiologist</SelectItem>
                    <SelectItem value="orthopedics">Orthopedic Surgeon</SelectItem>
                    <SelectItem value="pediatrics">Pediatrician</SelectItem>
                    <SelectItem value="gynecology">Gynecologist</SelectItem>
                    <SelectItem value="neurology">Neurologist</SelectItem>
                    <SelectItem value="psychiatry">Psychiatrist</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700">
                  Next
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Schedule */}
        {currentStep === 2 && (
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Choose appointment time</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="preferredDate">Preferred date</Label>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                  <Input
                    id="preferredDate"
                    name="preferredDate"
                    type="date"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="preferredTime">Available time slots</Label>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {availableTimes.map((time) => (
                    <Button
                      key={time}
                      type="button"
                      variant={formData.preferredTime === time ? "default" : "outline"}
                      className={formData.preferredTime === time ? "bg-blue-600" : ""}
                      onClick={() => handleSelectChange("preferredTime", time)}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
                <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700">
                  Next
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {currentStep === 3 && (
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Payment</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="mb-2 font-medium">Appointment Details</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-500">Specialty:</div>
                  <div>
                    {formData.specialtyNeeded === "general" && "General Practitioner"}
                    {formData.specialtyNeeded === "dermatology" && "Dermatologist"}
                    {formData.specialtyNeeded === "cardiology" && "Cardiologist"}
                    {formData.specialtyNeeded === "orthopedics" && "Orthopedic Surgeon"}
                    {formData.specialtyNeeded === "pediatrics" && "Pediatrician"}
                    {formData.specialtyNeeded === "gynecology" && "Gynecologist"}
                    {formData.specialtyNeeded === "neurology" && "Neurologist"}
                    {formData.specialtyNeeded === "psychiatry" && "Psychiatrist"}
                    {formData.specialtyNeeded === "other" && "Specialist"}
                  </div>
                  <div className="text-gray-500">Date:</div>
                  <div>{formData.preferredDate}</div>
                  <div className="text-gray-500">Time:</div>
                  <div>{formData.preferredTime}</div>
                  <div className="text-gray-500">Fee:</div>
                  <div className="font-medium">MK10000</div>
                </div>
              </div>

              <div>
                <Label className="mb-2 block">Payment Method</Label>
                <RadioGroup
                  value={formData.paymentMethod}
                  onValueChange={(value) => handleSelectChange("paymentMethod", value)}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="mobileMoney" id="mobileMoney" />
                    <Label htmlFor="mobileMoney" className="flex-1 cursor-pointer font-normal">
                      Mobile Money
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="creditCard" id="creditCard" />
                    <Label htmlFor="creditCard" className="flex-1 cursor-pointer font-normal">
                      Credit/Debit Card
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.paymentMethod === "mobileMoney" && (
                <div>
                  <Label htmlFor="phoneNumber">Mobile Money Number</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    placeholder="Enter your mobile money number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              {formData.paymentMethod === "creditCard" && (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <div className="relative">
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        required
                      />
                      <CreditCard className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="cardExpiry">Expiry Date</Label>
                      <Input
                        id="cardExpiry"
                        name="cardExpiry"
                        placeholder="MM/YY"
                        value={formData.cardExpiry}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cardCvv">CVV</Label>
                      <Input
                        id="cardCvv"
                        name="cardCvv"
                        placeholder="123"
                        value={formData.cardCvv}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={handleBack}>
                  Back
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                  {isLoading ? "Processing..." : `Pay $25.00`}
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {currentStep === 4 && (
          <div className="rounded-lg border bg-white p-6 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="mb-2 text-2xl font-semibold text-green-600">Appointment Confirmed!</h2>
            <p className="mb-6 text-gray-600">
              Your appointment has been successfully scheduled. You will receive a confirmation email shortly.
            </p>

            <Card className="mb-6 bg-blue-50">
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="font-medium text-gray-600">Doctor:</div>
                  <div>
                    {formData.specialtyNeeded === "general" && "Dr. Sarah Johnson"}
                    {formData.specialtyNeeded === "dermatology" && "Dr. Michael Chen"}
                    {formData.specialtyNeeded === "cardiology" && "Dr. Robert Williams"}
                    {formData.specialtyNeeded === "orthopedics" && "Dr. Emily Davis"}
                    {formData.specialtyNeeded === "pediatrics" && "Dr. James Wilson"}
                    {formData.specialtyNeeded === "gynecology" && "Dr. Lisa Thompson"}
                    {formData.specialtyNeeded === "neurology" && "Dr. David Miller"}
                    {formData.specialtyNeeded === "psychiatry" && "Dr. Jennifer Brown"}
                    {formData.specialtyNeeded === "other" && "Dr. Thomas Anderson"}
                  </div>
                  <div className="font-medium text-gray-600">Date:</div>
                  <div>{formData.preferredDate}</div>
                  <div className="font-medium text-gray-600">Time:</div>
                  <div>{formData.preferredTime}</div>
                  <div className="font-medium text-gray-600">Location:</div>
                  <div>Mwaiwaithu Private Hospital, Nyambabdwe,Old Chileka Road.</div>
                  <div className="font-medium text-gray-600">Appointment ID:</div>
                  <div>
                    APT-
                    {Math.floor(Math.random() * 10000)
                      .toString()
                      .padStart(4, "0")}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button onClick={handleFinish} className="bg-blue-600 hover:bg-blue-700">
              Return to Dashboard
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
