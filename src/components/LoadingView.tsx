import React from 'react';
import { StyleSheet, View, Dimensions, ActivityIndicator } from 'react-native';
import { colors } from '../constants/colors';

export default function LoadingView(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.bgView} />
      <View style={styles.indicatorView}>
        <ActivityIndicator size={'large'} animating color={colors.green} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgView: {
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    position: 'absolute',
    backgroundColor: colors.black,
    opacity: 0.6,
  },
  indicatorView: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
