"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, FolderOpen, X } from "lucide-react"
import { generateProjectDescription } from "@/lib/gemini"
import { Sparkles, Loader2 } from "lucide-react"

interface ProjectEntry {
  id: string
  name: string
  description: string
  technologies: string[]
  github: string
  demo: string
  startDate: string
  endDate: string
}

interface ProjectsFormProps {
  data: ProjectEntry[]
  onChange: (data: ProjectEntry[]) => void
  resumeType: "job" | "internship" | "hackathon"
}

export function ProjectsForm({ data, onChange, resumeType }: ProjectsFormProps) {
  const [newTech, setNewTech] = useState<{ [key: string]: string }>({})
  const [isGenerating, setIsGenerating] = useState<string | null>(null)

  const addProject = () => {
    const newProject: ProjectEntry = {
      id: Date.now().toString(),
      name: "",
      description: "",
      technologies: [],
      github: "",
      demo: "",
      startDate: "",
      endDate: "",
    }
    onChange([...data, newProject])
  }

  const updateProject = (id: string, field: keyof ProjectEntry, value: string | string[]) => {
    onChange(data.map((project) => (project.id === id ? { ...project, [field]: value } : project)))
  }

  const removeProject = (id: string) => {
    onChange(data.filter((project) => project.id !== id))
  }

  const addTechnology = (projectId: string) => {
    const tech = newTech[projectId]?.trim()
    if (tech) {
      const project = data.find((p) => p.id === projectId)
      if (project && !project.technologies.includes(tech)) {
        updateProject(projectId, "technologies", [...project.technologies, tech])
        setNewTech({ ...newTech, [projectId]: "" })
      }
    }
  }

  const removeTechnology = (projectId: string, techToRemove: string) => {
    const project = data.find((p) => p.id === projectId)
    if (project) {
      updateProject(
        projectId,
        "technologies",
        project.technologies.filter((tech) => tech !== techToRemove),
      )
    }
  }

  const getProjectGuidance = () => {
    switch (resumeType) {
      case "hackathon":
        return {
          title: "Technical Projects",
          description: "Showcase your coding projects, hackathon submissions, and technical innovations",
          namePlaceholder: "AI-Powered Task Manager",
          descriptionPlaceholder:
            "Built a full-stack web application that uses machine learning to prioritize tasks. Implemented real-time collaboration features and deployed on AWS...",
        }
      case "internship":
        return {
          title: "Projects & Coursework",
          description: "Include academic projects, personal projects, and relevant coursework",
          namePlaceholder: "Student Management System",
          descriptionPlaceholder:
            "Developed as part of Database Systems course. Created a web application to manage student records with CRUD operations...",
        }
      default:
        return {
          title: "Professional Projects",
          description: "Highlight significant projects that demonstrate your skills and impact",
          namePlaceholder: "E-commerce Platform Redesign",
          descriptionPlaceholder:
            "Led the redesign of the company's e-commerce platform, resulting in 25% increase in conversion rates...",
        }
    }
  }

  const generateDescription = async (projectId: string, projectName: string, technologies: string[]) => {
    if (!projectName.trim() || technologies.length === 0) return

    setIsGenerating(projectId)
    try {
      const description = await generateProjectDescription(projectName, technologies, resumeType)
      updateProject(projectId, "description", description)
    } catch (error) {
      console.error("Failed to generate description:", error)
    } finally {
      setIsGenerating(null)
    }
  }

  const guidance = getProjectGuidance()

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">{guidance.title}</h2>
        <p className="text-muted-foreground">{guidance.description}</p>
      </div>

      <div className="space-y-4">
        {data.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FolderOpen className="h-5 w-5" />
                  Project Entry
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeProject(project.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`name-${project.id}`}>Project Name *</Label>
                  <Input
                    id={`name-${project.id}`}
                    placeholder={guidance.namePlaceholder}
                    value={project.name}
                    onChange={(e) => updateProject(project.id, "name", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor={`startDate-${project.id}`}>Start Date</Label>
                    <Input
                      id={`startDate-${project.id}`}
                      type="month"
                      value={project.startDate}
                      onChange={(e) => updateProject(project.id, "startDate", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`endDate-${project.id}`}>End Date</Label>
                    <Input
                      id={`endDate-${project.id}`}
                      type="month"
                      value={project.endDate}
                      onChange={(e) => updateProject(project.id, "endDate", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor={`description-${project.id}`}>Description *</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => generateDescription(project.id, project.name, project.technologies)}
                    disabled={!project.name.trim() || project.technologies.length === 0 || isGenerating === project.id}
                    className="text-xs"
                  >
                    {isGenerating === project.id ? (
                      <>
                        <Loader2 className="h-3 w-3 animate-spin mr-1" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-3 w-3 mr-1" />
                        AI Generate
                      </>
                    )}
                  </Button>
                </div>
                <Textarea
                  id={`description-${project.id}`}
                  placeholder={guidance.descriptionPlaceholder}
                  value={project.description}
                  onChange={(e) => updateProject(project.id, "description", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Technologies Used</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g., React, Node.js, MongoDB"
                    value={newTech[project.id] || ""}
                    onChange={(e) => setNewTech({ ...newTech, [project.id]: e.target.value })}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addTechnology(project.id)
                      }
                    }}
                  />
                  <Button onClick={() => addTechnology(project.id)} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="flex items-center gap-1">
                      {tech}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeTechnology(project.id, tech)} />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`github-${project.id}`}>GitHub Repository</Label>
                  <Input
                    id={`github-${project.id}`}
                    placeholder="github.com/username/project"
                    value={project.github}
                    onChange={(e) => updateProject(project.id, "github", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`demo-${project.id}`}>Live Demo/Website</Label>
                  <Input
                    id={`demo-${project.id}`}
                    placeholder="project-demo.com"
                    value={project.demo}
                    onChange={(e) => updateProject(project.id, "demo", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <Button onClick={addProject} variant="outline" className="w-full bg-transparent">
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>
    </div>
  )
}
