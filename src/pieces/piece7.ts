import { PieceType } from "types";

export const Piece7: PieceType = {
    color: "#E34625",
    borderColor: "#933615",
    blocks: [
        /**
         *      _____
         *     |     |
         *     |_____|
         */
        [{
            x: 1,
            y: 1,
        }, {
            x: 1,
            y: 2,
        }, {
            x: 2,
            y: 1,
        }, {
            x: 2,
            y: 2,
        }]
    ],
};