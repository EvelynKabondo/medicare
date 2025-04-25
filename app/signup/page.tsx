"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, ChevronDown, ChevronUp, Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

export default function SignupPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [personalExpanded, setPersonalExpanded] = useState(true)
  const [medicalExpanded, setMedicalExpanded] = useState(false)
  const [loginExpanded, setLoginExpanded] = useState(false)

  const [formData, setFormData] = useState({
    // Personal details
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    maritalStatus: "",
    occupation: "",
    nationality: "",
    phoneNumber: "",
    postalAddress: "",
    email: "",

    // Next of kin
    kinName: "",
    kinRelationship: "",
    kinEmail: "",
    kinPostalAddress: "",
    kinPhoneNumber: "",

    // Medical history
    bloodType: "",
    chronicIllness: "",
    medications: [{ pillName: "", dosage: "" }],
    allergies: [{ name: "", reactionType: "", severity: "" }],
    familyMedicalHistory: [{ relation: "", condition: "" }],
    additionalInfo: "",

    // Login credentials
    username: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleMedicationChange = (index: number, field: string, value: string) => {
    const updatedMedications = [...formData.medications]
    updatedMedications[index] = { ...updatedMedications[index], [field]: value }
    setFormData((prev) => ({ ...prev, medications: updatedMedications }))
  }

  const addMedication = () => {
    setFormData((prev) => ({
      ...prev,
      medications: [...prev.medications, { pillName: "", dosage: "" }],
    }))
  }

  const removeMedication = (index: number) => {
    const updatedMedications = [...formData.medications]
    updatedMedications.splice(index, 1)
    setFormData((prev) => ({ ...prev, medications: updatedMedications }))
  }

  const handleAllergyChange = (index: number, field: string, value: string) => {
    const updatedAllergies = [...formData.allergies]
    updatedAllergies[index] = { ...updatedAllergies[index], [field]: value }
    setFormData((prev) => ({ ...prev, allergies: updatedAllergies }))
  }

  const addAllergy = () => {
    setFormData((prev) => ({
      ...prev,
      allergies: [...prev.allergies, { name: "", reactionType: "", severity: "" }],
    }))
  }

  const removeAllergy = (index: number) => {
    const updatedAllergies = [...formData.allergies]
    updatedAllergies.splice(index, 1)
    setFormData((prev) => ({ ...prev, allergies: updatedAllergies }))
  }

  const handleFamilyHistoryChange = (index: number, field: string, value: string) => {
    const updatedFamilyHistory = [...formData.familyMedicalHistory]
    updatedFamilyHistory[index] = { ...updatedFamilyHistory[index], [field]: value }
    setFormData((prev) => ({ ...prev, familyMedicalHistory: updatedFamilyHistory }))
  }

  const addFamilyHistory = () => {
    setFormData((prev) => ({
      ...prev,
      familyMedicalHistory: [...prev.familyMedicalHistory, { relation: "", condition: "" }],
    }))
  }

  const removeFamilyHistory = (index: number) => {
    const updatedFamilyHistory = [...formData.familyMedicalHistory]
    updatedFamilyHistory.splice(index, 1)
    setFormData((prev) => ({ ...prev, familyMedicalHistory: updatedFamilyHistory }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate account creation
    setTimeout(() => {
      toast({
        title: "Account created successfully!",
        description: "You can now log in with your credentials.",
      })
      router.push("/login")
      setIsLoading(false)
    }, 2000)
  }

  const toggleSection = (section: string) => {
    if (section === "personal") {
      setPersonalExpanded(!personalExpanded)
      if (!personalExpanded) {
        setMedicalExpanded(false)
        setLoginExpanded(false)
      }
    } else if (section === "medical") {
      setMedicalExpanded(!medicalExpanded)
      if (!medicalExpanded) {
        setPersonalExpanded(false)
        setLoginExpanded(false)
      }
    } else if (section === "login") {
      setLoginExpanded(!loginExpanded)
      if (!loginExpanded) {
        setPersonalExpanded(false)
        setMedicalExpanded(false)
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center flex-col bg-gradient-to-b from-blue-100 to-blue-200">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="flex items-center text-blue-600">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Link>
        <div className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="MediCare Logo" width={40} height={40} className="h-10 w-10" />
        </div>
      </div>
      <main className="container flex flex-1 flex-col items-center justify-center py-8">
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
          <h1 className="mb-6 text-center text-2xl font-bold text-blue-600">SIGN UP</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Personal Details Section */}
            <div className="rounded-md bg-blue-100 p-4">
              <button
                type="button"
                className="flex w-full items-center justify-between"
                onClick={() => toggleSection("personal")}
              >
                <span className="font-medium text-blue-800">Personal details</span>
                {personalExpanded ? (
                  <ChevronUp className="h-5 w-5 text-blue-800" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-blue-800" />
                )}
              </button>

              {personalExpanded && (
                <div className="mt-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="firstName">First name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last name</Label>
                      <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="dateOfBirth">Date of birth</Label>
                    <Input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="maritalStatus">Marital status</Label>
                    <Select
                      value={formData.maritalStatus}
                      onValueChange={(value) => handleSelectChange("maritalStatus", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select marital status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="married">Married</SelectItem>
                        <SelectItem value="divorced">Divorced</SelectItem>
                        <SelectItem value="widowed">Widowed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="occupation">Occupation</Label>
                    <Input
                      id="occupation"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="nationality">Nationality</Label>
                    <Input
                      id="nationality"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phoneNumber">Phone number</Label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="postalAddress">Postal address</Label>
                    <Input
                      id="postalAddress"
                      name="postalAddress"
                      value={formData.postalAddress}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="pt-4">
                    <h3 className="mb-3 font-medium text-blue-800">Next of kin details</h3>

                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="kinName">Full name</Label>
                        <Input id="kinName" name="kinName" value={formData.kinName} onChange={handleChange} required />
                      </div>

                      <div>
                        <Label htmlFor="kinRelationship">Relationship</Label>
                        <Input
                          id="kinRelationship"
                          name="kinRelationship"
                          value={formData.kinRelationship}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="kinEmail">Email address</Label>
                        <Input
                          id="kinEmail"
                          name="kinEmail"
                          type="email"
                          value={formData.kinEmail}
                          onChange={handleChange}
                        />
                      </div>

                      <div>
                        <Label htmlFor="kinPhoneNumber">Phone number</Label>
                        <Input
                          id="kinPhoneNumber"
                          name="kinPhoneNumber"
                          type="tel"
                          value={formData.kinPhoneNumber}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="kinPostalAddress">Postal address</Label>
                        <Input
                          id="kinPostalAddress"
                          name="kinPostalAddress"
                          value={formData.kinPostalAddress}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Medical History Section */}
            <div className="rounded-md bg-blue-100 p-4">
              <button
                type="button"
                className="flex w-full items-center justify-between"
                onClick={() => toggleSection("medical")}
              >
                <span className="font-medium text-blue-800">Medical history (optional)</span>
                {medicalExpanded ? (
                  <ChevronUp className="h-5 w-5 text-blue-800" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-blue-800" />
                )}
              </button>

              {medicalExpanded && (
                <div className="mt-4 space-y-3">
                  <div>
                    <Label htmlFor="bloodType">Blood type</Label>
                    <Select
                      value={formData.bloodType}
                      onValueChange={(value) => handleSelectChange("bloodType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select blood type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                        <SelectItem value="unknown">Unknown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="chronicIllness">Chronic illness</Label>
                    <Textarea
                      id="chronicIllness"
                      name="chronicIllness"
                      value={formData.chronicIllness}
                      onChange={handleChange}
                      maxLength={150}
                    />
                    <div className="mt-1 text-right text-xs text-gray-500">{formData.chronicIllness.length}/150</div>
                  </div>

                  <div className="space-y-2">
                    <Label>Current medications</Label>
                    {formData.medications.map((medication, index) => (
                      <div key={index} className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder="Pill name"
                          value={medication.pillName}
                          onChange={(e) => handleMedicationChange(index, "pillName", e.target.value)}
                        />
                        <div className="flex gap-2">
                          <Input
                            placeholder="Dosage"
                            value={medication.dosage}
                            onChange={(e) => handleMedicationChange(index, "dosage", e.target.value)}
                          />
                          {index > 0 && (
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              onClick={() => removeMedication(index)}
                              className="h-10 w-10 flex-shrink-0"
                            >
                              -
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={addMedication} className="mt-2">
                      Add Medication
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label>Allergies</Label>
                    {formData.allergies.map((allergy, index) => (
                      <div key={index} className="space-y-2">
                        <Input
                          placeholder="Allergy name"
                          value={allergy.name}
                          onChange={(e) => handleAllergyChange(index, "name", e.target.value)}
                        />
                        <Input
                          placeholder="Reaction type"
                          value={allergy.reactionType}
                          onChange={(e) => handleAllergyChange(index, "reactionType", e.target.value)}
                        />
                        <div className="flex items-center gap-2">
                          <Label className="text-sm">Severity:</Label>
                          <RadioGroup
                            value={allergy.severity}
                            onValueChange={(value) => handleAllergyChange(index, "severity", value)}
                            className="flex gap-4"
                          >
                            <div className="flex items-center space-x-1">
                              <RadioGroupItem value="mild" id={`mild-${index}`} />
                              <Label htmlFor={`mild-${index}`} className="text-sm font-normal">
                                Mild
                              </Label>
                            </div>
                            <div className="flex items-center space-x-1">
                              <RadioGroupItem value="moderate" id={`moderate-${index}`} />
                              <Label htmlFor={`moderate-${index}`} className="text-sm font-normal">
                                Moderate
                              </Label>
                            </div>
                            <div className="flex items-center space-x-1">
                              <RadioGroupItem value="severe" id={`severe-${index}`} />
                              <Label htmlFor={`severe-${index}`} className="text-sm font-normal">
                                Severe
                              </Label>
                            </div>
                          </RadioGroup>
                          {index > 0 && (
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              onClick={() => removeAllergy(index)}
                              className="ml-auto h-8 w-8"
                            >
                              -
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={addAllergy} className="mt-2">
                      Add Allergy
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label>Family medical history</Label>
                    {formData.familyMedicalHistory.map((history, index) => (
                      <div key={index} className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder="Relation (e.g., mother, father)"
                          value={history.relation}
                          onChange={(e) => handleFamilyHistoryChange(index, "relation", e.target.value)}
                        />
                        <div className="flex gap-2">
                          <Input
                            placeholder="Condition (e.g., asthma)"
                            value={history.condition}
                            onChange={(e) => handleFamilyHistoryChange(index, "condition", e.target.value)}
                          />
                          {index > 0 && (
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              onClick={() => removeFamilyHistory(index)}
                              className="h-10 w-10 flex-shrink-0"
                            >
                              -
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={addFamilyHistory} className="mt-2">
                      Add Family History
                    </Button>
                  </div>

                  <div>
                    <Label htmlFor="additionalInfo">Additional information</Label>
                    <Textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Login Credentials Section */}
            <div className="rounded-md bg-blue-100 p-4">
              <button
                type="button"
                className="flex w-full items-center justify-between"
                onClick={() => toggleSection("login")}
              >
                <span className="font-medium text-blue-800">Login credentials</span>
                {loginExpanded ? (
                  <ChevronUp className="h-5 w-5 text-blue-800" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-blue-800" />
                )}
              </button>

              {loginExpanded && (
                <div className="mt-4 space-y-3">
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" name="username" value={formData.username} onChange={handleChange} required />
                  </div>

                  <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>

            <div className="text-center text-sm">
              <span className="text-gray-500">Already have an account?</span>{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
