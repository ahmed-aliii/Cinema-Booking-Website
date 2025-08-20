
//await works only inside async function 
async function loadMovies() {
  const response = await fetch("../movies.json");
  const movies = await response.json(); // ✅ array of movies


    const container = document.getElementById("movies");
    movies.forEach((movie, index) => {
        const card = document.createElement("div");
        card.classList.add("movie-card");
        card.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}">
            <div class="movie-info">
                <h3>${movie.Title}</h3>
                <p>Year: ${movie.Year}</p>
                <p>Rating: ⭐ ${movie.imdbRating}</p>
                <button class="bookBtn" onclick="window.location.href='../Details/Details.html?id=${index}'">
                    Full Details 
                </button>
            </div>
        `;
        container.appendChild(card);
    });


  console.log(movies);
}

loadMovies();



