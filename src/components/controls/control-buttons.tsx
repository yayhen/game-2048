import { inject, observer } from 'mobx-react';
import React from 'react';
import { GameStore } from '../../stores/game-store';

@inject("gameStore")
@observer
export class ControlsButtons extends React.Component<{gameStore?: GameStore}, {}> {
  
  moveUp() {
    this.props.gameStore?.turnUp();
  }

  moveDown() {
    this.props.gameStore?.turnDown();
  }

  moveLeft() {
    this.props.gameStore?.turnLeft();
  }

  moveRight() {
    this.props.gameStore?.turnRight();
  }

  render() {
    return <div className="controls" >
      <button className="controls__top" onClick={() => this.moveUp()} style={{marginLeft: '25px'}}>&#8593;</button>
      <br />
      <button className="controls__down" onClick={() => this.moveDown()} style={{marginLeft: '25px'}}>&#8595;</button>
      <br />
      <button className="controls__left" onClick={() => this.moveLeft()}>&#8592;</button>
      <button className="controls__right" onClick={() => this.moveRight()}>&#8594;</button>
    </div>
  }
}