import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import * as S from '../../styled-components/collab-styles/styled-EventInfoForm';
import DateList from '../common/DateList'; 

const EventInfoForm = ({ onDataChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);  // 카테고리 선택
  const [showEventTypeOptions, setShowEventTypeOptions] = useState(false);  // 행사 유형 드롭다운 토글
  const [selectedEventType, setSelectedEventType] = useState('행사 유형');  // 선택된 행사 유형
  const [openDate, setOpenDate] = useState(null);  // 시작일
  const [closeDate, setCloseDate] = useState(null);  // 종료일
  const [startDate, setStartDate] = useState(null);  // 콜라보 시작일
  const [endDate, setEndDate] = useState(null);  // 콜라보 종료일
  const [selectedBadge, setSelectedBadge] = useState(null);  // 온/오프라인 배지 선택 상태
  const [title, setTitle] = useState('');  // 행사명
  const [intro, setIntro] = useState('');  // 한 줄 소개
  const [collabTarget, setCollabTarget] = useState('');  // 콜라보 대상

  const prevDataRef = useRef({}); 

  // 카테고리 클릭 시 선택 처리
  const handleCategoryClick = (category) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(category)) {
        return prevSelected.filter((item) => item !== category);  // 선택된 카테고리 취소
      }
      return [...prevSelected, category];  // 선택된 카테고리 추가
    });
  };

  // 행사 유형 옵션 토글
  const toggleEventTypeOptions = () => {
    setShowEventTypeOptions(!showEventTypeOptions);
  };

  // 행사 유형 선택
  const handleEventTypeSelect = (type) => {
    setSelectedEventType(type);
    setShowEventTypeOptions(false);  // 옵션 닫기
  };

  // 온/오프라인 배지 선택 처리
  const handleBadgeSelect = (badge) => {
    setSelectedBadge(badge);
  };

  // 카테고리 이름을 숫자로 변환하는 맵핑
  const categoryMapping = {
    '기획/마케팅': 1,
    '웹/앱 개발': 2,
    '인공지능': 3,
    '데이터': 4,
    '디자인': 5,
    '게임': 6,
    '기타': 7,
  };

  // 상위 컴포넌트로 데이터 전달
  const handleDataChange = useCallback(() => {
    const newData = {
      title,
      intro,
      eventType: selectedEventType,
      openDate,
      closeDate,
      startDate,
      endDate,
      collabTarget,
      contactMethods: [],
      categoryIds: selectedCategories.map((category) => categoryMapping[category]),  // 카테고리 이름을 숫자로 변환
      eventMode: selectedBadge === '온라인' ? 1 : selectedBadge === '오프라인' ? 2 : 0,
    };

    if (JSON.stringify(prevDataRef.current) !== JSON.stringify(newData)) {
      prevDataRef.current = newData;
      onDataChange(newData);
    }
  }, [
    title, intro, selectedEventType, openDate, closeDate, startDate, endDate,
    collabTarget, selectedCategories, selectedBadge, onDataChange
  ]);

  useEffect(() => {
    handleDataChange();
  }, [handleDataChange]);

  return (
    <S.FormContainer>
      {/* 행사 개요 섹션 */}
      <S.Section>
        <S.TitleText>
          행사개요 <S.RedAsterisk>*</S.RedAsterisk>
        </S.TitleText>
        <S.LabelWrapper>
          <S.InputLabel>
            카테고리<S.RedAsterisk>*</S.RedAsterisk>
          </S.InputLabel>
          <S.SmallText>중복 선택 가능</S.SmallText>
        </S.LabelWrapper>
        <S.CategoryContainer>
          {['기획/마케팅', '웹/앱 개발', '인공지능', '데이터', '디자인', '게임', '기타'].map((category) => (
            <S.CategoryButton
              key={category}
              selected={selectedCategories.includes(category)}  // 선택 여부 확인
              onClick={() => handleCategoryClick(category)}  // 카테고리 클릭 시
            >
              {category}
            </S.CategoryButton>
          ))}
        </S.CategoryContainer>
      </S.Section>

      {/* 행사 유형 섹션 */}
      <S.Section>
        <S.InputLabel>
          행사 유형<S.RedAsterisk>*</S.RedAsterisk>
        </S.InputLabel>
        <S.EventTypeButton onClick={toggleEventTypeOptions}>
          {selectedEventType} {/* 선택된 행사 유형 표시 */}
          {showEventTypeOptions ? (
            <RiArrowDropUpLine size={24} color="#C2C2C2" />
          ) : (
            <RiArrowDropDownLine size={24} color="#C2C2C2" />
          )}
        </S.EventTypeButton>
        {showEventTypeOptions && (
          <S.DropdownMenu>
            {['강연 / 세미나', '공연 / 전시', '대회 / 공모전', '데모데이 / 부스 운영',
              '멘토링 / 대외활동', '모임 / 커뮤니티', '체험 프로그램', '학술회의', '기타'].map((type) => (
              <S.DropdownItem key={type} onClick={() => handleEventTypeSelect(type)}>
                {type}
              </S.DropdownItem>
            ))}
          </S.DropdownMenu>
        )}
      </S.Section>

      {/* 기타 입력 필드 섹션 */}
      <S.Section>
        <S.InputContainer>
          <S.LabelWrapper>
            <S.InputLabel style={{ display: 'inline-block' }}>
              행사명<S.RedAsterisk>*</S.RedAsterisk>
            </S.InputLabel>
          </S.LabelWrapper>
          <S.InputField type="text" placeholder="행사명을 입력해주세요" value={title} onChange={(e) => setTitle(e.target.value)} />
        </S.InputContainer>

        <S.InputContainer style={{ marginTop: '20px' }}>
          <S.LabelWrapper>
            <S.InputLabel style={{ display: 'inline-block' }}>
              한 줄 소개<S.RedAsterisk>*</S.RedAsterisk>
            </S.InputLabel>
          </S.LabelWrapper>
          <S.InputField type="text" placeholder="30자 이내로 행사 내용을 요약하여 작성해주세요" value={intro} onChange={(e) => setIntro(e.target.value)} />
        </S.InputContainer>

        {/* 개최 희망일 (시작 날짜 및 종료 날짜) */}
        <S.InputWrapper>
          <S.InputLabel>개최 희망일</S.InputLabel>
          <S.DateContainer>
            <DateList selectedDate={openDate} onDateChange={setOpenDate} placeholder="시작 날짜" />
            <DateList selectedDate={closeDate} onDateChange={setCloseDate} placeholder="종료 날짜" />
          </S.DateContainer>
        </S.InputWrapper>

        {/* 콜라보 마감일 */}
        <S.InputWrapper>
          <S.InputLabel>콜라보 마감일<S.RedAsterisk>*</S.RedAsterisk></S.InputLabel>
          <S.DateContainer>
            <DateList selectedDate={startDate} onDateChange={setStartDate} placeholder="시작 날짜" />
            <DateList selectedDate={endDate} onDateChange={setEndDate} placeholder="종료 날짜" />
          </S.DateContainer>
        </S.InputWrapper>

        {/* 콜라보 대상 */}
        <S.InputContainer>
          <S.LabelWrapper>
            <S.InputLabel>콜라보 대상<S.RedAsterisk>*</S.RedAsterisk></S.InputLabel>
          </S.LabelWrapper>
          <S.InputField type="text" placeholder="어떤 동아리와 콜라보레이션을 하고 싶은지 작성해주세요" value={collabTarget} onChange={(e) => setCollabTarget(e.target.value)} />
        </S.InputContainer>

        {/* 배지 선택 */}
        <S.Section>
          <S.InputLabel>온/오프라인 선택<S.RedAsterisk>*</S.RedAsterisk></S.InputLabel>
          <S.CategoryContainer>
            {['온/오프라인', '온라인', '오프라인'].map((badge) => (
              <S.CategoryButton
                key={badge}
                selected={selectedBadge === badge}  // 배지 선택 상태 확인
                onClick={() => handleBadgeSelect(badge)}  // 배지 클릭 시
              >
                {badge}
              </S.CategoryButton>
            ))}
          </S.CategoryContainer>
        </S.Section>
      </S.Section>
    </S.FormContainer>
  );
};

export default EventInfoForm;
