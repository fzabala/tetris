import { PieceType } from "types";

export const Piece6: PieceType = {
    color: "#E34625",
    borderColor: "#933615",
    blocks: [
        /**
         *         __
         *        |  |
         *        |  |
         *        |  |
         *        |__|
         */
        [{
            x: 1,
            y: 0,
        }, {
            x: 1,
            y: 1,
        }, {
            x: 1,
            y: 2,
        }, {
            x: 1,
            y: 3,
        }],
        /**
         *
         *
         *      ___________
         *     |___________|
         *
         */
        [{
            x: 0,
            y: 2,
        }, {
            x: 1,
            y: 2,
        }, {
            x: 2,
            y: 2,
        }, {
            x: 3,
            y: 2,
        }]
    ],
};