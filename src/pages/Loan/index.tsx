import React from "react";
import { Container, Content } from "./styles";
import ContentHeader from "../../components/ContentHeader";
import ButtonInput from "../../components/ButtonInput";
import { useModal } from "../../hooks/useModal";
import CreateLoanModal from "../../components/Modals/CreateLoanModal";
import { useLoan } from "../../services/contexts/LoanContext";
import LoansCard from "../../components/LoansCard";

const Loan: React.FC = () => {
  const { loans, isLoading } = useLoan();
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedBookId, setSelectedBookId] = React.useState<number | null>(
    null
  );

  if (isLoading) {
    return <div>Carregando empréstimos...</div>;
  }

  return (
    <Container>
      <ContentHeader title="Empréstimos" linecolor="#E44C4E">
        <ButtonInput onClick={openModal} label="Novo Empréstimo" />
      </ContentHeader>

      <Content>
        {loans?.map((loan) => (
          <LoansCard
            key={loan.id}
            bookName={loan.bookName}
            userName={loan.userName}
            LoanDate={new Date(loan.loanDate).toLocaleString()}
            returnDate={new Date(loan.returnDate).toLocaleString()}
            loanId={loan.id}
          />
        ))}
      </Content>

      <CreateLoanModal
        isOpen={isOpen}
        closeModal={closeModal}
        selectedBookId={selectedBookId}
        setSelectedBookId={setSelectedBookId}
      />
    </Container>
  );
};

export default Loan;
