"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, rememberMe: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate authentication
    setTimeout(() => {
      // In a real app, you would validate credentials against a database
      if (formData.username === "demo" && formData.password === "password") {
        toast({
          title: "Login successful",
          description: "Welcome back to MediCare!",
        })
        router.push("/dashboard")
      } else {
        toast({
          title: "Login failed",
          description: "Invalid username or password. Please try again or create an account.",
          variant: "destructive",
        })
      }
      setIsLoading(false)
    }, 1500)
    
    router.push("/dashboard")
  }

  return (
    <div className="flex min-h-screen flex-col w-full items-center bg-gradient-to-b from-blue-100 to-blue-200">
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
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
          <h1 className="mb-6 text-center text-2xl font-bold text-blue-600">LOGIN</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                placeholder="Enter Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
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
            <div className="flex items-center space-x-2">
              <Checkbox id="rememberMe" checked={formData.rememberMe} onCheckedChange={handleCheckboxChange} />
              <Label htmlFor="rememberMe" className="text-sm font-normal">
                Remember me?
              </Label>
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
              {isLoading ? "Logging in..." : "LOGIN"}
            </Button>
            <div className="text-center text-sm">
              <span className="text-gray-500">OR</span>
            </div>
            <div className="flex justify-center space-x-4">
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md"
              >
                <Image src="/images/google.png" alt="Google" width={24} height={24} />
              </button>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md"
              >
                <Image src="/images/facebook.png" alt="Facebook" width={24} height={24} />
              </button>
            </div>
            <div className="text-center text-sm">
              <Link href="/forgot-password" className="text-blue-600 hover:underline">
                Forgot Password?
              </Link>
            </div>
            <div className="text-center text-sm">
              <span className="text-gray-500">Not a member?</span>{" "}
              <Link href="/signup" className="text-blue-600 hover:underline">
                signup now
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
