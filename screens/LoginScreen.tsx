import React, { useCallback, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFormik } from 'formik';
//
import Splash from '../components/Splash';
import Colors from '../constants/Colors';
import Button from '../components/Button';
import Input from '../components/Input';
import Spacer from '../components/Spacer';
import Footer from '../components/Footer';
import { loginValidationSchema as validationSchema } from '../yup';
import { AuthStackParamList } from '../navigation/types';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';

const inputs = [
  { name: 'email', displayName: 'ელ-ფოსტა' },
  { name: 'password', displayName: 'პაროლი' },
] as const;

type NavProps = NativeStackScreenProps<AuthStackParamList, 'Register'>;
interface RegisterScreenProps {}

const RegisterScreen: React.FC<RegisterScreenProps & NavProps> = ({
  navigation,
}) => {
  const { login } = useActions();
  const { error } = useTypedSelector(state => state.auth);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: values => {
      login(values.email, values.password);
    },
  });

  const navigateToRegister = useCallback(() => {
    navigation.navigate('Register');
  }, []);

  const onPressHandler = (val: string, name: string): void => {
    formik.setFieldValue(name, val);
    formik.setFieldTouched(name, true, false);
  };

  useEffect(() => {
    if (error) {
      Alert.alert('ვერ შეხვედით სისტემაში 😭', error);
    }
  }, [error]);

  return (
    <View style={{ flex: 1 }}>
      <Splash style={styles.borderTop} center>
        {inputs.map(({ name, displayName }, idx) => (
          <Input
            key={idx}
            placeholder={displayName}
            value={formik.values[name]}
            onChangeText={val => onPressHandler(val, name)}
            touched={formik.touched[name]}
            errorMsg={formik.errors[name]}
          />
        ))}
        <Spacer type="medium" />
        <Button
          title="შესვლა"
          ghost
          color={Colors.accentGreen}
          onPress={() => formik.handleSubmit()}
        />

        <Footer text="რეგისტრაცია" onNavigate={navigateToRegister} />
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
