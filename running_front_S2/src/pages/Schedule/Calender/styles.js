import { css } from '@emotion/react';

export const mainLayout = css`
  display: flex;
  gap: 2rem;
  height: 100%;
  align-items: flex-start;
  width: 100%;
`;

export const calendarWrapper = css`
  flex: 0 0 70%;
  background: white;
  border: 1px solid #e5e7eb;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
              0 4px 6px -2px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  min-height: 600px;
`;

// 기본 전환 효과 제거
export const calendarWrapperFullWidth = css`
  flex: 1;
  background: white;
  border: 1px solid #e5e7eb;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
              0 4px 6px -2px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  min-height: 600px;
`;

export const selectedDateContainer = css`
  flex: 0 0 30%;
  min-width: 250px;
  height: fit-content;
`;

export const header = css`
  background: black;
  color: white;
  padding: 1.5rem 2rem;
`;

export const headerContent = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// 헤더 오른쪽 버튼들을 위한 새로운 스타일
export const headerRight = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const navButton = css`
  padding: 0.75rem;
  border-radius: 0.375rem;
  cursor: pointer;
  border: none;
  background: transparent;
  color: white;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

// 새로 추가된 토글 버튼 스타일
export const toggleButton = css`
  padding: 0.75rem;
  border-radius: 0.375rem;
  transition: background-color 0.2s ease;
  cursor: pointer;
  border: none;
  background: transparent;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const headerTitle = css`
  font-size: 1.875rem;
  font-weight: bold;
  margin: 0;
`;

export const weekDaysContainer = css`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
`;

export const weekDayWeekday = css`
  text-align: center;
  font-size: 1.125rem;
  font-weight: 500;
  padding: 1rem 0;
  color: #4b5563;
`;

export const weekDayWeekend = css`
  text-align: center;
  font-size: 1.125rem;
  font-weight: 500;
  padding: 1rem 0;
  color: #9ca3af;
`;

export const calendarGrid = css`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const daysGrid = css`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background: #e5e7eb;
  flex: 1;
  min-height: 400px;
`;

export const emptyCell = css`
  height: 80px;
`;

export const dayCell = css`
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.125rem;
  position: relative;
  border: 1px solid #f3f4f6;
  background: white;
  color: #374151;
  font-weight: 500;

  &:hover {
    background: #f3f4f6;
  }
`;

export const dayCellToday = css`
  ${dayCell};
  background: black;
  color: white;
  font-weight: bold;

  &:hover {
    background: #374151;
  }
`;

export const dayCellSelected = css`
  ${dayCell};
  background: #374151;
  color: white;

  &:hover {
    background: #4b5563;
  }
`;

export const eventDotDefault = css`
  position: absolute;
  bottom: 8px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #9ca3af;
`;

export const eventDotSelected = css`
  position: absolute;
  bottom: 8px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white;
`;

export const selectedDateInfo = css`
  background: #ffffff;
  border: 1px solid black;
  border-radius: 0.5rem;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
              0 2px 4px -1px rgba(0, 0, 0, 0.06);
  height: fit-content;
  min-height: 150px;
`;

export const selectedDateTitle = css`
  font-size: 1.1rem;
  color: #374151;
  margin-bottom: 1rem;
  font-weight: 600;
`;

export const selectedEventTitle = css`
  font-size: 1.5rem;
  color: black;
  font-weight: 600;
  margin: 0;
  line-height: 1.4;
`;

export const noEventText = css`
  font-size: 1.1rem;
  color: #6b7280;
  margin: 0;
  font-style: italic;
`;