"use server"

import { Client } from "@notionhq/client"
import { GetPageResponse } from "@notionhq/client/build/src/api-endpoints"
import TelegramBot from 'node-telegram-bot-api'

const notion = new Client({
    auth: process.env.NOTION_API_KEY,
})

if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
    throw new Error("Missing Telegram credentials")
}

const TELEGRAM_CHAT_ID = parseInt(process.env.TELEGRAM_CHAT_ID)
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN)

function formatTelegramMessage(formData: Record<string, unknown>, notionId: string, isUpdate = false) {
    const { Name, Bedrijfsnaam, Telefoonnummer, Intermediair, Email, ...cleanFormData } = formData
    return `${isUpdate ? '📝' : '🎉'} ${isUpdate ? 'Update van wachtlijst aanmelding' : 'Nieuwe aanmelding voor de wachtlijst'}!\n\n` +
      `👤 Naam: ${String(Name || '').trim()}}\n` +
      `📧 Email: ${String(Email || '')}\n` +
        `🏢 Bedrijf: ${String(Bedrijfsnaam || '')}\n` +
      `📱 Telefoon: ${String(Telefoonnummer || '')}\n` +
      `🤝 Intermediair: ${Boolean(Intermediair) ? 'Ja' : 'Nee'}\n\n` +
      `📝 [Bekijk in Notion](https://www.notion.so/${notionId.replace(/-/g, '')})\n\n` +
      `🔍 Metadata:\n\`\`\`\n${JSON.stringify(cleanFormData, null, 2)}\n\`\`\`\n\n`
}

/**
 * Creates a new waitlist submission and returns a random ID
 */
export async function submitToWaitlist(formData: Record<string, unknown>) {
    if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
        throw new Error("Missing Notion API key or database ID")
    }

    const notionData = {
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
          }
        },
    }

    const response = await notion.pages.create(notionData)
    
    // Stuur een bericht naar Telegram
    const message = formatTelegramMessage({
      Name: formData.firstName + ' ' + formData.lastName,
      Bedrijfsnaam: formData.companyName,
      Telefoonnummer: formData.phoneNumber,
      Intermediair: formData.isIntermediary,
      Email: formData.email
    }, response.id)
    const telegramResponse = await bot.sendMessage(TELEGRAM_CHAT_ID, message, { parse_mode: 'Markdown' })

    // Update de metadata met het Telegram message ID
    await notion.pages.update({
        page_id: response.id,
        properties: {
            telegramMessageId: {
              rich_text: [{
                text: {
                  content: telegramResponse.message_id.toString()
                }
              }]
            }
        }
    })

    return { success: true, id: response.id }
}

/**
 * Updates an existing waitlist submission based on ID and email
 */
export async function updateWaitlistSubmission(submissionId: string, email: string, formData: Record<string, unknown>) {
    if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
        throw new Error("Missing Notion API key or database ID")
    }

    const document = await notion.pages.retrieve({ page_id: submissionId }) as GetPageResponse
    
    type NotionPage = { 
        properties: { 
            Name: { title: Array<{ text: { content: string } }> },
            Bedrijfsnaam: { rich_text: Array<{ text: { content: string } }> },
            Telefoonnummer: { phone_number: string },
            Intermediair: { checkbox: boolean },
            Email: { email: string },
            Metadata: { rich_text: Array<{ text: { content: string } }> },
            telegramMessageId: { rich_text: Array<{ text: { content: string } }> }
        } 
    }
    
    const notionPage = document as unknown as NotionPage
    
    if (notionPage.properties.Email.email !== email) {
        throw new Error("Unauthorized")
    }

    const metadataContent = notionPage.properties.Metadata.rich_text?.[0]?.text?.content
    const parsedMetadata = JSON.parse(metadataContent || '{}')
    const updatedMetadata = {...parsedMetadata, ...formData}

    // Update het Telegram bericht als we een message ID hebben
    const message = formatTelegramMessage({
      ...updatedMetadata,
      Name: notionPage.properties.Name.title[0].text.content,
      Bedrijfsnaam: notionPage.properties.Bedrijfsnaam.rich_text[0].text.content,
      Telefoonnummer: notionPage.properties.Telefoonnummer.phone_number,
      Intermediair: notionPage.properties.Intermediair.checkbox,
      Email: notionPage.properties.Email.email
    }, submissionId, true)
    const existingMessageId = parseInt(notionPage.properties.telegramMessageId.rich_text?.[0]?.text?.content)

    console.log('existingMessageId', existingMessageId, notionPage.properties.Email.email, updatedMetadata)
    if (!isNaN(existingMessageId)) {
        try {
            await bot.editMessageText(message, {
                chat_id: TELEGRAM_CHAT_ID,
                message_id: existingMessageId,
                parse_mode: 'Markdown'
            })
        } catch (error) {
            console.error('Error editing Telegram message:', error)
            // Als het bewerken niet lukt (bijvoorbeeld omdat het bericht te oud is),
            // sturen we een nieuw bericht
            const telegramResponse = await bot.sendMessage(TELEGRAM_CHAT_ID, message, { parse_mode: 'Markdown' })
            updatedMetadata.telegramMessageId = telegramResponse.message_id
        }
    } else {
        // Als we geen message ID hebben, stuur een nieuw bericht
        const telegramResponse = await bot.sendMessage(TELEGRAM_CHAT_ID, message, { parse_mode: 'Markdown' })
        updatedMetadata.telegramMessageId = telegramResponse.message_id
    }

    // Update Notion met de nieuwe metadata
    await notion.pages.update({
        page_id: submissionId,
        properties: {
            Metadata: {
                rich_text: [{ text: { content: JSON.stringify(updatedMetadata, null, 2)} }]
            }
        }
    })
    
    return { success: true }
} 
