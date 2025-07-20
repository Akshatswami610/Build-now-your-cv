"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, FileText, ImageIcon, Link, Mail, Linkedin, Github, Globe, QrCode, Copy, Check } from "lucide-react"
import type { ResumeData } from "@/app/page"

interface ExportOptionsProps {
  data: ResumeData
}

export function ExportOptions({ data }: ExportOptionsProps) {
  const [isExporting, setIsExporting] = useState<string | null>(null)
  const [exportProgress, setExportProgress] = useState(0)
  const [shareUrl, setShareUrl] = useState("")
  const [copied, setCopied] = useState(false)

  const exportFormats = [
    {
      id: "pdf",
      name: "PDF Document",
      description: "Professional PDF for job applications",
      icon: <FileText className="h-5 w-5" />,
      color: "from-red-500 to-red-600",
      popular: true,
    },
    {
      id: "docx",
      name: "Word Document",
      description: "Editable DOCX format",
      icon: <FileText className="h-5 w-5" />,
      color: "from-blue-500 to-blue-600",
      popular: false,
    },
    {
      id: "png",
      name: "Image (PNG)",
      description: "High-quality image format",
      icon: <ImageIcon className="h-5 w-5" />,
      color: "from-green-500 to-green-600",
      popular: false,
    },
    {
      id: "html",
      name: "Web Page",
      description: "Interactive HTML version",
      icon: <Globe className="h-5 w-5" />,
      color: "from-purple-500 to-purple-600",
      popular: false,
    },
  ]

  const shareOptions = [
    {
      id: "linkedin",
      name: "LinkedIn",
      description: "Share on LinkedIn profile",
      icon: <Linkedin className="h-5 w-5" />,
      color: "from-blue-600 to-blue-700",
    },
    {
      id: "email",
      name: "Email",
      description: "Send via email",
      icon: <Mail className="h-5 w-5" />,
      color: "from-gray-600 to-gray-700",
    },
    {
      id: "github",
      name: "GitHub",
      description: "Add to GitHub profile",
      icon: <Github className="h-5 w-5" />,
      color: "from-gray-800 to-black",
    },
  ]

  const handleExport = async (format: string) => {
    setIsExporting(format)
    setExportProgress(0)

    // Simulate export progress
    const interval = setInterval(() => {
      setExportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsExporting(null)
          // Simulate download
          const link = document.createElement("a")
          link.href = "#"
          link.download = `resume-${data.personalInfo.fullName || "untitled"}.${format}`
          link.click()
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const generateShareUrl = () => {
    const url = `https://resume-builder.com/share/${Math.random().toString(36).substr(2, 9)}`
    setShareUrl(url)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="border-2 border-dashed border-green-200 bg-green-50/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5 text-green-600" />
          Export & Share
        </CardTitle>
        <CardDescription>Download your resume or share it online</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="export" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="export">Export</TabsTrigger>
            <TabsTrigger value="share">Share</TabsTrigger>
            <TabsTrigger value="qr">QR Code</TabsTrigger>
          </TabsList>

          <TabsContent value="export" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {exportFormats.map((format) => (
                <Card
                  key={format.id}
                  className="cursor-pointer transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${format.color} text-white`}>
                          {format.icon}
                        </div>
                        <div>
                          <div className="font-semibold flex items-center gap-2">
                            {format.name}
                            {format.popular && (
                              <Badge variant="secondary" className="text-xs">
                                Popular
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">{format.description}</div>
                        </div>
                      </div>
                    </div>

                    {isExporting === format.id ? (
                      <div className="space-y-2">
                        <Progress value={exportProgress} className="h-2" />
                        <div className="text-sm text-center text-muted-foreground">Exporting... {exportProgress}%</div>
                      </div>
                    ) : (
                      <Button
                        onClick={() => handleExport(format.id)}
                        className={`w-full bg-gradient-to-r ${format.color} hover:opacity-90`}
                        size="sm"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Export {format.name}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="share" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Button onClick={generateShareUrl} className="w-full bg-gradient-to-r from-blue-500 to-purple-500">
                  <Link className="h-4 w-4 mr-2" />
                  Generate Shareable Link
                </Button>
              </div>

              {shareUrl && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <input type="text" value={shareUrl} readOnly className="flex-1 p-2 border rounded text-sm" />
                    <Button onClick={() => copyToClipboard(shareUrl)} size="sm" variant="outline">
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Share this link to let others view your resume online
                  </div>
                </div>
              )}

              <div className="grid gap-3">
                {shareOptions.map((option) => (
                  <Button
                    key={option.id}
                    variant="outline"
                    className={`justify-start bg-gradient-to-r ${option.color} text-white border-0 hover:opacity-90`}
                  >
                    {option.icon}
                    <span className="ml-2">{option.name}</span>
                    <span className="ml-auto text-sm opacity-80">{option.description}</span>
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="qr" className="space-y-4">
            <div className="text-center space-y-4">
              <div className="w-48 h-48 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                <QrCode className="h-24 w-24 text-gray-400" />
              </div>
              <div>
                <h3 className="font-semibold">QR Code</h3>
                <p className="text-sm text-muted-foreground">Scan to view resume on mobile devices</p>
              </div>
              <Button className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download QR Code
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
