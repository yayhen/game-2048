export class Anton {

  static nextTurn(gameArray: number[][]): string {
    let scores: number[] = [];

    return 'up';
  }

  static turnUpScore(gameState: number[][]): number {
    let score = 0;
    let newGameArray: number[][] = [[]];
    for(let j=0; j<gameState[0].length; j++) {
      newGameArray[j]=[];
      for(let i=0; i<gameState.length; i++) {
        if(gameState[i][j] !== 0) {
          newGameArray[j].push(gameState[i][j]);
        }
      }
    }
    newGameArray.forEach((item, index) => {
      let gameArrayWithUniting = [];
      for(let i=0; i<=item.length; i++) {
        if(item[i+1]) {
          if(item[i]===item[i+1]) {
            gameArrayWithUniting.push(item[i]*2);
            score += item[i]*2;
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
    return score;
  }

  static turnDownScore(gameState: number[][]): number {
    let score = 0;
    let arrayToRotate: number[][] = [];
    gameState.forEach((item => {
      arrayToRotate.unshift(item);
    }));
    let newGameArray: number[][] = [[]];
    for(let j=0; j<arrayToRotate[0].length; j++) {
      newGameArray[j]=[];
      for(let i=0; i<arrayToRotate.length; i++) {
        if(arrayToRotate[i][j] !== 0) {
          newGameArray[j].push(arrayToRotate[i][j]);
        }
      }
    }
    newGameArray.forEach((item, index) => {
      let gameArrayWithUniting = [];
      for(let i=0; i<=item.length; i++) {
        if(item[i+1]) {
          if(item[i]===item[i+1]) {
            gameArrayWithUniting.push(item[i]*2);
            score += item[i]*2;
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
  return score;
  }

  static turnLeftScore(gameState: number[][]): number {
    let score = 0;
    let newGameArray:number[][] = [];
    let gameArrayRow:number[] = [];
    gameState.forEach((item) => {
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
            score += item[i]*2;
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
    return score;
  }

  static turnRightScore(gameState: number[][]): number {
    let score = 0;
    let newGameArray:number[][] = [];
    let gameArrayRow:number[] = [];
    gameState.forEach((item, index) => {
      gameArrayRow = [];
      item.forEach((itm, ind) => {
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
            score += item[i]*2
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
    return score;
  }
}