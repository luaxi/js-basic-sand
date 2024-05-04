import { Canvas } from './classes/Canvas.js';
import * as Constants from './constants/constants.js';

let canvasId = "sand-canvas"
let myMatrix = createEmptyMatrix();

console.log(myMatrix);

function main(){

    // cria o canva
    let myCanvas = new Canvas(
        Constants.MATRIX_DIM_SIZE,
        Constants.CANVAS_PIXEL_SIZE,
        Constants.ELEMENT_MAIN,
        canvasId,
    ) 

    myCanvas.callback = function(e){
        let x = Math.floor(e.offsetX / Constants.CANVAS_PIXEL_SIZE);
        let y = Math.floor(e.offsetY / Constants.CANVAS_PIXEL_SIZE);

        myMatrix[x][y] = 1;
    }

    run(myCanvas);
}

function run(canvas){

    let newMatrix = createEmptyMatrix();

    for (let i = 0; i < myMatrix.length; i++) {
        for (let j = 0; j < myMatrix[0].length; j++) {
            if(myMatrix[i][j] == 1){
                if (myMatrix[i][j+1] == 0) {
                    newMatrix[i][j+1] = 1
                } else {
                    newMatrix[i][j] = 1;
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
    for (let i = 0; i < myMatrix.length; i++) {
        for (let j = 0; j < myMatrix[0].length; j++) {
            if (myMatrix[i][j] == 0) {
                canvas.drawPixel(i, j, "yellow");
            } else {
                canvas.drawPixel(i, j, "green");
            }
        }
    }
}

function createEmptyMatrix(){
    return new Array(Constants.MATRIX_DIM_SIZE).fill(0)
                .map(() => new Array(Constants.MATRIX_DIM_SIZE).fill(0));
}

main();