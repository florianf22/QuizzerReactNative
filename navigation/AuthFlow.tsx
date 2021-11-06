import React from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//
import ChooseAuthScreen from '../screens/ChooseAuthScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { AuthStackParamList } from './types';
import Colors from '../constants/Colors';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthFlow: React.FC = () => {
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
          headerStyle: { backgroundColor: Colors.primary },
          headerShadowVisible: false,
          headerTintColor: Colors.primaryLight,
          headerTitleAlign: 'left',
          headerTitleStyle: {
            //   moves up the text up, not using
            // fontFamily: 'MtavruliBold',
            fontWeight: '500',
          },
        })}
      >
        <AuthStack.Screen
          name="Login"
          component={LoginScreen}
          options={({ navigation }) => ({ title: 'LOGIN TO YOUR ACCOUNT' })}
        />
        <AuthStack.Screen
          name="Register"
          component={RegisterScreen}
          options={({ navigation }) => ({ title: 'REGISTER' })}
        />
      </AuthStack.Group>
    </AuthStack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default AuthFlow;
