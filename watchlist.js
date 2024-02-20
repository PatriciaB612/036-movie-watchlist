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
  const hasMovies = watchlist.length > 0

  if (hasMovies) {
    watchlistDiv.style.paddingTop = '4em'
    watchlistDiv.innerHTML = getFeedHtml(watchlist)
  } else {
    watchlistDiv.innerHTML = `<a href="index.html">
      <div class="watchlist">
        <p>Your watchlist is looking a little empty...</p>
        <div>
          <img src="icons/Icon-add.svg" alt="add-icon" />
          <p>Let's add some movies!</p>
        </div>
      </div>
    </a>`
  }
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
