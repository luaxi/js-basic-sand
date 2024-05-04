import * as Constants from "../constants/constants.js";

export class Canvas{

    onMouseDragged;
    isMouseDown = false;
    matrix = createEmptyMatrix();

    constructor(width, height, pixelSize, parentElement, canvasId){
        this.WIDTH = width * pixelSize;
        this.HEIGHT = height * pixelSize;
        this.CANVAS_ID = canvasId;
        this.PIXEL_SIZE = pixelSize;
        this.selfElement = this.createHTMLCanvas(this.WIDTH, this.HEIGHT, parentElement, canvasId);
    }

    createHTMLCanvas(width, height, parentElement, canvasId){
        let canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.id = canvasId;
        
        canvas.addEventListener('mousedown', (e) => {
            this.isMouseDown = true;
        });

        canvas.addEventListener('mouseup', (e) => {
            this.isMouseDown = false;
        });

        canvas.addEventListener('mousemove', (e) => {
            if(this.isMouseDown){
                this.onMouseDragged(e);
            }
        });
        
        document.querySelector(parentElement).appendChild(canvas);

        return document.querySelector(`#${canvasId}`);
    }

    drawPixel(x, y, color){
        let ctx = this.selfElement.getContext('2d');
        x *= this.PIXEL_SIZE;
        y *= this.PIXEL_SIZE;
        
        ctx.fillStyle = color;
        ctx.fillRect(x, y, this.PIXEL_SIZE, this.PIXEL_SIZE);
    }

    clear(){
        let ctx = this.selfElement.getContext('2d');
        ctx.fillStyle = Constants.CANVAS_COLOR_EMPTY;

        ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT)
    }

}

function createEmptyMatrix(){
    return new Array(Constants.CANVAS_WIDTH).fill(0)
                .map(() => new Array(Constants.CANVAS_HEIGHT).fill(0));
}