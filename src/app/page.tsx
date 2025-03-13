"use client";

import Cheering from "@/components/Cheering";
import SimpleMathTrainTable from "@/components/SimpleMathTrainTable";
import { useAppContext } from "@/context/AppContext";
import { useConfig } from "@/context/ConfigContext";
import { useEffect, useState } from "react";
import cx from "classnames";

export default function Home() {
  const { background, correctTimes } = useAppContext();
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

  const isComplete = correctTimes >= config.count_finished;
  return (
    <div className="page-main transition-colors	duration-500	ease-in-out grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {isComplete ? (
        <div
          className="flex justify-center"
          style={{
            backgroundImage: `url("/bg_success.jpg")`,
            width: "100%",
            height: "100%",
            position: "absolute",
          }}
        >
          <p
            className="text-7xl bold  text-center mt-8"
            style={{ color: "#5c2e2e", marginTop: "11rem", lineHeight: "1.2" }}
          >
            Chúc mừng bạn <br /> đã hoàn thành bài tập
          </p>
        </div>
      ) : (
        <>
          <div
            className="page-main__bg"
            style={{
              backgroundImage: `url(${background})`,
              width: "100%",
              height: "100%",
            }}
          ></div>
          <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            <SimpleMathTrainTable />
            <p className={cx(["mt-7 text-5xl"])}>
              Con đã đúng {correctTimes} lần
            </p>
          </main>
          {showCherring && <Cheering />}
        </>
      )}
    </div>
  );
}
