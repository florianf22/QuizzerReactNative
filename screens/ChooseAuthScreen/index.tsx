import React, { useEffect, useLayoutEffect } from 'react';
import { View, Platform } from 'react-native';
//
import Splash from '../../components/Splash';
import Button from '../../components/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import Footer from '../../components/Footer';
import Spacer from '../../components/Spacer';
import { useActions } from '../../hooks/useActions';
import styles from './styles';
import useColors from '../../hooks/useColors';
import { useThemeActions } from '../../hooks/context-actions';
import { useTranslation } from 'react-i18next';

type NavProps = NativeStackScreenProps<AuthStackParamList, 'ChooseAuth'>;

interface ChooseAuthProps {}

const ChooseAuth: React.FC<ChooseAuthProps & NavProps> = ({ navigation }) => {
  const { guestLogin, tryLocalLogin } = useActions();
  const { retrieveTheme } = useThemeActions();
  const colors = useColors();
  const { t } = useTranslation('ChooseAuthScreen');

  const navigateToRegister = (): void => {
    navigation.navigate('Register');
  };

  const navigateToLogin = (): void => {
    navigation.navigate('Login');
  };

  const handleGuestLogin = (): void => {
    guestLogin();
  };

  useLayoutEffect(() => {
    Promise.all([retrieveTheme(), tryLocalLogin()]);
  }, []);

  return (
    <Splash>
      <View style={styles.wrapper}>
        <Button
          title={t('login')}
          size={22}
          style={styles.button}
          onPress={navigateToLogin}
        />
        {Platform.OS === 'android' ? <Spacer type="small" /> : null}
        <Button
          title={t('register')}
          size={22}
          color={colors.accentPurple}
          onPress={navigateToRegister}
        />

        <Footer text={t('skip')} onNavigate={guestLogin} />
      </View>
    </Splash>
  );
};

export default ChooseAuth;
