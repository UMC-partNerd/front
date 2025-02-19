import React, { useState } from 'react';
import Calendar from './Calendar';  
import { RiCalendarLine } from 'react-icons/ri';
import styled from 'styled-components';

const DateList = ({ selectedDate, onDateChange, placeholder }) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const handleCalendarToggle = (e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    setShowCalendar((prev) => !prev);
    console.log("달력 상태:", !showCalendar); // 상태 변경 로그 확인
  };

  const handleDateChange = (date) => {
    // 날짜를 ISO 형식으로 변환하여 onDateChange 호출
    const isoDate = new Date(date).toISOString();
    onDateChange(isoDate);
  };

  const handleCloseCalendar = () => {
    setShowCalendar(false);
  };

  const formatSelectedDate = selectedDate ? new Date(selectedDate) : null;

  return (
    <div style={{ position: 'relative' }}>
      <DateListContainer onClick={handleCalendarToggle} tabIndex="0">
        <DateText>
          {formatSelectedDate
            ? formatSelectedDate.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })
            : placeholder}
        </DateText>
        <RiCalendarLine size={18} color="#C2C2C2" />
      </DateListContainer>

      {showCalendar && (
        <CalendarWrapper>
          <Calendar selectedDate={selectedDate} onDateChange={handleDateChange} closeCalendar={handleCloseCalendar} />
        </CalendarWrapper>
      )}
    </div>
  );
};

export default DateList;


/*시작날짜랑 종료날짜 -> DateList만 import해서 쓰시면 됩니다(달력 날짜 선택하는 부분)
  예) 콜라보레이션 등록페이지
          <S.InputWrapper>
            <S.InputLabel>콜라보 마감일<S.RedAsterisk>*</S.RedAsterisk></S.InputLabel>
            <S.DateContainer>
              <DateList selectedDate={collabStartDate} onDateChange={setCollabStartDate} placeholder="시작 날짜" />
              <DateList selectedDate={collabEndDate} onDateChange={setCollabEndDate} placeholder="종료 날짜" />
            </S.DateContainer>
          </S.InputWrapper>
*/
  



const DateListContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; 
  gap: 10px; 
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
