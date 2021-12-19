import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import {
    GamePiecePayloadActionType,
    GamePieceType,
    GridPayloadActionType, GridType,
    PiecePayloadActionType,
    PieceType,
} from "types";
import { FILLED_CELL, GRID_HEIGHT, GRID_WIDTH } from "const";
import { getRandomPiece } from "../../helpers";

interface GameState {
    score: number,
    lines: number,
    grid: GridType,
    nextPiece?: PieceType,
    newPiece?: GamePieceType,
}

const initialState: GameState = {
    score: 0,
    lines: 0,
    grid: (new Array(GRID_WIDTH)).fill([]).map(() => (new Array(GRID_HEIGHT)).fill("")),
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
    }
});

const { setNextPiece, setNewPiece, setGrid } = gameSlice.actions;

export const fetchNewPiece = (nextPiece: PieceType) => (dispatch: Dispatch): void => {
    const piece = { ...getRandomPiece() };
    const gamePiece = {
        x: 3,
        y: 0,
        piece: nextPiece,
    };
    dispatch(setNewPiece({ gamePiece }));
    dispatch(setNextPiece({ piece }));
};

export const fetchNextPiece = () => (dispatch: Dispatch): void => {
    const piece = { ...getRandomPiece() };
    dispatch(setNextPiece({ piece }));
};

export const updateNewPiece = (gamePiece: GamePieceType) => (dispatch: Dispatch): void => {
    dispatch(setNewPiece({ gamePiece }));
};

export const setCollidedPiece = (grid: GridType, newPiece: GamePieceType, nextPiece: PieceType) => (dispatch: Dispatch): void => {
    let updatedGrid: GridType = [...grid];
    newPiece.piece.blocks.forEach((block) => {
        const x = newPiece.x + block.x;
        const y = newPiece.y + block.y;
        const xRow = [...updatedGrid[x]];
        xRow[y] = FILLED_CELL;
        updatedGrid[x] = [...xRow];
    });
    const gamePiece = {
        x: 3,
        y: 0,
        piece: nextPiece,
    };
    const piece = { ...getRandomPiece() };
    dispatch(setGrid({ grid: updatedGrid }));
    dispatch(setNewPiece({ gamePiece }));
    dispatch(setNextPiece({ piece }));
};

export default gameSlice.reducer;