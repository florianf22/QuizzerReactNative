import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
//
import Splash from '../../components/Splash';
import Text from '../../components/Text';
import ResultsBox from '../../components/ResultsBox';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Spacer from '../../components/Spacer';
import { PAGE_WIDTH } from '../../constants/Dimensions';
import Button from '../../components/Button';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import styles from './styles';
import useColors from '../../hooks/useColors';
import { calculateMinutesBetweenTwoTimeStamps } from '../../utils';
import { useTranslation } from 'react-i18next';

interface ResultsScreenProps {}

const ResultsScreen: React.FC<ResultsScreenProps> = () => {
  const { correctQuestionsQuantity } = useTypedSelector(
    state => state.questions
  );
  const {
    quizzes: { quizzes },
    timeouts: { startTime, endTime },
  } = useTypedSelector(state => state);
  const { resetCorrectQuestionQuantity, resetUserOptions } = useActions();
  const navigation = useNavigation();
  const colors = useColors();
  const { t } = useTranslation('ResultsScreen');

  const handleStart = () => {
    resetCorrectQuestionQuantity();
    navigation.navigate('ChooseOptions');
  };

  const navigateToQuizzes = () => {
    navigation.navigate('Quizzes', { showOnly: true });
  };

  const handleRestart = (): void => {
    resetCorrectQuestionQuantity();
    resetUserOptions();
    navigation.navigate('ChooseOptions');
  };

  return (
    <Splash hideLogo>
      <ResultsBox
        correctNumberQuantity={correctQuestionsQuantity}
        hardQuestionsQuantity={
          quizzes.filter(quiz => quiz.difficulty === 'hard').length
        }
        mediumQuestionsQuantity={
          quizzes.filter(quiz => quiz.difficulty === 'medium').length
        }
        easyQuestionsQuantity={
          quizzes.filter(quiz => quiz.difficulty === 'easy').length
        }
        seconds={Math.floor(((endTime - startTime) / 1000) % 60)}
        minutes={Math.round(
          (((endTime - startTime) % 86400000) % 3600000) / 60000
        )}
      />

      <Spacer type="big" />

      <TouchableOpacity
        style={[styles.touchable, { borderColor: colors.primaryMediumDarker }]}
        onPress={navigateToQuizzes}
      >
        <Text style={[styles.text, { color: colors.text }]}>
          {t('seeQuestions')}
        </Text>
        <Feather name="arrow-right" size={22} color={colors.primaryLight} />
      </TouchableOpacity>

      <Spacer type="big" />

      <View style={styles.buttonsWrapper}>
        <Button
          title={t('retake')}
          size={22}
          color={colors.primaryMediumDarker}
          style={styles.button}
          onPress={handleStart}
        />
        <Button
          title={t('next')}
          size={22}
          color={colors.primaryMediumDarker}
          style={[styles.button]}
          onPress={handleRestart}
        />
      </View>
    </Splash>
  );
};

export default ResultsScreen;
