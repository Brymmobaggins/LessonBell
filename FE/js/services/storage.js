/** @format */

// function get save teacher info and anothe to retrives it

const TEACHER_STORAGE_KEY = "lesson_bell_teacher_profile";

export function saveTeacherProfile(teacherProfile) {
  localStorage.setItem(TEACHER_STORAGE_KEY, JSON.stringify(teacherProfile));
}

export function getTeacherProfile() {
  const savedTeacherProfile = localStorage.getItem(TEACHER_STORAGE_KEY);

  if (!savedTeacherProfile) {
    return null;
  }
  try {
    return JSON.parse(savedTeacherProfile);
  } catch (error) {
    return null;
  }
}
