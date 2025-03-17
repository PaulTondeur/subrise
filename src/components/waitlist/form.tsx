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

// Definieer types voor de submissions
type CreateSubmission = {
  type: 'create';
  data: Omit<FormData, 'rdEmployees' | 'comments'>;
}

type UpdateSubmission = {
  type: 'update';
  data: {
    id: string;
    email: string;
    data: Partial<FormData>;
  }
}

type PendingSubmission = CreateSubmission | UpdateSubmission;

// Genereer een tijdelijke ID voor optimistic updates
const generateTempId = () => `temp_${Math.random().toString(36).substring(2, 15)}`;

export function WaitlistForm({ isIntermediary = false }: WaitlistFormProps) {
  const [currentStep, setCurrentStep] = useState<FormStep>("contact")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionId, setSubmissionId] = useState<string | null>(null)
  const [pendingSubmissions, setPendingSubmissions] = useState<PendingSubmission[]>([])
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

  // Effect om background submissions te verwerken
  useEffect(() => {
    const processPendingSubmissions = async () => {
      if (pendingSubmissions.length === 0) return;
      
      const [currentSubmission, ...remainingSubmissions] = pendingSubmissions;
      
      try {
        if (currentSubmission.type === 'create') {
          const result = await submitToWaitlist(currentSubmission.data);
          if (result.success) {
            setSubmissionId(result.id);
          }
        } else if (currentSubmission.type === 'update') {
          const { id, email, data } = currentSubmission.data;
          await updateWaitlistSubmission(id, email, data);
        }
      } catch (error) {
        console.error("Background submission failed:", error);
        // Bij een fout gaan we niet terug, we blijven op de huidige stap
      } finally {
        setPendingSubmissions(remainingSubmissions);
      }
    };
    
    processPendingSubmissions();
  }, [pendingSubmissions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Automatically proceed to next step for single-question steps when an answer is selected
    if (currentStep !== "contact" && currentStep !== "comments" && currentStep !== "services" && currentStep !== "sectors") {
      handleAutoSubmit(name, value)
    }
  }

  const handleAutoSubmit = async (name: string, value: string | string[]) => {
    try {
      setIsSubmitting(true)
      
      if (currentStep === "clients" && name === "numberOfClients" && typeof value === "string") {
        await handleStepSubmit("services", {
          numberOfClients: value,
        })
      } else if (currentStep === "services" && name === "servicesOffered" && Array.isArray(value)) {
        await handleStepSubmit("sectors", {
          servicesOffered: value,
        })
      } else if (currentStep === "sectors" && name === "expertiseAreas" && Array.isArray(value)) {
        await handleStepSubmit("comments", {
          expertiseAreas: value,
        })
      } else if (currentStep === "rd_employees" && name === "rdEmployees" && typeof value === "string") {
        await handleStepSubmit("rd_focus", {
          rdEmployees: value,
        })
      } else if (currentStep === "rd_focus" && name === "rdFocus" && typeof value === "string") {
        await handleStepSubmit("innovation", {
          rdFocus: value,
        })
      } else if (currentStep === "innovation" && name === "innovationStage" && typeof value === "string") {
        await handleStepSubmit("timeline", {
          innovationStage: value,
        })
      } else if (currentStep === "timeline" && name === "projectTimeline" && typeof value === "string") {
        await handleStepSubmit("comments", {
          projectTimeline: value,
        })
      }
    } catch (error) {
      console.error("Error handling auto submission:", error)
      alert("Er is een fout opgetreden. Probeer het later opnieuw.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleStepSubmit = async (nextStep: FormStep, data: Partial<FormData>) => {
    if (!submissionId) {
      throw new Error("No submission ID found")
    }
    
    setPendingSubmissions(prev => [...prev, { 
      type: 'update', 
      data: {
        id: submissionId,
        email: formData.email,
        data
      }
    }]);
    
    setCurrentStep(nextStep)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      if (currentStep === "contact") {
        // Create initial submission
        const tempId = generateTempId();
        setSubmissionId(tempId);
        
        const submissionData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          companyName: formData.companyName,
          phoneNumber: formData.phoneNumber,
          isIntermediary,
        };
        
        setPendingSubmissions(prev => [...prev, { 
          type: 'create', 
          data: submissionData 
        }]);
        
        setCurrentStep(isIntermediary ? "clients" : "rd_employees")
      } else if (currentStep === "comments") {
        await handleStepSubmit("complete", {
          comments: formData.comments,
        })
      }
    } catch (error) {
      console.error("Error handling form submission:", error)
      alert("Er is een fout opgetreden. Probeer het later opnieuw.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleMultiSelect = (name: keyof FormData, value: string) => {
    setFormData(prev => {
      const currentValues = prev[name] as string[] || []
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value]
      
      return { ...prev, [name]: newValues }
    })
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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