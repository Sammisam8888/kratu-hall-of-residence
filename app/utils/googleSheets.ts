import { google } from "googleapis";

export type EventData = {
  id: string; // Unique ID (e.g., UUID or timestamp) generated on creation
  title: string;
  date: string; // ISO string ideally, but kept as string for flexibility
  description: string;
  photoUrl: string;
  createdAt: string; 
};

export type AnnouncementData = {
  id: string;
  title: string;
  date: string; // Used for "Date Posted" or event date
  description: string;
  photoUrl: string;       // Optional
  attachmentUrl: string;  // Optional PDF link
  link: string;           // Optional external link
  createdAt: string;
};

// Replace literal \n in string from .env so the private key is formatted correctly
const privateKey = (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n");

// Configure the JWT auth client
export const auth = new google.auth.JWT({
  email: process.env.GOOGLE_CLIENT_EMAIL,
  key: privateKey,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export const sheets = google.sheets({ version: "v4", auth });

// The ID of the Google Sheet, extracted from its URL
const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const ANNOUNCEMENTS_SHEET_ID = process.env.GOOGLE_ANNOUNCEMENTS_SHEET_ID;
// The tab name within the sheet
const SHEET_NAME = "Sheet1";
const RANGE = `${SHEET_NAME}!A:F`; // Columns A to F for our 6 properties
const ANNOUNCEMENTS_RANGE = `${SHEET_NAME}!A:H`; // Columns A to H for our 8 properties

/**
 * Ensures the Google Sheet has the correct header row.
 * Runs silently. If it fails, we ignore it (header might already exist).
 */
export async function initializeSheet() {
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A1:F1`,
    });

    if (!res.data.values || res.data.values.length === 0) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: SHEET_ID,
        range: `${SHEET_NAME}!A1:F1`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [["ID", "Title", "Date", "Description", "PhotoUrl", "CreatedAt"]],
        },
      });
    }

    // Initialize Announcements Sheet Headers
    try {
       const resAnn = await sheets.spreadsheets.values.get({
         spreadsheetId: ANNOUNCEMENTS_SHEET_ID,
         range: `${SHEET_NAME}!A1:H1`,
       });
       if (!resAnn.data.values || resAnn.data.values.length === 0) {
          await sheets.spreadsheets.values.update({
             spreadsheetId: ANNOUNCEMENTS_SHEET_ID,
             range: `${SHEET_NAME}!A1:H1`,
             valueInputOption: "USER_ENTERED",
             requestBody: {
               values: [["ID", "Title", "Date", "Description", "PhotoUrl", "AttachmentUrl", "Link", "CreatedAt"]],
             },
          });
       }
    } catch (e) {
       console.warn("Could not initialize announcements sheet headers.");
    }
  } catch (error) {
    console.warn("Could not initialize sheet headers. They might already exist or sheet is inaccessible.", error);
  }
}

/**
 * Fetch all events from the Google Sheet.
 * Ignores the first header row.
 */
export async function getEvents(): Promise<EventData[]> {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: RANGE,
    });

    const rows = response.data.values;
    if (!rows || rows.length <= 1) return []; // No data except header

    // Map rows array (excluding header) to EventData objects
    return rows.slice(1).map((row) => ({
      id: row[0] || "",
      title: row[1] || "",
      date: row[2] || "",
      description: row[3] || "",
      photoUrl: row[4] || "",
      createdAt: row[5] || "",
    })).reverse(); // Return newest events first
  } catch (error) {
    console.error("Error fetching events:", error);
    throw new Error("Failed to fetch events from Google Sheets.");
  }
}

/**
 * Fetch a single event by ID.
 */
export async function getEventById(id: string): Promise<EventData | null> {
  const events = await getEvents();
  return events.find(event => event.id === id) || null;
}

/**
 * Add a new event to the Google Sheet.
 */
export async function createEvent(event: Omit<EventData, "id" | "createdAt">): Promise<boolean> {
  try {
    const newEvent: EventData = {
      id: Date.now().toString(), // Simple unique ID
      ...event,
      createdAt: new Date().toISOString(),
    };

    const row = [
      newEvent.id,
      newEvent.title,
      newEvent.date,
      newEvent.description,
      newEvent.photoUrl,
      newEvent.createdAt,
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: RANGE,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [row],
      },
    });

    return true;
  } catch (error) {
    console.error("Error creating event:", error);
    throw new Error("Failed to create event in Google Sheets.");
  }
}

/**
 * Update an existing event in the Google Sheet.
 */
export async function updateEvent(id: string, updatedFields: Partial<Omit<EventData, "id" | "createdAt">>): Promise<boolean> {
  try {
    // 1. Get all data to find the row index
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: RANGE,
    });

    const rows = response.data.values;
    if (!rows) return false;

    // 2. Find row index (0-indexed array, but sheet rows are 1-indexed)
    // Add +1 because Google Sheets is 1-indexed. e.g., if it's the 1st data row (index 1 in array), it's row 2 in Sheets.
    const rowIndex = rows.findIndex(row => row[0] === id);
    if (rowIndex === -1) return false;

    const sheetRowNumber = rowIndex + 1;
    const existingRow = rows[rowIndex];

    // 3. Construct updated row
    const updatedRow = [
      existingRow[0], // ID stays the same
      updatedFields.title !== undefined ? updatedFields.title : existingRow[1],
      updatedFields.date !== undefined ? updatedFields.date : existingRow[2],
      updatedFields.description !== undefined ? updatedFields.description : existingRow[3],
      updatedFields.photoUrl !== undefined ? updatedFields.photoUrl : existingRow[4],
      existingRow[5], // CreatedAt stays the same
    ];

    // 4. Send Update request
    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A${sheetRowNumber}:F${sheetRowNumber}`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [updatedRow],
      },
    });

    return true;
  } catch (error) {
    console.error("Error updating event:", error);
    throw new Error("Failed to update event in Google Sheets.");
  }
}

