import { ActionTypeQuestions } from '../action-types';

interface ActionQuestionsCorrect {
  type: ActionTypeQuestions.CORRECT;
}

interface ActionQuestionsReset {
  type: ActionTypeQuestions.RESET;
}

interface ActionQuestionAddAnswer {
  type: ActionTypeQuestions.ADD_ANSWER;
  payload: string;
}

export type ActionQuestions =
  | ActionQuestionsCorrect
  | ActionQuestionsReset
  | ActionQuestionAddAnswer;
