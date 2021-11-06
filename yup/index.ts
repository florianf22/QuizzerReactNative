import * as Yup from 'yup';

export const registerValidationSchema = Yup.object({
  username: Yup.string().required('აუცილებელია სახელის მითითება'),
  password: Yup.string()
    .min(6, 'პაროლი უნდა შედგებოდეს მინიმუმ 6 სიმბოლოსგან')
    .required('აუცილებელია პაროლის მითითება'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'პაროლები უნდა დაემთხვეს ერთმანეთს')
    .required('აუცილებელია განმეორებითი პაროლის მითითება'),
  email: Yup.string()
    .email('გთხოვთ, მიუთითოთ სწორი მისამართი')
    .required('აუცილებელია ელ-ფოსტის მითითება'),
});

export const loginValidationSchema = Yup.object({
  password: Yup.string()
    .min(6, 'პაროლი უნდა შედგებოდეს მინიმუმ 6 სიმბოლოსგან')
    .required('აუცილებელია პაროლის მითითება'),
  email: Yup.string()
    .email('გთხოვთ, მიუთითოთ სწორი მისამართი')
    .required('აუცილებელია ელ-ფოსტის მითითება'),
});

export const changePasswordValidationSchema = Yup.object({
  currentPassword: Yup.string()
    .min(6, 'პაროლი უნდა შედგებოდეს მინიმუმ 6 სიმბოლოსგან')
    .required('აუცილებელია არსებული პაროლის მითითება'),
  newPassword: Yup.string()
    .min(6, 'პაროლი უნდა შედგებოდეს მინიმუმ 6 სიმბოლოსგან')
    .required('აუცილებელია ახალი პაროლის მითითება'),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'პაროლები უნდა დაემთხვეს ერთმანეთს')
    .required('აუცილებელია განმეორებითი პაროლის მითითება'),
});
