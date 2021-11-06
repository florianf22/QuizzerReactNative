// not really customizable buttons, for this project
import React from 'react';
import {
  Text,
  Platform,
  TouchableNativeFeedbackProps,
  TouchableOpacityProps,
} from 'react-native';
//
import ButtonAndroid from './Button.android';
import ButtonIOS from './Button.ios';
import ButtonGhost from './Button.ghost';

const ButtonElement = Platform.OS === 'android' ? ButtonAndroid : ButtonIOS;

interface ButtonProps {
  title: string;
  size?: number;
  color?: string;
  ghost?: boolean;
}

const Button: React.FC<
  ButtonProps & TouchableOpacityProps & TouchableNativeFeedbackProps
> = props => {
  if (props.ghost) {
    return <ButtonGhost {...props} />;
  }

  return <ButtonElement {...props} />;
};

export default Button;
