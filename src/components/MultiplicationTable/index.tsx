"use client";
import { useModal } from "@/context/ModalContext";
import { Input } from "@headlessui/react";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import cx from "classnames";
import { useAppContext } from "@/context/AppContext";

const trainningNumbers = [2, 3, 4, 5, 6];
const MultiplicationTable = () => {
  const { openModal } = useModal();
  const { handleSuccess, correctTimes } = useAppContext();
  const [trainningNumber, setTrainningNumber] = useState<number>();
  const [multipliNumber, setMultiplicationNumber] = useState<number>();
  const [inputTxt, setInputTxt] = useState<string>("");

  // Randomly select a trainning number from the provided array on component mount
  useEffect(() => {
    generateInputNumbers();
  }, []);

  // const handleCelebrate = () => {
  //   confetti({ particleCount: 150, spread: 60 });
  // };

  const generateInputNumbers = () => {
    setTrainningNumber(
      trainningNumbers[Math.floor(Math.random() * trainningNumbers.length)]
    );
    setMultiplicationNumber(Math.floor(Math.random() * (9 - 2 + 1)) + 2);
  };

  const handleSubmit = () => {
    if (!trainningNumber || !multipliNumber) return;
    if (trainningNumber * multipliNumber === parseInt(inputTxt)) {
      // Correct answer
      setInputTxt("");
      generateInputNumbers();
      handleSuccess();
    }
    return;
  };

  useEffect(() => {
    handleSubmit();
  }, [inputTxt]);

  return (
    <div>
      <div className="form-group" onSubmit={handleSubmit}>
        <h2 className="mb-7 text-5xl">Tính nhân</h2>
        <div className="flex items-center">
          <h1 className="text-5xl font-bold text-center">
            <span style={{ width: 120 }} className="text-8xl inline-block">
              {trainningNumber}
            </span>
            <span style={{ width: 120 }} className="text-7xl inline-block ">
              X
            </span>
            <span style={{ width: 120 }} className="text-8xl inline-block">
              {multipliNumber}
            </span>
            <span
              style={{ width: 120 }}
              className="px-2 text-8xl inline-flex items-center"
            >
              =
            </span>
          </h1>

          <Input
            type="number"
            className={"text-8xl "}
            value={inputTxt}
            onChange={(e) => {
              setInputTxt(e.target.value);
            }}
          />
        </div>
        <p className={cx(["mt-7 text-5xl"])}>Con đã đúng {correctTimes} lần</p>
      </div>
    </div>
  );
};
export default MultiplicationTable;
