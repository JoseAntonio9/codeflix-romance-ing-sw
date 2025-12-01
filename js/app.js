// Referencias al DOM
const moviesGrid = document.getElementById("movies-grid");
const searchInput = document.getElementById("search-input");
const modal = document.getElementById("movie-modal");
const closeModalBtn = document.querySelector(".close-btn");

// Función principal
async function initApp() {
  console.log("Iniciando CodeFlix Romance...");
  loadRomanceMovies();

  // Configurar el buscador
  setupSearch();
}

// Carga inicial de Romance
async function loadRomanceMovies() {
  const movies = await API.getRomanceMovies();
  renderMovies(movies);
}

// Lógica del Buscador
function setupSearch() {
  searchInput.addEventListener("input", async (e) => {
    const query = e.target.value.trim();

    console.log("El usuario está escribiendo:", query);

    if (query.length > 2) {
      const results = await API.searchMovies(query);
      renderMovies(results);
    }

    if (query.length === 0) {
      loadRomanceMovies();
    }
  });
}

// Renderizado de películas
function renderMovies(movies) {
  moviesGrid.innerHTML = "";

  // --- CAMBIO REALIZADO AQUÍ (Feedback de búsqueda mejorado) ---
  if (!movies || movies.length === 0) {
    moviesGrid.innerHTML = `
        <div style="text-align:center; width:100%; grid-column: 1 / -1;">
            <p style="font-size: 1.2rem; margin-bottom: 10px;">No se encontraron películas de Romance con ese nombre 💔</p>
            <p style="color: var(--text-gray);">Intenta buscar películas como "Orgullo y Prejuicio", "Titanic" o "Eterno resplandor de una mente sin recuerdos".</p>
        </div>
    `;
    return;
  }
  // -----------------------------------------------------------

  movies.forEach((movie) => {
    const imagePath = movie.poster_path
      ? `${CONFIG.IMG_URL}${movie.poster_path}`
      : "https://via.placeholder.com/500x750/333333/ffffff?text=Sin+Imagen";

    const card = document.createElement("div");
    card.classList.add("movie-card");

    card.innerHTML = `
            <div class="card-image-container">
                <img src="${imagePath}" alt="${movie.title}" loading="lazy">
                <div class="card-overlay">
                    <span class="rating">★ ${movie.vote_average.toFixed(1)}</span>
                </div>
            </div>
            <div class="card-info">
                <h3>${movie.title}</h3>
                <p>${movie.release_date ? movie.release_date.split('-')[0] : 'Sin fecha'}</p>
            </div>
        `;

    // Al hacer clic, llamamos a la función de detalle
    card.addEventListener("click", () => showMovieDetail(movie.id));

    moviesGrid.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", initApp);

// --- Lógica del Modal (Detalle) ---
async function showMovieDetail(id) {
  // 1. Pedir datos a la API
  const movie = await API.getMovieDetail(id);
  if (!movie) return;

  // 2. Llenar el HTML del modal
  document.getElementById("modal-title").textContent = movie.title;
  document.getElementById("modal-overview").textContent =
    movie.overview || "Sin descripción disponible.";
  document.getElementById(
    "modal-date"
  ).textContent = `Estreno: ${movie.release_date}`;
  document.getElementById(
    "modal-rating"
  ).textContent = `★ ${movie.vote_average.toFixed(1)}`;

  const imagePath = movie.poster_path
    ? `${CONFIG.IMG_URL}${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";
  document.getElementById("modal-img").src = imagePath;

  // 3. Mostrar el modal y bloquear scroll del body
  document.body.style.overflow = 'hidden'; // Congela el fondo
  modal.classList.add("show");
}

// Cerrar el modal al dar clic en la X
closeModalBtn.addEventListener("click", () => {
  modal.classList.remove("show");
  document.body.style.overflow = 'auto'; // Reactiva el scroll
});

// Cerrar el modal al dar clic fuera del contenido
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
    document.body.style.overflow = 'auto'; // Reactiva el scroll
  }
});

// --- Lógica del Formulario de Contacto ---
const contactForm = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita que se recargue la página

    let isValid = true;

    // 1. Validar Nombre
    if (nameInput.value.trim() === "") {
        setError(nameInput);
        isValid = false;
    } else {
        setSuccess(nameInput);
    }

    // 2. Validar Email
    if (!isValidEmail(emailInput.value)) {
        setError(emailInput);
        isValid = false;
    } else {
        setSuccess(emailInput);
    }

    // 3. Validar Mensaje
    if (messageInput.value.trim() === "") {
        setError(messageInput);
        isValid = false;
    } else {
        setSuccess(messageInput);
    }

    // Si todo es válido
    if (isValid) {
        alert("¡Mensaje enviado con éxito! (Simulación)");
        contactForm.reset();
    }
    });
}

// Funciones auxiliares para mostrar/quitar errores
function setError(input) {
  input.classList.add("error");
  input.parentElement.classList.add("invalid");
}

function setSuccess(input) {
  input.classList.remove("error");
  input.parentElement.classList.remove("invalid");
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}
