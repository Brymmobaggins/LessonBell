/** @format */

export function initializeTimetableConfiguration() {
  const weekdayNavigation = document.getElementById("weekdayNavigation");
  const selectedDayHeading = document.getElementById("selectedDayHeading");

  const saveDailyTimetableBtn = document.getElementById(
    "saveDailyTimetableBtn",
  );

  let selectedDay = "Monday";

  if (weekdayNavigation) {
    weekdayNavigation.addEventListener("click", (event) => {
      const clickedButton = event.target.closest("button[data-day]");

      if (!clickedButton) return;

      selectedDay = clickedButton.dataset.day;

      selectedDayHeading.textContent = `${selectedDay}'s Lessons`;

      saveDailyTimetableBtn.textContent = `Save ${selectedDay}'s TimeTable`;


      const dayButtons = document.querySelectorAll("button[data-day]");
  
      dayButtons.forEach((button) => {
        const isActive = button.dataset.day === selectedDay;
        button.setAttribute("aria-pressed", isActive ? "true" : "false");

         button.classList.toggle("bg-gray-800", isActive);
        button.classList.toggle("text-white", isActive);

        button.classList.toggle("bg-gray-100", !isActive);
        button.classList.toggle("text-gray-600", !isActive);
      });



    });

  }
}

export function renderDailyPeriod(){

    const dailyTimetableContainer = document.getElementById('dailyTimetableContainer')

    if(!dailyTimetableContainer) return
    dailyTimetableContainer.replaceChildren()

    
}