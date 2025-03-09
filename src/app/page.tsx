"use client";

import Cheering from "@/components/Cheering";
import MultiplicationTable from "@/components/MultiplicationTable";
import { useAppContext } from "@/context/AppContext";
import { useConfig } from "@/context/ConfigContext";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const { bgColor, correctTimes } = useAppContext();
  const { config } = useConfig();

  const [showCherring, setShowCherring] = useState(false);
  useEffect(() => {
    if (!config.up_level_period) return;
    if (correctTimes && correctTimes % config.up_level_period === 0) {
      setShowCherring(true);
      setTimeout(() => {
        setShowCherring(false);
      }, 4000);
    }
  }, [correctTimes]);

  return (
    <div
      style={{ backgroundColor: bgColor || "#ffffff" }}
      className="transition-colors	duration-500	ease-in-out grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
    >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <MultiplicationTable />
      </main>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {showCherring && <Cheering />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
