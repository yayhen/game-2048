import { action, makeAutoObservable, observable } from "mobx";
import { CellAnimation } from "../shared/cell-animation";

export class GameStore {
  @observable gameState: number[][] = [[]];
  previousGameState: number[][] = [[]];
  @observable score: number = 0;
  @observable gameWasLosed: boolean = false;

  constructor() {
    makeAutoObservable(this);
    this.newGame();
  }

  increaseScore(value: number) {
    this.score += value*2;
    let best = parseInt(localStorage.getItem('best') as string);
    if (best !== best) {
      localStorage.setItem('best', this.score.toString());
    }
    if(this.score > best) {
      localStorage.setItem('best', this.score.toString());
    }

  }

  finishGame() {
    this.gameWasLosed = true;
  }

  loseCheck(): boolean {
    let totalEmptyCells = 0;
    this.gameState.forEach((item) => {
      item.forEach((itm) => {
        if(itm === 0) {
          totalEmptyCells += 1;
        }
      })
    });
    if(totalEmptyCells===0) {
      for(let i=0; i<this.gameState.length-1; i++) {
        for(let j=0; j<this.gameState[0].length-1; j++) {
          if((this.gameState[i][j]===this.gameState[i+1][j]) || (this.gameState[i][j]===this.gameState[i][j+1])) {
            return false;
          }
        }
      }
      for (let i=0; i<this.gameState.length-1; i++) {
        if(this.gameState[i][this.gameState[0].length-1] === this.gameState[i+1][this.gameState[0].length-1]) {
          return false
        }
      }
      for (let i=0; i<this.gameState[0].length-1; i++) {
        if(this.gameState[this.gameState.length-1][i] === this.gameState[this.gameState.length-1][i+1]) {
          return false
        }
      }
      return true
    } else return false
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
    if(totalEmptyCells===0) {
      this.finishGame();
      return
    }
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
    if(this.loseCheck()) {
      this.finishGame();
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
    this.previousGameState = JSON.parse(JSON.stringify(this.gameState));
    let newGameArray: number[][] = [[]];
    for(let j=0; j<this.gameState[0].length; j++) {
      newGameArray[j]=[];
      for(let i=0; i<this.gameState.length; i++) {
        if(this.gameState[i][j] !== 0) {
          newGameArray[j].push(this.gameState[i][j]);
          let cellsAbove = 0;
          for(let k=i; k>=1; k--) {
            if(this.gameState[k-1][j] && this.gameState[k-1][j]!==0 && (this.gameState[k-1][j]!==this.gameState[k][j])) {
              cellsAbove++;
            }
          }
          CellAnimation.move({x: i, y: j},{x: cellsAbove, y: j})
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
    setTimeout(() => {
      for(let i=0; i<newGameArray.length; i++) {
        for(let j=0; j<newGameArray[0].length; j++) {
          this.gameState[i][j] = newGameArray[j][i];
        }
      }
      if(this.compareNewAndOldGameArrays(oldArray, this.gameState)) {
        if(this.loseCheck()) {
          this.finishGame();
        }
      } else {
        this.addNumberToRandomCell();
      }
    }, 150)
  }

  @action turnDown() {
    this.previousGameState = JSON.parse(JSON.stringify(this.gameState));
    let oldArray = JSON.parse(JSON.stringify(this.gameState));
    let arrayToRotate: number[][] = [];
    this.gameState.forEach((item => {
      arrayToRotate.unshift(item);
    }));
    //this.gameState = arrayToRotate.slice();
    let newGameArray: number[][] = [[]];
    for(let j=0; j<arrayToRotate[0].length; j++) {
      newGameArray[j]=[];
      for(let i=0; i<arrayToRotate.length; i++) {
        if(arrayToRotate[i][j] !== 0) {
          newGameArray[j].push(arrayToRotate[i][j]);
          let cellsAbove = 0;
          for(let k=i; k>=1; k--) {
            if(arrayToRotate[k-1][j] && arrayToRotate[k-1][j]!==0 && (arrayToRotate[k-1][j]!==arrayToRotate[k][j])) {
              cellsAbove++;
            }
          }
          CellAnimation.move({x: arrayToRotate.length - i - 1, y: j},{x: arrayToRotate.length - cellsAbove - 1, y: j});
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
    setTimeout(() => {
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
        if(this.loseCheck()) {
          this.finishGame();
        }
      } else {
        this.addNumberToRandomCell();
      }
    }, 150)
    
  }

  @action turnLeft() {
    let oldArray = JSON.parse(JSON.stringify(this.gameState));
    this.previousGameState = JSON.parse(JSON.stringify(this.gameState));
    let newGameArray:number[][] = [];
    let gameArrayRow:number[] = [];
    this.gameState.forEach((item, index) => {
      gameArrayRow = [];
      item.forEach((itm, ind) => {
        if(itm!==0) {
          gameArrayRow.push(itm);
          let cellsAbove = 0;
          for(let k=ind; k>=1; k--) {
            if(this.gameState[index][k-1] && this.gameState[index][k-1]!==0 &&(this.gameState[index][k-1] !==this.gameState[index][k])) {
              cellsAbove++;
            }
          }
          CellAnimation.move({x: index, y: ind},{x: index, y: cellsAbove});
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
    setTimeout(() => {
      for(let i=0; i<newGameArray.length; i++) {
        for(let j=0; j<newGameArray[0].length; j++) {
          this.gameState[i][j] = newGameArray[i][j];
        }
      }
      if(this.compareNewAndOldGameArrays(oldArray, this.gameState)) {
        if(this.loseCheck()) {
          this.finishGame();
        }
      } else {
        this.addNumberToRandomCell();
      }
    }, 150)
  }
  
  @action turnRight() {
    let oldArray = JSON.parse(JSON.stringify(this.gameState));
    this.previousGameState = JSON.parse(JSON.stringify(this.gameState));
    let newGameArray:number[][] = [];
    let gameArrayRow:number[] = [];
    this.gameState.forEach((item, index) => {
      gameArrayRow = [];
      item.forEach((itm, ind) => {
        if(itm!==0) {
          gameArrayRow.unshift(itm);
          let cellsAbove = 0;
          for(let k=ind; k<=item.length-1; k++) {
            if(this.gameState[index][k+1] && this.gameState[index][k+1]!==0 && (this.gameState[index][k+1]!==this.gameState[index][k])) {
              cellsAbove++;
            }
          }
          CellAnimation.move({x: index, y: ind},{x: index, y: item.length-1-cellsAbove});
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
    setTimeout(() => {
      for(let i=0; i<newGameArray.length; i++) {
        for(let j=0; j<newGameArray[0].length; j++) {
          this.gameState[i][j] = newGameArray[i][newGameArray[0].length-1-j];
        }
      }
      if(this.compareNewAndOldGameArrays(oldArray, this.gameState)) {
        if(this.loseCheck()) {
          this.finishGame();
        }
      } else {
        this.addNumberToRandomCell();
      }
    }, 150);
  }

  @action returnTurn() {
    this.gameState = JSON.parse(JSON.stringify(this.previousGameState));
  }

  @action newGame() {
    for(let i=0; i<4; i++) {
      this.gameState[i] = [];
      for(let j=0; j<4; j++) {
        this.gameState[i][j] = 0;
      }
    }
    this.gameWasLosed = false;
    this.score = 0;
    this.addNumberToRandomCell();
    this.addNumberToRandomCell();
    this.previousGameState = JSON.parse(JSON.stringify(this.gameState));
  }
}

export default new GameStore();