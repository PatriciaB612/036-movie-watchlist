searchBtn.addEventListener('click', function () {
  mainDiv.innerHTML = ''
  fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${inputEl.value}`)
    .then((res) => res.json())
    .then((data) => {
      for (const movie of data.Search) {
        const imdbId = movie.imdbID
        fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${imdbId}`)
          .then((res) => res.json())
          .then((data) => {
            console.log(data)
            mainDiv.style.paddingTop = '4em'
            mainDiv.innerHTML += `
                                 <div class="movie-grid">
                                   <img src="${
                                     data.Poster
                                   }" class="movie-poster">
                                   <div class="main-info">
                                     <p class="movie-title">${data.Title}</p>
                                     <img src="icons/icon-star.svg" class="icon-star"/>
                                     <p class="movie-rating">${data.Ratings[0].Value.slice(
                                       0,
                                       3
                                     )}</p>
                                   </div>
                                   <div class="secondary-info">
                                     <p>${data.Runtime}</p>
                                     <p>${data.Genre}</p>
                                     <div class="add-to-watchlist">
                                       <img src="icons/icon-add.svg" />
                                       <p>Watchlist</p>
                                     </div>  
                                   </div>
                                   <p class="movie-plot">${data.Plot}</p>
                                 </div>
                                 <hr>
            `
          })
      }
    })
})
