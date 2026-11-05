export function openLessonFormModal() {
  const addLessonModal = document.getElementById("addLessonModal");

  if (!addLessonModal) return;
  addLessonModal.classList.remove("hidden");
  addLessonModal.classList.add("flex");
}

export function closeLessonFormModal() {
  const addLessonModal = document.getElementById("addLessonModal");

  if (!addLessonModal) return;
  addLessonModal.classList.add("hidden");
  addLessonModal.classList.remove("flex");
}
