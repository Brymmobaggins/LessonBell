/** @format */

import { schoolPeriods } from "./schoolPeriods.js";
import {
  getTeacherClasses,
  saveTeacherClasses,
  getWeeklyLessons,
  saveWeeklyLessons,
  getTeacherProfile,
} from "../services/storage.js";
import { updateDailyCountLesson, updateDropdownAppearance } from "../utils.js";

export function initializeTimetableConfiguration() {
  const weekdayNavigation = document.getElementById("weekdayNavigation");
  const selectedDayHeading = document.getElementById("selectedDayHeading");
  const dailyLessonCount = document.getElementById("dailyLessonCount");

  const saveDailyTimetableBtn = document.getElementById(
    "saveDailyTimetableBtn",
  );
  const dailySaveFeedback = document.getElementById(
  "dailySaveFeedback",
);

  let selectedDay = "Monday";

  const dailyAssignments = {
    Monday: {},
    Tuesday: {},
    Wednesday: {},
    Thursday: {},
    Friday: {},
  };

  const savedLessonsArr = getWeeklyLessons();

  savedLessonsArr.forEach((lesson) => {
    const day = lesson.day;
    const periodId = lesson.periodId;
    const className = lesson.class;

    if (Object.hasOwn(dailyAssignments, day) && periodId != null && className) {
      dailyAssignments[day][periodId] = className;
    }
  });

  function captureCurrentDayAssignment() {
    const dropdownArr = dailyTimetableContainer.querySelectorAll(
      "select[data-period-id]",
    );
    dailyAssignments[selectedDay] = {};

    dropdownArr.forEach((dropdown) => {
      const periodId = dropdown.dataset.periodId;

      const selectedClass = dropdown.value;

      if (selectedClass !== "" && selectedClass !== "add-new-class") {
        dailyAssignments[selectedDay][periodId] = selectedClass;
      }
    });
  }

  function refreshDailyCount() {
    const dropdownArr = dailyTimetableContainer.querySelectorAll(
      "select[data-period-id]",
    );

    const assignedCount = updateDailyCountLesson(dropdownArr);

    if (dailyLessonCount) {
      dailyLessonCount.textContent = `${assignedCount} assigned`;

      dailyLessonCount.classList.toggle("text-green-700", assignedCount > 0);

      dailyLessonCount.classList.toggle("text-gray-500", assignedCount === 0);

      dailyLessonCount.classList.toggle("bg-green-50", assignedCount > 0);

      dailyLessonCount.classList.toggle("bg-gray-100", assignedCount === 0);
    }
  }

  function loadSelectedDayAssignment() {
    const dropdownArr = dailyTimetableContainer.querySelectorAll(
      "select[data-period-id]",
    );

    dropdownArr.forEach((dropdown) => {
      const periodId = dropdown.dataset.periodId;

      const selectedClass = dailyAssignments[selectedDay][periodId] ?? "";
      dropdown.value = selectedClass;

      updateDropdownAppearance(dropdown);
    });
    refreshDailyCount();
  }


  function clearDailySaveFeedback(){
      if(!dailySaveFeedback) return

      dailySaveFeedback.textContent = ""
      dailySaveFeedback.classList.add("hidden")
  }


  if (weekdayNavigation) {
    weekdayNavigation.addEventListener("click", (event) => {
      const clickedButton = event.target.closest("button[data-day]");

      if (!clickedButton) return;

      clearDailySaveFeedback()

      captureCurrentDayAssignment();

      selectedDay = clickedButton.dataset.day;

      loadSelectedDayAssignment();

      selectedDayHeading.textContent = `${selectedDay}'s Lessons`;

      saveDailyTimetableBtn.textContent = `Save ${selectedDay}'s TimeTable`;

      const dayButtons = weekdayNavigation.querySelectorAll("button[data-day]");

      dayButtons.forEach((button) => {
        const isActive = button.dataset.day === selectedDay;
        button.setAttribute("aria-pressed", isActive ? "true" : "false");

        button.classList.toggle("bg-gray-800", isActive);
        button.classList.toggle("text-white", isActive);

        button.classList.toggle("bg-gray-100", !isActive);
        button.classList.toggle("text-gray-600", !isActive);
      });
    });
  }

  const dailyTimetableContainer = document.getElementById(
    "dailyTimetableContainer",
  );

  const classCreationPanel = document.getElementById("classCreationPanel");
  const newClassInput = document.getElementById("newClassInput");

  let selectedPeriodId = null;

  if (!dailyTimetableContainer || !classCreationPanel || !newClassInput) {
    return;
  }

  dailyTimetableContainer.addEventListener("change", (event) => {
    const clickedDropdown = event.target.closest("select[data-period-id]");

    if (!clickedDropdown) return;

    clearDailySaveFeedback()

    updateDropdownAppearance(clickedDropdown);

    if (clickedDropdown.value === "add-new-class") {
      selectedPeriodId = clickedDropdown.dataset.periodId;

      clickedDropdown.value = "";

      classCreationPanel.classList.remove("hidden");

      newClassInput.focus();
    }

    refreshDailyCount();
  });

  const cancelNewClassBtn = document.getElementById("cancelNewClassBtn");
  if (cancelNewClassBtn) {
    cancelNewClassBtn.addEventListener("click", () => {
      classCreationPanel.classList.add("hidden");

      newClassInput.value = "";
      newClassInput.classList.remove("border-red-500");

      classCreationFeedback.textContent = "";
      classCreationFeedback.classList.add("hidden");

      selectedPeriodId = null;
    });
  }

  const saveNewClassBtn = document.getElementById("saveNewClassBtn");
  const classCreationFeedback = document.getElementById(
    "classCreationFeedback",
  );

  if (saveNewClassBtn) {
    saveNewClassBtn.addEventListener("click", () => {
      const newClassName = newClassInput.value.trim();

      if (!newClassName) {
        classCreationFeedback.textContent = "Please enter a class name.";

        classCreationFeedback.classList.remove("hidden");

        newClassInput.classList.add("border-red-500");

        return;
      }

      const classesArr = getTeacherClasses();

      const isDuplicate = classesArr.some((existingClass) => {
        return (
          existingClass.trim().toLowerCase() === newClassName.toLowerCase()
        );
      });

      if (isDuplicate) {
        classCreationFeedback.textContent =
          "This class has already been added.";

        classCreationFeedback.classList.remove("hidden");

        newClassInput.classList.add("border-red-500");

        return;
      }

      classesArr.push(newClassName);

      saveTeacherClasses(classesArr);

      const allPeriodDropdowns = dailyTimetableContainer.querySelectorAll(
        "select[data-period-id]",
      );
      allPeriodDropdowns.forEach((dropdown) => {
        const option = document.createElement("option");

        option.value = newClassName;
        option.textContent = newClassName;

        const addNewClassOption = dropdown.querySelector(
          'option[value="add-new-class"]',
        );

        dropdown.insertBefore(option, addNewClassOption);

        if (dropdown.dataset.periodId === selectedPeriodId) {
          dropdown.value = newClassName;

          updateDropdownAppearance(dropdown);

      
        }
      });

      classCreationPanel.classList.add("hidden");

      newClassInput.value = "";

      classCreationFeedback.classList.add("hidden");

      selectedPeriodId = null;

      newClassInput.classList.remove("border-red-500");

      console.log("Saved classes:", getTeacherClasses());
    });
  }

  if (saveDailyTimetableBtn) {
    saveDailyTimetableBtn.addEventListener("click", () => {
      captureCurrentDayAssignment();

      const savedLessonsArr = getWeeklyLessons();

      const otherDaysLessonsArr = savedLessonsArr.filter((lesson) => {
        return lesson.day !== selectedDay;
      });

      const teacherProfile = getTeacherProfile();

      const dayAssignment = dailyAssignments[selectedDay];

      const newDayArr = [];

      Object.entries(dayAssignment).forEach((assignment) => {
        const [periodId, className] = assignment;

        const selectedPeriod = schoolPeriods.find((period) => {
          return period.id === Number(periodId);
        });

        if (!selectedPeriod) return;

        const lessonRecord = {
          subject: teacherProfile.subject,
          class: className,
          day: selectedDay,
          periodId: selectedPeriod.id,
          startTime: selectedPeriod.startTime,
          endTime: selectedPeriod.endTime,
        };

        newDayArr.push(lessonRecord);
      });
      refreshDailyCount()

      const updatedWeeklyLessons = [...otherDaysLessonsArr, ...newDayArr];

      saveWeeklyLessons(updatedWeeklyLessons);

      if (dailySaveFeedback) {
        dailySaveFeedback.textContent = `${selectedDay}'s timetable has been saved successfully!`;

        dailySaveFeedback.classList.remove("hidden");
      }
    });
  }

  renderDailyPeriods();

  loadSelectedDayAssignment();
}

