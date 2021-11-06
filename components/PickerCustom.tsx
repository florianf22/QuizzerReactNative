import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Picker, PickerProps } from '@react-native-picker/picker';
//
import Colors from '../constants/Colors';
import Text from './Text';
import { PAGE_WIDTH } from '../constants/Dimensions';

interface PickerCustomProps extends PickerProps {
  data: {
    id: string;
    name: string;
  }[];
  title: string;
}

// not working on IOS expo - https://github.com/react-native-picker/picker/issues/341

const PickerCustom: React.FC<PickerCustomProps> = props => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.text}>{props.title}</Text>
      </View>
      <Picker style={styles.picker} {...props}>
        {props.data.length > 0
          ? props.data.map(({ name, id }) => (
              <Picker.Item
                key={name}
                style={styles.item}
                label={name}
                value={id}
              />
            ))
          : null}
      </Picker>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    position: 'relative',
  },
  picker: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    opacity: 0,
  },
  item: {
    fontFamily: 'MtavruliBold',
  },
  wrapper: {
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: Colors.primaryLight,
    width: '100%',
    minWidth: PAGE_WIDTH * 0.8,
  },
  text: {
    color: Colors.primaryLight,
    // textAlign: 'center',
    fontSize: 20,
    transform: [{ translateY: 3 }],
  },
});

export default PickerCustom;
