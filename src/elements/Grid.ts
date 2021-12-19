import {
    GRID_BACKGROUND_COLOR,
    GRID_HEIGHT,
    GRID_LINE_COLOR,
    GRID_LINE_WIDTH,
    GRID_SIZE,
    GRID_WIDTH,
    GRID_LEFT_MARGIN,
    GRID_TOP_MARGIN,
} from "const";
import { IDrawable } from "interfaces";

export const Grid: IDrawable = {
    draw: (context: CanvasRenderingContext2D) => {
        for (let i = 0; i < GRID_WIDTH; i++) {
            for (let j = 0; j < GRID_HEIGHT; j++) {
                context.fillStyle = GRID_BACKGROUND_COLOR;
                context.fillRect(GRID_LEFT_MARGIN + i * GRID_SIZE, GRID_TOP_MARGIN + j * GRID_SIZE, GRID_SIZE, GRID_SIZE);
                // right border
                context.fillStyle = GRID_LINE_COLOR;
                context.fillRect(GRID_LEFT_MARGIN + (i + 1) * GRID_SIZE - 1, GRID_TOP_MARGIN + j * GRID_SIZE, GRID_LINE_WIDTH, GRID_SIZE);
                // bottom border
                context.fillRect(GRID_LEFT_MARGIN + i * GRID_SIZE, GRID_TOP_MARGIN + (j + 1) * GRID_SIZE - 1, GRID_SIZE, GRID_LINE_WIDTH);
            }
        }

        // global left border
        context.fillStyle = GRID_LINE_COLOR;
        context.fillRect(GRID_LEFT_MARGIN - 1, GRID_TOP_MARGIN - 1, GRID_LINE_WIDTH, GRID_HEIGHT * GRID_SIZE);
        // global top border
        context.fillRect(GRID_LEFT_MARGIN - 1, GRID_TOP_MARGIN - 1, GRID_WIDTH * GRID_SIZE, GRID_LINE_WIDTH);
    },
};