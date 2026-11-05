/** @format */

import { showScreen } from "./modules/navigation.js";
import { initializeOnboarding } from "./modules/onboarding.js";
import { initializeSplashScreen } from "./modules/splash.js";
import { initializeTeacherProfile } from "./modules/teacherProfile.js";
import { initializeTimetable } from "./modules/timeTable.js";

showScreen("splashScreen");
initializeSplashScreen();

initializeOnboarding();
initializeTeacherProfile();

initializeTimetable()
// showScreen("teacherDashboardScreen");


// showScreen("timetableScreen");
