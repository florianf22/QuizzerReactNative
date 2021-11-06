import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Feather } from '@expo/vector-icons';
//
import Colors from '../constants/Colors';
import Spacer from './Spacer';

interface QuizCheckboxesProps {
  answers: string[];
  correctAnswer: string;
  selectedAnswer: string;
  handleAnswerChoosing: (answer: string) => void;
}

const QuizCheckboxes: React.FC<QuizCheckboxesProps> = ({
  answers,
  correctAnswer,
  selectedAnswer,
  handleAnswerChoosing,
}) => {
  const determineColor = (answer: string): string => {
    if (answer === selectedAnswer && selectedAnswer === correctAnswer) {
      return Colors.accentGreen;
    } else if (answer === selectedAnswer && selectedAnswer !== correctAnswer) {
      return Colors.accentPurple;
    }

    return Colors.primaryMedium;
  };

  const determineIconComponent = (answer: string): JSX.Element | null => {
    if (answer === selectedAnswer && selectedAnswer === correctAnswer) {
      return <Feather name="check" size={16} color="#fff" />;
    } else if (answer === selectedAnswer && selectedAnswer !== correctAnswer) {
      return <Feather name="x" size={16} color="#fff" />;
    }

    return null;
  };

  return (
    <SafeAreaView>
      {answers.map(answer => (
        <View key={answer}>
          <BouncyCheckbox
            size={28}
            fillColor={determineColor(answer)}
            unfillColor={Colors.primary}
            text={answer}
            iconStyle={[
              styles.iconStyleCheckbox,
              { borderColor: determineColor(answer) },
            ]}
            iconComponent={determineIconComponent(answer)}
            textStyle={styles.textStyleCheckbox}
            style={[
              styles.wrapperStyleCheckbox,
              { borderColor: determineColor(answer) },
            ]}
            onPress={() => handleAnswerChoosing(answer)}
            isChecked={selectedAnswer === answer}
            disableBuiltInState
          />
          <Spacer margin={7} />
        </View>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapperStyleCheckbox: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.primaryMedium,
    paddingVertical: 8,
    paddingLeft: 15,
    borderRadius: 10,
  },
  iconStyleCheckbox: {
    borderColor: Colors.primaryMedium,
  },
  textStyleCheckbox: {
    textDecorationLine: 'none',
    fontFamily: 'MtavruliBold',
    transform: [{ translateY: 3 }],
    fontSize: 21,
  },
});

export default QuizCheckboxes;
