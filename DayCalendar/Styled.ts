import styled from "styled-components";
import { makeTextStyles } from "utils/makeTextStyles";

export const DateInformationSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 48px;

  background: #f6f6f9;
`;

export const MainCalendarText = styled.span`
  display: block;

  ${makeTextStyles("15px", 400)};
  line-height: 20px;
  color: #0e0f0f;
`;

const CalendarButtonBase = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  outline: none;
  border: none;
  background: transparent;
  padding: 0;

  border-radius: 4px;

  transition-duration: 0.2s;

  &:hover {
    background: #e1e1ec;
  }
`;

export const TitlePeriodButton = styled(CalendarButtonBase)`
  padding: 6px 12px;
`;

export const SwitchButton = styled(CalendarButtonBase)`
  width: 32px;
  height: 32px;

  margin-right: 8px;
  margin-left: 8px;
`;

export const DaysOfWeekContainer = styled.div`
  display: flex;
  align-items: center;

  margin-top: 4px;
  margin-bottom: 4px;

  width: 100%;
  padding-left: 7px;

  > span {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 32px;
    height: 28px;
    margin-right: 7px;

    ${makeTextStyles("13px", 400)};
    line-height: 16px;
    color: #bababa;
  }
`;

export const DateContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  width: 100%;
  padding-left: 7px;
`;

export const DateButton = styled(CalendarButtonBase)<{
  isCurrentMonth: boolean;
  isToday: boolean;
  isFirstSelectedDate: boolean;
  isTwoDateSelected: boolean;
  isSecondSelectedDate: boolean;
  isPeriodDate: boolean;
}>`
  width: 32px;
  height: 32px;

  margin-right: 7px;
  margin-bottom: 12px;

  ${({ isPeriodDate }) =>
    isPeriodDate
      ? "background: #eeeef5; box-shadow: 7px 0 #eeeef5;  border-radius: 0;  &:hover { background: #eeeef5; }"
      : null}

  ${({ isFirstSelectedDate, isSecondSelectedDate }) =>
    isFirstSelectedDate
      ? "background: #FA4A16; &:hover { background: #FA4A16; }"
      : isSecondSelectedDate
      ? "background: #6224E8; &:hover { background: #6224E8; }"
      : "initial"};

  ${({ isSecondSelectedDate }) =>
    isSecondSelectedDate ? "box-shadow: -7px 0 #eeeef5;" : null};

  ${({ isFirstSelectedDate, isTwoDateSelected }) =>
    isFirstSelectedDate && isTwoDateSelected
      ? "box-shadow: 7px 0 #eeeef5;"
      : null};

  > span {
    display: flex;
    align-items: center;
    justify-content: center;

    color: ${({ isToday, isCurrentMonth }) =>
      isToday ? "#FA4A16" : isCurrentMonth ? "#0E0F0F" : "#757575"};

    ${({ isFirstSelectedDate, isSecondSelectedDate }) =>
      isSecondSelectedDate || isFirstSelectedDate ? "color: #F6F6F6" : null};

    ${({ isPeriodDate }) =>
      isPeriodDate
        ? "height: 100%;   width: 100%;   box-shadow: -7px 0 #eeeef5; "
        : null}
  }
`;

export const CalendarButtonContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0;

  padding-left: 8px;

  height: 44px;
`;
