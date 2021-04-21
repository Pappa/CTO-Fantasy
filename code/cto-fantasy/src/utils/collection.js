export const unique = (arr) =>
  arr.filter((v, idx, self) => self.indexOf(v) === idx);

export const shuffle = (arr) =>
  arr
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
