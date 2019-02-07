export const MINECOUNT = "MINECOUNT";
export const MOVECOUNT = "MOVECOUNT";
export const TIMER = "TIMER";
export const COUNTMINE = "COUNTMINE";
export const BASIC = "BASIC";

export const SetMINE = num => {
  return { type: MINECOUNT, payload: { Mine: num } };
};

export const SetMOVE = num => {
  return { type: MOVECOUNT, payload: { Move: num } };
};

export const SetTIMER = str => {
  return { type: TIMER, payload: { Timer: str } };
};

export const SetCOUNTMINE = num => {
  return { type: COUNTMINE, payload: { Count: num } };
};

export const SetBASIC = () => {
  return { type: BASIC };
};
