"use client";

import { TRAIN_TYPES } from "@/utils/const";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

interface AppConfig {
  enable_celebrity: boolean;
  persist_progress: boolean;
  up_level_period: number;
  count_finished: number;
  is_junior: boolean;
  multiplication_numbers: string[];
  train_type: TRAIN_TYPES[];
}

interface ConfigContextProps {
  config: AppConfig;
  updateConfig: (newConfig: Partial<AppConfig>) => void;
  clearConfig: () => void;
}

const defaultConfig: AppConfig = {
  enable_celebrity: true,
  persist_progress: false,
  train_type: [TRAIN_TYPES.MULTIPLY],
  is_junior: false,
  count_finished: 30,
  multiplication_numbers: ["2", "3", "4", "5", "6", "7", "8", "9"],
  up_level_period: 3,
};

const ConfigContext = createContext<ConfigContextProps | undefined>(undefined);

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfig] = useState<AppConfig>(() => {
    if (typeof window !== "undefined") {
      const storedConfig = localStorage.getItem("app_config");
      return storedConfig ? JSON.parse(storedConfig) : defaultConfig;
    }
    return defaultConfig;
  });

  useEffect(() => {
    localStorage.setItem("app_config", JSON.stringify(config));
  }, [config]);

  const updateConfig = (newConfig: Partial<AppConfig>) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
  };

  const clearConfig = () => {
    setConfig(defaultConfig);
  };

  return (
    <ConfigContext.Provider value={{ config, updateConfig, clearConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return context;
};
