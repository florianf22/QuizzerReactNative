import React from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
//
import ChooseAuthScreen from '../screens/ChooseAuthScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { AuthStackParamList } from './types';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthFlow: React.FC = () => {
  const { t } = useTranslation('NavAuthFlow');
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="ChooseAuth"
        component={ChooseAuthScreen}
        options={({ navigation }) => ({
          headerShown: false,
        })}
      />
      <AuthStack.Group
        screenOptions={({ navigation }) => ({
          headerShadowVisible: false,
          headerTitleAlign: 'left',
        })}
      >
        <AuthStack.Screen
          name="Login"
          component={LoginScreen}
          options={({ navigation }) => ({ title: t('login') })}
        />
        <AuthStack.Screen
          name="Register"
          component={RegisterScreen}
          options={({ navigation }) => ({ title: t('register') })}
        />
      </AuthStack.Group>
    </AuthStack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default AuthFlow;
