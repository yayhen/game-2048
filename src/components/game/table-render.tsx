import { observer } from 'mobx-react';
import React from 'react';
import { Cell } from './cell';

interface Props {
  cells: number[][];
}

@observer
export class TableRender extends React.Component<Props, {}> {
  
  addCeils() {
    let row: JSX.Element[] = [];
    let table: JSX.Element[] = [];
    let rowTemplate: JSX.Element;
    this.props.cells.forEach((item, index) => {
      item.forEach((itm, ind) => {
        let cell = <Cell value={itm} coordinates={[index, ind]} key={`${index}and${ind}`}/>;
        row.push(cell);
        rowTemplate = <div className="table_row" key={`${index}and${ind}row`}>{row}</div>
      });
      row = [];
      table.push(rowTemplate);
    });
    return table;
  }

  render() {
    return <div className="table-container">
      {this.addCeils()}
    </div>
  }
}