import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { withSnackbar } from "notistack";

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
      name: "Endereço",
      field: "endereco",
    },
    {
      name: "Proprietario",
      field: "proprietario_nome",
    },
  ],
  listUrl = "/imoveis/list.php",
  findUrl = "/imoveis/find.php",
  storeUrl = "/imoveis/store.php",
  updateUrl = "/imoveis/update.php",
  deleteUrl = "/imoveis/delete.php";

const Imoveis = ({ enqueueSnackbar }) => {
  const [data, setData] = useState([]);
  const [proprietarios, setProprietarios] = useState([]);
  const [editId, setEditId] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [endereco, setEndereco] = useState("");
  const [proprietarioId, setProprietarioId] = useState(null);

  useEffect(() => {
    handleList(); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!modalIsOpen) {
      handleList();
    } else {
      handleGetProprietarios();
    } // eslint-disable-next-line
  }, [modalIsOpen]);

  const handleVerificaDados = () => {
    let validado = "";

    if (!endereco) {
      validado += "Necessário informar o endereco!\n";
    }

    if (!proprietarioId) {
      validado += "Necessário selecionar o proprietário!\n";
    }

    return validado;
  };

  const handleStore = async () => {
    const msgErro = handleVerificaDados();
    if (!msgErro) {
      await api
        .post(storeUrl, {
          endereco,
          proprietario_id: proprietarioId,
        })
        .then((response) => {
          handleCloseModal();
          enqueueSnackbar("Imóvel cadastrado com sucesso!", {
            variant: "success",
            autoHideDuration: 5000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
        })
        .catch(() => {
          enqueueSnackbar(`Problemas ao cadastrar imóvel!`, {
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
            endereco,
            proprietario_id: proprietarioId,
          },
          {
            params: {
              id,
            },
          }
        )
        .then(() => {
          handleCloseModal();
          enqueueSnackbar("Imóvel atualizado com sucesso!", {
            variant: "success",
            autoHideDuration: 5000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
        })
        .catch(() => {
          enqueueSnackbar(`Problemas ao atualizar imóvel!`, {
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

  const handleFind = async (id) => {
    await api
      .get(findUrl, {
        params: {
          id,
        },
      })
      .then(({ data }) => {
        setEndereco(data["endereco"]);
        setProprietarioId(data["proprietario_id"]);
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

  const handleList = async () => {
    await api
      .get(listUrl)
      .then(({ data }) => {
        setData(data);
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

  const handleDelete = async (id) => {
    await api
      .delete(deleteUrl, {
        params: {
          id,
        },
      })
      .then((response) => {
        setData(data.filter((item) => item.id !== id));

        enqueueSnackbar("Imóvel deletado com sucesso!", {
          variant: "success",
          autoHideDuration: 5000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
      })
      .catch(() => {
        enqueueSnackbar(`Problemas ao deletar imóvel!`, {
          variant: "error",
          autoHideDuration: 5000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
      });
  };

  const handleOpenModal = (id) => {
    setIsOpen(true);
    if (id) {
      setEditId(id);
      handleFind(id);
    }
  };

  const handleCloseModal = (id) => {
    setIsOpen(false);
    setEditId(null);
    setEndereco("");
    setProprietarioId(null);
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

  return (
    <Container>
      <Header />
      <Content>
        <TitleContainer>Imóveis</TitleContainer>
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
                          handleOpenModal(item.id);
                        }}
                      >
                        Editar
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
                  <label htmlFor="endereco">
                    Endereço: <span>*</span>
                  </label>
                  <textarea
                    name="endereco"
                    rows="5"
                    value={endereco}
                    onChange={(event) => setEndereco(event.target.value)}
                    placeholder="Endereço"
                  />
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

export default withSnackbar(Imoveis);
