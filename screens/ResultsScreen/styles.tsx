import { StyleSheet } from 'react-native';
import { PAGE_WIDTH } from '../../constants/Dimensions';
import Colors from '../../constants/Colors';

export default StyleSheet.create({
  touchable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: PAGE_WIDTH * 0.8,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 20,
    color: '#fff',
  },
  button: {
    padding: 15,
  },
  buttonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: PAGE_WIDTH * 0.8,
  },
});
