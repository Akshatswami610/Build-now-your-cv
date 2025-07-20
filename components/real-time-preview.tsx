"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, Maximize2, Minimize2 } from "lucide-react"
import type { ResumeData } from "@/app/page"

interface RealTimePreviewProps {
  data: ResumeData
  isVisible: boolean
  onToggle: (visible: boolean) => void
}

export function RealTimePreview({ data, isVisible, onToggle }: RealTimePreviewProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => onToggle(true)}
          className="rounded-full w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg"
        >
          <Eye className="h-5 w-5" />
        </Button>
      </div>
    )
  }

  return (
    <div
      className={`fixed right-4 top-20 z-50 transition-all duration-300 ${
        isExpanded ? "w-96 h-[calc(100vh-6rem)]" : "w-80 h-96"
      }`}
    >
      <Card className="h-full shadow-2xl border-2 border-blue-200 bg-white/95 backdrop-blur-sm">
        <CardHeader className="pb-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">Live Preview</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-white hover:bg-white/20"
              >
                {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onToggle(false)}
                className="text-white hover:bg-white/20"
              >
                <EyeOff className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-2 h-full overflow-auto">
          <div className="bg-white rounded border shadow-sm p-3 text-xs transform scale-75 origin-top-left">
            {/* Mini Resume Preview */}
            <div className="text-center mb-2">
              <h1 className="font-bold text-sm text-blue-600">{data.personalInfo.fullName || "Your Name"}</h1>
              <div className="text-xs text-gray-600 flex justify-center gap-2 flex-wrap">
                {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
              </div>
            </div>

            {data.education.length > 0 && (
              <div className="mb-2">
                <h3 className="font-semibold text-xs text-blue-600 border-b mb-1">Education</h3>
                {data.education.slice(0, 2).map((edu) => (
                  <div key={edu.id} className="mb-1">
                    <div className="font-medium text-xs">{edu.institution}</div>
                    <div className="text-xs text-gray-600">{edu.degree}</div>
                  </div>
                ))}
              </div>
            )}

            {data.experience.length > 0 && (
              <div className="mb-2">
                <h3 className="font-semibold text-xs text-blue-600 border-b mb-1">Experience</h3>
                {data.experience.slice(0, 2).map((exp) => (
                  <div key={exp.id} className="mb-1">
                    <div className="font-medium text-xs">{exp.position}</div>
                    <div className="text-xs text-gray-600">{exp.company}</div>
                  </div>
                ))}
              </div>
            )}

            {data.skills.technical.length > 0 && (
              <div className="mb-2">
                <h3 className="font-semibold text-xs text-blue-600 border-b mb-1">Skills</h3>
                <div className="flex flex-wrap gap-1">
                  {data.skills.technical.slice(0, 6).map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs px-1 py-0">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
