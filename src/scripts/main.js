import { Canvas } from './classes/Canvas.js';
import * as Constants from './constants/constants.js';

function main(){

    let canvas = new Canvas(
        Constants.CANVAS_WIDTH,
        Constants.CANVAS_HEIGHT,
        Constants.CANVAS_PIXEL_SIZE,
        Constants.ELEMENT_MAIN,
        Constants.CANVAS_ELEMENT_ID,
    ) 

    canvas.run();
}

main();