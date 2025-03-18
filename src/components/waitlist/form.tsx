"use client"

import type React from "react"
import { useState, useEffect } from "react"
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
  numberOfClients?: string
  servicesOffered?: string[]
  expertiseAreas?: string[]
  rdFocus?: string
  innovationStage?: string
  projectTimeline?: string
}

interface WaitlistFormProps {
  isIntermediary?: boolean
}

type FormStep = 
  | "contact" 
  | "clients"      // For intermediaries
  | "services"     // For intermediaries
  | "sectors"      // For intermediaries
  | "rd_employees" // For entrepreneurs
  | "rd_focus"     // For entrepreneurs
  | "innovation"   // For entrepreneurs
  | "timeline"     // For entrepreneurs
  | "comments" 
  | "complete"

export function WaitlistForm({ isIntermediary = false }: WaitlistFormProps) {
  const [currentStep, setCurrentStep] = useState<FormStep>("contact")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionId, setSubmissionId] = useState<string | null>(null)
  const [submittedData, setSubmittedData] = useState<Partial<FormData>>({})
  const [pendingUpdates, setPendingUpdates] = useState<Array<{
    id?: string,
    data: Partial<FormData>,
    nextStep?: FormStep
  }>>([])
  const [isFinalSubmitting, setIsFinalSubmitting] = useState(false)
  
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    phoneNumber: "",
    rdEmployees: "",
    comments: "",
    isIntermediary,
    numberOfClients: "",
    servicesOffered: [],
    expertiseAreas: [],
    rdFocus: "",
    innovationStage: "",
    projectTimeline: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Check if current step data has changed from submitted data and has actual values
  const hasStepDataChanged = () => {
    if (currentStep === "contact") {
      return !submissionId || 
        (formData.firstName && formData.firstName !== submittedData.firstName) ||
        (formData.lastName && formData.lastName !== submittedData.lastName) ||
        (formData.email && formData.email !== submittedData.email) ||
        (formData.companyName && formData.companyName !== submittedData.companyName) ||
        (formData.phoneNumber && formData.phoneNumber !== submittedData.phoneNumber)
    } else if (currentStep === "clients" && isIntermediary) {
      return formData.numberOfClients && formData.numberOfClients !== submittedData.numberOfClients
    } else if (currentStep === "services" && isIntermediary) {
      return formData.servicesOffered?.length && 
        JSON.stringify(formData.servicesOffered) !== JSON.stringify(submittedData.servicesOffered)
    } else if (currentStep === "sectors" && isIntermediary) {
      return formData.expertiseAreas?.length && 
        JSON.stringify(formData.expertiseAreas) !== JSON.stringify(submittedData.expertiseAreas)
    } else if (currentStep === "rd_employees" && !isIntermediary) {
      return formData.rdEmployees && formData.rdEmployees !== submittedData.rdEmployees
    } else if (currentStep === "rd_focus" && !isIntermediary) {
      return formData.rdFocus && formData.rdFocus !== submittedData.rdFocus
    } else if (currentStep === "innovation" && !isIntermediary) {
      return formData.innovationStage && formData.innovationStage !== submittedData.innovationStage
    } else if (currentStep === "timeline" && !isIntermediary) {
      return formData.projectTimeline && formData.projectTimeline !== submittedData.projectTimeline
    } else if (currentStep === "comments") {
      return formData.comments && formData.comments !== submittedData.comments
    }
    return false
  }

  // Determine the next step based on current step and whether user is intermediary
  const getNextStep = (current: FormStep): FormStep => {
    switch(current) {
      case "contact":
        return isIntermediary ? "clients" : "rd_employees"
      case "clients":
        return "services"
      case "services":
        return "sectors"
      case "sectors":
      case "rd_employees":
        return isIntermediary ? "comments" : "rd_focus"
      case "rd_focus":
        return "innovation"
      case "innovation":
        return "timeline"
      case "timeline":
        return "comments"
      case "comments":
        return "complete"
      default:
        return "complete"
    }
  }

  // Remove empty values from data before submission
  const getCleanDataToSubmit = (dirtyData: Partial<FormData>): Partial<FormData> => {
    const result: Partial<FormData> = {};
    
    // Process non-empty values only
    if (dirtyData.firstName?.trim()) result.firstName = dirtyData.firstName;
    if (dirtyData.lastName?.trim()) result.lastName = dirtyData.lastName;
    if (dirtyData.email?.trim()) result.email = dirtyData.email;
    if (dirtyData.companyName?.trim()) result.companyName = dirtyData.companyName;
    if (dirtyData.phoneNumber?.trim()) result.phoneNumber = dirtyData.phoneNumber;
    if (dirtyData.rdEmployees?.trim()) result.rdEmployees = dirtyData.rdEmployees;
    if (dirtyData.comments?.trim()) result.comments = dirtyData.comments;
    if (dirtyData.numberOfClients?.trim()) result.numberOfClients = dirtyData.numberOfClients;
    if (dirtyData.rdFocus?.trim()) result.rdFocus = dirtyData.rdFocus;
    if (dirtyData.innovationStage?.trim()) result.innovationStage = dirtyData.innovationStage;
    if (dirtyData.projectTimeline?.trim()) result.projectTimeline = dirtyData.projectTimeline;
    
    if (dirtyData.servicesOffered?.length) result.servicesOffered = dirtyData.servicesOffered;
    if (dirtyData.expertiseAreas?.length) result.expertiseAreas = dirtyData.expertiseAreas;
    
    if (dirtyData.isIntermediary !== undefined) result.isIntermediary = dirtyData.isIntermediary;
    
    return result;
  }

  // Process the pending update queue
  const processPendingUpdates = async () => {
    if (isSubmitting || pendingUpdates.length === 0) return
    
    setIsSubmitting(true)
    
    try {
      const update = pendingUpdates[0]
      const cleanData = getCleanDataToSubmit(update.data)
      
      if (Object.keys(cleanData).length === 0) {
        // Skip empty updates
        setPendingUpdates(prev => prev.slice(1))
        setIsSubmitting(false)
        return
      }
      
      if (submissionId) {
        // Update existing submission
        await updateWaitlistSubmission(submissionId, formData.email, cleanData)
        setSubmittedData(prev => ({ ...prev, ...cleanData }))
      } else if (update.data.firstName && update.data.lastName && update.data.email) {
        // Create new submission (must have required fields)
        const result = await submitToWaitlist(cleanData)
        setSubmissionId(result.id)
        setSubmittedData(cleanData)
      }
      
      // Remove processed update from queue
      setPendingUpdates(prev => prev.slice(1))
    } catch (error) {
      console.error("Error processing form updates:", error)
      // Keep the update in the queue to retry
    } finally {
      setIsSubmitting(false)
    }
  }

  // Queue an update for backend processing
  const queueUpdate = (data: Partial<FormData>, nextStep?: FormStep) => {
    const cleanData = getCleanDataToSubmit(data)
    
    if (Object.keys(cleanData).length > 0) {
      setPendingUpdates(prev => [...prev, { data: cleanData, nextStep }])
    }
  }

  // Handle submission of a specific step (optimistic UI approach)
  const handleStepSubmit = (nextStep?: FormStep, additionalData?: Partial<FormData>) => {
    const dataToSubmit = {
      ...formData,
      ...additionalData
    }
    
    // Queue the update for background processing
    queueUpdate(dataToSubmit, nextStep)
    
    // Optimistically update UI immediately
    if (nextStep) {
      setCurrentStep(nextStep)
    } else {
      setCurrentStep(getNextStep(currentStep))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (currentStep === "contact") {
      // Validate required fields for contact step
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.companyName) {
        alert("Vul alle verplichte velden in.")
        return
      }
      
      handleStepSubmit()
    } else if (currentStep === "comments") {
      setIsFinalSubmitting(true)
      handleStepSubmit("complete")
      
      // Direct submission for final step to ensure completion before showing thank you
      const cleanData = getCleanDataToSubmit({...formData, comments: formData.comments})
      try {
        if (submissionId) {
          await updateWaitlistSubmission(submissionId, formData.email, cleanData)
        }
        // After successful submission, move to thank you
        setCurrentStep("complete")
      } catch (error) {
        console.error("Error finalizing form submission:", error)
        alert("Er is een fout opgetreden. Probeer het later opnieuw.")
      } finally {
        setIsFinalSubmitting(false)
      }
    }
  }

  // Handle radio button change with optimistic UI
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>, nextStep?: FormStep) => {
    const { name, value } = e.target
    
    // Update local form data first (optimistic UI)
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Queue the update for processing
    const dataToSubmit = { [name]: value }
    handleStepSubmit(nextStep, dataToSubmit)
  }

  // Special handler for multiselect options with optimistic UI
  const handleMultiSelect = (name: keyof FormData, value: string) => {
    setFormData(prev => {
      const currentValues = prev[name] as string[] || []
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value]
      
      return { ...prev, [name]: newValues }
    })
  }

  // Process pending updates whenever queue changes or submission state changes
  useEffect(() => {
    if (!isSubmitting && pendingUpdates.length > 0) {
      processPendingUpdates()
    }
  }, [pendingUpdates, isSubmitting, submissionId])

  // Auto-submit after certain steps with changed data
  useEffect(() => {
    const autoSubmitSteps: FormStep[] = [
      "rd_employees", "rd_focus", "innovation", "timeline",
      "clients"
    ]
    
    if (autoSubmitSteps.includes(currentStep) && hasStepDataChanged()) {
      // We use a small timeout to allow UI to update first
      const timer = setTimeout(() => {
        handleStepSubmit()
      }, 300)
      
      return () => clearTimeout(timer)
    }
  }, [formData, currentStep])

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

  const renderContactStep = () => (
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

  const renderClientsStep = () => (
    <div className="space-y-6">
      <h3 className={`text-lg font-semibold ${primaryDarkText} mb-4`}>
        Hoeveel klanten begeleidt u bij WBSO?
      </h3>
      <div className="space-y-2">
        {[
          { value: "1-5", label: "1-5 klanten" },
          { value: "6-15", label: "6-15 klanten" },
          { value: "16-30", label: "16-30 klanten" },
          { value: "31-50", label: "31-50 klanten" },
          { value: "50+", label: "Meer dan 50 klanten" }
        ].map((option) => (
          <label
            key={option.value}
            className={`flex items-center w-full rounded-xl border ${primaryBorderInput} px-4 py-3 cursor-pointer transition-colors ${
              formData.numberOfClients === option.value
                ? `${primaryBgLight} ${primaryText} border`
                : "bg-white hover:bg-gray-50"
            }`}
          >
            <input
              type="radio"
              name="numberOfClients"
              value={option.value}
              checked={formData.numberOfClients === option.value}
              onChange={(e) => handleRadioChange(e, "services")}
              className="sr-only"
            />
            <span className="flex-grow text-sm">{option.label}</span>
            {formData.numberOfClients === option.value && (
              <span className={`${primaryText}`}>
                {renderCheckIcon()}
              </span>
            )}
          </label>
        ))}
      </div>
    </div>
  )

  const renderServicesStep = () => (
    <div className="space-y-6">
      <h3 className={`text-lg font-semibold ${primaryDarkText} mb-4`}>
        Welke diensten biedt u aan?
      </h3>
      <div className="space-y-2">
        {[
          { value: "wbso-aanvragen", label: "WBSO-aanvragen" },
          { value: "innovatiebox", label: "Innovatiebox" },
          { value: "fiscaal-advies", label: "Fiscaal advies" },
          { value: "innovatie-advies", label: "Innovatie advies" },
          { value: "overige-subsidies", label: "Overige subsidies" }
        ].map((option) => (
          <label
            key={option.value}
            className={`flex items-center w-full rounded-xl border ${primaryBorderInput} px-4 py-3 cursor-pointer transition-colors ${
              formData.servicesOffered?.includes(option.value)
                ? `${primaryBgLight} border ${primaryText}`
                : "bg-white hover:bg-gray-50"
            }`}
          >
            <div className={`flex h-5 w-5 items-center justify-center rounded border ${
              formData.servicesOffered?.includes(option.value)
                ? `${primaryText} border ${primaryBorderInput}`
                : "border-gray-300"
            }`}>
              {formData.servicesOffered?.includes(option.value) && (
                <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <input
              type="checkbox"
              name="servicesOffered"
              value={option.value}
              checked={formData.servicesOffered?.includes(option.value)}
              onChange={() => handleMultiSelect('servicesOffered', option.value)}
              className="sr-only"
            />
            <span className="ml-3 flex-grow text-sm">{option.label}</span>
          </label>
        ))}
      </div>
      <button
        type="button"
        onClick={() => handleStepSubmit("sectors", { servicesOffered: formData.servicesOffered })}
        disabled={!formData.servicesOffered?.length}
        className={`w-full ${primaryBg} hover:${primaryHoverBg} text-white rounded-xl h-12 mt-6 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        Volgende
      </button>
    </div>
  )

  const renderSectorsStep = () => (
    <div className="space-y-6">
      <h3 className={`text-lg font-semibold ${primaryDarkText} mb-4`}>
        In welke sectoren heeft u expertise?
      </h3>
      <div className="space-y-2">
        {[
          { value: "software-it", label: "Software & IT" },
          { value: "maakindustrie", label: "Maakindustrie" },
          { value: "agri-food", label: "Agri & Food" },
          { value: "health-life-sciences", label: "Health & Life Sciences" },
          { value: "energy-sustainability", label: "Energie & Duurzaamheid" },
          { value: "chemistry-materials", label: "Chemie & Materialen" }
        ].map((option) => (
          <label
            key={option.value}
            className={`flex items-center w-full rounded-xl border ${primaryBorderInput} px-4 py-3 cursor-pointer transition-colors ${
              formData.expertiseAreas?.includes(option.value)
                ? `${primaryBgLight} border ${primaryText}`
                : "bg-white hover:bg-gray-50"
            }`}
          >
            <div className={`flex h-5 w-5 items-center justify-center rounded border ${
              formData.expertiseAreas?.includes(option.value)
                ? `${primaryText} border ${primaryBorderInput}`
                : "border-gray-300"
            }`}>
              {formData.expertiseAreas?.includes(option.value) && (
                <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <input
              type="checkbox"
              name="expertiseAreas"
              value={option.value}
              checked={formData.expertiseAreas?.includes(option.value)}
              onChange={() => handleMultiSelect('expertiseAreas', option.value)}
              className="sr-only"
            />
            <span className="ml-3 flex-grow text-sm">{option.label}</span>
          </label>
        ))}
      </div>
      <button
        type="button"
        onClick={() => handleStepSubmit("comments", { expertiseAreas: formData.expertiseAreas })}
        disabled={!formData.expertiseAreas?.length}
        className={`w-full ${primaryBg} hover:${primaryHoverBg} text-white rounded-xl h-12 mt-6 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        Volgende
      </button>
    </div>
  )

  const renderRdEmployeesStep = () => (
    <div className="space-y-6">
      <h3 className={`text-lg font-semibold ${primaryDarkText} mb-4`}>
        Hoeveel R&D-medewerkers heeft uw bedrijf?
      </h3>
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
                ? `${primaryBgLight} ${primaryText} border`
                : "bg-white hover:bg-gray-50"
            }`}
          >
            <input
              type="radio"
              name="rdEmployees"
              value={option.value}
              checked={formData.rdEmployees === option.value}
              onChange={(e) => handleRadioChange(e, "rd_focus")}
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

  const renderRdFocusStep = () => (
    <div className="space-y-6">
      <h3 className={`text-lg font-semibold ${primaryDarkText} mb-4`}>
        Wat is de primaire focus van uw R&D activiteiten?
      </h3>
      <div className="space-y-2">
        {[
          { value: "software-development", label: "Software ontwikkeling" },
          { value: "hardware-development", label: "Hardware ontwikkeling" },
          { value: "process-innovation", label: "Proces innovatie" },
          { value: "product-innovation", label: "Product innovatie" },
          { value: "scientific-research", label: "Wetenschappelijk onderzoek" }
        ].map((option) => (
          <label
            key={option.value}
            className={`flex items-center w-full rounded-xl border ${primaryBorderInput} px-4 py-3 cursor-pointer transition-colors ${
              formData.rdFocus === option.value
                ? `${primaryBgLight} ${primaryText} border`
                : "bg-white hover:bg-gray-50"
            }`}
          >
            <input
              type="radio"
              name="rdFocus"
              value={option.value}
              checked={formData.rdFocus === option.value}
              onChange={(e) => handleRadioChange(e, "innovation")}
              className="sr-only"
            />
            <span className="flex-grow text-sm">{option.label}</span>
            {formData.rdFocus === option.value && (
              <span className={`${primaryText}`}>
                {renderCheckIcon()}
              </span>
            )}
          </label>
        ))}
      </div>
    </div>
  )

  const renderInnovationStep = () => (
    <div className="space-y-6">
      <h3 className={`text-lg font-semibold ${primaryDarkText} mb-4`}>
        In welke fase bevindt uw innovatie zich?
      </h3>
      <div className="space-y-2">
        {[
          { value: "idea-phase", label: "Idee fase" },
          { value: "concept-development", label: "Concept ontwikkeling" },
          { value: "prototype-phase", label: "Prototype fase" },
          { value: "testing-validation", label: "Test & Validatie" },
          { value: "market-introduction", label: "Marktintroductie" }
        ].map((option) => (
          <label
            key={option.value}
            className={`flex items-center w-full rounded-xl border ${primaryBorderInput} px-4 py-3 cursor-pointer transition-colors ${
              formData.innovationStage === option.value
                ? `${primaryBgLight} ${primaryText} border`
                : "bg-white hover:bg-gray-50"
            }`}
          >
            <input
              type="radio"
              name="innovationStage"
              value={option.value}
              checked={formData.innovationStage === option.value}
              onChange={(e) => handleRadioChange(e, "timeline")}
              className="sr-only"
            />
            <span className="flex-grow text-sm">{option.label}</span>
            {formData.innovationStage === option.value && (
              <span className={`${primaryText}`}>
                {renderCheckIcon()}
              </span>
            )}
          </label>
        ))}
      </div>
    </div>
  )

  const renderTimelineStep = () => (
    <div className="space-y-6">
      <h3 className={`text-lg font-semibold ${primaryDarkText} mb-4`}>
        Wat is de verwachte duur van uw project?
      </h3>
      <div className="space-y-2">
        {[
          { value: "0-6", label: "0-6 maanden" },
          { value: "6-12", label: "6-12 maanden" },
          { value: "12-24", label: "1-2 jaar" },
          { value: "24+", label: "Meer dan 2 jaar" }
        ].map((option) => (
          <label
            key={option.value}
            className={`flex items-center w-full rounded-xl border ${primaryBorderInput} px-4 py-3 cursor-pointer transition-colors ${
              formData.projectTimeline === option.value
                ? `${primaryBgLight} ${primaryText} border`
                : "bg-white hover:bg-gray-50"
            }`}
          >
            <input
              type="radio"
              name="projectTimeline"
              value={option.value}
              checked={formData.projectTimeline === option.value}
              onChange={(e) => handleRadioChange(e, "comments")}
              className="sr-only"
            />
            <span className="flex-grow text-sm">{option.label}</span>
            {formData.projectTimeline === option.value && (
              <span className={`${primaryText}`}>
                {renderCheckIcon()}
              </span>
            )}
          </label>
        ))}
      </div>
    </div>
  )

  const renderCommentsStep = () => (
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
            <div className="space-y-8 text-left">
              {currentStep === "contact" && renderContactStep()}
              {currentStep === "clients" && isIntermediary && renderClientsStep()}
              {currentStep === "services" && isIntermediary && renderServicesStep()}
              {currentStep === "sectors" && isIntermediary && renderSectorsStep()}
              {currentStep === "rd_employees" && !isIntermediary && renderRdEmployeesStep()}
              {currentStep === "rd_focus" && !isIntermediary && renderRdFocusStep()}
              {currentStep === "innovation" && !isIntermediary && renderInnovationStep()}
              {currentStep === "timeline" && !isIntermediary && renderTimelineStep()}
              {currentStep === "comments" && renderCommentsStep()}

              {/* Only show submit button for contact and comments steps */}
              {(currentStep === "contact" || currentStep === "comments") && (
                <button
                  type="submit"
                  className={`w-full ${primaryBg} hover:${primaryHoverBg} text-white rounded-xl h-12 mt-6 flex items-center justify-center`}
                  disabled={currentStep === "contact" ? isSubmitting : isFinalSubmitting}
                >
                  {(currentStep === "contact" && isSubmitting) || (currentStep === "comments" && isFinalSubmitting) ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Bezig met verzenden...
                    </>
                  ) : (
                    <>
                      {currentStep === "comments" ? "Aanmelding afronden" : "Volgende"}{" "}
                      {currentStep === "comments" && (
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