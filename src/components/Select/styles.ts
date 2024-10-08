import styled from "styled-components";

export const Container = styled.select`
  width: 100%;
  margin: 7px 0;
  padding: 10px;

  border-radius: 5px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.secondary};
`;
