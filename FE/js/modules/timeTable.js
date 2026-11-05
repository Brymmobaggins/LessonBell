/** @format */

import { showScreen } from "./navigation.js";
import {
  renderTimetableHeader,
} from "./timeTableRenderer.js";
import { initializeLessonForm } from "./lessonForm.js";

import { openLessonFormModal, closeLessonFormModal } from "./lessonModal.js";

export function initializeTimetable() {
  const addTimetableBtn = document.getElementById("addTimetableBtn");
  const addFirstLessonBtn = document.getElementById("addFirstLessonBtn");
  const cancelAddLessonBtn = document.getElementById("cancelAddLessonBtn");

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


  renderTimetableHeader();

 initializeLessonForm()

 
}
