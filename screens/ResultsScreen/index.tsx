import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import i18next from 'i18next';
//
import Splash from '../../components/Splash';
import Text from '../../components/Text';
import ResultsBox from '../../components/ResultsBox';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Spacer from '../../components/Spacer';
import Button from '../../components/Button';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import styles from './styles';
import useColors from '../../hooks/useColors';
import { useTranslation } from 'react-i18next';
import { PAGE_WIDTH } from '../../constants/Dimensions';

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

      <View
        style={[
          styles.buttonsWrapper,
          { flexDirection: i18next.language === 'en' ? 'row' : 'column' },
        ]}
      >
        <Button
          title={t('retake')}
          size={22}
          color={colors.primaryMediumDarker}
          style={[
            styles.button,
            {
              width:
                i18next.language === 'en'
                  ? PAGE_WIDTH * 0.35
                  : PAGE_WIDTH * 0.6,
            },
          ]}
          onPress={handleStart}
        />

        {Platform.OS === 'android' && <Spacer type="medium" />}

        <Button
          title={t('next')}
          size={22}
          color={colors.primaryMediumDarker}
          style={[
            styles.button,
            {
              width:
                i18next.language === 'en'
                  ? PAGE_WIDTH * 0.35
                  : PAGE_WIDTH * 0.6,
            },
          ]}
          onPress={handleRestart}
        />
      </View>
    </Splash>
  );
};

export default ResultsScreen;