export function renderDailyPeriods() {
  const dailyTimetableContainer = document.getElementById(
    "dailyTimetableContainer",
  );

  if (!dailyTimetableContainer) return;
  dailyTimetableContainer.replaceChildren();

  const classesArr = getTeacherClasses();

  schoolPeriods.forEach((period) => {
    if (period.type === "break") {
      const breakWrapper = document.createElement("div");
      breakWrapper.className =
        "flex items-center justify-between gap-3 rounded-xl border border-dashed border-gray-200 bg-gray-50 px-4 py-4";

      const breakLabel = document.createElement("p");

      breakLabel.className =
        "inline-flex w-fit rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700";
      breakLabel.textContent = period.label;

      const breakTime = document.createElement("span");
      breakTime.className = "text-xs text-gray-600 whitespace-nowrap";
      breakTime.textContent = `${period.startTime} - ${period.endTime}`;

      breakWrapper.append(breakLabel, breakTime);

      return dailyTimetableContainer.appendChild(breakWrapper);
    }

    const periodCard = document.createElement("div");
    periodCard.className =
      "rounded-xl border border-gray-200 bg-white p-3 space-y-3 shadow-sm";

    const periodMeta = document.createElement("div");
    periodMeta.className = "flex items-center justify-between gap-3";

    const periodEl = document.createElement("p");
    periodEl.className = "text-sm font-semibold text-gray-700";
    periodEl.textContent = period.label;

    const timeEl = document.createElement("span");
    timeEl.className = "text-xs text-gray-500 whitespace-nowrap";
    timeEl.textContent = `${period.startTime} - ${period.endTime}`;

    const classSelect = document.createElement("select");
    classSelect.className =
      "w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-3 text-sm text-gray-600 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100";

    classSelect.dataset.periodId = period.id;

    const defaultOption = document.createElement("option");

    defaultOption.value = "";
    defaultOption.textContent = "Select your class";
    defaultOption.disabled = true;
    defaultOption.selected = true;

    periodMeta.append(periodEl, timeEl);

    classSelect.appendChild(defaultOption);

    periodCard.append(periodMeta, classSelect);

    classesArr.forEach((classGrade) => {
      const optionElforClass = document.createElement("option");
      optionElforClass.value = classGrade;
      optionElforClass.textContent = classGrade;

      classSelect.appendChild(optionElforClass);
    });

    const lastOptionEl = document.createElement("option");
    lastOptionEl.value = "add-new-class";
    lastOptionEl.textContent = "+ Add New Class";

    classSelect.appendChild(lastOptionEl);

    if (period.breakFor) {
      const breakLabel = document.createElement("p");
      breakLabel.className =
        "inline-flex w-fit rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700";

      breakLabel.textContent =
        period.breakFor === "junior" ? "Junior on Break" : "Senior on Break";

      periodCard.appendChild(breakLabel);
    }

    dailyTimetableContainer.appendChild(periodCard);
  });
}
