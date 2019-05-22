import { PUZZLE_MOVE, PUZZLE_RESTART, PUZZLE_SOLVE, PUZZLE_WON } from './const';

export const move = (index, dimension, size) => ({
    type: 'PUZZLE_MOVE',
    index,
    dimension, 
    size
  });

  export const restart = (dimension, size) => ({
    type: 'PUZZLE_RESTART',
    dimension, 
    size
  });

  export const solve = (dimension, size) => ({
    type: 'PUZZLE_SOLVE',
    dimension, 
    size
  });

  export const win = () => ({
    type: 'PUZZLE_WON',
  });

  export const tick = () => ({
    type: 'PUZZLE_TICK',
  });