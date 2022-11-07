import { atom } from "recoil";

export const activityState = atom({
  key: "activity",
  default: [],
});

export const semesterState = atom({
  key: "semester",
  default: [],
});
