import { useEffect, useRef } from "react";
import logo from "../assets/images/logo.svg";
import Options from "./Options";
import ShowTimer from "./ShowTimer";
import NextButton from "./NextButton";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { useTimer } from "../hooks/useTimer";

export default function QuizContainer() {
  const { quizes, setQuizes, count, timerID, volume, setVolume } = useTimer();
  const { state } = useLocation();
  const [, setQuizData, correctGuesses, setCorrectGuesses] = useOutletContext();
  const navigate = useNavigate();
  useEffect(() => {
    setQuizes(state);
  }, [setQuizes, state]);

  const currentQuestion = quizes[count];
  const optionsArray = useRef();

  useEffect(() => {
    if (quizes.length > 0) {
      optionsArray.current = [
        ...currentQuestion.incorrect_answers,
        currentQuestion.correct_answer,
      ];

      // Suffle array of optionsArray
      for (var i = optionsArray.current.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = optionsArray.current[i];
        optionsArray.current[i] = optionsArray.current[j];
        optionsArray.current[j] = temp;
      }
    }
  }, [
    count,
    currentQuestion?.correct_answer,
    currentQuestion?.incorrect_answers,
    quizes.length,
  ]);

  const handleVolume = () => {
    setVolume(!volume);
  };

  const handleExit = () => {
    if (count !== quizes.length - 1) {
      quizes.forEach((quiz, i) => {
        if (i >= count) {
          setCorrectGuesses((prevState) => {
            const newCorrectGuesses = [
              ...prevState,
              { quiz: quiz, answer: "haven't Choosen", correct: false },
            ];
            if (i === quizes.length - 1) {
              setQuizData(newCorrectGuesses);
              clearInterval(timerID);
              setTimeout(() => {
                navigate("/quiz-result/:quizresult");
              }, 2000);
            }

            return newCorrectGuesses;
          });
        }
      });
    } else {
      setQuizData(correctGuesses);
      clearInterval(timerID);
      setTimeout(() => {
        navigate("/quiz-result/:quizresult");
      }, 2000);
    }
  };

  return !quizes.length ? (
    "Loading..."
  ) : (
    <div className="quiz-container">
      <section>
        <div className="head">
          <img src={logo} alt="" className="head-logo" />
          <div>
            <span
              className={
                volume
                  ? "material-symbols-outlined "
                  : "material-symbols-outlined "
              }
              onClick={handleVolume}
            >
              {volume ? "volume_up" : "volume_off"}
            </span>

            <span
              className="material-symbols-outlined logout"
              onClick={handleExit}
            >
              logout
            </span>
          </div>
        </div>
      </section>
      <section>
        <div className="quiz-num-container">
          <h1 className="quiz-num">{`${count + 1} / ${quizes.length}`}</h1>
        </div>
      </section>
      <section>
        <p className="quiz-question">{currentQuestion.question}</p>
      </section>
      <ShowTimer difficulty={currentQuestion.difficulty} />
      <Options
        options={optionsArray.current}
        correctAnswer={currentQuestion.correct_answer}
      />
      <NextButton />
    </div>
  );
}
