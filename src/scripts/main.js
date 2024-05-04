import { Canvas } from './classes/Canvas.js';
import * as Constants from './constants/constants.js';

const canvasId = "sand-canvas"

function main(){
    let myCanvas = new Canvas(
        Constants.MATRIX_DIM_SIZE,
        Constants.CANVAS_PIXEL_SIZE,
        Constants.ELEMENT_MAIN,
        canvasId
    ) 

    myCanvas.drawPixel(19, 19, `hsl(50, 100%, 50%)`);

}

main();