"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Code,
  Briefcase,
  Palette,
  Users,
  TrendingUp,
  Globe,
  Heart,
  GraduationCap,
  Building,
  Camera,
  Lightbulb,
  Shield,
  Stethoscope,
  Calculator,
  Search,
  Check,
  Star,
  Eye,
} from "lucide-react"

export interface ResumeTemplate {
  id: string
  name: string
  description: string
  category: string
  icon: React.ReactNode
  preview: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
  }
  features: string[]
  bestFor: string[]
  layout: "modern" | "classic" | "creative" | "minimal"
  popularity: number
}

const templates: ResumeTemplate[] = [
  {
    id: "modern-tech",
    name: "Modern Tech",
    description: "Clean, minimalist design perfect for software developers and tech professionals",
    category: "Technology",
    icon: <Code className="h-5 w-5" />,
    preview: "/placeholder.svg?height=300&width=200",
    colors: { primary: "#2563eb", secondary: "#64748b", accent: "#0ea5e9", background: "#f8fafc" },
    features: ["GitHub integration", "Skills visualization", "Project showcase"],
    bestFor: ["Software Developer", "Data Scientist", "DevOps Engineer"],
    layout: "modern",
    popularity: 95,
  },
  {
    id: "executive-pro",
    name: "Executive Pro",
    description: "Professional and sophisticated layout for senior management positions",
    category: "Business",
    icon: <Briefcase className="h-5 w-5" />,
    preview: "/placeholder.svg?height=300&width=200",
    colors: { primary: "#1f2937", secondary: "#6b7280", accent: "#059669", background: "#ffffff" },
    features: ["Leadership focus", "Achievement highlights", "Executive summary"],
    bestFor: ["CEO", "Director", "Senior Manager"],
    layout: "classic",
    popularity: 88,
  },
  {
    id: "creative-designer",
    name: "Creative Designer",
    description: "Vibrant and artistic template for creative professionals",
    category: "Creative",
    icon: <Palette className="h-5 w-5" />,
    preview: "/placeholder.svg?height=300&width=200",
    colors: { primary: "#7c3aed", secondary: "#a855f7", accent: "#ec4899", background: "#fdf4ff" },
    features: ["Portfolio integration", "Visual elements", "Color customization"],
    bestFor: ["Graphic Designer", "UI/UX Designer", "Artist"],
    layout: "creative",
    popularity: 92,
  },
  {
    id: "startup-founder",
    name: "Startup Founder",
    description: "Dynamic template highlighting entrepreneurial experience",
    category: "Entrepreneurship",
    icon: <TrendingUp className="h-5 w-5" />,
    preview: "/placeholder.svg?height=300&width=200",
    colors: { primary: "#dc2626", secondary: "#ef4444", accent: "#f97316", background: "#fef2f2" },
    features: ["Startup experience", "Innovation focus", "Growth metrics"],
    bestFor: ["Entrepreneur", "Startup Founder", "Product Manager"],
    layout: "modern",
    popularity: 85,
  },
  {
    id: "academic-scholar",
    name: "Academic Scholar",
    description: "Traditional format ideal for academic and research positions",
    category: "Academic",
    icon: <GraduationCap className="h-5 w-5" />,
    preview: "/placeholder.svg?height=300&width=200",
    colors: { primary: "#1e40af", secondary: "#3b82f6", accent: "#06b6d4", background: "#f0f9ff" },
    features: ["Publications list", "Research focus", "Academic achievements"],
    bestFor: ["Professor", "Researcher", "PhD Student"],
    layout: "classic",
    popularity: 78,
  },
  {
    id: "sales-champion",
    name: "Sales Champion",
    description: "Results-driven template emphasizing sales achievements",
    category: "Sales",
    icon: <TrendingUp className="h-5 w-5" />,
    preview: "/placeholder.svg?height=300&width=200",
    colors: { primary: "#059669", secondary: "#10b981", accent: "#34d399", background: "#f0fdf4" },
    features: ["Sales metrics", "Achievement focus", "Client testimonials"],
    bestFor: ["Sales Manager", "Account Executive", "Business Development"],
    layout: "modern",
    popularity: 90,
  },
  {
    id: "healthcare-pro",
    name: "Healthcare Professional",
    description: "Clean, trustworthy design for medical professionals",
    category: "Healthcare",
    icon: <Stethoscope className="h-5 w-5" />,
    preview: "/placeholder.svg?height=300&width=200",
    colors: { primary: "#0369a1", secondary: "#0284c7", accent: "#0ea5e9", background: "#e0f7fa" },
    features: ["Certifications focus", "Patient care emphasis", "Medical experience"],
    bestFor: ["Doctor", "Nurse", "Medical Technician"],
    layout: "classic",
    popularity: 82,
  },
  {
    id: "finance-expert",
    name: "Finance Expert",
    description: "Professional template for financial services professionals",
    category: "Finance",
    icon: <Calculator className="h-5 w-5" />,
    preview: "/placeholder.svg?height=300&width=200",
    colors: { primary: "#1f2937", secondary: "#374151", accent: "#059669", background: "#f3e5f5" },
    features: ["Financial metrics", "Compliance focus", "Risk management"],
    bestFor: ["Financial Analyst", "Investment Banker", "Accountant"],
    layout: "classic",
    popularity: 80,
  },
  {
    id: "marketing-guru",
    name: "Marketing Guru",
    description: "Eye-catching design for marketing and advertising professionals",
    category: "Marketing",
    icon: <Users className="h-5 w-5" />,
    preview: "/placeholder.svg?height=300&width=200",
    colors: { primary: "#7c2d12", secondary: "#ea580c", accent: "#f97316", background: "#ffe0b2" },
    features: ["Campaign highlights", "Brand focus", "Social media integration"],
    bestFor: ["Marketing Manager", "Brand Manager", "Digital Marketer"],
    layout: "creative",
    popularity: 89,
  },
  {
    id: "nonprofit-leader",
    name: "Nonprofit Leader",
    description: "Purpose-driven template for nonprofit and social impact roles",
    category: "Nonprofit",
    icon: <Heart className="h-5 w-5" />,
    preview: "/placeholder.svg?height=300&width=200",
    colors: { primary: "#be185d", secondary: "#ec4899", accent: "#f472b6", background: "#fce4ec" },
    features: ["Impact metrics", "Volunteer experience", "Mission alignment"],
    bestFor: ["Program Director", "Fundraiser", "Social Worker"],
    layout: "classic",
    popularity: 84,
  },
  {
    id: "consulting-expert",
    name: "Consulting Expert",
    description: "Strategic template for management consultants",
    category: "Consulting",
    icon: <Lightbulb className="h-5 w-5" />,
    preview: "/placeholder.svg?height=300&width=200",
    colors: { primary: "#1e40af", secondary: "#3b82f6", accent: "#60a5fa", background: "#e8eaf6" },
    features: ["Problem-solving focus", "Client impact", "Strategic thinking"],
    bestFor: ["Management Consultant", "Strategy Consultant", "Business Analyst"],
    layout: "modern",
    popularity: 87,
  },
  {
    id: "cybersecurity-pro",
    name: "Cybersecurity Pro",
    description: "Secure and professional design for cybersecurity experts",
    category: "Security",
    icon: <Shield className="h-5 w-5" />,
    preview: "/placeholder.svg?height=300&width=200",
    colors: { primary: "#1f2937", secondary: "#4b5563", accent: "#dc2626", background: "#f8bbd0" },
    features: ["Security certifications", "Threat analysis", "Compliance focus"],
    bestFor: ["Security Analyst", "Penetration Tester", "CISO"],
    layout: "classic",
    popularity: 86,
  },
  {
    id: "media-journalist",
    name: "Media & Journalism",
    description: "Dynamic template for media and journalism professionals",
    category: "Media",
    icon: <Camera className="h-5 w-5" />,
    preview: "/placeholder.svg?height=300&width=200",
    colors: { primary: "#7c2d12", secondary: "#dc2626", accent: "#f97316", background: "#ffe0b2" },
    features: ["Portfolio showcase", "Publication list", "Media coverage"],
    bestFor: ["Journalist", "Content Creator", "Media Producer"],
    layout: "creative",
    popularity: 83,
  },
  {
    id: "international-global",
    name: "International Professional",
    description: "Multicultural template for global professionals",
    category: "International",
    icon: <Globe className="h-5 w-5" />,
    preview: "/placeholder.svg?height=300&width=200",
    colors: { primary: "#0369a1", secondary: "#0284c7", accent: "#06b6d4", background: "#e0f7fa" },
    features: ["Language skills", "Global experience", "Cultural adaptability"],
    bestFor: ["International Relations", "Global Manager", "Diplomat"],
    layout: "modern",
    popularity: 81,
  },
  {
    id: "student-fresh",
    name: "Fresh Graduate",
    description: "Entry-level focused template for recent graduates",
    category: "Student",
    icon: <GraduationCap className="h-5 w-5" />,
    preview: "/placeholder.svg?height=300&width=200",
    colors: { primary: "#059669", secondary: "#10b981", accent: "#34d399", background: "#f0fdf4" },
    features: ["Education focus", "Internship highlights", "Skills emphasis"],
    bestFor: ["Recent Graduate", "Entry Level", "Intern"],
    layout: "minimal",
    popularity: 87,
  },
  {
    id: "remote-digital",
    name: "Remote Digital Nomad",
    description: "Modern template for remote work professionals",
    category: "Remote",
    icon: <Globe className="h-5 w-5" />,
    preview: "/placeholder.svg?height=300&width=200",
    colors: { primary: "#7c3aed", secondary: "#8b5cf6", accent: "#a78bfa", background: "#f3e5f5" },
    features: ["Remote work emphasis", "Digital skills", "Flexibility highlight"],
    bestFor: ["Remote Worker", "Freelancer", "Digital Nomad"],
    layout: "modern",
    popularity: 89,
  },
  {
    id: "operations-manager",
    name: "Operations Manager",
    description: "Efficiency-focused template for operations professionals",
    category: "Operations",
    icon: <Building className="h-5 w-5" />,
    preview: "/placeholder.svg?height=300&width=200",
    colors: { primary: "#1f2937", secondary: "#374151", accent: "#059669", background: "#e8eaf6" },
    features: ["Process improvement", "Efficiency metrics", "Team leadership"],
    bestFor: ["Operations Manager", "Supply Chain", "Project Manager"],
    layout: "classic",
    popularity: 85,
  },
  {
    id: "hr-people",
    name: "HR & People Operations",
    description: "People-focused template for human resources professionals",
    category: "Human Resources",
    icon: <Users className="h-5 w-5" />,
    preview: "/placeholder.svg?height=300&width=200",
    colors: { primary: "#be185d", secondary: "#ec4899", accent: "#f472b6", background: "#fce4ec" },
    features: ["People management", "Culture building", "Talent development"],
    bestFor: ["HR Manager", "Recruiter", "People Operations"],
    layout: "modern",
    popularity: 88,
  },
  {
    id: "legal-attorney",
    name: "Legal Professional",
    description: "Professional template for legal practitioners",
    category: "Legal",
    icon: <Shield className="h-5 w-5" />,
    preview: "/placeholder.svg?height=300&width=200",
    colors: { primary: "#1e40af", secondary: "#3b82f6", accent: "#60a5fa", background: "#e8eaf6" },
    features: ["Legal experience", "Case highlights", "Bar admissions"],
    bestFor: ["Attorney", "Legal Counsel", "Paralegal"],
    layout: "classic",
    popularity: 86,
  },
  {
    id: "engineering-technical",
    name: "Engineering Professional",
    description: "Technical template for engineering professionals",
    category: "Engineering",
    icon: <Code className="h-5 w-5" />,
    preview: "/placeholder.svg?height=300&width=200",
    colors: { primary: "#dc2626", secondary: "#ef4444", accent: "#f97316", background: "#f8bbd0" },
    features: ["Technical projects", "Engineering skills", "Problem solving"],
    bestFor: ["Mechanical Engineer", "Civil Engineer", "Electrical Engineer"],
    layout: "modern",
    popularity: 84,
  },
  {
    id: "retail-hospitality",
    name: "Retail & Hospitality",
    description: "Service-oriented template for customer-facing roles",
    category: "Service",
    icon: <Users className="h-5 w-5" />,
    preview: "/placeholder.svg?height=300&width=200",
    colors: { primary: "#7c2d12", secondary: "#ea580c", accent: "#f97316", background: "#ffe0b2" },
    features: ["Customer service", "Sales experience", "Team collaboration"],
    bestFor: ["Store Manager", "Hotel Manager", "Customer Service"],
    layout: "classic",
    popularity: 82,
  },
  {
    id: "data-analytics",
    name: "Data & Analytics",
    description: "Data-driven template for analytics professionals",
    category: "Data",
    icon: <TrendingUp className="h-5 w-5" />,
    preview: "/placeholder.svg?height=300&width=200",
    colors: { primary: "#0369a1", secondary: "#0284c7", accent: "#06b6d4", background: "#e0f7fa" },
    features: ["Data visualization", "Analytics tools", "Statistical analysis"],
    bestFor: ["Data Analyst", "Business Intelligence", "Data Engineer"],
    layout: "modern",
    popularity: 87,
  },
]

