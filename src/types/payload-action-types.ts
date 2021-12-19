import { PieceType } from "./piece-type";
import { GamePieceType } from "./game-piece-type";
import { GridType } from "./grid-type";

export type PiecePayloadActionType = {
    piece?: PieceType;
}
export type GamePiecePayloadActionType = {
    gamePiece?: GamePieceType;
}
export type GridPayloadActionType = {
    grid: GridType;
}