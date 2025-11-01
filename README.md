# 🎫 Ticket system – A mini project which lets you add and filter your tickets 

## 🔗 Demo  
[Live Demo](https://ticket-management-system-brown.vercel.app/)

## ⚡ Installation  
```bash
git clone https://github.com/salartalaA/ticket-management-system.git
cd ticket-management-system
npm install
```

## 📌 Usage  
1. Put your envs in a .env file
You need to setup your database first (Use neon.com, create a database and get your db address. Put that in .env)
Then, setup your secret key (Put that in .env file)
You can use this command bellow to create one for yourself

```bash
openssl rand -base64 32
```
2. Push schema to database
```bash
npx prisma db push
```

4. Run the app:  
```bash
npm run dev
```
