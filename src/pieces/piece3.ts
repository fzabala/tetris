import { PieceType } from "types";

export const Piece3: PieceType = {
    color: "#E34625",
    borderColor: "#933615",
    blocks: [
        /**
         *      __
         *     |  |__
         *     |__   |
         *        |__|
         */
        [{
            x: 1,
            y: 1,
        }, {
            x: 1,
            y: 2,
        }, {
            x: 2,
            y: 2,
        }, {
            x: 2,
            y: 3,
        }],
        /**
         *         _____
         *      __|   __|
         *     |_____|
         *
         */
        [{
            x: 2,
            y: 1,
        }, {
            x: 3,
            y: 1,
        }, {
            x: 1,
            y: 2,
        }, {
            x: 2,
            y: 2,
        }]
    ],
};