/**
 * Delete an event from the Google Sheet.
 * (Actually, we'll clear the row contents to avoid shifting IDs/Rows wildly, 
 * or we can use batchUpdate to actually delete the row dimension).
 * For simplicity and robustness, clearing is often safer if many concurrent edits happen.
 * But let's actually delete the row dimension to keep the sheet clean.
 */
export async function deleteEvent(id: string): Promise<boolean> {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: RANGE,
    });

    const rows = response.data.values;
    if (!rows) return false;

    // Find row index 
    const rowIndex = rows.findIndex(row => row[0] === id);
    if (rowIndex === -1) return false;

    // To actually delete the row dimension, we need the sheetId (numeric ID of the tab, usually 0)
    const sheetMetadata = await sheets.spreadsheets.get({ spreadsheetId: SHEET_ID });
    const sheetTabId = sheetMetadata.data.sheets?.find(s => s.properties?.title === SHEET_NAME)?.properties?.sheetId || 0;

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SHEET_ID,
      requestBody: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: sheetTabId,
                dimension: "ROWS",
                startIndex: rowIndex,     // 0-indexed, inclusive
                endIndex: rowIndex + 1,   // exclusive
              }
            }
          }
        ]
      }
    });

    return true;
  } catch (error) {
    console.error("Error deleting event:", error);
    throw new Error("Failed to delete event from Google Sheets.");
  }
}

// ==========================================
// ANNOUNCEMENTS CRUD
// ==========================================

