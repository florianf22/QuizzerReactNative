import React from 'react';
import {
  View,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
} from 'react-native';
//
import Colors from '../../constants/Colors';
import { PAGE_WIDTH } from '../../constants/Dimensions';
import useColors from '../../hooks/useColors';
import Text from '../Text';

interface ButtonProps extends TouchableNativeFeedbackProps {
  title: string;
  size?: number;
  color?: string;
}

const Button: React.FC<ButtonProps> = props => {
  const colors = useColors();
  return (
    <TouchableNativeFeedback {...props}>
      <View
        style={[
          styles.wrapper,
          { backgroundColor: props.color || colors.accentGreen },
          props.style,
        ]}
      >
        <View>
          <Text style={[styles.text, { fontSize: props.size }]}>
            {props.title}
          </Text>
        </View>
        <View style={[styles.bubble, styles.bubbleBigTop]} />
        <View style={[styles.bubble, styles.bubbleSmallCenter]} />
        <View style={[styles.bubble, styles.bubbleHugeBottom]} />
      </View>
    </TouchableNativeFeedback>
  );
};

const BIG_BUBBLE_SIZE = 45;
const SMALL_BUBBLE_SIZE = 12;
const HUGE_BUBBLE_SIZE = 90;

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    minWidth: PAGE_WIDTH * 0.3,
    alignItems: 'center',
    overflow: 'hidden',
  },
  text: {
    color: '#fff',
    fontSize: 19,
    letterSpacing: 2,
    // The text seems moved up a bit. font being weird
    transform: [{ translateY: 3 }],
  },
  bubble: {
    backgroundColor: 'rgba(256, 256, 256, 0.2)',
    position: 'absolute',
    // does the zIndex job
    elevation: -1,
  },
  bubbleBigTop: {
    width: BIG_BUBBLE_SIZE,
    height: BIG_BUBBLE_SIZE,
    borderRadius: BIG_BUBBLE_SIZE / 2,
    left: 0,
    top: -BIG_BUBBLE_SIZE / 2,
  },
  bubbleSmallCenter: {
    width: SMALL_BUBBLE_SIZE,
    height: SMALL_BUBBLE_SIZE,
    borderRadius: SMALL_BUBBLE_SIZE / 2,
    left: '35%',
    bottom: SMALL_BUBBLE_SIZE / 2,
  },
  bubbleHugeBottom: {
    width: HUGE_BUBBLE_SIZE,
    height: HUGE_BUBBLE_SIZE,
    borderRadius: HUGE_BUBBLE_SIZE / 2,
    right: -20,
    bottom: -HUGE_BUBBLE_SIZE / 2,
  },
});

export default Button;
