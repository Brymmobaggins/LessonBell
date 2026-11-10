/** @format */

import { getWeeklyLessons } from "../services/storage.js";
import { teachingPeriods } from "./schoolPeriods.js";
import { renderTimetableBody } from "./timeTableRenderer.js";

export function renderMobileTimetable() {
  const selectedDay = document.getElementById("mobileDaySelect").value;

  const weeeklyLessonsArr = getWeeklyLessons() ?? [];

  const selectedDayLessonsArr = weeeklyLessonsArr.filter((lesson) => {
    return lesson.day === selectedDay;
  });

  selectedDayLessonsArr.sort((lessonA, lessonB) => {
    const lessonAStart = convertTimeToMinutes(lessonA.startTime);
    const lessonBStart = convertTimeToMinutes(lessonB.startTime);
    return lessonAStart - lessonBStart;
  });

  const mobileTimetableContent = document.getElementById(
    "mobileTimetableContent",
  );
  const mobileTimetableEmptyState = document.getElementById(
    "mobileTimetableEmptyState",
  );

  if (!mobileTimetableContent) return;
  mobileTimetableContent.replaceChildren();

  if (selectedDayLessonsArr.length == 0) {
    mobileTimetableEmptyState.classList.remove("hidden");
    mobileTimetableContent.classList.add("hidden");
    return;
  }

  mobileTimetableEmptyState.classList.add("hidden");
  mobileTimetableContent.classList.remove("hidden");

  selectedDayLessonsArr.forEach((lesson) => {
    const selectedPeriod = teachingPeriods.find((period) => {
      return period.id === lesson.periodId;
    });

    const cardDiv = document.createElement("div");

    const periodEl = document.createElement("span");
    periodEl.textContent = selectedPeriod?.label ?? "Period";

    const timeEl = document.createElement("span");
    timeEl.textContent = `${lesson.startTime} - ${lesson.endTime}`;

    const subjectEl = document.createElement("p");
    subjectEl.textContent = lesson.subject;

    const classEl = document.createElement("p");
    classEl.textContent = lesson.class;

    cardDiv.append(periodEl, timeEl, subjectEl, classEl);

    mobileTimetableContent.appendChild(cardDiv);
  });
}

export function initializeMobileTimetable() {
  const mobileDaySelect = document.getElementById("mobileDaySelect");

  mobileDaySelect.addEventListener("change", renderMobileTimetable);

  renderMobileTimetable();
}
