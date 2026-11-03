/** @format */

import { getTeacherProfile } from "../services/storage.js";
import { displayTeacherDashboard } from "./dashboard.js";
import { showScreen } from "./navigation.js";

export function initializeSplashScreen() {
  const loadingBar = document.getElementById("loadingBar");
  const loadingText = document.getElementById("loadingText");

  let loadingProgress = 0;

  const loadingInterval = setInterval(() => {
    loadingProgress = Math.min(loadingProgress + 2, 100);

    loadingBar.style.width = `${loadingProgress}%`;
    loadingText.textContent = `loading....${loadingProgress}%`;

    if (loadingProgress === 100) {
      clearInterval(loadingInterval);
      loadingText.textContent = "Ready";

      const savedTeacherProfile = getTeacherProfile();

      if (!savedTeacherProfile) {
        showScreen("welcomeScreen");
      } else {
        displayTeacherDashboard();
      }
    }
  }, 50);
}

// }
