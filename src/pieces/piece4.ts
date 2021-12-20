import { PieceType } from "types";

export const Piece4: PieceType = {
    color: "#E34625",
    borderColor: "#933615",
    blocks: [
        /**
         *      __
         *     |  |
         *     |  |__
         *     |_____|
         */
        [{
            x: 1,
            y: 1,
        }, {
            x: 1,
            y: 2,
        }, {
            x: 1,
            y: 3,
        }, {
            x: 2,
            y: 3,
        }],
        /**
         *
         *   _________
         *  |   ______|
         *  |__|
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
            x: 0,
            y: 3,
        }],
        /**
         *      ______
         *     |__   |
         *        |  |
         *        |__|
         */
        [{
            x: 0,
            y: 1,
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
         *             ___
         *      ______|  |
         *     |_________|
         */
        [{
            x: 2,
            y: 1,
        }, {
            x: 0,
            y: 2,
        }, {
            x: 1,
            y: 2,
        }, {
            x: 2,
            y: 2,
        }],
    ],
};