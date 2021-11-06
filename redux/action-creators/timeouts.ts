import { ActionTypeTimeouts } from '../action-types';

export const setTimeout = (timeoutId: NodeJS.Timer) => ({
  type: ActionTypeTimeouts.ADD_TIMEOUT_ID,
  payload: timeoutId,
});

export const clearTimeouts = () => ({
  type: ActionTypeTimeouts.CLEAR_TIMEOUTS,
});
