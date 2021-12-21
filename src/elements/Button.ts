import { IDrawable } from "interfaces";
import { BLUE_COLOR, FONT_SIZE, FONT_WIDTH, FONT_FAMILY } from "const";

export const Button: IDrawable = {
    draw: (context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, text: string) => {
        context.fillStyle = BLUE_COLOR;
        context.fillRect(x, y, w, h);

        context.font = `${FONT_SIZE}pt ${FONT_FAMILY}`;
        context.fillStyle = "#FFFFFF";
        context.fillText(text, x + FONT_WIDTH, y + FONT_SIZE * 1.5);
    },
};