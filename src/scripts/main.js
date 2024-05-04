import { Canvas } from './classes/Canvas.js';
import * as Constants from './constants/constants.js';

let canvasId = "sand-canvas"
let matrix = createEmptyMatrix();
let colorHue = 1;

console.log(matrix);

function main(){

    // cria o canva
    let canvas = new Canvas(
        Constants.MATRIX_DIM_SIZE,
        Constants.CANVAS_PIXEL_SIZE,
        Constants.ELEMENT_MAIN,
        canvasId,
    ) 

    canvas.onMouseDragged = function(e){
        let x = Math.floor(e.offsetX / Constants.CANVAS_PIXEL_SIZE);
        let y = Math.floor(e.offsetY / Constants.CANVAS_PIXEL_SIZE);

        if(matrix[x][y] == 0) matrix[x][y] = colorHue;
    }

    run(canvas);
}

function run(canvas){

    let newMatrix = createEmptyMatrix();

    colorHue = (colorHue > 360) ? 1 : colorHue+1;

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            let current = matrix[i][j];
            let below = matrix[i][j+1];
            let dir = (Math.random() < 0.5) ? -1 : 1;

            let belowA = (i + dir >= 0 && i + dir <= matrix.length-1) ? matrix[i+dir][j+1] : undefined;
            let belowB = (i - dir >= 0 && i - dir <= matrix.length-1) ? matrix[i-dir][j+1] : undefined;
            
            if(current > 0){
                if (below == 0) { // fall down
                    newMatrix[i][j+1] = current;
                } else if (belowA == 0){ // fall left
                    newMatrix[i+dir][j+1] = current;
                } else if (belowB == 0) { // fall right
                    newMatrix[i-dir][j+1] = current;
                } else { // não se move
                    newMatrix[i][j] = current;
                }
            }
        }
    }

    matrix = newMatrix;

    renderCanvas(canvas);

    requestAnimationFrame(() => {
        run(canvas)
    });
}

function renderCanvas(canvas) {
    canvas.clear();

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] == 0) {
                // canvas.drawPixel(i, j, Constants.CANVAS_COLOR_EMPTY);
            } else {
                canvas.drawPixel(i, j, `hsl(${matrix[i][j]}, 100%, 50%)`);
            }
        }
    }
}

function createEmptyMatrix(){
    return new Array(Constants.MATRIX_DIM_SIZE).fill(0)
                .map(() => new Array(Constants.MATRIX_DIM_SIZE).fill(0));
}

main();