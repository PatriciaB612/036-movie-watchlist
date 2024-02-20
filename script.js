import { getFeedHtml } from '/feed.js'

const searchBtn = document.getElementById('search-btn')
const apiKey = '6804c63'
const inputEl = document.getElementById('input-el')
const searchedMoviesDiv = document.querySelector('.searched-movies')
const startSearchDiv = document.querySelector('.start-search')
let searchedMovies = []
const watchlist = retrieveWatchlistFromLocalStorage() || []

searchBtn.addEventListener('click', searchForMovies)

inputEl.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    searchForMovies()
  }
})

inputEl.addEventListener('change', () => {
  searchedMovies = []
})

document.addEventListener('click', (e) => {
  if (e.target.dataset.add) {
    handleAddClick(e.target.dataset.add)
  }
})

document.addEventListener('touchstart', (e) => {
  if (e.target.dataset.add) {
    handleAddClick(e.target.dataset.add)
  }
})

function searchForMovies() {
  fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${inputEl.value}`)
    .then((res) => res.json())
    .then((data) => {
      for (const movie of data.Search) {
        const imdbId = movie.imdbID
        fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbId}`)
          .then((res) => res.json())
          .then((data) => {
            searchedMovies.push(data)
            checkWatchlist(searchedMovies, watchlist)
            renderSearchedMovies()
          })
      }
    })
    .catch((err) => {
      startSearchDiv.innerHTML = `<p>Unable to find what you’re looking for.</p>
                                  <p>Please try another search.</p>`
    })
}

function renderSearchedMovies() {
  searchedMoviesDiv.style.paddingTop = '4em'
  searchedMoviesDiv.innerHTML = getFeedHtml(searchedMovies)
}

function handleAddClick(movieId) {
  const onWatchlist = watchlist.some((movie) => movie.imdbID === movieId)

  if (!onWatchlist) {
    let targetMovieObj = searchedMovies.filter(function (movie) {
      return movie.imdbID === movieId
    })[0]

    targetMovieObj = { ...targetMovieObj, isAdded: true }

    watchlist.unshift(targetMovieObj)
    addMoviesToLocalStorage()
    checkWatchlist(searchedMovies, watchlist)
    renderSearchedMovies()
  }
}

function checkWatchlist(searchedMovies, watchlist) {
  searchedMovies.forEach((movie) => {
    watchlist.forEach((addedMovie) => {
      if (movie.imdbID === addedMovie.imdbID) {
        movie.isChecked = true
      }
      return searchedMovies
    })
  })
}

function addMoviesToLocalStorage() {
  localStorage.setItem('watchlist', JSON.stringify(watchlist))
}

function retrieveWatchlistFromLocalStorage() {
  return JSON.parse(localStorage.getItem('watchlist'))
}

retrieveWatchlistFromLocalStorage()
