export class CellAnimation {
  static move(from:{x: number, y: number}, to:{x:number, y:number}) {
    if((from.x -to.x === 0) && (from.y -to.y === 0)) {
      return
    }
    const cellSizeInPixels = 50;
    let cell = document.getElementById(`${from.x}${from.y}`);
    let frameCounter = 0;
    let animationInterval = setInterval(()=> {
      if(cell) {
        cell.style.transform=`translate(${(to.y-from.y)*cellSizeInPixels/10*frameCounter}px, ${(to.x-from.x)*cellSizeInPixels/10*frameCounter}px)`;
        cell.style.zIndex = '2';
        frameCounter++;
      }
      if(frameCounter===10) {
        clearInterval(animationInterval);
        if(cell) {
          cell.style.transform=`translate(0px, 0px)`;
          cell.style.zIndex = '0';
        }
      }
    }, 20);
  }
}