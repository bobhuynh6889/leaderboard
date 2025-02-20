import {View, StyleSheet, Image} from 'react-native';
import React, { useEffect } from 'react';
import * as Animatable from 'react-native-animatable';
import { useDispatch } from 'react-redux';
/////
import NavigationService from '../navigation';
import Routes from '../navigation/Routes';
import { colors } from '../constants/colors';
import IconsLocal from '../../assets/icons';
import { convertData } from '../utils/handleData';
import leaderboardData from '../data/leaderboard.json';
import { saveConvertData } from '../action/common';

export default function Splash() {
  const dispatch = useDispatch();

  useEffect(() => {
    const data = convertData(leaderboardData);
    dispatch(saveConvertData(data));
    setTimeout(() => {
      NavigationService.navigate(Routes.HOME);
    }, 2000);
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.ctnText}>
        <Animatable.View duration={1500} animation="pulse">
          <Image source={IconsLocal.icon_banana} style={styles.iconStyle} />
        </Animatable.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
    backgroundColor: colors.green,
  },
  ctnText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    height: 200,
    width: 200,
    resizeMode: 'contain',
  },
});
