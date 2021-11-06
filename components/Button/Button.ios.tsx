import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import Colors from '../../constants/Colors';
//
import Text from '../Text';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  size?: number;
  color?: string;
}

const Button: React.FC<ButtonProps> = props => {
  return (
    <TouchableOpacity {...props} style={props.style}>
      <View
        style={[
          styles.container,
          { borderColor: props.color || Colors.accentGreen },
          props.style,
        ]}
      >
        <Text
          style={[
            styles.text,
            { fontSize: props.size, color: props.color || Colors.accentGreen },
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
  },
  text: {
    fontSize: 18,
    // The text seems moved up a bit. font being weird
    transform: [{ translateY: 3 }],
  },
});

export default Button;
