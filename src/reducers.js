import { PUZZLE_MOVE, PUZZLE_RESTART, PUZZLE_SOLVE, PUZZLE_WON } from "./const";
import { shuffleWithInversions } from "./utils";

//creates a function with built-in tile size in px and board dimensions
//the new function creates the original array of tiles
const boardFactory = (size, dimension) => array => {
  const tiles = array.map(makeTile(size, dimension));
  return tiles;
};

//creates a factory function to create tiles with size and board dimensions
//which in turn creates one tile with calculated position and margin offsets
const makeTile = (size, dimension) => (key, index) => {
  const kCol = key % dimension;
  const kRow = Math.floor(key / dimension);
  const iCol = index % dimension;
  const iRow = Math.floor(index / dimension);

  return {
    key,
    xy: [size * iCol, size * iRow],
    style: {
      marginLeft: `${-kCol * size}px`,
      marginTop: `${-kRow * size}px`
    }
  };
};

export const tiles = (state = [], action) => {
  const { index, dimension, size } = action.payload || {};

  switch (action.type) {
    case "PUZZLE_MOVE": {
      const tiles = [...state]; //do not mutate the state
      const { length } = tiles;
      const key = tiles[index].key;
      const lastIndex = tiles.findIndex(({ key }) => key === length - 1);
      const lastKey = tiles[lastIndex].key;
      const distance = Math.abs(index - lastIndex);
      const makeCustomTile = makeTile(size, dimension);

      if (distance == 1 || distance == dimension) {
        tiles[index] = makeCustomTile(lastKey, index);
        tiles[lastIndex] = makeCustomTile(key, lastIndex);
      }
      return tiles;
    }
    case "PUZZLE_RESTART": {
      //it is a little problematic that the shuffle makes this part not pure, but this is the easiest thing to do
      return boardFactory(size, dimension)(
        shuffleWithInversions(
          dimension,
          new Array(dimension * dimension).fill(0).map((_, i) => i)
        )
      );
    }
    case "PUZZLE_SOLVE": {
      return new Array(dimension * dimension)
        .fill(0)
        .map((_, i) => i)
        .map(makeTile(size, dimension));
    }
    case "PUZZLE_RESIZE": {
      const tiles = [...state]; //do not mutate the state
      return boardFactory(size, dimension)(tiles.map(({ key }) => key));
    }
    default:
      return state;
  }
};

export const won = (state = false, action) => {
  switch (action.type) {
    case "PUZZLE_WON": {
      return true;
    }
    case "PUZZLE_RESTART": {
      return false;
    }
    default:
      return state;
  }
};

export const time = (state = 0, action) => {
  switch (action.type) {
    case "PUZZLE_TICK": {
      return state + 1;
    }
    case "PUZZLE_RESTART": {
      return 0;
    }
    default:
      return state;
  }
};

export const steps = (state = 0, action) => {
  switch (action.type) {
    case "PUZZLE_MOVE": {
      return state + 1;
    }
    case "PUZZLE_RESTART": {
      return 0;
    }
    default:
      return state;
  }
};
