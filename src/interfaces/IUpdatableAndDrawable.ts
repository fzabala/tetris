import { IDrawable } from "./IDrawable";

export interface IUpdatableAndDrawable extends IDrawable {
    update: (context: CanvasRenderingContext2D, ...rest: any) => void;
}