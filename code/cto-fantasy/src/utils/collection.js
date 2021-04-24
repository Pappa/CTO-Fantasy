export const unique = (arr) =>
  arr.filter((v, idx, self) => self.indexOf(v) === idx);

export const shuffle = (arr) =>
  arr
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);

export const range = (start /* optional */, end) => {
  if (end === undefined) {
    end = start;
    start = 0;
  }
  return [...Array(end - start).keys()].map((x) => x + start);
};

export const intersperse = (arr, val) =>
  arr.flatMap((v, idx, self) => (idx < self.length - 1 ? [v, val] : [v]));
