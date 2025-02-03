import React, { useState } from 'react';
import styled from 'styled-components';

const Calendar = ({ selectedDate, onDateChange, closeCalendar }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const selectDate = (date) => {
    onDateChange(date);  // 부모 컴포넌트로 날짜 전달
    closeCalendar();  // 캘린더 닫기
  };
  
  const getCalendarDays = () => {
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
    const days = [];
    const startDay = startOfMonth.getDay(); 
    const totalDays = endOfMonth.getDate(); 
   
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
  
    for (let i = 1; i <= totalDays; i++) {
      days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i)); 
    }
  
    while (days.length < 42) {
      days.push(null);
    }
  
    return days;
  };

  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <CalendarContainer>
      <Header>
        <Title>{`${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`}</Title>
        <ArrowButtonContainer>
   
          <ArrowButton onClick={() => changeMonth(1)}>
            <img src="/chevron-right.svg" alt="right arrow" />
          </ArrowButton>

     
          <ArrowButton onClick={() => changeMonth(-1)}>
            <img src="/chevron-right.svg" alt="left arrow" style={{ transform: 'rotate(180deg)' }} />
          </ArrowButton>
        </ArrowButtonContainer>
      </Header>
      <Separator />
      <DaysOfWeek>
        {weekdays.map((day, index) => (
          <Day key={index}>{day}</Day>
        ))}
      </DaysOfWeek>
      <DateGrid>
        {getCalendarDays().map((date, index) => (
          <DateBox
            key={index}
            onClick={() => date && selectDate(date)}
            isSelected={date && selectedDate && date.toDateString() === selectedDate.toDateString()}
          >
            {date ? date.getDate() : ''}
          </DateBox>
        ))}
      </DateGrid>
    </CalendarContainer>
  );
};

export default Calendar;

//DateList.jsx 주석 확인!

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  background-color: white;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 16px;
  margin-top: 20px; 
  `;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 0 20px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 20px;
  font-weight: 700;
`;

const ArrowButtonContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const ArrowButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 30px;
    height: 30px;
  }
`;

const Separator = styled.hr`
  border: none;
  height: 1px;
  background-color: #F3F3F3;
  margin-top: 5px;
  display: block;
  width: 100%;
`;

const DaysOfWeek = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-bottom: 8px;
`;

const Day = styled.div`
  font-weight: bold;
  font-size: 14px;
  color: #6B6B6B;
`;

const DateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  text-align: center;
`;

const DateBox = styled.div`
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease; 
  
  &:hover {
    background-color: #F2F2F2;
  }

  ${({ isSelected }) => isSelected && `
    color: #0D29B7; 
    font-weight: bold; 
  `}
`;