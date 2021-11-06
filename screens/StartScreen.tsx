import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FontAwesome } from '@expo/vector-icons';
//
import Splash from '../components/Splash';
import Button from '../components/Button';
import { MainStackParamList } from '../navigation/types';
import Colors from '../constants/Colors';
import { useTypedSelector } from '../hooks/useTypedSelector';

type NavProps = NativeStackScreenProps<MainStackParamList, 'Start'>;

interface StartScreenProps {}

const StartScreen: React.FC<StartScreenProps & NavProps> = ({ navigation }) => {
  const { user } = useTypedSelector(state => state.auth);
  const navigateToNextPage = (): void => {
    navigation.navigate('ChooseOptions');
  };

  const navigateToSettings = (): void => {
    navigation.navigate('Settings');
  };

  return (
    <Splash innerStyle={{ alignItems: 'stretch' }}>
      <Button title="დაწყება" size={24} onPress={navigateToNextPage} />

      <TouchableOpacity style={styles.touchable} onPress={navigateToSettings}>
        <FontAwesome name="gear" size={40} color={Colors.primaryLight} />
      </TouchableOpacity>
    </Splash>
  );
};

const styles = StyleSheet.create({
  touchable: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
});

export default StartScreen;
