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
// УСТАНОВКА Z-INDEX (один раз)
// ======================================================

pages.forEach((page, i) => {
    page.style.zIndex = pages.length - i;
});


// ======================================================
// ОБНОВЛЕНИЕ ИНДИКАТОРА
// ======================================================

function updateIndicator() {
    if (pageIndicator) {
        pageIndicator.textContent = `${currentPage + 1} / ${pages.length}`;
    }
}


// ======================================================
// ЗВУК ПЕРЕЛИСТЫВАНИЯ
// ======================================================

function playFlip() {
    if (pageSound) {
        pageSound.currentTime = 0;
        pageSound.play().catch(() => {});
    }
}


// ======================================================
// ПЕРЕЛИСТЫВАНИЕ
// ======================================================

function showPage(index) {

    pages.forEach((page, i) => {
        if (i < index) {
            page.classList.add("flipped");
        } else {
            page.classList.remove("flipped");
        }
    });

    if (bookNextBtn) {
        bookNextBtn.disabled = index === pages.length - 1;
    }

    if (bookPrevBtn) {
        bookPrevBtn.disabled = index === 0;
    }

    updateIndicator();

    // Печатающийся финал
    if (index === pages.length - 1) {
        const finalText = document.getElementById("finalText");
        if (finalText && !finalText.dataset.typed) {
            typeText(finalText, "Это только начало нашей книги...");
            finalText.dataset.typed = "true";
        }
    }
}


// ======================================================
// КНОПКИ
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
// ФОТОПЛЁНКА
// ======================================================

const photos = document.querySelectorAll(".memory-photo");
const memoryNextBtn = document.getElementById("memoryNext");
const memoryTitle = document.getElementById("memoryTitle");
const memoryDesc = document.getElementById("memoryDesc");

const memories = [
    {
        title: "Лучшие друзья",
        text: "Всё началось с простого общения..."
    },
    {
        title: "Первый смех",
        text: "Мы смеялись так, будто знали друг друга всю жизнь."
    },
    {
        title: "Первые прогулки",
        text: "Тёплый вечер и ощущение, что мир стал другим."
    },
    {
        title: "Нечто большее",
        text: "И тогда я поняла — это уже не просто дружба."
    }
];

let currentMemory = 0;

if (memoryNextBtn && photos.length > 0) {

    memoryNextBtn.addEventListener("click", () => {

        photos[currentMemory].classList.remove("active");

        currentMemory++;
        if (currentMemory >= photos.length) {
            currentMemory = 0;
        }

        photos[currentMemory].classList.add("active");

        if (memories[currentMemory]) {
            memoryTitle.textContent = memories[currentMemory].title;
            memoryDesc.textContent = memories[currentMemory].text;
        }
    });
}


// ======================================================
// ПЕЧАТАЮЩИЙСЯ ТЕКСТ
// ======================================================

function typeText(element, text, speed = 35) {

    let i = 0;
    element.textContent = "";

    const interval = setInterval(() => {
        element.textContent += text[i];
        i++;
        if (i >= text.length) clearInterval(interval);
    }, speed);
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


setInterval(() => {

    const heart = document.createElement("div");
    heart.className = "heart";

    const size = 15 + Math.random() * 25;
    heart.style.width = size + "px";
    heart.style.height = size + "px";

    heart.style.position = "fixed";
    heart.style.left     = Math.random() * 100 + "vw";

    heart.style.animationDuration = (5 + Math.random() * 7) + "s";

    heart.innerHTML = `
        <svg viewBox="0 0 24 24" width="100%" height="100%">
            <path fill="#e25572"
            d="M12 21s-6.7-4.35-9.33-7.97C-0.07 9.58 1.6 5.5 5.5 5.5c2.04 0 3.4 1.16 4.1 2.27C10.6 6.66 11.96 5.5 14 5.5c3.9 0 5.57 4.08 2.83 7.53C18.7 16.65 12 21 12 21z"/>
        </svg>
    `;

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 13000);

}, 400);

