import React, { useContext, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
//
import Splash from '../../components/Splash';
import LightSwitch from '../../svg/LightSwitch';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import SettingsBox from '../../components/SettingsBox';
import { ThemeContext } from '../../context/ThemeContext';
import styles from './styles';
import useColors from '../../hooks/useColors';
import Button from '../../components/Button';
import Spacer from '../../components/Spacer';
import { useActions } from '../../hooks/useActions';
import { useThemeActions } from '../../hooks/context-actions';
import { MainStackParamList } from '../../navigation/types';
import { useTranslation } from 'react-i18next';

type NavType = NativeStackScreenProps<MainStackParamList, 'Settings'>;

interface SettingsScreenProps {}

const POSITION_Y_SCROLL_VALUE = -26;

const SettingsScreen: React.FC<SettingsScreenProps & NavType> = ({
  navigation,
}) => {
  const { theme } = useContext(ThemeContext);
  const { saveTheme } = useThemeActions();
  const switchPositionY = useSharedValue(
    theme === 'dark' ? 0 : POSITION_Y_SCROLL_VALUE
  );
  const color = useDerivedValue(() => {
    return withTiming(switchPositionY.value === -26 ? 0 : 1);
  });
  const colors = useColors();
  const { logout } = useActions();
  const { t } = useTranslation('SettingsScreen');

  const rStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      color.value,
      [0, 1],
      ['#DEE4EA', '#222C4A']
    );

    return {
      backgroundColor,
    };
  });

  useEffect(() => {
    const listener = navigation.addListener('blur', () => {
      saveTheme(color.value === 0 ? 'light' : 'dark');
    });

    return listener;
  }, [navigation]);

  const navigateBack = (): void => {
    navigation.pop();
  };

  return (
    <Splash
      animatedStyle={rStyle}
      hideLogo
      // innerStyle servers as animated style component
      innerStyle={styles.container}
    >
      <View style={{ alignItems: 'center' }}>
        <SettingsBox />

        <LightSwitch
          switchPositionY={switchPositionY}
          colorSharedValue={color}
          scrollValue={POSITION_Y_SCROLL_VALUE}
        />
      </View>

      <TouchableOpacity style={styles.iconTouchable} onPress={navigateBack}>
        <AntDesign name="export2" size={40} color={colors.primaryLight} />
      </TouchableOpacity>

      <Spacer type="medium" />

      <Button
        title={t('logout')}
        size={22}
        color={colors.accentPurple}
        onPress={logout}
      />
    </Splash>
  );
};

export default SettingsScreen;
