import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import ScrollView from '../../lib/ScrollView';

import { Countdown } from './Countdown';
import { Notifications } from './Notifications';
import { IS_NATIVE } from '../platform';
import { Button } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    maxWidth: IS_NATIVE ? '100%' : 680,
    alignSelf: 'center',
    flexDirection: 'column',
    width: '100%'
  },
  scroll: {
    paddingTop: 8,
    width: '100%'
  }
})

export default function HomeScreen({ navigation }: { navigation: NavigationScreenProp<unknown> }) {
  const gotoOtherScreen = useCallback(() => navigation.navigate('Other'), [navigation])

  return (
    <ScrollView endFillColor="#e5e5e5" style={styles.container} contentContainerStyle={styles.scroll}>
      <Countdown date="2019-08-01T06:00:00Z" />
      <Notifications />
      <Button mode="contained" onPress={gotoOtherScreen}>Other</Button>
    </ScrollView>
  )
}

HomeScreen.navigationOptions = {
  title: 'Home'
}
