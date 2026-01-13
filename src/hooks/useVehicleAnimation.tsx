import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { tileSize, minTileIndex, maxTileIndex } from "../constants";

export default function useVehicleAnimation(
    ref: React.RefObject<THREE.Group | null>,
    direction: boolean,
    speed: number
) {
    useFrame((_, delta) => {
        if (!ref.current) return;
        const vehicle = ref.current;

        // Extend slightly beyond playable area so vehicles don't disappear abruptly,
        // but not too far so they can loop back quickly
        const beginningOfRow = (minTileIndex - 8) * tileSize; // 8 tiles beyond playable area
        const endOfRow = (maxTileIndex + 8) * tileSize; // 8 tiles beyond playable area

        if (direction) {
            vehicle.position.x =
                vehicle.position.x > endOfRow
                    ? beginningOfRow
                    : vehicle.position.x + speed * delta;
        } else {
            vehicle.position.x =
                vehicle.position.x < beginningOfRow
                    ? endOfRow
                    : vehicle.position.x - speed * delta;
        }
    })
}