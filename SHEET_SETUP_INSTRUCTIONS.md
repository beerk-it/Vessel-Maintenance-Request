# วิธีตั้งค่า Google Sheet สำหรับ Vessel Maintenance Form

## ปัญหา: Sheet ยังเป็น sheet เปล่าๆ

### ขั้นตอนที่ 1: ตรวจสอบ Sheet Name

1. เปิด Google Sheet ที่มี ID: `1rc50zmq6z4yKKbVNQv0KB0kPQXt6YOUqtkgutw1jC0Y`
2. ตรวจสอบว่ามี Sheet ชื่อ **"Maintenance Requests"** หรือไม่
   - ถ้ามี → ข้ามไปขั้นตอนที่ 2
   - ถ้าไม่มี → สร้าง Sheet ใหม่ชื่อ "Maintenance Requests"

### ขั้นตอนที่ 2: รัน Setup Function ใน Google Apps Script

1. ไปที่ [Google Apps Script](https://script.google.com)
2. เปิดโปรเจคที่ deploy แล้ว (หรือโปรเจคที่มีโค้ดจาก `google-apps-script.js`)
3. ตรวจสอบว่า Spreadsheet ID ถูกต้อง:
   ```javascript
   const SPREADSHEET_ID = '1rc50zmq6z4yKKbVNQv0KB0kPQXt6YOUqtkgutw1jC0Y';
   ```
4. ตรวจสอบว่า Sheet Name ถูกต้อง:
   ```javascript
   const SHEET_NAME = 'Maintenance Requests';
   ```
5. เลือก function `setup` จาก dropdown (มุมบนขวา)
6. คลิก **Run** (▶️)
7. ถ้ามี popup ขึ้นมาให้ authorize:
   - คลิก "Review permissions"
   - เลือกบัญชี Google ของคุณ
   - คลิก "Advanced" > "Go to [ชื่อโปรเจค] (unsafe)"
   - คลิก "Allow"
8. รอจนเห็น "Execution completed" ใน Execution log
9. กลับไปดู Google Sheet ควรเห็น headers แล้ว

### ขั้นตอนที่ 3: ตรวจสอบ Headers

Google Sheet ควรมี headers ในแถวแรก:
- Timestamp
- Vessel
- Engine Name
- Engine Type
- Counting By
- Task Name
- Frequency Type
- Frequency Value
- Description
- Reason
- Request By
- Email

### ขั้นตอนที่ 4: ทดสอบฟอร์ม

1. เปิดฟอร์ม: https://beerk-it.github.io/Vessel-Maintenance-Request
2. กรอกข้อมูลและ Submit
3. ตรวจสอบ Google Sheet ว่ามีข้อมูลเข้ามาหรือไม่

## แก้ไขปัญหา "Failed to fetch"

### สาเหตุที่เป็นไปได้:

1. **CORS Error**: Google Apps Script อาจต้องตั้งค่าเพิ่มเติม
2. **Authorization**: Script อาจยังไม่ได้ authorize
3. **Deployment Settings**: อาจต้อง deploy ใหม่

### วิธีแก้ไข:

#### วิธีที่ 1: ตรวจสอบ Deployment

1. ไปที่ Google Apps Script
2. คลิก **"Deploy"** > **"Manage deployments"**
3. ตรวจสอบว่า:
   - **Execute as**: "Me"
   - **Who has access**: "Anyone" (หรือ "Anyone with Google account")
4. ถ้าไม่ใช่ ให้แก้ไขและ Deploy ใหม่

#### วิธีที่ 2: ใช้ no-cors mode (ชั่วคราว)

ถ้ายังไม่ได้ผล อาจต้องแก้ไข `script.js` ให้ใช้ `no-cors` mode:

```javascript
const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',  // เพิ่มบรรทัดนี้
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
});
```

**หมายเหตุ**: เมื่อใช้ `no-cors` จะไม่สามารถตรวจสอบ response ได้ แต่ข้อมูลจะถูกบันทึกใน Sheet

## ตรวจสอบว่า Script ทำงานหรือไม่

1. ไปที่ Google Apps Script
2. เปิด **Execution log** (View > Execution log)
3. Submit ฟอร์มอีกครั้ง
4. ดู Execution log ว่ามี error อะไรหรือไม่

## สรุป

1. ✅ ตรวจสอบ Sheet Name = "Maintenance Requests"
2. ✅ รัน `setup()` function ใน Google Apps Script
3. ✅ ตรวจสอบ Headers ใน Google Sheet
4. ✅ ทดสอบ Submit ฟอร์ม
5. ✅ ตรวจสอบ Execution log ถ้ายังมีปัญหา
