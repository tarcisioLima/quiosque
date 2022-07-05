const formatCash = (value = 0) => {
  const config = {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    style: 'currency',
    currency: 'BRL',
  };

  return value.toLocaleString('pt-BR', config);
};

export default formatCash;
