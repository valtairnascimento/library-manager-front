import React, { useEffect, useState } from "react";
import { useLoan } from "../../services/contexts/LoanContext";
import { useUser } from "../../services/contexts/UserContext";
import { useBook } from "../../services/contexts/BookContext";
import { Modal } from "../../hooks/useModal";
import Input from "../Input";
import Button from "../Button";
import Select from "../Select";

interface CreateLoanModalProps {
  isOpen: boolean;
  closeModal: () => void;
  selectedBookId: number | null;
  setSelectedBookId?: React.Dispatch<React.SetStateAction<number | null>>;
}

const CreateLoanModal: React.FC<CreateLoanModalProps> = ({
  isOpen,
  closeModal,
  selectedBookId,
  setSelectedBookId,
}) => {
  const { createLoan } = useLoan();
  const { users } = useUser();
  const { books } = useBook();
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [loanDate, setLoanDate] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setSelectedUserId(null);
      setLoanDate("");
    }
  }, [isOpen]);

  const selectedBook = books?.find((book) => book.id === selectedBookId);

  const handleBookChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const bookId = Number(e.target.value);
    setSelectedBookId && setSelectedBookId(bookId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUserId && (selectedBookId || selectedBook) && loanDate) {
      try {
        await createLoan({
          idUser: selectedUserId,
          idBook: selectedBookId || selectedBook!.id,
          loanDate,
        });
        alert("Empréstimo criado com sucesso!");
        closeModal();
      } catch (error) {
        alert("Erro ao criar empréstimo.");
      }
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <h3 style={{ marginBottom: "0.5rem" }}>Criar Novo Empréstimo</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <Select
            id="user"
            value={selectedUserId ?? ""}
            onChange={(e) => setSelectedUserId(Number(e.target.value))}
          >
            <option value="">Selecione um usuário</option>
            {users?.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <label htmlFor="book">Selecione um Livro:</label>
          <Select
            id="book"
            value={selectedBookId ?? ""}
            onChange={handleBookChange}
          >
            <option value="">Selecione um livro</option>
            {books?.map((book) => (
              <option key={book.id} value={book.id}>
                {book.title}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <label htmlFor="loanDate">Data do Empréstimo:</label>
          <Input
            type="date"
            id="loanDate"
            value={loanDate}
            onChange={(e) => setLoanDate(e.target.value)}
          />
        </div>

        <Button type="submit">Criar Empréstimo</Button>
      </form>
    </Modal>
  );
};

export default CreateLoanModal;
