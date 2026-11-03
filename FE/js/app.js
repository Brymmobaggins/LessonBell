/** @format */

import { showScreen } from "./modules/navigation.js";
import { initializeOnboarding } from "./modules/onboarding.js";
import { initializeSplashScreen } from "./modules/splash.js";
import { initializeTeacherProfile } from "./modules/teacherProfile.js";
import { initializeTimeTable } from "./modules/timeTable.js";

showScreen("splashScreen");
initializeSplashScreen();

initializeOnboarding();
initializeTeacherProfile();

initializeTimeTable()
// showScreen("teacherDashboardScreen");


// showScreen("timetableScreen");
