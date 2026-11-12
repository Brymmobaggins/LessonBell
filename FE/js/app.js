/** @format */

import { showScreen } from "./modules/navigation.js";
import { initializeOnboarding } from "./modules/onboarding.js";
import { initializeSplashScreen } from "./modules/splash.js";
import { initializeTeacherProfile } from "./modules/teacherProfile.js";
import { initializeTimetable } from "./modules/timeTable.js";
import { initializeDashboard } from "./modules/dashboard.js";
import { initializeMobileTimetable } from "./modules/mobileTimetable.js";
import { initializeTimetableConfiguration } from "./modules/timetableConfig.js";

showScreen("splashScreen");
initializeSplashScreen();

initializeOnboarding();
initializeTeacherProfile();

initializeTimetable();

initializeDashboard();

initializeMobileTimetable();

initializeTimetableConfiguration()
