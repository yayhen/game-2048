import { inject, observer } from 'mobx-react';
import React from 'react';
import { Link } from 'react-router-dom'
import  {ControlsButtons}  from '../components/controls/control-buttons';
import { Score } from '../components/game/score';
import { TableRender } from '../components/game/table-render';
import { Anton } from '../shared/artificial-intelligence/Anton';
import { GameStore } from '../stores/game-store';
import './style.css'

@inject("gameStore")
@observer export class Game extends React.Component<{gameStore?: GameStore}, {}> {
  autoplay: boolean = false;
  AutoplayIntervalId: NodeJS.Timeout | undefined;

  keyPressHandler(e: React.KeyboardEvent<HTMLDivElement>) {
    switch (e.key) {
      case 'ArrowDown':
        this.props.gameStore?.turnDown();
        break;
      case 'ArrowUp':
        this.props.gameStore?.turnUp();
        break;
      case 'ArrowLeft': 
      this.props.gameStore?.turnLeft();
        break;
      case 'ArrowRight':
        this.props.gameStore?.turnRight();
        break;
      default:
        break;
    }
  }

  autoPlayStart() {
    this.autoplay = !this.autoplay;
    if(this.autoplay) {
      this.AutoplayIntervalId = setInterval(() => {
        const nextTurn = Anton.nextTurn(this.props.gameStore?.gameState);
        switch (nextTurn) {
          case 'up':
            this.props.gameStore?.turnUp();
            break;
          case 'down':
            this.props.gameStore?.turnDown();
            break;
          case 'left':
            this.props.gameStore?.turnLeft();
            break;
          case 'right':
            this.props.gameStore?.turnRight();
            break;
          
          default:
            this.props.gameStore?.turnUp();
            break;
        }
      }, 1000);
    }else {
      clearInterval(this.AutoplayIntervalId!);
    }
  }

  render() {
    if(this.props.gameStore?.gameWasLosed) {
      return <div className="game-page" onKeyDown={(e) => this.keyPressHandler(e)} tabIndex={0}>
      <h1>Play 2048</h1>
      <Link to="/">
        <button>
          To start page
        </button>
      </Link>
      <Score />
      <h2>Game over</h2>
      <button onClick={() => {this.props.gameStore?.returnTurn()}}>&#11176;</button>
      <button onClick={() => {this.props.gameStore?.newGame()}}>&#10227;</button>
      <button onClick={() =>  this.autoPlayStart()}>Autoplay</button>
    </div>
    }

    return <div className="game-page" onKeyDown={(e) => this.keyPressHandler(e)} tabIndex={0}>
        <h1>Play 2048</h1>
        <Link to="/">
          <button>
            To start page
          </button>
        </Link>
        <Score />
        <button onClick={() => {this.props.gameStore?.returnTurn()}}>&#11176;</button>
        <button onClick={() => {this.props.gameStore?.newGame()}}>&#10227;</button>
        <button onClick={() =>  this.autoPlayStart()}>Autoplay</button>
        <TableRender cells={this.props.gameStore?.gameState || []}></TableRender>
        {/* <ControlsButtons /> */}
      </div>
    
  }
}