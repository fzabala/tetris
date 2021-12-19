import {
    GRID_BACKGROUND_COLOR,
    GRID_LINE_COLOR,
    GRID_LINE_WIDTH,
    GRID_SIZE,
    NEXT_TOP_MARGIN,
    NEXT_WIDTH,
    NEXT_HEIGHT,
    NEXT_LEFT_MARGIN,
} from "const";
import { IDrawable } from "interfaces";

export const Next: IDrawable = {
    draw: (context: CanvasRenderingContext2D) => {
        for (let i = 0; i < NEXT_WIDTH; i++) {
            for (let j = 0; j < NEXT_HEIGHT; j++) {
                context.fillStyle = GRID_BACKGROUND_COLOR;
                context.fillRect(NEXT_LEFT_MARGIN + i * GRID_SIZE, NEXT_TOP_MARGIN + j * GRID_SIZE, GRID_SIZE, GRID_SIZE);
                // right border
                context.fillStyle = GRID_LINE_COLOR;
                context.fillRect(NEXT_LEFT_MARGIN + (i + 1) * GRID_SIZE - 1, NEXT_TOP_MARGIN + j * GRID_SIZE, GRID_LINE_WIDTH, GRID_SIZE);
                // bottom border
                context.fillRect(NEXT_LEFT_MARGIN + i * GRID_SIZE, NEXT_TOP_MARGIN + (j + 1) * GRID_SIZE - 1, GRID_SIZE, GRID_LINE_WIDTH);
            }
        }

        // global left border
        context.fillStyle = GRID_LINE_COLOR;
        context.fillRect(NEXT_LEFT_MARGIN - 1, NEXT_TOP_MARGIN - 1, GRID_LINE_WIDTH, NEXT_HEIGHT * GRID_SIZE);
        // global top border
        context.fillRect(NEXT_LEFT_MARGIN - 1, NEXT_TOP_MARGIN - 1, NEXT_WIDTH * GRID_SIZE, GRID_LINE_WIDTH);
    },
};