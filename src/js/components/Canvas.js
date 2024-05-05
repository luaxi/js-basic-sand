import * as Constants from "../constants/constants.js";

export class Canvas{

    isMouseDown = false;
    colorHue = 1;
    matrix = createEmptyMatrix();
    speed = 0;

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
                let x = Math.floor(e.offsetX / Constants.CANVAS_PIXEL_SIZE);
                let y = Math.floor(e.offsetY / Constants.CANVAS_PIXEL_SIZE);

                if(this.matrix[x][y] == 0){ 
                    this.matrix[x][y] = this.colorHue;
                    this.drawPixel(x, y, "white");
                }
                
            }
        });
        
        document.querySelector(parentElement).appendChild(canvas);

        return document.querySelector(`#${canvasId}`);
    }

    renderCanvas() {
        this.clear();
    
        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = 0; j < this.matrix[0].length; j++) {
                if (this.matrix[i][j] > 0) {
                    this.drawPixel(i, j, `hsl(${this.matrix[i][j]}, 100%, 50%)`);
                }
            }
        }
    }

    run(){

        let newMatrix = createEmptyMatrix();
        this.colorHue = (this.colorHue > 360) ? 1 : this.colorHue+1;
    
        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = 0; j < this.matrix[0].length; j++) {
                let current = this.matrix[i][j];
                let below = this.matrix[i][j+1];
                let dir = (Math.random() < 0.5) ? -1 : 1;
    
                let belowA = (i + dir >= 0 && i + dir <= this.matrix.length-1) ? this.matrix[i+dir][j+1] : undefined;
                let belowB = (i - dir >= 0 && i - dir <= this.matrix.length-1) ? this.matrix[i-dir][j+1] : undefined;
                
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
    
        this.matrix = newMatrix;
    
        this.renderCanvas();
    
        setTimeout(requestAnimationFrame, this.speed, () => {
            this.run()
        })
        // requestAnimationFrame(() => {
        //     this.run()
        // });
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