# Cyberpunk Pomodoro

Una aplicación de temporizador Pomodoro con un estilo visual Cyberpunk. Diseñado para mejorar la productividad dividiendo el trabajo en intervalos, tradicionalmente de 25 minutos de duración, separados por breves descansos, pero con una estética de alta tecnología.

## Características

*   **Temporizador Pomodoro clásico:** Intervalos de trabajo de 25 minutos.
*   **Temporizador de descansos:** Intervalos de descanso de 5 minutos.
*   **Transiciones Automáticas:** Alterna automáticamente entre los modos de trabajo y descanso al finalizar el tiempo.
*   **Alerta de Audio:** Un sonido "beep" sintetizado te avisa cuando el tiempo se agota.
*   **Interfaz Cyberpunk:**
    *   Colores neón de alto contraste (cyan, magenta, amarillo) sobre fondos oscuros.
    *   Texto brillante y efectos luminosos.
    *   Botones angulares estilizados.
    *   Fuente "Orbitron" de estilo digital y tecnológico.
    *   Efecto de superposición de líneas de escaneo (glitch/scanline).
*   **Controles básicos:** Botones de Start, Pause y Reset.

## Tecnologías Utilizadas

*   **HTML5:** Estructura básica de la aplicación.
*   **CSS3:** Todo el estilo visual, incluyendo variables nativas, `flexbox`, gradientes, efectos `backdrop-filter`, `text-shadow`, y recortes poligonales con `clip-path`.
*   **JavaScript (ES6):** Lógica del temporizador, manipulación del DOM y generación de audio utilizando `AudioContext`.

## Instalación y Uso

Este es un proyecto web estático, por lo que no requiere instalación compleja ni dependencias de lado del servidor.

1.  **Clonar o descargar:** Descarga los archivos `index.html`, `style.css` y `script.js` en una misma carpeta.
2.  **Abrir en el navegador:** Simplemente haz doble clic en el archivo `index.html` para abrirlo en tu navegador web preferido (Chrome, Firefox, Safari, Edge, etc.).

## Estructura de Archivos

*   `index.html`: Contiene el marcado de la interfaz de usuario.
*   `style.css`: Contiene todas las reglas de estilo y diseño visual del tema cyberpunk.
*   `script.js`: Contiene la lógica funcional del temporizador, eventos de los botones y alertas de sonido.

## Notas Adicionales

*   **Audio:** El navegador puede bloquear la reproducción automática de audio si no has interactuado con la página previamente. Asegúrate de hacer clic en algún elemento (como el botón START) para permitir el sonido de alerta al finalizar el tiempo.
*   **Responsividad:** La aplicación tiene un diseño fluido que se adapta a pantallas de diferentes tamaños, aunque está optimizada para verse como un widget central.
