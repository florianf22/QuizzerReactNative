import React, { useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
//
import Splash from '../components/Splash';
import Button from '../components/Button';
import Colors from '../constants/Colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/types';
import Footer from '../components/Footer';
import Spacer from '../components/Spacer';
import { useActions } from '../hooks/useActions';

type NavProps = NativeStackScreenProps<AuthStackParamList, 'ChooseAuth'>;

interface ChooseAuthProps {}

const ChooseAuth: React.FC<ChooseAuthProps & NavProps> = ({ navigation }) => {
  const { guestLogin, tryLocalLogin } = useActions();

  const navigateToRegister = (): void => {
    navigation.navigate('Register');
  };

  const navigateToLogin = (): void => {
    navigation.navigate('Login');
  };

  const handleGuestLogin = (): void => {
    guestLogin();
  };

  useEffect(() => {
    tryLocalLogin();
  }, []);

  return (
    <Splash>
      <View style={styles.wrapper}>
        <Button
          title="შესვლა"
          size={22}
          style={styles.button}
          onPress={navigateToLogin}
        />
        {Platform.OS === 'android' ? <Spacer type="small" /> : null}
        <Button
          title="რეგისტრაცია"
          size={22}
          color={Colors.accentPurple}
          onPress={navigateToRegister}
        />

        <Footer text="დროებით გამოტოვება" onNavigate={guestLogin} />
      </View>
    </Splash>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'center',
  },
  button: {
    marginVertical: 5,
  },
  touchable: {
    alignSelf: 'center',
  },
});

export default ChooseAuth;
