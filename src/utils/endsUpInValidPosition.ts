import type { MoveDirection } from "../types";
import { calculateFinalPosition } from "./calculateFinalPosition";
import { minTileIndex, maxTileIndex } from "../constants";
import { rows } from "../metadata";

export function endsUpInValidPosition(
    currentPostion: { rowIndex: number; tileIndex: number },
    moves: MoveDirection[]
) {
    // where the player ends up after the move
    const finalPosition = calculateFinalPosition(currentPostion, moves);

    // edge of the map
    if (
        finalPosition.rowIndex === -1 ||
        finalPosition.tileIndex === minTileIndex - 1 ||
        finalPosition.tileIndex === maxTileIndex + 1
    ) {
        // invalid move
        return false;
    }

    // hit a tree
    const finalRow = rows[finalPosition.rowIndex - 1];
    if (
        finalRow &&
        finalRow.type === "forest" &&
        finalRow.trees.some((tree) => tree.tileIndex === finalPosition.tileIndex)
    ) {
        // invalid move
        return false;
    }
    
    return true;
}