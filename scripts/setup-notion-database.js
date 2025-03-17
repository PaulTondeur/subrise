#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' });
const { Client } = require('@notionhq/client');

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const DATABASE_ID = process.env.NOTION_DATABASE_ID;

if (!NOTION_API_KEY || !DATABASE_ID) {
  console.error('\x1b[31mFout: NOTION_API_KEY of NOTION_DATABASE_ID ontbreekt in je .env.local bestand.\x1b[0m');
  process.exit(1);
}

const notion = new Client({
  auth: NOTION_API_KEY
});

async function setupNotionDatabase() {
  console.log('\x1b[34m▶ Starten met configureren van Notion database...\x1b[0m');

  try {
    // Eerst controleren of de database bestaat
    await notion.databases.retrieve({
      database_id: DATABASE_ID
    });
    
    console.log('\x1b[32m✓ Database gevonden!\x1b[0m');
    
    // Update de database met de juiste kolommen
    const response = await notion.databases.update({
      database_id: DATABASE_ID,
      properties: {
        'Naam': {
          title: {}
        },
        'Email': {
          email: {}
        },
        'Bedrijfsnaam': {
          rich_text: {}
        },
        'Telefoonnummer': {
          phone_number: {}
        },
        'R&D Medewerkers': {
          select: {
            options: [
              {
                name: '1-5',
                color: 'blue'
              },
              {
                name: '6-10',
                color: 'green'
              },
              {
                name: '11-25',
                color: 'orange'
              },
              {
                name: '26-50',
                color: 'red'
              },
              {
                name: '50+',
                color: 'purple'
              }
            ]
          }
        },
        'Opmerkingen': {
          rich_text: {}
        },
        'Intermediair': {
          checkbox: {}
        },
        'Aangemeld op': {
          date: {}
        }
      }
    });
    
    console.log('\x1b[32m✓ Database structuur succesvol bijgewerkt!\x1b[0m');
    console.log('\x1b[34mKolommen die zijn toegevoegd/bijgewerkt:\x1b[0m');
    console.log('\x1b[36m  • Naam (Titel)\x1b[0m');
    console.log('\x1b[36m  • Email (Email)\x1b[0m');
    console.log('\x1b[36m  • Bedrijfsnaam (Tekst)\x1b[0m');
    console.log('\x1b[36m  • Telefoonnummer (Telefoon)\x1b[0m');
    console.log('\x1b[36m  • R&D Medewerkers (Keuzemenu)\x1b[0m');
    console.log('\x1b[36m  • Opmerkingen (Tekst)\x1b[0m');
    console.log('\x1b[36m  • Intermediair (Checkbox)\x1b[0m');
    console.log('\x1b[36m  • Aangemeld op (Datum)\x1b[0m');
    
    console.log('\n\x1b[32m✅ Je Notion database is klaar voor gebruik met het formulier!\x1b[0m');
    console.log('\x1b[33mVergeet niet om je integratie toegang te geven tot je database (via Share/Delen knop).\x1b[0m');
    
  } catch (error) {
    console.error('\x1b[31mFout bij het configureren van de database:\x1b[0m', error.message);
    
    if (error.code === 'object_not_found') {
      console.error('\x1b[31mDe database met ID', DATABASE_ID, 'kon niet worden gevonden.\x1b[0m');
      console.error('\x1b[33mControleer of het database ID correct is en of je integratie toegang heeft tot deze database.\x1b[0m');
    }
    
    process.exit(1);
  }
}

setupNotionDatabase(); 
