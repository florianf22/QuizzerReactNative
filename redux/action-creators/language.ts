import { ActionTypeLanguage } from '../action-types';

export const setLanguage = (language: 'en' | 'ka') => {
  return {
    type: 'SET_LANGUAGE',
    payload: language,
  };
};
