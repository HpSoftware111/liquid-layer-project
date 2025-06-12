const getEllipsis = str => {
  return `${str.slice(0, 4)}...${str.slice(-4)}`;
};

export default getEllipsis