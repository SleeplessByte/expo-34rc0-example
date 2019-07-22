
import { createAppContainer, createStackNavigator } from "react-navigation"
import { useScreens } from 'react-native-screens'
import { IS_NATIVE } from "../platform";

import HomeScreen from "../home/HomeScreen"
import OtherScreen from "../other/OtherScreen"


// Can be replaced with a platform include:
//
// - useScreen.ts (no-op)
// - useScreens.web.ts (no-op)
// - useScreens.android.ts
// - useScreens.ios.ts
//
if (IS_NATIVE) {
  useScreens()
}

const AppNavigator = createStackNavigator({
  Home: { screen: HomeScreen, path: '/' },
  Other: { screen: OtherScreen, path: '/other' }
}, {
  headerMode: 'none',
  initialRouteName: 'Home'
})

export const AppNavigation = createAppContainer(AppNavigator)
