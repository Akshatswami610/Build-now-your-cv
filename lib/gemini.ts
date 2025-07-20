import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI({
  apiKey: "AIzaSyCFFGpSb7BvW1SkjMslgGQS-wAHiQe5ft0",
  apiVersion: "v1", // <- tell the SDK to call the v1 endpoint
})

export async function generateResumeImprovement(section: string, content: string, resumeType: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    const prompt = `
    You are a professional resume advisor. Please improve the following ${section} section for a ${resumeType} resume.
    
    Current content: "${content}"
    
    Please provide:
    1. An improved version of the content
    2. 2-3 specific suggestions for enhancement
    3. Keep it concise and professional
    
    Format your response as JSON:
    {
      "improved": "improved content here",
      "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"]
    }
    `

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Parse JSON response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }

    return {
      improved: content,
      suggestions: ["Unable to generate suggestions at this time."],
    }
  } catch (error) {
    console.error("Error generating improvement:", error)
    return {
      improved: content,
      suggestions: ["Unable to generate suggestions at this time."],
    }
  }
}

export async function generateSkillSuggestions(resumeType: string, existingSkills: string[]) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    const prompt = `
    Suggest 10 relevant technical skills for a ${resumeType} resume.
    Current skills: ${existingSkills.join(", ")}
    
    Please suggest skills that are:
    1. Relevant to ${resumeType} applications
    2. Not already in the current skills list
    3. Popular and in-demand in the current job market
    
    Return only a JSON array of skill names:
    ["skill1", "skill2", "skill3", ...]
    `

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Parse JSON response
    const jsonMatch = text.match(/\[[\s\S]*\]/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }

    return []
  } catch (error) {
    console.error("Error generating skill suggestions:", error)
    return []
  }
}

export async function generateProjectDescription(projectName: string, technologies: string[], resumeType: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    const prompt = `
    Generate a professional project description for a ${resumeType} resume.
    
    Project Name: ${projectName}
    Technologies Used: ${technologies.join(", ")}
    
    Please create a description that:
    1. Is 2-3 sentences long
    2. Highlights technical achievements and impact
    3. Uses action verbs and quantifiable results where possible
    4. Is appropriate for a ${resumeType} application
    
    Return only the description text, no additional formatting.
    `

    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text().trim()
  } catch (error) {
    console.error("Error generating project description:", error)
    return ""
  }
}

export async function analyzeResumeCompleteness(resumeData: any) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    const prompt = `
    Analyze this resume data and provide a completeness score and recommendations:
    
    Resume Type: ${resumeData.resumeType}
    Personal Info: ${JSON.stringify(resumeData.personalInfo)}
    Education: ${resumeData.education.length} entries
    Experience: ${resumeData.experience.length} entries
    Skills: ${resumeData.skills.technical.length + resumeData.skills.soft.length} total skills
    Projects: ${resumeData.projects.length} entries
    
    Please provide:
    1. A completeness score (0-100)
    2. Top 3 recommendations for improvement
    3. Missing sections or weak areas
    
    Format as JSON:
    {
      "score": 85,
      "recommendations": ["recommendation 1", "recommendation 2", "recommendation 3"],
      "weakAreas": ["area 1", "area 2"]
    }
    `

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Parse JSON response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }

    return {
      score: 70,
      recommendations: ["Add more specific achievements", "Include quantifiable results", "Expand technical skills"],
      weakAreas: ["Experience section", "Project descriptions"],
    }
  } catch (error) {
    console.error("Error analyzing resume:", error)
    return {
      score: 70,
      recommendations: ["Add more specific achievements", "Include quantifiable results", "Expand technical skills"],
      weakAreas: ["Experience section", "Project descriptions"],
    }
  }
}
