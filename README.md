# 🎮 Play Plus — MVP

**Play Plus** is a web application that allows users to **host games**, **join hosted games**, **send join requests**, and **participate in games hosted by others**.  
This MVP (Minimum Viable Product) demonstrates the core functionality of the platform and includes both static and dynamic frontends integrated with a Django backend.

---

## 🌐 Project Links

**Live Preview (Lovable Deployment):** [https://preview--game-mate.lovable.app/](https://preview--game-mate.lovable.app/)  
**Lovable Project Page:** [https://lovable.dev/projects/9bb38773-6b2a-4020-ab35-31679781a643](https://lovable.dev/projects/9bb38773-6b2a-4020-ab35-31679781a643)

---

## 🧩 Project Overview

The Play Plus MVP includes two frontend versions:

### 1. Lovable Frontend (Static)

This version is created and deployed using [Lovable](https://lovable.dev).  
It displays static sample data to demonstrate the user interface and core features.  
This version is ideal for visual previews and rapid design iterations.

### 2. Dynamic Frontend (Database Connected)

This version loads and displays live data from the backend.  
It connects to a **Django RESTful API** that manages players, games, and join requests.  
This version is intended for development and production environments that require live updates from the database.

---

## ⚙️ Tech Stack

**Frontend:**  
React  
TypeScript  
Vite  
Tailwind CSS  
shadcn/ui  

**Backend:**  
Django  
Django REST Framework (RESTful APIs)  
Database integration for user and game management

---

## 🧠 How to Edit or Contribute

You can modify and extend this project using any of the following methods.

### Option 1: Edit via Lovable

Visit the [Lovable Project](https://lovable.dev/projects/9bb38773-6b2a-4020-ab35-31679781a643) and start editing directly in Lovable.  
Changes made in Lovable are automatically committed to this repository.

### Option 2: Use Your Local IDE

To work locally, follow these steps:

```bash
# Step 1: Clone the repository using your project’s Git URL
git clone <YOUR_GIT_URL>

# Step 2: Move into the project directory
cd <YOUR_PROJECT_NAME>

# Step 3: Install dependencies
npm install

# Step 4: Start the local development server
npm run dev
