import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { Image, View, Text, StyleSheet } from 'react-native'
import { askAsync, getAsync, NOTIFICATIONS, PermissionStatus } from 'expo-permissions'
import { Banner } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    padding: 0
  },
  permissionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ebebeb',

    // boxShadow: '0px 1px 2px 0 rgba(0,0,0,0.13)',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
    borderColor: 'rgba(0, 0, 0, .12)',
    borderWidth: StyleSheet.hairlineWidth,
    margin: -4,
    padding: 8
  },
  permissionImage: {
    width: 72,
    height: 72,
    marginRight: 8
  },
  permissionText: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 8,
  },
  permissionButton: {

  }
})

const EnableNotificationsTheme = { colors: { primary: '#123456' }}

const lastIsPermitted = { value: PermissionStatus.UNDETERMINED }

export function Notifications(): null | JSX.Element {
  const [isPermitted, setPermitted] = useState(lastIsPermitted.value)
  const isMounted = useRef(true)

  const onEnableNotifications = useCallback(() => {
    askAsync(NOTIFICATIONS)
      .then(({ status }) => {
        lastIsPermitted.value = status
        isMounted.current && setPermitted(status)
      })
      .catch((err) => { console.error(err) })
  }, [isMounted])

  /*const renderBannerImage = useCallback(({ size }) => {
    return <Image style={{ width: size, height: size }} source={require('../../assets/notification.png')} />
  }, [])*/

  const bannerActions = useMemo(() => [
    {
      label: 'Enable',
      onPress: onEnableNotifications
    }
  ], [onEnableNotifications])

  useEffect(() => {
    if (isPermitted === PermissionStatus.UNDETERMINED) {
      getAsync(NOTIFICATIONS)
        .then(({ status }) => {
          lastIsPermitted.value = status
          isMounted.current && setPermitted(status)
        })
        .catch((err) => { console.error(err) })
    }

    return () => { isMounted.current = false }
  }, [isMounted, isPermitted === PermissionStatus.UNDETERMINED])

  if (isPermitted === PermissionStatus.UNDETERMINED) {
    return null
  }

  if (isPermitted === PermissionStatus.DENIED) {
    return (
      <Banner style={styles.container} theme={EnableNotificationsTheme} visible={true} actions={bannerActions}>
        <View style={styles.permissionWrapper} onTouchEnd={onEnableNotifications}>
          <Image style={styles.permissionImage} source={require('../../assets/notification.png')} />
          <Text>Allow notifications to get updates about last-minute changes to the
            programme or other vital information.
          </Text>
        </View>
      </Banner>
    )
  }

  // TODO: remove this later. Only to test if the notifications work
  return (
    <View style={styles.container}>
      <View style={styles.permissionWrapper} onTouchEnd={onEnableNotifications}>
        <Image style={styles.permissionImage} source={require('../../assets/notification.png')} />
        <Text>Notifications permitted</Text>
      </View>
    </View>
  )
}
