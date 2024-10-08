import React from "react";

import ContentHeader from "../../components/ContentHeader";
import { Container } from "./style";
import ButtonInput from "../../components/ButtonInput";

const Home: React.FC = () => {
  return (
    <Container>
      <ContentHeader title="Livros" linecolor="#F7931B">
        <ButtonInput onClick={() => {}} label="Criar Livro" />
      </ContentHeader>
    </Container>
  );
};

export default Home;
