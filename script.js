
/* ===================== STAR CANVAS ===================== */
(function () {
    const canvas = document.getElementById('star-canvas');
    const ctx = canvas.getContext('2d');
    let stars = [], W, H;

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function mkStar() {
        return {
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 1.8 + .3,
            a: Math.random(),
            da: (Math.random() * .008 + .002) * (Math.random() > .5 ? 1 : -1),
            dx: (Math.random() - .5) * .15,
            dy: (Math.random() - .5) * .15,
            color: ['#FF85A2', '#C77DFF', '#A8DAFF', '#FFD6E7', '#B5EAD7', '#FFFFFF'][Math.floor(Math.random() * 6)]
        };
    }
    for (let i = 0; i < 180; i++) stars.push(mkStar());

    function draw() {
        ctx.clearRect(0, 0, W, H);
        stars.forEach(s => {
            s.a += s.da;
            if (s.a <= 0 || s.a >= 1) s.da *= -1;
            s.x += s.dx; s.y += s.dy;
            if (s.x < -5) s.x = W + 5;
            if (s.x > W + 5) s.x = -5;
            if (s.y < -5) s.y = H + 5;
            if (s.y > H + 5) s.y = -5;
            ctx.globalAlpha = s.a;
            ctx.fillStyle = s.color;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fill();
        });
        requestAnimationFrame(draw);
    }
    draw();
})();

/* ===================== FLOATING CRYSTALS ===================== */
(function () {
    const container = document.getElementById('floating-crystals');
    const items = ['💎', '✨', '⭐', '🌸', '💫', '🔮', '💜', '🌺'];
    setInterval(() => {
        const el = document.createElement('div');
        el.className = 'crystal';
        el.textContent = items[Math.floor(Math.random() * items.length)];
        el.style.left = Math.random() * 100 + '%';
        el.style.bottom = '-2rem';
        el.style.animationDuration = (Math.random() * 4 + 4) + 's';
        el.style.animationDelay = '0s';
        el.style.fontSize = (Math.random() * 1.2 + .8) + 'rem';
        container.appendChild(el);
        setTimeout(() => el.remove(), 9000);
    }, 800);
})();

/* ===================== HEADER SCROLL ===================== */
const header = document.getElementById('main-header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 30);
    document.getElementById('back-top').classList.toggle('visible', window.scrollY > 400);
});

/* ===================== ACTIVE NAV ===================== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('header nav a');
const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            navLinks.forEach(a => a.classList.remove('active'));
            const active = document.querySelector(`header nav a[href="#${e.target.id}"]`);
            if (active) active.classList.add('active');
        }
    });
}, { threshold: .35 });
sections.forEach(s => io.observe(s));

/* ===================== MOBILE MENU ===================== */
document.getElementById('menu-btn').onclick = () => document.getElementById('mobile-nav').classList.add('open');
document.getElementById('mobile-close').onclick = closeMobile;
function closeMobile() { document.getElementById('mobile-nav').classList.remove('open'); }

/* ===================== THEME ===================== */
const themeBtn = document.getElementById('theme-btn');
let dark = false;
themeBtn.onclick = () => {
    dark = !dark;
    document.body.classList.toggle('dark-mode', dark);
    themeBtn.textContent = dark ? '☀️' : '🌙';
};

/* ===================== SCROLL REVEAL ===================== */
const revealIO = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => revealIO.observe(el));

/* ===================== CHARACTER SEARCH & FILTER ===================== */
const charSearch = document.getElementById('char-search');
const filterBtns = document.querySelectorAll('.filter-btn');
let currentFilter = 'all', currentSearch = '';

function filterChars() {
    const cards = document.querySelectorAll('#chars-grid .char-card');
    let visible = 0;
    cards.forEach(c => {
        const name = c.dataset.name.toLowerCase();
        const type = c.dataset.type;
        const matchFilter = currentFilter === 'all' || type === currentFilter;
        const matchSearch = name.includes(currentSearch.toLowerCase());
        const show = matchFilter && matchSearch;
        c.style.display = show ? '' : 'none';
        if (show) visible++;
    });
    const nr = document.getElementById('no-results-chars');
    if (visible === 0) {
        if (!nr) {
            const d = document.createElement('div');
            d.id = 'no-results-chars'; d.className = 'no-results';
            d.innerHTML = '🌸 No characters match your search.';
            document.getElementById('chars-grid').appendChild(d);
        }
    } else { if (nr) nr.remove(); }
}

