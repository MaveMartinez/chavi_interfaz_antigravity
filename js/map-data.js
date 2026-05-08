/**
 * Datos del mapa interactivo — Festival de Ancash
 * Zonas del evento con coordenadas SVG para el mapa interactivo
 */

const MAP_ZONES = [
    {
        id: 'escenario-principal',
        name: 'Escenario Principal',
        icon: '🎵',
        description: 'Escenario principal del festival con presentaciones de música y danza tradicional ancashina.',
        color: '#D4AF37',
        highlightColor: '#FFD700',
        // SVG path coordinates (relative to 800x500 viewBox)
        x: 310, y: 30, width: 180, height: 100,
        shape: 'rect',
        labelPos: { x: 400, y: 80 }
    },
    {
        id: 'zona-gastronomica',
        name: 'Zona Gastronómica',
        icon: '🍲',
        description: 'Degustación de platos típicos de Ancash: picante de cuy, ceviche de trucha, pecan caldo, tamales y más.',
        color: '#CD853F',
        highlightColor: '#F4A460',
        x: 570, y: 60, width: 180, height: 160,
        shape: 'rect',
        labelPos: { x: 660, y: 140 }
    },
    {
        id: 'artesanias',
        name: 'Feria de Artesanías',
        icon: '🏺',
        description: 'Exhibición y venta de artesanías ancashinas: tejidos, cerámica, tallados en piedra estilo Chavín.',
        color: '#8B4513',
        highlightColor: '#CD853F',
        x: 50, y: 60, width: 180, height: 160,
        shape: 'rect',
        labelPos: { x: 140, y: 140 }
    },
    {
        id: 'zona-cultural',
        name: 'Zona Cultural / Museo',
        icon: '🏛️',
        description: 'Exposición temporal sobre la cultura Chavín de Huántar: réplicas del Lanzón, Estela Raimondi y Cabezas Clavas.',
        color: '#2E4A3A',
        highlightColor: '#4CAF50',
        x: 50, y: 280, width: 200, height: 140,
        shape: 'rect',
        labelPos: { x: 150, y: 350 }
    },
    {
        id: 'cine-aire-libre',
        name: 'Cine al Aire Libre',
        icon: '🎬',
        description: 'Proyecciones de películas y documentales al aire libre. Trae tu manta y disfruta del cine bajo las estrellas.',
        color: '#1A1A6E',
        highlightColor: '#4444AA',
        x: 550, y: 280, width: 200, height: 140,
        shape: 'rect',
        labelPos: { x: 650, y: 350 }
    },
    {
        id: 'servicios',
        name: 'Servicios',
        icon: '🚻',
        description: 'Baños, primeros auxilios, punto de información, carga de celulares y zona de descanso.',
        color: '#555555',
        highlightColor: '#888888',
        x: 600, y: 440, width: 150, height: 50,
        shape: 'rect',
        labelPos: { x: 675, y: 465 }
    },
    {
        id: 'entrada-principal',
        name: 'Entrada Principal',
        icon: '🚪',
        description: 'Entrada principal del festival. Punto de registro, boletería e información general.',
        color: '#8B0000',
        highlightColor: '#FF4444',
        x: 310, y: 440, width: 180, height: 50,
        shape: 'rect',
        labelPos: { x: 400, y: 465 }
    }
];

/**
 * Genera el SVG del mapa interactivo del festival
 */
