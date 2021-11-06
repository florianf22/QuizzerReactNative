import { ActionTypeQuestions } from '../action-types';

interface ActionQuestionsCorrect {
  type: ActionTypeQuestions.CORRECT;
}

interface ActionQuestionsReset {
  type: ActionTypeQuestions.RESET;
}

export type ActionQuestions = ActionQuestionsCorrect | ActionQuestionsReset;
