const quotes = [
    "Every moment with you feels like a little miracle.",
    "You make ordinary days feel like the best days.",
    "My heart chose you — and it keeps choosing you.",
    "With you, even silence feels like a love song.",
    "You are the reason I smile for no reason at all.",
    "სიყვარული ყველას უნდა — but especially us. 💖"
];

const loveMessages = [
    "You are my sunshine on cloudy days ☀️💖",
    "I fall in love with you a little more every day 🌹",
    "Holding your hand is my favorite adventure 🤝💕",
    "You + Me = My happy place forever 🏡",
    "Thank you for being you — perfectly you 🦋",
    "My heart beats only for you 💓",
    "You are my dream come true ✨",
    "I choose you. Again and again. Always. 💍",
    "შენ ხარ ჩემი ყველაზე ძვირფასი ადამიანი 💖",
    "You make love feel easy and beautiful 🌸",
    "I am so proud to call you mine 💑",
    "Your hugs are my favorite medicine 🤗",
    "Life is better because you exist 🌈",
    "Ika loves Mari — today, tomorrow, always 💕"
];

const colors = ["#ff2b6b", "#ff6b9d", "#c77dff", "#7d5fff", "#ff9f43", "#00cec9", "#fd79a8", "#e17055"];
const heartEmojis = ["💖", "💕", "💗", "💓", "💘", "🌸", "✨", "🦋", "🌹", "💝"];

// Floating hearts
const heartsBg = document.querySelector(".hearts-bg");
const heartCount = window.innerWidth < 480 ? 14 : 22;

for (let i = 0; i < heartCount; i++) {
    const span = document.createElement("span");
    span.textContent = heartEmojis[i % heartEmojis.length];
    span.style.left = Math.random() * 100 + "%";
    span.style.animationDuration = 5 + Math.random() * 9 + "s";
    span.style.animationDelay = Math.random() * 7 + "s";
    span.style.fontSize = 12 + Math.random() * 20 + "px";
    heartsBg.appendChild(span);
}

// Rotating quotes
let quoteIndex = 0;
const quoteEl = document.getElementById("quote");

setInterval(() => {
    quoteIndex = (quoteIndex + 1) % quotes.length;
    quoteEl.style.opacity = "0";
    setTimeout(() => {
        quoteEl.textContent = quotes[quoteIndex];
        quoteEl.style.opacity = "1";
    }, 400);
}, 4500);

// Heart messages
const messageEl = document.getElementById("message");

function showMessage(text, color) {
    messageEl.style.opacity = "0";
    messageEl.style.transform = "scale(0.92)";
    setTimeout(() => {
        messageEl.textContent = text;
        messageEl.style.color = color || "#ff2e6f";
        messageEl.style.opacity = "1";
        messageEl.style.transform = "scale(1)";
    }, 150);
    burstConfetti(color || "#ff6b9d");
}

document.querySelectorAll(".heart-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        showMessage(btn.dataset.msg, btn.dataset.color);
    });
});

document.getElementById("surprise-btn").addEventListener("click", () => {
    const text = loveMessages[Math.floor(Math.random() * loveMessages.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    showMessage(text, color);
});

// Confetti
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function burstConfetti(color) {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 3;
    const count = window.innerWidth < 480 ? 25 : 40;

    for (let i = 0; i < count; i++) {
        particles.push({
            x: cx,
            y: cy,
            vx: (Math.random() - 0.5) * 12,
            vy: (Math.random() - 0.5) * 12 - 3,
            size: 3 + Math.random() * 5,
            color: Math.random() > 0.5 ? color : colors[Math.floor(Math.random() * colors.length)],
            life: 50 + Math.random() * 35,
            shape: Math.random() > 0.5 ? "circle" : "heart"
        });
    }
}

function drawHeart(x, y, size, color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.moveTo(0, size / 4);
    ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, size / 4);
    ctx.bezierCurveTo(-size / 2, size / 2, 0, size * 0.75, 0, size);
    ctx.bezierCurveTo(0, size * 0.75, size / 2, size / 2, size / 2, size / 4);
    ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, size / 4);
    ctx.fill();
    ctx.restore();
}

function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = particles.filter(p => p.life > 0);

    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.12;
        p.life--;
        ctx.globalAlpha = Math.min(1, p.life / 35);

        if (p.shape === "heart") {
            drawHeart(p.x, p.y, p.size * 2, p.color);
        } else {
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        }
    });

    ctx.globalAlpha = 1;
    requestAnimationFrame(animateConfetti);
}

animateConfetti();

// Video — show player when file exists, sound on when user presses play
const video = document.getElementById("love-video");
const placeholder = document.getElementById("video-placeholder");
const VIDEO_PATH = "assets/videos/love.mp4";

function showVideo() {
    video.classList.remove("hidden");
    placeholder.classList.add("hidden");
    video.muted = false;
    video.volume = 1;
}

function hideVideo() {
    video.classList.add("hidden");
    placeholder.classList.remove("hidden");
}

video.addEventListener("loadeddata", showVideo);
video.addEventListener("canplay", showVideo);
video.addEventListener("error", hideVideo);

// Keep sound enabled whenever user plays
video.addEventListener("play", () => {
    video.muted = false;
    video.volume = 1;
});

fetch(VIDEO_PATH, { method: "HEAD" })
    .then(res => {
        if (res.ok) {
            video.load();
        } else {
            hideVideo();
        }
    })
    .catch(() => hideVideo());
