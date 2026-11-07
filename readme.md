Each module retains a clear responsibility:
- storage.js retrieves the profile.
- splash.js decides where to navigate after startup.
- dashboard.js renders the saved information.
- navigation.js handles screen visibility.


Here's the logic:
- If currentLesson exists, use it.
- Otherwise, search for the next upcoming lesson.
- If neither exists, nextLesson will be undefined.
One important distinction: we're using nextLesson to represent either the current lesson or the next upcoming lesson.

const nextLesson = currentLesson || todayLessonsArr.find((lesson) => {
  return convertTimeToMinutes(lesson.startTime) > currentMinutes;
});


One learning point: Notice how .filter() gives us a new array, while .sort() rearranges that filtered array. Your original weeklyLessonsArr remains untouched.