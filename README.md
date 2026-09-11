# TDG Community

ไฟล์ต้นแบบเว็บ TDG พร้อม:
- โลโก้ TDG ที่ส่งมา
- เพลง MP3 ที่ส่งมา เล่นหลังจากกด "ติดต่อเข้ากลุ่ม"
- หน้า สมาชิก TDG แบ่ง ADMIN / สมาชิกในกลุ่ม
- Instagram link
- โครง Admin Dashboard
- ไฟล์ `supabase.sql` สำหรับระบบ Login + สิทธิ์ Admin แบบจริง

## ระบบสิทธิ์
อย่าใช้การซ่อนปุ่มอย่างเดียวในเว็บจริง ต้องใช้ Supabase Auth + Row Level Security (RLS)
ไฟล์ SQL นี้ตั้ง policy ให้ผู้เยี่ยมชมอ่านได้ แต่การเพิ่ม/แก้/ลบต้องเป็น authenticated Admin

## สิ่งที่ต้องตั้งค่าก่อนเปิดใช้ Login จริง
1. สร้าง Supabase project
2. รัน `supabase.sql`
3. สร้างบัญชี Admin ใน Supabase Auth
4. เชื่อม account เข้ากับ record Admin
5. ใส่ SUPABASE_URL และ SUPABASE_ANON_KEY ใน `app.js`
6. จากนั้น deploy โฟลเดอร์นี้บน GitHub Pages/Vercel

ห้ามใส่ `service_role` key ใน `app.js`
