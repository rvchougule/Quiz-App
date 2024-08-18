/* eslint-disable react/prop-types */
import { useState } from "react";
import "./QuizOverviewCss.css";

const QuizOverView = ({ quizzes }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`quiz-results-container ${expanded ? "expanded" : ""}`}>
      <div className="quiz-item">
        <div className="quiz-header">
          <h2>{`Question 1: ${quizzes[0].quiz.question}`}</h2>
          <p className={`difficulty ${quizzes[0].quiz.difficulty}`}>
            {quizzes[0].quiz.difficulty} Difficulty
          </p>
        </div>
        <div className="quiz-body">
          <div className="options">
            <p>Options:</p>
            <ul>
              {quizzes[0].quiz.incorrect_answers.map((option, i) => (
                <li key={i}>{option}</li>
              ))}
              <li>{quizzes[0].quiz.correct_answer}</li>
            </ul>
          </div>
          <div className="answer-section">
            <p>
              Your Answer: <span>{quizzes[0].answer}</span>
            </p>
            <p>
              Correct Answer: <span>{quizzes[0].quiz.correct_answer}</span>
            </p>
            <p
              className={`result ${
                quizzes[0].correct ? "correct" : "incorrect"
              }`}
            >
              {quizzes[0].correct ? "Correct!" : "Incorrect!"}
            </p>
          </div>
        </div>
      </div>

      {expanded &&
        quizzes.slice(1).map((quiz, index) => (
          <div key={index + 1} className="quiz-item">
            <div className="quiz-header">
              <h2>{`Question ${index + 2}: ${quiz.quiz.question}`}</h2>
              <p className={`difficulty ${quiz.quiz.difficulty}`}>
                {quiz.quiz.difficulty} Difficulty
              </p>
            </div>
            <div className="quiz-body">
              <div className="options">
                <p>Options:</p>
                <ul>
                  {quiz.quiz.incorrect_answers.map((option, i) => (
                    <li key={i}>{option}</li>
                  ))}
                  <li>{quiz.quiz.correct_answer}</li>
                </ul>
              </div>
              <div className="answer-section">
                <p>
                  Your Answer: <span>{quiz.answer}</span>
                </p>
                <p>
                  Correct Answer: <span>{quiz.quiz.correct_answer}</span>
                </p>
                <p
                  className={`result ${quiz.correct ? "correct" : "incorrect"}`}
                >
                  {quiz.correct ? "Correct!" : "Incorrect!"}
                </p>
              </div>
            </div>
          </div>
        ))}

      <button className="toggle-button" onClick={toggleExpand}>
        {expanded ? "▲ Show Less" : "▼ Show More"}
      </button>
    </div>
  );
};

export default QuizOverView;
