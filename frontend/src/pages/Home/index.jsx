import React from "react";

import { Container, Content } from "./styles";

import Header from "../../components/Header";

const Home = () => {
  return (
    <Container>
      <Header />
      <Content style={{ "text-align": "center" }}>
        <h2>
          Queria colocar informações sobre os repasses e mensalidades com
          vencimento hoje... <br />
          <br />
          Implementarei posteriormente
        </h2>
      </Content>
    </Container>
  );
};

export default Home;
