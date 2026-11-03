/** @format */

import { showScreen } from "./navigation.js";

export function initializeTimeTable() {
  const addTimetableBtn = document.getElementById("addTimetableBtn");

  if (!addTimetableBtn) {
    return console.error("no btn");
  }

 addTimetableBtn.addEventListener("click", () => {
    showScreen("timetableScreen");
  });
}
