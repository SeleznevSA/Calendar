import { MAX_DATE, MIN_DATE } from "config/calendarConfig";
import {
  getMonth,
  getYear,
  isToday,
  differenceInCalendarDays,
  differenceInCalendarYears,
} from "date-fns";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { getCalendarDateList } from "utils/getCalendarDateList";
import { useCalendarData } from "utils/hooks/useCalendarData";

import SwitchLeftIcon from "static/images/calendar/switch_left_icon.svg";
import SwitchRightIcon from "static/images/calendar/switch_right_icon.svg";

import { CloseCalendarButton, ApplyCalendarButton, CancelCalendarButton } from "../Styled";
import {
  MainCalendarText,
  CalendarButtonContainer,
  DateButton,
  DaysOfWeekContainer,
  SwitchButton,
  DateContainer,
  TitlePeriodButton,
  DateInformationSection,
} from "./Styled";

interface DayCalendarProps {
  onChangeToMonthPeriod: () => void;
  onCalendarClose: () => void;
  onCalendarApply: (dates: Array<Date>) => void;
  isPeriod: boolean;
  startDate: Date;
}

const DayCalendar: React.FC<DayCalendarProps> = ({
  onChangeToMonthPeriod,
  onCalendarClose,
  onCalendarApply,
  isPeriod,
  startDate,
}) => {
  const { t } = useTranslation();
  const [monthCounter, setMonthCounter] = useState<number>(0);
  const [selectedDates, setSelectedDates] = useState<Array<Date>>([]);

  const { daysOfWeekShortNamesList, monthNamesList } = useCalendarData();

  const calendarDate = useMemo(
    () => new Date(getYear(startDate), getMonth(startDate) + monthCounter),
    [monthCounter, startDate]
  );

  const calendarDaysList = useMemo(() => getCalendarDateList(calendarDate), [calendarDate]);

  const onSwitchLeft = () => {
    if (
      differenceInCalendarYears(
        new Date(getYear(startDate), getMonth(startDate) + monthCounter - 1),
        MIN_DATE
      ) !== 0
    ) {
      setMonthCounter(monthCounter - 1);
    }
  };

  const onSwitchRight = () => {
    if (
      differenceInCalendarYears(
        new Date(getYear(startDate), getMonth(startDate) + monthCounter + 1),
        MAX_DATE
      ) !== 0
    ) {
      setMonthCounter(monthCounter + 1);
    }
  };

  const onSelectDate = (dateValue: Date) => {
    if (isPeriod) {
      if (selectedDates.length < 1) {
        selectedDates.push(dateValue);
        setSelectedDates([...selectedDates]);
      } else {
        if (differenceInCalendarDays(dateValue, selectedDates[0]) > 0) {
          selectedDates[1] = dateValue;
          setSelectedDates([...selectedDates]);
        }
      }
    } else {
      selectedDates[0] = dateValue;
      setSelectedDates([...selectedDates]);
    }
  };

  const onClose = () => {
    setSelectedDates([]);
    onCalendarClose();
  };

  const onCancel = () => {
    setSelectedDates([]);
  };

  const onApply = () => {
    if (selectedDates.length > 0) {
      onCalendarApply(selectedDates);
      onCalendarClose();
    }
  };

  return (
    <>
      <DateInformationSection>
        <SwitchButton onClick={onSwitchLeft}>
          <img src={SwitchLeftIcon} alt={t("components.calendar.switchLeftIconAlt")} />
        </SwitchButton>

        <TitlePeriodButton onClick={onChangeToMonthPeriod}>
          <MainCalendarText>
            {monthNamesList[getMonth(calendarDate)] + " " + getYear(calendarDate)}
          </MainCalendarText>
        </TitlePeriodButton>

        <SwitchButton onClick={onSwitchRight}>
          <img src={SwitchRightIcon} alt={t("components.calendar.switchRightIconAlt")} />
        </SwitchButton>
      </DateInformationSection>

      <DaysOfWeekContainer>
        {daysOfWeekShortNamesList.map((dayItem, dayIndex) => (
          <span key={dayIndex}>{dayItem}</span>
        ))}
      </DaysOfWeekContainer>

      <DateContainer>
        {calendarDaysList.map((dateItem, dateIndex) => (
          <DateButton
            key={dateIndex}
            onClick={() => onSelectDate(dateItem.value)}
            isCurrentMonth={dateItem.isCurrentMonth}
            isToday={isToday(dateItem.value)}
            isFirstSelectedDate={differenceInCalendarDays(dateItem.value, selectedDates[0]) === 0}
            isTwoDateSelected={isPeriod && selectedDates.length === 2}
            isSecondSelectedDate={differenceInCalendarDays(dateItem.value, selectedDates[1]) === 0}
            isPeriodDate={
              isPeriod && selectedDates.length === 2
                ? differenceInCalendarDays(dateItem.value, selectedDates[0]) > 0 &&
                  differenceInCalendarDays(selectedDates[1], dateItem.value) > 0
                : false
            }
          >
            <MainCalendarText>{dateItem.label}</MainCalendarText>
          </DateButton>
        ))}
      </DateContainer>

      <CalendarButtonContainer>
        {selectedDates.length === 0 ? (
          <CloseCalendarButton onClick={onClose}>
            <MainCalendarText>{t("components.calendar.closeCalendarButtonTitle")}</MainCalendarText>
          </CloseCalendarButton>
        ) : (
          <>
            <CancelCalendarButton onClick={onCancel}>
              <MainCalendarText>
                {t("components.calendar.cancelCalendarButtonTitle")}
              </MainCalendarText>
            </CancelCalendarButton>

            <ApplyCalendarButton onClick={onApply}>
              <MainCalendarText>
                {t("components.calendar.applyCalendarButtonTitle")}
              </MainCalendarText>
            </ApplyCalendarButton>
          </>
        )}
      </CalendarButtonContainer>
    </>
  );
};

export default DayCalendar;
