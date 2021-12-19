import { Piece1, Piece2, Piece3, Piece4, Piece5, Piece6, Piece7 } from "pieces";
import { BlockType, GamePieceType, PieceType } from "types";

export const getRandomPiece = () => {
    const pieces: PieceType[] = [
        Piece1,
        Piece2,
        Piece3,
        Piece4,
        Piece5,
        Piece6,
        Piece7,
    ];

    const index = Math.floor(Math.random() * pieces.length);

    return pieces[index];
};

export const getPieceWidth = (piece: PieceType) => {
    const maxX = Math.max(...piece.blocks.map((block) => block.x));
    const minX = Math.min(...piece.blocks.map((block) => block.x));
    return maxX - minX + 1;
};

export const getPieceHeight = (piece: PieceType) => {
    const maxY = Math.max(...piece.blocks.map((block) => block.y));
    const minY = Math.min(...piece.blocks.map((block) => block.y));
    return maxY - minY + 1;
};

export const getMinXPiece = (piece: PieceType) => {
    return -Math.min(...(piece.blocks).map((block) => block.x));
};

export const checkVerticalCollision = (gamePiece: GamePieceType, grid: (string | undefined)[][]) => {
    const collisionableBlocks: BlockType[] = [];
    gamePiece.piece.blocks.forEach((block) => {
        const avoidableBlock = gamePiece.piece.blocks.find((avoidableBlockItem) => avoidableBlockItem.x === block.x && avoidableBlockItem.y === block.y + 1);
        if (!avoidableBlock){
            collisionableBlocks.push(block);
        }
    });

    let collided = false;
    collisionableBlocks.forEach((block) => {
        const y = gamePiece.y + block.y + 1;
        const cellToCheck = grid[gamePiece.x + block.x][y];
        collided = collided || (cellToCheck === undefined || cellToCheck !== "");
    });
    return collided;
};
