import React from "react";
import { Link } from "react-router-dom";

import logoImg from "../../assets/images/logo.svg";
import { Header, HeaderContent } from "./styles";

const HeaderComponent = () => {
  return (
    <Header>
      <HeaderContent>
        <div className="image">
          <img src={logoImg} alt="Countries" />
        </div>
        <div className="menu">
          <Link to="/">Home</Link>
          <hr />
          <Link to="/contratos">Contratos</Link>
          <hr />
          <Link to="/clientes">Clientes</Link>
          <hr />
          <Link to="/proprietarios">Proprietátios</Link>
          <hr />
          <Link to="/imoveis">Imóveis</Link>
        </div>
      </HeaderContent>
    </Header>
  );
};

export default HeaderComponent;
