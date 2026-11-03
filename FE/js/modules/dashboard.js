/** @format */

import { getTeacherProfile } from "../services/storage.js";
import { showScreen } from "./navigation.js";

export function displayTeacherDashboard() {
  const teacherProfile = getTeacherProfile();

  if (!teacherProfile) {
    return showScreen("teacherSetUpScreen");
  }

  const teacherName = document.getElementById("dashboardTeacherName");
  const schoolName = document.getElementById("dashboardSchoolName");
  const currentDate = document.getElementById("dashboardCurrentDate");

  teacherName.textContent = teacherProfile.name;
  schoolName.textContent = teacherProfile.school;

  currentDate.textContent = new Date().toLocaleDateString("en-NG", {
    week: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  showScreen("teacherDashboardScreen");
}
