import { ActionTypeAuth } from '../action-types';

interface ActionAuthInit {
  type: ActionTypeAuth.AUTH_INIT;
}

interface ActionAuthSuccess {
  type: ActionTypeAuth.AUTH_SUCCESS;
  payload: {
    email: string;
    token: string;
    refreshToken: string;
    username: string;
  };
}

interface ActionAuthError {
  type: ActionTypeAuth.AUTH_ERROR;
  payload: string;
}

interface ActionAuthGuestLogin {
  type: ActionTypeAuth.GUEST_LOGIN;
}

interface ActionAuthLogout {
  type: ActionTypeAuth.LOGOUT;
}

export type ActionAuth =
  | ActionAuthInit
  | ActionAuthSuccess
  | ActionAuthError
  | ActionAuthGuestLogin
  | ActionAuthLogout;
