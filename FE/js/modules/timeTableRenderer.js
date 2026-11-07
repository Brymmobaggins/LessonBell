

import { getWeeklyLessons } from "../services/storage.js";
import { schoolPeriods } from "./schoolPeriods.js";

const schoolDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
export function renderTimetableBody() {
  const weeklyTimetableBody = document.getElementById("weeklyTimetableBody");

  if (!weeklyTimetableBody) return;
  weeklyTimetableBody.replaceChildren();

  const weeklyLessons = getWeeklyLessons();

  schoolDays.forEach((day) => {
    const tr = document.createElement("tr");

    const th = document.createElement("th");

    th.className = "border border-gray-300 px-4 py-3 text-center";
    th.textContent = day;

    tr.appendChild(th);

    schoolPeriods.forEach((period) => {
      const td = document.createElement("td");
      td.className =
        "border border-gray-300 px-1 py-3 text-center align-middle";

      const scheduledLesson = weeklyLessons.find((lesson) => {
        return lesson.day === day && lesson.periodId === period.id;
      });

      if (scheduledLesson) {
        const subjectElement = document.createElement("div");
        const classElement = document.createElement("div");

        subjectElement.textContent = scheduledLesson.subject;
        classElement.textContent = scheduledLesson.class;

        subjectElement.className = "font-semibold text-gray-800";
        classElement.className = "text-xs text-gray-500 mt-1";

        td.append(subjectElement, classElement);
      } else {
        td.textContent = " -- ";
      }

      tr.appendChild(td);
    });

    weeklyTimetableBody.appendChild(tr);
  });
}

export function renderTimetableHeader() {
  const weeklyTimetableHeader = document.getElementById(
    "weeklyTimetableHeader",
  );

  if (!weeklyTimetableHeader) return;
  weeklyTimetableHeader.replaceChildren();

  const headerRow = document.createElement("tr");

  const headingCell = document.createElement("th");
  headingCell.className = "border border-gray-300 px-4 py-3 text-center";
  headingCell.textContent = "Day";

  headerRow.append(headingCell);

  schoolPeriods.forEach((period) => {
    const tableHeader = document.createElement("th");

    tableHeader.textContent = `${period.startTime}  -  ${period.endTime}`;

    tableHeader.className =
      "border border-gray-300 px-1 py-3 text-center text-xs sm:px-2 sm:text-sm";

    headerRow.appendChild(tableHeader);
  });

  weeklyTimetableHeader.appendChild(headerRow);
}
export function updateTimetableVisibility() {
  const emptyState = document.getElementById("emptyTimetableState");
  const timetableContainer = document.getElementById(
    "weeklyTimetableContainer"
  );

  const weeklyLessons = getWeeklyLessons() ?? [];

  const hasLessons = weeklyLessons.length > 0;

  emptyState.classList.toggle("hidden", hasLessons);
  timetableContainer.classList.toggle("hidden", !hasLessons);

  return hasLessons;
}