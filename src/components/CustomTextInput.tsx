import React from 'react';
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {customTxt} from '../constants/fontStyle';
import Fonts from '../constants/Fonts';
import {colors} from '../constants/colors';

interface CustomTextInputProps extends TextInputProps {
  borderColor?: string;
  iconName?: string;
  onPressIcon?: () => void;
  iconColor?: string;
  labelColor?: string;
  textColor?: string;
  isPointView?: boolean;
  disabled?: boolean;
  styleWholeInput?: StyleProp<ViewStyle>;
  textRight?: string;
  onPressTextRight?: () => void;
  textRightColor?: string;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  borderColor = colors.gray80,
  iconName,
  onPressIcon,
  style,
  iconColor = colors.black,
  textColor = colors.black,
  isPointView = false,
  disabled = false,
  styleWholeInput,
  textRight,
  onPressTextRight,
  textRightColor = colors.black,
  ...textInputProps
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={disabled}
        onPress={onPressIcon}
        style={[styles.inputContainer, {borderColor}, styleWholeInput]}>
        {iconName && (
          <TouchableOpacity onPress={onPressIcon} style={styles.iconContainer}>
            <Icon name={iconName} size={24} color={iconColor} />
          </TouchableOpacity>
        )}
        {isPointView || disabled ? (
          <View style={[styles.textInput, style]}>
            <Text style={customTxt(Fonts.Regular, 16, textColor).txt}>
              {textInputProps?.value}
            </Text>
          </View>
        ) : (
          <TextInput
            style={[
              style,
              styles.textInput,
              customTxt(Fonts.Regular, 16, textColor).txt,
            ]}
            placeholderTextColor={colors.grayConcrete}
            {...textInputProps}
          />
        )}
        {textRight && (
          <TouchableOpacity onPress={onPressTextRight} style={styles.iconContainer}>
            <Text style={customTxt(Fonts.Bold, 10, textRightColor).txt}>{textRight}</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.75,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  textInput: {
    flex: 1,
    paddingVertical: 8,
  },
  iconContainer: {
    marginRight: 8,
  },
});

export default CustomTextInput;
