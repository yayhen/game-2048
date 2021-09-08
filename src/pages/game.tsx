import { inject, observer } from 'mobx-react';
import React from 'react';
import { Link } from 'react-router-dom'
import  {ControlsButtons}  from '../components/controls/control-buttons';
import { Score } from '../components/game/score';
import { TableRender } from '../components/game/table-render';
import { GameStore } from '../stores/game-store';

@inject("gameStore")
@observer export class Game extends React.Component<{gameStore?: GameStore}, {}> {

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

  render() {
    return <div style={{marginLeft: '500px'}} onKeyDown={(e) => this.keyPressHandler(e)} tabIndex={0}>
        <h1>This is the game page</h1>
        <Link to="/">
          Start page
        </Link>
        <Score />
        <TableRender cells={this.props.gameStore?.gameState || []}></TableRender>
        <ControlsButtons />
      </div>
    
  }
}