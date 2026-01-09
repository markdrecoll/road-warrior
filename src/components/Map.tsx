import { rows } from "../metadata"
import { Grass } from "./Grass"
import { Row } from "./Row"

export const Map = () => {
    return (
        <>
            <Grass rowIndex={0} />
            <Grass rowIndex={-1} />
            <Grass rowIndex={-2} />
            <Grass rowIndex={-3} />
            <Grass rowIndex={-4} />
            <Grass rowIndex={-5} />

            {rows.map((rowData, index) => (
                <Row key={index} rowIndex={index + 1} rowData={rowData} />
            ))}
        </>
    )
}