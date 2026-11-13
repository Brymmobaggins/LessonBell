/** @format */

import { schoolPeriods } from "./schoolPeriods.js";

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
  renderDailyPeriods();
}

export function renderDailyPeriods() {
  const dailyTimetableContainer = document.getElementById(
    "dailyTimetableContainer",
  );

  if (!dailyTimetableContainer) return;
  dailyTimetableContainer.replaceChildren();

  schoolPeriods.forEach((period) => {
    if (period.type === "break") {
      const breakWrapper = document.createElement("div");
      breakWrapper.className =
        "flex items-center justify-between gap-3 rounded-xl border border-dashed border-gray-200 bg-gray-50 px-4 py-4";

      const breakLabel = document.createElement("p");

      breakLabel.className =
        "inline-flex w-fit rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700";
      breakLabel.textContent = period.label;

      const breakTime = document.createElement("span");
      breakTime.className = "text-xs text-gray-600 whitespace-nowrap";
      breakTime.textContent = `${period.startTime} - ${period.endTime}`;

      breakWrapper.append(breakLabel, breakTime);

      return dailyTimetableContainer.appendChild(breakWrapper);
    }

    const periodCard = document.createElement("div");
    periodCard.className =
      "rounded-xl border border-gray-200 bg-white p-3 space-y-3 shadow-sm";

    const periodMeta = document.createElement("div");
    periodMeta.className = "flex items-center justify-between gap-3";

    const periodEl = document.createElement("p");
    periodEl.className = "text-sm font-semibold text-gray-700";
    periodEl.textContent = period.label;

    const timeEl = document.createElement("span");
    timeEl.className = "text-xs text-gray-500 whitespace-nowrap";
    timeEl.textContent = `${period.startTime} - ${period.endTime}`;

    const classSelect = document.createElement("select");
    classSelect.className =
      "w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-3 text-sm text-gray-600 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100";

    classSelect.dataset.periodId = period.id;

    const defaultOption = document.createElement("option");

    defaultOption.value = "";
    defaultOption.textContent = "Select your class";
    defaultOption.disabled = true;
    defaultOption.selected = true;

    periodMeta.append(periodEl, timeEl);
    
    classSelect.appendChild(defaultOption);

    periodCard.append(periodMeta, classSelect);


    if (period.breakFor) {
      const breakLabel = document.createElement("p");
      breakLabel.className =
        "inline-flex w-fit rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700";

      breakLabel.textContent =
        period.breakFor === "junior" ? "Junior on Break" : "Senior on Break";

      periodCard.appendChild(breakLabel);
    }

    dailyTimetableContainer.appendChild(periodCard);
  });
}
