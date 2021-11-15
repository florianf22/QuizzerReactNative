import React, { useState } from 'react';
import {
  TextInput,
  StyleSheet,
  TextInputProps,
  View,
  TouchableOpacity,
} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
//
import Spacer from './Spacer';
import Text from './Text';
import { PAGE_WIDTH } from '../constants/Dimensions';
import useColors from '../hooks/useColors';

interface InputProps extends TextInputProps {
  touched?: boolean;
  errorMsg?: string;
  secure?: boolean;
  marginForLists?: number;
}

const Input: React.FC<InputProps> = props => {
  const [showInput, setShotInput] = useState(props.secure);
  const colors = useColors();

  const toggleShowInput = (): void => {
    setShotInput(!showInput);
  };

  return (
    <>
      <View style={styles.wrapper}>
        <TextInput
          {...props}
          style={[
            styles.input,
            { borderColor: colors.primaryLight, color: colors.text },
            props.style,
          ]}
          placeholderTextColor={colors.primaryLight}
          secureTextEntry={showInput}
        />
        {props.secure && (
          <TouchableOpacity style={styles.touchable} onPress={toggleShowInput}>
            <EvilIcons name="eye" size={35} color={colors.primaryLight} />
          </TouchableOpacity>
        )}
      </View>
      {props.touched && props.errorMsg ? (
        <Text style={styles.error}>{props.errorMsg}</Text>
      ) : null}
      <Spacer margin={props.marginForLists || 10} />
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'visible',
  },
  input: {
    width: PAGE_WIDTH * 0.8,
    paddingVertical: 15,
    paddingHorizontal: 20,
    paddingRight: 55,
    borderRadius: 20,
    borderWidth: 1,
    fontFamily: 'MtavruliBold',
    fontSize: 18,
  },
  touchable: {
    position: 'absolute',
    right: 15,
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
