import { getFeedHtml } from '/feed.js'

const searchBtn = document.getElementById('search-btn')
const apiKey = '6804c63'
const inputEl = document.getElementById('input-el')
const searchedMoviesDiv = document.querySelector('.searched-movies')
const startSearchDiv = document.querySelector('.start-search')
let searchedMoviesArray = []

const addedMoviesArray = retrieveWatchlistFromLocalStorage()

searchBtn.addEventListener('click', searchForMovies)

inputEl.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    searchForMovies()
  }
})

inputEl.addEventListener('change', () => {
  searchedMoviesArray = []
})

document.addEventListener('click', (e) => {
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
            searchedMoviesArray.push(data)
            console.log(searchedMoviesArray)
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
  searchedMoviesDiv.innerHTML = getFeedHtml(
    searchedMoviesArray,
    'add',
    'Watchlist'
  )
}

function handleAddClick(movieId) {
  const isAdded = addedMoviesArray.some((movie) => movie.imdbID === movieId)

  if (!isAdded) {
    const targetMovieObj = searchedMoviesArray.filter(function (movie) {
      return movie.imdbID === movieId
    })[0]

    addedMoviesArray.unshift(targetMovieObj)
    addMoviesToLocalStorage()
  }
}

function addMoviesToLocalStorage() {
  localStorage.setItem('addedMovies', JSON.stringify(addedMoviesArray))
}

function retrieveWatchlistFromLocalStorage() {
  return JSON.parse(localStorage.getItem('addedMovies'))
}

retrieveWatchlistFromLocalStorage()
