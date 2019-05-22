import React, {Component} from 'react';

import Button from './components/Button';
import WinDialog from './components/WinDialog';
import PuzzleBoard from './components/PuzzleBoard';
import PuzzleGame from './components/PuzzleGame';
import GameTime from './components/GameTime';
import GameSteps from './components/GameSteps';
import GameTitle from './components/GameTitle';
import PuzzleTile from './components/PuzzleTile';
import TileImage from './components/TileImage';

import {formatTime} from './utils'

import { connect } from 'react-redux';
import * as Actions from './actions'




class App extends Component{
  constructor(props) {
    super(props);
    this.timer = 0;

    this.restart = this.restart.bind(this);
    this.solve = this.solve.bind(this);
  }

  componentDidMount() {
    this.restart();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }


  move(index) {
    const {tiles, dimension, size, won} = this.props;

    if (won) return; //game ended
   //dispatch action
    this.props.move(index, dimension, size);
    //check we won
    if (tiles.every(({key}, index) => key === index)) {
      //dispatch action
      this.props.win();
    }
  }

 

  //restarts the puzzle game by resetting the state and rebuilding the board
  restart() {
    //clear score and time
    //shuffle the board
    //start game timer
    const {dimension, size} = this.props;
    this.timer && clearInterval(this.timer);
    //dispacth action
    this.props.restart(dimension, size);
    this.timer = setInterval(this.props.tick, 1000);
  }



  solve() {
    const {dimension, size} = this.props;
    this.props.solve(dimension, size);
    this.props.win();
  }

  //when you solved the puzzle, change the flag and present "You Won" message.
  win() {
    this.timer && clearInterval(this.timer);
    //dispatch action
    this.props.win()
  }

  //renders the component
  render(){
    const {image, cheating, time, steps, won, tiles, dimension, size} = this.props;
    const last = dimension * dimension - 1;

    return (
      <PuzzleGame dimension={dimension} size={size}>
        <GameTitle>EK's Puzzle Game {`${dimension}x${dimension}`}</GameTitle>
        <GameTime>Time: {formatTime(time)}</GameTime>
        <GameSteps>Steps: {steps}</GameSteps>
        <PuzzleBoard dimension={dimension} size={size}>
        {won && <WinDialog size={size}>You Won!!!</WinDialog>}   
        {tiles.map(({xy:[x,y], key, style}, index) => {
            return <PuzzleTile dimension={dimension} size={size} 
                        key={key}
                        last={key == last}
                        style={{transform: `translate3d(${x}px, ${y}px, 0px)`}}
                        onClick={() => this.move(index)}>
                          <TileImage  dimension={dimension} size={size} src={image} style={style}/>
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

//redux bindings

const mapStateToProps = (state) => ({...state});
const mapDispatchToProps = Actions;
const AppHOC = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppHOC;
