/** @format */

import { getWeeklyLessons } from "../services/storage.js";
import { convertTimeToMinutes } from "../utils.js";
import { teachingPeriods } from "./schoolPeriods.js";

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
    cardDiv.className = "rounded-xl border border-gray-200 bg-white p-4";

    const lessonMeta = document.createElement("div");
    lessonMeta.className = "flex flex-wrap items-center justify-between gap-3";

    const periodEl = document.createElement("span");
    periodEl.className = "text-sm font-semibold text-gray-500 uppercase bg-gray-100 rounded-xl px-2";
    periodEl.textContent = selectedPeriod?.label ?? "Period";

    const timeEl = document.createElement("span");
    timeEl.textContent = "text-sm text-gray-500 whitespace-nowrap";
    timeEl.textContent = `${lesson.startTime} - ${lesson.endTime}`;

    const subjectEl = document.createElement("h3");
    subjectEl.className =
      "mt-2 text-base font-semibold text-gray-900 break-words";
    subjectEl.textContent = lesson.subject;

    const classEl = document.createElement("p");
    classEl.className = "mt-1 text-sm text-gray-500"
    classEl.textContent = lesson.class;

    cardDiv.append(lessonMeta, periodEl, timeEl, subjectEl, classEl);

    lessonMeta.append(periodEl, timeEl);

    mobileTimetableContent.appendChild(cardDiv);
  });
}

export function initializeMobileTimetable() {
  const mobileDaySelect = document.getElementById("mobileDaySelect");

  mobileDaySelect.addEventListener("change", renderMobileTimetable);

  renderMobileTimetable();
}
