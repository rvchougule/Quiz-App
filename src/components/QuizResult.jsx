import { Link, useOutletContext } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import { useEffect } from "react";
import QuizOverView from "./QuizOverview";

export default function QuizResult() {
  const [quizData] = useOutletContext();
  let goodScoreTitle = "";
  const correctGuesses = quizData.reduce((acc, quiz) => {
    if (quiz.correct === true) {
      acc = acc + 1;
    }
    return acc;
  }, 0);

  let quizPercent = (correctGuesses / quizData.length) * 100;
  const correctQuizPercent = `${Math.ceil(
    (correctGuesses / quizData.length) * 100
  )}%`;
  const wrongQuizPercent = `${Math.floor(
    100 - (correctGuesses / quizData.length) * 100
  )}%`;

  useEffect(() => {
    const innerDiv = document.querySelector(".inner");
    innerDiv.style.width = `${quizPercent}%`;
  });

  if (quizPercent == 100) {
    goodScoreTitle = '"Congratulations! 🎉🎊 Keep going."';
  } else if (quizPercent >= 75) {
    goodScoreTitle = "“Keep learning, you have a good score!”";
  } else {
    goodScoreTitle = "“Keep learning, try again!”";
  }

  return (
    <>
      <div className="result">
        <img src={logo} alt="logo" className="logo" />
        <h3 className="title">Result</h3>
        <section className="bar-chart">
          <div className="outer">
            <div className="inner"></div>
          </div>
          <div className="left-line"></div>
          <div className="left-dot"></div>
          <h5 className="score">
            {correctGuesses}/{quizData.length}
          </h5>
          <div className="right-line"></div>
          <div className="right-dot"></div>
          <h5 className="correct">{correctQuizPercent}</h5>
          <h5 className="wrong">{wrongQuizPercent}</h5>
        </section>
        <div className="good-score">
          <h3>{goodScoreTitle}</h3>
          <Link to="/" className="retry">
            Retry
          </Link>
        </div>
      </div>
      <QuizOverView quizzes={quizData} />
    </>
  );
}
