export const formatDate = (date) => {
  const data = new Date(date),
    dia = data.getUTCDate().toString(),
    diaF = dia.length == 1 ? "0" + dia : dia,
    mes = (data.getUTCMonth() + 1).toString(),
    mesF = mes.length == 1 ? "0" + mes : mes,
    anoF = data.getUTCFullYear();
  return diaF + "/" + mesF + "/" + anoF;
};

export const formatMoney = (value) => {
  return `${new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)}`;
};
