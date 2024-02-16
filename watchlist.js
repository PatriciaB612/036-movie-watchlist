import { getFeedHtml } from '/feed.js'

const addedMoviesDiv = document.querySelector('.added-movies')
let addedMoviesArray = retrieveWatchlistFromLocalStorage()

document.addEventListener('click', function (e) {
  if (e.target.dataset.remove) {
    removeFromWatchlist(e.target.dataset.remove)
  }
})

function retrieveWatchlistFromLocalStorage() {
  return JSON.parse(localStorage.getItem('addedMovies'))
}

function renderWatchlist() {
  addedMoviesDiv.style.paddingTop = '4em'
  addedMoviesDiv.innerHTML = getFeedHtml(addedMoviesArray, 'remove', 'Remove')
}

function removeFromWatchlist(movieId) {
  const filteredAddedMoviesArray = addedMoviesArray.filter(function (movie) {
    return movie.imdbID !== movieId
  })

  addedMoviesArray = filteredAddedMoviesArray
  updateLocalStorage()
  renderWatchlist()
}

function updateLocalStorage() {
  localStorage.setItem('addedMovies', JSON.stringify(addedMoviesArray))
}

renderWatchlist()
