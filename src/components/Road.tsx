import { tilesPerRow, tileSize } from "../constants";

type Props = {
    rowIndex: number;
    children?: React.ReactNode;
}

export const Road = ({ rowIndex, children }: Props) => {
    return (
        <group position-y={rowIndex * tileSize}>
            <mesh receiveShadow>
                <boxGeometry args={[tilesPerRow * tileSize, tileSize]} />
                <meshLambertMaterial color={0x45a59} flatShading />
            </mesh>
            {children}
        </group>
    )
}