import { UserStory } from "../classes/WorkItem";
import { pick } from "./random";

const FRONTEND_BACKEND_FEATURES = [
  "user login",
  "search",
  "product details",
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

const BACKGROUND_FEATURES = [
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

const generateFrontentBackendTasks = (features) => {
  const verb = ["Implement", "Create", "Build"];
  const frontendNoun = ["page", "widget", "feature"];
  const backendNoun = ["endpoint", "API", "service"];
  return features
    .map((feature) => [
      { feature, title: `${pick(verb)} ${feature} ${pick(frontendNoun)}` },
      { feature, title: `${pick(verb)} ${feature} ${pick(backendNoun)}` },
    ])
    .flat();
};

const generateBackgroundTasks = (features) => {
  const verb = ["Implement", "Create", "Build"];
  const noun = ["endpoint", "API", "service"];
  return features.map((feature) => ({
    feature,
    title: `${pick(verb)} ${feature} ${pick(noun)}`,
  }));
};

export const generateProductFeatures = () => {
  const initial = generateFrontentBackendTasks(
    FRONTEND_BACKEND_FEATURES.slice(0, 5)
  ).map(
    ({ feature, title }, idx) =>
      new UserStory({ id: generateId(idx + 1), title, feature, status: "TODO" })
  );
  const rest = [
    generateFrontentBackendTasks(FRONTEND_BACKEND_FEATURES.slice(5)),
    generateBackgroundTasks(BACKGROUND_FEATURES),
  ]
    .flat()
    .map(({ feature, title }, idx) => ({
      sort: Math.random(),
      title,
      feature,
      id: generateId(idx + 1),
    }))
    .sort((a, b) => a.sort - b.sort)
    .map((obj) => new UserStory(obj));
  return { initial, rest };
};

const generateId = (i) => `G${i.toString().padStart(4, "0")}`;
