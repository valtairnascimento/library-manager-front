import React, { useEffect, useState } from "react";
import { useUser } from "../../services/contexts/UserContext";
import { Modal } from "../../hooks/useModal"; // Importando o Modal que já foi criado
import Input from "../Input";
import Button from "../Button";

interface CreateUserModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({
  isOpen,
  closeModal,
}) => {
  const { createUser } = useUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client");
  const [birthdate, setBirthdate] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setName("");
      setEmail("");
      setPassword("");
      setRole("client");
      setBirthdate("");
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedBirthdate = new Date(birthdate).toISOString();

    try {
      await createUser({
        name,
        email,
        password,
        role,
        birthdate: formattedBirthdate,
      });
      alert("Usuário criado com sucesso!");
      closeModal();
    } catch (error) {
      alert("Erro ao criar usuário.");
    }
  };

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <h3 style={{ marginBottom: "0.5rem" }}>Criar Novo Usuário</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <Input
            placeholder="Digite o nome"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <Input
            placeholder="Digite o email"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <label>Selecione o perfil:</label>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <Input
              type="radio"
              id="admin"
              name="role"
              value="admin"
              checked={role === "admin"}
              onChange={() => setRole("admin")}
            />
            <label htmlFor="admin">Administrador</label>
          </div>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <Input
              type="radio"
              id="client"
              name="role"
              value="client"
              checked={role === "client"}
              onChange={() => setRole("client")}
            />
            <label htmlFor="client">Cliente</label>
          </div>
        </div>

        <div
          style={{
            marginTop: "1rem",
          }}
        >
          <label htmlFor="birthdate">Data de Nascimento</label>
          <Input
            type="date"
            id="birthdate"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
        </div>

        <div>
          <Input
            placeholder="Digite a senha"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button type="submit">Criar Usuário</Button>
      </form>
    </Modal>
  );
};

export default CreateUserModal;
