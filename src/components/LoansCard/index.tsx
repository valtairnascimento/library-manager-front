import React, { useState } from "react";
import { Container } from "./styles";
import ReturnLoanModal from "../Modals/ReturnLoanModal";
import { useModal } from "../../hooks/useModal";

interface LoansCardProps {
  loanId: number;
  bookName: string;
  userName: string;
  LoanDate: string;
  returnDate: string;
}

const LoansCard: React.FC<LoansCardProps> = ({
  loanId,
  bookName,
  userName,
  LoanDate,
  returnDate,
}) => {
  const { isOpen, openModal, closeModal } = useModal();

  const handleCardClick = () => {
    if (returnDate === "01/01/1, 00:00:00") {
      openModal();
    } else {
      alert("Livro já devolvido");
    }
  };

  return (
    <>
      <Container onClick={handleCardClick}>
        <div>
          <span>{bookName}</span>
          <small>Usuário: {userName}</small>
          <small>Data do empréstimo: {LoanDate}</small>
          <small>
            Data de devolução:{" "}
            {returnDate === "01/01/1, 00:00:00"
              ? "Livro não devolvido"
              : returnDate}
          </small>
        </div>
      </Container>

      <ReturnLoanModal
        isOpen={isOpen}
        closeModal={closeModal}
        loanId={loanId}
        bookName={bookName}
        isReturned={returnDate !== "01/01/1, 00:00:00"}
      />
    </>
  );
};

export default LoansCard;
