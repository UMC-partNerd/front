import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <LogoSection>
          <div className="logo">
            <img src="/Frame.png" alt="Frame" />
            <img src="/blog.png" alt="Blog" />
            <img src="/insta.png" alt="Instagram" />
          </div>
          <div className="company-info">
            (주)파트너드| 대표자명:노브 | 개인정보관리책임자: 노브 | 주소: 서울시 유엠시 유엠로123 4층
            <br />
            사업자등록번호: 123-45-67890 | 통신판매업 신고번호: 2024-서울유엠-12345
            <br />
            고객센터: 1234-5678 | 이메일: support@majorlink.co.kr
          </div>
          <div className="disclaimer">
            (주) 파트너드는 통신판매중개자로서 거래 당사자가 아니므로, 상품정보 거래 등에 관한 의무와 책임을 지지 않습니다.
          </div>
          <div className="copyright">
            Copyright ⓒ 2025 partNerd. All rights reserved.
          </div>
        </LogoSection>
        <InfoSection>
          <InfoBox>
            <InfoColumn>
              <strong>서비스 정책</strong>
              <ul>
                <li>이용약관</li>
                <li>개인정보 처리방침</li>
                <li>최소 및 환불 규정</li>
                <li>FAQ</li>
              </ul>
            </InfoColumn>
            <InfoColumn>
              <strong>고객지원</strong>
              <ul>
                <li>문의하기</li>
                <li>공지사항</li>
              </ul>
            </InfoColumn>
            <InfoColumn>
              <strong>파트너드</strong>
              <ul>
                <li>파트너드 소개</li>
                <li>블로그</li>
                <li>제휴문의</li>
              </ul>
            </InfoColumn>
          </InfoBox>
        </InfoSection>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  background-color: #F3F3F3F3;
  padding: 5px 0;
  font-size: 11px;
  border-top: 1px solid #e7e7e7;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  margin-top: auto;
  font-family: 'Pretendard', sans-serif; 
`;

const FooterContent = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 0 auto;
`;

const LogoSection = styled.div`
  text-align: left;
  width: 45%;
  padding-bottom: 5px;
  margin: 0;

  .logo {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 5px;
    margin-top: 30px;
    display: flex;
    align-items: center;
  }

  .logo img:first-child {
    width: 120px; 
    height: auto;
    margin-right: 15px; 
  }

  .logo img {
    margin-left: 6px;
    width: 22px; 
    height: 20px;
  }

  .company-info {
    margin-top: 10px;
    margin-bottom: 50px;
    font-size: 10px;
    line-height: 1.8;
    color: #C2C2C2;
  }

  .disclaimer {
    font-size: 10px;
    color: #0D29B7;
    margin-top: 4px;
    font-weight: bold;
  }

  .copyright {
    font-size: 10px;
    color: #C2C2C2;
    margin-top: 4px;
  }
`;

const InfoSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 45%;
  flex-wrap: wrap;
  gap: 40px;
`;

const InfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 380px;
  flex-wrap: wrap;
  margin-top: 70px;
`;

const InfoColumn = styled.div`
  text-align: left;
  font-size: 10px;
  width: 30%;
  margin-right: 5px;
  margin-bottom: 15px;

  strong {
    display: block;
    margin-bottom: 5px;
    font-size: 12px;
    font-weight: bold;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin: 15px 0;
      font-size: 10px;
    }
  }
`;
