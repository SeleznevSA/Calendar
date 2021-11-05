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

export const MonthContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  margin-top: 16px;

  width: 100%;
  padding-left: 8px;
`;

export const MonthButton = styled(CalendarButtonBase)<{
  isCurrentMonth: boolean;
  isFirstSelectedMonth: boolean;
  isSecondSelectedMonth: boolean;
  isTwoMothSelected: boolean;
  isPeriodMonth: boolean;
}>`
  width: 83px;
  height: 51px;

  margin-right: 8px;
  margin-bottom: 8px;

  ${({ isPeriodMonth }) =>
    isPeriodMonth
      ? "background: #eeeef5; box-shadow: 8px 0 #eeeef5;  border-radius: 0;  &:hover { background: #eeeef5; }"
      : null}

  ${({ isSecondSelectedMonth }) =>
    isSecondSelectedMonth ? "box-shadow: -8px 0 #eeeef5;" : null};

  ${({ isFirstSelectedMonth, isTwoMothSelected }) =>
    isFirstSelectedMonth && isTwoMothSelected
      ? "box-shadow: 8px 0 #eeeef5;"
      : null};

  ${({ isFirstSelectedMonth, isSecondSelectedMonth }) =>
    isFirstSelectedMonth
      ? "background: #FA4A16; &:hover { background: #FA4A16; }"
      : isSecondSelectedMonth
      ? "background: #6224E8; &:hover { background: #6224E8; }"
      : "initial"};

  > span {
    display: flex;
    align-items: center;
    justify-content: center;

    color: ${({ isCurrentMonth }) => (isCurrentMonth ? "#FA4A16" : "#0E0F0F")};

    ${({ isFirstSelectedMonth, isSecondSelectedMonth }) =>
      isSecondSelectedMonth || isFirstSelectedMonth ? "color: #F6F6F6" : null};

    ${({ isPeriodMonth }) =>
      isPeriodMonth
        ? "height: 100%;   width: 100%;   box-shadow: -8px 0 #eeeef5; "
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
