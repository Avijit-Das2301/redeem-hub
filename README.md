# 🔒 Unlock Rewards — Redeem System (MERN + Next.js)

A complete **Redeem System** built using **Next.js, MongoDB, and NextAuth**, featuring **Role-Based Access Control** for Admins and Users.

Admins can generate redeem codes (common or unique), while users can redeem those codes to unlock rewards.  
This project implements all features required for the **Technical Assignment (Stage 2)** using modern web development best practices.

---

## 🚀 Live Demo

👉 **Live Site:** [https://redeem-hub.vercel.app/](https://redeem-hub.vercel.app/)

---

## 📸 Screenshots

### 🏠 Sign Up Page

![Sign Up Page](/Screenshots/Sign%20Up%20Page.png)

### 🏠 Sign In Page

![Sign In Page](/Screenshots/Sign%20In%20Page.png)

### 🏠 Redeem Page

![Redeem Page](/Screenshots/Redeem%20Page.png)

### 🏠 Admin Dashboard

![Admin Dashboard](/Screenshots/Admin%20Dashboard.png)

---

## 🧠 Overview

### 🎯 Features

#### 👑 Admin Features

- Generate **two types of redeem codes**:
  - **Common Codes**: Redeemable by multiple users up to a set limit.
  - **Unique Codes**: Redeemable only once by a single user.
- Set **redemption limits** and **expiry dates**.
- View **all generated codes** with:
  - Type, Limit, Expiry, and Active/Expired Status.
- View **complete redemption history**.
- **Role-based authentication** using NextAuth.
- Access restricted `/admin` dashboard with middleware protection.

#### 🙋 User Features

- Sign up or log in as a user.
- Redeem codes through the `/redeem` page.
- See **real-time feedback** for success or failure (e.g., expired, already redeemed, or limit reached).
- Successful redemptions appear in admin **Redemption History**.

---

## ⚙️ Tech Stack

| Layer              | Technology                                  |
| ------------------ | ------------------------------------------- |
| **Frontend**       | Next.js 14 (App Router)                     |
| **Backend**        | Next.js API Routes (Node.js + Express-like) |
| **Database**       | MongoDB (via Mongoose ORM)                  |
| **Authentication** | NextAuth.js (Credentials Provider + JWT)    |
| **Styling**        | Tailwind CSS + ShadCN UI components         |
| **Hosting**        | Vercel                                      |
| **Language**       | JavaScript (TypeScript ready)               |

---

## 🧩 Role-Based Access

- **Admin:** Can generate codes and view redemption data.
- **User:** Can redeem codes only.
- Protected routes ensure:
  - `/admin` → Admins only
  - `/redeem` → Logged-in users

---

## 🧪 Demo Credentials

You can test the deployed app using the following accounts:

### 👑 Admin Login

```
Email: admin@example.com
Password: admin123
```

### 🙋 User Login

```
Email: user@example.com
Password: user123
```

> You can also sign up as new users/admins through the provided signup forms.

---

## 🔐 Environment Variables

Create a `.env.local` file in the root of your project (do **not** commit this file):

```bash
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/redeemSystem
NEXTAUTH_SECRET=<your_generated_secret>
NEXTAUTH_URL=https://unlock-rewards.vercel.app
```

---

## ⚙️ Local Development Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/unlock-rewards.git
cd unlock-rewards
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Create Environment File

Copy `.env.local` (see above).

### 4️⃣ Run Locally

```bash
npm run dev
```

App will run on [http://localhost:3000](http://localhost:3000)

---

## ☁️ Deployment (Vercel)

1. Push your code to a public GitHub repository.
2. Go to [Vercel](https://vercel.com), click **New Project → Import Git Repository**.
3. Configure Environment Variables:

   ```
   MONGODB_URI=
   NEXTAUTH_SECRET=
   NEXTAUTH_URL=https://<your-app>.vercel.app
   ```

4. Click **Deploy** — done ✅
   Vercel automatically detects Next.js and builds the project.

---

## 🧾 Evaluation Criteria (Stage 2 Alignment)

| Requirement                               | Status         |
| ----------------------------------------- | -------------- |
| Two types of redeem codes (common/unique) | ✅ Implemented |
| Redemption limits                         | ✅ Implemented |
| Expiry handling                           | ✅ Implemented |
| Redemption feedback                       | ✅ Implemented |
| Admin dashboard (generate/view)           | ✅ Implemented |
| MongoDB storage                           | ✅ Implemented |
| Role-based access                         | ✅ Implemented |
| NextAuth authentication                   | ✅ Implemented |
| SSR-ready                                 | ✅ Supported   |
| Clean modular code                        | ✅ Yes         |
| Hosted on Vercel                          | ✅ Deployed    |
| README + Demo credentials                 | ✅ Included    |

---

## 🧰 Tools & Libraries

- **bcryptjs** → Password hashing
- **mongoose** → MongoDB ORM
- **next-auth** → Authentication
- **lucide-react** → Icons
- **Tailwind CSS** → Styling
- **shadcn/ui** → Reusable UI components
- **React Hook Form / Context** → State management
- **Vercel** → Deployment
