/** @format */

import { saveTeacherProfile } from "../services/storage.js";
import { displayTeacherDashboard } from "./dashboard.js";
;

export function initializeTeacherProfile() {
  const teacherSetupForm = document.getElementById("teacherSetupForm");

  if (teacherSetupForm) {
    teacherSetupForm.addEventListener("submit", () => {

      event.preventDefault()


      const teacherName = document.getElementById("teacherName").value.trim();
      const schoolName = document.getElementById("schoolName").value.trim();

      if (!teacherName || !schoolName) {
        return alert("Please enter your name and school name");
      }

      const teacherProfile = {
        name: teacherName,
        school: schoolName,
      };

      saveTeacherProfile(teacherProfile);

      displayTeacherDashboard();
    });
  }
}
