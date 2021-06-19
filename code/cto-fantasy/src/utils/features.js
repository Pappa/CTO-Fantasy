import { UserStory, WorkItem } from "../classes/WorkItem";
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

const INCIDENT_TEXT = [
  "There's a major incident caused by a problem with the",
  "The production environment is down due to an issue with the",
  "The customer isn't able to access the live environment because of a bug in the",
  "There's some probem in live cause by the",
];

const DEVELOP_VERB = ["Implement", "Create", "Build", "Develop"];

const FRONTEND_COMPONENT = ["page", "widget", "feature", "component"];
const BACKEND_COMPONENT = ["endpoint", "API", "service"];

const generateFrontentBackendTasks = (features) => {
  return features
    .map((feature) => [
      {
        feature,
        title: `${pick(DEVELOP_VERB)} ${feature} ${pick(FRONTEND_COMPONENT)}`,
      },
      {
        feature,
        title: `${pick(DEVELOP_VERB)} ${feature} ${pick(BACKEND_COMPONENT)}`,
      },
    ])
    .flat();
};

const generateBackgroundTasks = (features) => {
  return features.map((feature) => ({
    feature,
    title: `${pick(DEVELOP_VERB)} ${feature} ${pick(BACKEND_COMPONENT)}`,
  }));
};

export const generateProductFeatures = (storyPointValues) => {
  const points = storyPointValues.filter((x) => x < 13);
  const initial = generateFrontentBackendTasks(
    FRONTEND_BACKEND_FEATURES.slice(0, 5)
  ).map(
    ({ feature, title }) =>
      new UserStory({
        title,
        feature,
        status: WorkItem.STATUS.TODO,
        effort: pick(points),
      })
  );
  const rest = [
    generateFrontentBackendTasks(FRONTEND_BACKEND_FEATURES.slice(5)),
    generateBackgroundTasks(BACKGROUND_FEATURES),
  ]
    .flat()
    .map(({ feature, title }) => ({
      sort: Math.random(),
      title,
      feature,
      effort: pick(points),
    }))
    .sort((a, b) => a.sort - b.sort)
    .map((obj) => new UserStory(obj));
  return { initial, rest };
};

export const generateFirefightingIncident = () =>
  [
    pick(INCIDENT_TEXT),
    pick(BACKGROUND_FEATURES),
    pick(BACKEND_COMPONENT),
  ].join(" ") + ". Some of the team are going to need to resolve this today.";
