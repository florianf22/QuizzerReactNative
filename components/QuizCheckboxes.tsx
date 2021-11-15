import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Feather } from '@expo/vector-icons';
//
import Spacer from './Spacer';
import useColors from '../hooks/useColors';
import { parser } from '../utils';

interface QuizCheckboxesProps {
  answers: string[];
  correctAnswer: string;
  selectedAnswer: string;
  setSelectedAnswer: (answer: string) => void;
  showOnly: boolean;
}

const QuizCheckboxes: React.FC<QuizCheckboxesProps> = ({
  answers,
  correctAnswer,
  selectedAnswer,
  setSelectedAnswer,
  showOnly,
}) => {
  const colors = useColors();

  const handleShowOnly = (answer: string): void => {
    if (showOnly) return;

    setSelectedAnswer(answer);
  };

  const determineColor = (answer: string): string => {
    if (!showOnly) return colors.primaryMedium;

    if (answer === selectedAnswer && selectedAnswer === correctAnswer) {
      return colors.accentGreen;
    } else if (answer === selectedAnswer && selectedAnswer !== correctAnswer) {
      return colors.accentPurple;
    }

    return colors.primaryMedium;
  };

  const determineIconComponent = (answer: string): JSX.Element | null => {
    if (!showOnly) return null;

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
            unfillColor={colors.primary}
            text={parser(answer)}
            iconStyle={[{ borderColor: determineColor(answer) }]}
            iconComponent={determineIconComponent(answer)}
            textStyle={styles.textStyleCheckbox}
            style={[
              styles.wrapperStyleCheckbox,
              { borderColor: determineColor(answer) },
            ]}
            onPress={() => handleShowOnly(answer)}
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
    paddingVertical: 8,
    paddingLeft: 15,
    borderRadius: 10,
  },
  textStyleCheckbox: {
    textDecorationLine: 'none',
    fontFamily: 'MtavruliBold',
    transform: [{ translateY: 3 }],
    fontSize: 21,
  },
});

export default QuizCheckboxes;