charSearch.addEventListener('input', e => { currentSearch = e.target.value; filterChars(); });
filterBtns.forEach(btn => {
    btn.onclick = () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        filterChars();
    };
});

/* ===================== GEM DATA ===================== */
const GEM_DATA = {
    rose: {
        icon: '🌸', name: 'Rose Quartz', type: 'Pink Diamond — Rebel Leader',
        desc: 'Rose Quartz was the alias of Pink Diamond, the youngest of the four Diamond rulers. She fell in love with Earth and faked her own death to start a new life, founding the Crystal Gems to protect the planet.',
        facts: ['She could grow sentient plant life called "Lion"', 'Her healing tears could cure corruption', 'She gave up her physical form so Steven could be born', 'Her shield is nearly indestructible pink energy']
    },
    pearl: {
        icon: '🤍', name: 'Pearl', type: 'Servant Class — Defector',
        desc: 'Pearl was created as a servant — a rare and elegant gem used as a status symbol. She defected to become one of the Crystal Gems\' most powerful warriors, devoted to Rose Quartz.',
        facts: ['Can store physical objects in her gem', 'Holographic constructs can fight independently', 'One of the oldest Crystal Gems at thousands of years', 'Born in the Gem Homeworld, never on Earth']
    },
    amethyst: {
        icon: '💜', name: 'Amethyst', type: 'Overcooked Quartz — Crystal Gem',
        desc: 'Amethyst emerged late from the Kindergarten, making her smaller than other Quartz gems. She grew up with the Crystal Gems and sees Earth as her true home — the only Crystal Gem actually born there.',
        facts: ['Spent 500 years gestating in the Kindergarten', 'Her gem is on her chest — a sign of pride', 'Can shapeshift indefinitely without consequences', 'Fuses with Pearl to form Opal']
    },
    garnet: {
        icon: '🔮', name: 'Garnet', type: 'Permanent Fusion — Ruby × Sapphire',
        desc: 'Garnet is a permanent fusion of Ruby and Sapphire, two gems who fell in love when fusion for love was forbidden on Homeworld. She stands as living proof that love is the strongest force in the universe.',
        facts: ['Future vision allows her to see all possible outcomes', 'She has three eyes — one red, one blue, one center', 'Ruby is emotion, Sapphire is calm; together they are balance', 'Leader of the Crystal Gems after Rose']
    },
    lapis: {
        icon: '💙', name: 'Lapis Lazuli', type: 'Terraformer — Reformed',
        desc: 'Lapis Lazuli was a terraformer trapped in a mirror for thousands of years, mistaken for a Crystal Gem spy. After being freed by Steven, she struggled to find her place before finally choosing to call Earth her home.',
        facts: ['Her water wings allow faster-than-light space travel', 'Lifted the entire ocean to reach Homeworld', 'Formed the fusion Malachite with Jasper to protect Steven', 'Can reshape the ocean into any form']
    },
    peridot: {
        icon: '💚', name: 'Peridot', type: 'Era 2 Peridot — Crystal Gem',
        desc: 'Peridot was sent to Earth as a Homeworld technician to check on the Cluster. Over time, Steven\'s kindness changed her, and she defected to become a Crystal Gem — complete with her own special powers.',
        facts: ['Era 2 Gems lack the powers of older gems by default', 'Discovered her own ferrokinesis (metal manipulation)', 'Calls Steven "Clod" as a term of endearment', 'Became passionate about farming and Camp Pining Hearts']
    }
};

document.querySelectorAll('.gem-tile').forEach(tile => {
    tile.addEventListener('click', () => {
        const d = GEM_DATA[tile.dataset.gem];
        if (!d) return;
        document.getElementById('modal-gem-icon').textContent = d.icon;
        document.getElementById('modal-gem-name').textContent = d.name;
        document.getElementById('modal-gem-type').textContent = d.type;
        document.getElementById('modal-gem-desc').textContent = d.desc;
        const factsEl = document.getElementById('modal-gem-facts');
        factsEl.innerHTML = d.facts.map(f => `<div class="modal-fact">${f}</div>`).join('');
        document.getElementById('gem-modal').classList.add('open');
    });
});
function closeModal() { document.getElementById('gem-modal').classList.remove('open'); }
document.getElementById('gem-modal').addEventListener('click', e => { if (e.target === e.currentTarget) closeModal(); });

