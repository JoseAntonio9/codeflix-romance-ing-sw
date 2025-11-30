# CodeFlix - Catálogo de Cine (Romance)

Proyecto Final para el curso de Ingeniería de Software.
Este repositorio contiene el desarrollo de una aplicación web SPA (Single Page Application) para la exploración de películas del género **Romance**, consumiendo datos en tiempo real.

## Descripción del Proyecto
CodeFlix es una plataforma web desarrollada bajo principios de **Ingeniería de Software**, priorizando:
- Arquitectura limpia (Separación de conceptos MVC).
- Código modular y reutilizable.
- Uso de control de versiones (Git Flow).
- Diseño responsivo y fiel a la identidad de marca (Color: Rosa Mexicano).

## Funcionalidades Implementadas (Fase 1)
- **Arquitectura Base:** Estructura de carpetas estándar y configuración de variables CSS.
- **Conexión API:** Integración con **The Movie Database (TMDB)** usando JavaScript moderno (Async/Await).
- **Renderizado Dinámico:** Generación automática del catálogo de películas basado en datos JSON.
- **Interfaz UI/UX:**
  - Diseño "Dark Mode" profesional.
  - Header Sticky (Navegación fija).
  - Grid de películas totalmente responsivo (Mobile First).
  - Micro-interacciones (Hover effects, shadows).

## Tecnologías
- **Frontend:** HTML5 Semántico, CSS3 (CSS Variables, Grid, Flexbox).
- **Lógica:** JavaScript ES6+ (Vanilla JS).
- **Datos:** API REST de TMDB.
- **Herramientas:** Git, GitHub, Trello (Gestión Ágil).

## Configuración e Instalación

**IMPORTANTE:** Este proyecto requiere una API KEY de TMDB para funcionar. Por seguridad, el archivo de configuración no se incluye en el repositorio.

Sigue estos pasos para ejecutar el proyecto localmente:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/JoseAntonio9/codeflix-romance-ing-sw.git
   cd codeflix-romance-ing-sw
   ```

2. **Configurar las credenciales:**
   - Navega a la carpeta `js/`.
   - Crea un archivo nuevo llamado `config.js`.
   - Pega el siguiente código y reemplaza `'TU_API_KEY'` con tu llave real de TMDB:

   ```javascript
   // js/config.js
   const CONFIG = {
       API_KEY: 'TU_API_KEY_AQUI',
       API_URL: 'https://api.themoviedb.org/3',
       IMG_URL: 'https://image.tmdb.org/t/p/w500'
   };
   ```

3. **Ejecutar:**
   - No se requiere instalación de paquetes (npm/node).
   - Abre el archivo `index.html` usando un servidor local (ej. **Live Server** en VS Code) para evitar bloqueos de CORS.

## Estructura del Proyecto
```text
.
├── assets/          # Recursos estáticos (imágenes)
├── css/
│   ├── styles.css   # Estilos generales y layout
│   └── vars.css     # Variables de diseño (Colores, fuentes)
├── js/
│   ├── api.js       # Servicio de conexión a TMDB (Modelo)
│   ├── app.js       # Lógica de control y renderizado (Controlador/Vista)
│   └── config.js    # Credenciales (Ignorado por Git)
└── index.html       # Punto de entrada
```

## Equipo (Romance)
- **García Hernández José Antonio:** Frontend Architecture & UI Design.
- **Alan Bellon García:** Backend Logic & Data Flow.
```

