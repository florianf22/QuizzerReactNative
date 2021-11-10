import { StyleSheet } from 'react-native';
import { PAGE_WIDTH } from '../../constants/Dimensions';

export default StyleSheet.create({
  container: {
    alignItems: 'stretch',
    transform: [{ translateY: 10 }],
  },
  iconTouchable: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
});
