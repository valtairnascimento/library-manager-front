import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  > h1 {
    margin-bottom: 20px;
  }

  .books-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .books-grid > * {
    flex: 0 0 calc(25% - 10px);
    margin-bottom: 20px;
  }
`;
