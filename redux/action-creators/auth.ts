import { Dispatch } from 'react';
import * as SecureStore from 'expo-secure-store';
import { ThunkAction } from 'redux-thunk';
//
import { ActionAuth } from '../actions';
import { ActionTypeAuth } from '../action-types';
import {
  registerInstance,
  loginInstance,
  getUserInstance,
  changePasswordInstance,
} from '../../api/firebase';
import {
  verifyToken,
  storeToken,
  handleErrorsAccordingly,
  saveImageToFileSystem,
  updateUserData,
  clearToken,
} from './helpers';
import { RootState } from '../index';

export const guestLogin = () => {
  return {
    type: ActionTypeAuth.GUEST_LOGIN,
  };
};

export const register =
  (email: string, password: string, username: string) =>
  async (dispatch: Dispatch<ActionAuth>): Promise<void> => {
    try {
      dispatch({ type: ActionTypeAuth.AUTH_INIT });

      const response = await registerInstance.post('', {
        email,
        password,
        displayName: username,
        returnSecureToken: true,
      });

      // this ain't happening
      // if (response.status !== 200) {
      //   throw new Error('Something went wrong. Try again');
      // }

      await storeToken(response.data.idToken, response.data.refreshToken);

      dispatch({
        type: ActionTypeAuth.AUTH_SUCCESS,
        payload: {
          email,
          token: response.data.idToken,
          refreshToken: response.data.refreshToken,
          username,
        },
      });
    } catch (err: any) {
      const { message } = err.response.data.error;
      handleErrorsAccordingly(message, dispatch);
    }
  };

export const login =
  (
    email: string,
    password: string
  ): ThunkAction<void, RootState, never, ActionAuth> =>
  async (dispatch, getState, extraArgument): Promise<void> => {
    try {
      dispatch({ type: ActionTypeAuth.AUTH_INIT });

      const response = await loginInstance.post('', {
        email,
        password,
        returnSecureToken: true,
      });

      const [userRes, _] = await Promise.all([
        getUserInstance.post('', {
          idToken: response.data.idToken,
        }),
        storeToken(response.data.idToken, response.data.refreshToken),
      ]);

      dispatch({
        type: ActionTypeAuth.AUTH_SUCCESS,
        payload: {
          email,
          token: response.data.idToken,
          refreshToken: response.data.refreshToken,
          username: userRes.data.users[0].displayName,
        },
      });
    } catch (err: any) {
      const { message } = err.response.data.error;
      handleErrorsAccordingly(message, dispatch);
    }
  };

export const tryLocalLogin =
  (): ThunkAction<void, RootState, never, ActionAuth> =>
  async (dispatch: Dispatch<ActionAuth>) => {
    const response = await SecureStore.getItemAsync('token');

    if (response) {
      const { token, refreshToken } = JSON.parse(response);

      verifyToken(refreshToken, token)(dispatch);
    }
  };

export const refreshToken =
  (): ThunkAction<void, RootState, never, ActionAuth> =>
  async (dispatch, getState) => {
    const { user } = getState().auth;

    verifyToken(user!.refreshToken, user!.token)(dispatch);
  };

export const changePassword =
  (password: string): ThunkAction<void, RootState, never, ActionAuth> =>
  async (dispatch, getState) => {
    const { user } = getState().auth;

    const makeRequestForPasswordChange = async (params: {
      idToken: string;
      password: string;
    }) => {
      await changePasswordInstance.post('', {
        idToken: params.idToken,
        password: params.password,
        returnSecureToken: true,
      });

      dispatch({ type: ActionTypeAuth.LOGOUT });
    };

    await verifyToken(
      user!.refreshToken,
      user!.token,
      makeRequestForPasswordChange,
      { idToken: user!.token, password }
    )(dispatch);
  };

export const updateImage =
  (image: string): ThunkAction<void, RootState, never, ActionAuth> =>
  async (dispatch, getState) => {
    try {
      if (getState().auth.user) {
        const newPath = await saveImageToFileSystem(image);
        await updateUserData(newPath, getState().auth.user!.token);

        dispatch({
          type: ActionTypeAuth.ADD_USER_IMAGE,
          payload: newPath,
        });
      }
    } catch (err: unknown) {
      console.log(err);
    }
  };

export const logout =
  (): ThunkAction<void, RootState, never, ActionAuth> => async dispatch => {
    try {
      await clearToken();

      dispatch({
        type: ActionTypeAuth.LOGOUT,
      });
    } catch (err: unknown) {
      console.log(err);
    }
  };
