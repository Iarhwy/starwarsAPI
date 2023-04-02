import { renderPage } from './main.js';

export function render(data) {
  let $container = document.createElement('div'),
      appContainer = document.getElementById('app'),
      $header = document.createElement('h1')

  $container.classList.add('container')
  $header.classList.add('text-light', 'text-center', 'p-5', 'custom')
  $header.textContent = 'The Star Wars movie universe'
  appContainer.style.backgroundImage = 'url(img/main.jpeg)'
  appContainer.append($header)

  data.results.forEach((part, film) => {
    let year = part.release_date.slice(0, 4),
        $filmCard = document.createElement('div'),
        $cardNotes = document.createElement('em'),
        $btnAbout = document.createElement('a')

    // $filmCard.style.width = '17rem'
    $filmCard.classList.add('card', 'border-light', 'mb-3', 'mx-auto')
    $btnAbout.classList.add('btn', 'btn-outline-light')

    $cardNotes.textContent = year
    $cardNotes.style.fontSize = '0.7rem'
    $btnAbout.textContent = ` ${film + 1}. ${part.title}  `
    $btnAbout.href = `?film=${film + 1}`

    $container.append($filmCard)
    $filmCard.append($btnAbout)
    $btnAbout.append($cardNotes)

    $btnAbout.addEventListener('click', e => {
      e.preventDefault()

      window.history.pushState(null, '', `?film=${film + 1}`)
      renderPage(
        './about-film.js',
        `https://swapi.dev/api/films/${film + 1}`,
        'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css'
      )
    })
  })

  return $container
}