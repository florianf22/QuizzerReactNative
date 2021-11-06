import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
//
import Splash from '../components/Splash';
import Colors from '../constants/Colors';
import ColorsLight from '../constants/ColorsLight';
import { useNavigation } from '@react-navigation/core';
import LightSwitch from '../svg/LightSwitch';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import SettingsBox from '../components/SettingsBox';

interface SettingsScreenProps {}

const POSITION_Y_SCROLL_VALUE = -26;

const SettingsScreen: React.FC<SettingsScreenProps> = () => {
  const switchPositionY = useSharedValue(0);
  const color = useDerivedValue(() => {
    return withTiming(switchPositionY.value === -26 ? 0 : 1);
  });
  const navigation = useNavigation();

  const navigateBack = (): void => {
    navigation.goBack();
  };

  const rStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      color.value,
      [0, 1],
      [ColorsLight.primary, Colors.primary]
    );
    return {
      backgroundColor,
    };
  });

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
        <AntDesign name="export2" size={40} color={Colors.primaryLight} />
      </TouchableOpacity>
    </Splash>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    transform: [{ translateY: 10 }],
  },
  iconTouchable: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
});

export default SettingsScreen;
