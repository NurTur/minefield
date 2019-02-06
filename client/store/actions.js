export const MINECOUNT = "MINECOUNT";
export const MOVECOUNT = "MOVECOUNT";
export const TIMER = "TIMER";
export const SetMINE = num => {
  return { type: MINECOUNT, payload: { Mine: num } };
};

export const SetMOVE = num => {
  return { type: MOVECOUNT, payload: { Move: num } };
};

export const SetTIMER = str => {
  return { type: TIMER, payload: { Timer: str } };
};

