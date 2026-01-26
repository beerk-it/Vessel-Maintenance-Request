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
const SPREADSHEET_ID = '1rc50zmq6z4yKKbVNQv0KB0kPQXt6YOUqtkgutw1jC0Y';
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
    
    // Get common data (same for all tasks)
    const timestamp = data.timestamp || new Date().toISOString();
    const vessel = data.vessel || '';
    const engineName = data.engineName || '';
    const engineType = data.engineType || '';
    const countingBy = data.countingBy || '';
    const description = data.description || '';
    const reason = data.reason || '';
    const requestBy = data.requestBy || '';
    const email = data.email || '';
    
    // Get tasks array
    const tasks = data.tasks || [];
    
    // If no tasks, create one from old format (backward compatibility)
    if (tasks.length === 0 && data.taskName) {
      tasks.push({
        taskName: data.taskName,
        frequencyType: data.frequencyType,
        frequencyValue: data.frequencyValue
      });
    }
    
    // Prepare rows data - one row per task
    const rowsData = [];
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      rowsData.push([
        timestamp,
        vessel,
        engineName,
        engineType,
        countingBy,
        task.taskName || '',
        task.frequencyType || '',
        task.frequencyValue || '',
        description,
        reason,
        requestBy,
        email
      ]);
    }
    
    // Append all rows to the sheet
    if (rowsData.length > 0) {
      const lastRow = sheet.getLastRow();
      sheet.getRange(lastRow + 1, 1, rowsData.length, 12).setValues(rowsData);
    }
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, 12);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'success',
        'message': 'Data saved successfully',
        'tasksSaved': rowsData.length
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
