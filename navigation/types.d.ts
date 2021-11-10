import { NativeStackScreenProps } from '@react-navigation/native-stack';

type AuthStackParamList = {
  ChooseAuth: undefined;
  Login: undefined;
  Register: undefined;
};

type MainStackParamList = {
  Start: undefined;
  ChooseOptions: undefined;
  Quizzes: { showOnly: boolean };
  Results: undefined;
  Settings: undefined;
  ChangePassword: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends MainStackParamList {}
  }
}
