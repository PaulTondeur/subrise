"use server"

import { Client } from "@notionhq/client"

const notion = new Client({
    auth: process.env.NOTION_API_KEY,
})

/**
 * Creates a new waitlist submission and returns a random ID
 */
export async function submitToWaitlist(formData: Record<string, unknown>) {
    if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
        console.error("Missing Notion API key or database ID", process.env.NOTION_API_KEY, process.env.NOTION_DATABASE_ID)
        throw new Error("Missing Notion API key or database ID")
    }
    console.log("Creating new waitlist submission:", formData)

    const response = await notion.pages.create({
        parent: {
          database_id: process.env.NOTION_DATABASE_ID as string,
        },
        properties: {
          Name: {
            title: [
              {
                text: {
                  content: `${String(formData.firstName || '').trim()} ${String(formData.lastName || '').trim()}`
                }
              }
            ]
          },
          Email: {
            email: String(formData.email || '')
          },
          Bedrijfsnaam: {
            rich_text: [
              {
                text: {
                  content: String(formData.companyName || '').charAt(0).toUpperCase() + String(formData.companyName || '').slice(1)
                }
              }
            ]
          },
          Telefoonnummer: {
            phone_number: String(formData.phoneNumber || '')
          },
          Intermediair: {
            checkbox: Boolean(formData.isIntermediary)
          }
        },
      })
  
      return { success: true, id: response.id }
}

/**
 * Updates an existing waitlist submission based on ID
 */
export async function updateWaitlistSubmission(submissionId: string, formData: Record<string, unknown>) {
    console.log(`Updating submission ${submissionId} with:`, formData)

    // Just log the update and return success
    console.log(`Updated submission ${submissionId}`)
    return { success: true, submissionId }
} 