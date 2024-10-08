import React, { useEffect, useState } from "react";
import { Modal } from "../../hooks/useModal";
import Input from "../Input";
import Button from "../Button";
import { useBook } from "../../services/contexts/BookContext";

interface CreateBookModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const CreateBookModal: React.FC<CreateBookModalProps> = ({
  isOpen,
  closeModal,
}) => {
  const { createBook } = useBook();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [publicationYear, setPublicationYear] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setTitle("");
      setAuthor("");
      setIsbn("");
      setPublicationYear("");
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedBirthdate = new Date(publicationYear).toISOString();

    try {
      await createBook({
        title,
        author,
        isbn,
        publicationYear: formattedBirthdate,
      });
      alert("Livro criado com sucesso!");
      closeModal();
    } catch (error) {
      alert("Erro ao criar livro.");
    }
  };

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <h3 style={{ marginBottom: "0.5rem" }}>Criar Novo Livro</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <Input
            placeholder="Digite o nome"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <Input
            placeholder="Digite o autor"
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <div>
          <Input
            placeholder="ISBN"
            type="text"
            id="isbn"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
          />
        </div>

        <div
          style={{
            marginTop: "0.5rem",
          }}
        >
          <label htmlFor="birthdate">Data de publicacao</label>
          <Input
            type="date"
            id="publicationYear"
            value={publicationYear}
            onChange={(e) => setPublicationYear(e.target.value)}
          />
        </div>

        <Button type="submit">Criar Livro</Button>
      </form>
    </Modal>
  );
};

export default CreateBookModal;
