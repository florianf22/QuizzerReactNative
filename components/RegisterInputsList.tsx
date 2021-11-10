import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { FormikValues } from 'formik';
//
import Input from './Input';
import { useTranslation } from 'react-i18next';

interface RegisterInputsListProps {
  formik: FormikValues;
}

const RegisterInputsList: React.FC<RegisterInputsListProps> = ({ formik }) => {
  const { t } = useTranslation('RegisterScreen');

  const inputs = [
    { name: 'username', displayName: t('name') },
    { name: 'password', displayName: t('password') },
    { name: 'passwordConfirm', displayName: t('passwordConfirm') },
    { name: 'email', displayName: t('email') },
  ];

  const onPressHandler = (val: string, name: string): void => {
    formik.setFieldValue(name, val);
    formik.setFieldTouched(name, true, false);
  };

  return (
    <>
      {/* this could take some refactoring */}
      {inputs.map(({ name, displayName }, idx) => (
        <Input
          key={idx}
          placeholder={displayName}
          value={formik.values[name as keyof typeof formik.values]}
          onChangeText={val => onPressHandler(val, name)}
          touched={formik.touched[name as keyof typeof formik.touched]}
          errorMsg={formik.errors[name as keyof typeof formik.errors]}
          secure={name.includes('password')}
          autoCapitalize="none"
          autoCorrect={false}
        />
      ))}
    </>
  );
};

const styles = StyleSheet.create({});

export default RegisterInputsList;
