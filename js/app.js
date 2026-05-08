/**
 * Festival de Ancash — Interfaz Interactiva Robot Pepper
 * Lógica principal: navegación SPA, mapa, cartelera, trailers
 */

// ============================
// AUTO-SCALE (1920×1200 → viewport)
// ============================
function autoScale() {
    const app = document.getElementById('app');
    const scaleX = window.innerWidth / 1920;
    const scaleY = window.innerHeight / 1200;
    const scale = Math.min(scaleX, scaleY);
    app.style.transform = `translate(-50%, -50%) scale(${scale})`;
}
window.addEventListener('resize', autoScale);
window.addEventListener('load', autoScale);

// ============================
// NAVIGATION
// ============================
let currentScreen = 'home';
let navigationHistory = ['home'];

function navigateTo(screenId) {
    const current = document.querySelector('.screen.active');
    const next = document.getElementById('screen-' + screenId);
    if (!next || current === next) return;

    if (current) {
        current.classList.remove('active');
    }
    next.classList.add('active');

    if (screenId !== currentScreen) {
        navigationHistory.push(screenId);
    }
    currentScreen = screenId;

    // Cleanup YouTube iframes when leaving detail
    if (screenId !== 'detail') {
        const trailerContainer = document.getElementById('trailer-container');
        if (trailerContainer) trailerContainer.innerHTML = '';
    }
}

function goBack() {
    if (navigationHistory.length > 1) {
        navigationHistory.pop();
        const prev = navigationHistory[navigationHistory.length - 1];
        navigateTo(prev);
        // Remove duplicate from history since navigateTo pushes
        navigationHistory.pop();
    }
}

// ============================
// HOME SCREEN — Particles
// ============================
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 4 + 2;
        p.style.cssText = `
            width: ${size}px; height: ${size}px;
            left: ${Math.random() * 100}%;
            animation-duration: ${Math.random() * 15 + 10}s;
            animation-delay: ${Math.random() * 10}s;
        `;
        container.appendChild(p);
    }
}

// ============================
// MAP SCREEN
// ============================
let selectedZone = null;

function initMap() {
    renderMap();
    renderZoneButtons();
}

function renderMap() {
    const mapSvgContainer = document.getElementById('map-svg-container');
    if (!mapSvgContainer) return;
    mapSvgContainer.innerHTML = generateMapSVG(selectedZone);

    // Attach click handlers to SVG zones
    mapSvgContainer.querySelectorAll('.map-zone').forEach(el => {
        el.addEventListener('click', () => {
            selectZone(el.dataset.zoneId);
        });
    });
}

function renderZoneButtons() {
    const sidebar = document.getElementById('zone-buttons');
    if (!sidebar) return;
    sidebar.innerHTML = '';

    MAP_ZONES.forEach((zone, i) => {
        const btn = document.createElement('button');
        btn.className = 'zone-btn fade-in' + (selectedZone === zone.id ? ' selected' : '');
        btn.style.animationDelay = (i * 0.05) + 's';
        btn.innerHTML = `
            <span class="zone-icon">${zone.icon}</span>
            <div>
                <div class="zone-name">${zone.name}</div>
                <div class="zone-desc">${zone.description.substring(0, 60)}...</div>
            </div>
        `;
        btn.addEventListener('click', () => selectZone(zone.id));
        sidebar.appendChild(btn);
    });

    updateZoneInfo();
}

function selectZone(zoneId) {
    selectedZone = (selectedZone === zoneId) ? null : zoneId;
    renderMap();
    // Update buttons selection state
    document.querySelectorAll('.zone-btn').forEach((btn, i) => {
        btn.classList.toggle('selected', MAP_ZONES[i].id === selectedZone);
    });
    updateZoneInfo();
}

function updateZoneInfo() {
    const panel = document.getElementById('zone-info');
    if (!panel) return;
    if (selectedZone) {
        const zone = MAP_ZONES.find(z => z.id === selectedZone);
        panel.innerHTML = `
            <h3>${zone.icon} ${zone.name}</h3>
            <p>${zone.description}</p>
        `;
        panel.style.display = 'block';
    } else {
        panel.innerHTML = '<h3>📍 Selecciona un lugar</h3><p>Toca un lugar en el mapa o selecciona uno de la lista para ver su ubicación.</p>';
    }
}

// ============================
// CARTELERA SCREEN
// ============================
function initCartelera() {
    const grid = document.getElementById('movies-grid');
    if (!grid) return;
    grid.innerHTML = '';

    MOVIES_DATA.forEach((movie, i) => {
        const card = document.createElement('div');
        card.className = 'movie-card fade-in';
        card.style.animationDelay = (i * 0.08) + 's';

        let posterHTML;
        if (movie.poster) {
            posterHTML = `<img src="${movie.poster}" alt="${movie.title}" loading="lazy">`;
        } else {
            posterHTML = `<div class="movie-poster-placeholder" style="background: ${movie.posterGradient}">
                <span>${movie.posterIcon}</span>
            </div>`;
        }

        card.innerHTML = `
            <div class="movie-poster-wrap">
                ${posterHTML}
                <div class="movie-poster-overlay">
                    <div class="play-icon">▶</div>
                </div>
            </div>
            <div class="movie-info">
                <div class="movie-title">${movie.title}</div>
                <div class="movie-meta">
                    <span class="movie-badge">${movie.genre.split('/')[0].trim()}</span>
                    <span>${movie.duration}</span>
                    <span>${movie.rating}</span>
                </div>
            </div>
        `;
        card.addEventListener('click', () => showMovieDetail(movie.id));
        grid.appendChild(card);
    });
}

// ============================
// MOVIE DETAIL SCREEN
// ============================
function showMovieDetail(movieId) {
    const movie = MOVIES_DATA.find(m => m.id === movieId);
    if (!movie) return;

    // Poster
    const posterEl = document.getElementById('detail-poster');
    if (movie.poster) {
        posterEl.innerHTML = `<img src="${movie.poster}" alt="${movie.title}">`;
    } else {
        posterEl.innerHTML = `<div class="detail-poster-placeholder" style="background: ${movie.posterGradient}">${movie.posterIcon}</div>`;
    }

    // Info
    document.getElementById('detail-title').textContent = movie.title;
    document.getElementById('detail-synopsis').textContent = movie.synopsis;

    const metaRow = document.getElementById('detail-meta');
    metaRow.innerHTML = `
        <span class="detail-tag">${movie.genre}</span>
        <span class="detail-tag">⏱ ${movie.duration}</span>
        <span class="detail-tag">${movie.classification}</span>
        <span class="detail-tag">${movie.rating}</span>
        <span class="detail-tag">📅 ${movie.releaseDate}</span>
        <span class="detail-tag">🎬 ${movie.director}</span>
    `;

    // Trailer
    const trailerContainer = document.getElementById('trailer-container');
    trailerContainer.innerHTML = `
        <iframe 
            src="https://www.youtube.com/embed/${movie.youtubeId}?rel=0&modestbranding=1&autoplay=0" 
            title="Trailer: ${movie.title}"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
        </iframe>
    `;

    navigateTo('detail');
}

// ============================
// INIT
// ============================
document.addEventListener('DOMContentLoaded', () => {
    autoScale();
    createParticles();
    initMap();
    initCartelera();

    // Make first screen active
    document.getElementById('screen-home').classList.add('active');
});
