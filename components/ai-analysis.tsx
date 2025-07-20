"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { analyzeResumeCompleteness } from "@/lib/gemini"
import { Brain, TrendingUp, AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import type { ResumeData } from "@/app/page"

interface AIAnalysisProps {
  resumeData: ResumeData
}

interface AnalysisResult {
  score: number
  recommendations: string[]
  weakAreas: string[]
}

export function AIAnalysis({ resumeData }: AIAnalysisProps) {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analyzeResume = async () => {
    setIsAnalyzing(true)
    try {
      const result = await analyzeResumeCompleteness(resumeData)
      setAnalysis(result)
    } catch (error) {
      console.error("Failed to analyze resume:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="h-5 w-5 text-green-600" />
    if (score >= 60) return <TrendingUp className="h-5 w-5 text-yellow-600" />
    return <AlertCircle className="h-5 w-5 text-red-600" />
  }

  return (
    <Card className="border-2 border-dashed border-blue-200 bg-blue-50/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-blue-600" />
          AI Resume Analysis
        </CardTitle>
        <CardDescription>Get AI-powered insights to improve your resume's effectiveness</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!analysis ? (
          <Button onClick={analyzeResume} disabled={isAnalyzing} className="w-full">
            {isAnalyzing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Analyzing Resume...
              </>
            ) : (
              <>
                <Brain className="h-4 w-4 mr-2" />
                Analyze My Resume
              </>
            )}
          </Button>
        ) : (
          <div className="space-y-4">
            {/* Score */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                {getScoreIcon(analysis.score)}
                <span className={`text-2xl font-bold ${getScoreColor(analysis.score)}`}>{analysis.score}/100</span>
              </div>
              <Progress value={analysis.score} className="h-3" />
              <p className="text-sm text-muted-foreground mt-2">Resume Completeness Score</p>
            </div>

            {/* Recommendations */}
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Recommendations
              </h4>
              <ul className="space-y-1">
                {analysis.recommendations.map((rec, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>

            {/* Weak Areas */}
            {analysis.weakAreas.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Areas to Improve
                </h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.weakAreas.map((area, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <Button
              onClick={analyzeResume}
              variant="outline"
              size="sm"
              disabled={isAnalyzing}
              className="w-full bg-transparent"
            >
              Re-analyze Resume
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
