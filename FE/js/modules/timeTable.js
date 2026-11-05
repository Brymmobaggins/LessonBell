/** @format */

import { getWeeklyLessons, saveWeeklyLessons } from "../services/storage.js";
import { showScreen } from "./navigation.js";
import { schoolPeriods, teachingPeriods } from "./schoolPeriods.js";

export function initializeTimetable() {
  const addTimetableBtn = document.getElementById("addTimetableBtn");
  const addFirstLessonBtn = document.getElementById("addFirstLessonBtn");
  const cancelAddLessonBtn = document.getElementById("cancelAddLessonBtn");
  const addLessonForm = document.getElementById("addLessonForm");
  const lessonPeriod = document.getElementById("lessonPeriod");

  if (addTimetableBtn) {
    addTimetableBtn.addEventListener("click", () => {
      showScreen("timetableScreen");
    });
  }

  if (addFirstLessonBtn) {
    addFirstLessonBtn.addEventListener("click", () => {
      openLessonFormModal();
    });
  }
  if (cancelAddLessonBtn && addLessonForm) {
    cancelAddLessonBtn.addEventListener("click", () => {
      addLessonForm.reset();
      closeLessonFormModal();
    });
  }
  teachingPeriods.forEach((period) => {
    const optionElement = document.createElement("option");

    optionElement.value = period.id;

    optionElement.textContent = `${period.label} - ${period.startTime} - ${period.endTime}`;

    lessonPeriod.appendChild(optionElement);
  });

  const weeklyLessons = getWeeklyLessons();

  console.log("Weekly lessons:", weeklyLessons);
  console.log("Is an array?", Array.isArray(weeklyLessons));

  if (addLessonForm) {
    addLessonForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const lessonSubject = document.getElementById("subject").value;
      const lessonClass = document.getElementById("lessonClass").value;
      const lessonDay = document.getElementById("lessonDay").value;

      const selectedPeriodId = Number(lessonPeriod.value);

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

      renderTimetableHeader();

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
     
        td.append(subjectElement, classElement)
        
      } else {
        td.textContent = " -- ";
      }

      tr.appendChild(td);
    });

    weeklyTimetableBody.appendChild(tr);
  });
}

export function openLessonFormModal() {
  const addLessonModal = document.getElementById("addLessonModal");

  if (!addLessonModal) return;
  addLessonModal.classList.remove("hidden");
  addLessonModal.classList.add("flex");
}

export function closeLessonFormModal() {
  const addLessonModal = document.getElementById("addLessonModal");

  if (!addLessonModal) return;
  addLessonModal.classList.add("hidden");
  addLessonModal.classList.remove("flex");
}
