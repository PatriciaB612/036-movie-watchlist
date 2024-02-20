export function getFeedHtml(moviesArray) {
  let feedHtml = ''

  moviesArray.forEach(function (movie) {
    function selectBtnIcon() {
      let btnIcon = 'add'
      if (movie.isAdded) {
        btnIcon = 'remove'
      } else if (movie.isChecked) {
        btnIcon = 'checked'
      }
      return btnIcon
    }

    feedHtml += `
                <div class="movie-grid" data-id="${movie.imdbID}">
                  <img src="${movie.Poster}" class="movie-poster">
                  <div class="main-info">
                    <p class="movie-title">${movie.Title}</p>
                    <img src="icons/icon-star.svg" class="icon-star"/>
                    <p class='movie-rating'>${
                      movie.Ratings.length > 0
                        ? movie.Ratings[0].Value.slice(0, 3)
                        : 'N/A'
                    }</p>
                  </div>
                  <div class="secondary-info">
                    <p>${movie.Runtime}</p>
                    <p>${movie.Year}</p>
                    <p>${movie.Genre.split(', ')[0]}</p>
                    <span class="add-remove-btn " data-${
                      movie.isAdded ? 'remove' : 'add'
                    }="${movie.imdbID}">
                      <img class='icon-btn' src="icons/icon-${selectBtnIcon()}.svg" data-${
      movie.isAdded ? 'remove' : 'add'
    }="${movie.imdbID}" />
                      ${movie.isAdded ? 'Remove' : 'Watchlist'}
                    </span>
                  </div>
                  <p class="movie-plot">${movie.Plot}</p>
                </div>
                <hr>`
  })
  return feedHtml
}
