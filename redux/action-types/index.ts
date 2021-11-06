export enum ActionTypeAuth {
  AUTH_INIT = 'AUTH_INIT',
  AUTH_SUCCESS = 'AUTH_SUCCESS',
  AUTH_ERROR = 'AUTH_ERROR',
  LOGOUT = 'LOGOUT',
  GUEST_LOGIN = 'GUEST_LOGIN',
}

export enum ActionTypeQuizzes {
  INIT = 'INIT',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  FETCH_CATEGORIES = 'FETCH_CATEGORIES',
}

export enum ActionTypeQuestions {
  CORRECT = 'CORRECT',
  RESET = 'RESET',
}

export enum ActionTypeTimeouts {
  ADD_TIMEOUT_ID = 'ADD_TIMEOUT_ID',
  CLEAR_TIMEOUTS = 'CLEAR_TIMEOUTS',
}
