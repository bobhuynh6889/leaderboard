import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  TextStyle,
} from 'react-native';

import NavigationService from '../navigation';
import {colors} from '../constants/colors';
import {customTxt} from '../constants/fontStyle';
import Fonts from '../constants/Fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {hasNotch} from '../utils/checkDeviceHasNotch';

interface customButtonProps {
  title: string;
  textRightContent?: string;
  onPressRight?: any;
  iconName?: string;
  titleStyleCustom?: StyleProp<TextStyle>;
  iconRightColor?: string;
  onPressLeft?: any;
  isBackButton?: boolean;
}

export default function Header({
  title,
  textRightContent,
  onPressRight,
  iconName,
  titleStyleCustom,
  iconRightColor = colors.black,
  onPressLeft,
  isBackButton,
}: customButtonProps): React.JSX.Element {
  const isHasNotch = hasNotch();

  return (
    <View>
      <View style={[styles.container, stylesHasNotch(isHasNotch).paddingTop]}>
        {isBackButton ? (
          <TouchableOpacity
            onPress={() => {
              if (onPressLeft) {
                onPressLeft();
                NavigationService.goBack();
              } else {
                NavigationService.goBack();
              }
            }}
            style={styles.areaBackBtn}>
            <Ionicons
              name="chevron-back-outline"
              size={22}
              color={colors.white}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.areaRightBtn} />
        )}
        <View style={styles.titleCtn}>
          <Text
            style={[
              customTxt(Fonts.Bold, 18, colors.white).txt,
              styles.textAlignCenter,
              titleStyleCustom,
            ]}>
            {title}
          </Text>
        </View>
        {!(textRightContent || iconName) && (
          <View style={styles.areaRightBtn} />
        )}
        {(textRightContent || iconName) && (
          <TouchableOpacity
            style={[styles.alignItemEnd]}
            onPress={onPressRight}>
            {iconName ? (
              <Ionicons name={iconName} size={24} color={iconRightColor} />
            ) : (
              <Text style={customTxt(Fonts.Medium, 16, colors.white).txt}>
                {textRightContent}
              </Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.green,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },
  textAlignCenter: {
    textAlign: 'center',
  },
  alignItemEnd: {
    alignItems: 'flex-end',
  },
  titleCtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  areaBackBtn: {
    height: 30,
    width: 30,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  areaRightBtn: {
    height: 30,
    width: 30,
  },
});

const stylesHasNotch = (isHasNotch: boolean) =>
  StyleSheet.create({
    paddingTop: {
      paddingTop: isHasNotch ? 50 : 25,
    },
  });
