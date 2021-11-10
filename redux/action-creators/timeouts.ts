import { ActionTypeTimeouts } from '../action-types';

export const addStartTime = () => {
  return {
    type: ActionTypeTimeouts.ADD_START_TIME,
  };
};

export const addEndTime = () => {
  return {
    type: ActionTypeTimeouts.ADD_END_TIME,
  };
};
