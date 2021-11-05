import { MAX_DATE, MIN_DATE } from "config/calendarConfig";
import { getYear, isThisYear, differenceInCalendarYears } from "date-fns";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import SwitchLeftIcon from "static/images/calendar/switch_left_icon.svg";
import SwitchRightIcon from "static/images/calendar/switch_right_icon.svg";

import {
  CloseCalendarButton,
  ApplyCalendarButton,
  CancelCalendarButton,
} from "../Styled";
import {
  DateInformationSection,
  MainCalendarText,
  SwitchButton,
  TitlePeriodButton,
  CalendarButtonContainer,
  YearContainer,
  YearButton,
} from "./Styled";

interface YearCalendarProps {
  onChangeToMonthPeriod: () => void;
  startDate: Date;
  changeStartDate: (newDate: Date) => void;
}

const YearCalendar: React.FC<YearCalendarProps> = ({
  onChangeToMonthPeriod,
  startDate,
  changeStartDate,
}) => {
  const { t } = useTranslation();
  const [yearCounter, setYearCounter] = useState<number>(0);
  const [selectedYear, setSelectedYear] = useState<Date | null>(null);

  const calendarYearDate = useMemo(
    () => new Date(getYear(startDate) + yearCounter - 6, 0),
    [startDate, yearCounter]
  );

  const calendarYearList = useMemo(
    () =>
      new Array(12).fill(0).map((_, yearIndex) => {
        const date = new Date(getYear(calendarYearDate) + yearIndex, 0);

        return { label: getYear(date), value: date };
      }),
    [calendarYearDate]
  );
  const onSwitchLeft = () => {
    if (
      differenceInCalendarYears(
        new Date(getYear(startDate) + yearCounter - 12, 0),
        MIN_DATE
      ) > 0
    ) {
      setYearCounter(yearCounter - 12);
    }
  };

  const onSwitchRight = () => {
    if (
      differenceInCalendarYears(
        MAX_DATE,
        new Date(getYear(startDate) + yearCounter + 12, 0)
      ) > 0
    ) {
      setYearCounter(yearCounter + 12);
    }
  };

  const onSelectYear = (dateValue: Date) => {
    setSelectedYear(dateValue);
  };

  const onClose = () => {
    setSelectedYear(null);
    onChangeToMonthPeriod();
  };

  const onCancel = () => {
    setSelectedYear(null);
  };

  const onApply = () => {
    if (selectedYear) {
      changeStartDate(selectedYear);
      onChangeToMonthPeriod();
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

        <TitlePeriodButton>
          <MainCalendarText>
            {getYear(calendarYearDate) +
              " — " +
              Number(getYear(calendarYearDate) + 12)}
          </MainCalendarText>
        </TitlePeriodButton>

        <SwitchButton onClick={onSwitchRight}>
          <img
            src={SwitchRightIcon}
            alt={t("components.calendar.switchRightIconAlt")}
          />
        </SwitchButton>
      </DateInformationSection>

      <YearContainer>
        {calendarYearList.map((yearItem, yearIndex) => (
          <YearButton
            key={yearIndex}
            onClick={() => onSelectYear(yearItem.value)}
            isSelectedYear={
              selectedYear
                ? differenceInCalendarYears(yearItem.value, selectedYear) === 0
                : false
            }
            isCurrentYear={isThisYear(yearItem.value)}
          >
            <MainCalendarText>{yearItem.label}</MainCalendarText>
          </YearButton>
        ))}
      </YearContainer>

      <CalendarButtonContainer>
        {selectedYear ? (
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
        ) : (
          <CloseCalendarButton onClick={onClose}>
            <MainCalendarText>
              {t("components.calendar.closeCalendarButtonTitle")}
            </MainCalendarText>
          </CloseCalendarButton>
        )}
      </CalendarButtonContainer>
    </>
  );
};

export default YearCalendar;
