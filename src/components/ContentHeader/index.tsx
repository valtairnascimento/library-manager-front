import React from "react";
import { Container, TitleContainer, Button } from "./styles";

interface ContentHeaderProps {
  title: string;
  linecolor: string;
  children: React.ReactNode;
}

const ContentHeader: React.FC<ContentHeaderProps> = ({
  title,
  linecolor,
  children,
}) => {
  return (
    <Container>
      <TitleContainer linecolor={linecolor}>
        <h1>{title}</h1>
      </TitleContainer>
      <Button>{children}</Button>
    </Container>
  );
};

export default ContentHeader;
