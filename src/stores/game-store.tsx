import { action, makeAutoObservable, observable } from "mobx";

export class GameStore {
  @observable gameState: number[][] = [[]];
  @observable score: number = 0;

  constructor(rows: number, colunms: number) {
    makeAutoObservable(this);
    for(let i=0; i<rows; i++) {
      this.gameState[i] = [];
      for(let j=0; j<colunms; j++) {
        this.gameState[i][j] = 0;
      }
    }
    this.addNumberToRandomCell();
    this.addNumberToRandomCell();
  }

  increaseScore(value: number) {
    this.score += value*2;
  }

  addNumberToRandomCell() {
    let totalEmptyCells = 0;
    this.gameState.forEach((item, index) => {
      item.forEach((itm, ind) => {
        if(itm === 0) {
          totalEmptyCells += 1;
        }
      })
    });
    let addNumberCheck = false;
    for (let i=0; i<this.gameState.length; i++) {
      for(let j=0; j<this.gameState[0].length; j++) {
        if(this.gameState[i][j] === 0) {
          if(Math.random() <= 1/totalEmptyCells) {
            this.gameState[i][j] = (Math.random()>=0.1) ? 2 : 4;
            addNumberCheck = true;
            return 
          }
        }
      }
    }
    if(!addNumberCheck) {
      this.addNumberToRandomCell();
    }
  }

  compareNewAndOldGameArrays(oldArray: number[][], newArray: number[][]):boolean {
    for(let i=0; i<oldArray.length; i++) {
      for(let j=0; j<oldArray[0].length; j++) {
        if(oldArray[i][j]!==newArray[i][j]) {
          return false;
        }
      }
    }
    return true
  }

  @action turnUp() {
    let oldArray = JSON.parse(JSON.stringify(this.gameState));
    let newGameArray: number[][] = [[]];
    for(let j=0; j<this.gameState[0].length; j++) {
      newGameArray[j]=[];
      for(let i=0; i<this.gameState.length; i++) {
        if(this.gameState[i][j] !== 0) {
          newGameArray[j].push(this.gameState[i][j]);
        }
      }
    }
    newGameArray.forEach((item, index) => {
      let gameArrayWithUniting = [];
      for(let i=0; i<=item.length; i++) {
        if(item[i+1]) {
          if(item[i]===item[i+1]) {
            gameArrayWithUniting.push(item[i]*2);
            this.increaseScore(item[i]);
            i=i+1;
          }else {
            gameArrayWithUniting.push(item[i]);
          }
        } else if(item[i]) {
          gameArrayWithUniting.push(item[i]);
        }
      }
      newGameArray[index] = gameArrayWithUniting;
    });
    newGameArray.forEach((item, index) => {
      while(item.length<this.gameState.length) {
        item.push(0);
      }
    });
    for(let i=0; i<newGameArray.length; i++) {
      for(let j=0; j<newGameArray[0].length; j++) {
        this.gameState[i][j] = newGameArray[j][i];
      }
    }
    if(this.compareNewAndOldGameArrays(oldArray, this.gameState)) {

    } else {
      this.addNumberToRandomCell();
    }
    
  }

