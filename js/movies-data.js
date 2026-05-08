/**
 * Datos de películas en cartelera — Festival de Ancash
 * Basado en la cartelera real de Cineplanet Perú, mayo 2026
 */

const MOVIES_DATA = [
    {
        id: 'mortal-kombat-2',
        title: 'Mortal Kombat II',
        genre: 'Acción / Fantasía',
        duration: '120 min',
        classification: 'PG-14',
        rating: '⭐ 7.8',
        synopsis: 'Los guerreros de la Tierra deben enfrentar una nueva amenaza del Outworld en un torneo mortal que decidirá el destino de todos los reinos. Nuevos luchadores, nuevas fatalidades.',
        poster: 'assets/img/poster_mortal_kombat.png',
        youtubeId: '-S-TTb0iXzw',
        releaseDate: '7 de mayo, 2026',
        director: 'Simon McQuoid'
    },
    {
        id: 'mandalorian-grogu',
        title: 'The Mandalorian & Grogu',
        genre: 'Aventura / Sci-Fi',
        duration: '135 min',
        classification: 'PG-13',
        rating: '⭐ 8.5',
        synopsis: 'Din Djarin y Grogu emprenden una nueva aventura galáctica que los llevará a enfrentar antiguos enemigos y descubrir secretos del pasado Jedi en la galaxia muy, muy lejana.',
        poster: 'assets/img/poster_mandalorian.png',
        youtubeId: 'Zu46yZrGVhQ',
        releaseDate: '21 de mayo, 2026',
        director: 'Jon Favreau'
    },
    {
        id: 'la-nina',
        title: 'La Niña',
        genre: 'Terror',
        duration: '95 min',
        classification: 'R',
        rating: '⭐ 6.9',
        synopsis: 'Una producción peruana de terror que explora las leyendas oscuras de los Andes. Una familia descubre que la antigua casona que acaban de heredar esconde un secreto aterrador.',
        poster: 'assets/img/poster_la_nina.png',
        youtubeId: 'DTMCJdbBklQ',
        releaseDate: '7 de mayo, 2026',
        director: 'Daniel Vega'
    },
    {
        id: 'hokum',
        title: 'Hokum: La Maldición de la Bruja',
        genre: 'Terror / Suspenso',
        duration: '108 min',
        classification: 'R',
        rating: '⭐ 7.2',
        synopsis: 'Un grupo de jóvenes investigadores paranormales se adentra en un bosque maldito donde una antigua bruja ha despertado para reclamar venganza sobre los descendientes de quienes la condenaron.',
        poster: 'assets/img/poster_hokum.png',
        youtubeId: 'OFmbY2o4tt0',
        releaseDate: '14 de mayo, 2026',
        director: 'Lee Cronin'
    },
    {
        id: 'ovejas-detectives',
        title: 'Las Ovejas Detectives',
        genre: 'Comedia / Familiar',
        duration: '88 min',
        classification: 'ATP',
        rating: '⭐ 7.0',
        synopsis: 'Un grupo de ingeniosas ovejas se convierte en el equipo de detectives más inesperado de la granja cuando descubren una conspiración que amenaza a todos los animales del valle.',
        poster: null,
        posterGradient: 'linear-gradient(135deg, #4CAF50, #8BC34A, #CDDC39)',
        posterIcon: '🐑🔍',
        youtubeId: 'dQw4w9WgXcQ',
        releaseDate: '7 de mayo, 2026',
        director: 'Will Becher'
    },
    {
        id: 'ponyo',
        title: 'Ponyo y el Secreto de la Sirenita',
        genre: 'Animación / Fantasía',
        duration: '101 min',
        classification: 'ATP',
        rating: '⭐ 8.0',
        synopsis: 'Reestreno del clásico del maestro Hayao Miyazaki. Una pequeña pez dorada llamada Ponyo desea convertirse en humana después de conocer a Sōsuke, un niño que vive junto al mar.',
        poster: null,
        posterGradient: 'linear-gradient(135deg, #0077B6, #00B4D8, #90E0EF, #FF6B6B)',
        posterIcon: '🐟🌊',
        youtubeId: 'CsR3KVgBzSM',
        releaseDate: '14 de mayo, 2026',
        director: 'Hayao Miyazaki'
    }
];
