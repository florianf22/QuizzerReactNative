import React, { useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/core';
//
import { PAGE_WIDTH, PAGE_HEIGHT } from '../constants/Dimensions';
import { Quiz as QuizType } from '../models/Quiz';
import { shuffle } from '../utils/index';
import QuizInfo from './QuizInfo';
import QuizCheckboxes from './QuizCheckboxes';
import Text from './Text';
import Spacer from './Spacer';
import { useActions } from '../hooks/useActions';
import AnimatedNextButton from './AnimatedNextButton';
import { useTranslation } from 'react-i18next';

interface QuizProps {
  quiz: QuizType;
  index: number;
  length: number;
  onNextSlideClickHandler: () => void;
  translateX: Animated.SharedValue<number>;
  showOnly: boolean;
}

const Quiz: React.FC<QuizProps> = ({
  quiz,
  index,
  length,
  onNextSlideClickHandler,
  translateX,
  showOnly,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [touched, setTouched] = useState(false);
  const { increaseCorrectQuestionQuantity, addAnswer, addEndTime } =
    useActions();
  const navigation = useNavigation();
  const { t } = useTranslation('QuizzesScreen');

  const answers = useMemo(() => {
    if (!quiz?.correct_answer) return [];

    return shuffle([...quiz?.incorrect_answers, quiz?.correct_answer]);
  }, [quiz]);

  const handleAnswerChoosing = (): void => {
    if (!selectedAnswer) return setTouched(true);

    onNextSlideClickHandler();

    if (selectedAnswer === quiz?.correct_answer && !showOnly) {
      increaseCorrectQuestionQuantity();
    }

    addAnswer(selectedAnswer);

    if (index + 1 === length) {
      addEndTime();
      navigation.navigate('Results');
    }
  };

  return (
    <Animated.View style={[styles.container]}>
      <QuizInfo quiz={quiz} length={length} index={index} />

      <QuizCheckboxes
        answers={answers}
        correctAnswer={quiz?.correct_answer}
        selectedAnswer={selectedAnswer}
        setSelectedAnswer={setSelectedAnswer}
        showOnly={showOnly}
      />
      {!selectedAnswer && touched && (
        <Text style={styles.error}>{t('chooseAnswer')}</Text>
      )}

      <Spacer type="medium" />

      <AnimatedNextButton
        translateX={translateX}
        index={index}
        handleAnswerChoosing={handleAnswerChoosing}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: PAGE_HEIGHT,
    width: PAGE_WIDTH,
    padding: 20,
    justifyContent: 'center',
  },
  error: {
    color: '#d69393',
    fontSize: 16,
  },
});

export default Quiz;
