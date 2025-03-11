"use client";
import { Input } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import useGenerateMath, { MathProblem } from "@/hooks/useGenerateMath";

const trainningNumbers = [2, 3, 4, 5];
const SimpleMathTrainTable = () => {
  const { generateProblem } = useGenerateMath();
  const [mathProblem, setMathProblem] = useState<MathProblem>();
  const { handleSuccess } = useAppContext();
  const [inputTxt, setInputTxt] = useState<string>("");

  // Randomly select a trainning number from the provided array on component mount
  useEffect(() => {
    setMathProblem(generateProblem());
  }, []);

  // const handleCelebrate = () => {
  //   confetti({ particleCount: 150, spread: 60 });
  // };

  const handleSubmit = () => {
    if (mathProblem?.correctAnswer === parseInt(inputTxt)) {
      // Correct answer
      setInputTxt("");
      setMathProblem(generateProblem());
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
        <div style={{ width: "100%" }} className="flex items-center">
          <h1 className="text-5xl font-bold text-center">
            <span style={{}} className="text-8xl  inline-block">
              {mathProblem?.num1}
            </span>
            <span style={{}} className="text-7xl px-4 inline-block ">
              {mathProblem?.operation}
            </span>
            <span style={{}} className="text-8xl inline-block">
              {mathProblem?.num2}
            </span>
            <span
              style={{ width: 100 }}
              className="px-2 text-8xl inline-flex items-center"
            >
              =
            </span>
          </h1>

          <div style={{ width: 200 }}>
            <Input
              type="number"
              className={"text-8xl "}
              value={inputTxt}
              onChange={(e) => {
                setInputTxt(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SimpleMathTrainTable;
