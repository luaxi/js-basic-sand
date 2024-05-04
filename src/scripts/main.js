import { Canvas } from './classes/Canvas.js';
import * as Constants from './constants/constants.js';

let canvasId = "sand-canvas"
let myMatrix = createEmptyMatrix();
let colorHue = 1;

console.log(myMatrix);

function main(){

    // cria o canva
    let myCanvas = new Canvas(
        Constants.MATRIX_DIM_SIZE,
        Constants.CANVAS_PIXEL_SIZE,
        Constants.ELEMENT_MAIN,
        canvasId,
    ) 

    myCanvas.onMouseDragged = function(e){
        let x = Math.floor(e.offsetX / Constants.CANVAS_PIXEL_SIZE);
        let y = Math.floor(e.offsetY / Constants.CANVAS_PIXEL_SIZE);

        if(myMatrix[x][y] == 0) myMatrix[x][y] = colorHue;
    }

    run(myCanvas);
}

function run(canvas){

    let newMatrix = createEmptyMatrix();

    colorHue = (colorHue > 360) ? 1 : colorHue+1;

    for (let i = 0; i < myMatrix.length; i++) {
        for (let j = 0; j < myMatrix[0].length; j++) {
            if(myMatrix[i][j] > 0){
                if (myMatrix[i][j+1] == 0) { // fall down
                    newMatrix[i][j+1] = myMatrix[i][j];
                } else if (i > 0 && myMatrix[i-1][j+1] == 0){ // fall left
                    newMatrix[i-1][j+1] = myMatrix[i][j];
                } else if (i < myMatrix.length-1 && myMatrix[i+1][j+1] == 0) { // fall right
                    newMatrix[i+1][j+1] = myMatrix[i][j];
                } else { // não se move
                    newMatrix[i][j] = myMatrix[i][j];
                }
            }
        }
    }

    myMatrix = newMatrix;

    renderCanvas(canvas);

    requestAnimationFrame(() => {
        run(canvas)
    });
}

function renderCanvas(canvas) {
    canvas.clear();

    for (let i = 0; i < myMatrix.length; i++) {
        for (let j = 0; j < myMatrix[0].length; j++) {
            if (myMatrix[i][j] == 0) {
                // canvas.drawPixel(i, j, Constants.CANVAS_COLOR_EMPTY);
            } else {
                canvas.drawPixel(i, j, `hsl(${myMatrix[i][j]}, 100%, 50%)`);
            }
        }
    }
}

function createEmptyMatrix(){
    return new Array(Constants.MATRIX_DIM_SIZE).fill(0)
                .map(() => new Array(Constants.MATRIX_DIM_SIZE).fill(0));
}

main();