"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Mail, Phone, MapPin, Linkedin, Github, Globe } from "lucide-react"
import type { ResumeData } from "@/app/page"
import { AIAnalysis } from "@/components/ai-analysis"
import { ResumeAnalytics } from "@/components/resume-analytics"
import { ExportOptions } from "@/components/export-options"
import { RealTimePreview } from "@/components/real-time-preview"

interface ResumePreviewProps {
  data: ResumeData
}

export function ResumePreview({ data }: ResumePreviewProps) {
  const [showRealTimePreview, setShowRealTimePreview] = useState(false)

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString + "-01")
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
  }

  const downloadResume = () => {
    alert(`Downloading resume with ${data.selectedTemplate} template!`)
  }

  const getTemplateStyles = () => {
    const templateColors: { [key: string]: any } = {
      "modern-tech": { primary: "#2563eb", secondary: "#64748b", accent: "#0ea5e9" },
      "executive-pro": { primary: "#1f2937", secondary: "#6b7280", accent: "#059669" },
      "creative-designer": { primary: "#7c3aed", secondary: "#a855f7", accent: "#ec4899" },
    }
    return templateColors[data.selectedTemplate] || templateColors["modern-tech"]
  }

  const templateStyles = getTemplateStyles()

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Resume Preview & Export
        </h2>
        <p className="text-muted-foreground">Review, analyze, and export your professional resume</p>
        <Badge variant="outline" className="mt-2">
          Template: {data.selectedTemplate.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
        </Badge>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        <AIAnalysis resumeData={data} />
        <ResumeAnalytics data={data} />
      </div>

      <ExportOptions data={data} />

      {/* Main Resume Preview */}
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-2xl border-2" style={{ borderColor: templateStyles.accent }}>
          <CardContent className="p-8">
            {/* Header */}
            <div className="text-center mb-8 p-6 rounded-lg" style={{ backgroundColor: `${templateStyles.primary}10` }}>
              <h1 className="text-4xl font-bold mb-2" style={{ color: templateStyles.primary }}>
                {data.personalInfo.fullName || "Your Name"}
              </h1>
              <div className="flex flex-wrap justify-center gap-4 text-sm" style={{ color: templateStyles.secondary }}>
                {data.personalInfo.email && (
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    {data.personalInfo.email}
                  </div>
                )}
                {data.personalInfo.phone && (
                  <div className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    {data.personalInfo.phone}
                  </div>
                )}
                {data.personalInfo.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {data.personalInfo.location}
                  </div>
                )}
              </div>
              <div
                className="flex flex-wrap justify-center gap-4 text-sm mt-2"
                style={{ color: templateStyles.secondary }}
              >
                {data.personalInfo.linkedin && (
                  <div className="flex items-center gap-1">
                    <Linkedin className="h-4 w-4" />
                    {data.personalInfo.linkedin}
                  </div>
                )}
                {data.personalInfo.github && (
                  <div className="flex items-center gap-1">
                    <Github className="h-4 w-4" />
                    {data.personalInfo.github}
                  </div>
                )}
                {data.personalInfo.portfolio && (
                  <div className="flex items-center gap-1">
                    <Globe className="h-4 w-4" />
                    {data.personalInfo.portfolio}
                  </div>
                )}
              </div>
            </div>

            {/* Education */}
            {data.education.length > 0 && (
              <div className="mb-8">
                <h2
                  className="text-xl font-bold mb-4 pb-2 border-b-2"
                  style={{
                    color: templateStyles.primary,
                    borderColor: templateStyles.accent,
                  }}
                >
                  Education
                </h2>
                <div className="space-y-4">
                  {data.education.map((edu) => (
                    <div key={edu.id}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold" style={{ color: templateStyles.primary }}>
                            {edu.institution}
                          </h3>
                          <p style={{ color: templateStyles.secondary }}>
                            {edu.degree} in {edu.field}
                          </p>
                          {edu.gpa && (
                            <p className="text-sm" style={{ color: templateStyles.secondary }}>
                              GPA: {edu.gpa}
                            </p>
                          )}
                        </div>
                        <div className="text-right text-sm" style={{ color: templateStyles.secondary }}>
                          {formatDate(edu.startDate)} - {edu.current ? "Present" : formatDate(edu.endDate)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Experience */}
            {data.experience.length > 0 && (
              <div className="mb-8">
                <h2
                  className="text-xl font-bold mb-4 pb-2 border-b-2"
                  style={{
                    color: templateStyles.primary,
                    borderColor: templateStyles.accent,
                  }}
                >
                  Experience
                </h2>
                <div className="space-y-6">
                  {data.experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold" style={{ color: templateStyles.primary }}>
                            {exp.position}
                          </h3>
                          <p style={{ color: templateStyles.secondary }}>{exp.company}</p>
                          {exp.location && (
                            <p className="text-sm" style={{ color: templateStyles.secondary }}>
                              {exp.location}
                            </p>
                          )}
                        </div>
                        <div className="text-right text-sm" style={{ color: templateStyles.secondary }}>
                          {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                        </div>
                      </div>
                      {exp.description && (
                        <p className="text-sm leading-relaxed" style={{ color: templateStyles.secondary }}>
                          {exp.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {data.projects.length > 0 && (
              <div className="mb-8">
                <h2
                  className="text-xl font-bold mb-4 pb-2 border-b-2"
                  style={{
                    color: templateStyles.primary,
                    borderColor: templateStyles.accent,
                  }}
                >
                  Projects
                </h2>
                <div className="space-y-6">
                  {data.projects.map((project) => (
                    <div key={project.id}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold" style={{ color: templateStyles.primary }}>
                            {project.name}
                          </h3>
                          <div className="flex gap-2 mt-1">
                            {project.github && (
                              <span className="text-xs" style={{ color: templateStyles.accent }}>
                                GitHub: {project.github}
                              </span>
                            )}
                            {project.demo && (
                              <span className="text-xs" style={{ color: templateStyles.accent }}>
                                Demo: {project.demo}
                              </span>
                            )}
                          </div>
                        </div>
                        {(project.startDate || project.endDate) && (
                          <div className="text-right text-sm" style={{ color: templateStyles.secondary }}>
                            {formatDate(project.startDate)} - {formatDate(project.endDate)}
                          </div>
                        )}
                      </div>
                      {project.description && (
                        <p className="text-sm leading-relaxed mb-2" style={{ color: templateStyles.secondary }}>
                          {project.description}
                        </p>
                      )}
                      {project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.map((tech) => (
                            <Badge
                              key={tech}
                              variant="outline"
                              className="text-xs"
                              style={{
                                borderColor: templateStyles.accent,
                                color: templateStyles.accent,
                              }}
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {(data.skills.technical.length > 0 || data.skills.soft.length > 0 || data.skills.languages.length > 0) && (
              <div className="mb-8">
                <h2
                  className="text-xl font-bold mb-4 pb-2 border-b-2"
                  style={{
                    color: templateStyles.primary,
                    borderColor: templateStyles.accent,
                  }}
                >
                  Skills
                </h2>
                <div className="space-y-3">
                  {data.skills.technical.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2" style={{ color: templateStyles.primary }}>
                        Technical Skills
                      </h3>
                      <div className="flex flex-wrap gap-1">
                        {data.skills.technical.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="text-xs"
                            style={{
                              backgroundColor: `${templateStyles.primary}20`,
                              color: templateStyles.primary,
                            }}
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {data.skills.soft.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2" style={{ color: templateStyles.primary }}>
                        Soft Skills
                      </h3>
                      <div className="flex flex-wrap gap-1">
                        {data.skills.soft.map((skill) => (
                          <Badge
                            key={skill}
                            variant="outline"
                            className="text-xs"
                            style={{
                              borderColor: templateStyles.secondary,
                              color: templateStyles.secondary,
                            }}
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {data.skills.languages.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2" style={{ color: templateStyles.primary }}>
                        Languages
                      </h3>
                      <div className="flex flex-wrap gap-1">
                        {data.skills.languages.map((language) => (
                          <Badge
                            key={language}
                            variant="outline"
                            className="text-xs"
                            style={{
                              borderColor: templateStyles.accent,
                              color: templateStyles.accent,
                            }}
                          >
                            {language}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <Button
            onClick={downloadResume}
            size="lg"
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <Download className="h-6 w-6 mr-2" />
            Download Professional Resume
          </Button>
        </div>
      </div>

      {/* Real-time Preview Component */}
      <RealTimePreview data={data} isVisible={showRealTimePreview} onToggle={setShowRealTimePreview} />
    </div>
  )
}
