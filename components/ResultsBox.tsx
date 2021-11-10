import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
//
import Text from './Text';
import Colors from '../constants/Colors';
import Spacer from './Spacer';
import useColors from '../hooks/useColors';
import { PAGE_WIDTH } from '../constants/Dimensions';
import { useTranslation } from 'react-i18next';

interface ResultsBoxProps {
  correctNumberQuantity: number;
  hardQuestionsQuantity: number;
  mediumQuestionsQuantity: number;
  easyQuestionsQuantity: number;
  minutes?: number;
  seconds?: number;
}

const ResultsBox: React.FC<ResultsBoxProps> = ({
  correctNumberQuantity,
  hardQuestionsQuantity,
  mediumQuestionsQuantity,
  easyQuestionsQuantity,
  minutes,
  seconds,
}) => {
  const colors = useColors();
  const { t } = useTranslation('ResultsScreen');

  return (
    <View style={[styles.container, { borderColor: colors.primaryLight }]}>
      <View style={styles.results}>
        <View style={[styles.horizontalSpacer, styles.innerResultsWrapper]}>
          <Text style={[styles.text, { color: colors.primaryLight }]}>
            {t('time')}
          </Text>
          <Text
            style={[
              styles.text,
              { color: colors.primaryLight },
              styles.marginTop,
            ]}
          >
            {`${minutes}:${seconds}`}
          </Text>
        </View>

        <View style={[styles.horizontalSpacer, styles.innerResultsWrapper]}>
          <Text style={[styles.text, { color: colors.primaryLight }]}>
            {t('correct')}
          </Text>

          <View style={[styles.counterContainer, styles.marginTop]}>
            <View
              style={[styles.icon, { backgroundColor: colors.accentGreen }]}
            >
              <Feather name="check" size={18} color="#fff" />
            </View>
            <Text
              style={[
                styles.text,
                { color: colors.primaryLight },
                styles.resultText,
              ]}
            >
              {correctNumberQuantity}
            </Text>
          </View>
        </View>

        <View style={[styles.horizontalSpacer, styles.innerResultsWrapper]}>
          <Text style={[styles.text, { color: colors.primaryLight }]}>
            {t('incorrect')}
          </Text>

          <View style={[styles.counterContainer, styles.marginTop]}>
            <View
              style={[styles.icon, { backgroundColor: colors.accentPurple }]}
            >
              <Feather name="x" size={18} color="#fff" />
            </View>
            <Text
              style={[
                styles.text,
                { color: colors.primaryLight },
                styles.resultText,
              ]}
            >
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
        <Text
          style={[
            styles.text,
            { color: colors.primaryLight },
            { color: colors.primaryMedium },
          ]}
        >
          {t('easy')}: {easyQuestionsQuantity}
        </Text>
        <Spacer type="small" />
        <Text
          style={[
            styles.text,
            { color: colors.primaryLight },
            { color: colors.accentGreen },
          ]}
        >
          {t('medium')}: {mediumQuestionsQuantity}
        </Text>
        <Spacer type="small" />
        <Text
          style={[
            styles.text,
            { color: colors.primaryLight },
            { color: colors.accentPurple },
          ]}
        >
          {t('hard')}: {hardQuestionsQuantity}
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
    alignItems: 'center',
    width: PAGE_WIDTH * 0.8,
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
  },
  marginTop: {
    marginTop: 5,
  },
});

export default ResultsBox;
