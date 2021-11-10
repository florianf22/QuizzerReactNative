import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useTypedSelector } from '../../hooks/useTypedSelector';

interface UserSettingsProps {}

const UserSettings: React.FC<UserSettingsProps> = () => {
  const { user } = useTypedSelector(state => state.auth);

  return (
    <View>
      <Text>{user!.username}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default UserSettings;
