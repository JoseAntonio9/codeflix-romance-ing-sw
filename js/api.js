const API = {
  // Método para obtener películas de Romance (existente)
  getRomanceMovies: async (page = 1) => {
    try {
      const url = `${CONFIG.API_URL}/discover/movie?api_key=${CONFIG.API_KEY}&language=es-MX&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=10749`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Falló API:", error);
      return [];
    }
  },

  // --- NUEVO MÉTODO: Búsqueda ---
  searchMovies: async (query) => {
    try {
      // Endpoint de búsqueda (search/movie)
      const url = `${CONFIG.API_URL}/search/movie?api_key=${
        CONFIG.API_KEY
      }&language=es-MX&query=${encodeURIComponent(query)}&include_adult=false`;

      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error búsqueda: ${response.status}`);

      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Falló la búsqueda:", error);
      return [];
    }
  },
  getMovieDetail: async (id) => {
    try {
      const url = `${CONFIG.API_URL}/movie/${id}?api_key=${CONFIG.API_KEY}&language=es-MX`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener detalle:", error);
      return null;
    }
  },
};
