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
  comments: string
  isIntermediary?: boolean
}

interface WaitlistFormProps {
  isIntermediary?: boolean
}

export function WaitlistForm({ isIntermediary = false }: WaitlistFormProps) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send the data to your backend here
    console.log("Form submitted:", formData)
    alert("Bedankt voor je aanmelding! We nemen binnenkort contact met je op.")
  }

  // Define color variables based on isIntermediary
  const primaryBg = isIntermediary ? "bg-indigo-600" : "bg-corporate-600"
  const primaryHoverBg = isIntermediary ? "bg-indigo-700" : "bg-corporate-700"
  const primaryText = isIntermediary ? "text-indigo-600" : "text-corporate-600"
  const primaryBorder = isIntermediary ? "border-indigo-100" : "border-corporate-100"
  const primaryLightBg = isIntermediary ? "bg-indigo-100" : "bg-corporate-100"
  const primaryDarkText = isIntermediary ? "text-indigo-800" : "text-corporate-800"
  const primaryBorderInput = isIntermediary ? "border-indigo-200" : "border-corporate-200"
  const primaryRing = isIntermediary ? "focus:ring-indigo-400" : "focus:ring-corporate-400"

  return (
    <div className="w-full max-w-2xl space-y-4 mt-6">
      <div className={`bg-white p-8 rounded-3xl shadow-lg border ${primaryBorder}`}>
        <form onSubmit={handleSubmit}>
          <div className="space-y-8">
            {/* Contactgegevens */}
            <div className="space-y-4">
              <h3 className={`text-lg font-semibold ${primaryDarkText} mb-4`}>Contactgegevens</h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className={`text-sm font-medium leading-none ${primaryDarkText}`}>
                    Voornaam
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className={`flex h-12 w-full rounded-xl border ${primaryBorderInput} bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 ${primaryRing}`}
                    placeholder="Voornaam"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className={`text-sm font-medium leading-none ${primaryDarkText}`}>
                    Achternaam
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className={`flex h-12 w-full rounded-xl border ${primaryBorderInput} bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 ${primaryRing}`}
                    placeholder="Achternaam"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className={`text-sm font-medium leading-none ${primaryDarkText}`}>
                  E-mailadres
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={`flex h-12 w-full rounded-xl border ${primaryBorderInput} bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 ${primaryRing}`}
                  placeholder="info@subrise.eu"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="companyName" className={`text-sm font-medium leading-none ${primaryDarkText}`}>
                  Bedrijfsnaam
                </label>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                  className={`flex h-12 w-full rounded-xl border ${primaryBorderInput} bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 ${primaryRing}`}
                  placeholder="Jouw Bedrijf B.V."
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phoneNumber" className={`text-sm font-medium leading-none ${primaryDarkText}`}>
                  Telefoonnummer
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                  className={`flex h-12 w-full rounded-xl border ${primaryBorderInput} bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 ${primaryRing}`}
                  placeholder="06 12345678"
                />
              </div>
            </div>

            {/* R&D basisinformatie */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="rdEmployees" className={`text-sm font-medium leading-none ${primaryDarkText}`}>
                  Aantal R&D-medewerkers (WBSO)
                </label>
                <select
                  id="rdEmployees"
                  name="rdEmployees"
                  value={formData.rdEmployees}
                  onChange={handleInputChange}
                  required
                  className={`flex h-12 w-full rounded-xl border ${primaryBorderInput} bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 ${primaryRing}`}
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
                <label htmlFor="comments" className={`text-sm font-medium leading-none ${primaryDarkText}`}>
                  Vragen of opmerkingen
                </label>
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

            <button
              type="submit"
              className={`w-full ${primaryBg} hover:${primaryHoverBg} text-white rounded-xl h-12 mt-6 flex items-center justify-center`}
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
        </form>
      </div>
    </div>
  )
}

