export function getFeedHtml(moviesArray, btn, btnAction) {
  let feedHtml = ''
  moviesArray.forEach(function (movie) {
    feedHtml += `
                <div class="movie-grid" data-id="${movie.imdbID}">
                  <img src="${movie.Poster}" class="movie-poster">
                  <div class="main-info">
                    <p class="movie-title">${movie.Title}</p>
                    <img src="icons/icon-star.svg" class="icon-star"/>
                    <p class='movie-rating'>${movie.Ratings[0].Value.slice(
                      0,
                      3
                    )}</p>
                  </div>
                  <div class="secondary-info">
                    <p>${movie.Runtime}</p>
                    <p>${movie.Year}</p>
                    <p>${movie.Genre.split(', ')[0]}</p>
                    <span class="add-remove-btn" data-${btn}="${movie.imdbID}">
                      <img src="icons/icon-${btn}.svg" data-${btn}="${
      movie.imdbID
    }" />
                      ${btnAction}
                    </span>
                  </div>
                  <p class="movie-plot">${movie.Plot}</p>
                </div>
                <hr>`
  })
  return feedHtml
}
