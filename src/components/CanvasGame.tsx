import React, { useCallback, useEffect, useRef, useState } from "react";
import { Board, Button, Grid, Next, Piece } from "elements";
import {
    ALLOW_ROTATION_MOVES_TIMEOUT,
    ALLOW_SPEED_MOVES_TIMEOUT,
    ALLOW_X_MOVES_TIMEOUT,
    ARROW_DOWN,
    ARROW_LEFT,
    ARROW_RIGHT,
    GRID_WIDTH, PAUSE_RESUME_GAME_H, PAUSE_GAME_TEXT, PAUSE_RESUME_GAME_W, PAUSE_RESUME_GAME_X, PAUSE_RESUME_GAME_Y,
    SPACE,
    SPEED_DOWN,
    START_GAME_H,
    START_GAME_TEXT,
    START_GAME_W,
    START_GAME_X,
    START_GAME_Y, RESUME_GAME_TEXT
} from "const";
import {
    checkHorizontalCollision,
    checkVerticalCollision,
    getFixedPositionHorizontalPosition,
    getMinXPiece,
    getPieceWidth
} from "helpers";
import {
    fetchNewPiece,
    pauseResumeGame,
    setCollidedPiece,
    startGame,
    updateNewPiece,
    useAppDispatch,
    useAppSelector,
} from "store";
import { GamePieceType } from "types";

const CANVAS_HEIGHT = 700;
const CANVAS_WIDTH = 600;

const CanvasGame = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const loopRef = useRef<number | null>(null);
    const moveYTimeout = useRef<any>(null);
    const [context, setContext] = useState<CanvasRenderingContext2D>();
    const [keyState, setKeyState] = useState<string | undefined>(undefined);
    const { newPiece, nextPiece, grid, gameStarted, gamePaused, gameOver, lines, level } = useAppSelector((store) => store.game);
    const [allowRotationMoves, setAllowRotationMoves] = useState(true);
    const [allowXMoves, setAllowXMoves] = useState(true);
    const [allowYMoves, setAllowYMoves] = useState(false);
    const [allowSpeedMoves, setAllowSpeedMoves] = useState(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        // just for initial setup
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

    const handleClick = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        const xCanvas = event.clientX - (event.target as HTMLCanvasElement).offsetLeft;
        const yCanvas = event.clientY - (event.target as HTMLCanvasElement).offsetTop;
        // start button
        if (
            (xCanvas > START_GAME_X && xCanvas < (START_GAME_X + START_GAME_W)) &&
            (yCanvas > START_GAME_Y && yCanvas < (START_GAME_Y + START_GAME_H))
        ) {
            if (!gameStarted) {
                dispatch(startGame());
            } else {
                dispatch(pauseResumeGame(gamePaused));
            }
        }
    };

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
        if (!allowRotationMoves) {
            setTimeout(() => setAllowRotationMoves(true), ALLOW_ROTATION_MOVES_TIMEOUT);
        }
    }, [allowRotationMoves]);

    useEffect(() => {
        if (!allowSpeedMoves) {
            setTimeout(() => setAllowSpeedMoves(true), ALLOW_SPEED_MOVES_TIMEOUT);
        }
    }, [allowSpeedMoves]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (canvas && ctx) {
            setContext(ctx);
        }
    }, [setContext]);

    useEffect(() => {
        if (!moveYTimeout.current && newPiece) {
            moveYTimeout.current = setTimeout(() => {
                setAllowYMoves(true);
                moveYTimeout.current = null;
            }, SPEED_DOWN);
        }
    }, [newPiece]);

    const update = useCallback(() => {
        if (context && newPiece && !gamePaused && !gameOver) {
            let updatedNewPiece: GamePieceType = { ...newPiece };
            let variation: number;
            let x = 0;
            switch (keyState) {
            case ARROW_LEFT:
                if (allowXMoves) {
                    if (!checkHorizontalCollision(updatedNewPiece, grid, -1)) {
                        x = Math.max(updatedNewPiece.x - 1, getMinXPiece(updatedNewPiece));
                        updatedNewPiece = {
                            ...updatedNewPiece,
                            x,
                        };
                    }
                    setAllowXMoves(false);
                }
                break;
            case ARROW_RIGHT:
                if (allowXMoves) {
                    if (!checkHorizontalCollision(updatedNewPiece, grid, 1)) {
                        x = Math.min(updatedNewPiece.x + 1, GRID_WIDTH - getPieceWidth(updatedNewPiece));
                        updatedNewPiece = {
                            ...updatedNewPiece,
                            x,
                        };
                    }
                    setAllowXMoves(false);
                }
                break;
            case ARROW_DOWN:
                setAllowYMoves(true);
                break;
            case SPACE:
                if (allowRotationMoves) {
                    const x = getFixedPositionHorizontalPosition(updatedNewPiece, grid);
                    if (x !== undefined) {
                        variation = (updatedNewPiece.variation + 1) % updatedNewPiece.piece.blocks.length;
                        updatedNewPiece = {
                            ...updatedNewPiece,
                            variation,
                            x,
                        };
                    }
                    setAllowRotationMoves(false);
                }
                break;
            }

            dispatch(updateNewPiece(updatedNewPiece));

            if (allowYMoves) {
                if (checkVerticalCollision(newPiece, grid) && nextPiece) {
                    dispatch(setCollidedPiece(grid, newPiece, nextPiece, lines, level));
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
    }, [context, allowXMoves, newPiece, keyState, nextPiece, dispatch, gamePaused]);

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
            if (!gameStarted) {
                Button.draw(context, START_GAME_X, START_GAME_Y, START_GAME_W, START_GAME_H, START_GAME_TEXT);
            } else {
                Button.draw(context, PAUSE_RESUME_GAME_X, PAUSE_RESUME_GAME_Y, PAUSE_RESUME_GAME_W, PAUSE_RESUME_GAME_H, gamePaused ? RESUME_GAME_TEXT : PAUSE_GAME_TEXT);
            }
        }
    }, [context, nextPiece, newPiece, gamePaused]);

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
        <p>x: {JSON.stringify(gameOver)}</p>
        <canvas
            onClick={handleClick}
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}/>
    </>;
};

export default CanvasGame;