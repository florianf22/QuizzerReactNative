import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
//
import { parser } from '../utils';
import { Quiz } from '../models/Quiz';
import Text from './Text';
import Spacer from './Spacer';
import Colors from '../constants/Colors';

interface QuizInfoProps {
  quiz: Quiz;
  index: number;
  length: number;
}

const QuizInfo: React.FC<QuizInfoProps> = ({ quiz, index, length }) => {
  return (
    <>
      <View style={styles.wordDifficulty}>
        <Text style={styles.textDifficulty}>
          კითხვის სირთულე:{' '}
          {quiz?.difficulty[0].toLocaleUpperCase() + quiz?.difficulty.slice(1)}
        </Text>

        <Entypo name="thermometer" size={22} color={Colors.primaryLight} />
      </View>

      <Spacer type="big" />

      <Text style={styles.textProgress}>
        კითხვა {index} / {length}
      </Text>

      <Spacer type="big" />

      <Text style={styles.textQuestion}>{parser(quiz?.question)}</Text>

      <Spacer type="big" />
    </>
  );
};

const styles = StyleSheet.create({
  wordDifficulty: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: Colors.primaryLight,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textDifficulty: {
    color: '#fff',
    fontSize: 17,
    transform: [{ translateY: 3 }],
  },
  textProgress: {
    fontSize: 20,
    color: Colors.primaryLight,
  },
  textQuestion: {
    color: '#fff',
    fontSize: 16,
  },
});

export default QuizInfo;
