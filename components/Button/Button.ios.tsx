import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import useColors from '../../hooks/useColors';
//
import Text from '../Text';
import { PAGE_WIDTH } from '../../constants/Dimensions';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  size?: number;
  color?: string;
}

const Button: React.FC<ButtonProps> = props => {
  const colors = useColors();
  return (
    <TouchableOpacity {...props} style={props.style}>
      <View
        style={[
          styles.container,
          { borderColor: props.color || colors.accentGreen },
          props.style,
        ]}
      >
        <Text
          style={[
            styles.text,
            { fontSize: props.size, color: props.color || colors.accentGreen },
          ]}
        >
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderWidth: 1,
    minWidth: PAGE_WIDTH * 0.3,
    marginTop: -10,
  },
  text: {
    fontSize: 18,
    // The text seems moved up a bit. font being weird
    transform: [{ translateY: 3 }],
  },
});

export default Button;
