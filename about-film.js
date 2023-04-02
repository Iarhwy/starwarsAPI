import { renderPage } from './main.js';

export function render(data) {
  let appContainer = document.getElementById('app'),
      $buttonBack = document.createElement('button'),
      $container = document.createElement('div'),
      $header = document.createElement('h1'),
      $episode = document.createElement('h3'),
      $director = document.createElement('h5'),
      $producer = document.createElement('h5'),
      $cardText = document.createElement('p'),
      $wrapper = document.createElement('div'),
      $wrapperPlanets = document.createElement('div'),
      $planetsHeader = document.createElement('h3'),
      $wrapperSpecies = document.createElement('div'),
      $speciesHeader = document.createElement('h3'),
      $wrapperStarships = document.createElement('div'),
      $starshipsHeader = document.createElement('h3'),
      $wrapperCharacters = document.createElement('div'),
      $wrapperCharactersHeader = document.createElement('h3')

  let planetsList,
      speciesList,
      starshipsList

  $container.classList.add('container-fluid', 'text-center', 'text-white')
  $header.classList.add('m-3')
  $cardText.classList.add('card-text', 'm-3')
  $wrapper.classList.add('d-flex', 'justify-content-around', 'flex-wrap', 'py-2')
  $wrapperCharacters.append($wrapperCharactersHeader)
  $buttonBack.classList.add('btn', 'mt-3', 'ms-3', 'mb-4', 'btn-outline-light')

  $buttonBack.textContent = 'Back'
  $header.textContent = data.title
  $episode.textContent = `Episode ${letter(data.episode_id)}`
  $director.textContent = `Director: ${data.director} `
  $producer.textContent = `Producer: ${data.producer}`
  $cardText.textContent = data.opening_crawl
  $planetsHeader.textContent = 'Planets'
  $speciesHeader.textContent = 'Species'
  $starshipsHeader.textContent = 'Starships'
  $wrapperCharactersHeader.textContent = 'Characters'

  document.body.style.transition = '2s';
  if (data.episode_id === 4) appContainer.style.backgroundImage = 'url(img/1977.jpg)';
  if (data.episode_id === 5) appContainer.style.backgroundImage = 'url(img/1980.jpg)';
  if (data.episode_id === 6) appContainer.style.backgroundImage = 'url(img/1983.jpg)';
  if (data.episode_id === 1) appContainer.style.backgroundImage = 'url(img/1999.jpg)';
  if (data.episode_id === 2) appContainer.style.backgroundImage = 'url(img/2002.jpg)';
  if (data.episode_id === 3) appContainer.style.backgroundImage = 'url(img/2005.jpg)';

  $wrapperPlanets.append($planetsHeader)
  $wrapperSpecies.append($speciesHeader)
  $wrapperStarships.append($starshipsHeader)
  $wrapper.append($wrapperStarships, $wrapperPlanets, $wrapperSpecies)

  details(data.planets, planetsList, $wrapperPlanets)
  details(data.species, speciesList, $wrapperSpecies)
  details(data.starships, starshipsList, $wrapperStarships)
  details(data.characters, starshipsList, $wrapperCharacters)

  appContainer.append($buttonBack)
  $container.append(
    $header,
    $episode,
    $director,
    $producer,
    $cardText,
    $wrapper,
    $wrapperCharacters
  )

  $buttonBack.addEventListener('click', e => {
    e.preventDefault();

    window.history.back();
    renderPage(
      './about-StarWars.js',
      'https://swapi.dev/api/films',
      'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css'
    );
  });

  return $container;
}

function letter(x) {
  if (x == 1) x = 'I';
  if (x == 2) x = 'II';
  if (x == 3) x = 'III';
  if (x == 4) x = 'IV';
  if (x == 5) x = 'V';
  if (x == 6) x = 'VI';
  return x;
}

function details(options, optionsList, wrapperOptions) {
  if (options) {
    options.forEach(option => {
      fetch(option).then(res => res.json()).then(data => {
          optionsList = document.createElement('span');
          optionsList.classList.add('p-2');
          optionsList.textContent = `  ${data.name} `;
          wrapperOptions.classList.add('m-2');
          wrapperOptions.append(optionsList);
        });
    });
  }
}
