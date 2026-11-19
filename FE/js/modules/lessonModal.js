
export function openTimetableConfigurationModal() {
  const modal = document.getElementById("timetableConfigurationModal");

  if (!modal) {
    console.error("Timetable configuration modal not found");
    return;
  }

  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

export function closeTimetableConfigurationModal() {
  const modal = document.getElementById("timetableConfigurationModal");

  if (!modal) return;

  modal.classList.add("hidden");
  modal.classList.remove("flex");
}