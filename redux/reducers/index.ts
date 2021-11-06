import { combineReducers } from 'redux';
import authReducer from './authReducer';
import reducerQuizzes from './quizzesReducer';
import reducerQuestions from './questionsReducer';
import reducerTimeouts from './timeoutsReducer';

const reducers = combineReducers({
  auth: authReducer,
  quizzes: reducerQuizzes,
  questions: reducerQuestions,
  timeouts: reducerTimeouts,
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;
