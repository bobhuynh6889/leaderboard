import {StyleSheet} from 'react-native';
import Fonts from './Fonts';

export const customTxt = (family: string, size: number, txtColor: string) =>
  StyleSheet.create({
    txt: {
      fontFamily: family || Fonts.Regular,
      fontSize: size || 13,
      color: txtColor || 'white',
    },
  });
