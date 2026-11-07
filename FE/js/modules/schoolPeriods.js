/** @format */

export const schoolPeriods = [
  {
    id: 1,
    label: "Period 1",
    startTime: "08:00 AM",
    endTime: "08:40 AM",
    type: "lesson",
  },
  {
    id: 2,
    label: "Period 2",
    startTime: "08:40 AM",
    endTime: "09:20 AM",
    type: "lesson",
  },
  {
    id: 3,
    label: "Period 3",
    startTime: "09:20 AM",
    endTime: "10:00 AM",
    type: "lesson",
  },
  {
    id: "Short-break",
    label: "Short break",
    startTime: "10:00 AM",
    endTime: "10:15 AM",
    type: "break",
  },
  {
    id: 4,
    label: "Period 4",
    startTime: "10:15 AM",
    endTime: "10:55 AM",
    type: "lesson",
  },
  {
    id: 5,
    label: "Period 5",
    startTime: "10:55 AM",
    endTime: "11:35 AM",
    type: "lesson",
  },
  {
    id: 6,
    label: "Period 6",
    startTime: "11:35 AM",
    endTime: "12:15 PM",
    type: "lesson",
  },
  {
    id: 7,
    label: "Period 7",
    startTime: "12:15 PM",
    endTime: "12:55 PM",
    type: "lesson",
    breakFor: "junior",
  },
  {
    id: 8,
    label: "Period 8",
    startTime: "12:55 PM",
    endTime: "01:30 PM",
    type: "lesson",
    breakFor: "senior",
  },
  {
    id: 10,
    label: "Period 9",
    startTime: "01:30 PM",
    endTime: "02:10 PM",
    type: "lesson"
  },
  {
    id: 11,
    label: "Period 10",
    startTime: "02:10 PM",
    endTime: "02:55 PM",
    type: "lesson",
  },

  {
    id: 12,
    label: "Period 11",
    startTime: "02:55 PM",
    endTime: "03:30 PM",
    type: "lesson",
  },
];
export const teachingPeriods = schoolPeriods.filter((period) => {
  return period.type === "lesson";
});