function generateMapSVG(selectedZoneId = null) {
    const viewBox = '0 0 800 500';
    
    let zonesHTML = '';
    let labelsHTML = '';
    let pathsHTML = '';
    
    // Caminos/senderos entre zonas
    const paths = [
        // Horizontal central
        { d: 'M 140 220 L 660 220', color: '#C5A55A44' },
        // Vertical central
        { d: 'M 400 130 L 400 440', color: '#C5A55A44' },
        // Diagonal izquierda
        { d: 'M 140 220 L 150 280', color: '#C5A55A33' },
        // Diagonal derecha
        { d: 'M 660 220 L 650 280', color: '#C5A55A33' },
        // Conexión inferior
        { d: 'M 150 420 L 650 420', color: '#C5A55A33' },
        // Conexiones verticales
        { d: 'M 140 220 L 140 280', color: '#C5A55A33' },
        { d: 'M 660 220 L 660 280', color: '#C5A55A33' },
    ];
    
    paths.forEach(p => {
        pathsHTML += `<path d="${p.d}" stroke="${p.color}" stroke-width="12" stroke-linecap="round" fill="none" stroke-dasharray="4,8"/>`;
    });
    
    MAP_ZONES.forEach(zone => {
        const isSelected = zone.id === selectedZoneId;
        const fillColor = isSelected ? zone.highlightColor : zone.color;
        const opacity = isSelected ? '0.9' : '0.5';
        const strokeWidth = isSelected ? '4' : '2';
        const strokeColor = isSelected ? '#FFD700' : '#C5A55A88';
        const animClass = isSelected ? 'zone-pulse' : '';
        
        zonesHTML += `
            <rect 
                class="map-zone ${animClass}" 
                data-zone-id="${zone.id}"
                x="${zone.x}" y="${zone.y}" 
                width="${zone.width}" height="${zone.height}" 
                rx="12" ry="12"
                fill="${fillColor}" 
                fill-opacity="${opacity}"
                stroke="${strokeColor}" 
                stroke-width="${strokeWidth}"
                style="cursor: pointer; transition: all 0.3s ease;"
            />
        `;
        
        const fontSize = isSelected ? '16' : '13';
        const fontWeight = isSelected ? 'bold' : 'normal';
        
        labelsHTML += `
            <text 
                x="${zone.labelPos.x}" y="${zone.labelPos.y - 8}" 
                text-anchor="middle" 
                fill="#fff" 
                font-size="22"
                style="pointer-events: none;"
            >${zone.icon}</text>
            <text 
                x="${zone.labelPos.x}" y="${zone.labelPos.y + 14}" 
                text-anchor="middle" 
                fill="${isSelected ? '#FFD700' : '#E0D5C0'}" 
                font-size="${fontSize}" 
                font-weight="${fontWeight}"
                font-family="Inter, sans-serif"
                style="pointer-events: none; text-shadow: 0 1px 3px rgba(0,0,0,0.8);"
            >${zone.name}</text>
        `;
    });
    
    // Pin indicator for selected zone
    let pinHTML = '';
    if (selectedZoneId) {
        const zone = MAP_ZONES.find(z => z.id === selectedZoneId);
        if (zone) {
            const pinX = zone.x + zone.width / 2;
            const pinY = zone.y - 15;
            pinHTML = `
                <g class="pin-bounce" transform="translate(${pinX}, ${pinY})">
                    <circle cx="0" cy="-12" r="14" fill="#FF4444" stroke="#fff" stroke-width="2"/>
                    <polygon points="-7,-5 7,-5 0,10" fill="#FF4444"/>
                    <circle cx="0" cy="-12" r="5" fill="#fff"/>
                </g>
            `;
        }
    }
    
    return `
        <svg viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg" class="festival-map-svg">
            <defs>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
                <pattern id="chavin-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                    <rect width="40" height="40" fill="transparent"/>
                    <path d="M 0 20 L 10 10 L 20 20 L 10 30 Z" fill="#C5A55A08" stroke="#C5A55A15" stroke-width="0.5"/>
                    <path d="M 20 0 L 30 10 L 20 20 L 30 30 L 20 40" fill="none" stroke="#C5A55A10" stroke-width="0.5"/>
                </pattern>
            </defs>
            
            <!-- Background pattern -->
            <rect width="800" height="500" fill="url(#chavin-pattern)"/>
            
            <!-- Border decoration -->
            <rect x="4" y="4" width="792" height="492" rx="16" ry="16" 
                  fill="none" stroke="#C5A55A44" stroke-width="2" stroke-dasharray="8,4"/>
            
            <!-- Title -->
            <text x="400" y="22" text-anchor="middle" fill="#C5A55A" font-size="11" 
                  font-family="Cinzel, serif" letter-spacing="3" opacity="0.7">
                FESTIVAL DE ANCASH — PLANO DEL EVENTO
            </text>
            
            <!-- Paths -->
            ${pathsHTML}
            
            <!-- Zones -->
            ${zonesHTML}
            
            <!-- Labels -->
            ${labelsHTML}
            
            <!-- Pin -->
            ${pinHTML}
        </svg>
    `;
}
