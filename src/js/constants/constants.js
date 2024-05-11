
export const CANVAS_WIDTH = 100;
export const CANVAS_HEIGHT = 60;
export const CANVAS_PIXEL_SIZE = 8;
export const CANVAS_COLOR_EMPTY = "black";
export const CANVAS_COLOR_START = "white";
export const CANVAS_ELEMENT_ID = "sand-canvas";
export const CANVAS_PARENT_ELEMENT = "#canvas";

export const CANVAS_MIN_SPEED = 0;
export const CANVAS_MAX_SPEED = 300;

export const ELEMENT_MAIN = "#main";

export const COLORS = [
    { name: "white", hexCode: 0xFFFFFF },
    { name: "red", hexCode: 0xDB2828 },
    { name: "orange", hexCode: 0xF2711C },
    { name: "yellow", hexCode: 0xFBBD08 },
    { name: "green", hexCode: 0x21BA45 },
    { name: "teal", hexCode: 0x00B5AD },
    { name: "blue", hexCode: 0x2185D0 },
    { name: "purple", hexCode: 0xA333C8 },
];

export const hexToString = (x) => "#" + x.toString(16).toUpperCase().padStart(6, '0');