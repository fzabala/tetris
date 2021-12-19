export interface IDrawable {
    draw: (context: CanvasRenderingContext2D, ...rest: any) => void;
}