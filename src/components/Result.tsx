import { useEffect, useState } from "react";
import useStore from "../stores/game";
import { useAuth } from "@/provider/authProvider";
import "../styles/Result.css";


export function Result() {
    const status = useStore((state) => state.status);
    const score = useStore((state) => state.score);
    const reset = useStore((state) => state.reset);
    const { userDetails } = useAuth();
    const [highScore, setHighScore] = useState(0);
    const [isNewRecord, setIsNewRecord] = useState(false);

    useEffect(() => {
        if (status === "gameover" && userDetails.username) {
            saveScore();
        }
    }, [status, userDetails.username]);

    const saveScore = async () => {
        try {
            const response = await fetch("/api/scoring/roadwarrior", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    userName: userDetails.username,
                    score: score 
                })
            });
            const data = await response.json();
            if (data.status === "Success") {
                setHighScore(data.highScore);
                setIsNewRecord(data.isNewRecord);
            }
        } catch (error) {
            console.error("Failed to save score:", error);
        }
    };

    if (status === "playing") return null;

    return (
        <div id="result-container">
            <div id="result">
                <h1>Game Over</h1>
                <p>Your Score: {score}</p>
                {userDetails.username && (
                    <>
                        {isNewRecord && <p style={{ color: "#5ac85a", fontWeight: "bold" }}>New High Score!</p>}
                        <p>Your High Score: {highScore}</p>
                    </>
                )}
                {!userDetails.username && (
                    <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>Login to save your high score</p>
                )}
                <button onClick={reset}>Restart Game</button>
            </div>
        </div>
    )
}