/* ===================== GALLERY ===================== */
const GALLERY_ITEMS = [
    { emoji: '🌸', title: 'Crystal Temple', desc: 'The ancient home of the Crystal Gems, carved from magic stone.' },
    { emoji: '⭐', title: 'Steven\'s Star', desc: 'Steven\'s signature star — symbol of his unique heritage.' },
    { emoji: '🌊', title: 'Lapis\'s Ocean', desc: 'Lapis commands the entire ocean with breathtaking power.' },
    { emoji: '💎', title: 'Gem Homeworld', desc: 'The cold, structured world of the Diamond Authority.' },
    { emoji: '🌺', title: 'Rose\'s Garden', desc: 'Rose Quartz\'s magical garden of sentient pink flora.' },
    { emoji: '🔮', title: 'Garnet\'s Gauntlets', desc: 'The legendary gauntlets of Ruby and Sapphire combined.' },
    { emoji: '🌙', title: 'Night at Beach City', desc: 'The quiet, starlit shores of Steven\'s hometown.' },
    { emoji: '💫', title: 'Fusion Dance', desc: 'The incredible moment when two gems become one.' },
    { emoji: '🌈', title: 'Stevonnie', desc: 'The radiant fusion of Steven and Connie — human and Gem.' },
    { emoji: '💜', title: 'Amethyst Smash', desc: 'Wild and unpredictable — Amethyst in battle.' },
    { emoji: '🤍', title: 'Pearl\'s Construct', desc: 'Holographic spears fill the sky in Pearl\'s hands.' },
    { emoji: '🌸', title: 'Pink Diamond', desc: 'The secret truth of Rose Quartz, finally revealed.' },
];

const GALLERY_COLORS = [
    'linear-gradient(135deg,#FFD6E7,#FFADC9)',
    'linear-gradient(135deg,#E8D5FF,#C77DFF)',
    'linear-gradient(135deg,#C3E8FF,#A8DAFF)',
    'linear-gradient(135deg,#D4F5E9,#B5EAD7)',
    'linear-gradient(135deg,#FFE5CC,#FFCBA4)',
    'linear-gradient(135deg,#FFD6E7,#FF85A2)',
    'linear-gradient(135deg,#3D0A1E,#7A0051)',
    'linear-gradient(135deg,#0A1A2D,#4895EF)',
    'linear-gradient(135deg,#2D0A3D,#9B5DE5)',
    'linear-gradient(135deg,#FFD6E7,#FFC0D0)',
    'linear-gradient(135deg,#E8F4FF,#C3E8FF)',
    'linear-gradient(135deg,#F5E8FF,#E0AAFF)',
];

const galGrid = document.getElementById('gallery-grid');
GALLERY_ITEMS.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'gal-item';
    el.style.background = GALLERY_COLORS[i % GALLERY_COLORS.length];
    el.innerHTML = `
    <div class="gal-emoji">${item.emoji}</div>
    <div class="gal-overlay">
      <div class="gal-title">${item.title}</div>
      <div class="gal-sub">Click to zoom</div>
    </div>`;
    el.addEventListener('click', () => openLightbox(item.emoji, item.title, item.desc));
    galGrid.appendChild(el);
});

function openLightbox(emoji, title, desc) {
    document.getElementById('lb-emoji').textContent = emoji;
    document.getElementById('lb-title').textContent = title;
    document.getElementById('lb-desc').textContent = desc;
    document.getElementById('lightbox').classList.add('open');
}
function closeLightbox() { document.getElementById('lightbox').classList.remove('open'); }
document.getElementById('lightbox').addEventListener('click', e => { if (e.target === e.currentTarget) closeLightbox(); });

