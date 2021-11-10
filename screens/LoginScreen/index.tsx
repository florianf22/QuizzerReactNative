import React, { useCallback, useEffect } from 'react';
import { View, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFormik } from 'formik';
//
import Splash from '../../components/Splash';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Spacer from '../../components/Spacer';
import Footer from '../../components/Footer';
import { AuthStackParamList } from '../../navigation/types';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import styles from './styles';
import useColors from '../../hooks/useColors';
import { useStyledNavigation } from '../../hooks/useStyledNavigation';
import useYup from '../../hooks/useYup';
import { useTranslation } from 'react-i18next';

type NavProps = NativeStackScreenProps<AuthStackParamList, 'Register'>;
interface RegisterScreenProps {}

const RegisterScreen: React.FC<RegisterScreenProps & NavProps> = ({
  navigation,
}) => {
  const { login } = useActions();
  const { error } = useTypedSelector(state => state.auth);
  const { loginValidationSchema: validationSchema } = useYup();
  const { t } = useTranslation('LoginScreen');

  const inputs = [
    { name: 'email', displayName: t('email') },
    { name: 'password', displayName: t('password') },
  ] as const;

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
  const colors = useColors();
  useStyledNavigation(navigation);

  const navigateToRegister = useCallback(() => {
    navigation.navigate('Register');
  }, []);

  const onPressHandler = (val: string, name: string): void => {
    formik.setFieldValue(name, val);
    formik.setFieldTouched(name, true, false);
  };

  useEffect(() => {
    if (error) {
      Alert.alert(t('loginError'), error);
    }
  }, [error]);

  return (
    <View style={{ flex: 1 }}>
      <Splash
        style={[styles.borderTop, { borderTopColor: colors.primaryLight }]}
      >
        {inputs.map(({ name, displayName }, idx) => (
          <Input
            key={idx}
            placeholder={displayName}
            value={formik.values[name]}
            onChangeText={val => onPressHandler(val, name)}
            touched={formik.touched[name]}
            errorMsg={formik.errors[name]}
            autoCapitalize="none"
            autoCorrect={false}
            secure={name.includes('password')}
          />
        ))}
        <Spacer type="medium" />
        <Button
          title={t('login')}
          ghost
          color={colors.accentGreen}
          onPress={() => formik.handleSubmit()}
        />

        <Footer text={t('register')} onNavigate={navigateToRegister} />
      </Splash>
    </View>
  );
};

export default RegisterScreen;
