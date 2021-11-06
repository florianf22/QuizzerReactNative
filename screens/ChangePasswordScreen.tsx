import React, { useEffect, useRef } from 'react';
import { Settings, StyleSheet, View } from 'react-native';
import { useFormik } from 'formik';
import Modal from 'react-native-modal';
//
import { changePasswordValidationSchema as validationSchema } from '../yup';
import Splash from '../components/Splash';
import Input from '../components/Input';
import Text from '../components/Text';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import Button from '../components/Button';
import Spacer from '../components/Spacer';

const inputs = [
  { name: 'currentPassword', displayName: 'ახლანდელი პაროლ' },
  { name: 'newPassword', displayName: 'ახალი პაროლი' },
  { name: 'confirmNewPassword', displayName: 'დაადასტურეთ პაროლი' },
] as const;

interface ChangePasswordScreenProps {}

const ChangePasswordScreen: React.FC<ChangePasswordScreenProps> = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const { changePassword } = useActions();
  const { user } = useTypedSelector(state => state.auth);
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

  const onPressHandler = (val: string, name: string): void => {
    formik.setFieldValue(name, val);
    formik.setFieldTouched(name, true, false);
  };

  return (
    <Splash hideLogo>
      {inputs.map(({ name, displayName }, idx) => (
        <Input
          key={idx}
          placeholder={displayName}
          value={formik.values[name]}
          onChangeText={val => onPressHandler(val, name)}
          touched={formik.touched[name]}
          errorMsg={formik.errors[name]}
        />
      ))}

      <Spacer type="medium" />

      <Button
        title="შეცვალეთ პაროლი"
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
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  modalInnerContainer: {
    height: 100,
    width: '100%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalInnerText: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default ChangePasswordScreen;
