"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { PersonalInfoForm } from "@/components/personal-info-form"
import { EducationForm } from "@/components/education-form"
import { ExperienceForm } from "@/components/experience-form"
import { SkillsForm } from "@/components/skills-form"
import { ProjectsForm } from "@/components/projects-form"
import { ResumePreview } from "@/components/resume-preview"
import { TemplateSelector } from "@/components/template-selector"
import { FileText, Users, Code, ChevronLeft, ChevronRight, Download, Sparkles } from "lucide-react"
import { Footer } from "@/components/footer"

export interface ResumeData {
  personalInfo: {
    fullName: string
    email: string
    phone: string
    location: string
    linkedin: string
    github: string
    portfolio: string
  }
  education: Array<{
    id: string
    institution: string
    degree: string
    field: string
    gpa: string
    startDate: string
    endDate: string
    current: boolean
  }>
  experience: Array<{
    id: string
    company: string
    position: string
    location: string
    startDate: string
    endDate: string
    current: boolean
    description: string
  }>
  skills: {
    technical: string[]
    soft: string[]
    languages: string[]
  }
  projects: Array<{
    id: string
    name: string
    description: string
    technologies: string[]
    github: string
    demo: string
    startDate: string
    endDate: string
  }>
  resumeType: "job" | "internship" | "hackathon"
  selectedTemplate: string
}

const steps = [
  {
    id: "type",
    title: "Resume Type",
    description: "Choose your target application",
    icon: <FileText className="h-5 w-5" />,
  },
  { id: "template", title: "Template", description: "Select your design", icon: <Sparkles className="h-5 w-5" /> },
  {
    id: "personal",
    title: "Personal Info",
    description: "Basic contact information",
    icon: <Users className="h-5 w-5" />,
  },
  { id: "education", title: "Education", description: "Academic background", icon: <FileText className="h-5 w-5" /> },
  {
    id: "experience",
    title: "Experience",
    description: "Work and internship history",
    icon: <FileText className="h-5 w-5" />,
  },
  { id: "skills", title: "Skills", description: "Technical and soft skills", icon: <Code className="h-5 w-5" /> },
  {
    id: "projects",
    title: "Projects",
    description: "Personal and academic projects",
    icon: <FileText className="h-5 w-5" />,
  },
  { id: "preview", title: "Preview", description: "Review and download", icon: <FileText className="h-5 w-5" /> },
]

