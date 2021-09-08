import React from 'react';
import './style.css'

interface Props {
  value: number;
  coordinates: number[]
}

export class Cell extends React.Component<Props, {}> {
  id = `${this.props.coordinates[0]}${this.props.coordinates[1]}`;

  componentDidUpdate() {
    let hui = document.getElementById(this.id);
    if(hui) {
      hui.style.backgroundColor = 'red';
    }
  }

  getColorFromNumber(value: number) {
    let colorMap = new Map();
    colorMap.set(2, '#eee4da');
    colorMap.set(4, '#ede0c8');
    colorMap.set(8, '#f2b179');
    colorMap.set(16, '#f59563');
    colorMap.set(32, '#f67c5f');
    colorMap.set(64, '#f65e3d');
    colorMap.set(128, '#edcf72');
    colorMap.set(256, '#edcc61');
    colorMap.set(1024, '#3dc53f');
    colorMap.set(2048, '#edc22e');
    return colorMap.get(value);
  }
  
  render() {
    if(this.props.value===0) {
      return <div className="cell_empty">
        &nbsp;
      </div>
    }
    return <div className='cell' id={this.id} style={{backgroundColor: this.getColorFromNumber(this.props.value)}}>
      {this.props.value}
    </div>
  }
}