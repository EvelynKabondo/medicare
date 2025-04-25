"use client"

import { useState } from "react"
import Image from "next/image"
import { BookOpen, Heart, Search, Tag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function HealthTipsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Sample health tips data
  const healthTips = [
    {
      id: 1,
      title: "The Importance of Staying Hydrated",
      excerpt: "Learn why drinking enough water is crucial for your overall health and wellbeing.",
      category: "nutrition",
      image: "/images/health-tip-1.jpg",
      readTime: "3 min read",
    },
    {
      id: 2,
      title: "Benefits of Regular Exercise",
      excerpt: "Discover how just 30 minutes of daily exercise can transform your health.",
      category: "fitness",
      image: "/images/health-tip-2.jpg",
      readTime: "5 min read",
    },
    {
      id: 3,
      title: "Managing Stress Through Mindfulness",
      excerpt: "Practical techniques to reduce stress and improve mental wellbeing through mindfulness.",
      category: "mental-health",
      image: "/images/health-tip-3.jpg",
      readTime: "4 min read",
    },
    {
      id: 4,
      title: "Healthy Eating on a Budget",
      excerpt: "Tips for maintaining a nutritious diet without breaking the bank.",
      category: "nutrition",
      image: "/images/health-tip-4.jpg",
      readTime: "6 min read",
    },
    {
      id: 5,
      title: "The Science of Sleep",
      excerpt: "Why quality sleep is essential and how to improve your sleep habits.",
      category: "wellness",
      image: "/images/health-tip-5.jpg",
      readTime: "7 min read",
    },
    {
      id: 6,
      title: "Understanding Seasonal Allergies",
      excerpt: "Learn about common triggers and how to manage seasonal allergy symptoms.",
      category: "wellness",
      image: "/images/health-tip-6.jpg",
      readTime: "4 min read",
    },
  ]

  // Filter health tips based on search query
  const filteredTips = healthTips.filter(
    (tip) =>
      tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Group tips by category for the "Categories" tab
  const categories = [...new Set(healthTips.map((tip) => tip.category))].map((category) => ({
    name: category,
    count: healthTips.filter((tip) => tip.category === category).length,
  }))

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Health Tips & Resources</h1>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <TabsList>
              <TabsTrigger value="all">All Tips</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="saved">Saved</TabsTrigger>
            </TabsList>

            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search health tips..."
                className="w-full pl-8 sm:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <TabsContent value="all" className="mt-6">
            {filteredTips.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredTips.map((tip) => (
                  <Card key={tip.id} className="overflow-hidden">
                    <div className="relative h-48 w-full">
                      <Image src={tip.image || "/placeholder.svg"} alt={tip.title} fill className="object-cover" />
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800 capitalize">
                          {tip.category.replace("-", " ")}
                        </span>
                        <span className="text-xs text-gray-500">{tip.readTime}</span>
                      </div>
                      <CardTitle className="line-clamp-2">{tip.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{tip.excerpt}</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        Read More
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed p-8 text-center">
                <p className="text-gray-500">No health tips found matching your search.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="categories" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <Card key={category.name} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Tag className="h-5 w-5 text-blue-600" />
                      <CardTitle className="capitalize">{category.name.replace("-", " ")}</CardTitle>
                    </div>
                    <CardDescription>{category.count} articles</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {healthTips
                        .filter((tip) => tip.category === category.name)
                        .slice(0, 3)
                        .map((tip) => (
                          <li key={tip.id} className="text-sm">
                            • {tip.title}
                          </li>
                        ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      View All Articles
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="saved" className="mt-6">
            <div className="rounded-lg border border-dashed p-8 text-center">
              <p className="text-gray-500">You haven't saved any health tips yet.</p>
              <Button variant="outline" className="mt-4">
                Browse All Tips
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
