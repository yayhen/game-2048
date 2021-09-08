import { inject, observer } from 'mobx-react';
import React from 'react';
import { GameStore } from '../../stores/game-store';

@inject("gameStore")
@observer
export class Score extends React.Component<{gameStore?: GameStore}, {}> {

  render() {
    return <div>
      Score: {this.props.gameStore?.score}
    </div>
  }
}