import React, { useState, useCallback } from 'react'
import { Provider as PaperProvider, ThemeShape as PaperTheme, DefaultTheme } from 'react-native-paper'

import { AppLoading, SplashScreen } from 'expo'
import { Asset } from 'expo-asset'
import { Platform, SafeAreaView, View } from 'react-native'
// import Sentry from 'sentry-expo'

import DeviceInfo from 'react-native-device-info'
import { AppNavigation } from './src/core/AppNavigation';
const HasNotch = DeviceInfo.hasNotch()
const IS_ANDROID = Platform.OS === "android"

function CrossPlatformSafeAreaView({ children, backgroundColor }: { children: React.ReactChild, backgroundColor: string }): JSX.Element {
  // Previously, SafeAreaView only worked on IOS, leaving newer Android devices
  // such as OnePlus, Samsung and others broken. This "mimics" the notch
  // behaviour on Android.

  // Unfortunately, this does not use the native API from Android which tells us
  // exactly what the Notch size is and if the area's are supposed to be
  // interactive or not. But hey, at least it's a _working_ solution.

  if (IS_ANDROID) {
    return (
      <View style={{ paddingTop: HasNotch ? 36 : 0, flex: 1, backgroundColor }}>
        {children}
      </View>
    )
  }

  return (
    <SafeAreaView style={{ backgroundColor, flex: 1 }}>
      {children}
    </SafeAreaView>
  )
}

const ExpoTheme: PaperTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: '#123456'
  }
}

export default function App() {
  const [ready, setReady] = useState(false)

  const onFinishLoading = useCallback(() => setReady(true), [ready])
  const onErrorLoading = useCallback((err) => {
    throw new Error(err)
  }, [])

  if (!ready) {
    return <AppLoading
      startAsync={cacheResources}
      onFinish={onFinishLoading}
      onError={onErrorLoading}
      autoHideSplash={false}
    />
  }

  return (
    <PaperProvider theme={ExpoTheme}>
      <SafeAreaView style={{ flex: 1 }}>
        <AppNavigation style={{ flex: 1 }} />
      </SafeAreaView>
    </PaperProvider>
  )
}

async function cacheResources(): Promise<void> {
  const images = [
    require('./assets/web-icon.png'),
    require('./assets/splash.png'),
    require('./assets/profile.png'),
    require('./assets/notification.png')
  ]

  const cacheImages = images.map(image => {
    return Asset.fromModule(image).downloadAsync()
  })

  return Promise.all([
    ...cacheImages,
    new Promise((resolve) => setTimeout(resolve, 500))
  ]).then(() => { SplashScreen.hide() })
}
