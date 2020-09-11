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
    {
      name: "Dia do Repasse",
      field: "dia_repasse",
    },
  ],
  listUrl = "/proprietarios/list.php",
  findUrl = "/proprietarios/find.php",
  storeUrl = "/proprietarios/store.php",
  updateUrl = "/proprietarios/update.php",
  deleteUrl = "/proprietarios/delete.php";

const Proprietarios = ({ enqueueSnackbar }) => {
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [fone, setFone] = useState("");
  const [diaRepasse, setDiaRepasse] = useState(null);

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
        validado += "Formato do telefone deve ser (xx)xxxxx-xxxx.\n";
      }
    }

    if (!diaRepasse) {
      validado += "Necessário selecionar o dia do repasse!\n";
    } else {
      if (!validateFone(fone)) {
        validado += "Formato do telefone deve ser (xx)xxxxx-xxxx.\n";
      }
    }

    return validado;
  };

  const handleStore = async () => {
    const msgErro = handleVerificaDados();
    if (!msgErro) {
      await api
        .post(storeUrl, { nome, email, fone, dia_repasse: diaRepasse })
        .then((response) => {
          handleCloseModal();
          enqueueSnackbar("Proprietário cadastrado com sucesso!", {
            variant: "success",
            autoHideDuration: 5000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
        })
        .catch(() => {
          enqueueSnackbar(`Problemas ao cadastrar proprietário!`, {
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
            dia_repasse: diaRepasse,
          },
          {
            params: {
              id,
            },
          }
        )
        .then(() => {
          handleCloseModal();
          enqueueSnackbar("Proprietário atualizado com sucesso!", {
            variant: "success",
            autoHideDuration: 5000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
        })
        .catch(() => {
          enqueueSnackbar(`Problemas ao atualizar proprietário!`, {
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
        setDiaRepasse(data["dia_repasse"]);
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

  const handleList = async () => {
    await api
      .get(listUrl)
      .then(({ data }) => {
        setData(data);
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

  const handleDelete = async (id) => {
    await api
      .delete(deleteUrl, {
        params: {
          id,
        },
      })
      .then((response) => {
        setData(data.filter((item) => item.id !== id));

        enqueueSnackbar("Proprietário deletado com sucesso!", {
          variant: "success",
          autoHideDuration: 5000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
      })
      .catch(() => {
        enqueueSnackbar(`Problemas ao deletar proprietário!`, {
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
    setDiaRepasse(null);
  }

  return (
    <Container>
      <Header />
      <Content>
        <TitleContainer>Proprietários</TitleContainer>
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
                  <label htmlFor="dia_repasse">
                    Dia do Repasse: <span>*</span>
                  </label>
                  <select
                    value={diaRepasse}
                    name="dia_repasse"
                    id="dia_repasse"
                    onChange={(event) =>
                      setDiaRepasse(event.nativeEvent.target.value)
                    }
                  >
                    <option value="">-- Selecionar --</option>
                    <option value="1">01</option>
                    <option value="2">02</option>
                    <option value="3">03</option>
                    <option value="4">04</option>
                    <option value="5">05</option>
                    <option value="6">06</option>
                    <option value="7">07</option>
                    <option value="8">08</option>
                    <option value="9">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
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

export default withSnackbar(Proprietarios);
