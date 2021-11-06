import React, { useCallback, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFormik } from 'formik';
//
import Splash from '../components/Splash';
import Colors from '../constants/Colors';
import Button from '../components/Button';
import Input from '../components/Input';
import Spacer from '../components/Spacer';
import Footer from '../components/Footer';
import { AuthStackParamList } from '../navigation/types';
import { useActions } from '../hooks/useActions';
import { registerValidationSchema as validationSchema } from '../yup';
import { useTypedSelector } from '../hooks/useTypedSelector';

const inputs = [
  { name: 'username', displayName: 'სახელი' },
  { name: 'password', displayName: 'პაროლი' },
  { name: 'passwordConfirm', displayName: 'გაიმეორეთ პაროლი' },
  { name: 'email', displayName: 'ელ-ფოსტა' },
] as const;

type NavProps = NativeStackScreenProps<AuthStackParamList, 'Register'>;

interface RegisterScreenProps {}

const RegisterScreen: React.FC<RegisterScreenProps & NavProps> = ({
  navigation,
}) => {
  const { register } = useActions();
  const { error } = useTypedSelector(state => state.auth);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirm: '',
      email: '',
    },
    validationSchema,
    onSubmit: values => {
      register(values.email, values.password, values.username);
    },
  });

  const navigateToLogin = useCallback(() => {
    navigation.navigate('Login');
  }, []);

  const onPressHandler = (val: string, name: string): void => {
    formik.setFieldValue(name, val);
    formik.setFieldTouched(name, true, false);
  };

  useEffect(() => {
    if (error) {
      Alert.alert('ვერ დაგარეგისტრირეთ 😭', error);
    }
  }, [error]);

  return (
    <View style={{ flex: 1 }}>
      <Splash style={styles.borderTop} center>
        {/* this could take some refactoring */}
        {inputs.map(({ name, displayName }, idx) => (
          <Input
            key={idx}
            placeholder={displayName}
            value={formik.values[name]}
            onChangeText={val => onPressHandler(val, name)}
            touched={formik.touched[name]}
            errorMsg={formik.errors[name]}
            secureTextEntry={name.includes('password')}
            autoCapitalize="none"
            autoCorrect={false}
          />
        ))}

        <Spacer type="medium" />

        <Button
          title="რეგისტრაცია"
          ghost
          color={Colors.accentGreen}
          onPress={() => formik.handleSubmit()}
        />

        <Footer text="შესვლა" onNavigate={navigateToLogin} />
      </Splash>
    </View>
  );
};

const styles = StyleSheet.create({
  borderTop: {
    borderTopColor: Colors.primaryLight,
    borderTopWidth: 1,
  },
});

export default RegisterScreen;
