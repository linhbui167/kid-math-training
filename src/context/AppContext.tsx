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

interface AppState {
  correctTimes: number;
  incorrectTimes: number;
}
interface AppContextProps extends AppState {
  handleSuccess: () => void;
  handleClearState: () => void;
  bgColor: string;
}

const colors = [
  "#ff3b30",
  "#ff9500",
  "#ffcc00",
  "#34c759",
  "#007aff",
  "#af52de",
]; // High contrast colors

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
  const [appState, setAppState] = useState<AppState>(() => {
    if (!config.persist_progress) return defaultState;
    const persistState = localStorage.getItem(PERSISTENT_STATE_KEY);
    return persistState ? JSON.parse(persistState) : defaultState;
  });

  useEffect(() => {
    if (!config.persist_progress) return;
    localStorage.setItem(PERSISTENT_STATE_KEY, JSON.stringify(appState));
  }, [appState]);

  const startCelebration = () => {
    confetti({
      particleCount: 500,
      spread: 100,
      scalar: 3,
      ticks: 500,
      gravity: 1.5,
      startVelocity: 90,
      origin: { y: 0.6 }, // Adjust where confetti starts
      shapes: [pineapple, crown, bomb],
    });

    // Move to the next color in the list, looping back to start if at the end
    // setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
  };

  const handleSuccess = () => {
    setAppState((prev) => ({ ...prev, correctTimes: prev.correctTimes + 1 }));
    if (config.enable_celebrity) {
      startCelebration();
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...appState,
        handleSuccess,
        bgColor: colors[0],
        handleClearState: () => {
          setAppState(defaultState);
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
