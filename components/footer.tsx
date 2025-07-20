"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Code, Sparkles, Coffee } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-20 border-t bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Developer Credit & Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Developer Credit */}
          <div className="flex items-center gap-2">
            <Card className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Code className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">Designed & Developed by</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">AS</span>
                  </div>
                  <span className="font-bold text-blue-600">Akshat Swami</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="h-3 w-3 text-red-500 fill-red-500" />
                  <Coffee className="h-3 w-3 text-amber-600" />
                </div>
              </div>
            </Card>
          </div>

          {/* Copyright */}
          <div className="text-sm text-muted-foreground">
            <span>© {currentYear} Build Your CV. All rights reserved.</span>
          </div>
        </div>

        {/* Tech Stack Badge */}
        <div className="mt-6 flex justify-center">
          <Card className="px-4 py-2 bg-gray-50 border-gray-200">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Built with</span>
              <Badge variant="outline" className="text-xs">
                Next.js
              </Badge>
              <Badge variant="outline" className="text-xs">
                TypeScript
              </Badge>
              <Badge variant="outline" className="text-xs">
                Tailwind CSS
              </Badge>
              <Badge variant="outline" className="text-xs">
                AI
              </Badge>
              <span>•</span>
              <span className="flex items-center gap-1">
                Powered by <Sparkles className="h-3 w-3" /> Gemini AI
              </span>
            </div>
          </Card>
        </div>
      </div>
    </footer>
  )
}
