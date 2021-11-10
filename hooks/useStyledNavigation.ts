import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useContext, useLayoutEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { AuthStackParamList, MainStackParamList } from '../navigation/types';
import useColors from './useColors';

type NavTypeMain = NativeStackNavigationProp<
  MainStackParamList,
  keyof MainStackParamList
>;
type NavTypeAuth = NativeStackNavigationProp<
  AuthStackParamList,
  keyof AuthStackParamList
>;

type NavType = NavTypeMain | NavTypeAuth;

export const useStyledNavigation = (navigation: NavType) => {
  const colors = useColors();
  const { theme } = useContext(ThemeContext);

  useLayoutEffect(() => {
    console.log(colors.primary);

    navigation.setOptions({
      headerStyle: { backgroundColor: colors.primary },
      headerTintColor: colors.primaryLight,
    });
  }, [navigation, theme]);
};
