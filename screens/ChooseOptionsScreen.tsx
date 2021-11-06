import React, { useCallback, useEffect, useMemo } from 'react';
import { useFormik } from 'formik';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { BarIndicator } from 'react-native-indicators';
//
import Button from '../components/Button';
import PickerCustom from '../components/PickerCustom';
import Spacer from '../components/Spacer';
import Splash from '../components/Splash';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import Colors from '../constants/Colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../navigation/types';

type NavProps = NativeStackScreenProps<MainStackParamList, 'ChooseOptions'>;

interface ChooseOptionsScreenProps {}

const ChooseOptionsScreen: React.FC<ChooseOptionsScreenProps & NavProps> = ({
  navigation,
}) => {
  const { fetchCategories, fetch } = useActions();
  const { categories, types, difficulties, quantities, loading, quizzes } =
    useTypedSelector(state => state.quizzes);

  const inputs = useMemo(
    () => [
      { displayName: 'რაოდონება', name: 'quantity', collection: quantities },
      { displayName: 'სირთულე', name: 'difficulty', collection: difficulties },
      { displayName: 'კატეგორია', name: 'category', collection: categories },
      { displayName: 'ტიპი', name: 'type', collection: types },
    ],
    [quantities, difficulties, categories, types]
  );

  const navigate = useCallback(() => {
    navigation.navigate('Quizzes');
  }, [navigation]);

  const formik = useFormik({
    initialValues: {
      quantity: quantities[0].id,
      difficulty: difficulties[0].id,
      category: categories[0]?.id || '',
      type: types[0].id,
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
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    //   TODO:
    // error handling, some things can go wrong
  }, []);

  if (loading) {
    return (
      <View style={styles.indicatorWrapper}>
        <BarIndicator size={45} color={Colors.primaryLight} />
      </View>
    );
  }

  return (
    <Splash>
      <SafeAreaView>
        {inputs.map(({ name, displayName, collection }) => (
          <PickerCustom
            key={name}
            data={collection}
            title={
              // @ts-ignore
              collection.find(c => c.id === formik.values[name])?.name ||
              displayName
            }
            // @ts-ignore
            selectedValue={formik.values[name]}
            onValueChange={(_, i) => {
              formik.setFieldValue(name, collection[i].id);
              formik.setFieldTouched(name, true, false);
            }}
          />
        ))}
      </SafeAreaView>

      <Spacer type="big" />
      <Button title="დაწყება" size={22} onPress={() => formik.handleSubmit()} />
    </Splash>
  );
};

const styles = StyleSheet.create({
  indicatorWrapper: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});

export default ChooseOptionsScreen;
