"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { BarChart3, TrendingUp, Target, AlertTriangle, CheckCircle, Clock, Zap } from "lucide-react"
import type { ResumeData } from "@/app/page"

interface ResumeAnalyticsProps {
  data: ResumeData
}

interface AnalyticsData {
  completeness: number
  atsScore: number
  readabilityScore: number
  keywordDensity: number
  sections: {
    name: string
    score: number
    status: "excellent" | "good" | "needs-improvement" | "missing"
  }[]
  recommendations: string[]
  estimatedReadTime: number
}

export function ResumeAnalytics({ data }: ResumeAnalyticsProps) {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analyzeResume = () => {
    setIsAnalyzing(true)

    // Simulate analysis
    setTimeout(() => {
      const completeness = calculateCompleteness(data)
      const atsScore = calculateATSScore(data)
      const readabilityScore = calculateReadabilityScore(data)
      const keywordDensity = calculateKeywordDensity(data)

      setAnalytics({
        completeness,
        atsScore,
        readabilityScore,
        keywordDensity,
        sections: analyzeSections(data),
        recommendations: generateRecommendations(data),
        estimatedReadTime: Math.ceil((data.experience.length * 30 + data.projects.length * 20) / 60),
      })
      setIsAnalyzing(false)
    }, 2000)
  }

  const calculateCompleteness = (data: ResumeData): number => {
    let score = 0
    if (data.personalInfo.fullName) score += 15
    if (data.personalInfo.email) score += 15
    if (data.personalInfo.phone) score += 10
    if (data.education.length > 0) score += 20
    if (data.experience.length > 0) score += 25
    if (data.skills.technical.length > 0) score += 10
    if (data.projects.length > 0) score += 5
    return Math.min(score, 100)
  }

  const calculateATSScore = (data: ResumeData): number => {
    let score = 60 // Base score
    if (data.skills.technical.length >= 5) score += 15
    if (data.experience.some((exp) => exp.description.length > 100)) score += 15
    if (data.personalInfo.linkedin) score += 5
    if (data.personalInfo.github) score += 5
    return Math.min(score, 100)
  }

  const calculateReadabilityScore = (data: ResumeData): number => {
    const totalText =
      data.experience.reduce((acc, exp) => acc + exp.description.length, 0) +
      data.projects.reduce((acc, proj) => acc + proj.description.length, 0)
    return totalText > 500 ? 85 : 70
  }

  const calculateKeywordDensity = (data: ResumeData): number => {
    const keywords = ["javascript", "python", "react", "node", "aws", "git"]
    const allText = JSON.stringify(data).toLowerCase()
    const matches = keywords.filter((keyword) => allText.includes(keyword)).length
    return (matches / keywords.length) * 100
  }

  const analyzeSections = (data: ResumeData) => [
    {
      name: "Personal Info",
      score: data.personalInfo.fullName && data.personalInfo.email ? 100 : 60,
      status: data.personalInfo.fullName && data.personalInfo.email ? "excellent" : ("needs-improvement" as const),
    },
    {
      name: "Education",
      score: data.education.length > 0 ? 90 : 0,
      status: data.education.length > 0 ? "excellent" : ("missing" as const),
    },
    {
      name: "Experience",
      score: data.experience.length > 0 ? 85 : 0,
      status: data.experience.length > 0 ? "good" : ("missing" as const),
    },
    {
      name: "Skills",
      score: data.skills.technical.length >= 5 ? 95 : data.skills.technical.length > 0 ? 70 : 0,
      status:
        data.skills.technical.length >= 5
          ? "excellent"
          : data.skills.technical.length > 0
            ? "good"
            : ("missing" as const),
    },
    {
      name: "Projects",
      score: data.projects.length >= 2 ? 90 : data.projects.length > 0 ? 70 : 0,
      status: data.projects.length >= 2 ? "excellent" : data.projects.length > 0 ? "good" : ("missing" as const),
    },
  ]

  const generateRecommendations = (data: ResumeData): string[] => {
    const recommendations = []
    if (!data.personalInfo.linkedin) recommendations.push("Add LinkedIn profile for better networking")
    if (data.skills.technical.length < 5) recommendations.push("Add more technical skills to improve ATS score")
    if (data.projects.length < 2) recommendations.push("Include more projects to showcase your abilities")
    if (!data.experience.some((exp) => exp.description.length > 100)) {
      recommendations.push("Add more detailed descriptions to your experience")
    }
    return recommendations
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "good":
        return <CheckCircle className="h-4 w-4 text-blue-600" />
      case "needs-improvement":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "missing":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  return (
    <Card className="border-2 border-dashed border-purple-200 bg-purple-50/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-purple-600" />
          Resume Analytics
        </CardTitle>
        <CardDescription>Get detailed insights about your resume's performance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!analytics ? (
          <Button
            onClick={analyzeResume}
            disabled={isAnalyzing}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            {isAnalyzing ? (
              <>
                <Zap className="h-4 w-4 animate-spin mr-2" />
                Analyzing Resume...
              </>
            ) : (
              <>
                <BarChart3 className="h-4 w-4 mr-2" />
                Analyze My Resume
              </>
            )}
          </Button>
        ) : (
          <div className="space-y-6">
            {/* Overall Scores */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className={`text-2xl font-bold ${getScoreColor(analytics.completeness)}`}>
                  {analytics.completeness}%
                </div>
                <div className="text-xs text-muted-foreground">Completeness</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${getScoreColor(analytics.atsScore)}`}>{analytics.atsScore}%</div>
                <div className="text-xs text-muted-foreground">ATS Score</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${getScoreColor(analytics.readabilityScore)}`}>
                  {analytics.readabilityScore}%
                </div>
                <div className="text-xs text-muted-foreground">Readability</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 flex items-center justify-center gap-1">
                  <Clock className="h-4 w-4" />
                  {analytics.estimatedReadTime}m
                </div>
                <div className="text-xs text-muted-foreground">Read Time</div>
              </div>
            </div>

            {/* Section Analysis */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Target className="h-4 w-4" />
                Section Analysis
              </h4>
              <div className="space-y-3">
                {analytics.sections.map((section) => (
                  <div key={section.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(section.status)}
                      <span className="text-sm font-medium">{section.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={section.score} className="w-20 h-2" />
                      <span className="text-sm font-medium w-8">{section.score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Recommendations
              </h4>
              <ul className="space-y-2">
                {analytics.recommendations.map((rec, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>

            <Button onClick={analyzeResume} variant="outline" size="sm" className="w-full bg-transparent">
              Re-analyze Resume
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
