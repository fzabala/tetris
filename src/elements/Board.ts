import {
    FILLED_CELL,
    GRID_BACKGROUND_COLOR, GRID_BACKGROUND_COLOR_FILLED,
    GRID_HEIGHT,
    GRID_LEFT_MARGIN,
    GRID_LINE_COLOR, GRID_LINE_COLOR_FILLED,
    GRID_LINE_WIDTH,
    GRID_SIZE,
    GRID_TOP_MARGIN,
    GRID_WIDTH,
} from "const";
import { IDrawable } from "interfaces";
import { GamePieceType, GridType } from "types";

export const Board: IDrawable = {
    draw: (context: CanvasRenderingContext2D, newPiece: GamePieceType, grid: GridType) => {
        for (let i = 0; i < GRID_WIDTH; i++) {
            for (let j = 0; j < GRID_HEIGHT; j++) {
                const cell = grid[i][j];
                context.fillStyle = cell === FILLED_CELL ? GRID_BACKGROUND_COLOR_FILLED : GRID_BACKGROUND_COLOR;
                context.fillRect(GRID_LEFT_MARGIN + i * GRID_SIZE, GRID_TOP_MARGIN + j * GRID_SIZE, GRID_SIZE, GRID_SIZE);
                // right border
                context.fillStyle = cell === FILLED_CELL ? GRID_LINE_COLOR_FILLED : GRID_LINE_COLOR;
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

        // draw new piece

        for (let block of newPiece.piece.blocks) {
            context.fillStyle = newPiece.piece.color;
            context.fillRect(GRID_LEFT_MARGIN + (block.x + newPiece.x) * GRID_SIZE, GRID_TOP_MARGIN + (block.y + newPiece.y) * GRID_SIZE, GRID_SIZE, GRID_SIZE);
        }

        for (let block of newPiece.piece.blocks) {
            context.fillStyle = newPiece.piece.borderColor;
            //right border
            context.fillRect(GRID_LEFT_MARGIN + (block.x + newPiece.x + 1) * GRID_SIZE - 1, GRID_TOP_MARGIN + (block.y + newPiece.y) * GRID_SIZE, GRID_LINE_WIDTH, GRID_SIZE);
            // bottom border
            context.fillRect(GRID_LEFT_MARGIN + (block.x + newPiece.x) * GRID_SIZE, GRID_TOP_MARGIN + (block.y + 1 + newPiece.y) * GRID_SIZE - 1, GRID_SIZE, GRID_LINE_WIDTH);
            // left border
            context.fillRect(GRID_LEFT_MARGIN + (block.x + newPiece.x) * GRID_SIZE - 1, GRID_TOP_MARGIN + (block.y + newPiece.y) * GRID_SIZE, GRID_LINE_WIDTH, GRID_SIZE);
            // top border
            context.fillRect(GRID_LEFT_MARGIN + (block.x + newPiece.x) * GRID_SIZE, GRID_TOP_MARGIN + (block.y + newPiece.y) * GRID_SIZE - 1, GRID_SIZE, GRID_LINE_WIDTH);
        }
    },
};