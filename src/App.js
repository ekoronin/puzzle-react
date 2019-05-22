import React, {Component} from 'react';

import {shuffleWithInversions, formatTime} from './utils'

import Button from './components/Button';
import WinDialog from './components/WinDialog';
import PuzzleBoard from './components/PuzzleBoard';
import PuzzleGame from './components/PuzzleGame';
import GameTime from './components/GameTime';
import GameSteps from './components/GameSteps';
import GameTitle from './components/GameTitle';
import PuzzleTile from './components/PuzzleTile';
import TileImage from './components/TileImage';


//creates a function with built-in tile size in px and board dimensions
//the new function creates the original array of tiles
const boardFactory = (size, dimension) => array => {
  const tiles = array.map(makeTile(size, dimension));
  return tiles;
} 

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
  }
}



class App extends Component{
  constructor(props) {
    super(props);

    this.initialState = {
      time:   0,
      steps:  0,
      tiles:  [],
      won:    false
    };
    this.timer = 0;
    this.state = {...this.initialState};

    //bound methods for callbacks
    this.restart = this.restart.bind(this);
    this.tick = this.tick.bind(this);
    this.solve = this.solve.bind(this);
  }

  move(clickedIndex) {
    if (this.state.won) return; //game ended

    const tiles = [...this.state.tiles];
    const {length} = tiles;
    const {dimension, size} = this.props;

    const clickedKey = tiles[clickedIndex].key;
    const lastIndex = tiles.findIndex(({key}) => key === length-1);
    const lastKey = tiles[lastIndex].key;
    const distance = Math.abs(clickedIndex - lastIndex);
    const makeCustomTile = makeTile(+size, +dimension);

    if (distance == 1 || distance == dimension) {
      tiles[clickedIndex] = makeCustomTile(lastKey, clickedIndex);
      tiles[lastIndex] = makeCustomTile(clickedKey, lastIndex);
      this.setState(({steps}) => ({tiles, steps: steps+1}));
    }
    
    //check we won
    if (tiles.every(({key}, index) => key === index)) {
      this.won();
    }
  }

  //when you solved the puzzle, change the flag and present "You Won" message.
  won() {
    clearInterval(this.timer);
    this.setState({won:true});
  }

  //reset the state to the initial and re-builds the puzzle board.
  reset() {
    const {dimension, size} = this.props;
    this.setState({
      ...this.initialState,
      tiles: boardFactory(+size, +dimension)(shuffleWithInversions(+dimension, new Array(dimension*dimension).fill(0).map((_,i) => i)))
    })
  }

    componentDidMount() {
      this.restart();
    }

    componentWillUnmount() {
      clearInterval(this.timer);
    }

  //restarts the puzzle game by resetting the state and rebuilding the board
  restart() {
    //clear score and time
    //shuffle the board
    //start game timer
    if (this.timer) clearInterval(this.timer);
    this.reset();
    this.timer = setInterval(this.tick, 1000);
  }

  //ticks every seconds to reflect the time spent in the game
  tick() {
    this.setState(({time}) => ({time: time+1})); 
  }

  solve() {
    const {dimension, size} = this.props;
    const tiles = new Array(dimension * dimension).fill(0).map((_, i) => i).map(makeTile(+size, +dimension));
    this.setState({tiles});
    this.won();
  }

  //renders the component
  render(){
    const {image, cheating, ...layout} = this.props;
    const {dimension} = layout;
    const last = dimension * dimension - 1;

    return (
      <PuzzleGame {...layout}>
        <GameTitle>EK's Puzzle Game {`${dimension}x${dimension}`}</GameTitle>
        <GameTime>Time: {formatTime(this.state.time)}</GameTime>
        <GameSteps>Steps: {this.state.steps}</GameSteps>
        <PuzzleBoard {...layout}>
        {this.state.won && <WinDialog size={this.props.size}>You Won!!!</WinDialog>}        
        {this.state.tiles.map(({xy:[x,y], key, style}, index) => {
            return <PuzzleTile {...layout}
                        key={key}
                        last={key == last}
                        style={{transform: `translate3d(${x}px, ${y}px, 0px)`}}
                        onClick={() => this.move(index)}>
                          <TileImage {...layout} src={image} style={style}/>
                    </PuzzleTile>
          }) 
        }
        </PuzzleBoard>
        <Button onClick={this.restart}>Restart</Button>
        {cheating && <Button onClick={this.solve}>Solve</Button>}
      </PuzzleGame>
    );
  }
}
export default App;
