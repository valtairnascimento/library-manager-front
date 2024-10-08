import React from "react";
import logoImg from "../../assets/bookIcon.svg";
import { FiBook } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa6";
import { LuBookDown } from "react-icons/lu";
import { MdOutlineExitToApp } from "react-icons/md";
import {
  Container,
  Header,
  LogoImg,
  MenuContainer,
  MenuItemLink,
  Title,
  MenuItemButton,
} from "./styles";
import { useAuth } from "../../hooks/auth";

const Aside: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Container>
      <Header>
        <LogoImg src={logoImg} alt="Logo biblioteca" />
        <Title>Biblioteca</Title>
      </Header>

      <MenuContainer>
        <MenuItemLink href="/">
          <FiBook />
          Livros
        </MenuItemLink>
        <MenuItemLink href="/list">
          <FaRegUser />
          Usuarios
        </MenuItemLink>
        <MenuItemLink href="/loan">
          <LuBookDown /> Emprestimos
        </MenuItemLink>
        <MenuItemButton onClick={signOut}>
          <MdOutlineExitToApp />
          Sair
        </MenuItemButton>
      </MenuContainer>
    </Container>
  );
};

export default Aside;
