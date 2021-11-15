import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
//
import Spacer from './Spacer';
import Input from './Input';
import Colors from '../constants/Colors';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useUploadImage } from '../hooks/useUploadImage';
import useColors from '../hooks/useColors';
import { PAGE_WIDTH } from '../constants/Dimensions';
import { useTranslation } from 'react-i18next';

const inputs = [{ name: 'username' }, { name: 'email' }] as const;

interface SettingsBoxProps {}

const SettingsBox: React.FC<SettingsBoxProps> = () => {
  const navigation = useNavigation();
  const { user } = useTypedSelector(state => state.auth);
  const { pickImage } = useUploadImage();
  const colors = useColors();
  const { t } = useTranslation('SettingsScreen');

  const navigateToPasswordChange = (): void => {
    navigation.navigate('ChangePassword');
  };

  return (
    <>
      <TouchableOpacity onPress={pickImage} style={styles.imageWrapper}>
        {user?.image ? (
          <Image source={{ uri: user.image }} style={styles.image} />
        ) : (
          <Image source={require('../assets/user.png')} />
        )}
      </TouchableOpacity>

      <Spacer type="medium" />

      {inputs.map(({ name }, idx) => (
        <Input
          key={idx}
          placeholder={colors.primaryLight}
          value={user![name]}
          editable={false}
          style={{ color: colors.primaryLight }}
          marginForLists={5}
        />
      ))}

      <TouchableOpacity
        style={[styles.touchable, { borderColor: colors.accentPurple }]}
        onPress={navigateToPasswordChange}
      >
        <Text style={[styles.text, { color: colors.accentPurple }]}>
          {t('changePassword')}
        </Text>
        <AntDesign name="arrowright" size={20} color={colors.accentPurple} />
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
    borderWidth: 1,
    borderRadius: 20,
    width: PAGE_WIDTH * 0.8,
  },
  text: {
    fontSize: 18,
  },
  imageWrapper: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    height: 150,
    width: 250,
  },
});

export default SettingsBox;
