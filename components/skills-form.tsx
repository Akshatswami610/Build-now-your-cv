"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, X, Code, Users, Globe } from "lucide-react"
import { generateSkillSuggestions } from "@/lib/gemini"
import { Sparkles, Loader2 } from "lucide-react"

interface SkillsData {
  technical: string[]
  soft: string[]
  languages: string[]
}

interface SkillsFormProps {
  data: SkillsData
  onChange: (data: SkillsData) => void
  resumeType: "job" | "internship" | "hackathon"
}

export function SkillsForm({ data, onChange, resumeType }: SkillsFormProps) {
  const [newSkill, setNewSkill] = useState({
    technical: "",
    soft: "",
    languages: "",
  })

  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false)
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([])

  const addSkill = (category: keyof SkillsData) => {
    const skill = newSkill[category].trim()
    if (skill && !data[category].includes(skill)) {
      onChange({
        ...data,
        [category]: [...data[category], skill],
      })
      setNewSkill({ ...newSkill, [category]: "" })
    }
  }

  const removeSkill = (category: keyof SkillsData, skillToRemove: string) => {
    onChange({
      ...data,
      [category]: data[category].filter((skill) => skill !== skillToRemove),
    })
  }

  const handleKeyPress = (e: React.KeyboardEvent, category: keyof SkillsData) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addSkill(category)
    }
  }

  const getTechnicalSkillSuggestions = () => {
    switch (resumeType) {
      case "hackathon":
        return [
          "JavaScript",
          "Python",
          "React",
          "Node.js",
          "Git",
          "Docker",
          "AWS",
          "MongoDB",
          "PostgreSQL",
          "Machine Learning",
        ]
      case "internship":
        return [
          "HTML/CSS",
          "JavaScript",
          "Python",
          "Java",
          "Git",
          "React",
          "SQL",
          "Excel",
          "Figma",
          "Adobe Creative Suite",
        ]
      default:
        return [
          "JavaScript",
          "Python",
          "Java",
          "React",
          "Node.js",
          "AWS",
          "Docker",
          "Kubernetes",
          "PostgreSQL",
          "MongoDB",
        ]
    }
  }

  const getSoftSkillSuggestions = () => {
    return [
      "Communication",
      "Leadership",
      "Problem Solving",
      "Team Collaboration",
      "Time Management",
      "Critical Thinking",
      "Adaptability",
      "Project Management",
    ]
  }

  const getAISuggestions = async () => {
    setIsLoadingSuggestions(true)
    try {
      const suggestions = await generateSkillSuggestions(resumeType, data.technical)
      setAiSuggestions(suggestions)
    } catch (error) {
      console.error("Failed to get AI suggestions:", error)
    } finally {
      setIsLoadingSuggestions(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Skills & Abilities</h2>
        <p className="text-muted-foreground">
          {resumeType === "hackathon"
            ? "Highlight your technical skills and programming languages"
            : "Add your technical skills, soft skills, and languages"}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        {/* Technical Skills */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Technical Skills
            </CardTitle>
            <CardDescription>Programming languages, frameworks, tools</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="e.g., JavaScript, Python, React"
                value={newSkill.technical}
                onChange={(e) => setNewSkill({ ...newSkill, technical: e.target.value })}
                onKeyPress={(e) => handleKeyPress(e, "technical")}
              />
              <Button onClick={() => addSkill("technical")} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.technical.map((skill) => (
                <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                  {skill}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeSkill("technical", skill)} />
                </Badge>
              ))}
            </div>
            <div className="text-sm text-muted-foreground">
              <p className="mb-2">Suggestions:</p>
              <div className="flex flex-wrap gap-1">
                {getTechnicalSkillSuggestions().map((suggestion) => (
                  <Badge
                    key={suggestion}
                    variant="outline"
                    className="cursor-pointer text-xs"
                    onClick={() => {
                      if (!data.technical.includes(suggestion)) {
                        onChange({
                          ...data,
                          technical: [...data.technical, suggestion],
                        })
                      }
                    }}
                  >
                    {suggestion}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="border-t pt-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-muted-foreground">AI Suggestions:</p>
                <Button variant="ghost" size="sm" onClick={getAISuggestions} disabled={isLoadingSuggestions}>
                  {isLoadingSuggestions ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {aiSuggestions.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {aiSuggestions.map((suggestion) => (
                    <Badge
                      key={suggestion}
                      variant="outline"
                      className="cursor-pointer text-xs bg-blue-50 hover:bg-blue-100"
                      onClick={() => {
                        if (!data.technical.includes(suggestion)) {
                          onChange({
                            ...data,
                            technical: [...data.technical, suggestion],
                          })
                        }
                      }}
                    >
                      {suggestion}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Soft Skills */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Soft Skills
            </CardTitle>
            <CardDescription>Personal and interpersonal abilities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="e.g., Leadership, Communication"
                value={newSkill.soft}
                onChange={(e) => setNewSkill({ ...newSkill, soft: e.target.value })}
                onKeyPress={(e) => handleKeyPress(e, "soft")}
              />
              <Button onClick={() => addSkill("soft")} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.soft.map((skill) => (
                <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                  {skill}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeSkill("soft", skill)} />
                </Badge>
              ))}
            </div>
            <div className="text-sm text-muted-foreground">
              <p className="mb-2">Suggestions:</p>
              <div className="flex flex-wrap gap-1">
                {getSoftSkillSuggestions().map((suggestion) => (
                  <Badge
                    key={suggestion}
                    variant="outline"
                    className="cursor-pointer text-xs"
                    onClick={() => {
                      if (!data.soft.includes(suggestion)) {
                        onChange({
                          ...data,
                          soft: [...data.soft, suggestion],
                        })
                      }
                    }}
                  >
                    {suggestion}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Languages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Languages
            </CardTitle>
            <CardDescription>Spoken languages and proficiency</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="e.g., English (Native), Spanish (Fluent)"
                value={newSkill.languages}
                onChange={(e) => setNewSkill({ ...newSkill, languages: e.target.value })}
                onKeyPress={(e) => handleKeyPress(e, "languages")}
              />
              <Button onClick={() => addSkill("languages")} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.languages.map((language) => (
                <Badge key={language} variant="secondary" className="flex items-center gap-1">
                  {language}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeSkill("languages", language)} />
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