export async function getAnnouncements(): Promise<AnnouncementData[]> {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: ANNOUNCEMENTS_SHEET_ID,
      range: ANNOUNCEMENTS_RANGE,
    });

    const rows = response.data.values;
    if (!rows || rows.length <= 1) return [];

    return rows.slice(1).map((row) => ({
      id: row[0] || "",
      title: row[1] || "",
      date: row[2] || "",
      description: row[3] || "",
      photoUrl: row[4] || "",
      attachmentUrl: row[5] || "",
      link: row[6] || "",
      createdAt: row[7] || "",
    })).reverse(); 
  } catch (error) {
    console.error("Error fetching announcements:", error);
    throw new Error("Failed to fetch announcements from Google Sheets.");
  }
}

export async function createAnnouncement(announcement: Omit<AnnouncementData, "id" | "createdAt">): Promise<boolean> {
  try {
    const newAnnouncement: AnnouncementData = {
      id: Date.now().toString(),
      ...announcement,
      createdAt: new Date().toISOString(),
    };

    const row = [
      newAnnouncement.id,
      newAnnouncement.title,
      newAnnouncement.date,
      newAnnouncement.description,
      newAnnouncement.photoUrl,
      newAnnouncement.attachmentUrl,
      newAnnouncement.link,
      newAnnouncement.createdAt,
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: ANNOUNCEMENTS_SHEET_ID,
      range: ANNOUNCEMENTS_RANGE,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [row] },
    });

    return true;
  } catch (error) {
    console.error("Error creating announcement:", error);
    throw new Error("Failed to create announcement in Google Sheets.");
  }
}

export async function updateAnnouncement(id: string, updatedFields: Partial<Omit<AnnouncementData, "id" | "createdAt">>): Promise<boolean> {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: ANNOUNCEMENTS_SHEET_ID,
      range: ANNOUNCEMENTS_RANGE,
    });

    const rows = response.data.values;
    if (!rows) return false;

    const rowIndex = rows.findIndex(row => row[0] === id);
    if (rowIndex === -1) return false;

    const sheetRowNumber = rowIndex + 1;
    const existingRow = rows[rowIndex];

    const updatedRow = [
      existingRow[0],
      updatedFields.title !== undefined ? updatedFields.title : existingRow[1],
      updatedFields.date !== undefined ? updatedFields.date : existingRow[2],
      updatedFields.description !== undefined ? updatedFields.description : existingRow[3],
      updatedFields.photoUrl !== undefined ? updatedFields.photoUrl : existingRow[4],
      updatedFields.attachmentUrl !== undefined ? updatedFields.attachmentUrl : existingRow[5],
      updatedFields.link !== undefined ? updatedFields.link : existingRow[6],
      existingRow[7],
    ];

    await sheets.spreadsheets.values.update({
      spreadsheetId: ANNOUNCEMENTS_SHEET_ID,
      range: `${SHEET_NAME}!A${sheetRowNumber}:H${sheetRowNumber}`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [updatedRow] },
    });

    return true;
  } catch (error) {
    console.error("Error updating announcement:", error);
    throw new Error("Failed to update announcement in Google Sheets.");
  }
}

export async function deleteAnnouncement(id: string): Promise<boolean> {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: ANNOUNCEMENTS_SHEET_ID,
      range: ANNOUNCEMENTS_RANGE,
    });

    const rows = response.data.values;
    if (!rows) return false;

    const rowIndex = rows.findIndex(row => row[0] === id);
    if (rowIndex === -1) return false;

    const sheetMetadata = await sheets.spreadsheets.get({ spreadsheetId: ANNOUNCEMENTS_SHEET_ID! });
    const sheetTabId = sheetMetadata.data.sheets?.find(s => s.properties?.title === SHEET_NAME)?.properties?.sheetId || 0;

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: ANNOUNCEMENTS_SHEET_ID,
      requestBody: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: sheetTabId,
                dimension: "ROWS",
                startIndex: rowIndex,
                endIndex: rowIndex + 1,
              }
            }
          }
        ]
      }
    });

    return true;
  } catch (error) {
    console.error("Error deleting announcement:", error);
    throw new Error("Failed to delete announcement from Google Sheets.");
  }
}
