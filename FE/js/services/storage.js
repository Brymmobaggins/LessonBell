/** @format */

// function get save teacher info and anothe to retrives it

const TEACHER_STORAGE_KEY = "lesson_bell_teacher_profile";
const WEEKLY_STORAGE_KEY = "lesson_bell_weekly_lessons"


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
