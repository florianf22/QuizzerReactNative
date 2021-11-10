import React, { Suspense, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import i18next from 'i18next';
//
import { store } from './redux';
import AuthFlow from './navigation/AuthFlow';
import MainFlow from './navigation/MainFlow';
import { ThemeContextProvider } from './context/ThemeContext';
import { useTypedSelector } from './hooks/useTypedSelector';
import './i18n/i18n';

const RootNavigator: React.FC = () => {
  const { user } = useTypedSelector(state => state.auth);
  const NavigationFlow = !user ? () => <AuthFlow /> : () => <MainFlow />;

  return (
    <NavigationContainer>
      <NavigationFlow />
    </NavigationContainer>
  );
};

export default function App() {
  const [loaded] = useFonts({
    MtavruliBold: require('./assets/fonts/MtavruliBold.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Suspense fallback="Loading...">
        <ThemeContextProvider>
          <View style={styles.container}>
            <RootNavigator />
          </View>
        </ThemeContextProvider>
      </Suspense>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
