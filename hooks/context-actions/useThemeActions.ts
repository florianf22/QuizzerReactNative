import * as SecureStore from 'expo-secure-store';
//
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

// TODO: since token is also being fetched from secure store,
//theme and that can be done at the same time, but not sure where to logic should be combined so leaving for now
// plus getting something from secure store, not the most intensive thing
export const useThemeActions = () => {
  const { theme, dispatch } = useContext(ThemeContext);

  const saveTheme = async (themeToSet: 'light' | 'dark'): Promise<void> => {
    try {
      dispatch({ type: 'set_theme', payload: themeToSet });
      await SecureStore.setItemAsync('theme', JSON.stringify(themeToSet));
    } catch (err: unknown) {
      console.log(err);
    }
  };

  const retrieveTheme = async (): Promise<void> => {
    try {
      const theme = await SecureStore.getItemAsync('theme');

      if (theme) {
        if (theme) {
          dispatch({
            type: 'set_theme',
            payload: JSON.parse(theme),
          });
        }
      } else {
        dispatch({
          type: 'set_theme',
          payload: 'dark',
        });
      }
    } catch (err: unknown) {
      console.log(err);
    }
  };

  return { saveTheme, retrieveTheme };
};
