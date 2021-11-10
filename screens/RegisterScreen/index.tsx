import React, { useCallback, useEffect } from 'react';
import { View, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFormik } from 'formik';
//
import Splash from '../../components/Splash';
import Button from '../../components/Button';
import Spacer from '../../components/Spacer';
import Footer from '../../components/Footer';
import { AuthStackParamList } from '../../navigation/types';
import { useActions } from '../../hooks/useActions';
import useYup from '../../hooks/useYup';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import styles from './styles';
import useColors from '../../hooks/useColors';
import { useStyledNavigation } from '../../hooks/useStyledNavigation';
import { useTranslation } from 'react-i18next';
import RegisterInputsList from '../../components/RegisterInputsList';

type NavProps = NativeStackScreenProps<AuthStackParamList, 'Register'>;

interface RegisterScreenProps {}

const RegisterScreen: React.FC<RegisterScreenProps & NavProps> = ({
  navigation,
}) => {
  const { register } = useActions();
  const { error } = useTypedSelector(state => state.auth);
  const { registerValidationSchema: validationSchema } = useYup();

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
  const colors = useColors();
  useStyledNavigation(navigation);
  const { t } = useTranslation('RegisterScreen');

  const navigateToLogin = useCallback(() => {
    navigation.navigate('Login');
  }, []);

  useEffect(() => {
    if (error) {
      Alert.alert(t('registrationError'), error);
    }
  }, [error]);

  return (
    <View style={{ flex: 1 }}>
      <Splash
        style={[styles.borderTop, { borderTopColor: colors.primaryLight }]}
      >
        <RegisterInputsList formik={formik} />

        <Spacer type="medium" />

        <Button
          title={t('register')}
          ghost
          color={colors.accentGreen}
          onPress={() => formik.handleSubmit()}
        />

        <Footer text={t('login')} onNavigate={navigateToLogin} />
      </Splash>
    </View>
  );
};

export default RegisterScreen;
