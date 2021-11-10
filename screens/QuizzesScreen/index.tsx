import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect } from 'react';
import { ScrollView } from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import Quiz from '../../components/Quiz';
import Splash from '../../components/Splash';
import { PAGE_WIDTH } from '../../constants/Dimensions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { MainStackParamList } from '../../navigation/types';
import styles from './styles';

type NavProps = NativeStackScreenProps<MainStackParamList, 'Quizzes'>;

interface QuizzesScreenProps {}

const QuizzesScreen: React.FC<QuizzesScreenProps & NavProps> = ({ route }) => {
  const { quizzes } = useTypedSelector(state => state.quizzes);
  const translateX = useSharedValue(0);
  const scrollViewRef = useAnimatedRef<ScrollView>();
  const { showOnly } = route.params;

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

  useEffect(() => {
    scrollViewRef.current?.scrollTo({ x: 0 });
  }, [route]);

  return (
    <Splash style={styles.container} hideLogo>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef as any}
        scrollEnabled={false}
      >
        {quizzes.map((quiz, idx) => (
          <Quiz
            key={idx}
            quiz={quiz}
            index={idx}
            length={quizzes.length}
            onNextSlideClickHandler={onNextSlideClickHandler}
            translateX={translateX}
            showOnly={showOnly}
          />
        ))}
      </Animated.ScrollView>
    </Splash>
  );
};

export default QuizzesScreen;
