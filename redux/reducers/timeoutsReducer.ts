import { ActionTypeTimeouts } from '../action-types';
import { ActionTimeouts } from '../actions';

interface TimeoutsState {
  startTime: number;
  endTime: number;
}

const initialState: TimeoutsState = {
  startTime: 0,
  endTime: 0,
};

const reducer = (
  state: TimeoutsState = initialState,
  action: ActionTimeouts
): TimeoutsState => {
  switch (action.type) {
    case ActionTypeTimeouts.ADD_START_TIME:
      return { ...state, startTime: new Date(Date.now()).getTime() };
    case ActionTypeTimeouts.ADD_END_TIME: {
      return { ...state, endTime: new Date(Date.now()).getTime() };
    }
    default:
      return state;
  }
};

export default reducer;
