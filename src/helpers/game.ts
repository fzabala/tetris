import { Piece1, Piece2, Piece3, Piece4, Piece5, Piece6, Piece7 } from "pieces";
import { BlockType, GamePieceType, GridType, PieceType } from "types";
import { BASE_SCORE, GRID_WIDTH } from "const";

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

export const getPieceWidth = (gamePiece: GamePieceType) => {
    const maxX = Math.max(...gamePiece.piece.blocks[gamePiece.variation].map((block) => block.x));
    const minX = Math.min(...gamePiece.piece.blocks[gamePiece.variation].map((block) => block.x));
    return maxX - minX + 1;
};

export const getMinXPiece = (gamePiece: GamePieceType) => {
    return -Math.min(...(gamePiece.piece.blocks[gamePiece.variation]).map((block) => block.x));
};

const getCollisionableBlocks = (gamePiece: GamePieceType, grid: GridType, moveX: number, moveY: number) => {
    const collisionableBlocks: BlockType[] = [];
    gamePiece.piece.blocks[gamePiece.variation].forEach((block) => {
        const avoidableBlock = gamePiece.piece.blocks[gamePiece.variation].find((avoidableBlockItem) => avoidableBlockItem.x === block.x + moveX && avoidableBlockItem.y === block.y + moveY);

        if (!avoidableBlock) {
            collisionableBlocks.push(block);
        }
    });

    return collisionableBlocks;
};

export const checkVerticalCollision = (gamePiece: GamePieceType, grid: GridType) => {
    const collisionableBlocks = getCollisionableBlocks(gamePiece, grid, 0, 1);

    let collided = false;
    collisionableBlocks.forEach((block) => {
        const y = gamePiece.y + block.y + 1;
        const x = gamePiece.x + block.x;
        if (x >= 0 && x < GRID_WIDTH) {
            const cellToCheck = grid[x][y];
            collided = collided || (cellToCheck === undefined || cellToCheck !== "");
        }
    });
    return collided;
};

export const checkHorizontalCollision = (gamePiece: GamePieceType, grid: GridType, move: number) => {
    const collisionableBlocks = getCollisionableBlocks(gamePiece, grid, move, 0);

    let collided = false;
    // check: gamePiece.piece.blocks[gamePiece.variation] and remove collisionableBlocks
    collisionableBlocks.forEach((block) => {
        const x = gamePiece.x + block.x + move;
        if (x >= 0 && x < GRID_WIDTH) {
            const cellToCheck = grid[x][gamePiece.y + block.y];
            collided = collided || (cellToCheck === undefined || cellToCheck !== "");
        } else {
            collided = true;
        }
    });
    return collided;
};

export const checkOverlapping = (gamePiece: GamePieceType, grid: GridType) => {
    return gamePiece.piece.blocks[gamePiece.variation].reduce((output: boolean, block: BlockType) => {
        const x = gamePiece.x + block.x;
        const y = gamePiece.y + block.y;
        return output || (x >= 0 && x < GRID_WIDTH ? grid[x][y] !== "" : true);
    }, false);
};

export const calculateScore = (completedLines: number, lines: number, level: number) => {
    let updatedLevel = level;
    const score = BASE_SCORE[completedLines] * (level);
    // https://tetris.fandom.com/wiki/Tetris_(NES,_Nintendo)
    const linesToNextLevel = Math.min(level * 10 + 10, Math.max(100, (level + 1) * 10 - 50));
    if (lines + completedLines > linesToNextLevel) {
        updatedLevel = updatedLevel + 1;
    }

    return { updatedLevel, score };
};

export const getFixedPositionHorizontalPosition = (gamePiece: GamePieceType, grid: GridType) => {
    const variation = (gamePiece.variation + 1) % gamePiece.piece.blocks.length;
    let gamePieceWithVariation = {
        ...gamePiece,
        variation,
    };

    const maxX = GRID_WIDTH - getPieceWidth(gamePieceWithVariation);
    const x = Math.min(Math.max(gamePieceWithVariation.x, getMinXPiece(gamePieceWithVariation)), maxX);

    gamePieceWithVariation = {
        ...gamePieceWithVariation,
        x,
    };

    // collided at left
    if (checkOverlapping(gamePieceWithVariation, grid)) {
        gamePieceWithVariation = {
            ...gamePieceWithVariation,
            x: Math.min(gamePieceWithVariation.x + 1, GRID_WIDTH - getPieceWidth(gamePieceWithVariation) - 1),
        };
    }

    // collided at right
    if (checkOverlapping(gamePieceWithVariation, grid)) {
        gamePieceWithVariation = {
            ...gamePieceWithVariation,
            x: Math.max(gamePieceWithVariation.x - 1, getMinXPiece(gamePieceWithVariation)),
        };
        if (checkOverlapping(gamePieceWithVariation, grid)) {
            gamePieceWithVariation = {
                ...gamePieceWithVariation,
                x: Math.max(gamePieceWithVariation.x - 1, getMinXPiece(gamePieceWithVariation)),
            };
            if (checkOverlapping(gamePieceWithVariation, grid)) {
                gamePieceWithVariation = {
                    ...gamePieceWithVariation,
                    x: Math.max(gamePieceWithVariation.x - 1, getMinXPiece(gamePieceWithVariation)),
                };
            }
        }
    }

    if (checkOverlapping(gamePieceWithVariation, grid)) {
        // still collided
        return undefined;
    }

    return gamePieceWithVariation.x;
};
