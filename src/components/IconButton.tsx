import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../constants/colors';

type IconButtonProps = {
  iconName: string;
  iconColor?: string;
  onPress: () => void;
};

const IconButton: React.FC<IconButtonProps> = ({
  iconName,
  iconColor = colors.black,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icons name={iconName} size={24} color={iconColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 8,
    height: 30,
    width: 30,
  },
});

export default IconButton;
