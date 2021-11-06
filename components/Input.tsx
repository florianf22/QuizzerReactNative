import React from 'react';
import {
  TextInput,
  StyleSheet,
  TextInputProps,
  TextStyle,
  StyleProp,
} from 'react-native';
//
import Spacer from './Spacer';
import Text from './Text';
import Colors from '../constants/Colors';
import { PAGE_WIDTH } from '../constants/Dimensions';

interface InputProps extends TextInputProps {
  touched?: boolean;
  errorMsg?: string;
}

const Input: React.FC<InputProps> = props => {
  return (
    <>
      <TextInput
        {...props}
        style={[styles.input, props.style]}
        placeholderTextColor={Colors.primaryLight}
      />
      {props.touched && props.errorMsg ? (
        <Text style={styles.error}>{props.errorMsg}</Text>
      ) : null}
      <Spacer margin={10} />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    minWidth: PAGE_WIDTH * 0.8,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.primaryLight,
    fontFamily: 'MtavruliBold',
    color: '#fff',
    fontSize: 18,
  },
  error: {
    color: '#d69393',
    marginTop: 5,
    transform: [{ translateY: 3 }],
    maxWidth: PAGE_WIDTH * 0.7,
    alignSelf: 'flex-start',
  },
});

export default Input;
