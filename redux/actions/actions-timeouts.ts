import { ActionTypeTimeouts } from '../action-types';

interface addTimeoutId {
  type: ActionTypeTimeouts.ADD_TIMEOUT_ID;
  payload: number;
}

interface removeTimeoutId {
  type: ActionTypeTimeouts.CLEAR_TIMEOUTS;
  payload: number;
}

export type ActionTimeouts = addTimeoutId | removeTimeoutId;
