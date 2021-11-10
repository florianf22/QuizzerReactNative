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
    image?: string;
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

interface ActionAuthAddUserImage {
  type: ActionTypeAuth.ADD_USER_IMAGE;
  payload: string;
}

export type ActionAuth =
  | ActionAuthInit
  | ActionAuthSuccess
  | ActionAuthError
  | ActionAuthGuestLogin
  | ActionAuthLogout
  | ActionAuthAddUserImage;
