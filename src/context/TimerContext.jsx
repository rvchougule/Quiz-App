import { createContext, useState, useEffect, useRef } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

// Create the context
export const TimerContext = createContext();

// Timer provider component
// eslint-disable-next-line react/prop-types
export const TimerProvider = ({ children }) => {
  const [quizes, setQuizes] = useState([]);
  const [time, setTime] = useState();
  const [timerID, setTimerID] = useState(null);
  const [count, setCount] = useState(0);
  const [, setQuizData, , setCorrectGuesses] = useOutletContext();
  const difficulty = useRef();
  const navigate = useNavigate();
  const [volume, setVolume] = useState(true);
  const correctAudio = new Audio("/correct-83487.mp3");
  const wrongAudio = new Audio("/cartoon-failure-piano.wav");

  useEffect(() => {
    setCorrectGuesses([]);
  }, []);

  useEffect(() => {
    if (quizes.length > 0) {
      difficulty.current = quizes[count].difficulty;
      if (difficulty.current === "easy") {
        setTime(10);
      } else if (difficulty.current === "medium") {
        setTime(20);
      } else if (difficulty.current === "hard") {
        setTime(30);
      }
    }
  }, [count, quizes]);

  useEffect(() => {
    if (time === 0) {
      clearInterval(timerID);

      setCorrectGuesses((prevState) => {
        const newCorrectGuesses = [
          ...prevState,
          { quiz: quizes[count], answer: "time out", correct: false },
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

      if (count !== quizes.length - 1) {
        setCount(count + 1);
      }
    }
  }, [time, timerID]);

  useEffect(() => {
    const id = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 1) {
          clearInterval(id);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    setTimerID(id);

    return () => clearInterval(id);
  }, [count]);

  // useEffect(() => {
  //   if (time <= 15 && time >= 5) {
  //     document.body.style.backgroundColor = "#D4D69F";
  //   } else if (time <= 5) {
  //     document.body.style.backgroundColor = "#DBADAD";
  //   } else {
  //     document.body.style.backgroundColor = "#f5f5f5";
  //   }
  // }, [time]);

  return (
    <TimerContext.Provider
      value={{
        quizes,
        setQuizes,
        count,
        setCount,
        time,
        timerID,
        volume,
        setVolume,
        correctAudio,
        wrongAudio,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};
