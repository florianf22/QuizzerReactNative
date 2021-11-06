import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
//
import Text from './Text';
import Colors from '../constants/Colors';
import Spacer from './Spacer';

interface ResultsBoxProps {
  time?: number;
  correctNumberQuantity: number;
  hardQuestionsQuantity: number;
  mediumQuestionsQuantity: number;
  easyQuestionsQuantity: number;
}

const ResultsBox: React.FC<ResultsBoxProps> = ({
  time,
  correctNumberQuantity,
  hardQuestionsQuantity,
  mediumQuestionsQuantity,
  easyQuestionsQuantity,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.results}>
        <View style={[styles.horizontalSpacer, styles.innerResultsWrapper]}>
          <Text style={[styles.text]}>დრო</Text>
          <Text style={[styles.text, styles.marginTop]}>2:11</Text>
        </View>

        <View style={[styles.horizontalSpacer, styles.innerResultsWrapper]}>
          <Text style={[styles.text]}>სწორი</Text>

          <View style={[styles.counterContainer, styles.marginTop]}>
            <View
              style={[styles.icon, { backgroundColor: Colors.accentGreen }]}
            >
              <Feather name="check" size={18} color="#fff" />
            </View>
            <Text style={[styles.text, styles.resultText]}>
              {correctNumberQuantity}
            </Text>
          </View>
        </View>

        <View style={[styles.horizontalSpacer, styles.innerResultsWrapper]}>
          <Text style={[styles.text]}>არასწორი</Text>

          <View style={[styles.counterContainer, styles.marginTop]}>
            <View
              style={[styles.icon, { backgroundColor: Colors.accentPurple }]}
            >
              <Feather name="x" size={18} color="#fff" />
            </View>
            <Text style={[styles.text, styles.resultText]}>
              {hardQuestionsQuantity +
                mediumQuestionsQuantity +
                easyQuestionsQuantity -
                correctNumberQuantity}
            </Text>
          </View>
        </View>
      </View>

      <Spacer type="big" />

      <View style={styles.innerResultsWrapper}>
        <Text style={[styles.text, { color: Colors.primaryMedium }]}>
          მარტივი: {easyQuestionsQuantity}
        </Text>
        <Spacer type="small" />
        <Text style={[styles.text, { color: Colors.accentGreen }]}>
          საშუალო: {mediumQuestionsQuantity}
        </Text>
        <Spacer type="small" />
        <Text style={[styles.text, { color: Colors.accentPurple }]}>
          რთული: {hardQuestionsQuantity}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    paddingHorizontal: 20,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: Colors.primaryLight,
    alignItems: 'center',
  },
  results: {
    flexDirection: 'row',
  },
  horizontalSpacer: {
    marginLeft: 20,
  },
  innerResultsWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resultText: {
    marginLeft: 10,
  },
  icon: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
    width: 20,
    borderRadius: 20,
  },
  text: {
    fontSize: 20,
    color: Colors.primaryLight,
  },
  marginTop: {
    marginTop: 5,
  },
});

export default ResultsBox;
