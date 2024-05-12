import * as Constants from './constants/constants.js';
import { Canvas } from './components/Canvas.js';

function main(){

    let selectedColor = Constants.CANVAS_COLOR_START;

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
        let convertSpeed = -slider.value + Constants.CANVAS_MAX_SPEED;
        canvas.speed = convertSpeed;
    });

    // initialize color-selector
    let color_selector = document.querySelector("#color-selector");
    Constants.COLORS.forEach((color) => {
        let span = document.createElement("span");
        let label = document.createElement("label");
        let input = document.createElement("input");
       
        span.style.backgroundColor = Constants.hexColorToString(color.hexCode);
        span.className = "color-option";
        span.id = color.name;

        input.type = "radio";
        input.name = "color";
        input.id = color.name;
        input.value = color.hexCode.toString();
        console.log(input.value);

        input.addEventListener('change', (e) => {
            document.querySelector(`#${selectedColor}`).classList.remove("color-selected");

            selectedColor = e.target.id;
            canvas.selectedColor = parseInt(e.target.value);
            
            document.querySelector(`#${e.target.id}`).classList.add("color-selected");
        });

        label.appendChild(span);
        label.appendChild(input);
        
        color_selector.appendChild(label);
    })

    // set up controls
    let buttonReset = document.querySelector("#btn-reset");
    let buttonDownload = document.querySelector("#btn-download");
    let anchorDonwload = document.querySelector("#anchor-download");
    
    buttonReset.addEventListener('click', (e) => {
        let current_rotation = getComputedStyle(e.currentTarget).getPropertyValue('rotate');
        let current_rotation_int = (current_rotation == "none") ? 0 : parseInt(current_rotation.slice(0, -3));
        let new_rotation = current_rotation_int + 180;

        e.currentTarget.style['rotate'] = `${new_rotation}deg`;

        canvas.reset();
    });

    buttonDownload.addEventListener('click', (e) => {
        let image = canvas.selfElement.toDataURL();
        anchorDonwload.setAttribute("href", image);
    });

    // run canvas
    canvas.run();
}

main();