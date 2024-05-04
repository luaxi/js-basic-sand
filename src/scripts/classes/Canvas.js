import { CANVAS_COLOR_EMPTY } from "../constants/constants.js";

export class Canvas{

    onMouseDragged;

    constructor(size, pixelSize, parentElement, canvasId){
        this.SIDES_SIZE = size * pixelSize;
        this.CANVAS_ID = canvasId;
        this.PIXEL_SIZE = pixelSize;
        this.isMouseDown = false;
        this.selfElement = this.createCanvas(this.SIDES_SIZE, parentElement, canvasId);
    }

    createCanvas(sideSize, parentElement, canvasId){
        let canvas = document.createElement("canvas");
        canvas.width = sideSize;
        canvas.height = sideSize;
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

    /**
     * Desenha um pixel de tamanho PIXEL_SIZE. 
     * Os parâmetros devem considerar a posição do pixel na matriz de pixels, não no canvas em si.
     * @param {number} x posição x na matriz
     * @param {number} y posição y na matriz
     * @param {} color cor do pixel
     */
    drawPixel(x, y, color){
        let ctx = this.selfElement.getContext('2d');
        x *= this.PIXEL_SIZE;
        y *= this.PIXEL_SIZE;
        
        ctx.fillStyle = color;
        ctx.fillRect(x, y, this.PIXEL_SIZE, this.PIXEL_SIZE);

    }

    clear(){
        let ctx = this.selfElement.getContext('2d');
        ctx.fillStyle = CANVAS_COLOR_EMPTY;

        ctx.fillRect(0, 0, this.SIDES_SIZE, this.SIDES_SIZE)
    }

}