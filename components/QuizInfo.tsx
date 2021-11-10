import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
//
import { parser } from '../utils';
import { Quiz } from '../models/Quiz';
import Text from './Text';
import Spacer from './Spacer';
import useColors from '../hooks/useColors';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from '../hooks/useTypedSelector';

interface QuizInfoProps {
  quiz: Quiz;
  index: number;
  length: number;
}

const QuizInfo: React.FC<QuizInfoProps> = ({ quiz, index, length }) => {
  const colors = useColors();
  const { t } = useTranslation('QuizzesScreen');
  const {
    options: { difficulties },
  } = useTypedSelector(state => state.quizzes);

  return (
    <>
      <View
        style={[styles.wordDifficulty, { borderColor: colors.primaryLight }]}
      >
        <Text style={[styles.textDifficulty, { color: colors.text }]}>
          {t('questionDifficulty')}:{' '}
          {difficulties.find(d => d.id.toLowerCase() == quiz.difficulty)?.name}
        </Text>

        <Entypo name="thermometer" size={22} color={colors.primaryLight} />
      </View>

      <Spacer type="big" />

      <Text style={[styles.textProgress, { color: colors.primaryLight }]}>
        {t('question')} {index + 1} / {length}
      </Text>

      <Spacer type="big" />

      <Text style={[styles.textQuestion, { color: colors.text }]}>
        {parser(quiz?.question)}
      </Text>

      <Spacer type="big" />
    </>
  );
};

const styles = StyleSheet.create({
  wordDifficulty: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textDifficulty: {
    fontSize: 17,
    transform: [{ translateY: 3 }],
  },
  textProgress: {
    fontSize: 20,
  },
  textQuestion: {
    fontSize: 16,
  },
});

export default QuizInfo;
