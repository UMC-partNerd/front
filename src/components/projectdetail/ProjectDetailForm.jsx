import React from 'react';
import * as S from '../../styled-comonents/';

const ProjectDetailsForm = () => {
  return (
    <S.SContainer>
      <S.STitle>프로젝트 설명</S.STitle>
      <S.SSubtitle>
        “다른 IT 동아리와 협업하거나, 프로젝트를 함께 할 동료를 구할 수는 없을까?”
      </S.SSubtitle>
      <S.SSectionTitle>투게다</S.SSectionTitle>
      <S.SSectionDescription>
        투게다는 IT 동아리 네트워킹 플랫폼으로 타 동아리와의 협업을 촉진하고, 서비스 런칭을 위한 팀원을 모집할 수 있습니다.
        협업을 통해 새로운 경험을 할 수 있으며 더욱 성장한 모습을 찾아볼 수 있어요!
      </S.SSectionDescription>

      <S.SSectionTitle>개발 상황 및 발전 방향</S.SSectionTitle>
      <S.SSectionDescription>
        MVP 개발을 마무리하고 런칭을 준비하고 있습니다. 채팅 기능을 추가할 예정입니다.
      </S.SSectionDescription>
    </S.SContainer>
  );
};

export default ProjectDetailsForm;
