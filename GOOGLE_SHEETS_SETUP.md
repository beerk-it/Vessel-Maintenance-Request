# วิธีเชื่อมต่อกับ Google Sheets

## ขั้นตอนการตั้งค่า Google Sheets

### ขั้นตอนที่ 1: สร้าง Google Sheet

1. ไปที่ [Google Sheets](https://sheets.google.com)
2. คลิก **"Blank"** เพื่อสร้าง spreadsheet ใหม่
3. ตั้งชื่อ spreadsheet (เช่น "Vessel Maintenance Requests")
4. **คัดลอก Spreadsheet ID** จาก URL:
   - URL จะเป็นแบบนี้: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
   - คัดลอกส่วน `SPREADSHEET_ID` (ตัวอักษรยาวๆ ระหว่าง `/d/` และ `/edit`)

### ขั้นตอนที่ 2: สร้าง Google Apps Script

1. ไปที่ [Google Apps Script](https://script.google.com)
2. คลิก **"New Project"** (หรือ "+" สีน้ำเงิน)
3. ลบโค้ดเดิมทั้งหมด
4. เปิดไฟล์ `google-apps-script.js` ในโปรเจคของคุณ
5. **คัดลอกโค้ดทั้งหมด** จากไฟล์ `google-apps-script.js`
6. **วางโค้ด** ลงใน Google Apps Script editor
7. **แทนที่** `YOUR_SPREADSHEET_ID` ด้วย Spreadsheet ID ที่คัดลอกมา (บรรทัดที่ 20)
8. คลิก **"Save"** (Ctrl+S หรือ Cmd+S)
9. ตั้งชื่อโปรเจค (เช่น "Vessel Maintenance Form Handler")

### ขั้นตอนที่ 3: Deploy เป็น Web App

1. ใน Google Apps Script คลิก **"Deploy"** (มุมขวาบน)
2. เลือก **"New deployment"**
3. คลิกไอคอน **⚙️** ข้าง "Select type"
4. เลือก **"Web app"**
5. ตั้งค่าดังนี้:
   - **Description**: "Vessel Maintenance Form Handler" (หรือชื่อที่คุณต้องการ)
   - **Execute as**: **"Me"**
   - **Who has access**: **"Anyone"** (หรือ "Anyone with Google account" ถ้าต้องการจำกัด)
6. คลิก **"Deploy"**
7. **คัดลอก Web App URL** ที่แสดงขึ้นมา (จะยาวๆ เริ่มต้นด้วย `https://script.google.com/...`)
8. **สำคัญ**: เมื่อมี popup ขึ้นมาให้คลิก **"Authorize access"**
   - เลือกบัญชี Google ของคุณ
   - คลิก **"Advanced"**
   - คลิก **"Go to [ชื่อโปรเจค] (unsafe)"**
   - คลิก **"Allow"**

### ขั้นตอนที่ 4: ตั้งค่าใน Form

1. เปิดไฟล์ `script.js` ในโปรเจคของคุณ
2. หาบรรทัดที่ 2: `const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';`
3. **แทนที่** `YOUR_GOOGLE_SCRIPT_URL_HERE` ด้วย Web App URL ที่คัดลอกมา
4. บันทึกไฟล์

### ขั้นตอนที่ 5: ทดสอบ

1. เปิด `index.html` ในเบราว์เซอร์
2. กรอกฟอร์มและคลิก Submit
3. ตรวจสอบ Google Sheet ว่ามีข้อมูลเข้ามาหรือไม่

## ตัวอย่างการตั้งค่า

### ใน google-apps-script.js:
```javascript
const SPREADSHEET_ID = '1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t'; // ใส่ ID ของคุณ
```

### ใน script.js:
```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby.../exec'; // ใส่ URL ของคุณ
```

## การแก้ไขปัญหา

### ปัญหา: ข้อมูลไม่เข้า Google Sheet

**วิธีแก้:**
1. ตรวจสอบว่า Spreadsheet ID ถูกต้อง
2. ตรวจสอบว่า Web App URL ถูกต้อง
3. ตรวจสอบว่า Deploy เป็น "Anyone" แล้ว
4. ตรวจสอบ Console ในเบราว์เซอร์ (F12) ว่ามี error อะไร
5. ลองรัน function `setup()` ใน Google Apps Script เพื่อสร้าง headers

### ปัญหา: เกิด Error "Authorization required"

**วิธีแก้:**
1. ไปที่ Google Apps Script
2. คลิก "Deploy" > "Manage deployments"
3. คลิกไอคอนแก้ไข (✏️)
4. เปลี่ยน "Who has access" เป็น "Anyone"
5. คลิก "Deploy" อีกครั้ง
6. คัดลอก URL ใหม่และอัปเดตใน script.js

### ปัญหา: ต้องการลบข้อมูลเก่า

**วิธีแก้:**
1. ไปที่ Google Apps Script
2. เลือก function `setup` จาก dropdown
3. คลิก Run (▶️)
4. ระบบจะลบข้อมูลเก่าและสร้าง headers ใหม่

## หมายเหตุสำคัญ

- **Web App URL** จะเปลี่ยนทุกครั้งที่คุณ Deploy ใหม่ (เว้นแต่จะเลือก "New version" แทน "New deployment")
- ถ้า Deploy ใหม่ ต้องอัปเดต URL ใน `script.js` ด้วย
- ข้อมูลจะถูกบันทึกทันทีเมื่อ Submit ฟอร์ม
- ถ้ามีหลาย Tasks ข้อมูลจะถูกบันทึกเป็นหลายแถว (1 แถวต่อ 1 Task)

## ตัวอย่างข้อมูลใน Google Sheet

| Timestamp | Vessel | Engine Name | Engine Type | Counting By | Task Name | Frequency Type | Frequency Value | Description | Reason | Request By | Email |
|-----------|--------|-------------|-------------|-------------|-----------|----------------|-----------------|-------------|--------|------------|-------|
| 2024-01-15T10:30:00Z | Blue Horizon | Main Engine | System | Date interval | Oil Change | Days | 30 | Regular maintenance | Scheduled | John Doe | john@example.com |

## สนับสนุน

หากมีปัญหาหรือคำถาม:
1. ตรวจสอบ Console ในเบราว์เซอร์ (F12)
2. ตรวจสอบ Execution log ใน Google Apps Script
3. ตรวจสอบ Google Sheet ว่ามี headers ถูกต้องหรือไม่
