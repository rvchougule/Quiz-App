/* eslint-disable react/prop-types */
import { useNavigate, useOutletContext } from "react-router-dom";
import { useTimer } from "../hooks/useTimer";

export default function NextButton() {
  const { quizes, count, setCount, timerID } = useTimer();
  const navigate = useNavigate();
  const [, setQuizData, correctGuesses, setCorrectGuesses] = useOutletContext();

  const handler = () => {
    const optionFields = document.querySelectorAll(".option");
    const answerContainer = document.querySelector(".answer-container");
    const classResult = [...optionFields].some((choice) => {
      return choice.classList.contains("you-choose");
    });

    if (classResult == false && quizes.length >= count) {
      setCorrectGuesses((prevState) => {
        return [
          ...prevState,
          { quiz: quizes[count], answer: "Haven't Choosen", correct: false },
        ];
      });
    }

    answerContainer.style.pointerEvents = "all";
    optionFields.forEach((choice) => {
      choice.classList.remove("you-choose");
      choice.classList.remove("correct-anwser");
    });

    if (count !== quizes.length - 1) {
      setCount(count + 1);
    } else {
      clearInterval(timerID);
      setQuizData(correctGuesses);
      navigate("/quiz-result/:quizresult");
    }
  };

  return (
    <span className="next" onClick={handler}>
      Next &gt;
    </span>
  );
}
