#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' });
const { Client } = require('@notionhq/client');

const NOTION_API_KEY = process.env.NOTION_API_KEY;

// We gebruiken het originele DATABASE_ID zonder formattering
const DATABASE_ID = process.env.NOTION_DATABASE_ID;

// Verwijder streepjes als die er per ongeluk in zitten
function cleanDatabaseId(id) {
  if (!id) return id;
  return id.replace(/-/g, '');
}

// Zorg dat we echt altijd de versie zonder streepjes gebruiken
const CLEAN_DATABASE_ID = cleanDatabaseId(DATABASE_ID);

// Bereid ook een versie met streepjes voor die Notion intern lijkt te gebruiken
function formatDatabaseIdWithDashes(id) {
  const clean = cleanDatabaseId(id);
  return clean.replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5');
}

const DASHED_DATABASE_ID = formatDatabaseIdWithDashes(DATABASE_ID);

if (!NOTION_API_KEY || !CLEAN_DATABASE_ID) {
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
    console.log('DATABASE_ID (voor gebruik):', CLEAN_DATABASE_ID);
    console.log('DATABASE_ID (origineel):', process.env.NOTION_DATABASE_ID);
    console.log('NOTION_API_KEY:', NOTION_API_KEY.substring(0, 15) + '...');
    
    console.log('\n\x1b[34mStap 1: Database ophalen...\x1b[0m');
    let dbInfo;
    try {
      dbInfo = await notion.databases.retrieve({
        database_id: CLEAN_DATABASE_ID
      });
      
      console.log('\x1b[32m✓ Database gevonden!\x1b[0m');
      console.log('Database titel:', dbInfo.title?.[0]?.plain_text || 'Geen titel');
      
      // Check de properties om te zien hoe de database er nu uitziet
      console.log('\n\x1b[34mHuidige database structuur:\x1b[0m');
      for (const [propertyName, propertyValue] of Object.entries(dbInfo.properties)) {
        console.log(`\x1b[36m  • ${propertyName} (${propertyValue.type})\x1b[0m`);
      }
    } catch (dbError) {
      console.error('\x1b[31mFout bij het ophalen van de database:\x1b[0m', dbError.message);
      
      if (dbError.code === 'object_not_found') {
        console.error('\x1b[31mDe database met ID', CLEAN_DATABASE_ID, 'kon niet worden gevonden.\x1b[0m');
        console.error('\x1b[33mControleer of het database ID correct is en of je integratie toegang heeft tot deze database.\x1b[0m');
      } else if (dbError.code === 'unauthorized') {
        console.error('\x1b[31mJe API key heeft geen toegang tot deze database.\x1b[0m');
        console.error('\x1b[33mZorg dat je de juiste API key gebruikt en dat de integratie toegang heeft tot de database.\x1b[0m');
      }
      
      console.error('\n\x1b[34mTips om dit op te lossen:\x1b[0m');
      console.error('\x1b[36m 1. Controleer of het database ID correct is: ' + CLEAN_DATABASE_ID);
      console.error(' 2. Ga naar https://www.notion.so/my-integrations');
      console.error(' 3. Controleer of de API key juist is: ' + NOTION_API_KEY.substring(0, 10) + '...');
      console.error(' 4. Zorg dat je integratie toegang heeft tot de database\x1b[0m');
      
      process.exit(1);
    }
    
    console.log('\n\x1b[34mStap 2: Andere API call proberen - Test pagina aanmaken...\x1b[0m');
    
    try {
      // In plaats van update, proberen we een pagina toe te voegen
      const testPage = await notion.pages.create({
        parent: {
          database_id: CLEAN_DATABASE_ID
        },
        properties: {
          // De property naam uit de database structuur gebruiken
          "Name": {
            title: [
              {
                text: {
                  content: "Test Contact (automatisch aangemaakt)"
                }
              }
            ]
          }
        }
      });
      
      console.log('\x1b[32m✓ Test pagina succesvol aangemaakt!\x1b[0m');
      console.log('\x1b[33mPage ID:', testPage.id, '\x1b[0m');
      
      console.log('\n\x1b[34mStap 3: Proberen om database structuur te updaten...\x1b[0m');
      
      try {
        // Nu proberen we de database update met beide formaten
        console.log('\x1b[33mProberen database te updaten met beide ID formaten...\x1b[0m');
        
        // Eerste poging met het ID zonder streepjes
        try {
          console.log('\x1b[36mPoging 1: ID zonder streepjes...\x1b[0m');
          const response = await notion.databases.update({
            database_id: CLEAN_DATABASE_ID,
            properties: {
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
                    }
                  ]
                }
              }
            }
          });
          
          console.log('\x1b[32m✓ Database structuur succesvol bijgewerkt met ID zonder streepjes!\x1b[0m');
          
          // Als het werkt, gaan we door met de volledige update
          await doFullDatabaseUpdate(CLEAN_DATABASE_ID);
          
        } catch (cleanIdError) {
          console.log('\x1b[33mPoging 1 mislukt, proberen met ID mét streepjes...\x1b[0m');
          
          // Tweede poging met het ID met streepjes
          try {
            console.log('\x1b[36mPoging 2: ID mét streepjes...\x1b[0m');
            const response = await notion.databases.update({
              database_id: DASHED_DATABASE_ID,
              properties: {
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
                      }
                    ]
                  }
                }
              }
            });
            
            console.log('\x1b[32m✓ Database structuur succesvol bijgewerkt met ID mét streepjes!\x1b[0m');
            
            // Als het werkt, gaan we door met de volledige update
            await doFullDatabaseUpdate(DASHED_DATABASE_ID);
            
          } catch (dashedIdError) {
            console.log('\x1b[33mPoging 2 mislukt, proberen via directe API call...\x1b[0m');
            
            // Derde poging via directe API call
            try {
              console.log('\x1b[36mPoging 3: Directe API call...\x1b[0m');
              
              // We gebruiken hier het ID van de test pagina die we hebben gemaakt
              // omdat we weten dat dit ID geldig is en de pagina bestaat in Notion
              const pageId = testPage.id;
              const parentId = testPage.parent.database_id;
              
              console.log('\x1b[36mGebruik database ID uit de test pagina:', parentId, '\x1b[0m');
              
              // Probeer de database update met dit ID
              const response = await notion.databases.update({
                database_id: parentId,
                properties: {
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
                        }
                      ]
                    }
                  }
                }
              });
              
              console.log('\x1b[32m✓ Database structuur succesvol bijgewerkt via directe API call!\x1b[0m');
              
              // Als het werkt, gaan we door met de volledige update
              await doFullDatabaseUpdate(parentId);
              
            } catch (directApiError) {
              console.error('\n\x1b[31mAlle pogingen om de database structuur te updaten zijn mislukt.\x1b[0m');
              console.error('\x1b[33mFout bij laatste poging:', directApiError.message, '\x1b[0m');
              console.error('\x1b[33mHet goede nieuws is dat je wel gegevens kunt toevoegen aan de database.\x1b[0m');
              console.error('\x1b[33mJe kunt de database structuur handmatig aanpassen in Notion zelf.\x1b[0m');
              
              console.log('\n\x1b[32m✅ Basisconnectiviteit met je Notion database werkt!\x1b[0m');
              console.log('\x1b[32m✅ Je kunt data toevoegen vanuit je formulier.\x1b[0m');
              console.log('\n\x1b[33mOm de database handmatig te configureren:\x1b[0m');
              console.log('\x1b[36m 1. Open je database in Notion');
              console.log(' 2. Klik op de drie puntjes (⋮) rechtsboven');
              console.log(' 3. Kies "Properties"');
              console.log(' 4. Voeg de gewenste velden toe met de juiste types\x1b[0m');
            }
          }
        }
        
      } catch (generalError) {
        console.error('\n\x1b[31mAlgemene fout bij het bijwerken van de database:\x1b[0m', generalError.message);
        console.error('\x1b[33mHet goede nieuws is dat je wel gegevens kunt toevoegen aan de database.\x1b[0m');
        
        console.log('\n\x1b[32m✅ Basisconnectiviteit met je Notion database werkt!\x1b[0m');
        console.log('\x1b[32m✅ Je kunt data toevoegen vanuit je formulier.\x1b[0m');
      }
        
    } catch (minimalUpdateError) {
      console.error('\n\x1b[31mFout bij het bijwerken van minimale database eigenschappen:\x1b[0m', minimalUpdateError.message);
      console.error('\x1b[33mDit is vreemd omdat we wel een pagina konden aanmaken.\x1b[0m');
      console.error('\x1b[33mDit kan komen door specifieke rechten instellingen in Notion.\x1b[0m');
    }
    
  } catch (pageError) {
    console.error('\n\x1b[31mFout bij het aanmaken van een test pagina:\x1b[0m', pageError.message);
    console.error('\x1b[33mDit suggereert dat je integratie geen schrijftoegang heeft tot de database.\x1b[0m');
    
    if (pageError.code === 'object_not_found') {
      console.error('\x1b[31mDe database kon niet worden gevonden voor het aanmaken van een pagina.\x1b[0m');
      console.error('\x1b[33mControleer of je integratie toegang heeft tot deze database.\x1b[0m');
    } else if (pageError.code === 'validation_error') {
      console.error('\x1b[31mValidatiefout bij het aanmaken van een pagina.\x1b[0m');
      console.error('\x1b[33mMogelijk komen de properties niet overeen met de database structuur.\x1b[0m');
      console.error('Details:', JSON.stringify(pageError.body || {}, null, 2));
    }
    
    console.error('\n\x1b[34mTips om dit op te lossen:\x1b[0m');
    console.error('\x1b[36m 1. Ga naar https://www.notion.so/my-integrations');
    console.error(' 2. Selecteer je integratie');
    console.error(' 3. Zorg dat "Update content" ingeschakeld is');
    console.error(' 4. Ga naar je database in Notion');
    console.error(' 5. Klik op "Share/Delen"');
    console.error(' 6. Voeg je integratie toe met "Can edit" rechten\x1b[0m');
    
    process.exit(1);
  }
}

