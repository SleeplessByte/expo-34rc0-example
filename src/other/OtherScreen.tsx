


import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import App from '../../App';
import { Appbar } from 'react-native-paper';
import { NavigationScreenProp } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    paddingTop: 30,
  },
  scrollStack: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
})

export default function OtherScreen({ navigation }: { navigation: NavigationScreenProp<unknown> }): JSX.Element {
  const goBack = useCallback(() => navigation.goBack(), [navigation])

  return (
    <View style={styles.container}>
      <Appbar.Header dark={true}>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="My Other Screen" />
      </Appbar.Header>
    </View>
  )
}

OtherScreen.navigationOptions = {
  title: 'Other'
}
