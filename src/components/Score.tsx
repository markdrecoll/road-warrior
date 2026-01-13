import { useState, useEffect } from "react";
import useStore from "../stores/game";
import { useAuth } from "@/provider/authProvider";
import "../styles/Score.css";


export function Score() {
    const score = useStore((state) => state.score);
    const status = useStore((state) => state.status);
    const { userDetails } = useAuth();
    const [highScore, setHighScore] = useState<number | null>(null);

    useEffect(() => {
        // Fetch high score if user is logged in
        // Refetch when game resets (status changes to playing after gameover)
        if (userDetails.username) {
            fetchHighScore();
        }
    }, [userDetails.username, status]);

    const fetchHighScore = async () => {
        try {
            const response = await fetch("/api/scoring/all-scores", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userName: userDetails.username })
            });
            const data = await response.json();
            if (data.status === "Success") {
                setHighScore(data.scores.roadWarrior || 0);
            }
        } catch (error) {
            console.error("Failed to fetch high score:", error);
        }
    };

    return (
        <div id="score">
            <div>Your Score: {score}</div>
            {userDetails.username && highScore !== null && (
                <div>High Score: {highScore}</div>
            )}
        </div>
    );
}