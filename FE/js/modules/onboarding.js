/** @format */

import { showScreen } from "./navigation.js";

export function initializeOnboarding() {
  const getStartedBtn = document.getElementById("getStartedBtn");

  if (getStartedBtn) {
    getStartedBtn.addEventListener("click", function () {
      showScreen("teacherSetupScreen");
    });
  }

  
}
