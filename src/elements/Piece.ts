import { GRID_LINE_WIDTH, GRID_SIZE, NEXT_LEFT_MARGIN, NEXT_TOP_MARGIN, } from "const";
import { IUpdatableAndDrawable } from "interfaces";
import { PieceType } from "types";

export const Piece: IUpdatableAndDrawable = {
    draw: (context: CanvasRenderingContext2D, piece: PieceType) => {
        for (let block of piece.blocks[0]) {
            context.fillStyle = piece.color;
            context.fillRect(NEXT_LEFT_MARGIN + block.x * GRID_SIZE, NEXT_TOP_MARGIN + block.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
        }
        for (let block of piece.blocks[0]) {
            context.fillStyle = piece.borderColor;
            //right border
            context.fillRect(NEXT_LEFT_MARGIN + (block.x + 1) * GRID_SIZE - 1, NEXT_TOP_MARGIN + block.y * GRID_SIZE, GRID_LINE_WIDTH, GRID_SIZE);
            // bottom border
            context.fillRect(NEXT_LEFT_MARGIN + block.x * GRID_SIZE, NEXT_TOP_MARGIN + (block.y + 1) * GRID_SIZE - 1, GRID_SIZE, GRID_LINE_WIDTH);
            // left border
            context.fillRect(NEXT_LEFT_MARGIN + (block.x) * GRID_SIZE - 1, NEXT_TOP_MARGIN + block.y * GRID_SIZE, GRID_LINE_WIDTH, GRID_SIZE);
            // top border
            context.fillRect(NEXT_LEFT_MARGIN + block.x * GRID_SIZE, NEXT_TOP_MARGIN + (block.y) * GRID_SIZE - 1, GRID_SIZE, GRID_LINE_WIDTH);
        }
    },
    update: (context: CanvasRenderingContext2D, keyState: string) => {
        console.log(context, keyState);
    }
};