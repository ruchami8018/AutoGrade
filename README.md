# AUTO GRADE – All-in-One Teaching Assistant Platform

**AUTO GRADE** is a smart SaaS platform built specifically for teachers, lecturers, and professional instructors.  
It offers an all-in-one teaching management solution focused on organizing educational materials, collaborating with colleagues, and using AI tools to enhance productivity and teaching quality.

---

## 📌 General Overview

AUTO GRADE enables teachers to manage files, create educational content, analyze materials with AI, communicate with fellow educators, and more — all under one roof.  
The system includes modern UI, AI-powered tools, cloud file storage, smart statistics, automatic email delivery, and built-in real-time chat.

---

## 🎯 Key Goals

- Help teachers **organize, share, and analyze** their teaching materials efficiently.
- Save time using smart tools like **automatic document analysis**, **question generation**, and **duplicate content detection**.
- Enhance knowledge sharing via **chat**, **file sharing**, **comments**, and **reports**.
- Provide a unified, accessible, and modern **cloud-based work environment**.

---

## 🧰 Tech Stack

### 💻 Clients
- **React** – Main teacher-facing application.
- **Angular** – Admin panel for user management.

### 🖥️ Server
- **ASP.NET Core Web API** – All backend logic.
- **Entity Framework** – ORM for MySQL database.
- **JWT** & **Role-based auth** for secure access.

### ☁️ Infrastructure
- **MySQL** – Relational database.
- **AWS S3** – Cloud file storage.
- **Deployment** – Cloud-based (AWS).

### 🤖 AI & Communication
- **AI Tools** – GPT/Custom models for content analysis, OCR, question generation.
- **Authentication** – ASP.NET Identity + Google OAuth.
<!-- - **Email** – SendGrid/SMTP for automated notifications. -->
- **Real-Time Chat** – SignalR.

---

<!-- ## 📁 Core Concept: Files

Every core action revolves around **educational files** such as tests, lesson plans, presentations, quizzes, and more.

Each file includes:
- Title, tags, description, creation date, physical file.
- AI Analysis (e.g. generate questions, summaries).
- Folder association, sharing, and metadata. -->

Advanced Options:
- AI question generation
- Duplicate content detection
- OCR analysis

---

## 🖥️ React App – Teacher Interface

- Login/Signup (Email+Password or Google OAuth)
<!-- - Password reset via email -->
- Dashboard: view, search, filter, and tag files
- Upload/edit/delete files
- AI Actions: summarize, generate questions, find similar content
- Folder & tag management
- Smart tags (auto-generated)
- Real-time teacher chat (SignalR)
  - Group chat, file attachments, search history
  - Chatbot assistant: test creation, lesson planning, etc.
- Statistics & reports (e.g. most uploaded content, file usage)
- Personal profile management

---

## 🔧 Angular App – Admin Panel

- Secure login for admins (no Google OAuth)
- User management: create, update, delete
- Filter users by role/status
<!-- - Send auto-generated credentials via email -->
- Action logs
- General system usage reports

---

## 🔌 API – ASP.NET Core

- Full RESTful API
- Entity Framework integration with MySQL
- AI Service: OCR, question generation, tag prediction
<!-- - Email service (registration, password reset, etc.) -->
- Secure role-based access via JWT

---

## ⭐ Unique Features

- ✅ GPT/OCR AI integration (summaries, questions, tags)
- ✅ Real-time chat between teachers
- ✅ Cloud-based file storage (AWS S3)
- ✅ Full deployment on the cloud
- ✅ Clean, modern, responsive UI
- ✅ Smart dashboards & data insights
- ✅ Role-based access and analytics

---

## 📬 Contact

**Developer:** Ruchami Star  
**GitHub:** [ruchami8018](https://github.com/ruchami8018)  
**Email:** ruchama.star.dev@gmail.com