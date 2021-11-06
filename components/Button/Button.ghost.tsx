import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import Colors from '../../constants/Colors';
import Text from '../Text';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  size?: number;
  color?: string;
}

const Button: React.FC<ButtonProps> = props => {
  return (
    <TouchableOpacity
      {...props}
      style={[
        props.style,
        styles.container,
        { borderColor: props.color || Colors.accentGreen },
      ]}
    >
      <Text
        style={[
          {
            color: props.color || Colors.accentGreen,
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
  },
  text: {
    transform: [{ translateY: 3 }],
  },
});

export default Button;
