import React from 'react';
import { useParams } from 'react-router-dom';
import * as S from '../../styled-components/projectdetail-styles/styled-ProjectRecruitDetail';
import ImageSlider from '../../components/projectdetail/ImageSlider';
import ProjectDetailForm from '../../components/projectdetail/ProjectDetailForm';
import JoinProjectInfo from '../../components/projectdetail/JoinProjectInfo';  

const DefaultImage = '/default-image.png';

const ProjectRecruitDetail = () => {
  const { id } = useParams(); // URL에서 id 가져오기

  // 임시 이미지 데이터
  const images = [DefaultImage, DefaultImage, DefaultImage];

  return (
    <S.SContainer>
      <S.SImageBoxContainer>
        <S.SImageBox />
        <S.STextBox>
          <S.STitle>투게다</S.STitle>
          <S.SDescription>IT 동아리 협업 네트워킹 플랫폼, ‘투게다’</S.SDescription>
        </S.STextBox>
      </S.SImageBoxContainer>

      <S.SImageSliderWrapper>
        <ImageSlider images={images} />
      </S.SImageSliderWrapper>

      <S.SFormContainer>
        <ProjectDetailForm /> 
      </S.SFormContainer>


      <S.SJoinProjectInfoWrapper>
        <JoinProjectInfo /> 
      </S.SJoinProjectInfoWrapper>
    </S.SContainer>
  );
};

export default ProjectRecruitDetail;