export default function ResumeBuildPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      portfolio: "",
    },
    education: [],
    experience: [],
    skills: {
      technical: [],
      soft: [],
      languages: [],
    },
    projects: [],
    resumeType: "job",
    selectedTemplate: "modern-tech",
  })

  const updateResumeData = (section: keyof ResumeData, data: any) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: data,
    }))
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const progress = ((currentStep + 1) / steps.length) * 100

  const renderStepContent = () => {
    switch (steps[currentStep].id) {
      case "type":
        return (
          <div className="space-y-8 animate-in fade-in-50 duration-500">
            <div className="text-center space-y-4">
              <div className="animate-in slide-in-from-top-4 duration-700">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  What type of resume do you need?
                </h2>
                <p className="text-muted-foreground mt-2">Choose the option that best fits your application</p>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  type: "job",
                  icon: <FileText className="h-16 w-16 mx-auto mb-4 text-blue-600" />,
                  title: "Full-Time Job",
                  description: "Professional resume for career positions",
                  features: ["Detailed work experience", "Professional achievements", "Industry-specific skills"],
                  gradient: "from-blue-500 to-blue-600",
                  delay: "delay-200",
                },
                {
                  type: "internship",
                  icon: <Users className="h-16 w-16 mx-auto mb-4 text-green-600" />,
                  title: "Internship",
                  description: "Student-focused resume for internships",
                  features: ["Academic projects", "Relevant coursework", "Leadership activities"],
                  gradient: "from-green-500 to-green-600",
                  delay: "delay-300",
                },
                {
                  type: "hackathon",
                  icon: <Code className="h-16 w-16 mx-auto mb-4 text-purple-600" />,
                  title: "Hackathon",
                  description: "Tech-focused resume for competitions",
                  features: ["Technical skills", "GitHub projects", "Innovation focus"],
                  gradient: "from-purple-500 to-purple-600",
                  delay: "delay-400",
                },
              ].map((option, index) => (
                <Card
                  key={option.type}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 animate-in slide-in-from-bottom-4 ${option.delay} ${
                    resumeData.resumeType === option.type
                      ? "ring-2 ring-blue-500 shadow-xl bg-gradient-to-br from-blue-50 to-purple-50"
                      : "hover:shadow-lg"
                  }`}
                  onClick={() => updateResumeData("resumeType", option.type)}
                >
                  <CardHeader className="text-center pb-4">
                    <div className="animate-bounce">{option.icon}</div>
                    <CardTitle className="text-xl">{option.title}</CardTitle>
                    <CardDescription className="text-base">{option.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {option.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )
      case "template":
        return (
          <TemplateSelector
            selectedTemplate={resumeData.selectedTemplate}
            onTemplateSelect={(templateId) => updateResumeData("selectedTemplate", templateId)}
            resumeType={resumeData.resumeType}
          />
        )
      case "personal":
        return (
          <div className="animate-in fade-in-50 duration-500">
            <PersonalInfoForm
              data={resumeData.personalInfo}
              onChange={(data) => updateResumeData("personalInfo", data)}
            />
          </div>
        )
      case "education":
        return (
          <div className="animate-in fade-in-50 duration-500">
            <EducationForm data={resumeData.education} onChange={(data) => updateResumeData("education", data)} />
          </div>
        )
      case "experience":
        return (
          <div className="animate-in fade-in-50 duration-500">
            <ExperienceForm
              data={resumeData.experience}
              onChange={(data) => updateResumeData("experience", data)}
              resumeType={resumeData.resumeType}
            />
          </div>
        )
      case "skills":
        return (
          <div className="animate-in fade-in-50 duration-500">
            <SkillsForm
              data={resumeData.skills}
              onChange={(data) => updateResumeData("skills", data)}
              resumeType={resumeData.resumeType}
            />
          </div>
        )
      case "projects":
        return (
          <div className="animate-in fade-in-50 duration-500">
            <ProjectsForm
              data={resumeData.projects}
              onChange={(data) => updateResumeData("projects", data)}
              resumeType={resumeData.resumeType}
            />
          </div>
        )
      case "preview":
        return (
          <div className="animate-in fade-in-50 duration-500">
            <ResumePreview data={resumeData} />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-in slide-in-from-top-6 duration-1000">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Build Your CV
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Create a professional CV in minutes</p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            <span className="text-sm text-muted-foreground">AI-Powered • Professional Templates • Easy Export</span>
            <Sparkles className="h-5 w-5 text-yellow-500" />
          </div>
        </div>

        {/* Progress */}
        <div className="max-w-4xl mx-auto mb-12 animate-in slide-in-from-top-8 duration-1000 delay-200">
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
                  {steps[currentStep].icon}
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Step {currentStep + 1} of {steps.length}
                  </span>
                  <Badge variant="outline" className="ml-2">
                    {steps[currentStep].title}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{Math.round(progress)}%</div>
                <div className="text-xs text-muted-foreground">Complete</div>
              </div>
            </div>
            <Progress value={progress} className="h-3 bg-gray-200">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              />
            </Progress>

            {/* Step indicators */}
            <div className="flex justify-between mt-4">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex flex-col items-center transition-all duration-300 ${
                    index <= currentStep ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                      index < currentStep
                        ? "bg-green-500 text-white"
                        : index === currentStep
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {index < currentStep ? "✓" : index + 1}
                  </div>
                  <span className="text-xs mt-1 hidden sm:block">{step.title}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto animate-in slide-in-from-bottom-6 duration-1000 delay-300">
          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-3 text-2xl">
                {steps[currentStep].icon}
                {steps[currentStep].title}
              </CardTitle>
              <CardDescription className="text-blue-100 text-lg">{steps[currentStep].description}</CardDescription>
            </CardHeader>
            <CardContent className="p-8 min-h-[600px]">{renderStepContent()}</CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between mt-8 animate-in slide-in-from-bottom-4 duration-1000 delay-500">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-6 py-3 text-lg bg-white/80 backdrop-blur-sm border-2 hover:bg-white transition-all duration-300 disabled:opacity-50"
            >
              <ChevronLeft className="h-5 w-5" />
              Previous
            </Button>

            {currentStep === steps.length - 1 ? (
              <Button className="flex items-center gap-2 px-8 py-3 text-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <Download className="h-5 w-5" />
                Download Resume
              </Button>
            ) : (
              <Button
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-3 text-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Next
                <ChevronRight className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
