import { Category } from '../../models/Category';
import { Options } from '../../models/Options';
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

interface ActionTypeUpdateUserOptions {
  type: ActionTypeQuizzes.UPDATE_USER_OPTIONS;
  payload: {
    amount: number;
    difficulty: string;
    category: string;
    type: string;
  };
}

interface ActionTypeResetUserOptions {
  type: ActionTypeQuizzes.RESET_USER_OPTIONS;
}

interface ActionTypesPopulateOptions {
  type: ActionTypeQuizzes.POPULATE_OPTIONS;
  payload: Options;
}

export type ActionQuizzes =
  | ActionQuizzesInit
  | ActionQuizzesSuccess
  | ActionQuizzesError
  | ActionQuizzesCategories
  | ActionTypeUpdateUserOptions
  | ActionTypeResetUserOptions
  | ActionTypesPopulateOptions;
