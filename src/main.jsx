import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";
import QuizContainer from "./components/QuizContainer.jsx";
import { TimerProvider } from "./context/TimerContext.jsx";
import QuizResult from "./components/QuizResult.jsx";
import QuizCategory from "./components/QuizCategory.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/quiz-result/:quizresult",
        element: <QuizResult />,
      },
      {
        path: "/quiz-category",
        element: <QuizCategory />,
      },
      {
        path: "/quizes/:quiz",
        element: (
          <TimerProvider>
            <QuizContainer />
          </TimerProvider>
        ),
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
