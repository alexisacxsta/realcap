document.addEventListener("DOMContentLoaded", function() {
  const tablesChairsContainer = document.getElementById("tables-chairs");
  const computerSeatsContainer = document.getElementById("computer-seats");
  const graduateStudyContainer = document.getElementById("graduate-seats");
  const tablesChairsAvailableSeatCount = document.getElementById("tables-chairs-available-seat-count");
  const computerSeatsAvailableSeatCount = document.getElementById("computer-seats-available-seat-count");
  const graduateStudyAvailableSeatCount = document.getElementById("graduate-seats-available-seat-count");

  // Function to render seats and update available seat count
  function renderSeats(container, availableSeatCountElement, totalSeats, seatsState) {
    container.innerHTML = ""; // Clear container
    let availableCount = 0;
    seatsState.slice(0, totalSeats).forEach((occupied, index) => {
      const seat = document.createElement("div");
      seat.classList.add(occupied ? "occupied" : "seat");
      container.appendChild(seat);
      if (!occupied) {
        availableCount++;
      }
    });
    availableSeatCountElement.textContent = availableCount;
  }

  // Function to update seat availability in real-time
  function updateSeats(seatsState) {
    renderSeats(tablesChairsContainer, tablesChairsAvailableSeatCount, 160, seatsState);
    renderSeats(computerSeatsContainer, computerSeatsAvailableSeatCount, 9, seatsState);
    renderSeats(graduateStudyContainer, graduateStudyAvailableSeatCount, 30, seatsState);
  }

  // Initialize seats state from local storage or set to empty array
  let seatsState = JSON.parse(localStorage.getItem("seatsState"));
  if (!seatsState || seatsState.length !== 199) {
    seatsState = Array(199).fill(false); // Ensure seatsState has 199 elements
    localStorage.setItem("seatsState", JSON.stringify(seatsState)); // Initialize local storage
  }

  // Update seats initially
  updateSeats(seatsState);

  // Listen for changes in local storage
  window.addEventListener("storage", function(event) {
    if (event.key === "seatsState") {
      updateSeats(JSON.parse(event.newValue));
    }
  });

  // Disable seat clicking
  tablesChairsContainer.addEventListener("click", function(event) {
    event.preventDefault();
  });

  computerSeatsContainer.addEventListener("click", function(event) {
    event.preventDefault();
  });

  graduateStudyContainer.addEventListener("click", function(event) {
    event.preventDefault();
  });
});
