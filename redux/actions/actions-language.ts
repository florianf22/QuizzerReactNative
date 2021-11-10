import { ActionTypeLanguage } from '../action-types';

interface ActionSetLanguage {
  type: ActionTypeLanguage.SET_LANGUAGE;
  payload: 'en' | 'ka';
}

export type ActionsLanguage = ActionSetLanguage;
