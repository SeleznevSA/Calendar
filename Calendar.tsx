import DayCalendar from "components/Calendar/DayCalendar";
import MonthCalendar from "components/Calendar/MonthCalendar";
import YearCalendar from "components/Calendar/YearCalendar";
import React, { useState } from "react";

import { CalendarContainer } from "./Styled";

enum CalendarType {
  day = "day",
  month = "month",
  year = "year",
}

interface CalendarProps {
  onCalendarApply: (dates: Array<Date>) => void;
  onCalendarClose: () => void;
  isPeriod: boolean;
  calendarStartDate?: Date;
}

const Calendar: React.FC<CalendarProps> = ({
  onCalendarApply,
  onCalendarClose,
  isPeriod,
  calendarStartDate = new Date(),
}) => {
  const [calendarType, setCalendarType] = useState<CalendarType>(
    CalendarType.day
  );

  const [startDate, setStartDate] = useState<Date>(calendarStartDate);

  return (
    <CalendarContainer>
      {calendarType === CalendarType.day ? (
        <DayCalendar
          onChangeToMonthPeriod={() => setCalendarType(CalendarType.month)}
          onCalendarApply={onCalendarApply}
          onCalendarClose={onCalendarClose}
          isPeriod={isPeriod}
          startDate={startDate}
        />
      ) : null}

      {calendarType === CalendarType.month ? (
        <MonthCalendar
          onChangeToDayPeriod={() => setCalendarType(CalendarType.day)}
          onChangeToYearPeriod={() => setCalendarType(CalendarType.year)}
          onCalendarApply={onCalendarApply}
          onCalendarClose={onCalendarClose}
          isPeriod={isPeriod}
          startDate={startDate}
          changeStartDate={(newDate) => setStartDate(newDate)}
        />
      ) : null}

      {calendarType === CalendarType.year ? (
        <YearCalendar
          onChangeToMonthPeriod={() => setCalendarType(CalendarType.month)}
          startDate={startDate}
          changeStartDate={(newDate) => setStartDate(newDate)}
        />
      ) : null}
    </CalendarContainer>
  );
};

export default Calendar;
