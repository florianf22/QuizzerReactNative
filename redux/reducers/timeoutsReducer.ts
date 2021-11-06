// NO USE YET

import { ActionTypeTimeouts } from '../action-types';
import { ActionTimeouts } from '../actions';

interface TimeoutsState {
  timeouts: NodeJS.Timer[];
}

const initialState = {
  timeouts: [],
};

const reducer = (
  state: TimeoutsState = initialState,
  action: ActionTimeouts
) => {
  switch (action.type) {
    case ActionTypeTimeouts.ADD_TIMEOUT_ID:
      return {
        timeouts: [...state.timeouts, action.payload],
      };
    case ActionTypeTimeouts.CLEAR_TIMEOUTS:
      return { timeouts: [] };
    default:
      return state;
  }
};

export default reducer;
