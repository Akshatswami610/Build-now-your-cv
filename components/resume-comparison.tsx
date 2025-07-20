"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GitCompare, Star } from "lucide-react"
import type { ResumeTemplate } from "@/components/template-selector"

interface ResumeComparisonProps {
  templates: ResumeTemplate[]
  selectedTemplate: string
  onTemplateSelect: (templateId: string) => void
}

export function ResumeComparison({ templates, selectedTemplate, onTemplateSelect }: ResumeComparisonProps) {
  const [compareTemplates, setCompareTemplates] = useState<string[]>([selectedTemplate])

  const addToComparison = (templateId: string) => {
    if (compareTemplates.length < 3 && !compareTemplates.includes(templateId)) {
      setCompareTemplates([...compareTemplates, templateId])
    }
  }

  const removeFromComparison = (templateId: string) => {
    setCompareTemplates(compareTemplates.filter((id) => id !== templateId))
  }

  const getTemplate = (id: string) => templates.find((t) => t.id === id)

  const comparisonFeatures = [
    { key: "layout", label: "Layout Style" },
    { key: "colors", label: "Color Scheme" },
    { key: "popularity", label: "Popularity" },
    { key: "category", label: "Category" },
    { key: "features", label: "Key Features" },
    { key: "bestFor", label: "Best For" },
  ]

  return (
    <Card className="border-2 border-dashed border-orange-200 bg-orange-50/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GitCompare className="h-5 w-5 text-orange-600" />
          Template Comparison
        </CardTitle>
        <CardDescription>Compare up to 3 templates side by side</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Template Selection */}
        <div>
          <h4 className="font-semibold mb-3">Select Templates to Compare</h4>
          <div className="grid gap-2 md:grid-cols-3">
            {templates.slice(0, 6).map((template) => (
              <Button
                key={template.id}
                variant={compareTemplates.includes(template.id) ? "default" : "outline"}
                size="sm"
                onClick={() =>
                  compareTemplates.includes(template.id)
                    ? removeFromComparison(template.id)
                    : addToComparison(template.id)
                }
                disabled={!compareTemplates.includes(template.id) && compareTemplates.length >= 3}
                className="justify-start text-xs"
              >
                <div className="flex items-center gap-2">
                  {template.icon}
                  {template.name}
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        {compareTemplates.length > 1 && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-2 border-b font-semibold">Feature</th>
                  {compareTemplates.map((templateId) => {
                    const template = getTemplate(templateId)
                    return (
                      <th key={templateId} className="text-center p-2 border-b">
                        <div className="space-y-2">
                          <div className="flex items-center justify-center gap-1">
                            {template?.icon}
                            <span className="font-semibold text-sm">{template?.name}</span>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {template?.category}
                          </Badge>
                        </div>
                      </th>
                    )
                  })}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature) => (
                  <tr key={feature.key} className="border-b">
                    <td className="p-2 font-medium text-sm">{feature.label}</td>
                    {compareTemplates.map((templateId) => {
                      const template = getTemplate(templateId)
                      return (
                        <td key={templateId} className="p-2 text-center text-sm">
                          {feature.key === "layout" && (
                            <Badge variant="outline" className="text-xs">
                              {template?.layout}
                            </Badge>
                          )}
                          {feature.key === "colors" && (
                            <div className="flex justify-center gap-1">
                              <div
                                className="w-4 h-4 rounded-full border"
                                style={{ backgroundColor: template?.colors.primary }}
                              />
                              <div
                                className="w-4 h-4 rounded-full border"
                                style={{ backgroundColor: template?.colors.accent }}
                              />
                            </div>
                          )}
                          {feature.key === "popularity" && (
                            <div className="flex items-center justify-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span>{template?.popularity}</span>
                            </div>
                          )}
                          {feature.key === "category" && (
                            <Badge variant="secondary" className="text-xs">
                              {template?.category}
                            </Badge>
                          )}
                          {feature.key === "features" && (
                            <div className="space-y-1">
                              {template?.features.slice(0, 2).map((feat, idx) => (
                                <div key={idx} className="text-xs text-muted-foreground">
                                  {feat}
                                </div>
                              ))}
                            </div>
                          )}
                          {feature.key === "bestFor" && (
                            <div className="space-y-1">
                              {template?.bestFor.slice(0, 2).map((role, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs block mb-1">
                                  {role}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Action Buttons */}
        {compareTemplates.length > 1 && (
          <div className="flex gap-2 justify-center">
            {compareTemplates.map((templateId) => (
              <Button
                key={templateId}
                onClick={() => onTemplateSelect(templateId)}
                variant={selectedTemplate === templateId ? "default" : "outline"}
                size="sm"
              >
                Select {getTemplate(templateId)?.name}
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
