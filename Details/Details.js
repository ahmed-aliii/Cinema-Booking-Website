

async function loadMovieDetails() {
    //Get Movie Id
    const id = window.location.search.split("=")[1]; 

    //get all movies
    const movies = await fetch("../movies.json").then(res => res.json())


    //
    if (id !== null && movies[id]) {
        const movie = movies[id];

        const container = document.querySelector(".container");
        container.innerHTML = `
            <h1>${movie.Title}</h1>
            <img src="${movie.Poster}" alt="${movie.Title}">
            <p><strong>Year:</strong> ${movie.Year}</p>
            <p><strong>Genre:</strong> ${movie.Genre}</p>
            <p><strong>IMDB Rating:⭐ </strong> ${movie.imdbRating}</p>
            <p><strong>Type:</strong> ${movie.Type}</p>
            <p><strong>Show At:</strong> ${movie.Date}</p>
            <p><strong>Description:</strong> ${movie.Description}</p>
            <p><strong>Actors:</strong> ${movie.Actors.join(", ")}</p>
            <button class="bookBtn" onclick="window.location.href='../Confirm/Confirm.html?id=${id}'">
                    Book Now 
            </button>
        `;
    }
    
}

loadMovieDetails();

