import { MAX_DATE, MIN_DATE } from "config/calendarConfig";
import {
  isThisMonth,
  getMonth,
  getYear,
  differenceInCalendarMonths,
  differenceInCalendarYears,
} from "date-fns";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCalendarData } from "utils/hooks/useCalendarData";

import SwitchLeftIcon from "static/images/calendar/switch_left_icon.svg";
import SwitchRightIcon from "static/images/calendar/switch_right_icon.svg";

import {
  CloseCalendarButton,
  ApplyCalendarButton,
  CancelCalendarButton,
} from "../Styled";
import {
  MainCalendarText,
  DateInformationSection,
  TitlePeriodButton,
  SwitchButton,
  CalendarButtonContainer,
  MonthButton,
  MonthContainer,
} from "./Styled";

interface MonthCalendarProps {
  onChangeToDayPeriod: () => void;
  onChangeToYearPeriod: () => void;
  onCalendarApply: (dates: Array<Date>) => void;
  onCalendarClose: () => void;
  isPeriod: boolean;
  startDate: Date;
  changeStartDate: (newDate: Date) => void;
}

const MonthCalendar: React.FC<MonthCalendarProps> = ({
  onChangeToDayPeriod,
  onChangeToYearPeriod,
  onCalendarApply,
  onCalendarClose,
  isPeriod,
  startDate,
  changeStartDate,
}) => {
  const { t } = useTranslation();
  const [yearCounter, setYearCounter] = useState<number>(0);
  const [selectedMonths, setSelectedMonths] = useState<Array<Date>>([]);

  const { monthNamesList } = useCalendarData();

  const calendarYearDate = useMemo(
    () => new Date(getYear(startDate) + yearCounter, 0),
    [startDate, yearCounter]
  );

  const calendarMonthList = useMemo(
    () =>
      new Array(12).fill(0).map((_, monthIndex) => {
        const date = new Date(getYear(calendarYearDate), monthIndex);

        return { label: monthNamesList[getMonth(date)], value: date };
      }),
    [calendarYearDate, monthNamesList]
  );

  const onSwitchLeft = () => {
    if (
      differenceInCalendarYears(
        new Date(getYear(startDate) + yearCounter - 1, 0),
        MIN_DATE
      ) !== 0
    ) {
      setYearCounter(yearCounter - 1);
    }
  };

  const onSwitchRight = () => {
    if (
      differenceInCalendarYears(
        new Date(getYear(startDate) + yearCounter + 1, 0),
        MAX_DATE
      ) !== 0
    ) {
      setYearCounter(yearCounter + 1);
    }
  };

  const onSelectMonth = (dateValue: Date) => {
    if (isPeriod) {
      if (selectedMonths.length < 1) {
        selectedMonths.push(dateValue);
        setSelectedMonths([...selectedMonths]);
      } else {
        if (differenceInCalendarMonths(dateValue, selectedMonths[0]) > 0) {
          selectedMonths[1] = dateValue;
          setSelectedMonths([...selectedMonths]);
        }
      }
    } else {
      selectedMonths[0] = dateValue;
      setSelectedMonths([...selectedMonths]);
    }
  };

  const onClose = () => {
    setSelectedMonths([]);
    onChangeToDayPeriod();
  };

  const onCancel = () => {
    setSelectedMonths([]);
  };

  const onApply = () => {
    if (selectedMonths.length === 1) {
      changeStartDate(selectedMonths[0]);
      onChangeToDayPeriod();
    } else if (isPeriod && selectedMonths.length === 2) {
      onCalendarApply(selectedMonths);
      onCalendarClose();
    }
  };

  return (
    <>
      <DateInformationSection>
        <SwitchButton onClick={onSwitchLeft}>
          <img
            src={SwitchLeftIcon}
            alt={t("components.calendar.switchLeftIconAlt")}
          />
        </SwitchButton>

        <TitlePeriodButton onClick={onChangeToYearPeriod}>
          <MainCalendarText>{getYear(calendarYearDate)}</MainCalendarText>
        </TitlePeriodButton>

        <SwitchButton onClick={onSwitchRight}>
          <img
            src={SwitchRightIcon}
            alt={t("components.calendar.switchRightIconAlt")}
          />
        </SwitchButton>
      </DateInformationSection>

      <MonthContainer>
        {calendarMonthList.map((monthItem, monthIndex) => (
          <MonthButton
            key={monthIndex}
            onClick={() => onSelectMonth(monthItem.value)}
            isCurrentMonth={isThisMonth(monthItem.value)}
            isFirstSelectedMonth={
              differenceInCalendarMonths(monthItem.value, selectedMonths[0]) ===
              0
            }
            isTwoMothSelected={isPeriod && selectedMonths.length === 2}
            isSecondSelectedMonth={
              differenceInCalendarMonths(monthItem.value, selectedMonths[1]) ===
              0
            }
            isPeriodMonth={
              isPeriod && selectedMonths.length === 2
                ? differenceInCalendarMonths(
                    monthItem.value,
                    selectedMonths[0]
                  ) > 0 &&
                  differenceInCalendarMonths(
                    selectedMonths[1],
                    monthItem.value
                  ) > 0
                : false
            }
          >
            <MainCalendarText>{monthItem.label}</MainCalendarText>
          </MonthButton>
        ))}
      </MonthContainer>

      <CalendarButtonContainer>
        {selectedMonths.length === 0 ? (
          <CloseCalendarButton onClick={onClose}>
            <MainCalendarText>
              {t("components.calendar.closeCalendarButtonTitle")}
            </MainCalendarText>
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

export default MonthCalendar;
