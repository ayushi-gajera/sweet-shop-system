Sweet Shop Management System

Sweet Shop Management System – A full-stack web application built with Next.js and MongoDB that allows users to browse and purchase sweets online. The platform includes authentication using JWT, an admin panel to manage inventory (add, edit, delete, restock sweets), and a user dashboard for tracking purchases.

# Features

♦ User Authentication (Register/Login/Logout)
♦ Role-based Access (Admin vs Normal User)
♦ Add / Edit / Delete sweets (Admin only)
♦ Browse sweets and place orders (Users)
♦ Responsive UI with modern styling

# Tech Stack

• Frontend: Next.js (React), CSS
• Authentication: JWT (JSON Web Token)
• Database: MongoDB

# Getting Started

1) Clone the Repository:

git clone https://github.com/ayushi-gajera/sweet-shop-system.git
cd sweet-shop-system

2) Install Dependencies:

npm install

3) Setup Environment Variables:

Create a .env.local file in the root:
MONGODB_URI=your-mongo-db-connection
JWT_SECRET=your-secret-key

4) Run the Project:

npm run dev
Open -> https://localhost:3000