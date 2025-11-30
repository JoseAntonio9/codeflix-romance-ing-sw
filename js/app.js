// Referencias al DOM (Elementos HTML)
const moviesGrid = document.getElementById('movies-grid');

// Función principal que inicia la aplicación
async function initApp() {
    console.log("Iniciando CodeFlix Romance...");
    
    // 1. Obtener datos
    const movies = await API.getRomanceMovies();
    
    // 2. Renderizar (Pintar en pantalla)
    renderMovies(movies);
}

// Función encargada de generar el HTML de las tarjetas
function renderMovies(movies) {
    // Limpiar el mensaje de "Cargando..."
    moviesGrid.innerHTML = '';

    if (movies.length === 0) {
        moviesGrid.innerHTML = '<p>No se encontraron películas. Verifica tu API Key.</p>';
        return;
    }

    // Iterar sobre cada película y crear su tarjeta
    movies.forEach(movie => {
        // Validar si tiene imagen, si no, usar un placeholder gris
        const imagePath = movie.poster_path 
            ? `${CONFIG.IMG_URL}${movie.poster_path}` 
            : 'https://via.placeholder.com/500x750/333333/ffffff?text=Sin+Imagen';

        // Crear el HTML de la tarjeta
        const card = document.createElement('div');
        card.classList.add('movie-card');
        
        card.innerHTML = `
            <div class="card-image-container">
                <img src="${imagePath}" alt="${movie.title}" loading="lazy">
                <div class="card-overlay">
                    <span class="rating">★ ${movie.vote_average.toFixed(1)}</span>
                </div>
            </div>
            <div class="card-info">
                <h3>${movie.title}</h3>
                <p>${movie.release_date ? movie.release_date.split('-')[0] : 'N/D'}</p>
            </div>
        `;

        // Agregamos la tarjeta al grid
        moviesGrid.appendChild(card);
    });
}

// Arrancar la app cuando cargue el DOM
document.addEventListener('DOMContentLoaded', initApp);
