import { ActionTypeLanguage } from '../action-types';
import { ActionsLanguage } from '../actions/actions-language';

interface StateType {
  language: 'en' | 'ka';
}

const initialState: StateType = {
  language: 'en',
};

const reducer = (
  state: StateType = initialState,
  action: ActionsLanguage
): StateType => {
  switch (action.type) {
    case ActionTypeLanguage.SET_LANGUAGE:
      return {
        language: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
