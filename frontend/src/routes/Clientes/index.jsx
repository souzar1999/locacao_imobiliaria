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
import { validateEmail, validateFone } from "../../services/validation";

Modal.setAppElement("#root");

const headers = [
    {
      name: "#",
      field: "id",
    },
    {
      name: "Nome",
      field: "nome",
    },
    {
      name: "E-Mail",
      field: "email",
    },
    {
      name: "Telefone",
      field: "fone",
    },
  ],
  listUrl = "/clientes/list.php",
  findUrl = "/clientes/find.php",
  storeUrl = "/clientes/store.php",
  updateUrl = "/clientes/update.php",
  deleteUrl = "/clientes/delete.php";

const Clientes = ({ enqueueSnackbar }) => {
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [fone, setFone] = useState("");

  useEffect(() => {
    handleList(); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!modalIsOpen) {
      handleList();
    } // eslint-disable-next-line
  }, [modalIsOpen]);

  const handleVerificaDados = () => {
    let validado = "";

    if (!nome) {
      validado += "Necessário informar o nome!\n";
    }

    if (!email) {
      validado += "Necessário informar o e-mail!\n";
    } else {
      if (!validateEmail(email)) {
        validado += "E-Mail informado é inválido!\n";
      }
    }

    if (!fone) {
      validado += "Necessário informar o telefone!\n";
    } else {
      if (!validateFone(fone)) {
        validado += "Formato do telefone deve ser (xx)xxxxxxxxx!\n";
      }
    }

    return validado;
  };

  const handleStore = async () => {
    const msgErro = handleVerificaDados();
    if (!msgErro) {
      await api
        .post(storeUrl, { nome, email, fone })
        .then((response) => {
          handleCloseModal();
          enqueueSnackbar("Cliente cadastrado com sucesso!", {
            variant: "success",
            autoHideDuration: 5000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
        })
        .catch(() => {
          enqueueSnackbar(`Problemas ao cadastrado cliente!`, {
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
            nome,
            email,
            fone,
          },
          {
            params: {
              id,
            },
          }
        )
        .then(() => {
          handleCloseModal();
          enqueueSnackbar("Cliente atualizado com sucesso!", {
            variant: "success",
            autoHideDuration: 5000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
        })
        .catch(() => {
          enqueueSnackbar(`Problemas ao atualizar cliente!`, {
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
        setNome(data["nome"]);
        setEmail(data["email"]);
        setFone(data["fone"]);
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

  const handleList = async () => {
    await api
      .get(listUrl)
      .then(({ data }) => {
        setData(data);
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

  const handleDelete = async (id) => {
    await api
      .delete(deleteUrl, {
        params: {
          id,
        },
      })
      .then((response) => {
        setData(data.filter((item) => item.id !== id));

        enqueueSnackbar("Cliente deletado com sucesso!", {
          variant: "success",
          autoHideDuration: 5000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
      })
      .catch(() => {
        enqueueSnackbar(`Problemas ao deletar cliente!`, {
          variant: "error",
          autoHideDuration: 5000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
      });
  };

  function handleOpenModal(id) {
    setIsOpen(true);
    if (id) {
      setEditId(id);
      handleFind(id);
    }
  }

  function handleCloseModal() {
    setIsOpen(false);
    setEditId(null);
    setNome("");
    setFone("");
    setEmail("");
  }

  return (
    <Container>
      <Header />
      <Content>
        <TitleContainer>Clientes</TitleContainer>
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
                no-validate
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
                  <label htmlFor="nome">
                    Nome: <span>*</span>
                  </label>
                  <input
                    type="text"
                    name="nome"
                    value={nome}
                    onChange={(event) => setNome(event.target.value)}
                    placeholder="Nome"
                  />
                </div>
                <div>
                  <label htmlFor="email">
                    E-Mail: <span>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Email"
                  />
                </div>
                <div>
                  <label htmlFor="fone">
                    Telefone: <span>*</span>
                  </label>
                  <input
                    type="tel"
                    name="fone"
                    value={fone}
                    onChange={(event) => setFone(event.target.value)}
                    placeholder="Telefone (xx)xxxxxxxxx"
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

export default withSnackbar(Clientes);
