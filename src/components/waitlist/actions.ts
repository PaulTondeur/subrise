"use server"

import { Client } from "@notionhq/client"
import { GetPageResponse } from "@notionhq/client/build/src/api-endpoints"

const notion = new Client({
    auth: process.env.NOTION_API_KEY,
})

/**
 * Creates a new waitlist submission and returns a random ID
 */
export async function submitToWaitlist(formData: Record<string, unknown>) {
    if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
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
          },
          'Aangemeld op': {
            date: {
              start: new Date().toISOString(),
            },
          },
        },
      })
  
      return { success: true, id: response.id }
}

/**
 * Updates an existing waitlist submission based on ID
 */
export async function updateWaitlistSubmission(submissionId: string, formData: Record<string, unknown>) {
    if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
        throw new Error("Missing Notion API key or database ID")
    }

    const document = await notion.pages.retrieve({ page_id: submissionId }) as GetPageResponse
    
    // Log Metadata - eenvoudiger met minder checks
    type NotionPage = { properties: { Metadata?: { rich_text: Array<{ text: { content: string } }> } } };
    const metadataContent = (document as unknown as NotionPage).properties?.Metadata?.rich_text?.[0]?.text?.content;

    const parsedMetadata = JSON.parse(metadataContent || '{}');

    await notion.pages.update({
        page_id: submissionId,
        properties: {
            Metadata: {
                rich_text: [{ text: { content: JSON.stringify({...parsedMetadata, ...formData})} }]
            }
        }
    })
    
    return { success: true }
} 