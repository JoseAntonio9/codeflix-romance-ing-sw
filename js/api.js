const API = {
    // Método para obtener películas de Romance (Género 10749)
    getRomanceMovies: async (page = 1) => {
        try {
            // Construimos la URL usando las constantes de config.js
            // 10749 es el ID oficial de Romance en TMDB
            const url = `${CONFIG.API_URL}/discover/movie?api_key=${CONFIG.API_KEY}&language=es-MX&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=10749`;
            
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Error en la petición: ${response.status}`);
            }

            const data = await response.json();
            return data.results; // Retornamos solo el array de películas

        } catch (error) {
            console.error("Falló la conexión con la API:", error);
            return []; // Retornamos array vacío para no romper la interfaz
        }
    }
};
