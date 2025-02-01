import React, { useState } from 'react';
import Calendar from './Calendar';  // 달력 컴포넌트 import
import { RiCalendarLine } from 'react-icons/ri';
import styled from 'styled-components';

const DateListContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* 추가된 스타일로 간격 조정 */
  gap: 10px; /* 필요시 간격을 조정할 수 있음 */
  background: #fff;
  padding: 10px 20px;
  width: 150px;
  height: 40px;
  border-radius: 6px;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  position: relative;
`;

const DateText = styled.h3`
  margin: 0;
  color: #C2C2C2;
  font-size: 15px;
  font-weight: 500;
`;

const CalendarWrapper = styled.div`
  position: absolute;
  top: 50px;
  left: 0;
  background: white;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  z-index: 200;
  padding: 10px;
`;

const DateList = ({ selectedDate, onDateChange, placeholder }) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const handleCalendarToggle = (e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    setShowCalendar((prev) => !prev);
    console.log("달력 상태:", !showCalendar); // 상태 변경 로그 확인
  };

  return (
    <div style={{ position: 'relative' }}>
      <DateListContainer onClick={handleCalendarToggle} tabIndex="0">
        <DateText>
          {selectedDate
            ? selectedDate.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })
            : placeholder}
        </DateText>
        <RiCalendarLine size={18} color="#C2C2C2" />
      </DateListContainer>

      {showCalendar && (
        <CalendarWrapper>
          <Calendar selectedDate={selectedDate} onDateChange={onDateChange} />
        </CalendarWrapper>
      )}
    </div>
  );
};

export default DateList;