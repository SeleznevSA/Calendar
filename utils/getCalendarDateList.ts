import {
  addDays,
  getDate,
  getDaysInMonth,
  getISODay,
  getMonth,
  getYear,
  startOfMonth,
} from "date-fns";

export const getCalendarDateList = (monthDate: Date) => {
  const currentDaysInMonthCount = getDaysInMonth(monthDate);
  const startDateOfCurrentMonth = getISODay(startOfMonth(monthDate));

  const calendarDaysSize =
    currentDaysInMonthCount + startDateOfCurrentMonth > 36 ? 42 : 35;

  const previousDaysCount = startDateOfCurrentMonth - 1;

  //Month Init
  const previousMonth = new Date(getYear(monthDate), getMonth(monthDate) - 1);

  const currentMonth = new Date(getYear(monthDate), getMonth(monthDate));

  const nextMonth = new Date(getYear(monthDate), getMonth(monthDate) + 1);

  return new Array(calendarDaysSize).fill(0).map((_, dayIndex) => {
    if (dayIndex + 1 < startDateOfCurrentMonth) {
      const date = addDays(
        previousMonth,
        getDaysInMonth(previousMonth) - previousDaysCount + dayIndex
      );

      return {
        label: getDate(date),
        value: date,
        isCurrentMonth: false,
      };
    } else if (
      dayIndex + 1 >=
      startDateOfCurrentMonth + currentDaysInMonthCount
    ) {
      const date = addDays(
        nextMonth,
        dayIndex + 1 - currentDaysInMonthCount - startDateOfCurrentMonth
      );

      return {
        label: getDate(date),
        value: date,
        isCurrentMonth: false,
      };
    } else {
      const date = addDays(
        currentMonth,
        dayIndex - startDateOfCurrentMonth + 1
      );

      return {
        label: getDate(date),
        value: date,
        isCurrentMonth: true,
      };
    }
  });
};
