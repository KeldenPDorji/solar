# ⚡ Quick Start Guide

## 5-Minute Setup

### Step 1: Download the Code (2 minutes)

```bash
# Clone the repository
git clone https://github.com/KeldenDorji/STAR-C.git
cd STAR-C
```

Or if it's private:
```bash
git clone https://github.com/KeldenDorji/STAR-C.git
# (GitHub will ask for username/password or SSH key)
```

---

### Step 2: Install Dependencies (2 minutes)

```bash
pnpm install
```

**If you don't have pnpm:**
```bash
npm install -g pnpm
pnpm install
```

---

### Step 3: Set Up Database (1 minute)

1. **Create `.env.local` file** in the project root:
   ```bash
   cp .env.example .env.local
   ```

2. **Get a free PostgreSQL database**:
   - Go to https://console.neon.tech
   - Sign up (free)
   - Create a new project
   - Copy the connection string

3. **Edit `.env.local`** and paste the connection string:
   ```env
   DATABASE_URL=postgresql://your_user:your_password@your_endpoint.neon.tech/neondb?sslmode=require&channel_binding=require
   JWT_SECRET=your_random_secret_key_here
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. **Create tables in database**:
   ```bash
   pnpm db:push
   ```

---

### Step 4: Start the App (30 seconds)

```bash
pnpm dev
```

Visit: http://localhost:3000

---

## ✅ You're Done! 

The app is now running locally.

---

## 🔑 Test Accounts (After Setup)

Login with these accounts:

**Admin Account:**
- Email: `admin@starc.io`
- Password: `Admin@123456`
- Access: Full admin panel

**User Account:**
- Email: `user@example.com`
- Password: `User@123456`
- Access: User dashboard only

---

## 🌐 Access the App

| Page | URL |
|------|-----|
| Home | http://localhost:3000 |
| Login | http://localhost:3000/login |
| Register | http://localhost:3000/register |
| User Dashboard | http://localhost:3000/dashboard (after login) |
| Admin Panel | http://localhost:3000/admin (admin only, after login) |

---

## 🆘 Troubleshooting

### Issue: "pnpm not found"
**Solution:**
```bash
npm install -g pnpm
pnpm install
```

### Issue: "DATABASE_URL is not set"
**Solution:** 
Make sure you copied `.env.example` to `.env.local` and added your database URL

### Issue: "Port 3000 already in use"
**Solution:**
```bash
pnpm dev -- -p 3001
```
Then visit: http://localhost:3001

### Issue: "Cannot connect to database"
**Solution:**
1. Check your DATABASE_URL is correct
2. Make sure Neon project is active
3. Try: `pnpm db:push` again

---

## 📚 Next Steps

Once running:
1. **Explore the app** - Click around, try features
2. **Read documentation** - Check `README.md` for full details
3. **Start development** - Edit files and they auto-update

---

## 🎯 What You Can Do

✅ Login as admin or user  
✅ View dashboards  
✅ Explore admin panels  
✅ View events (sample data loaded)  
✅ Test registration flow  

---

## 📝 Important Notes

- **Do NOT share `.env.local`** - It has secrets!
- **Do NOT commit `.env.local`** to Git
- Create a separate `.env.local` for each computer
- The `.env.example` file is public and safe to share

