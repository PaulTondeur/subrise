"use client"

import { useState } from "react"
import Link from "next/link"

import { ArrowRightLeft } from "lucide-react"

interface LoginFormProps {
  isIntermediary?: boolean
}

export function LoginForm({ isIntermediary = false }: LoginFormProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Always show error message as requested
    setError("Uw inloggegevens zijn niet correct. Probeer het opnieuw.")
    setIsSubmitting(false)
  }

  const primaryColor = isIntermediary ? "indigo" : "corporate"
  const buttonBgColor = isIntermediary ? "bg-indigo-600 hover:bg-indigo-700" : "bg-corporate-600 hover:bg-corporate-700"
  const borderColor = isIntermediary ? "border-indigo-300 focus:border-indigo-500" : "border-corporate-300 focus:border-corporate-500"
  const ringColor = isIntermediary ? "focus:ring-indigo-500" : "focus:ring-corporate-500"
  const textColor = isIntermediary ? "text-indigo-600" : "text-corporate-600"
  const switchLinkPath = isIntermediary ? "/login" : "/intermediair/login"
  const switchLinkText = isIntermediary ? "Inloggen als ondernemer" : "Inloggen als intermediair"

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white shadow-md rounded-lg p-8">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Gebruikersnaam
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full px-4 py-2 border ${borderColor} rounded-md shadow-sm focus:outline-none focus:ring-2 ${ringColor} focus:ring-opacity-20`}
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Wachtwoord
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-2 border ${borderColor} rounded-md shadow-sm focus:outline-none focus:ring-2 ${ringColor} focus:ring-opacity-20`}
              required
            />
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${buttonBgColor} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${primaryColor}-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Inloggen...' : 'Inloggen'}
            </button>
          </div>
        </form>
        
        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <Link 
            href={switchLinkPath}
            className={`flex items-center justify-center gap-2 text-sm font-medium ${textColor} hover:underline`}
          >
            <span>{switchLinkText}</span>
            <ArrowRightLeft size={16} />
          </Link>
        </div>
      </div>
    </div>
  )
} 