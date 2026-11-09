/** @format */

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

    th.className =
      "sticky left-0 z-10 w-[90px] min-w-[90px] border border-gray-300 bg-white px-4 py-3 text-center";
    th.textContent = day;

    tr.appendChild(th);

    schoolPeriods.forEach((period) => {
      const td = document.createElement("td");

      td.className =
        "border border-gray-300 px-1 py-3 text-center align-middle";

      if (period.type === "break") {
        td.textContent = period.label;

        td.classList.add(
          "bg-gray-200",
          "text-xs",
          "text-gray-600",
          "font-semibold",
        );
      } else {
        const scheduledLesson = weeklyLessons.find((lesson) => {
          return lesson.day === day && lesson.periodId === period.id;
        });

        if (scheduledLesson) {
          const lessonCard = document.createElement("div");
          lessonCard.className =
            "rounded-md bg-gray-100 px-2 py-3 min-h-[65px] flex flex-col items-center justify-center";

          const subjectElement = document.createElement("div");
          const classElement = document.createElement("div");

          subjectElement.textContent = scheduledLesson.subject;
          classElement.textContent = scheduledLesson.class;

          subjectElement.className =
            "text-xs sm:text-sm font-semibold text-gray-900 text-center break-words";
          classElement.className = "mt-1 text-[11px] text-gray-500 text-center";

          td.appendChild(lessonCard);
          lessonCard.append(subjectElement, classElement);
        } else {
          td.textContent = " -- ";
        }
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
  headingCell.className =
    "sticky left-0 z-20 w-[90px] min-w-[90px] border border-gray-300 px-4 py-3 text-center";
  headingCell.textContent = "Day";

  headerRow.append(headingCell);

  schoolPeriods.forEach((period) => {
    const tableHeader = document.createElement("th");
    tableHeader.textContent = `${period.startTime}  -  ${period.endTime}`;
    tableHeader.className =
      "border border-gray-300 px-2 py-3 text-center text-xs sm:text-sm w-[110px]";

    if (period.breakFor) {
      const breakLabel = document.createElement("span");

      breakLabel.textContent =
        period.breakFor === "junior" ? "Junior Break" : "Senior Break";

      breakLabel.className =
        "block mt-1 text-[10px] font-semibold text-gray-600";

      tableHeader.appendChild(breakLabel);
      tableHeader.classList.add("bg-gray-100");
    }

    headerRow.appendChild(tableHeader);

    if (period.type === "break") {
      tableHeader.classList.add("bg-gray-200", "text-gray-700");

      const breakLabel = document.createElement("span");

      breakLabel.textContent = "Short Break";
      breakLabel.className = "block mt-1 text-[10px] font-semibold";

      tableHeader.appendChild(breakLabel);
    }
  });

  weeklyTimetableHeader.appendChild(headerRow);
}

export function updateTimetableVisibility() {
  const emptyState = document.getElementById("emptyTimetableState");
  const timetableContainer = document.getElementById(
    "weeklyTimetableContainer",
  );

  const weeklyLessons = getWeeklyLessons() ?? [];

  const hasLessons = weeklyLessons.length > 0;

  emptyState.classList.toggle("hidden", hasLessons);
  timetableContainer.classList.toggle("hidden", !hasLessons);

  return hasLessons;
}
