import { atom } from "recoil";

export const activityState = atom({
  key: "activity",
  default: [],
});

export const myActivityState = atom({
  key: "myactivity",
  default: [],
});

export const semesterState = atom({
  key: "semester",
  default: "2022-2",
});
