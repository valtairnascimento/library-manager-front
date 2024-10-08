import React, { useState } from "react";
import ContentHeader from "../../components/ContentHeader";
import { Container } from "./style";
import ButtonInput from "../../components/ButtonInput";
import BooksCard from "../../components/BooksCard";
import { useBook } from "../../services/contexts/BookContext";
import { useModal } from "../../hooks/useModal";
import CreateLoanModal from "../../components/Modals/CreateLoanModal";
import CreateBookModal from "../../components/Modals/CreateBookModal";

const Home: React.FC = () => {
  const { books, isLoading } = useBook();
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [modalType, setModalType] = useState<
    "createBook" | "createLoan" | null
  >(null);

  if (isLoading) {
    return <div>Carregando livros...</div>;
  }

  const handleBookClick = (bookId: number) => {
    setSelectedBookId(bookId);
    setModalType("createLoan");
    openModal();
  };

  const handleCreateBookClick = () => {
    setModalType("createBook");
    openModal();
  };

  return (
    <Container>
      <ContentHeader title="Livros" linecolor="#F7931B">
        <ButtonInput onClick={handleCreateBookClick} label="Criar Livro" />
      </ContentHeader>

      <div className="books-grid">
        {books?.map((book) => (
          <BooksCard
            key={book.id}
            title={book.title}
            author={book.author}
            publicationYear={new Date(book.publicationYear)
              .getFullYear()
              .toString()}
            onClick={() => handleBookClick(book.id)}
          />
        ))}
      </div>

      {modalType === "createLoan" && (
        <CreateLoanModal
          isOpen={isOpen}
          closeModal={closeModal}
          selectedBookId={selectedBookId}
          setSelectedBookId={setSelectedBookId}
        />
      )}

      {modalType === "createBook" && (
        <CreateBookModal isOpen={isOpen} closeModal={closeModal} />
      )}
    </Container>
  );
};

export default Home;
