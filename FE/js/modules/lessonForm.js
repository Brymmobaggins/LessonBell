/** @format */

import { getWeeklyLessons, saveWeeklyLessons } from "../services/storage.js";
import { closeLessonFormModal } from "./lessonModal.js";
import { renderTimetableBody, updateTimetableVisibility } from "./timeTableRenderer.js";
import { teachingPeriods } from "./schoolPeriods.js";

export function initializeLessonForm() {
  // Your implementation
  const addLessonForm = document.getElementById("addLessonForm");

  teachingPeriods.forEach((period) => {
    const optionElement = document.createElement("option");

    optionElement.value = period.id;

    optionElement.textContent = `${period.label} - ${period.startTime} - ${period.endTime}`;

    lessonPeriod.appendChild(optionElement);
  });

  if (addLessonForm) {
    addLessonForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const lessonSubject = document.getElementById("subject").value;
      const lessonClass = document.getElementById("lessonClass").value;
      const lessonDay = document.getElementById("lessonDay").value;
      const lessonPeriod = document.getElementById("lessonPeriod");

      const selectedPeriodId = Number(lessonPeriod.value);

      const weeklyLessons = getWeeklyLessons() ?? [];

      const selectedTeachingPeriod = teachingPeriods.find((teachingPeriod) => {
        return teachingPeriod.id === selectedPeriodId;
      });

      if (!selectedTeachingPeriod) {
        alert("Please select a valid teaching period.");
        return;
      }

      const lessonRecord = {
        subject: lessonSubject,
        class: lessonClass,
        day: lessonDay,
        periodId: selectedTeachingPeriod.id,
        startTime: selectedTeachingPeriod.startTime,
        endTime: selectedTeachingPeriod.endTime,
      };

      const hasTimeConflict = weeklyLessons.some((existingLesson) => {
        if (
          existingLesson.periodId === lessonRecord.periodId &&
          existingLesson.day === lessonRecord.day
        ) {
          return true;
        }
      });

      if (hasTimeConflict) {
        return alert("You alreay have a lessson sheduled for this period");
      }

      weeklyLessons.push(lessonRecord);

      saveWeeklyLessons(weeklyLessons);

      updateTimetableVisibility();

      document.getElementById("emptyTimetableState").classList.add("hidden");

      document
        .getElementById("weeklyTimetableContainer")
        .classList.remove("hidden");

      renderTimetableBody();

      document.getElementById("addLessonForm").reset();

      closeLessonFormModal();
    });
  }
}
