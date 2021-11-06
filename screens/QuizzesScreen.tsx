import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import Quiz from '../components/Quiz';
import Spacer from '../components/Spacer';
import Splash from '../components/Splash';
import { PAGE_WIDTH } from '../constants/Dimensions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { MainStackParamList } from '../navigation/types';

type NavProps = NativeStackScreenProps<MainStackParamList, 'Quizzes'>;

interface QuizzesScreenProps {}

const QuizzesScreen: React.FC<QuizzesScreenProps & NavProps> = ({
  navigation,
}) => {
  const { quizzes } = useTypedSelector(state => state.quizzes);
  const translateX = useSharedValue(0);
  const scrollViewRef = useAnimatedRef<ScrollView>();

  const activeIndex = useDerivedValue(() => {
    return Math.round(translateX.value / PAGE_WIDTH);
  });

  const onNextSlideClickHandler = useCallback(() => {
    if (activeIndex.value === quizzes.length - 1 && activeIndex.value === 0) {
      return;
    }

    scrollViewRef.current?.scrollTo({
      x: PAGE_WIDTH * (activeIndex.value + 1),
    });
  }, []);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      translateX.value = event.contentOffset.x;
    },
  });

  return (
    <Splash style={styles.container} hideLogo>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef as any}
      >
        {quizzes.map((quiz, idx) => (
          <Quiz
            key={idx}
            quiz={quiz}
            index={idx + 1}
            length={quizzes.length}
            onNextSlideClickHandler={onNextSlideClickHandler}
            translateX={translateX}
          />
        ))}
      </Animated.ScrollView>

      {/* <Spacer type="big" /> */}
    </Splash>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QuizzesScreen;