// Helper functie voor de volledige database update
async function doFullDatabaseUpdate(dbId) {
  try {
    console.log('\n\x1b[34mVolledige database eigenschappen bijwerken...\x1b[0m');
    
    const fullResponse = await notion.databases.update({
      database_id: dbId,
      properties: {
        // Behoud de bestaande Name property
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
    console.log('\x1b[36m  • Email (Email)\x1b[0m');
    console.log('\x1b[36m  • Bedrijfsnaam (Tekst)\x1b[0m');
    console.log('\x1b[36m  • Telefoonnummer (Telefoon)\x1b[0m');
    console.log('\x1b[36m  • R&D Medewerkers (Keuzemenu)\x1b[0m');
    console.log('\x1b[36m  • Opmerkingen (Tekst)\x1b[0m');
    console.log('\x1b[36m  • Intermediair (Checkbox)\x1b[0m');
    console.log('\x1b[36m  • Aangemeld op (Datum)\x1b[0m');
    
    console.log('\n\x1b[32m✅ Je Notion database is klaar voor gebruik met het formulier!\x1b[0m');
    
  } catch (fullUpdateError) {
    console.error('\n\x1b[31mFout bij het bijwerken van de volledige database eigenschappen:\x1b[0m', fullUpdateError.message);
    console.error('\x1b[33mDit kan komen doordat sommige eigenschappen niet compatibel zijn.\x1b[0m');
    console.error('\x1b[33mHet goede nieuws is dat basisfunctionaliteit werkt. Je kunt de ontbrekende velden handmatig toevoegen.\x1b[0m');
  }
}

setupNotionDatabase(); 