/* ===================== FUN FACTS ===================== */
const FACTS = [
    { icon: '👶', title: 'Youngest Crystal Gem', back: 'Steven Universe is the youngest — and the only half-human Gem in existence. He was born, not created.' },
    { icon: '💑', title: 'Garnet is a Fusion', back: 'Garnet is a permanent fusion of Ruby and Sapphire, two gems who chose love over Homeworld\'s laws.' },
    { icon: '👑', title: 'Rose Was Pink Diamond', back: 'Rose Quartz was secretly Pink Diamond — the youngest Diamond ruler, who faked her own death to start a new life.' },
    { icon: '🌍', title: 'Earth\'s Birth Interrupted', back: 'Homeworld tried to colonize Earth by planting Kindergartens that drain the planet\'s life force to grow new Gems.' },
    { icon: '🌊', title: 'Lapis Flew to Space', back: 'Lapis Lazuli used her water wings to fly from Earth to Homeworld — crossing the galaxy on pure Gem energy.' },
    { icon: '💻', title: 'Peridot Had No Powers', back: 'Era 2 Peridots are manufactured without innate Gem powers. Peridot discovered ferrokinesis entirely on her own.' },
    { icon: '🎵', title: 'Songs Are Canon', back: 'The musical numbers in the show are all canon story moments — Rebecca Sugar wrote every single one of them.' },
    { icon: '🤝', title: 'Fusion is Connection', back: 'Fusions represent relationships — healthy fusions form beautiful new identities; toxic ones like Malachite become trapped.' },
    { icon: '💎', title: 'Gems Can\'t Die Easily', back: 'Gems retreat to their gemstone when defeated. They can only truly die if their gem is cracked or shattered.' },
    { icon: '🌺', title: 'Rose Kept Secrets', back: 'Rose kept enormous secrets from everyone she loved — including her true Diamond identity — out of love and fear.' },
    { icon: '🦁', title: 'Lion Was Steven\'s Pet', back: 'Lion is a resurrected pink lion who lives in Rose\'s pocket dimension. He can warp through pink portals.' },
    { icon: '❤️', title: 'Show About Healing', back: 'Steven Universe was one of the first cartoons to openly address trauma, therapy, identity, and emotional healing for kids.' },
];

const factsGrid = document.getElementById('facts-grid');
FACTS.forEach((f, i) => {
    const el = document.createElement('div');
    el.className = 'fact-card reveal' + (i % 4 > 0 ? ` reveal-delay-${i % 4}` : '');
    el.innerHTML = `
    <div class="fact-inner">
      <div class="fact-front">
        <div class="fact-icon">${f.icon}</div>
        <div class="fact-num">Fact #${String(i + 1).padStart(2, '0')}</div>
        <h4>${f.title}</h4>
        <div style="font-size:.72rem;color:var(--muted);margin-top:.25rem">Hover to reveal ✨</div>
      </div>
      <div class="fact-back">
        <div class="fact-back-icon">${f.icon}</div>
        <p>${f.back}</p>
      </div>
    </div>`;
    factsGrid.appendChild(el);
    revealIO.observe(el);
});

/* ===================== COUNTERS ===================== */
function animateCounter(el, target, duration = 1800) {
    const start = performance.now();
    const update = now => {
        const progress = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(ease * target);
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = target;
    };
    requestAnimationFrame(update);
}

// Hero stats (run immediately on load)
window.addEventListener('load', () => {
    document.querySelectorAll('.counter-anim').forEach(el => {
        animateCounter(el, parseInt(el.dataset.target));
    });
});

// Strip counters (on scroll)
const counterIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.querySelectorAll('.counter-num').forEach(el => {
                if (el.dataset.counted !== 'true') {
                    el.dataset.counted = 'true';
                    animateCounter(el, parseInt(el.dataset.target));
                }
            });
        }
    });
}, { threshold: .5 });
const strip = document.querySelector('.counters-strip');
if (strip) counterIO.observe(strip);

/* ===================== PARALLAX ===================== */
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    document.querySelectorAll('.hero-blob').forEach((b, i) => {
        b.style.transform = `translateY(${scrollY * (0.1 + i * 0.05)}px)`;
    });
});

/* ===================== 3D WEAPON TILT ===================== */
document.querySelectorAll('.weapon-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - .5;
        const y = (e.clientY - rect.top) / rect.height - .5;
        card.style.transform = `translateY(-8px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

/* ===================== KEYBOARD CLOSE ===================== */
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeModal(); closeLightbox(); closeMobile(); }
});
