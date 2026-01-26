# Vessel Maintenance Request Form

A beautiful, modern web form for submitting vessel maintenance requests with Google Sheets integration.

## Features

- ✅ Modern, responsive design with deep blue theme
- ✅ All required form fields for vessel maintenance requests
- ✅ Google Sheets integration for data storage
- ✅ Form validation
- ✅ Beautiful UI/UX with smooth animations
- ✅ Mobile-friendly responsive design

## Form Fields

### Vessel Information
- **Vessel**: Dropdown with 10 vessel options

### Engine Part Information
- **Engine Name**: Text input
- **Engine Type**: Dropdown (System or Inspection)
- **Counting By**: Dropdown (Date interval or Meter number)
- **Task Name**: Text input
- **Frequency Type**: Dropdown (Days or Hours)
- **Frequency Value**: Number input
- **Description**: Long text area
- **Reason**: Long text area

### Requestor Information
- **Request By**: Text input
- **Email**: Email input with validation
- **Timestamp**: Automatically generated

## Setup Instructions

### Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Vessel Maintenance Requests" (or any name you prefer)
4. Copy the Spreadsheet ID from the URL:
   - The URL looks like: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
   - Copy the `SPREADSHEET_ID` part

### Step 2: Set Up Google Apps Script

1. Go to [Google Apps Script](https://script.google.com)
2. Click "New Project"
3. Delete the default code and paste the contents of `google-apps-script.js`
4. Replace `YOUR_SPREADSHEET_ID` with your actual Spreadsheet ID from Step 1
5. Save the project (Ctrl+S or Cmd+S)
6. Name your project (e.g., "Vessel Maintenance Form Handler")

### Step 3: Deploy as Web App

1. In Google Apps Script, click **"Deploy"** > **"New deployment"**
2. Click the gear icon ⚙️ next to "Select type" and choose **"Web app"**
3. Configure the deployment:
   - **Description**: "Vessel Maintenance Form Handler"
   - **Execute as**: "Me"
   - **Who has access**: "Anyone" (or "Anyone with Google account" if you prefer)
4. Click **"Deploy"**
5. **Copy the Web App URL** that appears
6. Authorize the script when prompted:
   - Click "Authorize access"
   - Choose your Google account
   - Click "Advanced" > "Go to [Project Name] (unsafe)"
   - Click "Allow"

### Step 4: Configure the Form

1. Open `script.js` in your project
2. Find the line: `const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';`
3. Replace `YOUR_GOOGLE_SCRIPT_URL_HERE` with the Web App URL you copied in Step 3
4. Save the file

### Step 5: Run the Setup Function (Optional)

1. In Google Apps Script, select the `setup` function from the dropdown
2. Click the Run button ▶️
3. Authorize if prompted
4. This will create the sheet headers automatically

### Step 6: Open the Form

1. Open `index.html` in a web browser
2. Or host it on a web server (GitHub Pages, Netlify, etc.)

## File Structure

```
Vessel Maintenance Request/
├── index.html              # Main form HTML
├── styles.css              # Deep blue theme styling
├── script.js               # Form submission logic
├── google-apps-script.js   # Google Apps Script code
└── README.md              # This file
```

## Customization

### Change Vessel Names

Edit the `<select>` element in `index.html` around line 20-30:

```html
<select id="vessel" name="vessel" required>
    <option value="">Select a vessel</option>
    <option value="Your Vessel 1">Your Vessel 1</option>
    <option value="Your Vessel 2">Your Vessel 2</option>
    <!-- Add more vessels -->
</select>
```

### Change Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --deep-blue: #0a192f;      /* Main background */
    --blue-accent: #3b82f6;     /* Accent color */
    /* ... more colors ... */
}
```

## Troubleshooting

### Form not submitting?

1. Check that the Google Script URL is correctly set in `script.js`
2. Verify the Google Apps Script is deployed as a Web App
3. Check browser console for errors (F12)
4. Ensure "Who has access" is set to "Anyone" in the deployment settings

### Data not appearing in Google Sheets?

1. Verify the Spreadsheet ID is correct in Google Apps Script
2. Check that the sheet name matches (default: "Maintenance Requests")
3. Run the `setup` function in Google Apps Script to create headers
4. Check the Apps Script execution log for errors

### CORS Errors?

The form uses `no-cors` mode, which means you won't see the response. This is normal. If data appears in your Google Sheet, it's working correctly.

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

Free to use and modify for your needs.

## Support

For issues or questions, check:
- Google Apps Script documentation
- Browser console for JavaScript errors
- Google Sheets for data verification
