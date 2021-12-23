import { IDrawable } from "interfaces";
import { BLUE_COLOR, FONT_SIZE, FONT_WIDTH, FONT_FAMILY } from "const";

export const TextBox: IDrawable = {
    draw: (context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, text: string, fontSizeScale = 1) => {
        context.font = `${FONT_SIZE * fontSizeScale}pt ${FONT_FAMILY}`;
        context.fillStyle = BLUE_COLOR;
        context.fillText(text, x + FONT_WIDTH, y + FONT_SIZE * 1.5);
    },
};