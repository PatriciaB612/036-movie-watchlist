const searchBtn = document.getElementById('search-btn')
const apiKey = '6804c63'
const inputEl = document.getElementById('input-el')
const mainDiv = document.querySelector('main')
const startSearchDiv = document.querySelector('.start-search')
let moviesData = []
let myMovies = []

searchBtn.addEventListener('click', searchForMovies)

inputEl.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    searchForMovies()
  }
})

inputEl.addEventListener('change', () => {
  moviesData = []
})

document.addEventListener('click', () => {})

function searchForMovies() {
  fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${inputEl.value}`)
    .then((res) => res.json())
    .then((data) => {
      for (const movie of data.Search) {
        const imdbId = movie.imdbID
        fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbId}`)
          .then((res) => res.json())
          .then((data) => {
            moviesData.push(data)
            renderMoviesData()
          })
      }
    })
    .catch((err) => {
      startSearchDiv.innerHTML = `<p>Unable to find what you’re looking for.</p>
                                  <p>Please try another search.</p>`
    })
}

function renderMoviesData() {
  mainDiv.innerHTML = ''
  mainDiv.style.paddingTop = '4em'
  moviesData.forEach(function (movieData) {
    mainDiv.innerHTML += `
                      <div class="movie-grid" data-id="${movieData.imdbID}">
                        <img src="${movieData.Poster}" class="movie-poster">
                        <div class="main-info">
                          <p class="movie-title">${movieData.Title}</p>
                          <img src="icons/icon-star.svg" class="icon-star"/>
                          <p class='movie-rating'>${movieData.Ratings[0].Value.slice(
                            0,
                            3
                          )}</p>
                        </div>
                        <div class="secondary-info">
                          <p>${movieData.Runtime}</p>
                          <p>${movieData.Genre.split(', ')[0]}</p>
                          <div class="add-to-watchlist">
                            <img src="icons/icon-add.svg" />
                            <p>Watchlist</p>
                          </div>
                        </div>
                        <p class="movie-plot">${movieData.Plot}</p>
                      </div>
                      <hr>
            `
  })
}

function addSelectedClass() {}

function addSelectedMovieToLocalStorage() {}

//
//
