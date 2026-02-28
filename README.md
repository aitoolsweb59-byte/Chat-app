# ChatRoom App 💬

A simple real-time chat app. Create a room, share the name with a friend, chat together. Only the last 15 messages are kept — older ones disappear automatically.

---

## How to Deploy for FREE on Render.com

### Step 1 — Put your code on GitHub (Free)

1. Go to https://github.com and create a free account
2. Click the **+** icon → **New repository**
3. Name it `chat-app`, make it **Public**, click **Create repository**
4. On your phone or computer, install **GitHub Desktop** (https://desktop.github.com) OR use the GitHub website to upload files
5. Upload all 3 files:
   - `server.js`
   - `package.json`
   - `public/index.html` (make sure `index.html` is inside a folder named `public`)

### Step 2 — Deploy on Render.com (Free)

1. Go to https://render.com and create a free account (sign in with GitHub)
2. Click **New +** → **Web Service**
3. Connect your GitHub account and select your `chat-app` repository
4. Fill in the settings:
   - **Name:** chat-app (or anything you like)
   - **Region:** Choose closest to you
   - **Branch:** main
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Instance Type:** Free
5. Click **Create Web Service**
6. Wait ~2 minutes — Render will build and deploy your app
7. You'll get a URL like: `https://chat-app-xxxx.onrender.com` 🎉

### Step 3 — Share & Chat!

- Open your URL on your phone
- Enter your name and a room name (e.g. "myroom")
- Share the **same URL + room name** with a friend
- Start chatting! Messages disappear after 15 are reached.

---

## How It Works

- **Room:** Any two people who type the same room name are connected
- **15 message limit:** When a 15th message arrives, the oldest one fades away
- **Real-time:** Messages appear instantly using Socket.IO (WebSockets)
- **No database:** Messages live in memory — if the server restarts, chat clears (this is fine for a simple app!)

---

## Note on Render Free Tier

Render's free tier **spins down** after 15 minutes of inactivity. The first person to visit after inactivity may wait ~30 seconds for it to wake up. This is normal and free!
