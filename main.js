const cssPromises = {}

function loadResource(src) {
    if (src.endsWith('.js')) return import(src)
    if (src.endsWith('.css')) {
        if (!cssPromises[src]) {
            const link = document.createElement('link')
            link.rel = 'stylesheet'
            link.href = src
            cssPromises[src] = new Promise(resolve => link.addEventListener('load', () => resolve()))
            document.head.prepend(link)
        }
        return cssPromises[src]
    }
    return fetch(src).then(res => res.json())
}

const container = document.getElementById('app')
const searchOptions = new URLSearchParams(location.search)
const film = searchOptions.get('film')

export function renderPage(module, api, css) {
    Promise.all([module, api, css].map(src => loadResource(src))).then(([modulePage, data]) => {
        container.innerHTML = ''
        container.append(modulePage.render(data))
    })
}

if (film) {
    renderPage(
        './about-film.js',
        `https://swapi.dev/api/films/${film}`,
        'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css'
    )
} else {
    renderPage(
        './about-StarWars.js',
        'https://swapi.dev/api/films',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css'
    )
}

window.addEventListener('popstate', () => {
    const reParams = window.location.search.replace('?', '').split('&').reduce((acc, el) => {
        let a = el.split('=');
        acc[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
        return acc;
    }, {});

    const film = reParams['film'] ?? void 0;

    if (film) {
      renderPage(
        './about-film.js',
        'https://swapi.dev/api/films/',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css'
      );
    } else {
      renderPage(
        './about-StarWars.js',
        'https://swapi.dev/api/films',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css'
      );
    }
  });