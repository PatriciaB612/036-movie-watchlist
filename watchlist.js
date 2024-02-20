import { getFeedHtml } from '/feed.js'

const watchlistDiv = document.querySelector('.watchlist-div')
let watchlist = retrieveWatchlistFromLocalStorage() || []

document.addEventListener('click', function (e) {
  if (e.target.dataset.remove) {
    removeFromWatchlist(e.target.dataset.remove)
  }
})

function retrieveWatchlistFromLocalStorage() {
  return JSON.parse(localStorage.getItem('watchlist'))
}

function renderWatchlist() {
  watchlistDiv.style.paddingTop = '4em'
  watchlistDiv.innerHTML = getFeedHtml(watchlist)
}

function removeFromWatchlist(movieId) {
  const filteredAddedMovies = watchlist.filter(function (movie) {
    return movie.imdbID !== movieId
  })

  watchlist = filteredAddedMovies
  updateLocalStorage()
  renderWatchlist()
}

function updateLocalStorage() {
  localStorage.setItem('watchlist', JSON.stringify(watchlist))
}

renderWatchlist()
