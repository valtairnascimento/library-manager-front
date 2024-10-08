import styled from "styled-components";

export const Container = styled.li`
  list-style: none;
  background-color: ${(props) => props.theme.colors.tertiary};
  border-radius: 5px;
  margin: 10px 0;
  padding: 12px 10px;

  display: flex;
  align-items: center;

  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    opacity: 0.7;
    transform: translateX(10px);
  }

  > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    padding-left: 10px;
  }
`;
