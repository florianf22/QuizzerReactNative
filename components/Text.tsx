import React from 'react';
import { Text, TextProps } from 'react-native';

const TextStyled: React.FC<TextProps> = props => {
  return (
    <Text
      {...props}
      style={[
        props.style,
        {
          fontFamily: 'MtavruliBold',
          letterSpacing: 1.5,
          transform: [{ translateY: 3 }],
        },
      ]}
    >
      {props.children}
    </Text>
  );
};

export default TextStyled;
