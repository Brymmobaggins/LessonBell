/** @format */

import { showScreen } from "./navigation.js";
import{renderMobileTimetable} from "./mobileTimetable.js"

import {
  renderTimetableHeader,
  updateTimetableVisibility,
  renderTimetableBody,
} from "./timeTableRenderer.js";

import { openTimetableConfigurationModal } from "./lessonModal.js";

export function initializeTimetable() {
  const addTimetableBtn = document.getElementById("addTimetableBtn");
  const addFirstLessonBtn = document.getElementById("addFirstLessonBtn");
  const addLessonBtn = document.getElementById("addLessonBtn");

  if (addTimetableBtn) {
    addTimetableBtn.addEventListener("click", () => {
      showScreen("timetableScreen");
    });
  }

  if (addLessonBtn) {
    addLessonBtn.addEventListener("click", () => {
      openTimetableConfigurationModal();
    });
  }

  if (addFirstLessonBtn) {
    addFirstLessonBtn.addEventListener("click", () => {
      openTimetableConfigurationModal();
    });
  }

  const hasLessons = updateTimetableVisibility();

  renderTimetableHeader();

  if (hasLessons) {
    renderTimetableBody();
  }
}

export function refreshTimetableViews() {
  updateTimetableVisibility();

  renderTimetableBody();

  renderMobileTimetable();
}