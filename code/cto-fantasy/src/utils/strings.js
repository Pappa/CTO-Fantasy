export const truncate = (text, max) => {
  return text.length > max ? `${text.slice(0, max - 3)}...` : text;
};
