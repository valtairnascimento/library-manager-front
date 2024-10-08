import React, { useState } from "react";
import { Container, Profile, Welcome, UserName } from "./styles";

import { useTheme } from "../../hooks/theme";

import Toggle from "../Toggle";

const MainHeader: React.FC = () => {
  const { toggleTheme, theme } = useTheme();

  const [darkTheme, setDarkTheme] = useState(() =>
    theme.title === "dark" ? true : false
  );

  const handleChangeTheme = () => {
    setDarkTheme(!darkTheme);
    toggleTheme();
  };

  return (
    <Container>
      <Toggle
        labelLeft="Claro"
        labelRight="Escuro"
        checked={darkTheme}
        onChange={handleChangeTheme}
      />

      <Profile>
        <Welcome>Olá, </Welcome>
        <UserName>Valtair Junior</UserName>
      </Profile>
    </Container>
  );
};

export default MainHeader;
