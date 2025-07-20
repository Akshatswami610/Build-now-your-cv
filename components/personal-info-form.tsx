"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Linkedin, Github, Globe } from "lucide-react"

interface PersonalInfoData {
  fullName: string
  email: string
  phone: string
  location: string
  linkedin: string
  github: string
  portfolio: string
}

interface PersonalInfoFormProps {
  data: PersonalInfoData
  onChange: (data: PersonalInfoData) => void
}

export function PersonalInfoForm({ data, onChange }: PersonalInfoFormProps) {
  const updateField = (field: keyof PersonalInfoData, value: string) => {
    onChange({
      ...data,
      [field]: value,
    })
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Personal Information</h2>
        <p className="text-muted-foreground">Let's start with your basic contact details</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Basic Information
            </CardTitle>
            <CardDescription>Your name and contact details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                placeholder="John Doe"
                value={data.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@email.com"
                value={data.email}
                onChange={(e) => updateField("email", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="+1 (555) 123-4567"
                value={data.phone}
                onChange={(e) => updateField("phone", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="City, State"
                value={data.location}
                onChange={(e) => updateField("location", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Online Presence
            </CardTitle>
            <CardDescription>Your professional profiles and portfolio</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="linkedin" className="flex items-center gap-2">
                <Linkedin className="h-4 w-4" />
                LinkedIn Profile
              </Label>
              <Input
                id="linkedin"
                placeholder="linkedin.com/in/johndoe"
                value={data.linkedin}
                onChange={(e) => updateField("linkedin", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="github" className="flex items-center gap-2">
                <Github className="h-4 w-4" />
                GitHub Profile
              </Label>
              <Input
                id="github"
                placeholder="github.com/johndoe"
                value={data.github}
                onChange={(e) => updateField("github", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="portfolio">Portfolio Website</Label>
              <Input
                id="portfolio"
                placeholder="johndoe.dev"
                value={data.portfolio}
                onChange={(e) => updateField("portfolio", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
