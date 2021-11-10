import { ActionTypeTimeouts } from '../action-types';

interface addTime {
  type: ActionTypeTimeouts.ADD_START_TIME | ActionTypeTimeouts.ADD_END_TIME;
}

export type ActionTimeouts = addTime;
