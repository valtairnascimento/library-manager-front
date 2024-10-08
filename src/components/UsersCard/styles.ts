import styled from "styled-components";

interface TagProps {
  color: string;
}

export const Container = styled.li`
  list-style: none;
  background-color: ${(props) => props.theme.colors.tertiary};
  border-radius: 5px;
  margin: 10px 0;
  padding: 12px 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  cursor: pointer;
  transition: all 0.3s;

  position: relative;

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

  .books {
    margin-top: 5px;

    > span {
      font-weight: bold;
      margin-bottom: 5px;
    }

    > ul {
      list-style: none;
      padding-left: 0;

      > li {
        margin-top: 2px;
      }
    }
  }
`;

export const Tag = styled.div<TagProps>`
  width: 10px;
  height: 60%;
  background-color: ${(props) => props.color};

  position: absolute;
  left: 0;
`;
