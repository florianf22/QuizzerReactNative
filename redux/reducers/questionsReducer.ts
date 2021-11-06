import { ActionTypeQuestions } from '../action-types';
import { ActionQuestions } from '../actions';

interface QuestionsState {
  correctQuestionsQuantity: number;
}

const initialState: QuestionsState = { correctQuestionsQuantity: 0 };

const reducer = (
  state: QuestionsState = initialState,
  action: ActionQuestions
): QuestionsState => {
  switch (action.type) {
    case ActionTypeQuestions.CORRECT:
      return {
        correctQuestionsQuantity: state.correctQuestionsQuantity + 1,
      };
    case ActionTypeQuestions.RESET: {
      return { correctQuestionsQuantity: 0 };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
