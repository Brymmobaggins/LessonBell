/** @format */

export function convertTimeToMinutes(time) {
  const timeArr = time.split(" ");

  const clockTime = timeArr[0];
  const meridiem = timeArr[1];

  const timePartsArr = clockTime.split(":");

  let hour = Number(timePartsArr[0]);
  const minute = Number(timePartsArr[1]);

  if (meridiem === "AM" && hour === 12) {
    hour = 0;
  } else if (meridiem === "PM" && hour !== 12) {
    hour += 12;
  }

  const totalMin = hour * 60 + minute;

  return totalMin;
}

export function updateDailyCountLesson(dropdownArr) {
  let count = 0;

  dropdownArr.forEach((dropdown) => {
    if (dropdown.value !== "" && dropdown.value !== "add-new-class") {
      count++;
    }
  });

  return count;
}

export function updateDropdownAppearance(dropdown) {
  const hasClass = dropdown.value !== "" && dropdown.value !== "add-new-class";

  if (hasClass) {
    dropdown.classList.replace("bg-gray-50", "bg-white");
    dropdown.classList.replace("border-gray-200", "border-gray-400");
    dropdown.classList.replace("text-gray-600", "text-gray-900");

    dropdown.classList.add("font-medium");
  } else {
    dropdown.classList.replace("bg-white", "bg-gray-50");
    dropdown.classList.replace("border-gray-400", "border-gray-200");
    dropdown.classList.replace("text-gray-900", "text-gray-600");

    dropdown.classList.remove("font-medium");
  }
}
