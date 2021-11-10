import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
//
import Text from './Text';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useColors from '../hooks/useColors';

interface LanguageChangerProps {}

const LanguageChanger: React.FC<LanguageChangerProps> = () => {
  const { t } = useTranslation('general');
  const colors = useColors();

  const handleChangeLanguage = () => {
    i18next.changeLanguage(i18next.language === 'en' ? 'ka' : 'en');
  };

  return (
    <View style={styles.wrapper}>
      <Text style={{ color: colors.primaryLight }}>{t('changeLanguage')}</Text>
      <TouchableOpacity
        onPress={handleChangeLanguage}
        style={{
          borderBottomWidth: 1,
          borderBottomColor: colors.primaryLight,
        }}
      >
        <Text
          style={{
            color: colors.primaryLight,
            fontSize: 14,
          }}
        >
          {t('here')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {},
});

export default LanguageChanger;
