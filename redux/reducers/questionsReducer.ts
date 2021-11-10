import { ActionTypeQuestions } from '../action-types';
import { ActionQuestions } from '../actions';

interface QuestionsState {
  correctQuestionsQuantity: number;
  userAnswers: string[];
}

const initialState: QuestionsState = {
  correctQuestionsQuantity: 0,
  userAnswers: [],
};

const reducer = (
  state: QuestionsState = initialState,
  action: ActionQuestions
): QuestionsState => {
  switch (action.type) {
    case ActionTypeQuestions.CORRECT:
      return {
        ...state,
        correctQuestionsQuantity: state.correctQuestionsQuantity + 1,
      };
    case ActionTypeQuestions.RESET: {
      return { ...state, correctQuestionsQuantity: 0 };
    }
    case ActionTypeQuestions.ADD_ANSWER: {
      return { ...state, userAnswers: [...state.userAnswers, action.payload] };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
