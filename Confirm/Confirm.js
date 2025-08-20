const seatsContainer = document.getElementById("seats");

// Generate 40 seats as divs.seat
for (let i = 1; i <= 72; i++) {
  const seat = document.createElement("div");
  seat.classList.add("seat");

  seat.id = `${i}`; 
  seat.innerHTML = `<i class="fa-solid fa-chair"></i>`;

  // addEventListener click to seat
  seat.addEventListener("click", () => toggleSeat(seat));

  seatsContainer.appendChild(seat);
}


// Toggle seat style
function toggleSeat(seat) {
  if (!seat.classList.contains("booked")) {
    seat.classList.toggle("selected");
  }
}


// Confirm Booking
function confirmBooking() {
  // Get all selected seats 
  let selectedSeats = [...document.querySelectorAll(".seat.selected")]
    .map(seat => seat.id);

  if (selectedSeats.length === 0) {
    alert("Please select at least one seat.");
    return;
  }

  // Load previously booked seats from localStorage
  let bookedSeats = JSON.parse(localStorage.getItem("bookedSeats")) || [];

  // Merge with new selections
  bookedSeats = [...new Set([...bookedSeats, ...selectedSeats])];

  // Save back to localStorage
  localStorage.setItem("bookedSeats", JSON.stringify(bookedSeats));


  //selected Seats for Cookie
  let MySelectedSeats = [...document.querySelectorAll(".seat.selected")]
  .map(seat => seat.id)
  .join(","); // convert array to comma string

  // Mark seats as booked
  selectedSeats.forEach(id => {
    let seat = document.getElementById(id);
    if (seat) {
      seat.classList.remove("selected");
      seat.classList.add("booked");
    }
  });

  //Add Movie To Cookie
//Movie ID
let movieId = window.location.search.split("=")[1];
document.cookie = "booking=" + movieId + "," + MySelectedSeats +  
                  "; path=/;"; 

//Add Movie To localStorage
let bookingStr = movieId + "," + MySelectedSeats;
// If nothing saved yet, just set it
localStorage.setItem("bookings", bookingStr);



  
alert("Booking confirmed! Seats: " + selectedSeats.join(", "));
}//End of confirmBooking

// Load booked seats on page load
function loadFromLocalStorage() {
  let bookedSeats = JSON.parse(localStorage.getItem("bookedSeats")) || [];

  bookedSeats.forEach(id => {
    let seat = document.getElementById(id);
    if (seat) {
      seat.classList.add("booked");
    }
  });

  //localStorage.setItem("bookedSeats" , JSON.stringify([]))
}

loadFromLocalStorage();

