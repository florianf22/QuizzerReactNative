import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function () {
  const { theme } = useContext(ThemeContext);

  if (theme === 'light') {
    return {
      primary: '#DEE4EA',
      primaryMedium: '#2196F3',
      primaryMediumDarker: '#064667',
      primaryLight: '#3B4667',
      accentGreen: '#5FA52E',
      accentPurple: '#A31C60',
    };
  } else {
    return {
      primary: '#222C4A',
      primaryMedium: '#2196F3',
      primaryMediumDarker: '#064667',
      primaryLight: '#3B4667',
      accentGreen: '#5FA52E',
      accentPurple: '#A31C60',
    };
  }
}
