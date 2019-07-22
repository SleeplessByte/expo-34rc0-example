import { Platform } from 'react-native'
import DeviceInfo from 'react-native-device-info'

const IS_ANDROID = Platform.OS === "android"
const IS_IOS = Platform.OS === "ios"
const IS_NATIVE = IS_ANDROID || IS_IOS
const HAS_NOTCH = DeviceInfo.hasNotch()

export {
  IS_ANDROID,
  IS_IOS,
  IS_NATIVE,
  HAS_NOTCH
}
