import React, { InputHTMLAttributes } from "react";

import { Container } from "./styles";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({ ...rest }) => (
  <Container {...rest}></Container>
);

export default Input;
