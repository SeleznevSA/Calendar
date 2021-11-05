import styled from "styled-components";

export const CalendarContainer = styled.div`
  min-width: 280px;
  width: 280px;
  min-height: 348px;
  max-height: max-content;

  background: #ffffff;

  box-shadow: 0 4px 12px rgba(30, 33, 34, 0.1);
  border-radius: 4px;

  overflow: hidden;
`;

const CalendarActionButtonBase = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 32px;

  cursor: pointer;
  outline: none;
  border: none;
  padding: 0;

  border-radius: 4px;

  &:active {
    border: 2px solid #ffffff;
    border-radius: 6px;
    box-sizing: border-box;
  }
`;

export const CloseCalendarButton = styled(CalendarActionButtonBase)`
  width: 264px;
  background: #eeeef5;

  &:hover {
    background: #e1e1ec;
  }
`;

export const CancelCalendarButton = styled(CalendarActionButtonBase)`
  width: 124px;
  background: #eeeef5;

  margin-right: 16px;

  &:hover {
    background: #e1e1ec;
  }
`;

export const ApplyCalendarButton = styled(CalendarActionButtonBase)`
  width: 124px;
  background: #6224e8;

  > span {
    color: #f6f6f6;
  }

  &:hover {
    background: #3a0d9a;
  }
`;
