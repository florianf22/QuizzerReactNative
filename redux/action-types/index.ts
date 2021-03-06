export enum ActionTypeAuth {
  AUTH_INIT = 'AUTH_INIT',
  AUTH_SUCCESS = 'AUTH_SUCCESS',
  AUTH_ERROR = 'AUTH_ERROR',
  LOGOUT = 'LOGOUT',
  GUEST_LOGIN = 'GUEST_LOGIN',
  ADD_USER_IMAGE = 'ADD_USER_IMAGE',
}

export enum ActionTypeQuizzes {
  INIT = 'INIT',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  FETCH_CATEGORIES = 'FETCH_CATEGORIES',
  UPDATE_USER_OPTIONS = 'UPDATE_USER_OPTIONS',
  RESET_USER_OPTIONS = 'RESET_USER_OPTIONS',
  POPULATE_OPTIONS = 'POPULATE_OPTIONS',
}

export enum ActionTypeQuestions {
  CORRECT = 'CORRECT',
  RESET = 'RESET',
  ADD_ANSWER = 'ADD_ANSWER',
}

export enum ActionTypeTimeouts {
  ADD_START_TIME = 'ADD_START_TIME',
  ADD_END_TIME = 'ADD_END_TIME',
}

export enum ActionTypeLanguage {
  SET_LANGUAGE = 'SET_LANGUAGE',
}
