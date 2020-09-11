import React, { useState, useEffect } from "react";
import { withSnackbar } from "notistack";

import { Container, Content, TitleContainer, Main, Table } from "./styles";

import Header from "../../components/Header";
import api from "../../services/api";
import { formatDate, formatMoney } from "../../services/format";

const Pagamentos = ({ enqueueSnackbar, match }) => {
  const [repasses, setRepasses] = useState([]);
  const [mensalidades, setMensalidades] = useState([]);
  const contratoId = match.params.id;

  useEffect(() => {
    handleGetRepasses();
    handleGetMensalidades(); // eslint-disable-next-line
  }, []);

  const handleGetRepasses = async () => {
    await api
      .get("repasses/list.php", {
        params: {
          id: contratoId,
        },
      })
      .then(({ data }) => {
        setRepasses(data);
        console.log(data[1].realizado);
        console.log(data[0].realizado);
      })
      .catch(() => {
        enqueueSnackbar(`Problemas ao carregar repasses!`, {
          variant: "error",
          autoHideDuration: 5000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
      });
  };

  const handleGetMensalidades = async () => {
    await api
      .get("mensalidades/list.php", {
        params: {
          id: contratoId,
        },
      })
      .then(({ data }) => {
        setMensalidades(data);
      })
      .catch(() => {
        enqueueSnackbar(`Problemas ao carregar mensalidades!`, {
          variant: "error",
          autoHideDuration: 5000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
      });
  };

  const handleCheckRepasse = async (id) => {
    await api
      .put(
        "repasses/realizado.php",
        {
          realizado: 1,
        },
        {
          params: {
            id,
          },
        }
      )
      .catch(() => {
        enqueueSnackbar(`Problemas ao alterar remessa!`, {
          variant: "error",
          autoHideDuration: 5000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
      });
  };

  const handleCheckMensalidade = async (id) => {
    await api
      .put(
        "mensalidades/pago.php",
        {
          pago: 1,
        },
        {
          params: {
            id,
          },
        }
      )
      .catch(() => {
        enqueueSnackbar(`Problemas ao alterar mensalidades!`, {
          variant: "error",
          autoHideDuration: 5000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
      });
  };

  return (
    <Container>
      <Header />
      <Content>
        <TitleContainer>Pagamentos do contrato</TitleContainer>
        <Main>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Data de Início</th>
                <th>Data de Vencimento</th>
                <th>Valor</th>
                <th>Realizar repasse?</th>
              </tr>
            </thead>
            <tbody>
              {repasses.map((item, index) => (
                <tr key={`repasse${item.id}`}>
                  <td>{`${index + 1}° Remessa`}</td>
                  <td>{formatDate(item.data_ini)}</td>
                  <td>{formatDate(item.data_fim)}</td>
                  <td>{formatMoney(item.valor)}</td>
                  <td className="actions">
                    {item.realizado == 0 ? (
                      <button
                        className="edit"
                        onClick={(event) => {
                          handleCheckRepasse(item.id);
                          event.target.style.display = "none";
                        }}
                      >
                        Realizar
                      </button>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Data de Início</th>
                <th>Data de Vencimento</th>
                <th>Valor</th>
                <th>Mensalidade paga?</th>
              </tr>
            </thead>
            <tbody>
              {mensalidades.map((item, index) => (
                <tr key={`mensalidade${item.id}`}>
                  <td>{`${index + 1}° Mensalidade`}</td>
                  <td>{formatDate(item.data_ini)}</td>
                  <td>{formatDate(item.data_fim)}</td>
                  <td>{formatMoney(item.valor)}</td>
                  <td className="actions">
                    {item.pago == 0 ? (
                      <button
                        className="edit"
                        onClick={(event) => {
                          handleCheckMensalidade(item.id);
                          event.target.style.display = "none";
                        }}
                      >
                        Pagar
                      </button>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Main>
      </Content>
    </Container>
  );
};

export default withSnackbar(Pagamentos);
