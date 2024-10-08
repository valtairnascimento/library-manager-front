import React from "react";
import { Container, Content } from "./styles";
import ContentHeader from "../../components/ContentHeader";
import ButtonInput from "../../components/ButtonInput";
import UsersCard from "../../components/UsersCard";
import { useUser } from "../../services/contexts/UserContext";
import { useModal } from "../../hooks/useModal";
import CreateUserModal from "../../components/Modals/CreateUserModal";

const List: React.FC = () => {
  const { users, isLoading } = useUser();
  const { isOpen, openModal, closeModal } = useModal();

  if (isLoading) {
    return <div>Carregando usuários...</div>;
  }

  return (
    <Container>
      <ContentHeader title="Usuários" linecolor="#E44C4E">
        <ButtonInput label="Criar Usuário" onClick={openModal} />
      </ContentHeader>

      <Content>
        {users?.map((user) => (
          <UsersCard
            key={user.id}
            tagColor="#E44C4E"
            title={user.name}
            subtitle={user.email}
            books={user.loans.map((loan) => loan)}
          />
        ))}
      </Content>

      <CreateUserModal isOpen={isOpen} closeModal={closeModal} />
    </Container>
  );
};

export default List;
