import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Spacer from './Spacer';
//
import Text from './Text';

interface FooterProps {
  text: string;
  onNavigate: () => void;
}

const Footer: React.FC<FooterProps> = ({ text, onNavigate }) => {
  return (
    <>
      <Spacer type="big" />
      <Text style={styles.textSmall}>ან</Text>

      <Spacer type="small" />
      <TouchableOpacity onPress={onNavigate}>
        <Text style={styles.textSkip}>{text}</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  textSmall: {
    fontSize: 16,
    textAlign: 'center',
    color: '#777',
  },
  textSkip: {
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
  },
});

export default Footer;