  @action turnDown() {
    let oldArray = JSON.parse(JSON.stringify(this.gameState));
    let arrayToRotate: number[][] = [];
    this.gameState.forEach((item => {
      arrayToRotate.unshift(item);
    }));
    this.gameState = arrayToRotate.slice();
    let newGameArray: number[][] = [[]];
    for(let j=0; j<this.gameState[0].length; j++) {
      newGameArray[j]=[];
      for(let i=0; i<this.gameState.length; i++) {
        if(this.gameState[i][j] !== 0) {
          newGameArray[j].push(this.gameState[i][j]);
        }
      }
    }
    newGameArray.forEach((item, index) => {
      let gameArrayWithUniting = [];
      for(let i=0; i<=item.length; i++) {
        if(item[i+1]) {
          if(item[i]===item[i+1]) {
            gameArrayWithUniting.push(item[i]*2);
            this.increaseScore(item[i]);
            i=i+1;
          }else {
            gameArrayWithUniting.push(item[i]);
          }
        } else if(item[i]) {
          gameArrayWithUniting.push(item[i]);
        }
      }
      newGameArray[index] = gameArrayWithUniting;
    });
    newGameArray.forEach((item, index) => {
      while(item.length<this.gameState.length) {
        item.push(0);
      }
    });
    for(let i=0; i<newGameArray.length; i++) {
      for(let j=0; j<newGameArray[0].length; j++) {
        this.gameState[i][j] = newGameArray[j][i];
      }
    }
    arrayToRotate = [];
    this.gameState.forEach((item => {
      arrayToRotate.unshift(item);
    }));
    this.gameState = arrayToRotate.slice();
    if(this.compareNewAndOldGameArrays(oldArray, this.gameState)) {
      
    } else {
      this.addNumberToRandomCell();
    }
  }

  @action turnLeft() {
    let oldArray = JSON.parse(JSON.stringify(this.gameState));
    let newGameArray:number[][] = [];
    let gameArrayRow:number[] = [];
    this.gameState.forEach((item) => {
      gameArrayRow = [];
      item.forEach((itm) => {
        if(itm!==0) {
          gameArrayRow.push(itm);
        }
      })
      newGameArray.push(gameArrayRow);
    });
    newGameArray.forEach((item, index) => {
      let gameArrayWithUniting = [];
      for(let i=0; i<=item.length; i++) {
        if(item[i+1]) {
          if(item[i]===item[i+1]) {
            gameArrayWithUniting.push(item[i]*2);
            this.increaseScore(item[i]);
            i=i+1;
          }else {
            gameArrayWithUniting.push(item[i]);
          }
        } else if(item[i]) {
          gameArrayWithUniting.push(item[i]);
        }
      }
      newGameArray[index] = gameArrayWithUniting;
    });
    newGameArray.forEach((item) => {
      while(item.length<this.gameState[0].length) {
        item.push(0);
      }
    });
    for(let i=0; i<newGameArray.length; i++) {
      for(let j=0; j<newGameArray[0].length; j++) {
        this.gameState[i][j] = newGameArray[i][j];
      }
    }
    if(this.compareNewAndOldGameArrays(oldArray, this.gameState)) {
      
    } else {
      this.addNumberToRandomCell();
    }
  }
  
  @action turnRight() {
    let oldArray = JSON.parse(JSON.stringify(this.gameState));
    let newGameArray:number[][] = [];
    let gameArrayRow:number[] = [];
    this.gameState.forEach((item) => {
      gameArrayRow = [];
      item.forEach((itm) => {
        if(itm!==0) {
          gameArrayRow.unshift(itm);
        }
      })
      newGameArray.push(gameArrayRow);
    });
    newGameArray.forEach((item, index) => {
      let gameArrayWithUniting = [];
      for(let i=0; i<=item.length; i++) {
        if(item[i+1]) {
          if(item[i]===item[i+1]) {
            gameArrayWithUniting.push(item[i]*2);
            this.increaseScore(item[i]);
            i=i+1;
          }else {
            gameArrayWithUniting.push(item[i]);
          }
        } else if(item[i]) {
          gameArrayWithUniting.push(item[i]);
        }
      }
      newGameArray[index] = gameArrayWithUniting;
    });
    newGameArray.forEach((item) => {
      while(item.length<this.gameState[0].length) {
        item.push(0);
      }
    });
    for(let i=0; i<newGameArray.length; i++) {
      for(let j=0; j<newGameArray[0].length; j++) {
        this.gameState[i][j] = newGameArray[i][newGameArray[0].length-1-j];
      }
    }
    if(this.compareNewAndOldGameArrays(oldArray, this.gameState)) {
      
    } else {
      this.addNumberToRandomCell();
    }
  }
}

export default new GameStore(4, 4)