import { Canvas } from './classes/Canvas.js';
import * as Constants from './constants/constants.js';

let canvasId = "sand-canvas"
let myMatrix = createEmptyMatrix();

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

    renderCanvas(myCanvas);
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
    requestAnimationFrame(() => {
        renderCanvas(canvas)
    }, 300)
}

function createEmptyMatrix(){
    let matrix = [];

    for(let i = 0; i < Constants.MATRIX_DIM_SIZE; i++){
        let row = [];
        for(let j = 0; j < Constants.MATRIX_DIM_SIZE; j++){
            row.push(Math.floor(Math.random()));
        }
        matrix.push(row);
    }

    return matrix;
}

main();