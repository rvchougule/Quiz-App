import { Link, useOutletContext } from "react-router-dom";
import logo from "../assets/images/logo.svg";
export default function LandingPage() {
  const [quizData] = useOutletContext();
  const correctGuesses = quizData.reduce((acc, quiz) => {
    if (quiz.correct === true) {
      acc = acc + 1;
    }
    return acc;
  }, 0);
  return (
    <div className="container">
      <img src={logo} alt="logo" className="logo" />
      <Link className="start" to="/quiz-category">
        Start &gt; &gt; &gt;
      </Link>
      <span className="highest-score">
        Highest Score {correctGuesses}/{quizData.length}
      </span>
    </div>
  );
}
