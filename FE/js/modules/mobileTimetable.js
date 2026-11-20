/** @format */

import { getWeeklyLessons } from "../services/storage.js";
import { convertTimeToMinutes } from "../utils.js";
import { teachingPeriods } from "./schoolPeriods.js";

export function renderMobileTimetable() {
  const mobileDaySelect = document.getElementById("mobileDaySelect");

  const mobileTimetableContent = document.getElementById(
    "mobileTimetableContent",
  );

  const mobileTimetableEmptyState = document.getElementById(
    "mobileTimetableEmptyState",
  );

  if (
    !mobileDaySelect ||
    !mobileTimetableContent ||
    !mobileTimetableEmptyState
  ) {
    return;
  }

  const selectedDay = mobileDaySelect.value;

  const weeklyLessonsArr = getWeeklyLessons();

  const selectedDayLessonsArr = weeklyLessonsArr.filter((lesson) => {
    return lesson.day === selectedDay;
  });

  selectedDayLessonsArr.sort((lessonA, lessonB) => {
    const lessonAStart = convertTimeToMinutes(lessonA.startTime);
    const lessonBStart = convertTimeToMinutes(lessonB.startTime);
    return lessonAStart - lessonBStart;
  });

  mobileTimetableContent.replaceChildren();

  if (selectedDayLessonsArr.length === 0) {
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
    periodEl.className =
      "text-sm font-semibold text-gray-500 uppercase bg-gray-100 rounded-xl px-3";
    periodEl.textContent = selectedPeriod?.label ?? "Period";

    const timeEl = document.createElement("span");
    timeEl.className = "text-sm text-gray-500 whitespace-nowrap";
    timeEl.textContent = `${lesson.startTime} - ${lesson.endTime}`;

    // const subjectEl = document.createElement("h3");
    // subjectEl.className =
    //   "mt-2 text-base font-semibold text-gray-900 break-words";
    // subjectEl.textContent = lesson.subject;

    const classEl = document.createElement("p");
    classEl.className = "mt-1.5 text-xs font-semibold text-gray-900";
    classEl.textContent = lesson.class;

    lessonMeta.append(periodEl, timeEl);

    cardDiv.append(lessonMeta, classEl);

    mobileTimetableContent.appendChild(cardDiv);
  });
}

export function initializeMobileTimetable() {
  const mobileDaySelect = document.getElementById("mobileDaySelect");

  if(!mobileDaySelect) return

  mobileDaySelect.addEventListener("change", renderMobileTimetable);

  renderMobileTimetable();
}
