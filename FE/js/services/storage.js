/** @format */

// function get save teacher info and anothe to retrives it

const TEACHER_STORAGE_KEY = "lesson_bell_teacher_profile";
const WEEKLY_STORAGE_KEY = "lesson_bell_weekly_lessons"
const TEACHER_CLASSES_STORAGE_KEY = "lesson_bell_teacher_classes"



export function saveWeeklyLessons(weeklyLessons){
  localStorage.setItem(WEEKLY_STORAGE_KEY,JSON.stringify(weeklyLessons))


}

export function getWeeklyLessons(){

  const savedWeeklyLessons = localStorage.getItem(WEEKLY_STORAGE_KEY)

  if(!savedWeeklyLessons){
    return []
  }
  try{
    return JSON.parse(savedWeeklyLessons)
  }catch(error){
    return []
  }
}

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

export function saveTeacherClasses(teacherClasses) {
  localStorage.setItem(
    TEACHER_CLASSES_STORAGE_KEY,
    JSON.stringify(teacherClasses),
  );
}

export function getTeacherClasses() {
  const savedTeacherClasses = localStorage.getItem(
    TEACHER_CLASSES_STORAGE_KEY,
  );

  if (!savedTeacherClasses) {
    return [];
  }

  try {
    const parsedClasses = JSON.parse(savedTeacherClasses);

    return Array.isArray(parsedClasses) ? parsedClasses : [];
  } catch (error) {
    return [];
  }
}