import { pick } from "./random";

const TOP_PRIORITIES = [
  "It's absolutely vital that the *** feature is completed this sprint.",
  "The users are demanding to be able to use the *** feature. We need it done.",
  "The *** feature is definitely my highest priority right now. We need to start making some money.",
];
const LESSER_PRIORITIES = [
  "I'd really like it if we could get the *** feature out to users for some feedback.'",
  "It'd be good to get the *** feature deployed if we can.",
  "Also, how about the *** feature? it'd be good to get that done soon.",
];

export const getPriorityText = (priority, idx) =>
  idx === 0
    ? pick(TOP_PRIORITIES).replace("***", priority)
    : pick(LESSER_PRIORITIES).replace("***", priority);
