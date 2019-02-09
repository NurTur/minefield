export const MINECOUNT = "MINECOUNT";
export const MOVECOUNT = "MOVECOUNT";
export const TIMER = "TIMER";
export const COUNTMINE = "COUNTMINE";
export const BASIC = "BASIC";

export const SetMINE = num => async (dispatch) => await dispatch({ type: MINECOUNT, payload: { Mine: num } });
export const SetMOVE = num => async (dispatch) => await dispatch({ type: MOVECOUNT, payload: { Move: num } });
export const SetTIMER = str => async (dispatch) => await dispatch({ type: TIMER, payload: { Timer: str } });
export const SetCOUNTMINE = num => async (dispatch) => await dispatch({ type: COUNTMINE, payload: { Count: num } });
export const SetBASIC = () => async (dispatch) => await dispatch({ type: BASIC, payload: { Mine: 0, Move: 0, Timer: "STOP" } });





