import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
// import { Picker, PickerProps } from '@react-native-picker/picker';
import RNPickerSelect, { PickerSelectProps } from 'react-native-picker-select';
//
import Text from './Text';
import { PAGE_WIDTH } from '../constants/Dimensions';
import useColors from '../hooks/useColors';
import Spacer from './Spacer';

interface PickerCustomProps extends PickerSelectProps {}

const PickerCustom: React.FC<PickerCustomProps> = props => {
  const colors = useColors();

  const placeholder = props.items[0];
  const items = props.items.slice(1);

  return (
    <>
      <RNPickerSelect
        {...props}
        style={{
          placeholder: {
            ...styles.text,
            color: colors.primaryLight,
            fontSize: 18,
          },
          viewContainer: {
            ...styles.container,
            borderColor: colors.primaryLight,
          },
          inputAndroid: {
            color: colors.primaryLight,
            fontSize: 18,
          },
          inputIOS: {
            color: colors.primaryLight,
            borderRadius: 20,
            paddingHorizontal: 15,
            paddingVertical: 15,
            fontSize: 18,
          },
        }}
        items={items}
        placeholder={placeholder}
      />

      <Spacer type="small" />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: PAGE_WIDTH * 0.8,
    borderRadius: 20,
    paddingHorizontal: 15,
    borderWidth: 1,
  },
  // item: {
  //   fontFamily: 'MtavruliBold',
  // },
  text: {
    // textAlign: 'center',
    fontSize: 25,
  },
});

export default PickerCustom;
