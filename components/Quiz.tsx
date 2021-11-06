import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/core';
//
import { PAGE_WIDTH, PAGE_HEIGHT } from '../constants/Dimensions';
import { Quiz as QuizType } from '../models/Quiz';
import { shuffle } from '../utils/index';
import Colors from '../constants/Colors';
import QuizInfo from './QuizInfo';
import QuizCheckboxes from './QuizCheckboxes';
import Button from './Button';
import Spacer from './Spacer';
import { useActions } from '../hooks/useActions';

interface QuizProps {
  quiz: QuizType;
  index: number;
  length: number;
  onNextSlideClickHandler: () => void;
  translateX: Animated.SharedValue<number>;
}

const Quiz: React.FC<QuizProps> = ({
  quiz,
  index,
  length,
  onNextSlideClickHandler,
  translateX,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const { increaseCorrectQuestionQuantity } = useActions();
  const navigation = useNavigation();

  const inputRange = [
    (index - 1) * PAGE_WIDTH,
    index * PAGE_WIDTH,
    (index + 1) * PAGE_WIDTH,
  ];
  const answers = useMemo(() => {
    if (!quiz?.correct_answer) return [];

    return shuffle([...quiz?.incorrect_answers, quiz?.correct_answer]);
  }, [quiz]);

  const handleAnswerChoosing = useCallback(
    (answer: string) => {
      if (selectedAnswer) return;

      if (answer === quiz?.correct_answer) {
        increaseCorrectQuestionQuantity();
      }

      setSelectedAnswer(answer);

      if (index === length) {
        navigation.navigate('Results');
      }
    },
    [setSelectedAnswer, selectedAnswer]
  );

  const rButtonStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [1, 0.5, 1],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ scale }],
    };
  });

  const rContainerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      inputRange,
      [1, 0.2, 1],
      Extrapolate.CLAMP
    );

    return {
      // opacity,
    };
  });

  return (
    <Animated.View style={[styles.container, rContainerStyle]}>
      <QuizInfo quiz={quiz} length={length} index={index} />

      <QuizCheckboxes
        answers={answers}
        correctAnswer={quiz?.correct_answer}
        selectedAnswer={selectedAnswer}
        handleAnswerChoosing={handleAnswerChoosing}
      />

      <Spacer type="medium" />

      <Animated.View style={[rButtonStyle]}>
        <Button
          title="შემდეგი"
          color={Colors.primaryMedium}
          size={22}
          onPress={onNextSlideClickHandler}
          style={{ alignSelf: 'center' }}
        />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: PAGE_HEIGHT,
    width: PAGE_WIDTH,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
});

export default Quiz;
