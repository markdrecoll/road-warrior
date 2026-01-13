import { tileSize, minTileIndex, maxTileIndex, tilesPerRow, visualMinTileIndex, visualMaxTileIndex } from "../constants";

type Props = {
    rowIndex: number;
    children?: React.ReactNode;
}

export const Grass = ({ rowIndex, children }: Props) => {
    // Calculate dimensions for extended areas
    const leftExtensionWidth = Math.abs(minTileIndex - visualMinTileIndex) * tileSize;
    const rightExtensionWidth = Math.abs(maxTileIndex - visualMaxTileIndex) * tileSize;
    
    // Position the extensions to be adjacent to (not overlapping with) the playable area
    const leftExtensionX = (minTileIndex * tileSize) - (leftExtensionWidth / 2);
    const rightExtensionX = (maxTileIndex * tileSize) + (rightExtensionWidth / 2);

    return (
        <group position-y={rowIndex * tileSize}>
            {/* Extended visual area grass (darker green) - render first at lower z */}
            {/* Left side */}
            <mesh position-x={leftExtensionX} position-z={-0.1} receiveShadow>
                <boxGeometry args={[leftExtensionWidth, tileSize, 3]} />
                <meshLambertMaterial color={0x8db83a} flatShading />
            </mesh>
            
            {/* Right side */}
            <mesh position-x={rightExtensionX} position-z={-0.1} receiveShadow>
                <boxGeometry args={[rightExtensionWidth, tileSize, 3]} />
                <meshLambertMaterial color={0x8db83a} flatShading />
            </mesh>
            
            {/* Main playable area grass (lighter green) - render on top */}
            <mesh position-z={0} receiveShadow>
                <boxGeometry args={[tilesPerRow * tileSize, tileSize, 3]} />
                <meshLambertMaterial color={0xbaf455} flatShading />
            </mesh>
            
            {children}
        </group>
    )
}