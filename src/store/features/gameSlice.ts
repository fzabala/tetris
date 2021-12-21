import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import {
    GamePiecePayloadActionType,
    GamePieceType,
    GridPayloadActionType, GridType, PausedGamePayloadActionType,
    PiecePayloadActionType,
    PieceType, ScoreGamePayloadActionType,
} from "types";
import { FILLED_CELL, GRID_HEIGHT, GRID_WIDTH } from "const";
import { calculateScore, checkOverlapping, getRandomPiece } from "helpers";

interface GameState {
    gameOver: boolean,
    gameStarted: boolean,
    gamePaused: boolean,
    score: number,
    lines: number,
    grid: GridType,
    nextPiece?: PieceType,
    newPiece?: GamePieceType,
    level: number,
}

const initialState: GameState = {
    gameOver: false,
    gameStarted: false,
    gamePaused: false,
    score: 0,
    lines: 0,
    grid: (new Array(GRID_WIDTH)).fill([]).map(() => (new Array(GRID_HEIGHT)).fill("")),
    level: 0,
};

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        setNextPiece: (state: GameState, action: PayloadAction<PiecePayloadActionType>) => {
            state.nextPiece = action.payload.piece;
        },
        setNewPiece: (state: GameState, action: PayloadAction<GamePiecePayloadActionType>) => {
            state.newPiece = action.payload.gamePiece;
        },
        setGrid: (state: GameState, action: PayloadAction<GridPayloadActionType>) => {
            state.grid = action.payload.grid;
        },
        setStartedGame: (state: GameState) => {
            state.grid = (new Array(GRID_WIDTH)).fill([]).map(() => (new Array(GRID_HEIGHT)).fill(""));
            state.nextPiece = undefined;
            state.newPiece = undefined;
            state.gameStarted = true;
            state.gamePaused = false;
            state.gameOver = false;
        },
        setPausedGame: (state: GameState, action: PayloadAction<PausedGamePayloadActionType>) => {
            state.gamePaused = !action.payload.gamePaused;
        },
        setGameOver: (state: GameState) => {
            state.gameStarted = false;
            state.gamePaused = false;
            state.gameOver = true;
        },
        setScore: (state: GameState, action: PayloadAction<ScoreGamePayloadActionType>) => {
            state.score = state.score + action.payload.score;
            state.level = action.payload.updatedLevel;
            state.lines = state.lines + action.payload.lines;
        },
    }
});

const { setNextPiece, setNewPiece, setGrid, setStartedGame, setPausedGame, setGameOver, setScore } = gameSlice.actions;

export const fetchNewPiece = (nextPiece: PieceType) => (dispatch: Dispatch): void => {
    const piece = { ...getRandomPiece() };
    const gamePiece = {
        x: 3,
        y: 0,
        piece: nextPiece,
        variation: 0,
    };
    dispatch(setNewPiece({ gamePiece }));
    dispatch(setNextPiece({ piece }));
};

export const updateNewPiece = (gamePiece: GamePieceType) => (dispatch: Dispatch): void => {
    dispatch(setNewPiece({ gamePiece }));
};

export const startGame = () => (dispatch: Dispatch): void => {
    dispatch(setStartedGame());
    const piece = { ...getRandomPiece() };
    dispatch(setNextPiece({ piece }));
};

export const pauseResumeGame = (gamePaused: boolean) => (dispatch: Dispatch): void => {
    dispatch(setPausedGame({ gamePaused }));
};

export const setCollidedPiece = (grid: GridType, newPiece: GamePieceType, nextPiece: PieceType, lines: number, level: number) => (dispatch: Dispatch): void => {
    let updatedGrid: GridType = [...grid];
    newPiece.piece.blocks[newPiece.variation].forEach((block) => {
        const x = newPiece.x + block.x;
        const y = newPiece.y + block.y;
        const xRow = [...updatedGrid[x]];
        xRow[y] = FILLED_CELL;
        updatedGrid[x] = [...xRow];
    });
    const completedLines: Record<string, any> = {};
    updatedGrid.forEach((column) => {
        column.forEach((cell, cIndex) => {
            if (typeof completedLines[cIndex] === "undefined") {
                completedLines[cIndex] = true;
            }
            completedLines[cIndex] = completedLines[cIndex] && cell !== "";
        });
    });

    const linesToRemove = Object.entries(completedLines).map((e) => e[1] ? parseInt(e[0]) : null).filter(e => e !== null);

    updatedGrid.forEach((column, colIndex) => {
        column.forEach((cell, cellIndex) => {
            if (linesToRemove.indexOf(cellIndex) !== -1) {
                for (let i = cellIndex; i> 0; i--){
                    const xRow = [...updatedGrid[colIndex]];
                    xRow[i] = xRow[i - 1];
                    updatedGrid[colIndex] = [...xRow];
                }
            }
        });
    });
    dispatch(setGrid({ grid: updatedGrid }));

    const { score, updatedLevel } = calculateScore(linesToRemove.length, lines, level);
    dispatch(setScore({ score, updatedLevel, lines: linesToRemove.length }));

    const gamePiece = {
        x: 3,
        y: 0,
        piece: nextPiece,
        variation: 0,
    };
    if (checkOverlapping(gamePiece, grid)) {
        console.log("game over");
        dispatch(setGameOver());
    } else {
        dispatch(setNewPiece({ gamePiece }));

        const piece = { ...getRandomPiece() };
        dispatch(setNextPiece({ piece }));
    }
};

export default gameSlice.reducer;