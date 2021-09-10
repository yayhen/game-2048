import { inject, observer } from 'mobx-react';
import React from 'react';
import { GameStore } from '../../stores/game-store';
import './style.css';

@inject("gameStore")
@observer
export class Score extends React.Component<{gameStore?: GameStore}, {}> {

  render() {
    return <div className="score">
      <div className="score_current">
        <span>Score: </span> {this.props.gameStore?.score}
      </div>
      <div className="score_best">
        <span>Best: </span> {localStorage.getItem('best')}
      </div>
    </div>
  }
}