const FIRST_NAMES_MALE = [
  "Cory",
  "Josiah",
  "Fred",
  "Keaton",
  "Hector",
  "Jean",
  "Charles",
  "Lachlan",
  "Jason",
  "Saif",
  "Henry",
  "Renee",
  "Timothy",
  "Pearl",
  "Chester",
  "Saul",
  "Lewis",
  "Richard",
  "Aiden",
  "Marcus",
  "Noah",
  "Roy",
  "Chris",
  "Alfie",
  "Stevie",
];
const FIRST_NAMES_FEMALE = [
  "Jemima",
  "Kayleigh",
  "Lisa",
  "Thea",
  "Nannie",
  "Chelsea",
  "Isabella",
  "Orla",
  "Beatrice",
  "Jessie",
  "Autumn",
  "Ellen",
  "Joyce",
  "Alyssa",
  "Syeda",
  "Scarlett",
  "Heather",
  "Bailey",
  "Demi",
  "Carla",
  "Elsa",
  "Lillian",
  "Katelyn",
  "Kiara",
  "Georgia",
];
const LAST_NAME = [
  "Poole",
  "Snyder",
  "Nichols",
  "Daniel",
  "Long",
  "Meyer",
  "May",
  "Quinn",
  "Oliver",
  "Young",
  "Andrews",
  "Carter",
  "Hanson",
  "Sparks",
  "Fuller",
  "Baldwin",
  "Fowler",
  "Anderson",
  "Higgins",
  "Wells",
  "Campos",
  "Hughes",
  "Blair",
  "Watts",
];

export const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const pick = (items) => items[Math.floor(Math.random() * items.length)];

export const randomBoolean = () => Math.random() <= 0.5;

export const randomBit = () => (randomBoolean() ? 1 : 0);

export const randomName = (gender = randomBit()) => {
  const first = !!gender ? FIRST_NAMES_FEMALE : FIRST_NAMES_MALE;
  return `${pick(first)} ${pick(LAST_NAME)}`;
};

export const randomStat = () => {
  const min = 1;
  const max = 6;
  return randomInt(min, max) / 10;
};
