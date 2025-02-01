import * as S from '../../styled-components/projectdetail-styles/styled-ProjectRecruitDetail';
import ImageSlider from '../../components/projectdetail/ImageSlider'; 

const ProjectRecruitDetail = () => {
  const images = [
    'path/to/your/image1.jpg',
    'path/to/your/image2.jpg',
    'path/to/your/image3.jpg', 
  ];

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
    </S.SContainer>
  );
};

export default ProjectRecruitDetail;
