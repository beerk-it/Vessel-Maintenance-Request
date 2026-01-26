/**
 * Google Apps Script Code
 * 
 * Instructions:
 * 1. Go to https://script.google.com
 * 2. Create a new project
 * 3. Paste this code into the editor
 * 4. Replace 'YOUR_SPREADSHEET_ID' with your actual Google Sheets ID
 * 5. Save the project
 * 6. Deploy as a web app:
 *    - Click "Deploy" > "New deployment"
 *    - Select type: "Web app"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 *    - Click "Deploy"
 *    - Copy the Web App URL and paste it into script.js
 */

// Replace with your Google Sheets ID
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';
const SHEET_NAME = 'Maintenance Requests';

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Open the spreadsheet
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      // Add headers
      sheet.getRange(1, 1, 1, 12).setValues([[
        'Timestamp',
        'Vessel',
        'Engine Name',
        'Engine Type',
        'Counting By',
        'Task Name',
        'Frequency Type',
        'Frequency Value',
        'Description',
        'Reason',
        'Request By',
        'Email'
      ]]);
      // Format header row
      sheet.getRange(1, 1, 1, 12).setFontWeight('bold');
      sheet.getRange(1, 1, 1, 12).setBackground('#0a192f');
      sheet.getRange(1, 1, 1, 12).setFontColor('#ffffff');
      sheet.setFrozenRows(1);
    }
    
    // Prepare the row data
    const rowData = [
      data.timestamp || new Date().toISOString(),
      data.vessel || '',
      data.engineName || '',
      data.engineType || '',
      data.countingBy || '',
      data.taskName || '',
      data.frequencyType || '',
      data.frequencyValue || '',
      data.description || '',
      data.reason || '',
      data.requestBy || '',
      data.email || ''
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, 12);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'success',
        'message': 'Data saved successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'error',
        'message': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Handle GET requests (for testing)
  return ContentService
    .createTextOutput(JSON.stringify({
      'status': 'ok',
      'message': 'Vessel Maintenance Request Form API is running'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Setup function - Run this once to create the sheet with headers
 */
function setup() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  
  // Clear existing data
  sheet.clear();
  
  // Add headers
  sheet.getRange(1, 1, 1, 12).setValues([[
    'Timestamp',
    'Vessel',
    'Engine Name',
    'Engine Type',
    'Counting By',
    'Task Name',
    'Frequency Type',
    'Frequency Value',
    'Description',
    'Reason',
    'Request By',
    'Email'
  ]]);
  
  // Format header row
  const headerRange = sheet.getRange(1, 1, 1, 12);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#0a192f');
  headerRange.setFontColor('#ffffff');
  sheet.setFrozenRows(1);
  
  // Auto-resize columns
  sheet.autoResizeColumns(1, 12);
  
  Logger.log('Sheet setup completed!');
}
