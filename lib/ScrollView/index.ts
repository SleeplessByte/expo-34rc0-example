// THe react-navigation `ScrollView` didn't work with web on Expo 33. This
// platform-based import makes sure it only uses the optimised react-navigation
// component when on Android or iOS (read: supported platforms).
export { ScrollView as default } from 'react-native'
