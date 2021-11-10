import React, { useCallback, useEffect, useLayoutEffect, useMemo } from 'react';
import { useFormik } from 'formik';
import { SafeAreaView, View } from 'react-native';
import { BarIndicator } from 'react-native-indicators';
//
import Button from '../../components/Button';
import PickerCustom from '../../components/PickerCustom';
import Spacer from '../../components/Spacer';
import Splash from '../../components/Splash';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import styles from './styles';
import useColors from '../../hooks/useColors';
import { useStyledNavigation } from '../../hooks/useStyledNavigation';
import { useTranslation } from 'react-i18next';
import usePopulateQuizzesReducer from '../../hooks/usePopulateQuizzesReducer';

type NavProps = NativeStackScreenProps<MainStackParamList, 'ChooseOptions'>;

interface ChooseOptionsScreenProps {}

const ChooseOptionsScreen: React.FC<ChooseOptionsScreenProps & NavProps> = ({
  navigation,
}) => {
  const { fetchCategories, fetch, addStartTime } = useActions();
  const {
    options: { categories, types, difficulties, quantities },
    loading,
    userOptions,
  } = useTypedSelector(state => state.quizzes);
  const colors = useColors();
  const { t } = useTranslation('ChooseOptionsScreen');
  useStyledNavigation(navigation);
  usePopulateQuizzesReducer();

  const inputs = useMemo(
    () => [
      { displayName: t('quantity'), name: 'quantity', collection: quantities },
      {
        displayName: t('difficulty'),
        name: 'difficulty',
        collection: difficulties,
      },
      { displayName: t('category'), name: 'category', collection: categories },
      { displayName: t('type'), name: 'type', collection: types },
    ],
    [quantities, difficulties, categories, types]
  );

  const navigate = useCallback(() => {
    navigation.navigate('Quizzes', { showOnly: false });
  }, [navigation]);

  const formik = useFormik({
    initialValues: {
      quantity: userOptions.amount.toString(),
      difficulty: userOptions.difficulty,
      category: userOptions.category || '',
      type: userOptions.type,
    },
    onSubmit: values => {
      // refetching on every submit
      fetch(
        +values.quantity,
        values.difficulty,
        values.category,
        values.type,
        navigate
      );
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    //   TODO:
    // error handling, some things can go wrong
  }, []);

  const handleSubmit = (): void => {
    addStartTime();
    formik.handleSubmit();
  };

  if (loading) {
    return (
      <View
        style={[styles.indicatorWrapper, { backgroundColor: colors.primary }]}
      >
        <BarIndicator size={45} color={colors.primaryLight} />
      </View>
    );
  }

  return (
    <Splash>
      <SafeAreaView>
        {inputs.map(({ name, displayName, collection }) => (
          <PickerCustom
            key={name}
            items={collection.map(({ name, id }) => ({
              label: name,
              value: id,
            }))}
            onValueChange={value => {
              formik.setFieldValue(
                name,
                collection.find(d => d.id === value)?.id
              );
              formik.setFieldTouched(name, true, false);
            }}
          />
        ))}
      </SafeAreaView>

      <Spacer type="big" />
      <Button title={t('start')} size={22} onPress={handleSubmit} />
    </Splash>
  );
};

export default ChooseOptionsScreen;
