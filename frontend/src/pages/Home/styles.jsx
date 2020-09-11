import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  width: 100%;
`;

export const Content = styled.div`
  max-width: 960px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 15px 0;
  margin: 45px auto 0;
  @media only screen and (max-width: 768px) {
    padding: 15px;
  }
`;
