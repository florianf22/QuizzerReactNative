import { ActionTypeQuizzes } from '../action-types';
import { ActionQuizzes } from '../actions';
import { Quiz } from '../../models/Quiz';
import { Options } from '../../models/Options';

interface StateType {
  loading: boolean;
  error: string | null;
  quizzes: Quiz[];
  options: Options;
  userOptions: {
    amount: number;
    difficulty: string;
    category: string;
    type: string;
  };
}

const initialState: StateType = {
  loading: false,
  error: null,
  quizzes: [],
  options: {
    categories: [],
    difficulties: [],
    quantities: [],
    types: [],
  },
  userOptions: {
    amount: 5,
    difficulty: 'Easy',
    category: '9',
    type: 'multiple',
  },
};

const reducer = (
  state: StateType = initialState,
  action: ActionQuizzes
): StateType => {
  switch (action.type) {
    case ActionTypeQuizzes.INIT: {
      return { ...state, loading: true, error: null, quizzes: [] };
    }
    case ActionTypeQuizzes.SUCCESS: {
      return { ...state, loading: false, error: null, quizzes: action.payload };
    }
    case ActionTypeQuizzes.ERROR: {
      return { ...state, loading: false, error: action.payload, quizzes: [] };
    }
    case ActionTypeQuizzes.FETCH_CATEGORIES: {
      return {
        ...state,
        options: { ...state.options, categories: action.payload },
      };
    }
    case ActionTypeQuizzes.UPDATE_USER_OPTIONS: {
      return { ...state, userOptions: action.payload };
    }
    case ActionTypeQuizzes.RESET_USER_OPTIONS: {
      return {
        ...state,
        userOptions: {
          amount: 5,
          difficulty: 'Easy',
          category: '9',
          type: 'multiple',
        },
      };
    }
    case ActionTypeQuizzes.POPULATE_OPTIONS: {
      return {
        ...state,
        options: action.payload,
      };
    }
    default:
      return state;
  }
};

export default reducer;
