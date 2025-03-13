"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import confetti from "canvas-confetti";
import { useConfig } from "./ConfigContext";
import { MathProblem, useGenerateMath } from "@/hooks/useGenerateMath";

interface AppState {
  correctTimes: number;
  incorrectTimes: number;
  mathProblem?: MathProblem;
}
interface AppContextProps extends AppState {
  handleSuccess: () => void;
  handleClearState: () => void;
  bgColor: string;
  background: string;
}

const colors = [
  "#ff3b30",
  "#ff9500",
  "#ffcc00",
  "#34c759",
  "#007aff",
  "#af52de",
]; // High contrast colors

const backgroundImgs = [
  "/bg_1.jpg",
  "/bg_2.jpg",
  "/bg_3.jpg",
  "/bg_4.jpg",
  "/bg_5.jpg",
  "/bg_6.jpg",
];

const AppContext = createContext<AppContextProps | undefined>(undefined);
const PERSISTENT_STATE_KEY = "kid_math_state";
const defaultState: AppState = {
  correctTimes: 0,
  incorrectTimes: 0,
};
const pineapple = confetti.shapeFromText({ text: "🍍", scalar: 2 });
const crown = confetti.shapeFromText({ text: "👑", scalar: 2 });
const bomb = confetti.shapeFromText({ text: "💣", scalar: 2 });

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { config } = useConfig();
  const { generateProblem } = useGenerateMath();
  const [appState, setAppState] = useState<AppState>(() => {
    if (!config.persist_progress)
      return { ...defaultState, mathProblem: generateProblem() };
    const persistState = localStorage.getItem(PERSISTENT_STATE_KEY);
    const lastState = JSON.parse(`${persistState}`);
    return persistState
      ? {
          ...lastState,
          mathProblem: lastState?.mathProblem || generateProblem(),
        }
      : { ...defaultState, mathProblem: generateProblem() };
  });

  useEffect(() => {
    if (!config.persist_progress) return;
    localStorage.setItem(PERSISTENT_STATE_KEY, JSON.stringify(appState));
  }, [appState]);

  useEffect(() => {
    setAppState((prev) => ({
      ...prev,
      mathProblem: generateProblem(),
    }));
  }, [config.multiplication_numbers, config.train_type, config.is_junior]);

  const startCelebration = () => {
    confetti({
      particleCount: 200,
      spread: 100,
      scalar: 3,
      ticks: 500,
      gravity: 1.5,
      startVelocity: 90,
      origin: { y: 0.6 }, // Adjust where confetti starts
      shapes: [pineapple, crown, bomb],
    });
  };

  const handleSuccess = () => {
    setAppState((prev) => ({
      ...prev,
      correctTimes: prev.correctTimes + 1,
      mathProblem: generateProblem(),
    }));
    if (config.enable_celebrity) {
      startCelebration();
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...appState,
        handleSuccess,
        background: backgroundImgs[2],
        bgColor: colors[0],
        handleClearState: () => {
          setAppState((prev) => ({ ...prev, ...defaultState }));
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
};
