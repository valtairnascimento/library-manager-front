import React, { useState, useEffect } from "react";
import { Modal } from "../../hooks/useModal";
import { useLoan } from "../../services/contexts/LoanContext";
import Input from "../Input";
import Button from "../Button";

interface ReturnLoanModalProps {
  isOpen: boolean;
  closeModal: () => void;
  loanId: number | null;
  bookName: string;
  isReturned: boolean;
}

const ReturnLoanModal: React.FC<ReturnLoanModalProps> = ({
  isOpen,
  closeModal,
  loanId,
  bookName,
  isReturned,
}) => {
  const { returnLoan } = useLoan();
  const [returnDate, setReturnDate] = useState("");

  useEffect(() => {
    if (isOpen) {
      const today = new Date().toISOString().split("T")[0];
      setReturnDate(today);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loanId) {
      try {
        await returnLoan({
          id: loanId,
          returnDate: new Date(returnDate).toISOString(),
        });
        alert("Livro devolvido com sucesso!");
        closeModal();
      } catch (error) {
        alert("Erro ao devolver o livro.");
      }
    }
  };

  if (isReturned) {
    return (
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <h3>Livro já devolvido</h3>
        <Button onClick={closeModal}>Fechar</Button>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <h3 style={{ marginBottom: "0.5rem" }}>Devolver Livro</h3>
      <p>Livro: {bookName}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="returnDate">Data de Devolução:</label>
          <Input
            type="date"
            id="returnDate"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
          />
        </div>
        <Button type="submit">Confirmar Devolução</Button>
      </form>
    </Modal>
  );
};

export default ReturnLoanModal;
