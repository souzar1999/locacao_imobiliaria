import React from "react";

import { Switch, Route } from "react-router-dom";

import Clientes from "../pages/Clientes";
import Proprietarios from "../pages/Proprietarios";
import Imoveis from "../pages/Imoveis";
import Contratos from "../pages/Contratos";
import Home from "../pages/Home";
import Pagamentos from "../pages/Pagamentos";

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/clientes" component={Clientes} />
    <Route path="/proprietarios" component={Proprietarios} />
    <Route path="/imoveis" component={Imoveis} />
    <Route path="/contratos" component={Contratos} />
    <Route path="/pagamentos/:id" component={Pagamentos} />
  </Switch>
);

export default Routes;
