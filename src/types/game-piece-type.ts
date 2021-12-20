import { PieceType } from "./piece-type";

export type GamePieceType = {
    x: number,
    y: number,
    piece: PieceType,
    variation: number,
};
