import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
//
import Splash from '../components/Splash';
import Text from '../components/Text';
import ResultsBox from '../components/ResultsBox';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Spacer from '../components/Spacer';
import Colors from '../constants/Colors';
import { PAGE_WIDTH } from '../constants/Dimensions';
import Button from '../components/Button';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';

interface ResultsScreenProps {}

const ResultsScreen: React.FC<ResultsScreenProps> = () => {
  const { correctQuestionsQuantity } = useTypedSelector(
    state => state.questions
  );
  const { quizzes } = useTypedSelector(state => state.quizzes);
  const { resetCorrectQuestionQuantity } = useActions();
  const navigation = useNavigation();

  const handleRestart = () => {
    resetCorrectQuestionQuantity();
    navigation.navigate('Start');
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
      />

      <Spacer type="big" />

      <TouchableOpacity style={styles.touchable}>
        <Text style={styles.text}>კითხების ნახვა</Text>
        <Feather name="arrow-right" size={22} color={Colors.primaryLight} />
      </TouchableOpacity>

      <Spacer type="big" />

      <View style={styles.buttonsWrapper}>
        <Button
          title="გამეორება"
          size={20}
          color={Colors.primaryMedium}
          style={styles.button}
          onPress={handleRestart}
        />
        <Button
          title="შემდეგი"
          size={20}
          color={Colors.primaryMedium}
          style={[styles.button, { marginLeft: PAGE_WIDTH * 0.05 }]}
        />
      </View>
    </Splash>
  );
};

const styles = StyleSheet.create({
  touchable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minWidth: PAGE_WIDTH * 0.65,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.primaryMediumDarker,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 20,
    color: '#fff',
  },
  button: {
    minWidth: 0,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  buttonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ResultsScreen;
