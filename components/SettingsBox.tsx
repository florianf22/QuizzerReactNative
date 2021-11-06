import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
//
import Spacer from './Spacer';
import Input from './Input';
import Colors from '../constants/Colors';
import { useTypedSelector } from '../hooks/useTypedSelector';

const inputs = [
  { name: 'username', displayName: 'სახელი' },
  { name: 'email', displayName: 'ელ-ფოსტა' },
] as const;

interface SettingsBoxProps {}

const SettingsBox: React.FC<SettingsBoxProps> = () => {
  const navigation = useNavigation();
  const { user } = useTypedSelector(state => state.auth);

  const navigateToPasswordChange = (): void => {
    navigation.navigate('ChangePassword');
  };

  return (
    <>
      <Image source={require('../assets/user.png')} style={styles.image} />

      <Spacer type="big" />

      {inputs.map(({ name, displayName }, idx) => (
        <Input
          key={idx}
          placeholder={Colors.primaryLight}
          value={user![name]}
          editable={false}
          style={styles.input}
        />
      ))}

      <TouchableOpacity
        style={styles.touchable}
        onPress={navigateToPasswordChange}
      >
        <Text style={styles.text}>შეცვალეთ პაროლი</Text>
        <AntDesign
          name="arrowright"
          size={20}
          color={Colors.accentPurple}
          style={{ transform: [{ translateX: 30 }] }}
        />
      </TouchableOpacity>

      <Spacer type="big" />
    </>
  );
};

const styles = StyleSheet.create({
  touchable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderColor: Colors.accentPurple,
    borderWidth: 1,
    width: '70%',
    borderRadius: 20,
  },
  text: {
    fontSize: 18,
    color: Colors.accentPurple,
  },
  image: {
    // bad image
    transform: [{ translateX: 15 }],
  },
  input: {
    color: Colors.primaryLight,
  },
});

export default SettingsBox;
