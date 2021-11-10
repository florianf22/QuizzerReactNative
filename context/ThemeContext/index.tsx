import React, { useReducer } from 'react';
import { Text } from 'react-native';

type AdjustmentActionToggle = {
  type: 'toggle_theme';
};

type AdjustmentActionSet = {
  type: 'set_theme';
  payload: 'dark' | 'light';
};

type AdjustmentAction = AdjustmentActionToggle | AdjustmentActionSet;

interface IState {
  theme: 'dark' | 'light';
}

const reducer = (state: IState, action: AdjustmentAction): IState => {
  switch (action.type) {
    case 'toggle_theme':
      return {
        theme: state.theme === 'dark' ? 'light' : 'dark',
      };
    case 'set_theme': {
      return {
        theme: action.payload,
      };
    }
    default:
      return state;
  }
};

interface IThemeContext extends IState {
  dispatch: React.Dispatch<AdjustmentAction>;
}

const initialState: IState = {
  theme: 'dark',
};

export const ThemeContext = React.createContext<IThemeContext>(
  initialState as IThemeContext
);

export const ThemeContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ThemeContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};
