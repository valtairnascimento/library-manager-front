import React from "react";
import { Container, Content } from "./styles";
import ContentHeader from "../../components/ContentHeader";
import ButtonInput from "../../components/ButtonInput";

const Loan: React.FC = () => {
  return (
    <Container>
      <ContentHeader title="Empréstimos" linecolor="#E44C4E">
        <ButtonInput onClick={() => {}} label="Novo Empréstimo" />
      </ContentHeader>

      <Content>
        <p>aqui vou criar os empréstimos</p>
      </Content>
    </Container>
  );
};

export default Loan;
