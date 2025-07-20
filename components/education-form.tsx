"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Trash2, GraduationCap } from "lucide-react"

interface EducationEntry {
  id: string
  institution: string
  degree: string
  field: string
  gpa: string
  startDate: string
  endDate: string
  current: boolean
}

interface EducationFormProps {
  data: EducationEntry[]
  onChange: (data: EducationEntry[]) => void
}

export function EducationForm({ data, onChange }: EducationFormProps) {
  const addEducation = () => {
    const newEducation: EducationEntry = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      gpa: "",
      startDate: "",
      endDate: "",
      current: false,
    }
    onChange([...data, newEducation])
  }

  const updateEducation = (id: string, field: keyof EducationEntry, value: string | boolean) => {
    onChange(data.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)))
  }

  const removeEducation = (id: string) => {
    onChange(data.filter((edu) => edu.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Education</h2>
        <p className="text-muted-foreground">Add your academic background and achievements</p>
      </div>

      <div className="space-y-4">
        {data.map((education) => (
          <Card key={education.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Education Entry
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEducation(education.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`institution-${education.id}`}>Institution *</Label>
                  <Input
                    id={`institution-${education.id}`}
                    placeholder="University of Example"
                    value={education.institution}
                    onChange={(e) => updateEducation(education.id, "institution", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`degree-${education.id}`}>Degree *</Label>
                  <Input
                    id={`degree-${education.id}`}
                    placeholder="Bachelor of Science"
                    value={education.degree}
                    onChange={(e) => updateEducation(education.id, "degree", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`field-${education.id}`}>Field of Study *</Label>
                  <Input
                    id={`field-${education.id}`}
                    placeholder="Computer Science"
                    value={education.field}
                    onChange={(e) => updateEducation(education.id, "field", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`gpa-${education.id}`}>GPA (Optional)</Label>
                  <Input
                    id={`gpa-${education.id}`}
                    placeholder="3.8/4.0"
                    value={education.gpa}
                    onChange={(e) => updateEducation(education.id, "gpa", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`startDate-${education.id}`}>Start Date</Label>
                  <Input
                    id={`startDate-${education.id}`}
                    type="month"
                    value={education.startDate}
                    onChange={(e) => updateEducation(education.id, "startDate", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`endDate-${education.id}`}>End Date</Label>
                  <Input
                    id={`endDate-${education.id}`}
                    type="month"
                    value={education.endDate}
                    onChange={(e) => updateEducation(education.id, "endDate", e.target.value)}
                    disabled={education.current}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`current-${education.id}`}
                  checked={education.current}
                  onCheckedChange={(checked) => updateEducation(education.id, "current", checked as boolean)}
                />
                <Label htmlFor={`current-${education.id}`}>Currently studying here</Label>
              </div>
            </CardContent>
          </Card>
        ))}

        <Button onClick={addEducation} variant="outline" className="w-full bg-transparent">
          <Plus className="h-4 w-4 mr-2" />
          Add Education
        </Button>
      </div>
    </div>
  )
}
