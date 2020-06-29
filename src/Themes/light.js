import {DefaultTheme} from '@react-navigation/native';
//currently not using anywhere in the project
export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
    primary: 'purple',
    text: 'black',
  },
};
