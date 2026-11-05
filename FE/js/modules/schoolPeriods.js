/** @format */

export const schoolPeriods = [
  {
    id: 1,
    label: "Period 1",
    startTime: "08:00",
    endTime: "08:40",
    type: "lesson",
  },
  {
    id: 2,
    label: "Period 2",
    startTime: "08:40",
    endTime: "09:20",
    type: "lesson",
  },
  {
    id: 3,
    label: "Period 3",
    startTime: "09:20",
    endTime: "10:00",
    type: "lesson",
  },
  {
    id: "Short-break",
    label: "Short break",
    startTime: "10:00",
    endTime: "10:15",
    type: "break",
  },
  {
    id: 4,
    label: "Period 4",
    startTime: "10:15",
    endTime: "10:55",
    type: "lesson",
  },
  {
    id: 5,
    label: "Period 6",
    startTime: "10:55",
    endTime: "11:35",
    type: "lesson",
  },
  {
    id: 6,
    label: "Period 7",
    startTime: "11:35",
    endTime: "12:15",
    type: "lesson",
  },
  {
    id: "7",
    label: "Period 8",
    startTime: "12:15",
    endTime: "12:55",
    type: "lesson",
    breakFor: "junior",
  },
  {
    id: "8",
    label: "Period 9",
    startTime: "12:55",
    endTime: "01:30",
    type: "lesson",
    breakFor: "senior",
  },
  {
    id: 10,
    label: "Period 10",
    startTime: "1:30",
    endTime: "02:10",
    type: "lesson"
  },
  {
    id: 11,
    label: "Period 11",
    startTime: "2:10",
    endTime: "02:55",
    type: "lesson",
  },

  {
    id: 12,
    label: "Period 12",
    startTime: "02:55",
    endTime: "03:30",
    type: "lesson",
  },
];
export const teachingPeriods = schoolPeriods.filter((period) => {
  return period.type === "lesson";
});
