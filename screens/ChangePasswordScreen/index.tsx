import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { useFormik } from 'formik';
import Modal from 'react-native-modal';
//
import Splash from '../../components/Splash';
import Input from '../../components/Input';
import Text from '../../components/Text';
import { useActions } from '../../hooks/useActions';
import Button from '../../components/Button';
import Spacer from '../../components/Spacer';
import styles from './styles';
import { useStyledNavigation } from '../../hooks/useStyledNavigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import useYup from '../../hooks/useYup';
import { useTranslation } from 'react-i18next';

type NavTypes = NativeStackScreenProps<MainStackParamList, 'ChangePassword'>;

interface ChangePasswordScreenProps {}

const ChangePasswordScreen: React.FC<ChangePasswordScreenProps & NavTypes> = ({
  navigation,
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const { changePassword } = useActions();
  const { changePasswordValidationSchema: validationSchema } = useYup();
  const { t } = useTranslation('ChangePasswordScreen');

  const inputs = [
    { name: 'currentPassword', displayName: t('currentPassword') },
    { name: 'newPassword', displayName: t('newPassword') },
    { name: 'confirmNewPassword', displayName: t('confirmNewPassword') },
  ];

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema,
    onSubmit: values => {
      setModalVisible(true);
      changePassword(values.newPassword);
    },
  });
  useStyledNavigation(navigation);

  const onPressHandler = (val: string, name: string): void => {
    formik.setFieldValue(name, val);
    formik.setFieldTouched(name, true, false);
  };

  return (
    <View style={{ flex: 1 }}>
      <Splash>
        {inputs.map(({ name, displayName }, idx) => (
          <Input
            key={idx}
            placeholder={displayName}
            value={formik.values[name as keyof typeof formik.values]}
            onChangeText={val => onPressHandler(val, name)}
            touched={formik.touched[name as keyof typeof formik.values]}
            errorMsg={formik.errors[name as keyof typeof formik.values]}
            secure
            autoCapitalize="none"
            autoCorrect={false}
          />
        ))}

        <Spacer type="medium" />

        <Button
          title={t('changePassword')}
          size={18}
          onPress={() => formik.handleSubmit()}
        />

        <Modal
          isVisible={modalVisible}
          style={styles.modal}
          animationIn="slideInUp"
        >
          <View style={styles.modalInnerContainer}>
            <Text style={styles.modalInnerText}>
              პაროლი წარმატებით შეიცვალა... 🥷
            </Text>
          </View>
        </Modal>
      </Splash>
    </View>
  );
};

export default ChangePasswordScreen;
