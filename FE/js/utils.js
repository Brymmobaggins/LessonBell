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
  