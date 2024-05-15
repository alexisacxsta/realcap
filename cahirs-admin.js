document.addEventListener("DOMContentLoaded", function() {
  const tablesChairsContainer = document.getElementById("tables-chairs");
  const computerSeatsContainer = document.getElementById("computer-seats");
  const graduateStudyContainer = document.getElementById("graduate-seats");
  const tablesChairsAvailableSeatCount = document.getElementById("tables-chairs-available-seat-count");
  const computerSeatsAvailableSeatCount = document.getElementById("computer-seats-available-seat-count");
  const graduateStudyAvailableSeatCount = document.getElementById("graduate-seats-available-seat-count");

  const TOTAL_SEATS = 199;
  const TABLES_CHAIRS_SEATS = 160;
  const COMPUTER_SEATS = 9;
  const GRADUATE_SEATS = 30;

  // Initialize seats state from local storage or set to empty array
  let seatsState = JSON.parse(localStorage.getItem("seatsState"));
  if (!seatsState || seatsState.length !== TOTAL_SEATS) {
    seatsState = Array(TOTAL_SEATS).fill(false); // Ensure seatsState has TOTAL_SEATS elements
    localStorage.setItem("seatsState", JSON.stringify(seatsState)); // Initialize local storage
  }

  // Function to render seats and update available seat count
  function renderSeats(container, availableSeatCountElement, start, totalSeats) {
    container.innerHTML = ""; // Clear container
    let availableCount = 0;
    seatsState.slice(start, start + totalSeats).forEach((occupied, index) => {
      const seat = document.createElement("div");
      seat.classList.add(occupied ? "occupied" : "seat");
      seat.dataset.id = start + index;
      container.appendChild(seat);
      if (!occupied) {
        availableCount++;
      }
    });
    availableSeatCountElement.textContent = availableCount;
  }

  renderSeats(tablesChairsContainer, tablesChairsAvailableSeatCount, 0, TABLES_CHAIRS_SEATS); // Initial render for tables and chairs
  renderSeats(computerSeatsContainer, computerSeatsAvailableSeatCount, TABLES_CHAIRS_SEATS, COMPUTER_SEATS); // Initial render for computer seats
  renderSeats(graduateStudyContainer, graduateStudyAvailableSeatCount, TABLES_CHAIRS_SEATS + COMPUTER_SEATS, GRADUATE_SEATS); // Initial render for graduate study

  // Seat click handler
  function seatClickHandler(event, container, availableSeatCountElement, start, totalSeats) {
    if (event.target.classList.contains("seat") || event.target.classList.contains("occupied")) {
      const seatId = parseInt(event.target.dataset.id);
      seatsState[seatId] = !seatsState[seatId]; // Toggle seat state
      localStorage.setItem("seatsState", JSON.stringify(seatsState)); // Update local storage
      renderSeats(container, availableSeatCountElement, start, totalSeats); // Update view
    }
  }

  tablesChairsContainer.addEventListener("click", function(event) {
    seatClickHandler(event, tablesChairsContainer, tablesChairsAvailableSeatCount, 0, TABLES_CHAIRS_SEATS);
  });

  computerSeatsContainer.addEventListener("click", function(event) {
    seatClickHandler(event, computerSeatsContainer, computerSeatsAvailableSeatCount, TABLES_CHAIRS_SEATS, COMPUTER_SEATS);
  });

  graduateStudyContainer.addEventListener("click", function(event) {
    seatClickHandler(event, graduateStudyContainer, graduateStudyAvailableSeatCount, TABLES_CHAIRS_SEATS + COMPUTER_SEATS, GRADUATE_SEATS);
  });
});
