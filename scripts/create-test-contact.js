#!/usr/bin/env node

require("dotenv").config({ path: ".env.local" });
const { Client } = require("@notionhq/client");

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const DATABASE_ID = process.env.NOTION_DATABASE_ID;

// Verwijder streepjes als die er per ongeluk in zitten
function cleanDatabaseId(id) {
  if (!id) return id;
  return id.replace(/-/g, "");
}

const CLEAN_DATABASE_ID = cleanDatabaseId(DATABASE_ID);

if (!NOTION_API_KEY || !CLEAN_DATABASE_ID) {
  console.error(
    "\x1b[31mFout: NOTION_API_KEY of NOTION_DATABASE_ID ontbreekt in je .env.local bestand.\x1b[0m"
  );
  process.exit(1);
}

const notion = new Client({
  auth: NOTION_API_KEY,
});

async function createTestContact() {
  console.log("\x1b[34m▶ Een compleet testcontact aanmaken in Notion...\x1b[0m");

  try {
    // Huidige datum voor het "Aangemeld op" veld
    const now = new Date();
    const dateString = now.toISOString().split("T")[0]; // YYYY-MM-DD formaat

    // Creëer testcontact met alle velden gevuld
    const response = await notion.pages.create({
      parent: {
        database_id: CLEAN_DATABASE_ID,
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: "Testbedrijf Complete Demo",
              },
            },
          ],
        },
        Email: {
          email: "info@innovatieve-tech.nl",
        },
        Bedrijfsnaam: {
          rich_text: [
            {
              text: {
                content: "Innovatieve Technologie B.V.",
              },
            },
          ],
        },
        Telefoonnummer: {
          phone_number: "020-1234567",
        },
        Opmerkingen: {
          rich_text: [
            {
              text: {
                content:
                  "Dit is een testcontact aangemaakt via het script. We zijn geïnteresseerd in advies over de WBSO-subsidie voor ons nieuwe AI-project. Graag contact opnemen voor verdere details.",
              },
            },
          ],
        },
        "R&D Medewerkers": {
          select: {
            name: "11-25",
          },
        },
        Intermediair: {
          checkbox: true,
        },
        "Aangemeld op": {
          date: {
            start: dateString,
          },
        },
      },
    });

    console.log("\x1b[32m✓ Testcontact succesvol aangemaakt!\x1b[0m");
    console.log("\x1b[33mPage ID:", response.id, "\x1b[0m");
    console.log("\n\x1b[32m✅ Bekijk het nieuwe contact in je Notion database.\x1b[0m");
    console.log("\x1b[36mAlle velden zijn gevuld met testgegevens:\x1b[0m");
    console.log("\x1b[36m  • Naam: Testbedrijf Complete Demo\x1b[0m");
    console.log("\x1b[36m  • Bedrijfsnaam: Innovatieve Technologie B.V.\x1b[0m");
    console.log("\x1b[36m  • Telefoonnummer: 020-1234567\x1b[0m");
    console.log("\x1b[36m  • R&D Medewerkers: 11-25\x1b[0m");
    console.log("\x1b[36m  • Opmerkingen: Details over WBSO-subsidie...\x1b[0m");
    console.log("\x1b[36m  • Intermediair: Ja (aangevinkt)\x1b[0m");
    console.log("\x1b[36m  • Aangemeld op: " + dateString + " (vandaag)\x1b[0m");
  } catch (error) {
    console.error("\x1b[31mFout bij het aanmaken van het testcontact:\x1b[0m", error.message);

    if (error.code === "validation_error") {
      console.error(
        "\x1b[33mEr is een probleem met de velden. Controleer of alle veldnamen correct zijn in je Notion database.\x1b[0m"
      );
      console.error("Details:", JSON.stringify(error.body || {}, null, 2));
    }

    process.exit(1);
  }
}

createTestContact();
