import { pick } from "./random";

const FRONTEND_BACKEND_FEATURES = [
  "user login",
  "search",
  "product",
  "add to basket",
  "checkout",
  "preferences",
  "recommendations",
  "guest checkout",
  "credit card payment",
  "alternative payment options",
  "social login",
  "share",
];

const BACKGROUND_TASKS = [
  "recommendations engine",
  "product aggregation",
  "user aggregation",
  "data precalculation",
  "cacheing",
  "product mapping",
  "logging",
  "user tracking",
  "reporting",
  "onboarding",
  "compliance",
];

const generateFrontentBackendTitles = (features) => {
  const verb = ["Implement", "Create", "Build"];
  const frontendNoun = ["page", "widget", "feature"];
  const backendNoun = ["endpoint", "API", "service"];
  return features
    .map((feature) => [
      `${pick(verb)} ${feature} ${pick(frontendNoun)}`,
      `${pick(verb)} ${feature} ${pick(backendNoun)}`,
    ])
    .flat();
};

const generateBackgroundTitles = (features) => {
  const verb = ["Implement", "Create", "Build"];
  const noun = ["endpoint", "API", "service"];
  return features.map((feature) => `${pick(verb)} ${feature} ${pick(noun)}`);
};

export const generateProductFeatures = () => {
  const initial = generateFrontentBackendTitles(
    FRONTEND_BACKEND_FEATURES.slice(0, 5)
  ).map((feature) => ({ title: feature, status: "TODO" }));
  const rest = [
    generateFrontentBackendTitles(FRONTEND_BACKEND_FEATURES.slice(5)),
    generateBackgroundTitles(BACKGROUND_TASKS),
  ]
    .flat()
    .map((v) => ({ sort: Math.random(), value: v }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .map((feature) => ({ title: feature, status: "NOT_CREATED" }));
  return [...initial, ...rest];
};
