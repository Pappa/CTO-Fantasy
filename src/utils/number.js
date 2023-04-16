export const sum = (list) => list.reduce((a, b) => a + b, 0);

export const average = (list) => sum(list) / list.length;
