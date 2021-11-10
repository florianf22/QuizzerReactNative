import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
//
import useColors from '../hooks/useColors';
import Button from './Button';
import { PAGE_WIDTH, PAGE_HEIGHT } from '../constants/Dimensions';
import { useTranslation } from 'react-i18next';

interface AnimatedNextButtonProps {
  translateX: Animated.SharedValue<number>;
  index: number;
  handleAnswerChoosing: () => void;
}

const AnimatedNextButton: React.FC<AnimatedNextButtonProps> = ({
  translateX,
  index,
  handleAnswerChoosing,
}) => {
  const colors = useColors();
  const { t } = useTranslation('QuizzesScreen');

  const inputRange = [
    (index - 1) * PAGE_WIDTH,
    index * PAGE_WIDTH,
    (index + 1) * PAGE_WIDTH,
  ];

  const rButtonStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0.5, 1, 0.5],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ scale }],
    };
  });

  return (
    <Animated.View style={[rButtonStyle]}>
      <Button
        title={t('next')}
        color={colors.primaryMedium}
        size={20}
        onPress={handleAnswerChoosing}
        style={{ alignSelf: 'center' }}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({});

export default AnimatedNextButton;
