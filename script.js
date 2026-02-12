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
            element.textContent += text[i++];
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
// СТАРАЯ ФОТОПЛЁНКА (4 фото)
// ======================================================

const photosOld = document.querySelectorAll(".memory-strip.old-strip .memory-photo");
const memoryTitleOld = document.getElementById("memoryTitleOld");
const memoryDescOld  = document.getElementById("memoryDescOld");

const memoriesOld = [
    { title: "Лучшие друзья",          text: "Всё началось с простого общения..." },
    { title: "Первый смех",            text: "Мы смеялись так, будто знали друг друга всю жизнь." },
    { title: "Первые прогулки",        text: "Тёплый вечер и ощущение, что мир стал другим." },
    { title: "Нечто большее",          text: "И тогда я поняла — это уже не просто дружба." }
];

let currentMemoryOld = 0;

function updateOldMemory() {
    if (photosOld.length === 0) return;
    photosOld.forEach((p, i) => p.classList.toggle("active", i === currentMemoryOld));
    if (memoriesOld[currentMemoryOld]) {
        memoryTitleOld.textContent = memoriesOld[currentMemoryOld].title;
        memoryDescOld.textContent  = memoriesOld[currentMemoryOld].text;
    }
}

const wrapperOld = document.querySelector(".memory-strip.old-strip .image-wrapper");

if (wrapperOld && photosOld.length > 0) {
    updateOldMemory();
    wrapperOld.addEventListener("click", () => {
        currentMemoryOld = (currentMemoryOld + 1) % photosOld.length;
        updateOldMemory();
    });
}


// ======================================================
// НОВАЯ ФОТОПЛЁНКА (8 фото)
// ======================================================

const photosNew = document.querySelectorAll(".memory-strip.new-strip .memory-photo");
const memoryTitleNew = document.getElementById("memoryTitleNew");
const memoryDescNew  = document.getElementById("memoryDescNew");

const memoriesNew = [
    { title: "Возвращение",          text: "О чудо — вернулись мы вновь..." },
    { title: "Сквозь молчание",      text: "Годы тишины только усилили чувства." },
    { title: "Ближе прежнего",       text: "Мы стали тише, но связь крепче." },
    { title: "Осенний взгляд",       text: "Твой взгляд говорит больше слов." },
    { title: "Тепло рук",            text: "Одно прикосновение — и всё на месте." },
    { title: "Момент истины",        text: "11 сентября — день, когда мы выбрали нас." },
    { title: "Тишина вдвоём",        text: "Вместе даже молчание звучит красиво." },
    { title: "Навсегда теперь",      text: "Это не конец, а настоящее начало." }
];

let currentMemoryNew = 0;

function updateNewMemory() {
    if (photosNew.length === 0) return;
    photosNew.forEach((p, i) => p.classList.toggle("active", i === currentMemoryNew));
    if (memoriesNew[currentMemoryNew]) {
        memoryTitleNew.textContent = memoriesNew[currentMemoryNew].title;
        memoryDescNew.textContent  = memoriesNew[currentMemoryNew].text;
    }
}

const wrapperNew = document.querySelector(".memory-strip.new-strip .image-wrapper");

if (wrapperNew && photosNew.length > 0) {
    updateNewMemory();
    wrapperNew.addEventListener("click", () => {
        currentMemoryNew = (currentMemoryNew + 1) % photosNew.length;
        updateNewMemory();
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
// ПАДАЮЩИЕ СЕРДЕЧКИ
// ======================================================

function startHearts() {
    const isMobile = window.innerWidth < 768;
    const intervalMs = isMobile ? 1200 : 600;
    const maxHearts = isMobile ? 12 : 22;

    setInterval(() => {
        if (document.querySelectorAll(".heart").length >= maxHearts) return;

        const heart = document.createElement("div");
        heart.className = "heart";

        const size = isMobile ? 14 + Math.random() * 18 : 18 + Math.random() * 24;
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;

        heart.style.left = `${Math.random() * 92 + 4}vw`;

        const duration = 5 + Math.random() * 7;
        heart.style.animation = `fall ${duration}s linear forwards`;

        heart.innerHTML = `<svg viewBox="0 0 24 24" width="100%" height="100%">
            <path fill="#ff4d6d" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>`;

        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), duration * 1200);

    }, intervalMs);
}

window.addEventListener('load', startHearts);