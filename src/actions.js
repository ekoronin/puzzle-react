import { PUZZLE_MOVE, PUZZLE_RESTART, PUZZLE_SOLVE, PUZZLE_WON } from "./const";

export const onMove = (index, dimension, size) => ({
  type: "PUZZLE_MOVE",
  payload: {
    index,
    dimension,
    size
  }
});

export const onRestart = (dimension, size) => ({
  type: "PUZZLE_RESTART",
  payload: {
    dimension,
    size
  }
});

export const onResize = (dimension, size) => ({
  type: "PUZZLE_RESIZE",
  payload: {
    dimension,
    size
  }
});

export const onSolve = (dimension, size) => ({
  type: "PUZZLE_SOLVE",
  payload: {
    dimension,
    size
  }
});

export const onWin = () => ({
  type: "PUZZLE_WON"
});

export const onTick = () => ({
  type: "PUZZLE_TICK"
});
