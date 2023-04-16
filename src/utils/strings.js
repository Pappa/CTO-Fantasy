export const truncate = (text, max) => {
  return text.length > max ? `${text.slice(0, max - 3)}...` : text;
};

export const arrayToTextList = (items) =>
  items.reduce((acc, item, idx, self) => {
    return idx === 0
      ? item
      : idx < self.length - 1
      ? (acc += `, ${item}`)
      : (acc += ` and ${item}`);
  }, "");
