import React from 'react';
import { Settings, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//
import { MainStackParamList } from './types';
import Colors from '../constants/Colors';
import StartScreen from '../screens/StartScreen';
import ChooseOptionsScreen from '../screens/ChooseOptionsScreen';
import QuizzesScreen from '../screens/QuizzesScreen';
import ResultsScreen from '../screens/ResultsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import { useTranslation } from 'react-i18next';

const MainStack = createNativeStackNavigator<MainStackParamList>();

const MainFlow: React.FC = () => {
  const { t } = useTranslation('NavMainFlow');
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Start"
        component={StartScreen}
        options={({ navigation }) => ({
          headerShown: false,
        })}
      />

      <MainStack.Group
        screenOptions={({ navigation }) => ({
          headerShadowVisible: false,
          headerTitleAlign: 'left',
        })}
      >
        <MainStack.Screen
          name="ChooseOptions"
          component={ChooseOptionsScreen}
          options={({ navigation }) => ({
            headerTitle: t('chooseOptions'),
          })}
        />
        <MainStack.Screen
          name="Quizzes"
          component={QuizzesScreen}
          options={({ navigation }) => ({ headerShown: false })}
        />
        <MainStack.Screen
          name="Results"
          component={ResultsScreen}
          options={({ navigation }) => ({ headerShown: false })}
        />
        <MainStack.Screen
          name="Settings"
          component={SettingsScreen}
          options={({ navigation }) => ({ headerShown: false })}
        />
        <MainStack.Screen
          name="ChangePassword"
          component={ChangePasswordScreen}
          options={({ navigation }) => ({ title: t('changePassword') })}
        />
      </MainStack.Group>
    </MainStack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default MainFlow;
