import { ActionTypeQuizzes } from '../action-types';
import { ActionQuizzes } from '../actions';
import { Quiz } from '../../models/Quiz';
import { Category } from '../../models/Category';

interface StateType {
  loading: boolean;
  error: string | null;
  quizzes: Quiz[];
  categories: Category[];
  // statics
  types: {
    name: string;
    id: string;
  }[];
  difficulties: {
    name: string;
    id: string;
  }[];
  quantities: {
    name: string;
    id: string;
  }[];
}

const initialState: StateType = {
  loading: false,
  error: null,
  quizzes: [],
  categories: [],
  types: [
    { name: 'ოთხი პასუხი', id: 'multiple' },
    { name: 'თრუ/ფოლსი', id: 'boolean' },
  ],
  difficulties: [
    { name: 'მარტივი', id: 'Easy' },
    { name: 'საშუალო', id: 'Medium' },
    { name: 'ძნელი', id: 'Hard' },
  ],
  quantities: [
    { name: 'ხუთი', id: '5' },
    { name: 'ათი', id: '10' },
    { name: 'ოცი', id: '20' },
  ],
};

const reducer = (state: StateType = initialState, action: ActionQuizzes) => {
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
      return { ...state, categories: action.payload };
    }
    default:
      return state;
  }
};

export default reducer;
