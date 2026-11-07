/** @format */

import { showScreen } from "./navigation.js";
import { renderTimetableHeader } from "./timeTableRenderer.js";
import { initializeLessonForm } from "./lessonForm.js";
import {updateTimetableVisibility,renderTimetableBody} from "./timeTableRenderer.js"

import { openLessonFormModal, closeLessonFormModal } from "./lessonModal.js";

export function initializeTimetable() {
  const addTimetableBtn = document.getElementById("addTimetableBtn");
  const addFirstLessonBtn = document.getElementById("addFirstLessonBtn");
  const addLessonBtn = document.getElementById("addLessonBtn");
  const cancelAddLessonBtn = document.getElementById("cancelAddLessonBtn");

  if (addTimetableBtn) {
    addTimetableBtn.addEventListener("click", () => {
      showScreen("timetableScreen");
    });
  }

  if (addLessonBtn) {
    addLessonBtn.addEventListener("click", () => {
      openLessonFormModal();
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

  const hasLessons = updateTimetableVisibility();

  renderTimetableHeader();

  if (hasLessons) {
    renderTimetableBody();
  }

  renderTimetableHeader();

  initializeLessonForm();
}
