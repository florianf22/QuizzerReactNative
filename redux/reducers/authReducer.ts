import { ActionTypeAuth } from '../action-types';
import { ActionAuth } from '../actions';

interface AuthState {
  loading: boolean;
  error: string | null;
  user: {
    email: string;
    token: string;
    refreshToken: string;
    username: string;
    image?: string;
  } | null;
}

const initialState: AuthState = {
  loading: false,
  error: null,
  user: null,
};

const reducer = (
  state: AuthState = initialState,
  action: ActionAuth
): AuthState => {
  switch (action.type) {
    case ActionTypeAuth.AUTH_INIT: {
      return { loading: true, error: null, user: null };
    }
    case ActionTypeAuth.AUTH_SUCCESS: {
      return { loading: false, error: null, user: action.payload };
    }
    case ActionTypeAuth.AUTH_ERROR: {
      return { loading: false, error: action.payload, user: null };
    }
    case ActionTypeAuth.GUEST_LOGIN: {
      return {
        loading: false,
        error: null,
        user: {
          email: 'guest',
          token: '',
          refreshToken: '',
          username: 'guest',
        },
      };
    }
    case ActionTypeAuth.LOGOUT: {
      return { loading: false, error: null, user: null };
    }
    case ActionTypeAuth.ADD_USER_IMAGE: {
      if (!state.user) {
        return state;
      }

      return { ...state, user: { ...state.user, image: action.payload } };
    }
    default:
      return state;
  }
};

export default reducer;
