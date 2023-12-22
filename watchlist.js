import { getFeedHtml } from '/functions.js'

const addedMoviesDiv = document.querySelector('.added-movies')
const addedMoviesArray = retrieveWatchlistFromLocalStorage()

function retrieveWatchlistFromLocalStorage() {
  return JSON.parse(localStorage.getItem('addedMovies'))
}

function renderWatchlist() {
  addedMoviesDiv.style.paddingTop = '4em'
  addedMoviesDiv.innerHTML = getFeedHtml(addedMoviesArray, 'remove', 'Remove')
}

renderWatchlist()
