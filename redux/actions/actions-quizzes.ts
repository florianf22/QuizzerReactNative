import { Category } from '../../models/Category';
import { Quiz } from '../../models/Quiz';
import { ActionTypeQuizzes } from '../action-types';

interface ActionQuizzesInit {
  type: ActionTypeQuizzes.INIT;
}

interface ActionQuizzesSuccess {
  type: ActionTypeQuizzes.SUCCESS;
  payload: Quiz[];
}

interface ActionQuizzesError {
  type: ActionTypeQuizzes.ERROR;
  payload: string;
}

interface ActionQuizzesCategories {
  type: ActionTypeQuizzes.FETCH_CATEGORIES;
  payload: Category[];
}

export type ActionQuizzes =
  | ActionQuizzesInit
  | ActionQuizzesSuccess
  | ActionQuizzesError
  | ActionQuizzesCategories;
