import * as Constants from './constants/constants.js';
import { Canvas } from './components/Canvas.js';

function main(){

    // initialize canvas
    let canvas = new Canvas(
        Constants.CANVAS_WIDTH,
        Constants.CANVAS_HEIGHT,
        Constants.CANVAS_PIXEL_SIZE,
        Constants.CANVAS_PARENT_ELEMENT,
        Constants.CANVAS_ELEMENT_ID,
    ) 

    // initialize slider
    let slider = document.querySelector("#speed-slider");
    slider.min = Constants.CANVAS_MIN_SPEED;
    slider.max = Constants.CANVAS_MAX_SPEED;
    slider.value = Constants.CANVAS_MAX_SPEED;

    slider.addEventListener('input', (e) => {
        let convertSpeed = ((slider.value / 300) - 1 ) * -300;
        canvas.speed = convertSpeed;
    });

    // run canvas
    canvas.run();
}

main();