import { FormData } from '@/components/waitlist-form'

export async function submitToNotion(formData: FormData) {
  try {
    const response = await fetch('/api/notion-submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error submitting to Notion:', error)
    throw error
  }
} 
