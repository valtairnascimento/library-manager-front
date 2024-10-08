import React from "react";
import { Container } from "./styles";

interface BooksCardProps {
  title: string;
  author: string;
  publicationYear: string;
  onClick: () => void;
}

const BooksCard: React.FC<BooksCardProps> = ({
  title,
  author,
  publicationYear,
  onClick,
}) => {
  return (
    <Container onClick={onClick}>
      <h4>{title}</h4>
      <p>Autor: {author}</p>
      <small>Ano de Publicação: {publicationYear}</small>
    </Container>
  );
};

export default BooksCard;
