"use client"

import type React from "react"

import { useState } from "react"

interface FormData {
  firstName: string
  lastName: string
  email: string
  companyName: string
  phoneNumber: string
  rdEmployees: string
  currentWbso: string
  currentAdvisor: string
  challenges: string[]
  rdBudget: string
  interestAreas: string[]
}

export function WaitlistForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    phoneNumber: "",
    rdEmployees: "",
    currentWbso: "",
    currentAdvisor: "",
    challenges: [],
    rdBudget: "",
    interestAreas: [],
  })
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target

    setFormData((prev) => {
      if (checked) {
        return {
          ...prev,
          [name]: [...(prev[name as keyof FormData] as string[]), value],
        }
      } else {
        return {
          ...prev,
          [name]: (prev[name as keyof FormData] as string[]).filter((item) => item !== value),
        }
      }
    })
  }

  const saveFormData = (currentStep: number) => {
    // In a real application, you would send this data to your backend
    console.log(`Step ${currentStep} data saved:`, formData)

    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps((prev) => [...prev, currentStep])
    }
  }

  const handleNext = () => {
    saveFormData(step)
    setStep((prev) => prev + 1)
  }

  const handlePrevious = () => {
    setStep((prev) => prev - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    saveFormData(step)
    // Final submission
    console.log("Final form submission:", formData)
    alert("Bedankt voor je aanmelding! We nemen binnenkort contact met je op.")
  }

  return (
    <div className="w-full max-w-md space-y-4 mt-6">
      <div className="bg-white p-8 rounded-3xl shadow-lg border border-corporate-100">
        <div className="flex justify-between mb-6">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div
              key={stepNumber}
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                stepNumber === step
                  ? "bg-corporate-600 text-white"
                  : completedSteps.includes(stepNumber)
                    ? "bg-corporate-100 text-corporate-600"
                    : "bg-gray-100 text-gray-400"
              }`}
            >
              {completedSteps.includes(stepNumber) ? (
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
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              ) : (
                stepNumber
              )}
            </div>
          ))}
        </div>

        <form onSubmit={step === 4 ? handleSubmit : (e) => e.preventDefault()}>
          {/* Step 1: Basic Contact Information */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-corporate-800 mb-4">Contactgegevens</h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium leading-none text-corporate-800">
                    Voornaam
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="flex h-12 w-full rounded-xl border border-corporate-200 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-corporate-400"
                    placeholder="Voornaam"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium leading-none text-corporate-800">
                    Achternaam
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="flex h-12 w-full rounded-xl border border-corporate-200 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-corporate-400"
                    placeholder="Achternaam"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium leading-none text-corporate-800">
                  E-mailadres
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="flex h-12 w-full rounded-xl border border-corporate-200 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-corporate-400"
                  placeholder="jouw@email.nl"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="companyName" className="text-sm font-medium leading-none text-corporate-800">
                  Bedrijfsnaam
                </label>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                  className="flex h-12 w-full rounded-xl border border-corporate-200 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-corporate-400"
                  placeholder="Jouw Bedrijf B.V."
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phoneNumber" className="text-sm font-medium leading-none text-corporate-800">
                  Telefoonnummer
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                  className="flex h-12 w-full rounded-xl border border-corporate-200 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-corporate-400"
                  placeholder="06 12345678"
                />
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="w-full bg-corporate-600 hover:bg-corporate-700 text-white rounded-xl h-12 mt-4 flex items-center justify-center"
              >
                Volgende stap{" "}
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
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          )}

          {/* Step 2: R&D Information */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-corporate-800 mb-4">R&D Informatie</h3>

              <div className="space-y-2">
                <label htmlFor="rdEmployees" className="text-sm font-medium leading-none text-corporate-800">
                  Aantal R&D-medewerkers (WBSO)
                </label>
                <select
                  id="rdEmployees"
                  name="rdEmployees"
                  value={formData.rdEmployees}
                  onChange={handleInputChange}
                  required
                  className="flex h-12 w-full rounded-xl border border-corporate-200 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-corporate-400"
                >
                  <option value="" disabled>
                    Selecteer aantal
                  </option>
                  <option value="1-5">1-5 medewerkers</option>
                  <option value="6-10">6-10 medewerkers</option>
                  <option value="11-25">11-25 medewerkers</option>
                  <option value="26-50">26-50 medewerkers</option>
                  <option value="50+">Meer dan 50 medewerkers</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="currentWbso" className="text-sm font-medium leading-none text-corporate-800">
                  Huidige WBSO-status
                </label>
                <select
                  id="currentWbso"
                  name="currentWbso"
                  value={formData.currentWbso}
                  onChange={handleInputChange}
                  required
                  className="flex h-12 w-full rounded-xl border border-corporate-200 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-corporate-400"
                >
                  <option value="" disabled>
                    Selecteer status
                  </option>
                  <option value="active">Actieve WBSO-aanvraag</option>
                  <option value="planning">Van plan om aan te vragen</option>
                  <option value="expired">Verlopen WBSO-aanvraag</option>
                  <option value="never">Nooit aangevraagd</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="currentAdvisor" className="text-sm font-medium leading-none text-corporate-800">
                  Werk je nu samen met een bemiddelaar?
                </label>
                <select
                  id="currentAdvisor"
                  name="currentAdvisor"
                  value={formData.currentAdvisor}
                  onChange={handleInputChange}
                  required
                  className="flex h-12 w-full rounded-xl border border-corporate-200 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-corporate-400"
                >
                  <option value="" disabled>
                    Selecteer bemiddelaar
                  </option>
                  <option value="none">Nee, we doen alles zelf</option>
                  <option value="GrantFinder">GrantFinder</option>
                  <option value="Innovencio">Innovencio</option>
                  <option value="WBSO Experts">WBSO Experts</option>
                  <option value="Subvention">Subvention</option>
                  <option value="Fiscount">Fiscount</option>
                  <option value="Subsidiefocus">Subsidiefocus</option>
                  <option value="Anders">Anders</option>
                </select>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="w-1/2 border border-corporate-300 hover:bg-corporate-50 text-corporate-700 rounded-xl h-12 mt-4 flex items-center justify-center"
                >
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
                    className="mr-2 h-4 w-4"
                  >
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>{" "}
                  Vorige
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-1/2 bg-corporate-600 hover:bg-corporate-700 text-white rounded-xl h-12 mt-4 flex items-center justify-center"
                >
                  Volgende{" "}
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
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Challenges */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-corporate-800 mb-4">Uitdagingen</h3>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none text-corporate-800 block mb-2">
                  Welke uitdagingen ervaar je met WBSO? (meerdere opties mogelijk)
                </label>

                <div className="space-y-2">
                  {[
                    { value: "time", label: "Te tijdrovend proces" },
                    { value: "complexity", label: "Te complex om zelf te doen" },
                    { value: "costs", label: "Hoge kosten van externe adviseurs" },
                    { value: "reporting", label: "Moeite met urenregistratie en rapportage" },
                    { value: "uncertainty", label: "Onzekerheid over goedkeuring" },
                    { value: "compliance", label: "Zorgen over compliance bij controles" },
                  ].map((option) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`challenge-${option.value}`}
                        name="challenges"
                        value={option.value}
                        checked={formData.challenges.includes(option.value)}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 rounded border-corporate-300 text-corporate-600 focus:ring-corporate-500"
                      />
                      <label htmlFor={`challenge-${option.value}`} className="ml-2 text-sm text-corporate-700">
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="rdBudget" className="text-sm font-medium leading-none text-corporate-800">
                  Wat is je jaarlijkse R&D budget?
                </label>
                <select
                  id="rdBudget"
                  name="rdBudget"
                  value={formData.rdBudget}
                  onChange={handleInputChange}
                  required
                  className="flex h-12 w-full rounded-xl border border-corporate-200 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-corporate-400"
                >
                  <option value="" disabled>
                    Selecteer budget
                  </option>
                  <option value="<50k">Minder dan €50.000</option>
                  <option value="50k-100k">€50.000 - €100.000</option>
                  <option value="100k-250k">€100.000 - €250.000</option>
                  <option value="250k-500k">€250.000 - €500.000</option>
                  <option value="500k-1m">€500.000 - €1.000.000</option>
                  <option value=">1m">Meer dan €1.000.000</option>
                </select>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="w-1/2 border border-corporate-300 hover:bg-corporate-50 text-corporate-700 rounded-xl h-12 mt-4 flex items-center justify-center"
                >
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
                    className="mr-2 h-4 w-4"
                  >
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>{" "}
                  Vorige
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-1/2 bg-corporate-600 hover:bg-corporate-700 text-white rounded-xl h-12 mt-4 flex items-center justify-center"
                >
                  Volgende{" "}
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
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Interest Areas */}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-corporate-800 mb-4">Interesses</h3>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none text-corporate-800 block mb-2">
                  Welke aspecten van SubRise interesseren je het meest? (meerdere opties mogelijk)
                </label>

                <div className="space-y-2">
                  {[
                    { value: "ai-assistance", label: "AI-ondersteuning bij aanvragen" },
                    { value: "time-tracking", label: "Geïntegreerde urenregistratie" },
                    { value: "compliance", label: "Compliance-checks en rapportages" },
                    { value: "cost-saving", label: "Kostenbesparing t.o.v. adviseurs" },
                    { value: "ease-of-use", label: "Gebruiksvriendelijkheid" },
                    { value: "control", label: "Volledige controle over het proces" },
                  ].map((option) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`interest-${option.value}`}
                        name="interestAreas"
                        value={option.value}
                        checked={formData.interestAreas.includes(option.value)}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 rounded border-corporate-300 text-corporate-600 focus:ring-corporate-500"
                      />
                      <label htmlFor={`interest-${option.value}`} className="ml-2 text-sm text-corporate-700">
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="w-1/2 border border-corporate-300 hover:bg-corporate-50 text-corporate-700 rounded-xl h-12 mt-4 flex items-center justify-center"
                >
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
                    className="mr-2 h-4 w-4"
                  >
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>{" "}
                  Vorige
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-corporate-600 hover:bg-corporate-700 text-white rounded-xl h-12 mt-4 flex items-center justify-center"
                >
                  Aanmelden{" "}
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
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