interface TemplateSelectorProps {
  selectedTemplate: string
  onTemplateSelect: (templateId: string) => void
  resumeType: "job" | "internship" | "hackathon"
}

const TemplatePreview: React.FC<{ template: ResumeTemplate; isSelected: boolean }> = ({ template, isSelected }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative w-full h-48 rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105"
      style={{ backgroundColor: template.colors.background }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Template Structure Preview */}
      <div className="p-3 h-full">
        {/* Header Section */}
        <div
          className="h-8 rounded mb-2 flex items-center justify-center transition-all duration-300"
          style={{
            backgroundColor: `${template.colors.primary}20`,
            borderLeft: `3px solid ${template.colors.primary}`,
          }}
        >
          <div className="w-16 h-2 rounded" style={{ backgroundColor: template.colors.primary }} />
        </div>

        {/* Contact Info */}
        <div className="flex justify-center gap-1 mb-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-8 h-1 rounded transition-all duration-300"
              style={{
                backgroundColor: template.colors.secondary,
                opacity: isHovered ? 0.8 : 0.6,
              }}
            />
          ))}
        </div>

        {/* Content Sections */}
        <div className="space-y-2">
          {/* Experience Section */}
          <div>
            <div className="w-12 h-1.5 rounded mb-1" style={{ backgroundColor: template.colors.accent }} />
            <div className="space-y-1">
              {[1, 2].map((i) => (
                <div key={i} className="flex gap-1">
                  <div
                    className="w-16 h-1 rounded"
                    style={{
                      backgroundColor: template.colors.secondary,
                      opacity: 0.7,
                    }}
                  />
                  <div
                    className="w-8 h-1 rounded"
                    style={{
                      backgroundColor: template.colors.secondary,
                      opacity: 0.5,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Skills Section */}
          <div>
            <div className="w-8 h-1.5 rounded mb-1" style={{ backgroundColor: template.colors.accent }} />
            <div className="flex gap-1 flex-wrap">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-6 h-1 rounded transition-all duration-300"
                  style={{
                    backgroundColor: `${template.colors.primary}40`,
                    transform: isHovered ? "scale(1.05)" : "scale(1)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Projects Section */}
          <div>
            <div className="w-10 h-1.5 rounded mb-1" style={{ backgroundColor: template.colors.accent }} />
            <div className="space-y-1">
              <div className="flex gap-1">
                <div
                  className="w-14 h-1 rounded"
                  style={{
                    backgroundColor: template.colors.secondary,
                    opacity: 0.7,
                  }}
                />
              </div>
              <div className="flex gap-1">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-4 h-1 rounded"
                    style={{
                      backgroundColor: `${template.colors.accent}60`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hover Overlay */}
      <div
        className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-all duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="text-white text-center">
          <Eye className="h-6 w-6 mx-auto mb-1" />
          <span className="text-xs font-medium">Preview</span>
        </div>
      </div>

      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1 animate-pulse">
          <Check className="h-3 w-3 text-white" />
        </div>
      )}

      {/* Popularity Badge */}
      <div className="absolute top-2 left-2">
        <Badge variant="secondary" className="text-xs flex items-center gap-1 bg-white/90 backdrop-blur-sm">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          {template.popularity}
        </Badge>
      </div>
    </div>
  )
}

export function TemplateSelector({ selectedTemplate, onTemplateSelect, resumeType }: TemplateSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState<"popularity" | "name">("popularity")

  const categories = ["All", ...Array.from(new Set(templates.map((t) => t.category)))]

  const filteredTemplates = templates
    .filter((template) => {
      const matchesSearch =
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.bestFor.some((role) => role.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = selectedCategory === "All" || template.category === selectedCategory

      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === "popularity") return b.popularity - a.popularity
      return a.name.localeCompare(b.name)
    })

  const getRecommendedTemplates = () => {
    switch (resumeType) {
      case "hackathon":
        return templates
          .filter((t) => t.category === "Technology" || t.id === "startup-founder")
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 3)
      case "internship":
        return templates
          .filter((t) => t.id === "student-fresh" || t.category === "Technology" || t.category === "Academic")
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 3)
      default:
        return templates.sort((a, b) => b.popularity - a.popularity).slice(0, 3)
    }
  }

  const recommendedTemplates = getRecommendedTemplates()

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      <div className="text-center space-y-4">
        <div className="animate-in slide-in-from-top-4 duration-700">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Choose Your Perfect Template
          </h2>
          <p className="text-muted-foreground mt-2">
            Select a professional template that matches your industry and style
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="animate-in slide-in-from-top-6 duration-700 delay-200">
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-0 shadow-lg">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search templates by name, industry, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/80 backdrop-blur-sm border-0 shadow-sm"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`text-xs transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      : "bg-white/80 backdrop-blur-sm hover:bg-white"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
            <div className="flex gap-2">
              <Button
                variant={sortBy === "popularity" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("popularity")}
                className="text-xs"
              >
                Popular
              </Button>
              <Button
                variant={sortBy === "name" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("name")}
                className="text-xs"
              >
                A-Z
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Recommended Templates */}
      {searchTerm === "" && selectedCategory === "All" && (
        <div className="animate-in slide-in-from-bottom-4 duration-700 delay-300">
          <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50 border-0 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              <h3 className="text-xl font-semibold">
                Recommended for{" "}
                {resumeType === "hackathon"
                  ? "Hackathons"
                  : resumeType === "internship"
                    ? "Internships"
                    : "Your Resume"}
              </h3>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {recommendedTemplates.map((template, index) => (
                <Card
                  key={template.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${
                    selectedTemplate === template.id
                      ? "ring-2 ring-blue-500 shadow-xl bg-gradient-to-br from-blue-50 to-purple-50"
                      : "hover:shadow-lg"
                  }`}
                  onClick={() => onTemplateSelect(template.id)}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg" style={{ backgroundColor: `${template.colors.primary}20` }}>
                          {template.icon}
                        </div>
                        <div>
                          <CardTitle className="text-base">{template.name}</CardTitle>
                          <Badge
                            variant="secondary"
                            className="text-xs mt-1"
                            style={{
                              backgroundColor: `${template.colors.accent}20`,
                              color: template.colors.accent,
                            }}
                          >
                            {template.category}
                          </Badge>
                        </div>
                      </div>
                      {selectedTemplate === template.id && (
                        <div className="animate-bounce">
                          <Check className="h-5 w-5 text-green-600" />
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <TemplatePreview template={template} isSelected={selectedTemplate === template.id} />
                    <CardDescription className="text-sm line-clamp-2">{template.description}</CardDescription>
                    <div className="flex flex-wrap gap-1">
                      {template.bestFor.slice(0, 2).map((role) => (
                        <Badge key={role} variant="outline" className="text-xs">
                          {role}
                        </Badge>
                      ))}
                      {template.bestFor.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{template.bestFor.length - 2}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* All Templates */}
      <div className="animate-in slide-in-from-bottom-6 duration-700 delay-400">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold">
            {searchTerm || selectedCategory !== "All" ? "Search Results" : "All Templates"}
          </h3>
          <Badge variant="outline" className="text-sm">
            {filteredTemplates.length} template{filteredTemplates.length !== 1 ? "s" : ""}
          </Badge>
        </div>

        {filteredTemplates.length === 0 ? (
          <Card className="p-12 text-center bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="animate-pulse">
              <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 mb-4">No templates found matching your criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("All")
                }}
                className="animate-bounce"
              >
                Clear Filters
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredTemplates.map((template, index) => (
              <Card
                key={template.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 animate-in fade-in-50 slide-in-from-bottom-4 ${
                  selectedTemplate === template.id
                    ? "ring-2 ring-blue-500 shadow-xl bg-gradient-to-br from-blue-50 to-purple-50"
                    : "hover:shadow-lg"
                }`}
                onClick={() => onTemplateSelect(template.id)}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="p-2 rounded-lg transition-all duration-300"
                        style={{ backgroundColor: `${template.colors.primary}20` }}
                      >
                        {template.icon}
                      </div>
                      <div>
                        <CardTitle className="text-sm">{template.name}</CardTitle>
                        <Badge
                          variant="secondary"
                          className="text-xs mt-1"
                          style={{
                            backgroundColor: `${template.colors.accent}20`,
                            color: template.colors.accent,
                          }}
                        >
                          {template.category}
                        </Badge>
                      </div>
                    </div>
                    {selectedTemplate === template.id && (
                      <div className="animate-bounce">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <TemplatePreview template={template} isSelected={selectedTemplate === template.id} />
                  <CardDescription className="text-xs line-clamp-2">{template.description}</CardDescription>
                  <div className="flex flex-wrap gap-1">
                    {template.bestFor.slice(0, 2).map((role) => (
                      <Badge key={role} variant="outline" className="text-xs">
                        {role}
                      </Badge>
                    ))}
                    {template.bestFor.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{template.bestFor.length - 2}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
