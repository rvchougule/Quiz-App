import { useContext } from "react";
import { TimerContext } from "../context/TimerContext";

export const useTimer = () => useContext(TimerContext);
