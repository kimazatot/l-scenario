// ======================================================
// ИНИЦИАЛИЗАЦИЯ
// ======================================================

const pages = document.querySelectorAll(".page");
const bookNextBtn = document.getElementById("nextBtn");
const bookPrevBtn = document.getElementById("prevBtn");
const pageIndicator = document.getElementById("pageIndicator");

const pageSound = document.getElementById("pageSound"); // если есть звук перелистывания
const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

let currentPage = 0;

// Проверяем, что страницы вообще есть
if (pages.length === 0) {
    console.warn("Страницы с классом .page не найдены");
}

// ======================================================
// УСТАНОВКА Z-INDEX (для эффекта книги, если используешь 3D-перелистывание)
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
        // Можно добавить display: none/block, если нужно полностью скрывать неактивные страницы
        // page.style.display = (i === index) ? "block" : "none";
    });

    if (bookNextBtn) {
        bookNextBtn.disabled = index >= pages.length - 1;
    }
    if (bookPrevBtn) {
        bookPrevBtn.disabled = index <= 0;
    }

    updateIndicator();

    // Эффект печати текста на последней странице
    if (index === pages.length - 1) {
        const finalText = document.getElementById("finalText");
        if (finalText && !finalText.dataset.typed) {
            typeText(finalText, "Это только начало нашей истории...");
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

// Инициализация первой страницы
showPage(currentPage);

// ======================================================
// СТАРАЯ ФОТОПЛЁНКА
// ======================================================

const oldStrip = document.querySelector(".memory-strip.old-strip");
if (oldStrip) {
    const photosOld = oldStrip.querySelectorAll(".memory-photo");
    const memoryTitleOld = document.getElementById("memoryTitleOld");
    const memoryDescOld = document.getElementById("memoryDescOld");

    const memoriesOld = [
        { title: "Лучшие друзья", text: "Всё началось с простого общения..." },
        { title: "Первый смех", text: "Мы смеялись так, будто знали друг друга всю жизнь." },
        { title: "Первые прогулки", text: "Тёплый вечер и ощущение, что мир стал другим." },
        { title: "Нечто большее", text: "И тогда я поняла — это уже не просто дружба." }
    ];

    let currentMemoryOld = 0;

    function updateOldMemory() {
        photosOld.forEach((p, i) => p.classList.toggle("active", i === currentMemoryOld));
        if (memoriesOld[currentMemoryOld]) {
            memoryTitleOld.textContent = memoriesOld[currentMemoryOld].title;
            memoryDescOld.textContent = memoriesOld[currentMemoryOld].text;
        }
    }

    const wrapperOld = oldStrip.querySelector(".image-wrapper");
    if (wrapperOld && photosOld.length > 0) {
        updateOldMemory();
        wrapperOld.addEventListener("click", () => {
            currentMemoryOld = (currentMemoryOld + 1) % photosOld.length;
            updateOldMemory();
        });
    }
}

// ======================================================
// НОВАЯ ФОТОПЛЁНКА
// ======================================================

const newStrip = document.querySelector(".memory-strip.new-strip");
if (newStrip) {
    const photosNew = newStrip.querySelectorAll(".memory-photo");
    const memoryTitleNew = document.getElementById("memoryTitleNew");
    const memoryDescNew = document.getElementById("memoryDescNew");

    const memoriesNew = [
        { title: "Возвращение", text: "О чудо — вместе мы вновь" },
        { title: "Сквозь молчание", text: "Годы тишины только усилили чувства." },
        { title: "Ближе прежнего", text: "Мы стали тише, но связь крепче." },
        { title: "Осенний взгляд", text: "Твой взгляд говорит больше слов." },
        { title: "Тепло рук", text: "Одно прикосновение — и всё на месте." },
        { title: "Момент истины", text: "11 сентября — день, когда мы выбрали нас." },
        { title: "Тишина вдвоём", text: "Вместе даже молчание звучит красиво." },
        { title: "Навсегда теперь", text: "Это не конец, а настоящее начало." }
    ];

    let currentMemoryNew = 0;

    function updateNewMemory() {
        photosNew.forEach((p, i) => p.classList.toggle("active", i === currentMemoryNew));
        if (memoriesNew[currentMemoryNew]) {
            memoryTitleNew.textContent = memoriesNew[currentMemoryNew].title;
            memoryDescNew.textContent = memoriesNew[currentMemoryNew].text;
        }
    }

    const wrapperNew = newStrip.querySelector(".image-wrapper");
    if (wrapperNew && photosNew.length > 0) {
        updateNewMemory();
        wrapperNew.addEventListener("click", () => {
            currentMemoryNew = (currentMemoryNew + 1) % photosNew.length;
            updateNewMemory();
        });
    }
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

// ======================================================
// СТРАНИЦА "А знаешь за что я тебя люблю?"
// ======================================================

const reasonButtons = document.querySelectorAll('.reason-btn');
const reasonModal = document.getElementById('reasonModal');
const modalReasonText = document.getElementById('modalReasonText');
const closeModalBtn = document.querySelector('.reason-modal .modal-close');

const reasons = [
    "за твою улыбку, от которой у меня сердце тает",
    "за то, как ты обнимаешь меня, когда мне тяжело",
    "за твои смешные 'клички'",
    "за то, что ты всегда знаешь, когда мне нужно кофе",
    "за твои странные, но такие вкусные кулинарные эксперименты",
    "за то, как ты слушаешь меня, даже когда я повторяюсь",
    "за твои тёплые ладони в холодную погоду",
    "за то, что ты веришь в меня больше, чем я сама",
    "за твои глупые шутки, от которых я всё равно смеюсь",
    "за то, как ты краснеешь, когда я тебя хвалю",
    "за твои поцелуи в щёку, когда я не жду",
    "за то, что ты рядом, даже когда молчишь",
    "за твои глаза, в которых я тону каждый раз",
    "за то, как ты заботишься о моих мелочах",
    "за твой голос",
    "за твое терпение со мной",
    "за твою доброту",
    "за то, как ты злишься, когда что-то идет не так",
    "за твою честность, даже когда она ранит",
    "за то, что ты никогда не сдаёшься",
    "за твои мечты, которыми ты делишься со мной",
    "за то, как ты пахнешь",
    "за твои объятия после долгой разлуки",
    "за то, что ты всегда на моей стороне",
    "за то что вдохновляешь меня быть лучше",
    "за то, как ты радуешься моим маленьким победам",
    "за твои привычки, которые я обожаю",
    "за то, что ты — мой самый близкий человек",
    "за твои планы на будущее, где я всегда рядом",
    "за то, что ты делаешь мир красивее",
    "за твою улыбку, когда я возвращаюсь домой",
    "за то, как ты гладишь меня по голове",
    "за твои 'я тебя люблю' в самый неожиданный момент",
    "за то, что ты умеешь прощать",
    "за твою силу, которой у меня иногда нет",
    "за то, как ты выглядишь утром",
    "за твои секреты, которыми ты делишься только со мной",
    "за то, что ты — мой лучший друг и любовь одновременно",
    "за твои поцелуи в нос",
    "за то, что ты всегда находишь нужные слова",
    "за то что ты продолжаешь быть майинким",
    "за то, что ты продолжаешь радовать меня",
    "за то что ты у меня такой умный",
    "за то, что ты уверен в том что мы дойдем до конца",
    "за твои мечты о нас",
    "за то, как ты меняешься ради нас",
    "за твои 'спокойной ночи' каждый вечер",
    "за то, что ты — моё самое большое счастье",
    "за всё то, что ты делаешь много для нас",
    "за то, что ты — это ты, и другого такого человека просто нет"
];

reasonButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const index = parseInt(btn.dataset.reason, 10);
        if (reasons[index]) {
            modalReasonText.textContent = reasons[index];
        } else {
            modalReasonText.textContent = "Это слишком личное... ♥";
        }
        reasonModal.classList.add('active');

        // визуальный отклик
        reasonButtons.forEach(b => b.classList.remove('clicked'));
        btn.classList.add('clicked');
    });
});

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        reasonModal.classList.remove('active');
    });
}

