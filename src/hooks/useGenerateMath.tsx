import { useConfig } from "@/context/ConfigContext";
import { OPERATION, TRAIN_TYPES } from "@/utils/const";
import LimitedSet from "@/utils/LimitedSet";

const MAX_REMEMBER_CALCULATIONS = 6;
export interface MathProblem {
  num1: number;
  num2: number;
  operation: OPERATION;
  correctAnswer: number;
}

/**
 * Custom hook for generating a math operation and handling input
 */
export const useGenerateMath = () => {
  const { config } = useConfig();
  const historyProblem = new LimitedSet(MAX_REMEMBER_CALCULATIONS);
  // Junior only show add + subtract
  const allowedOperations: OPERATION[] = !config.is_junior
    ? config.train_type.reduce(function (acc: OPERATION[], type) {
        if (type === TRAIN_TYPES.MULTIPLY) {
          acc.push(OPERATION.MULTIPLY);
        } else if (type === TRAIN_TYPES.DIVIDE) {
          acc.push(OPERATION.DIVIDE);
        } else if (type === TRAIN_TYPES.HUNDRED_OPERATION) {
          acc.push(OPERATION.ADD);
          acc.push(OPERATION.SUBTRACT);
        }
        return acc;
      }, [])
    : [OPERATION.ADD, OPERATION.SUBTRACT];

  const generateInputNumbers = (operation: OPERATION): number[] => {
    let num1, num2;
    const { is_junior, multiplication_numbers } = config;
    let randomSimpleResult = is_junior
      ? Math.floor(Math.random() * 10) + 1
      : Math.floor(Math.random() * 999) + 1;
    const maxNumberSimpleOp = is_junior ? 10 : 900;
    const randomNum1 = Math.floor(Math.random() * maxNumberSimpleOp) + 1;
    const tmpSimpleResult = randomSimpleResult;
    // ensure that there's no zero result
    if (randomNum1 == randomSimpleResult) {
      return generateInputNumbers(operation);
    }
    switch (operation) {
      case OPERATION.ADD:
        randomSimpleResult = Math.max(randomNum1, randomSimpleResult);
        num1 = Math.min(randomNum1, tmpSimpleResult);
        num2 = randomSimpleResult - num1;
        break;
      case OPERATION.SUBTRACT:
        randomSimpleResult = Math.min(randomNum1, randomSimpleResult);
        num1 = Math.max(randomNum1, tmpSimpleResult);
        num2 = num1 - randomSimpleResult;
        break;
      case OPERATION.MULTIPLY:
        Math.random();
        num1 = Number(
          multiplication_numbers[
            Math.floor(Math.random() * multiplication_numbers.length)
          ]
        );
        num2 = Math.max(Math.floor(Math.random() * 10) + 1, 2);
        break;
      case OPERATION.DIVIDE:
        num1 = Math.max(Math.floor(Math.random() * 10) + 1, 2);
        num2 = Number(
          multiplication_numbers[
            Math.floor(Math.random() * multiplication_numbers.length)
          ]
        );
        break;
      default:
        return [];
    }
    return [num1, num2];
  };

  // Generate a new math problem
  const generateProblem = () => {
    const operation =
      allowedOperations[Math.floor(Math.random() * allowedOperations.length)];
    let [num1, num2] = generateInputNumbers(operation);
    let correctAnswer = 0;

    if (operation === OPERATION.SUBTRACT) {
      if (num1 < num2) [num1, num2] = [num2, num1]; // Ensure positive result
      correctAnswer = num1 - num2;
    } else if (operation === OPERATION.DIVIDE) {
      num1 = num2 * (Math.floor(Math.random() * 5) + 1); // Ensure whole number result
      correctAnswer = num1 / num2;
    } else if (operation === OPERATION.MULTIPLY) {
      correctAnswer = num1 * num2;
    } else {
      correctAnswer = num1 + num2;
    }
    const tmpProblem = { num1, num2, operation, correctAnswer };
    if (
      historyProblem.has(tmpProblem) &&
      historyProblem.size() < MAX_REMEMBER_CALCULATIONS
    ) {
      return generateProblem();
    } else {
      historyProblem.add(tmpProblem);
      return tmpProblem;
    }
  };

  return {
    generateProblem,
  };
};

export default useGenerateMath;
