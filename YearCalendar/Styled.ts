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
  cursor: default;

  &:hover {
    background: transparent;
  }
`;

export const SwitchButton = styled(CalendarButtonBase)`
  width: 32px;
  height: 32px;

  margin-right: 8px;
  margin-left: 8px;
`;

export const YearContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  margin-top: 16px;

  width: 100%;
  padding-left: 8px;
`;

export const YearButton = styled(CalendarButtonBase)<{
  isCurrentYear: boolean;
  isSelectedYear: boolean;
}>`
  width: 83px;
  height: 51px;

  margin-right: 8px;
  margin-bottom: 8px;

  ${({ isSelectedYear }) =>
    isSelectedYear
      ? "background: #FA4A16; &:hover { background: #FA4A16; }"
      : null};

  > span {
    display: flex;
    align-items: center;
    justify-content: center;

    color: ${({ isCurrentYear }) => (isCurrentYear ? "#FA4A16" : "#0E0F0F")};
    ${({ isSelectedYear }) => (isSelectedYear ? "color: #F6F6F6" : null)};
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
