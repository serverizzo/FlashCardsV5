import { DarkTheme } from '@react-navigation/native';
import type { Theme } from '@react-navigation/native';

export const MyDarkTheme: Theme = {
...DarkTheme,
  dark: true,
  colors: {
    primary: 'rgb(10, 132, 255)',
    background: 'rgba(46, 46, 46, 1)',
    card: 'rgb(18, 18, 18)',
    text: 'rgb(229, 229, 231)',
    border: 'rgb(39, 39, 41)',
    notification: 'rgb(255, 69, 58)',
  }
};
