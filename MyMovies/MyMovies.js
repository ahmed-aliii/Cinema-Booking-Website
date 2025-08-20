// --- Get Bookings ---
let bookingsStr = localStorage.getItem("bookings"); 
let BookingsInfo = bookingsStr ? bookingsStr.split(",") : [];

// --- Fetch movie JSON ---
fetch("../movies.json")
.then(res => res.json())
.then(movies => {
    const container = document.getElementById("movieContainer");

    if (BookingsInfo.length > 0) {
        // Take first booking
        let movieId = BookingsInfo[0];                 // "2"
        let bookedSeats = BookingsInfo.slice(1);       // ["19", "31"]


        if (movies) {
            container.innerHTML = `
            <div class="movie-card">
                <img class="poster" src="${movies[movieId].Poster}" alt="${movies[movieId].Title} Poster">
                <div class="movies-details">
                    <h2 class="title">${movies[movieId].Title} (${movies[movieId].Year})</h2>
                    <p class="genre"><i class="fa-solid fa-tags"></i> ${movies[movieId].Genre}</p>
                    <p class="rating"><i class="fa-solid fa-star"></i> ${movies[movieId].imdbRating}</p>
                    <p class="date"><i class="fa-solid fa-calendar"></i> ${movies[movieId].Date}</p>
                    <p class="actors"><i class="fa-solid fa-user-group"></i> ${movies[movieId].Actors.join(", ")}</p>
                    <p class="booking"><i class="fa-solid fa-chair"></i> Seats Booked: ${bookedSeats.join(", ") || "None"}</p>
                </div>
            </div>
            `;
        } else {
            container.innerHTML = "<h2>Movie not found</h2>";
        }
    } else {
        container.innerHTML = "<h2>No bookings yet</h2>";
    }
});
