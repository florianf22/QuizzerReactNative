import React, { useCallback } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import Svg, { SvgProps, Path, G, Circle } from 'react-native-svg';

interface SvgPropsCustom {
  switchPositionY: Animated.SharedValue<number>;
  colorSharedValue: Animated.SharedValue<number>;
  scrollValue: number;
  saveTheme: () => Promise<void>;
}

const SvgComponent: React.FC<SvgProps & SvgPropsCustom> = props => {
  const rStyled = useAnimatedStyle(() => {
    // const backgroundColor = interpolateColor(
    //   props.colorSharedValue.value,
    //   [0, 1],
    //   ['#2196f3', '#607d8b']
    // );

    return {
      transform: [{ translateY: props.switchPositionY.value }],
    };
  });

  const handleSwitchMove = useCallback(() => {
    props.switchPositionY.value = withTiming(
      props.switchPositionY.value === 0 ? props.scrollValue : 0,
      {
        duration: 300,
      }
    );
    props.saveTheme();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={handleSwitchMove}>
      <Svg
        // xmlns="http://www.w3.org/2000/svg"
        width={123.717}
        height={113.407}
        {...props}
      >
        <Path
          data-name="Path 12"
          d="M7.722 0h108.272a7.722 7.722 0 017.722 7.722v97.963a7.722 7.722 0 01-7.722 7.722H7.722A7.722 7.722 0 010 105.685V7.722A7.722 7.722 0 017.722 0z"
          fill="#cfd8dc"
          stroke="#000"
          strokeWidth={2}
        />
        <Path
          data-name="Path 13"
          d="M59.008 68.436l-7.732-15.465a2.546 2.546 0 00-2.9-1.356 2.577 2.577 0 00-1.985 2.51v25.779a2.577 2.577 0 001.763 2.448 2.693 2.693 0 00.815.129 2.577 2.577 0 002.062-1.031l7.732-10.31a2.577 2.577 0 00.245-2.704z"
          fill="#2196f3"
          stroke="#000"
          strokeWidth={2}
        />
        <G
          data-name="Group 18"
          transform="translate(10.31 10.31)"
          fill="#607d8b"
          stroke="#000"
          strokeWidth={2}
        >
          <Circle data-name="Ellipse 13" cx={7.732} cy={7.732} r={7.732} />
          <Circle
            data-name="Ellipse 14"
            cx={7.732}
            cy={7.732}
            r={7.732}
            transform="translate(87.632)"
          />
          <Circle
            data-name="Ellipse 15"
            cx={7.732}
            cy={7.732}
            r={7.732}
            transform="translate(87.632 77.323)"
          />
          <Circle
            data-name="Ellipse 16"
            cx={7.732}
            cy={7.732}
            r={7.732}
            transform="translate(0 77.323)"
          />
        </G>
        <Animated.View style={rStyled}>
          <Svg width={123.717} height={113.407}>
            <Path
              data-name="Path 14"
              d="M82.478 69.591a2.433 2.433 0 01-.515 1.546l-7.732 10.31a2.47 2.47 0 01-2.062 1.031h-23.2a2.578 2.578 0 01-2.062-4.124l6.547-8.763z"
              fill="#1e88e5"
              stroke="#000"
              strokeWidth={2}
            />
            <Path
              data-name="Path 15"
              d="M53.456 69.59l.206-.258-7.011-14.073a2.629 2.629 0 01.1-2.474 2.681 2.681 0 012.216-1.237h25.774a2.505 2.505 0 012.423 1.753l5.155 15.465a2.332 2.332 0 01.155.825H53.456z"
              fill="#64b5f6"
              stroke="#000"
              strokeWidth={2}
            />
          </Svg>
        </Animated.View>
        <Path
          data-name="Path 16"
          d="M74.746 25.774H48.972a2.578 2.578 0 00-2.578 2.578v25.774h30.929V28.352a2.578 2.578 0 00-2.577-2.578z"
          fill="#2196f3"
          stroke="#000"
          strokeWidth={2}
        />
        <Path
          data-name="Path 16"
          d="M74.746 25.774H48.972a2.578 2.578 0 00-2.578 2.578v25.774h30.929V28.352a2.578 2.578 0 00-2.577-2.578z"
          fill="#2196f3"
          translateY={28}
          stroke="#000"
          strokeWidth={2}
        />
        <Path
          data-name="Path 17"
          d="M72.168 82.474h-23.2a2.578 2.578 0 01-2.574-2.574V28.352a2.578 2.578 0 012.578-2.578h25.774a2.578 2.578 0 012.578 2.578v25.357l5.02 15.065a2.578 2.578 0 01-.382 2.361l-7.732 10.31a2.578 2.578 0 01-2.062 1.029zm-20.62-5.155h19.331l6.15-8.2-4.727-14.181a2.578 2.578 0 01-.134-.815v-23.2H51.549z"
        />
        <Path
          data-name="Path 18"
          d="M48.972 82.482a2.578 2.578 0 01-2.062-4.124l6.773-9.036-7.016-14.04a2.577 2.577 0 012.3-3.732h25.779a2.578 2.578 0 010 5.155h-21.6l5.866 11.733a2.577 2.577 0 01-.242 2.7l-7.732 10.31a2.577 2.577 0 01-2.066 1.034z"
        />
        <Path
          data-name="Path 19"
          d="M79.9 72.168H56.7a2.578 2.578 0 010-5.155h23.2a2.578 2.578 0 010 5.155z"
        />
        <Path
          data-name="Path 20"
          d="M115.984 113.407H7.732A7.732 7.732 0 010 105.675V7.732A7.732 7.732 0 017.732 0h108.252a7.732 7.732 0 017.732 7.732v97.942a7.732 7.732 0 01-7.732 7.733zM7.732 5.155a2.578 2.578 0 00-2.578 2.578v97.942a2.578 2.578 0 002.578 2.578h108.252a2.578 2.578 0 002.578-2.578V7.732a2.578 2.578 0 00-2.578-2.578H7.732z"
        />
        <Path
          data-name="Path 21"
          d="M18.043 25.775a7.732 7.732 0 117.732-7.732 7.732 7.732 0 01-7.732 7.732zm0-10.31a2.578 2.578 0 102.577 2.578 2.578 2.578 0 00-2.577-2.578z"
        />
        <Path
          data-name="Path 22"
          d="M105.674 25.775a7.732 7.732 0 117.732-7.732 7.732 7.732 0 01-7.732 7.732zm0-10.31a2.578 2.578 0 102.578 2.578 2.578 2.578 0 00-2.578-2.578z"
        />
        <Path
          data-name="Path 23"
          d="M105.674 103.098a7.732 7.732 0 117.732-7.732 7.732 7.732 0 01-7.732 7.732zm0-10.31a2.578 2.578 0 102.578 2.577 2.578 2.578 0 00-2.578-2.577z"
        />
        <Path
          data-name="Path 24"
          d="M18.043 103.098a7.732 7.732 0 117.732-7.732 7.732 7.732 0 01-7.732 7.732zm0-10.31a2.578 2.578 0 102.577 2.577 2.578 2.578 0 00-2.577-2.577z"
        />
      </Svg>
    </TouchableWithoutFeedback>
  );
};

export default SvgComponent;
