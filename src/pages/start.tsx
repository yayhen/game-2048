import React from 'react';
import { Link } from 'react-router-dom'

export class Start extends React.Component {

  render() {
    return <div className="start-page">
      <h1>2048 GAME</h1>
      <Link to="/game">
        <button>
          Start game
        </button>
      </Link>
    </div>
  }
}