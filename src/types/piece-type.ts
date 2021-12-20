export type PieceType = {
    color: string,
    borderColor: string,
    blocks: BlockType[][],
};

export type BlockType = {
    x: number,
    y: number,
};
