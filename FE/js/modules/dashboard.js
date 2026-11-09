/** @format */

import { getTeacherProfile, getWeeklyLessons } from "../services/storage.js";
import { showScreen } from "./navigation.js";
import { convertTimeToMinutes } from "../utils.js";

let dashboardUpdateInterval = null;

export function startDashboardUpdates() {
  if (dashboardUpdateInterval !== null) return;

  console.log("Dashboard timer started");
  dashboardUpdateInterval = setInterval(() => {
    renderDashboardStats();

    renderNextLesson();
    console.log("Refreshing dashboard...");

    renderTodaySchedule();
  }, 30000);
}

export function stopDashboardUpdates() {
  clearInterval(dashboardUpdateInterval);
  dashboardUpdateInterval = null;
  console.log("Dashboard timer stopped");
}

export function displayTeacherDashboard() {
  const teacherProfile = getTeacherProfile();

  if (!teacherProfile) {
    return showScreen("teacherSetUpScreen");
  }

  const teacherName = document.getElementById("dashboardTeacherName");
  const schoolName = document.getElementById("dashboardSchoolName");
  const teacherSubject = document.getElementById("dashboardteacherSubject");
  const currentDate = document.getElementById("dashboardCurrentDate");

  teacherName.textContent = `Hi, ${teacherProfile.name.toUpperCase()}`;
  schoolName.textContent = teacherProfile.school;

  teacherSubject.textContent = teacherProfile.subject
    ? `${teacherProfile.subject} Teacher`
    : "Teacher";

  currentDate.textContent = new Date().toLocaleDateString("en-NG", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  renderDashboardStats();

  renderNextLesson();

  renderTodaySchedule();

  showScreen("teacherDashboardScreen");
}

export function initializeDashboard() {
  const viewTimetableBtn = document.getElementById("viewTimetableBtn");

  if (viewTimetableBtn) {
    viewTimetableBtn.addEventListener("click", () => {
      showScreen("timetableScreen");
    });
  }
}
export function renderNextLesson() {
  const weeklyLessonsArr = getWeeklyLessons() ?? [];

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });
  // const today = "Monday";

  const todayLessonsArr = weeklyLessonsArr.filter((lesson) => {
    return lesson.day === today;
  });

  todayLessonsArr.sort((lessonA, lessonB) => {
    const lessonAStart = convertTimeToMinutes(lessonA.startTime);
    const lessonBStart = convertTimeToMinutes(lessonB.startTime);

    return lessonAStart - lessonBStart;
  });

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  // const currentMinutes = convertTimeToMinutes("10:05 AM");

  const currentLesson = todayLessonsArr.find((lesson) => {
    const lessonStart = convertTimeToMinutes(lesson.startTime);
    const lessonEnd = convertTimeToMinutes(lesson.endTime);

    return currentMinutes >= lessonStart && currentMinutes < lessonEnd;
  });

  const nextLesson =
    currentLesson ||
    todayLessonsArr.find((lesson) => {
      return convertTimeToMinutes(lesson.startTime) > currentMinutes;
    });

  const nextLessonDetails = document.getElementById("nextLessonDetails");
  const noUpcomingLesson = document.getElementById("noUpcomingLesson");

  const nextLessonSubject = document.getElementById("nextLessonSubject");
  const nextLessonClass = document.getElementById("nextLessonClass");
  const nextLessonTime = document.getElementById("nextLessonTime");

  if (
    !nextLessonDetails ||
    !noUpcomingLesson ||
    !nextLessonSubject ||
    !nextLessonClass ||
    !nextLessonTime
  )
    return;

  if (nextLesson) {
    nextLessonDetails.classList.remove("hidden");
    noUpcomingLesson.classList.add("hidden");

    nextLessonSubject.textContent = nextLesson.subject;
    nextLessonClass.textContent = nextLesson.class;

    nextLessonTime.textContent = `${nextLesson.startTime} - ${nextLesson.endTime}`;
  } else {
    nextLessonDetails.classList.add("hidden");
    noUpcomingLesson.classList.remove("hidden");

    noUpcomingLesson.textContent =
      todayLessonsArr.length === 0
        ? "No lessons scheduled today."
        : "No more lessons today.";
  }

  const nextLessonStatus = document.getElementById("nextLessonStatus");

  if (!nextLessonStatus) return;

  nextLessonStatus.textContent = currentLesson
    ? "Currently in Progress"
    : "Upcoming";

  nextLessonStatus.className = currentLesson
    ? "inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700"
    : "inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700";
}

export function renderTodaySchedule() {
  const weeklyLessonsArr = getWeeklyLessons() ?? [];

  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  }).format(new Date());

  // const today = "Monday";

  const todayLessonsArr = weeklyLessonsArr.filter((lesson) => {
    return lesson.day === today;
  });

  todayLessonsArr.sort((lessonA, lessonB) => {
    const lessonAStart = convertTimeToMinutes(lessonA.startTime);
    const lessonBStart = convertTimeToMinutes(lessonB.startTime);

    return lessonAStart - lessonBStart;
  });

  const todayScheduleList = document.getElementById("todayScheduleList");
  const noTodayLessons = document.getElementById("noTodayLessons");

  if (!todayScheduleList || !noTodayLessons) return;

  todayScheduleList.replaceChildren();

  if (todayLessonsArr.length === 0) {
    return noTodayLessons.classList.remove("hidden");
  } else {
    noTodayLessons.classList.add("hidden");
  }

  todayLessonsArr.forEach((lesson) => {
    const cardDiv = document.createElement("div");
    cardDiv.className =
      "flex items-center gap-3 rounded-xl border border-gray-200 p-4";

    const timeContainer = document.createElement("div");
    timeContainer.className =
      "w-24 shrink-0 rounded-lg bg-gray-50 p-3 text-center";

    const startTimeEl = document.createElement("p");
    startTimeEl.textContent = lesson.startTime;
    startTimeEl.className = "text-sm font-semibold text-gray-800";

    const endTimeEl = document.createElement("p");
    endTimeEl.textContent = lesson.endTime;
    endTimeEl.className = "mt-2 text-sm font-semibold text-gray-800";

    const lessonDetailsContainer = document.createElement("div");
    lessonDetailsContainer.className = "flex-1 min-w-0";

    const subjectEl = document.createElement("h3");
    subjectEl.textContent = lesson.subject;
    subjectEl.className = "font-semibold text-gray-800";

    const classEl = document.createElement("p");
    classEl.textContent = lesson.class;
    classEl.className = "mt-1 text-sm text-gray-500";

    timeContainer.append(startTimeEl, endTimeEl);
    lessonDetailsContainer.append(subjectEl, classEl);

    cardDiv.append(timeContainer, lessonDetailsContainer);

    todayScheduleList.appendChild(cardDiv);
  });
}

export function renderDashboardStats() {
  const weekyLessons = getWeeklyLessons() ?? [];

  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  }).format(new Date());

  const todayLessons = weekyLessons.filter((lesson) => {
    return lesson.day === today;
  });
  const todayLessonCount = document.getElementById("todayLessonCount");
  const weeklyLessonCount = document.getElementById("weeklyLessonCount");

  todayLessonCount.textContent = todayLessons.length;
  weeklyLessonCount.textContent = weekyLessons.length;
}

document.addEventListener("screenchange", (event) => {
  if (event.detail === "teacherDashboardScreen") {
    startDashboardUpdates();
  } else {
    stopDashboardUpdates();
  }
});
