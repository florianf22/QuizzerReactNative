import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import useColors from '../../hooks/useColors';
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
    <TouchableOpacity
      {...props}
      style={[
        props.style,
        styles.container,
        { borderColor: props.color || colors.accentGreen },
      ]}
    >
      <Text
        style={[
          {
            color: props.color || colors.accentGreen,
            fontSize: props.size || 20,
          },
          styles.text,
        ]}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    minWidth: PAGE_WIDTH * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    transform: [{ translateY: 3 }],
  },
});

export default Button;
