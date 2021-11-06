import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
//
import AuthFlow from './navigation/AuthFlow';
import MainFlow from './navigation/MainFlow';
import { useTypedSelector } from './hooks/useTypedSelector';
import { useActions } from './hooks/useActions';

const RootNavigator: React.FC = () => {
  const interval = useRef<number>();
  const { user } = useTypedSelector(state => state.auth);
  const { tryLocalLogin } = useActions();
  const NavigationFlow = !user ? () => <AuthFlow /> : () => <MainFlow />;

  useEffect(() => {
    if (interval) {
      clearInterval(interval.current);
    }
  }, [user]);

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
      <SafeAreaProvider>
        <View style={styles.container}>
          <RootNavigator />
        </View>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
