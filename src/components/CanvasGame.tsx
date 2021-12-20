import React, { useCallback, useEffect, useRef, useState } from "react";
import { Board, Grid, Next, Piece } from "elements";
import { ARROW_LEFT, ARROW_RIGHT, GRID_WIDTH, SPEED_DOWN, ALLOW_X_MOVES_TIMEOUT } from "const";
import { checkHorizontalCollision, checkVerticalCollision, getMinXPiece, getPieceWidth } from "helpers";
import { fetchNewPiece, fetchNextPiece, setCollidedPiece, updateNewPiece, useAppDispatch, useAppSelector } from "store";
import { GamePieceType } from "types";

const CANVAS_HEIGHT = 700;
const CANVAS_WIDTH = 600;

const CanvasGame = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const loopRef = useRef<number | null>(null);
    const moveYTimeout = useRef<any>(null);
    const [context, setContext] = useState<CanvasRenderingContext2D>();
    const [keyState, setKeyState] = useState<string | undefined>(undefined);
    const { newPiece, nextPiece, grid } = useAppSelector((store) => store.game);
    const [allowXMoves, setAllowXMoves] = useState(true);
    const [allowYMoves, setAllowYMoves] = useState(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        // just for initial setup
        dispatch(fetchNextPiece());
        document.addEventListener("keydown", (event) => {
            setKeyState(event.code);
        });
        document.addEventListener("keyup", () => {
            setKeyState(undefined);
            setAllowXMoves(true);
        });
        return () => {
            document.removeEventListener("keydown", (event) => setKeyState(event.code));
            document.removeEventListener("keyup", () => setKeyState(undefined));
        };
    }, []);

    useEffect(() => {
        if (nextPiece && !newPiece) {
            dispatch(fetchNewPiece(nextPiece));
        }
    }, [nextPiece]);

    useEffect(() => {
        if (!allowXMoves) {
            setTimeout(() => setAllowXMoves(true), ALLOW_X_MOVES_TIMEOUT);
        }
    }, [allowXMoves]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (canvas && ctx) {
            setContext(ctx);
        }
    }, [setContext]);

    useEffect(() => {
        if (!moveYTimeout.current && newPiece){
            moveYTimeout.current = setTimeout(() => {
                setAllowYMoves(true);
                moveYTimeout.current = null;
            }, SPEED_DOWN);
        }
    }, [newPiece]);

    const update = useCallback(() => {
        if (context && newPiece) {
            let updatedNewPiece: GamePieceType = { ...newPiece };
            if (allowXMoves) {
                let x = 0;
                switch (keyState) {
                case ARROW_LEFT:
                    if (!checkHorizontalCollision(updatedNewPiece, grid, -1)){
                        x = Math.max(updatedNewPiece.x - 1, getMinXPiece(updatedNewPiece.piece));
                        updatedNewPiece = {
                            ...updatedNewPiece,
                            x,
                        };
                    }
                    setAllowXMoves(false);
                    break;
                case ARROW_RIGHT:
                    if (!checkHorizontalCollision(updatedNewPiece, grid, 1)){
                        x = Math.min(updatedNewPiece.x + 1, GRID_WIDTH - getPieceWidth(updatedNewPiece.piece) - 1);
                        updatedNewPiece = {
                            ...updatedNewPiece,
                            x,
                        };
                    }
                    setAllowXMoves(false);
                    break;
                }
            }
            dispatch(updateNewPiece(updatedNewPiece));

            if (allowYMoves) {
                if (checkVerticalCollision(newPiece, grid) && nextPiece) {
                    dispatch(setCollidedPiece(grid, newPiece, nextPiece));
                } else {
                    setAllowYMoves(false);
                    updatedNewPiece = {
                        ...updatedNewPiece,
                        y: updatedNewPiece.y + 1,
                    };
                    dispatch(updateNewPiece(updatedNewPiece));
                }
            }
        }
    }, [context, allowXMoves, newPiece, keyState, nextPiece, dispatch]);

    const draw = useCallback(() => {
        if (context) {
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);

            // background
            context.fillStyle = "#FF0000";
            context.fillRect(0, 0, context.canvas.width, context.canvas.height);

            Grid.draw(context);
            Next.draw(context);
            if (newPiece) {
                Board.draw(context, newPiece, grid);
            }
            if (nextPiece) {
                Piece.draw(context, nextPiece);
            }
        }
    }, [context, nextPiece, newPiece]);

    const tick = useCallback(() => {
        loopRef.current = requestAnimationFrame(tick);
        update();
        draw();
    }, [update, draw]);

    useEffect(() => {
        loopRef.current = requestAnimationFrame(tick);
        return () => {
            loopRef.current && cancelAnimationFrame(loopRef.current);
        };
    }, [loopRef, tick]);

    return <>
        <p>x:  {newPiece?.x}</p>
        <p>y:  {newPiece?.y}</p>
        <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}/>
    </>;
};

export default CanvasGame;