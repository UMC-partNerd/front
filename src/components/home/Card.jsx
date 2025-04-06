import React from "react";
import {
  CardContainer,
  Thumbnail,
  ContentSection,
  Badge,
  Title,
  Content,
  Footer,
} from "../../styled-components/styled-Card";

export const VARIANTS = {
  PROJECT: "project",
  CLUB: "club",
};

function Card({ title, content, thumbnail, footer, variant }) {
  const renderProjectCard = () => (
    <CardContainer variant={variant}>
      <Thumbnail variant={variant}>
        <img
          src={thumbnail}
          alt={title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "12px",
          }}
          loading="lazy"
        />
      </Thumbnail>
      <ContentSection variant={variant}>
        <Title variant={variant}>{title}</Title>
        <Content variant={variant}>{content}</Content>
      </ContentSection>
    </CardContainer>
  );

  const renderClubCard = () => (
    <CardContainer variant={variant}>
      <Thumbnail variant={variant}>
        <img
          src={thumbnail}
          alt={title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "16px",
          }}
          loading="lazy"
        />
      </Thumbnail>
      <ContentSection variant={variant}>
        <Badge>{footer}</Badge>
        <Title variant={variant}>{title}</Title>
        <Content variant={variant}>{content}</Content>
      </ContentSection>
    </CardContainer>
  );

  const renderDefaultCard = () => (
    <CardContainer variant={variant}>
      <Title variant={variant}>{title}</Title>
      <Content variant={variant}>{content}</Content>
      <Footer>
        <Thumbnail variant={variant}>
          <img
            src={thumbnail}
            alt={title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            loading="lazy"
          />
        </Thumbnail>
        {footer}
      </Footer>
    </CardContainer>
  );

  if (variant === VARIANTS.PROJECT) {
    return renderProjectCard();
  }

  if (variant === VARIANTS.CLUB) {
    return renderClubCard();
  }

  return renderDefaultCard();
}

export default Card;
