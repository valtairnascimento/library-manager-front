import React from "react";
import { Container } from "./styles";

interface ButtonInputProps {
  label: string;
  onClick: () => void;
}

const ButtonInput: React.FC<ButtonInputProps> = ({ label, onClick }) => {
  return (
    <Container>
      <button onClick={onClick}>{label}</button>
    </Container>
  );
};

export default ButtonInput;
