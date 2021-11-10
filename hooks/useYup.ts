import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

export default () => {
  const { t } = useTranslation('validation');

  const registerValidationSchema = Yup.object({
    username: Yup.string().required(t('required')),
    password: Yup.string().min(6, t('passwordMin')).required(t('required')),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null], t('passwordMatch'))
      .required(t('required')),
    email: Yup.string().email(t('validEmail')).required(t('required')),
  });

  const loginValidationSchema = Yup.object({
    password: Yup.string().min(6, t('passwordMin')).required(t('required')),
    email: Yup.string().email(t('validEmail')).required(t('required')),
  });

  const changePasswordValidationSchema = Yup.object({
    currentPassword: Yup.string()
      .min(6, t('passwordMin'))
      .required(t('required')),
    newPassword: Yup.string().min(6, t('passwordMin')).required(t('required')),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], t('passwordMatch'))
      .required(t('required')),
  });

  return {
    registerValidationSchema,
    loginValidationSchema,
    changePasswordValidationSchema,
  };
};
