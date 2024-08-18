/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useTimer } from "../hooks/useTimer";

export default function ShowTimer({ difficulty }) {
  const { time } = useTimer();

  useEffect(() => {
    const difficultyTitle = document.querySelector(".difficulty-title");
    if (difficulty === "easy") {
      difficultyTitle.style.backgroundColor = "#1dd94c";
    } else if (difficulty === "medium") {
      difficultyTitle.style.backgroundColor = "yellow";
    } else if (difficulty === "hard") {
      difficultyTitle.style.backgroundColor = "red";
    }
  }, [difficulty]);
  return (
    <section>
      <div className="show-timer">
        <span className="difficulty-title">{difficulty}</span>
        <span className="quiz-timer">00:{time}</span>
      </div>
    </section>
  );
}
