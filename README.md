# Tally

A modern, minimalist multi-counter application built with vanilla HTML, CSS, and JavaScript. Designed as a Progressive Web App (PWA) for offline use and installability.

![App Icon](icon-192.png)

## Features

- **Multiple Counters:** Create and manage multiple counters for different needs.
- **Persistent Storage:** Data is saved automatically to your browser's local storage.
- **PWA Support:** Installable on mobile and desktop, works offline.
- **Clean UI:** Minimalist design with a focus on usability.
- **Context Menu:** Rename, reset, or delete counters easily.

## Live Demo

[View Live Demo](https://miiiladiii244.github.io/simple-counter-app/)

## Installation

### As a PWA (Mobile/Desktop)
1.  Open the [Live Demo](https://miiiladiii244.github.io/simple-counter-app/).
2.  **Desktop:** Click the install icon in the address bar.
3.  **iOS:** Tap the "Share" button -> "Add to Home Screen".
4.  **Android:** Tap "Add to Home Screen" from the browser menu (or wait for the prompt).

### Local Development
1.  Clone the repository.
2.  Serve the files using a local web server (required for PWA features).
    ```bash
    # Python 3
    python3 -m http.server
    
    # Node.js (http-server)
    npx http-server .
    ```
3.  Open `http://localhost:8000` in your browser.

## Project Structure

- `index.html`: Main application structure.
- `style.css`: Styles and theming.
- `script.js`: Application logic.
- `manifest.json`: PWA configuration.
- `service-worker.js`: Offline caching logic.

## License

MIT