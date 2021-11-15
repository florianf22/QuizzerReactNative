import React from 'react';
import { TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
//
import Splash from '../../components/Splash';
import Button from '../../components/Button';
import { MainStackParamList } from '../../navigation/types';
import styles from './styles';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import useColors from '../../hooks/useColors';
import { useTranslation } from 'react-i18next';
import { useActions } from '../../hooks/useActions';
import LanguageChanger from '../../components/LanguageChanger';
import Spacer from '../../components/Spacer';

type NavProps = NativeStackScreenProps<MainStackParamList, 'Start'>;

interface StartScreenProps {}

const StartScreen: React.FC<StartScreenProps & NavProps> = ({ navigation }) => {
  const { user } = useTypedSelector(state => state.auth);
  const { logout } = useActions();
  const colors = useColors();
  const { t } = useTranslation('StartScreen');

  const navigateToNextPage = (): void => {
    navigation.navigate('ChooseOptions');
  };

  const navigateToSettings = (): void => {
    navigation.navigate('Settings');
  };

  return (
    <Splash innerStyle={{ alignItems: 'stretch' }}>
      <Button title={t('start')} size={24} onPress={navigateToNextPage} />

      <Spacer type="medium" />

      <LanguageChanger />

      {user?.token ? (
        <TouchableOpacity style={styles.touchable} onPress={navigateToSettings}>
          <FontAwesome name="gear" size={40} color={colors.primaryLight} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.touchable} onPress={logout}>
          <AntDesign name="login" size={40} color={colors.primaryLight} />
        </TouchableOpacity>
      )}
    </Splash>
  );
};

export default StartScreen;
