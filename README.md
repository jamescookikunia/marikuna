# Marikuna 💖

A simple, colorful love page for Mari — front-end only, ready for GitHub Pages.

## Project structure

```
marikuna/
├── index.html          ← main page
├── style.css           ← all styles
├── script.js           ← animations & interactions
└── assets/
    └── videos/
        └── love.mp4    ← your video (with sound)
```

## Add your video

1. Put your video file in `assets/videos/`
2. Name it **`love.mp4`** (or change the filename in `index.html` if you prefer another name)
3. Keep the file under **100 MB** (GitHub file size limit)

Tap **play** on the video to hear sound. Browsers do not allow autoplay with sound until you press play.

**Format:** MP4 works on phone, desktop, and GitHub Pages.

## Run locally

Open `index.html` in your browser, or run a simple server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`

## Deploy on GitHub Pages

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**
4. Choose branch **`main`** and folder **`/ (root)`**
5. Save — your site will be live at `https://yourusername.github.io/marikuna/`

No build step needed. Just HTML, CSS, and JavaScript.

## Features

- Animated gradient background & floating hearts
- Tap hearts for love messages + confetti
- Surprise button with random messages
- Responsive on phone and desktop
- Video section for your special moment

სიყვარული ყველას უნდა 💕
