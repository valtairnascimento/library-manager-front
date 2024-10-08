import styled from "styled-components";

export const Container = styled.li`
  list-style: none;
  background-color: ${(props) => props.theme.colors.tertiary};
  max-width: 200px;
  height: 200px;
  border-radius: 8px;
  margin: 10px;
  padding: 15px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  transition: all 0.3s;

  position: relative;

  &:hover {
    opacity: 0.8;
    transform: scale(1.05);
  }

  > h4 {
    top: 0;
    font-size: 1.1rem;
    margin: 0;
    margin-bottom: 25px;
  }

  > small {
    font-style: italic;
    color: ${(props) => props.theme.colors.white};
  }

  > span {
    display: flex;
    font-size: 12px;
    margin-top: 5px;
  }
`;
