// Referencias al DOM
const moviesGrid = document.getElementById("movies-grid");
const searchInput = document.getElementById("search-input"); // Nueva referencia
const modal = document.getElementById("movie-modal");
const closeModalBtn = document.querySelector(".close-btn");

// Función principal
async function initApp() {
  console.log("Iniciando CodeFlix Romance...");
  loadRomanceMovies(); // Refactorizamos para poder reutilizar

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

    // --- AGREGA ESTO PARA PROBAR ---
    console.log("El usuario está escribiendo:", query);
    // -------------------------------

    if (query.length > 2) {
      const results = await API.searchMovies(query);
      renderMovies(results);
    }

    if (query.length === 0) {
      loadRomanceMovies();
    }
  });
}

// Renderizado (Igual que antes, no hace falta cambiarlo)
function renderMovies(movies) {
  moviesGrid.innerHTML = "";

  if (!movies || movies.length === 0) {
    moviesGrid.innerHTML =
      '<p style="color:white;">No se encontraron resultados.</p>';
    return;
  }

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
                    <span class="rating">★ ${movie.vote_average.toFixed(
                      1
                    )}</span>
                </div>
            </div>
            <div class="card-info">
                <h3>${movie.title}</h3>
                <p>${
                  movie.release_date ? movie.release_date.split("-")[0] : "N/D"
                }</p>
            </div>
        `;

    // --- AQUÍ ESTÁ LA MAGIA DEL CLIC ---
    // Al hacer clic, llamamos a la función de detalle con el ID de la peli
    card.addEventListener("click", () => showMovieDetail(movie.id));

    moviesGrid.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", initApp);

async function showMovieDetail(id) {
  // 1. Pedir datos a la API
  const movie = await API.getMovieDetail(id);
  if (!movie) return;

  // 2. Llenar el HTML del modal con los datos
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

  // 3. Mostrar el modal (agregando la clase CSS)
  modal.classList.add("show");
}

// Cerrar el modal al dar clic en la X
closeModalBtn.addEventListener("click", () => {
  modal.classList.remove("show");
});

// Cerrar el modal al dar clic fuera del contenido (en el fondo oscuro)
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
  }
});

// js/app.js - Al final del archivo

// --- Lógica del Formulario de Contacto ---
const contactForm = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Evita que se recargue la página

  let isValid = true;

  // 1. Validar Nombre (No vacío)
  if (nameInput.value.trim() === "") {
    setError(nameInput);
    isValid = false;
  } else {
    setSuccess(nameInput);
  }

  // 2. Validar Email (Formato regex simple)
  if (!isValidEmail(emailInput.value)) {
    setError(emailInput);
    isValid = false;
  } else {
    setSuccess(emailInput);
  }

  // 3. Validar Mensaje (No vacío)
  if (messageInput.value.trim() === "") {
    setError(messageInput);
    isValid = false;
  } else {
    setSuccess(messageInput);
  }

  // Si todo es válido
  if (isValid) {
    alert("¡Mensaje enviado con éxito! (Simulación)");
    contactForm.reset(); // Limpiar formulario
  }
});

// Funciones auxiliares para mostrar/quitar errores
function setError(input) {
  input.classList.add("error"); // Pone borde rojo
  input.parentElement.classList.add("invalid"); // Muestra mensaje de texto
}

function setSuccess(input) {
  input.classList.remove("error");
  input.parentElement.classList.remove("invalid");
}

function isValidEmail(email) {
  // Expresión regular básica para validar correos
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}
