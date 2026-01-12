import useStore from "../stores/game";
import "../styles/Result.css";

export function Result() {
    const status = useStore((state) => state.status);
    const score = useStore((state) => state.score);
    const reset = useStore((state) => state.reset);

    if (status === "playing") return null;

    return (
        <div id="result-container">
            <div id="result">
                <h1>Game Over</h1>
                <p>Your Score: {score}</p>
                <button onClick={reset}>Restart Game</button>
            </div>
        </div>
    )
}