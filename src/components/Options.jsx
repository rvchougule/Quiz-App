/* eslint-disable react/prop-types */
import { useNavigate, useOutletContext } from "react-router-dom";
import correctImg from "../assets/images/correct.svg";
import wrongImg from "../assets/images/wrong.svg";
import { useTimer } from "../hooks/useTimer";

export default function Options({ options, correctAnswer }) {
  const { quizes, count, setCount, timerID, volume, correctAudio, wrongAudio } =
    useTimer();
  const [, setQuizData, , setCorrectGuesses] = useOutletContext();
  const navigate = useNavigate();

  const handleAnswer = (e) => {
    const optionFields = document.querySelectorAll(".option");
    const answerContainer = document.querySelector(".answer-container");
    const optionTarget = e.currentTarget;

    try {
      const targetText = optionTarget.querySelector("h3").textContent;
      if (targetText === correctAnswer) {
        if (volume === true) {
          correctAudio.play();
        }
        optionTarget.classList.add("correct-anwser");

        setCorrectGuesses((prevState) => {
          const newCorrectGuesses = [
            ...prevState,
            { quiz: quizes[count], answer: targetText, correct: true },
          ];

          if (count === quizes.length - 1) {
            setQuizData(newCorrectGuesses);
            clearInterval(timerID);
            setTimeout(() => {
              navigate("/quiz-result/:quizresult");
            }, 2000);
          }

          return newCorrectGuesses;
        });
        setTimeout(() => {
          if (count !== quizes.length - 1) {
            optionTarget.classList.remove("correct-anwser");

            setCount(count + 1);
          }
        }, 2000);
      } else {
        if (volume === true) {
          wrongAudio.play();
        }
        optionTarget.classList.add("you-choose");

        optionFields.forEach((option) => {
          let choice = option.querySelector("h3").textContent;
          if (choice == correctAnswer) {
            document
              .querySelector(`#${option.id}`)
              .classList.add("correct-anwser");
          }
        });
        answerContainer.style.pointerEvents = "none";
        setCorrectGuesses((prevState) => {
          return [
            ...prevState,
            { quiz: quizes[count], answer: targetText, correct: false },
          ];
        });
      }
      clearInterval(timerID);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <section>
      <div className="answer-container">
        {options?.map((option, index) => (
          <div
            className="option"
            id={`option${index}`}
            key={index}
            onClick={handleAnswer}
          >
            <h3>{option}</h3>
            <span className="right">
              <h4>You Choose</h4>
              <img src={wrongImg} className="wrong-logo" alt="wrong-logo" />
              <img
                src={correctImg}
                className="correct-logo"
                alt="correct-logo"
              />
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
