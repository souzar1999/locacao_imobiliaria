import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
import GlobalStyle from "./styles/global";
import { SnackbarProvider } from "notistack";

const App: React.FC = () => {
  return (
    <Router>
      <SnackbarProvider preventDuplicate>
        <Routes />
        <GlobalStyle />
      </SnackbarProvider>
    </Router>
  );
};

export default App;