if (reasonModal) {
    reasonModal.addEventListener('click', e => {
        if (e.target === reasonModal) reasonModal.classList.remove('active');
    });
}

// ======================================================
// МОДАЛЬНОЕ ОКНО С ПИСЬМОМ
// ======================================================

const letterModal = document.getElementById("letterModal");
const letterPreview = document.getElementById("letterPreview"); // кликабельный блок
const closeLetterBtn = document.querySelector(".letter-close");

if (letterPreview && letterModal) {
    letterPreview.addEventListener("click", () => {
        letterModal.classList.add("active");
    });
}

if (closeLetterBtn) {
    closeLetterBtn.addEventListener("click", () => {
        letterModal.classList.remove("active");
    });
}

if (letterModal) {
    letterModal.addEventListener("click", (e) => {
        if (e.target === letterModal) {
            letterModal.classList.remove("active");
        }
    });
}

const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const finalModal = document.getElementById("finalModal");
const modalClose = finalModal.querySelector(".modal-close");

// Да — открыть модалку
yesBtn.addEventListener("click", () => {
    finalModal.classList.add("active");
});

// Закрыть модалку
modalClose.addEventListener("click", () => {
    finalModal.classList.remove("active");
});

// Нет — убегает по всей странице при наведении
// Убегает на ПК
noBtn.addEventListener("mouseover", moveNoBtn);

// Убегает на мобильных при касании
noBtn.addEventListener("touchstart", moveNoBtn);

function moveNoBtn() {
    const pageWidth = window.innerWidth - noBtn.offsetWidth;
    const pageHeight = window.innerHeight - noBtn.offsetHeight;

    const randomX = Math.random() * pageWidth;
    const randomY = Math.random() * pageHeight;

    noBtn.style.position = "absolute";
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
}

