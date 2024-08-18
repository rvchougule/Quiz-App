import { Outlet } from "react-router-dom";
import "./App.css";
import useLocalStorage from "./hooks/useLocalStorage";
import { useState } from "react";

function App() {
  const [quizData, setQuizData] = useLocalStorage("quizes", []);
  const [correctGuesses, setCorrectGuesses] = useState([]);
  // useEffect(() => {
  //   // Check if the page was reloaded/refreshed
  //   if (performance.navigation.type === 1) {
  //     console.log("Page was reloaded or refreshed");
  //     // Do your operation here
  //   }
  // }, []);
  return (
    <>
      <main>
        <Outlet
          context={[quizData, setQuizData, correctGuesses, setCorrectGuesses]}
        />
      </main>
      <footer>
        <span className="made-with">Made with ❤️ by Rohan Chougule</span>
      </footer>
    </>
  );
}

export default App;
