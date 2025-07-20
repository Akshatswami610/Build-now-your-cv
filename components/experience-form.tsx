"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Trash2, Briefcase, Sparkles, Loader2 } from "lucide-react"
import { generateResumeImprovement } from "@/lib/gemini"
import { useState } from "react"

interface ExperienceEntry {
  id: string
  company: string
  position: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

interface ExperienceFormProps {
  data: ExperienceEntry[]
  onChange: (data: ExperienceEntry[]) => void
  resumeType: "job" | "internship" | "hackathon"
}

export function ExperienceForm({ data, onChange, resumeType }: ExperienceFormProps) {
  const [isImproving, setIsImproving] = useState<string | null>(null)

  const addExperience = () => {
    const newExperience: ExperienceEntry = {
      id: Date.now().toString(),
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    }
    onChange([...data, newExperience])
  }

  const updateExperience = (id: string, field: keyof ExperienceEntry, value: string | boolean) => {
    onChange(data.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)))
  }

  const removeExperience = (id: string) => {
    onChange(data.filter((exp) => exp.id !== id))
  }

  const getPlaceholders = () => {
    switch (resumeType) {
      case "internship":
        return {
          company: "Company Name or Organization",
          position: "Intern, Volunteer, Part-time Role",
          description:
            "Describe your responsibilities, projects worked on, and skills gained during this experience...",
        }
      case "hackathon":
        return {
          company: "Company, Startup, or Organization",
          position: "Developer, Contributor, Team Member",
          description: "Focus on technical contributions, technologies used, and impact created...",
        }
      default:
        return {
          company: "Company Name",
          position: "Job Title",
          description: "Describe your key responsibilities, achievements, and impact in this role...",
        }
    }
  }

  const placeholders = getPlaceholders()

  const improveDescription = async (experienceId: string, currentDescription: string) => {
    if (!currentDescription.trim()) return

    setIsImproving(experienceId)
    try {
      const improvement = await generateResumeImprovement("experience", currentDescription, resumeType)
      updateExperience(experienceId, "description", improvement.improved)
    } catch (error) {
      console.error("Failed to improve description:", error)
    } finally {
      setIsImproving(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Work Experience</h2>
        <p className="text-muted-foreground">
          {resumeType === "internship"
            ? "Include internships, part-time jobs, volunteer work, and relevant experiences"
            : resumeType === "hackathon"
              ? "Focus on technical roles, contributions, and project-based work"
              : "Add your professional work experience and achievements"}
        </p>
      </div>

      <div className="space-y-4">
        {data.map((experience) => (
          <Card key={experience.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Experience Entry
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeExperience(experience.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`company-${experience.id}`}>Company/Organization *</Label>
                  <Input
                    id={`company-${experience.id}`}
                    placeholder={placeholders.company}
                    value={experience.company}
                    onChange={(e) => updateExperience(experience.id, "company", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`position-${experience.id}`}>Position/Role *</Label>
                  <Input
                    id={`position-${experience.id}`}
                    placeholder={placeholders.position}
                    value={experience.position}
                    onChange={(e) => updateExperience(experience.id, "position", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`location-${experience.id}`}>Location</Label>
                  <Input
                    id={`location-${experience.id}`}
                    placeholder="City, State or Remote"
                    value={experience.location}
                    onChange={(e) => updateExperience(experience.id, "location", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor={`startDate-${experience.id}`}>Start Date</Label>
                    <Input
                      id={`startDate-${experience.id}`}
                      type="month"
                      value={experience.startDate}
                      onChange={(e) => updateExperience(experience.id, "startDate", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`endDate-${experience.id}`}>End Date</Label>
                    <Input
                      id={`endDate-${experience.id}`}
                      type="month"
                      value={experience.endDate}
                      onChange={(e) => updateExperience(experience.id, "endDate", e.target.value)}
                      disabled={experience.current}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`current-${experience.id}`}
                  checked={experience.current}
                  onCheckedChange={(checked) => updateExperience(experience.id, "current", checked as boolean)}
                />
                <Label htmlFor={`current-${experience.id}`}>Currently working here</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`description-${experience.id}`}>Description</Label>
                <div className="flex gap-2">
                  <Textarea
                    id={`description-${experience.id}`}
                    placeholder={placeholders.description}
                    value={experience.description}
                    onChange={(e) => updateExperience(experience.id, "description", e.target.value)}
                    rows={4}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => improveDescription(experience.id, experience.description)}
                    disabled={!experience.description.trim() || isImproving === experience.id}
                    className="self-end"
                  >
                    {isImproving === experience.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Sparkles className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <Button onClick={addExperience} variant="outline" className="w-full bg-transparent">
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </Button>
      </div>
    </div>
  )
}
