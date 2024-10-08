import styled from "styled-components";

interface TitleContainerProps {
  linecolor: string;
}

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  margin-bottom: 25px;
`;

export const TitleContainer = styled.div<TitleContainerProps>`
  > h1 {
    color: ${(props) => props.theme.colors.white};

    &::after {
      content: "";
      display: block;
      width: 55px;
      border-bottom: 10px solid ${(props) => props.linecolor};
    }
  }
`;

export const Button = styled.div``;
