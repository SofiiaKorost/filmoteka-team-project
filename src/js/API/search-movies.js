import axios from 'axios';
import genresList from './genres-list';
import { getGenres } from './get-genres';
import { IMAGE_URL } from './api-params';
import { KEY_API } from './api-params';

const SEARCH_PATH = '/search/movie';
const language = 'en-US';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

async function getSearchMovies(name, page) {
  const { data } = await axios.get(
    `${SEARCH_PATH}?api_key=${KEY_API}&query=${name}&page=${page}&language=${language}`
  );

  return data.results;
}

function renderMoviesGallery(movies, currentGallery) {
  const markup = movies
    .map(movie => {
      const {
        id,
        poster_path: posterPath,
        original_title: title,
        release_date: releaseDate,
        genre_ids: genreIds,
      } = movie;

      const genres = getGenres(genresList, genreIds);

      return `<li class="frame" data-id="${id}">
          <img
            data-id="${id}"
            src="${IMAGE_URL + posterPath}"
            alt="${title}"
            class="frame__poster"
            loading="lazy"
          />
          <p class="frame__title">${title}</p>
          <p class="frame__genres">${genres}</p>
          <p class="frame__year">${new Date(releaseDate).getFullYear()}</p>
        </li>`;
    })
    .join('');

  return currentGallery.insertAdjacentHTML('beforeend', markup);
}

export { getSearchMovies, renderMoviesGallery };
