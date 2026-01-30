# 🖥️ Next.js Ping Terminal Monitor

A simple **terminal-style ping monitor** built with **Next.js App Router**, inspired by **Windows PowerShell ping output**.  
This app checks **1 IP address only** and displays the result in a **real-time terminal-like UI**.

---

## ✨ Features

- ✅ Real ICMP ping (server-side)
- 🖤 Terminal / PowerShell style UI
- ⏱ Auto ping every 1 second
- 📡 Shows latency (`time=<1ms`)
- 🧾 Output scrolls like real terminal
- ⚡ Lightweight & simple

---

## 🛠 Tech Stack

- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **ping (npm library)**

---

## 📂 Project Structure
src/
└─ app/
├─ api/
│ └─ ping-once/
│ └─ route.ts
├─ ping-terminal/
│ └─ page.tsx
└─ page.tsx

---

## 🚀 Getting Started

### 1️⃣ Clone Repository
```bash
git clone https://github.com/USERNAME/REPO_NAME.git
cd REPO_NAME

2️⃣ Install Dependencies
pnpm install

3️⃣ Run Development Server
pnpm dev


Open in browser:
http://localhost:3000/ping-terminal

⚙️ Configuration

Edit target IP in:

src/app/ping-terminal/page.tsx

const IP = "192.168.234.100";

.

🖥 UI Preview
Microsoft Windows [Version 10.0.xxxxx]
(c) Microsoft Corporation. All rights reserved.

PS C:\Users\admin> ping 192.168.234.100 -t
Reply from 192.168.234.100: bytes=32 time<1ms TTL=125
Reply from 192.168.234.100: bytes=32 time<1ms TTL=125
Reply from 192.168.234.100: bytes=32 time<1ms TTL=125

⚠️ Important Notes

❌ ICMP ping will NOT work on Vercel

✅ Recommended environments:

VPS

On-Premise Server

Docker / VM

Linux works out of the box

Windows server may require ICMP permission


