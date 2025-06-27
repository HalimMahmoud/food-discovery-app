# 🍽️ Food App

Food Management App! 🎉  
Built with React, this app helps users efficiently manage and explore food recipes.  
It was a great experience fine-tuning performance while keeping the UI intuitive. Would love to hear feedback and insights from fellow developers!

---

## ✨ Features

### 🧑‍🍳 Recipes

- Admins can **Create / Read / Update / Delete** recipes
- Users can **view** all available recipes

### 🗂️ Categories

- Admins can **Create / Read / Update / Delete** recipe categories
- Users can **view** all available categories

### ❤️ Favorites (Users Only)

- Logged-in users can **add recipes to their favorites**
- Users can view and manage their favorite recipes
- Admins do **not** have a favorites section

### 🔐 Authentication

- Register new users
- Login/logout functionality
- Forget password & reset via email
- Change password (while logged in)
- Email verification process
- Authenticated routes for admins

---

## 🧑‍💻 User Roles

- **Admin**:

  - Full access to manage recipes and categories
  - Can view all users (internally, no user list is exposed to UI)

- **Regular Users**:
  - Can register and log in
  - Can view recipes and their categories
  - Can **add and manage favorite recipes**
  - Cannot create or modify recipes or categories

---

## 🧱 Tech Stack

### 🖥️ Frontend

- **React** – Core UI framework
- **React Router DOM** – Declarative routing
- **React Hook Form** – Form handling and validation
- **Yup** – Schema-based validation
- **React Bootstrap** – Bootstrap UI components in React
- **Fontawesome** – Icon library
- **React Pro Sidebar** – Sidebar navigation layout
- **React Toastify** – Toast-style notifications
- **Axios** – Promise-based HTTP client for API requests
- **JWT Decode** – Decode and read JWT tokens on the client

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/your-username/foodapp.git
cd foodapp
```

---

## ✅ Installing

### Install all dependencies (root-level):

```bash
npm i
```

---

## ▶️ Running the App

From the root directory:

```bash
npm run dev
```

---

## 🔐 Test Account

Use this test user to try the app:

```
🔑 Admin Login:
 📧 Email: halimmahmoud50@gmail.com
 🔑 Password: Halim&123
---
🔑 User Login:
 📧 Email: halim_mahmoud50@yahoo.com
 🔑 Password: Halim&123
---

```

You can also register a new account to explore the full authentication flow.

---

## 🌱 Environment Variables

Create a `.env` file

```env
SERVER_URL=https://upskilling-egypt.com:3006/api/v1
```

---

## 🙌 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

Made with ❤️ for food lovers and developers! with Collabration by Upskilling Team
