import React, {Component} from 'react';
import './App.scss';

import {shuffleWithInversions, formatTime} from './utils'

//creates a function with built-in tile size in px and board dimensions
//the new function creates the original array of tiles
const boardFactory = (size, dimension) => array => {
  const tiles = array.map(getTile(size, dimension));
  return tiles;
} 

//creates a factory function to create tiles with size and board dimensions
//which in turn creates one tile with calculated position and margin offsets
const getTile = (size, dimension) => (key, index) => {
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
  }

  move(clickedIndex) {
    if (this.state.won) return; //game ended

    const tiles = [...this.state.tiles];
    const {length} = tiles;

    const clickedKey = tiles[clickedIndex].key;
    const lastIndex = tiles.findIndex(({key}) => key === length-1);
    const lastKey = tiles[lastIndex].key;
    const distance = Math.abs(clickedIndex - lastIndex);
    const getTile100 = getTile(100, this.props.dimension);

    if (distance == 1 || distance == this.props.dimension) {
      tiles[clickedIndex] = getTile100(lastKey, clickedIndex);
      tiles[lastIndex] = getTile100(clickedKey, lastIndex);
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
    const {dimension} = this.props;
    this.setState({
      ...this.initialState,
      tiles: boardFactory(100, dimension)(shuffleWithInversions(dimension, new Array(dimension*dimension).fill(0).map((_,i) => i)))
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

  //renders the component
  render(){
    const last = this.props.dimension * this.props.dimension - 1;
    return (
      <div className="game">
        <span id="title">EK's Puzzle Game</span>
        <div id="time">Time: {formatTime(this.state.time)}</div>
        <div id="steps">Steps: {this.state.steps}</div>
        <div className="board">
        {this.state.won && <div className="won">You Won!!!</div>}        
        {this.state.tiles.map(({xy:[x,y], key, style}, index) => {
            return <div key={key}
                        className={key !== last ? 'tile':'tile last'}
                        style={{transform: `translate3d(${x}px, ${y}px, 0px)`}}
                        onClick={() => this.move(index)}>
                          <img src={this.props.image} style={style}/>
                    </div>
          }) 
        }
      </div>
        <button onClick={this.restart}>Restart</button>
      </div>
    );
  }
}
export default App;
