import { ActionTypeQuestions } from '../action-types';

export const increaseCorrectQuestionQuantity = () => {
  return {
    type: ActionTypeQuestions.CORRECT,
  };
};

export const resetCorrectQuestionQuantity = () => {
  return {
    type: ActionTypeQuestions.RESET,
  };
};
