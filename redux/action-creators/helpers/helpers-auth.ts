import { Dispatch } from 'react';
import * as SecureStore from 'expo-secure-store';
import * as FileSystem from 'expo-file-system';
//
import { ActionAuth } from '../../actions';
import { ActionTypeAuth } from '../../action-types';
import {
  exchangeTokenInstance,
  getUserInstance,
  updateProfileInstance,
} from '../../../api/firebase';

// it has to awaited
export const storeToken = async (
  token: string,
  refreshToken: string
): Promise<void> => {
  SecureStore.setItemAsync(
    'token',
    JSON.stringify({
      token,
      refreshToken,
    })
  );
};

export const clearToken = async (): Promise<void> => {
  SecureStore.deleteItemAsync('token');
};

export const verifyToken =
  (
    refresh_token: string,
    idToken: string,
    runAfterVerify?: Function,
    optionalRunAfterVerifyParams?: {}
  ) =>
  async (dispatch: Dispatch<ActionAuth>): Promise<void> => {
    try {
      // this should work in most cases, not 'error-handling' - FIXME:
      const [response, userRes] = await Promise.all([
        exchangeTokenInstance.post('', {
          refresh_token,
          grant_type: 'refresh_token',
        }),
        getUserInstance.post('', {
          idToken,
        }),
      ]);

      if (response.status === 200) {
        const { id_token, refresh_token } = response.data;

        await storeToken(id_token, refresh_token);

        dispatch({
          type: ActionTypeAuth.AUTH_SUCCESS,
          payload: {
            token: id_token,
            refreshToken: refresh_token,
            email: userRes.data.users[0].providerUserInfo[0].email,
            username: userRes.data.users[0].providerUserInfo[0].displayName,
            image: userRes.data.users[0].providerUserInfo[0].photoUrl,
          },
        });

        if (runAfterVerify) {
          if (optionalRunAfterVerifyParams) {
            runAfterVerify(optionalRunAfterVerifyParams);
          } else {
            runAfterVerify();
          }
        }
      } else {
        dispatch({ type: ActionTypeAuth.LOGOUT });
      }
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

const errorStatuses = [
  { errorCode: 'EMAIL_EXISTS', msg: 'Email already exists' },
  { errorCode: 'OPERATION_NOT_ALLOWED', msg: 'Operation not allowed' },
  { errorCode: 'TOO_MANY_ATTEMPTS_TRY_LATER', msg: 'Too many attempts' },
  { errorCode: 'INVALID_PASSWORD', msg: 'Invalid password' },
  { errorCode: 'USER_DISABLED', msg: 'User disabled' },
  { errorCode: 'EMAIL_NOT_FOUND', msg: 'Email not found' },
];

export const handleErrorsAccordingly = (
  message: string,
  dispatch: Dispatch<ActionAuth>
) => {
  errorStatuses.every(({ errorCode, msg }, idx) => {
    if (message.includes(errorCode)) {
      dispatch({
        type: ActionTypeAuth.AUTH_ERROR,
        payload: msg,
      });
      return false;
    }

    if (idx === errorStatuses.length - 1) {
      dispatch({
        type: ActionTypeAuth.AUTH_ERROR,
        payload: 'Something went wrong',
      });
    }

    return true;
  });
};

export const saveImageToFileSystem = async (image: string): Promise<string> => {
  const fileName = image.split('/').pop() as string;
  const newPath = FileSystem.documentDirectory + fileName;

  await FileSystem.moveAsync({
    from: image,
    to: newPath,
  });

  return newPath;
};

export const updateUserData = async (
  image: string,
  idToken: string
): Promise<void> => {
  return updateProfileInstance.post('', {
    idToken,
    photoUrl: image,
    returnSecureToken: true,
  });
};
