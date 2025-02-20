import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {customTxt} from '../constants/fontStyle';
import Fonts from '../constants/Fonts';
import {colors} from '../constants/colors';

interface ButtonProps {
  text: string;
  iconName?: string;
  backgroundColor?: string;
  border?: string;
  onPress: () => void;
  textColor?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const CustomButton: React.FC<ButtonProps> = ({
  text,
  iconName,
  backgroundColor = colors.green,
  border = colors.green,
  onPress,
  textColor = colors.white,
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, {backgroundColor, borderColor: border}, style]}>
      <View style={styles.buttonContent}>
        {iconName && (
          <Icon
            name={iconName}
            size={20}
            color={textColor}
            style={styles.icon}
          />
        )}
        <Text
          style={[
            customTxt(Fonts.SemiBold, 16, colors.white).txt,
            {color: textColor},
            textStyle,
          ]}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
});

export default CustomButton;
