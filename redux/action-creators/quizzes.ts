import { Dispatch } from 'react';
//
import { ActionTypeQuizzes } from '../action-types';
import { ActionQuizzes } from '../actions';
import { triviaBaseInstance, triviaCategoryInstance } from '../../api/trivia';
import { Category } from '../../models/Category';
import { Options } from '../../models/Options';

export const fetch =
  (
    amount: number,
    difficulty: string,
    category: string,
    type: string,
    navigate: () => void
  ) =>
  async (dispatch: Dispatch<ActionQuizzes>): Promise<void> => {
    try {
      dispatch({ type: ActionTypeQuizzes.INIT });
      const response = await triviaBaseInstance.get('', {
        params: {
          amount,
          category,
          type,
          difficulty: difficulty.toLocaleLowerCase(),
        },
      });

      if (response.status !== 200) {
        throw new Error();
      }

      navigate();

      dispatch({
        type: ActionTypeQuizzes.SUCCESS,
        payload: response.data.results,
      });

      dispatch({
        type: ActionTypeQuizzes.UPDATE_USER_OPTIONS,
        payload: { amount, difficulty, category, type },
      });
    } catch (err) {
      // @ts-ignore
      dispatch({
        type: ActionTypeQuizzes.ERROR,
        payload: 'Something went wrong. Try again please.',
      });
    }
  };

export const fetchCategories =
  () =>
  async (dispatch: Dispatch<ActionQuizzes>): Promise<void> => {
    try {
      const response = await triviaCategoryInstance.get<{
        trivia_categories: Category[];
      }>('/');

      const { trivia_categories: payload } = response.data;

      dispatch({
        type: ActionTypeQuizzes.FETCH_CATEGORIES,
        payload,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const resetUserOptions = () => {
  return {
    type: ActionTypeQuizzes.RESET_USER_OPTIONS,
  };
};

export const populateOptions = (options: Options) => {
  return {
    type: ActionTypeQuizzes.POPULATE_OPTIONS,
    payload: options,
  };
};
