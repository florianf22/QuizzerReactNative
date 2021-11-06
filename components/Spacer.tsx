import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface PrimarySpaceProps {
  type: 'small' | 'medium' | 'big';
  margin?: never;
}

interface SecondarySpacerProps {
  type?: never;
  margin: number;
}

const Spacer: React.FC<PrimarySpaceProps | SecondarySpacerProps> = ({
  type,
  margin,
}) => {
  if (margin) {
    return <View style={{ marginVertical: margin }} />;
  }

  let marginVertical: number = 0;
  switch (type) {
    case 'small': {
      marginVertical = 5;
      break;
    }
    case 'medium': {
      marginVertical = 10;
      break;
    }
    case 'big': {
      marginVertical = 15;
      break;
    }
    default:
      break;
  }

  return <View style={{ marginVertical }} />;
};

const styles = StyleSheet.create({});

export default Spacer;
