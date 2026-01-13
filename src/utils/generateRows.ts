import * as THREE from "three";
import { minTileIndex, maxTileIndex } from "../constants";
import { type Row, type RowType } from "../types";

export function generateRows(amount: number, startingRowIndex: number = 0): Row[] {
    const rows: Row[] = [];
    const pattern: RowType[] = ["car", "truck", "forest"];
    
    for (let i = 0; i < amount; i++) {
        const actualRowIndex = startingRowIndex + i;
        const typeIndex = actualRowIndex % pattern.length;
        const type = pattern[typeIndex];
        const rowData = generateRow(type, actualRowIndex);
        rows.push(rowData);
    }
    return rows;

    function generateRow(type: RowType, rowIndex: number): Row {
        if (type === "car") return generateCarLaneMetaData(rowIndex);
        if (type === "truck") return generateTruckLaneMetaData(rowIndex);
        return generateForestMetaData();
    }

    function randomElement<T>(array: T[]): T {
        return array[Math.floor(Math.random() * array.length)];
    }

    function generateForestMetaData(): Row {
        const occupiedTiles = new Set<number>();
        const trees = Array.from({ length: 4 }, () => {
            let tileIndex;
            do {
                tileIndex = THREE.MathUtils.randInt(minTileIndex, maxTileIndex);
            } while (occupiedTiles.has(tileIndex));
            occupiedTiles.add(tileIndex);
            const height = randomElement([20, 45, 60]);
            return { tileIndex, height };
        });

        return { type: "forest", trees };
    }

    function generateCarLaneMetaData(rowIndex: number): Row {
        const direction = randomElement([true, false]);
        // Progressive speed: starts at 50, increases by 10 every row, caps at 250
        const baseSpeed = 50;
        const speedIncrease = Math.floor(rowIndex / 2) * 10; // Increase every 2nd row
        const speed = Math.min(baseSpeed + speedIncrease, 250);

        const occupiedTiles = new Set<number>();
        const vehicles = Array.from({ length: 5 }, () => {
            let initialTileIndex;
            do {
                initialTileIndex = THREE.MathUtils.randInt(minTileIndex, maxTileIndex);
            } while (occupiedTiles.has(initialTileIndex));

            // make the vehicle's tiles occupied
            occupiedTiles.add(initialTileIndex - 1);
            occupiedTiles.add(initialTileIndex);
            occupiedTiles.add(initialTileIndex + 1);

            const color: THREE.ColorRepresentation = randomElement([
                0xff0000,
                0x00ff00,
                0x0000ff,
                0xffff00,
                0xff00ff,
                0x00ffff
            ]);

            return { initialTileIndex, color };
        });

        return { type: "car", direction, speed, vehicles };
    }

    function generateTruckLaneMetaData(rowIndex: number): Row {
        const direction = randomElement([true, false]);
        // Progressive speed for trucks: starts at 40, increases by 8 every row, caps at 200
        const baseSpeed = 40;
        const speedIncrease = Math.floor(rowIndex / 2) * 8; // Increase every 2nd row
        const speed = Math.min(baseSpeed + speedIncrease, 200);

        const occupiedTiles = new Set<number>();

        const vehicles = Array.from({ length: 3 }, () => {
            let initialTileIndex;
            do {
                initialTileIndex = THREE.MathUtils.randInt(minTileIndex, maxTileIndex);
            } while (occupiedTiles.has(initialTileIndex));

            // make the vehicle's tiles occupied
            occupiedTiles.add(initialTileIndex - 2);
            occupiedTiles.add(initialTileIndex - 1);
            occupiedTiles.add(initialTileIndex);
            occupiedTiles.add(initialTileIndex + 1);
            occupiedTiles.add(initialTileIndex + 2);

            const color: THREE.ColorRepresentation = randomElement([
                0xff0000,
                0x00ff00,
                0x0000ff,
                0xffff00,
                0xff00ff,
                0x00ffff
            ]);

            return { initialTileIndex, color };
        });

        return { type: "truck", direction, speed, vehicles };
    }
}