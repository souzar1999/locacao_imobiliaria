import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { withSnackbar } from "notistack";
import { useHistory } from "react-router-dom";

import {
  Container,
  Content,
  TitleContainer,
  Main,
  Table,
  ModalContent,
} from "./styles";

import Header from "../../components/Header";
import api from "../../services/api";

Modal.setAppElement("#root");

const headers = [
    {
      name: "#",
      field: "id",
    },
    {
      name: "Cliente",
      field: "cliente_nome",
    },
    {
      name: "Proprietario",
      field: "proprietario_nome",
    },
    {
      name: "Início",
      field: "data_ini",
    },
    {
      name: "Fim",
      field: "data_fim",
    },
    {
      name: "Taxa",
      field: "taxa_adm",
    },
    {
      name: "Aluguel",
      field: "aluguel",
    },
    {
      name: "Condomínio",
      field: "condominio",
    },
    {
      name: "IPTU",
      field: "iptu",
    },
  ],
  listUrl = "/contratos/list.php",
  storeUrl = "/contratos/store.php",
  updateUrl = "/contratos/update.php",
  deleteUrl = "/contratos/delete.php";

const Contratos = ({ enqueueSnackbar }) => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [proprietarios, setProprietarios] = useState([]);
  const [imoveis, setImoveis] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [imoveisSelect, setImoveisSelect] = useState([]);
  const [editId, setEditId] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [proprietarioId, setProprietarioId] = useState(null);
  const [clienteId, setClienteId] = useState(null);
  const [imovelId, setImovelId] = useState(null);
  const [dataIni, setDataIni] = useState(null);
  const [dataFim, setDataFim] = useState(null);
  const [taxaAdm, setTaxaAdm] = useState("0,00");
  const [aluguel, setAluguel] = useState("0,00");
  const [condominio, setCondominio] = useState("0,00");
  const [iptu, setIptu] = useState("0,00");

  useEffect(() => {
    handleList(); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!modalIsOpen) {
      handleList();
    } else {
      handleGetProprietarios();
      handleGetClientes();
      handleGetImoveis();
    } // eslint-disable-next-line
  }, [modalIsOpen]);

  useEffect(() => {
    if (proprietarioId) {
      setImoveisSelect(
        imoveis.filter((imovel) => imovel.proprietario_id === proprietarioId)
      );
    } else {
      setImoveisSelect([]);
    } // eslint-disable-next-line
  }, [proprietarioId]);

  const handleVerificaDados = () => {
    let validado = "";

    if (!proprietarioId) {
      validado += "Necessário selecionar o proprietário!\n";
    }

    if (!clienteId) {
      validado += "Necessário informar o cliente!\n";
    }

    if (!imovelId) {
      validado += "Necessário informar o imóvel!\n";
    }

    if (!dataIni) {
      validado += "Necessário informar a data de início!\n";
    }

    if (!taxaAdm) {
      validado += "Necessário informar a taxa de administração!\n";
    }

    if (!aluguel) {
      validado += "Necessário informar o valor do aluguel!\n";
    }

    if (!condominio) {
      validado += "Necessário informar o valor do condominio!\n";
    }

    if (!iptu) {
      validado += "Necessário informar o valor do IPTU!\n";
    }

    return validado;
  };

  const handleStore = async () => {
    const msgErro = handleVerificaDados();
    if (!msgErro) {
      await api
        .post(storeUrl, {
          proprietario_id: proprietarioId,
          cliente_id: clienteId,
          imovel_id: imovelId,
          data_ini: dataIni,
          data_fim: dataFim,
          taxa_adm: taxaAdm,
          aluguel,
          condominio,
          iptu,
        })
        .then((response) => {
          handleCloseModal();
          enqueueSnackbar("Contrato cadastrado com sucesso!", {
            variant: "success",
            autoHideDuration: 5000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
        })
        .catch(() => {
          enqueueSnackbar(`Problemas ao cadastrar contrato!`, {
            variant: "error",
            autoHideDuration: 5000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
        });
    } else {
      enqueueSnackbar(msgErro, {
        variant: "error",
        autoHideDuration: 10000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        style: { whiteSpace: "pre-line" },
      });
    }
  };

  const handleUpdate = async (id) => {
    const msgErro = handleVerificaDados();
    if (!msgErro) {
      await api
        .put(
          updateUrl,
          {
            proprietario_id: proprietarioId,
            cliente_id: clienteId,
            imovel_id: imovelId,
            data_ini: dataIni,
            data_fim: dataFim,
            taxa_adm: taxaAdm,
            aluguel,
            condominio,
            iptu,
          },
          {
            params: {
              id,
            },
          }
        )
        .then(() => {
          handleCloseModal();
          enqueueSnackbar("Contrato atualizado com sucesso!", {
            variant: "success",
            autoHideDuration: 5000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
        })
        .catch(() => {
          enqueueSnackbar(`Problemas ao atualizar contrato!`, {
            variant: "error",
            autoHideDuration: 5000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
        });
    } else {
      enqueueSnackbar(msgErro, {
        variant: "error",
        autoHideDuration: 10000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        style: { whiteSpace: "pre-line" },
      });
    }
  };

  const handleList = async () => {
    await api
      .get(listUrl)
      .then(({ data }) => {
        setData(data);
      })
      .catch(() => {
        enqueueSnackbar(`Problemas ao carregar contratos!`, {
          variant: "error",
          autoHideDuration: 5000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
      });
  };

  const handleDelete = async (id) => {
    await api
      .delete(deleteUrl, {
        params: {
          id,
        },
      })
      .then((response) => {
        setData(data.filter((item) => item.id !== id));

        enqueueSnackbar("Contrato deletado com sucesso!", {
          variant: "success",
          autoHideDuration: 5000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
      })
      .catch(() => {
        enqueueSnackbar(`Problemas ao deletar contrato!`, {
          variant: "error",
          autoHideDuration: 5000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
      });
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleGetProprietarios = async () => {
    await api
      .get("proprietarios/list.php")
      .then(({ data }) => {
        setProprietarios(data);
      })
      .catch(() => {
        enqueueSnackbar(`Problemas ao carregar proprietários!`, {
          variant: "error",
          autoHideDuration: 5000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
      });
  };

  const handleGetImoveis = async () => {
    await api
      .get("imoveis/list.php")
      .then(({ data }) => {
        setImoveis(data);
      })
      .catch(() => {
        enqueueSnackbar(`Problemas ao carregar imóveis!`, {
          variant: "error",
          autoHideDuration: 5000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
      });
  };

  const handleGetClientes = async () => {
    await api
      .get("clientes/list.php")
      .then(({ data }) => {
        setClientes(data);
      })
      .catch(() => {
        enqueueSnackbar(`Problemas ao carregar clientes!`, {
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
        <TitleContainer>Contratos</TitleContainer>
        <Main>
          <Table>
            <>
              <thead>
                <tr>
                  {headers.map(({ name, field }) => (
                    <th key={name}>{name}</th>
                  ))}
                  <th className="actions">
                    <button
                      type="button"
                      className="add"
                      onClick={() => {
                        handleOpenModal(null);
                      }}
                    >
                      Adicionar
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    {headers.map(({ field }) => (
                      <td key={`${field}${item.id}`}>{item[field]}</td>
                    ))}
                    <td className="actions">
                      <button
                        type="button"
                        className="edit"
                        onClick={() => {
                          history.push(`/pagamentos/${item.id}`);
                        }}
                      >
                        Pagamentos
                      </button>
                      <button
                        type="button"
                        className="delete"
                        onClick={() => {
                          handleDelete(item.id);
                        }}
                      >
                        Apagar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          </Table>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={handleCloseModal}
            style={{
              content: {
                top: "50%",
                left: "50%",
                right: "auto",
                bottom: "auto",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)",
              },
            }}
            contentLabel="Example Modal"
          >
            <ModalContent>
              <form
                no-validate="true"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (editId) {
                    handleUpdate(editId);
                  } else {
                    handleStore();
                  }
                }}
              >
                <div>
                  <label htmlFor="cliente">
                    Cliente: <span>*</span>
                  </label>
                  <select
                    value={clienteId}
                    name="cliente"
                    id="cliente"
                    onChange={(event) =>
                      setClienteId(event.nativeEvent.target.value)
                    }
                  >
                    <option value="">--Selecione--</option>
                    {clientes.map((item) => {
                      return (
                        <option id={item.id} key={item.id} value={item.id}>
                          {item.nome}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div>
                  <label htmlFor="proprietario">
                    Proprietário: <span>*</span>
                  </label>
                  <select
                    value={proprietarioId}
                    name="proprietario"
                    id="proprietario"
                    onChange={(event) =>
                      setProprietarioId(event.nativeEvent.target.value)
                    }
                  >
                    <option value="">--Selecione--</option>
                    {proprietarios.map((item) => {
                      return (
                        <option id={item.id} key={item.id} value={item.id}>
                          {item.nome}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div>
                  <label htmlFor="imovel">
                    Imóveis: <span>*</span>
                  </label>
                  <select
                    value={imovelId}
                    name="imovel"
                    id="imovel"
                    onChange={(event) =>
                      setImovelId(event.nativeEvent.target.value)
                    }
                  >
                    <option value="">--Selecione--</option>
                    {imoveisSelect.map((item) => {
                      return (
                        <option id={item.id} key={item.id} value={item.id}>
                          {item.endereco}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div>
                  <label htmlFor="dataIni">
                    Data de Início: <span>*</span>
                  </label>
                  <input
                    type="date"
                    name="dataIni"
                    value={dataIni}
                    onChange={(event) => {
                      setDataIni(event.target.value);

                      const date = new Date(event.target.value);

                      let year = 0,
                        month = 0;

                      if (date.getUTCMonth() + 12) {
                        year = date.getUTCFullYear() + 1;
                        month = ("0" + date.getUTCMonth()).slice(-2);
                      } else {
                        year = date.getUTCFullYear();
                        month = ("0" + (date.getUTCMonth() + 12)).slice(-2);
                      }

                      const today = new Date(year, month, 0)
                        .toISOString()
                        .split("T")[0];

                      setDataFim(today);
                    }}
                    placeholder="Data de Início"
                  />
                </div>
                <div>
                  <label htmlFor="dataFim">Data de Saída:</label>
                  <input
                    disabled
                    type="date"
                    name="dataFim"
                    value={dataFim}
                    placeholder="Data de Saída"
                  />
                </div>
                <div>
                  <label htmlFor="taxaAdm">
                    Taxa de Administração (R$): <span>*</span>
                  </label>
                  <input
                    type="number"
                    name="taxaAdm"
                    value={taxaAdm}
                    onChange={(event) =>
                      setTaxaAdm(
                        event.target.value.toLocaleString("pt-br", {
                          minimumFractionDigits: 2,
                        })
                      )
                    }
                    placeholder="Taxa de Administração"
                  />
                </div>
                <div>
                  <label htmlFor="aluguel">
                    Aluguel (R$): <span>*</span>
                  </label>
                  <input
                    type="number"
                    name="aluguel"
                    value={aluguel}
                    onChange={(event) =>
                      setAluguel(
                        event.target.value.toLocaleString("pt-br", {
                          minimumFractionDigits: 2,
                        })
                      )
                    }
                    placeholder="Aluguel"
                  />
                </div>
                <div>
                  <label htmlFor="condominio">
                    Condomínio (R$): <span>*</span>
                  </label>
                  <input
                    type="number"
                    name="condominio"
                    value={condominio}
                    onChange={(event) =>
                      setCondominio(
                        event.target.value.toLocaleString("pt-br", {
                          minimumFractionDigits: 2,
                        })
                      )
                    }
                    placeholder="Condomínio"
                  />
                </div>
                <div>
                  <label htmlFor="iptu">
                    IPTU (R$): <span>*</span>
                  </label>
                  <input
                    type="number"
                    name="iptu"
                    value={iptu}
                    onChange={(event) =>
                      setIptu(
                        event.target.value.toLocaleString("pt-br", {
                          minimumFractionDigits: 2,
                        })
                      )
                    }
                    placeholder="IPTU"
                  />
                </div>
                <div>
                  <button className="save" type="submit">
                    Salvar
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => {
                      handleCloseModal();
                    }}
                    className="cancel"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </ModalContent>
          </Modal>
        </Main>
      </Content>
    </Container>
  );
};

export default withSnackbar(Contratos);
