"use client"

import type React from "react"
import { useState } from "react"
import { submitToWaitlist, updateWaitlistSubmission } from "./actions"

export interface FormData {
  firstName: string
  lastName: string
  email: string
  companyName: string
  phoneNumber: string
  rdEmployees: string
  comments: string
  isIntermediary?: boolean
}

interface WaitlistFormProps {
  isIntermediary?: boolean
}

type FormStep = 1 | 2 | 3 | "complete"

export function WaitlistForm({ isIntermediary = false }: WaitlistFormProps) {
  const [currentStep, setCurrentStep] = useState<FormStep>(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionId, setSubmissionId] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    phoneNumber: "",
    rdEmployees: "",
    comments: "",
    isIntermediary,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePartialSubmit = async () => {
    console.log('Partial submit:', formData)
    const result = await submitToWaitlist({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      companyName: formData.companyName,
      phoneNumber: formData.phoneNumber,
      isIntermediary,
    })
    
    if (result.success) {
      setSubmissionId(result.id)
    } else {
      throw new Error("Failed to create submission")
    }
  }

  const handleUnpartialSubmit = async () => {
    console.log('Un-partial submit:', formData)
    if (!submissionId) {
      throw new Error("No submission ID found")
    }
    
    await updateWaitlistSubmission(submissionId, formData.email, {
      rdEmployees: formData.rdEmployees
    })
  }

  const handleFinalSubmit = async () => {
    console.log('Final submit:', formData)
    if (!submissionId) {
      throw new Error("No submission ID found")
    }
    
    try {
      await updateWaitlistSubmission(submissionId, formData.email, {
        comments: formData.comments
      })
      console.log('Submission successful!', formData)
      setCurrentStep("complete")
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Er is een fout opgetreden bij het verzenden van je aanmelding. Probeer het later opnieuw.")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      if (currentStep === 1) {
        await handlePartialSubmit()
        setCurrentStep(2)
      } else if (currentStep === 2) {
        await handleUnpartialSubmit()
        setCurrentStep(3)
      } else {
        await handleFinalSubmit()
      }
    } catch (error) {
      console.error("Error handling form submission:", error)
      alert("Er is een fout opgetreden. Probeer het later opnieuw.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRdEmployeesChange = async (value: string) => {
    setFormData((prev) => ({ ...prev, rdEmployees: value }))
    setIsSubmitting(true)
    try {
      if (!submissionId) {
        throw new Error("No submission ID found")
      }
      
      await updateWaitlistSubmission(submissionId, formData.email, {
        rdEmployees: value
      })
      setCurrentStep(3)
    } catch (error) {
      console.error("Error updating R&D employees:", error)
      alert("Er is een fout opgetreden. Probeer het later opnieuw.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Define color variables based on isIntermediary
  const primaryBg = isIntermediary ? "bg-indigo-600" : "bg-corporate-600"
  const primaryHoverBg = isIntermediary ? "bg-indigo-700" : "bg-corporate-700"
  const primaryBgLight = isIntermediary ? "bg-indigo-50" : "bg-corporate-50"
  const primaryText = isIntermediary ? "text-indigo-600" : "text-corporate-600"
  const primaryBorder = isIntermediary ? "border-indigo-100" : "border-corporate-100"
  const primaryDarkText = isIntermediary ? "text-indigo-800" : "text-corporate-800"
  const primaryBorderInput = isIntermediary ? "border-indigo-200" : "border-corporate-200"
  const primaryRing = isIntermediary ? "focus:ring-indigo-400" : "focus:ring-corporate-400"

  const renderCheckIcon = () => (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )

  const renderThankYou = () => (
    <div className="text-center space-y-8">
      <div className="w-16 h-16 bg-corporate-100 rounded-full flex items-center justify-center mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-corporate-600">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-corporate-800">Bedankt voor je aanmelding!</h3>
        
        <p className="text-lg text-gray-600">
          We hebben je gegevens ontvangen en je staat nu op onze wachtlijst. Zodra er een plek beschikbaar komt, nemen we direct contact met je op.
        </p>

        <p className="text-lg font-medium text-corporate-600">
          Tot snel! 👋
        </p>
      </div>
    </div>
  )

  const renderStep1 = () => (
    <div className="space-y-4">
      <h3 className={`text-lg font-semibold ${primaryDarkText} mb-4`}>Contactgegevens</h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="firstName" className={`text-sm font-medium leading-none ${primaryDarkText} text-left block`}>
            Voornaam
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleInputChange}
            required
            className={`flex h-12 w-full rounded-xl border ${primaryBorderInput} bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 ${primaryRing}`}
            placeholder="Voornaam"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="lastName" className={`text-sm font-medium leading-none ${primaryDarkText} text-left block`}>
            Achternaam
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleInputChange}
            required
            className={`flex h-12 w-full rounded-xl border ${primaryBorderInput} bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 ${primaryRing}`}
            placeholder="Achternaam"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="companyName" className={`text-sm font-medium leading-none ${primaryDarkText} text-left block`}>
          Bedrijfsnaam
        </label>
        <input
          id="companyName"
          name="companyName"
          type="text"
          value={formData.companyName}
          onChange={handleInputChange}
          required
          className={`flex h-12 w-full rounded-xl border ${primaryBorderInput} bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 ${primaryRing}`}
          placeholder="Jouw Bedrijf B.V."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="email" className={`text-sm font-medium leading-none ${primaryDarkText} text-left block`}>
            E-mailadres
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className={`flex h-12 w-full rounded-xl border ${primaryBorderInput} bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 ${primaryRing}`}
            placeholder="info@subrise.eu"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="phoneNumber" className={`text-sm font-medium leading-none ${primaryDarkText} text-left block`}>
            Telefoonnummer
          </label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
            className={`flex h-12 w-full rounded-xl border ${primaryBorderInput} bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 ${primaryRing}`}
            placeholder="06 12345678"
          />
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-4">
      <h3 className={`text-lg font-semibold ${primaryDarkText} mb-4`}>Aantal R&D-medewerkers</h3>
      <div className="space-y-2">
        {[
          { value: "1-5", label: "1-5 medewerkers" },
          { value: "6-10", label: "6-10 medewerkers" },
          { value: "11-25", label: "11-25 medewerkers" },
          { value: "26-50", label: "26-50 medewerkers" },
          { value: "50+", label: "Meer dan 50 medewerkers" }
        ].map((option) => (
          <label
            key={option.value}
            className={`flex items-center w-full rounded-xl border ${primaryBorderInput} px-4 py-3 cursor-pointer transition-colors ${
              formData.rdEmployees === option.value
                ? `${primaryBgLight} ${primaryText} border-2`
                : "bg-white hover:bg-gray-50"
            }`}
            onClick={() => handleRdEmployeesChange(option.value)}
          >
            <input
              type="radio"
              name="rdEmployees"
              value={option.value}
              checked={formData.rdEmployees === option.value}
              onChange={() => {}}
              className="sr-only"
            />
            <span className="flex-grow text-sm">{option.label}</span>
            {formData.rdEmployees === option.value && (
              <span className={`${primaryText}`}>
                {renderCheckIcon()}
              </span>
            )}
          </label>
        ))}
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-4">
      <h3 className={`text-lg font-semibold ${primaryDarkText} mb-4`}>Vragen of opmerkingen</h3>
      <p className="text-sm text-left text-gray-600 mb-2">
        Wil je ons nog iets vertellen bij de verwerking van jouw aanvraag? Laat het ons hier weten.
      </p>
      <div className="space-y-2">
        <textarea
          id="comments"
          name="comments"
          value={formData.comments}
          onChange={handleInputChange}
          rows={4}
          className={`flex w-full rounded-xl border ${primaryBorderInput} bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 ${primaryRing}`}
          placeholder="Laat hier je vragen of opmerkingen achter..."
        />
      </div>
    </div>
  )

  return (
    <div className="w-full max-w-2xl space-y-4 mt-6">
      <div className={`bg-white p-8 rounded-3xl shadow-lg border ${primaryBorder}`}>
        {currentStep === "complete" ? (
          renderThankYou()
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-8  text-left">
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}

              {currentStep !== 2 && (
                <button
                  type="submit"
                  className={`w-full ${primaryBg} hover:${primaryHoverBg} text-white rounded-xl h-12 mt-6 flex items-center justify-center`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Bezig met verzenden...
                    </>
                  ) : (
                    <>
                      {currentStep === 3 ? "Aanmelding afronden" : "Aanmelden voor wachtlijst"}{" "}
                      {currentStep === 3 && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="ml-2 h-4 w-4"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                      )}
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  )
} 