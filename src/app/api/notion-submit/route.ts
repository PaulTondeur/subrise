import { NextResponse } from 'next/server'
import { Client } from '@notionhq/client'
import { FormData } from '@/components/waitlist-form'

// Initialize the Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

const DATABASE_ID = process.env.NOTION_DATABASE_ID || ''

export async function POST(request: Request) {
  try {
    const formData: FormData = await request.json()
    
    if (!process.env.NOTION_API_KEY || !DATABASE_ID) {
      console.error('Missing Notion API key or database ID')
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    // Create a new page in the Notion database
    const response = await notion.pages.create({
      parent: {
        database_id: DATABASE_ID,
      },
      properties: {
        Naam: {
          title: [
            {
              text: {
                content: `${formData.firstName} ${formData.lastName}`,
              },
            },
          ],
        },
        Email: {
          email: formData.email,
        },
        'Bedrijfsnaam': {
          rich_text: [
            {
              text: {
                content: formData.companyName,
              },
            },
          ],
        },
        'Telefoonnummer': {
          phone_number: formData.phoneNumber,
        },
        'R&D Medewerkers': {
          select: {
            name: formData.rdEmployees,
          },
        },
        'Opmerkingen': {
          rich_text: [
            {
              text: {
                content: formData.comments || '',
              },
            },
          ],
        },
        'Intermediair': {
          checkbox: !!formData.isIntermediary,
        },
        'Aangemeld op': {
          date: {
            start: new Date().toISOString(),
          },
        },
      },
    })

    return NextResponse.json({ success: true, id: response.id })
  } catch (error) {
    console.error('Error submitting to Notion:', error)
    return NextResponse.json({ error: 'Failed to submit to Notion' }, { status: 500 })
  }
} 
