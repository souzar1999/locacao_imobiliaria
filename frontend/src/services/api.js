import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost/locacao_imobiliaria/backend/api/",
});

export default api;
