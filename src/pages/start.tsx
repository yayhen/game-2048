import React from 'react';
import { Link } from 'react-router-dom'

export class Start extends React.Component {

  render() {
    return <div>
      <h1>This is the start page</h1>
      <Link to="/game">
        Game
      </Link>
    </div>
  }
}