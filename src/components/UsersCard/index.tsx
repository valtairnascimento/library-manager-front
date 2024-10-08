import React from "react";
import { Container, Tag } from "./styles";

interface UsersCardProps {
  tagColor: string;
  title: string;
  subtitle: string;
  books: string[];
}

const UsersCard: React.FC<UsersCardProps> = ({
  tagColor,
  title,
  subtitle,
  books,
}) => {
  return (
    <Container>
      <Tag color={tagColor} />
      <div>
        <span>{title}</span>
        <small>{subtitle}</small>
      </div>
      <div className="books">
        <span>Livros emprestados:</span>
        {books.length > 0 ? (
          <ul>
            {books.map((book, index) => (
              <li key={index}>{book}</li>
            ))}
          </ul>
        ) : (
          <p style={{ fontStyle: "italic", opacity: 0.7 }}>
            Nenhum livro emprestado
          </p>
        )}
      </div>
    </Container>
  );
};

export default UsersCard;
