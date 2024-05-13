document.addEventListener("DOMContentLoaded", function() {
  const tablesChairsContainer = document.getElementById("tables-chairs");
  const computerSeatsContainer = document.getElementById("computer-seats");
  const graduateStudyContainer = document.getElementById("graduate-seats");
  const tablesChairsAvailableSeatCount = document.getElementById("tables-chairs-available-seat-count");
  const computerSeatsAvailableSeatCount = document.getElementById("computer-seats-available-seat-count");
  const graduateStudyAvailableSeatCount = document.getElementById("graduate-seats-available-seat-count");

  // Initialize seats state from local storage or set to empty array
  let seatsState = JSON.parse(localStorage.getItem("seatsState"));
  if (!seatsState || seatsState.length !== 199) {
    seatsState = Array(199).fill(false); // Ensure seatsState has 199 elements
    localStorage.setItem("seatsState", JSON.stringify(seatsState)); // Initialize local storage
  }

  // Function to render seats and update available seat count
  function renderSeats(container, availableSeatCountElement, totalSeats) {
    container.innerHTML = ""; // Clear container
    let availableCount = 0;
    seatsState.slice(0, totalSeats).forEach((occupied, index) => {
      const seat = document.createElement("div");
      seat.classList.add(occupied ? "occupied" : "seat");
      seat.dataset.id = index;
      container.appendChild(seat);
      if (!occupied) {
        availableCount++;
      }
    });
    availableSeatCountElement.textContent = availableCount;
  }

  renderSeats(tablesChairsContainer, tablesChairsAvailableSeatCount, 160); // Initial render for tables and chairs
  renderSeats(computerSeatsContainer, computerSeatsAvailableSeatCount, 9); // Initial render for computer seats
  renderSeats(graduateStudyContainer, graduateStudyAvailableSeatCount, 30); // Initial render for graduate study

  // Seat click handler
  function seatClickHandler(event, container, availableSeatCountElement, totalSeats) {
    // Check if the clicked element is a seat
    if (event.target.classList.contains("seat") || event.target.classList.contains("occupied")) {
      const seatId = parseInt(event.target.dataset.id);
      seatsState[seatId] = !seatsState[seatId]; // Toggle seat state
      localStorage.setItem("seatsState", JSON.stringify(seatsState)); // Update local storage
      renderSeats(container, availableSeatCountElement, totalSeats); // Update view
    }
  }

  tablesChairsContainer.addEventListener("click", function(event) {
    seatClickHandler(event, tablesChairsContainer, tablesChairsAvailableSeatCount, 160);
  });

  computerSeatsContainer.addEventListener("click", function(event) {
    seatClickHandler(event, computerSeatsContainer, computerSeatsAvailableSeatCount, 9);
  });

  graduateStudyContainer.addEventListener("click", function(event) {
    seatClickHandler(event, graduateStudyContainer, graduateStudyAvailableSeatCount, 30);
  });
});
