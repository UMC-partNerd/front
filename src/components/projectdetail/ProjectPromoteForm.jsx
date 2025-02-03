import React from 'react';
import styled from 'styled-components';


const ProjectPromoteForm = () => {
  const projectTitle = "프로젝트 설명";
  const projectDescription = `“다른 IT 동아리와 협업하거나, 프로젝트를 함께 할 동료를 구할 수는 없을까?” 

투게다는 IT 동아리 네트워킹 플랫폼으로 타 동아리와의 협업을 촉진하고, 서비스 런칭을 위한 팀원을 모집할 수 있습니다. 
협업을 통해 새로운 경험을 할 수 있으며 더욱 성장한 모습을 찾아볼 수 있어요!`;

  return (
    <div>
      <Title>{projectTitle}</Title>
      <Description>{projectDescription}</Description>
    </div>
  );
};

export default ProjectPromoteForm;


const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #212121;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 16px;
  color: #414141;
  line-height: 1.5;
  margin-bottom: 40px;
  font-weight: 600;
  white-space: pre-line;
`;
