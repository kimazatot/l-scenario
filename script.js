// ======================================================
// ИНИЦИАЛИЗАЦИЯ
// ======================================================

const pages = document.querySelectorAll(".page");
const bookNextBtn = document.getElementById("nextBtn");
const bookPrevBtn = document.getElementById("prevBtn");
const pageIndicator = document.getElementById("pageIndicator");

const pageSound = document.getElementById("pageSound");
const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

let currentPage = 0;


// ======================================================
// УСТАНОВКА Z-INDEX
// ======================================================

pages.forEach((page, i) => {
    page.style.zIndex = pages.length - i;
});


// ======================================================
// ПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ======================================================

function updateIndicator() {
    if (pageIndicator) {
        pageIndicator.textContent = `${currentPage + 1} / ${pages.length}`;
    }
}

function playFlip() {
    if (pageSound) {
        pageSound.currentTime = 0;
        pageSound.play().catch(() => {});
    }
}

function showPage(index) {
    pages.forEach((page, i) => {
        if (i < index) {
            page.classList.add("flipped");
        } else {
            page.classList.remove("flipped");
        }
    });

    if (bookNextBtn) bookNextBtn.disabled = index === pages.length - 1;
    if (bookPrevBtn) bookPrevBtn.disabled = index === 0;

    updateIndicator();

    // Печатающийся текст на последней странице
    if (index === pages.length - 1) {
        const finalText = document.getElementById("finalText");
        if (finalText && !finalText.dataset.typed) {
            typeText(finalText, "Это только начало нашей книги...");
            finalText.dataset.typed = "true";
        }
    }
}

function typeText(element, text, speed = 35) {
    let i = 0;
    element.textContent = "";

    const interval = setInterval(() => {
        if (i < text.length) {
            element.textContent += text[i];
            i++;
        } else {
            clearInterval(interval);
        }
    }, speed);
}


// ======================================================
// НАВИГАЦИЯ ПО КНИГЕ
// ======================================================

if (bookNextBtn) {
    bookNextBtn.addEventListener("click", () => {
        if (currentPage < pages.length - 1) {
            currentPage++;
            showPage(currentPage);
            playFlip();
        }
    });
}

if (bookPrevBtn) {
    bookPrevBtn.addEventListener("click", () => {
        if (currentPage > 0) {
            currentPage--;
            showPage(currentPage);
            playFlip();
        }
    });
}


// ======================================================
// ФОТОПЛЁНКА — переключение по клику на фото
// ======================================================

const photos = document.querySelectorAll(".memory-photo");
const memoryTitle = document.getElementById("memoryTitle");
const memoryDesc = document.getElementById("memoryDesc");

const memories = [
    { title: "Лучшие друзья",          text: "Всё началось с простого общения..." },
    { title: "Первый смех",            text: "Мы смеялись так, будто знали друг друга всю жизнь." },
    { title: "Первые прогулки",        text: "Тёплый вечер и ощущение, что мир стал другим." },
    { title: "Нечто большее",          text: "И тогда я поняла — это уже не просто дружба." }
];

let currentMemory = 0;

function updateMemoryDisplay() {
    if (photos.length === 0) return;

    photos.forEach((photo, i) => {
        photo.classList.toggle("active", i === currentMemory);
    });

    if (memories[currentMemory]) {
        memoryTitle.textContent = memories[currentMemory].title;
        memoryDesc.textContent = memories[currentMemory].text;
    }
}

const imageWrapper = document.querySelector(".image-wrapper");

if (imageWrapper && photos.length > 0) {
    // Показываем первое фото сразу
    updateMemoryDisplay();

    imageWrapper.addEventListener("click", () => {
        currentMemory = (currentMemory + 1) % photos.length;
        updateMemoryDisplay();
    });
}


// ======================================================
// МУЗЫКА
// ======================================================

if (musicBtn && music) {
    musicBtn.addEventListener("click", () => {
        if (music.paused) {
            music.play().catch(() => {});
            musicBtn.textContent = "Пауза";
        } else {
            music.pause();
            musicBtn.textContent = "Музыка";
        }
    });
}


// ======================================================
function startHearts() {
    console.log("startHearts запущена"); // ← должно появиться в консоли!

    const intervalMs = window.innerWidth < 768 ? 1200 : 600;

    setInterval(() => {
        console.log("Создаю новое сердечко"); // ← каждые 600–1200 мс

        const heart = document.createElement("div");
        heart.className = "heart";

        const size = 18 + Math.random() * 22;
        heart.style.width = size + "px";
        heart.style.height = size + "px";

        heart.style.left = (Math.random() * 90 + 5) + "vw"; // чуть отступ от краёв

        const duration = 5 + Math.random() * 6;
        heart.style.animation = `fall ${duration}s linear forwards`;

        heart.innerHTML = `<svg viewBox="0 0 24 24" width="100%" height="100%">
            <path fill="#ff4d6d" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>`;

        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
            console.log("Сердечко удалено");
        }, duration * 1000 + 500);

    }, intervalMs);
}

// Запуск
window.addEventListener('load', () => {
    console.log("Страница загружена, запускаем сердечки");
    startHearts();
});