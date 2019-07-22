# Expo SDK 34.0.0 RC0

Reproducible examples to make this release go 💥.

## Method of building

It's important to note that to simulate an upgrade, I set-up the project without using `expo-cli` initially; it shouldn't matter, but just to be certain.

1. New folder
1. Add `expo` and `package.json` via `yarn add expo@34.0.0.rc0`
1. Manually add `react-native: "https://github.com/expo/react-native/archive/sdk-34.0.0.tar.gz"`
1. Create `app.json`
1. Make sure `expo-cli` is installed (globally, but should work locally)

    ```bash
    yarn global add expo-cli
    ```

1. Install some dependencies
Note: the folowing will fail on `@sentry/cli` with Node 12 without a visible error.

    ```bash
    yarn expo install react react-dom expo-asset expo-constants expo-core expo-location expo-permissions expo-secure-store @expo/vector-icons react-native-screens react-native-paper react-native-device-info sentry-expo
    ```

1. Install without `sentry-expo`:

    ```bash
    yarn expo install react react-dom expo-asset expo-constants expo-core expo-location expo-permissions expo-secure-store @expo/vector-icons react-native-screens react-native-paper react-native-device-info
    ```

1. Add typescript and types as development dependencies

```bash
# Can't use expo install with -D 😓

yarn add @types/react @types/react-native typescript -D
```

1. Add minimal configuration files
   - `tsconfig.json`
   - `babel.config.json`

1. Add minimal smoke components
   - `App.tsx`
   - `src/home/HomeScreen.tsx` and deps
   - `src/core/AppNavigation.ts` and deps
   - `src/other/OtherScreen.tsx` and deps

1. Add main file:

```diff
   {
+    "main": "node_modules/expo/AppEntry.js",
     "dependencies": {
```

1. Start web:

```bash
expo start --web

# Error: Invalid sdkVersion. Valid options are 10.0.0, 11.0.0, 12.0.0, 13.0.0, 14.0.0, 15.0.0, 16.0.0, 17.0.0, 18.0.0, 19.0.0, 20.0.0, 21.0.0, 22.0.0, 23.0.0, 24.0.0, 25.0.0, 26.0.0, 27.0.0, 28.0.0, 29.0.0, 30.0.0, 31.0.0, 32.0.0, 33.0.0, 7.0.0, 8.0.0, 9.0.0
```

## Tag boom-1

At this point, you can checkout the repo at tag boom-1

```text
Failed to compile.
path/to/expo-34rc0-example/node_modules/expo/AppEntry.js
Error: Failed to load config "universe/node" to extend from.
Referenced from: BaseConfig
    at _normalizeObjectConfigDataBody.next (<anonymous>)
    at _normalizeObjectConfigData.next (<anonymous>)
```

Fix it by adding `eslint-config-universe`:

```bash
yarn add eslint-config-universe@2.0.0-alpha.0 -D
```

Restart expo
```bash
expo start --web
```

## Tag boom-2

```text
Failed to compile.
path/to/expo-34rc0-example/App.tsx
Error: Failed to load plugin 'babel' declared in 'BaseConfig » eslint-config-universe/web » ./shared/core.js': Cannot find module 'eslint'
Require stack:
- path\to\expo-34rc0-example\node_modules\eslint-plugin-babel\rules\new-cap.js
- path\to\expo-34rc0-example\node_modules\eslint-plugin-babel\index.js
- path\to\global\node_modules\eslint\lib\cli-engine\config-array-factory.js
- path\to\global\node_modules\eslint\lib\cli-engine\cascading-config-array-factory.js
- path\to\global\node_modules\eslint\lib\cli-engine\cli-engine.js
- path\to\global\node_modules\eslint\lib\cli-engine\index.js
- path\to\global\node_modules\eslint\lib\api.js
- path\to\global\node_modules\eslint-loader\index.js
- path\to\global\node_modules\loader-runner\lib\loadLoader.js
- path\to\global\node_modules\loader-runner\lib\LoaderRunner.js
- path\to\global\node_modules\webpack\lib\NormalModule.js
- path\to\global\node_modules\webpack\lib\NormalModuleFactory.js
- path\to\global\node_modules\webpack\lib\Compiler.js
- path\to\global\node_modules\webpack\lib\webpack.js
- path\to\global\node_modules\@expo\xdl\build\Webpack.js
- path\to\global\node_modules\@expo\xdl\build\Project.js
- path\to\global\node_modules\@expo\xdl\build\xdl.js
- path\to\global\node_modules\expo-cli\build\exp.js
- path\to\global\node_modules\expo-cli\bin\expo.js
    at Array.reduce (<anonymous>)
    at _normalizeObjectConfigDataBody.next (<anonymous>)
    at _normalizeObjectConfigData.next (<anonymous>)
    at _normalizeObjectConfigDataBody.next (<anonymous>)
    at _normalizeObjectConfigData.next (<anonymous>)
    at _normalizeObjectConfigDataBody.next (<anonymous>)
    at _normalizeObjectConfigData.next (<anonymous>)
```

(Make sure to exit expo-cli now, because it won't be able to unlink/link new dependency files as the babel folder is "read-only" right now)

First try to fix it by adding eslint to the local dependencies

```bash
yarn add eslint -D
```

Restart expo
```bash
expo start --web
```

## Tag boom-3

Now that it has found eslint, it can't find prettier:

```text
path/to//expo-34rc0-example/App.tsx
Error: Cannot find module 'prettier'
Require stack:
- path\to\expo-34rc0-example\node_modules\eslint-plugin-prettier\eslint-plugin-prettier.js
- path\to\global\node_modules\eslint\lib\cli-engine\config-array-factory.js
- path\to\global\node_modules\eslint\lib\cli-engine\cascading-config-array-factory.js
- path\to\global\node_modules\eslint\lib\cli-engine\cli-engine.js
- path\to\global\node_modules\eslint\lib\cli-engine\index.js
- path\to\global\node_modules\eslint\lib\api.js
- path\to\global\node_modules\eslint-loader\index.js
- path\to\global\node_modules\loader-runner\lib\loadLoader.js
- path\to\global\node_modules\loader-runner\lib\LoaderRunner.js
- path\to\global\node_modules\webpack\lib\NormalModule.js
- path\to\global\node_modules\webpack\lib\NormalModuleFactory.js
- path\to\global\node_modules\webpack\lib\Compiler.js
- path\to\global\node_modules\webpack\lib\webpack.js
- path\to\global\node_modules\@expo\xdl\build\Webpack.js
- path\to\global\node_modules\@expo\xdl\build\Project.js
- path\to\global\node_modules\@expo\xdl\build\xdl.js
- path\to\global\node_modules\expo-cli\build\exp.js
- path\to\global\node_modules\expo-cli\bin\expo.js
Occurred while linting path\to\expo-34rc0-example\App.tsx:1
    at Array.forEach (<anonymous>)
    at Array.forEach (<anonymous>)
```

(Make sure to exit expo-cli now, because it won't be able to unlink/link new dependency files as the babel folder is "read-only" right now)

Try to fix it by adding prettier to the local dependencies

```bash
yarn add prettier -D
```

Restart expo
```bash
expo start --web
```

It will now fail because I placed `assets` in the wrong folder. Moving them one folder up, and running again.

## Tab boom-4

When the assets are fixed, the following error appears:

```text
Failed to compile.
path/to/expo-34rc0-example/node_modules/@react-navigation/native/dist/Scrollables.js
Module not found: Can't resolve 'react-native-gesture-handler' in 'path\to\expo-34rc0-example\node_modules\@react-navigation\native\dist'
```

Fix by adding this dependency manually via expo install

```bash
yarn expo install react-native-gesture-handler
```

Restart expo

```bash
yarn expo start --web
```

## Tag boom-5

```
Failed to compile.
path/to//expo-34rc0-example/node_modules/react-native-paper/src/components/Button.js
Module not found: Can't resolve 'react-native-web/dist/exports/ActivityIndicator' in 'path\to\\expo-34rc0-example\node_modules\react-native-paper\src\components'
```

Fix by manually adding react-native-web:

```bash
# Note: the babel plugins DID install, but the package react-native-web did not
yarn expo install react-native-web
```

Restart expo
```bash
yarn expo start --web
```

It will compile with prettier warnings, but the web compilation will actually not succeed. All the tags are NOT replaced in the final HTMl (meaning, you still see `%LANG_ISO_CODE%` `%ROOT_ID%` etc etc).

It also has a flow-type error:

```text
  Line 26:  Type annotations require valid Flow declaration                                                                                          flowtype/no-types-missing-file-a
```

This plugin should not have been on for a `.tsx` file (!).

Instead of web, try to run on android via the QR code or URL. It will correctly compain that 34.0.0 is not valid. Change to UNVERSIONED per the examples in the expo repo during release branches.

Restart expo
```bash
yarn expo start --web

# Error: Using unversioned Expo SDK. Do not publish until you set sdkVersion in app.json
# Note to self: This is expected :)
```

It actually shows the splash now and starts building.

`react-native-device-info` actually doesn't work (I think it was removed/reverted on one of the last changes before the release branch), so this will blow up.

```bash
yarn remove react-native-device-info
```

Change the safe area view to just assume a notch (otherwise everything will be broken on a lot of android phones)

Restart expo (web still silently fails)
```
yarn expo start
```

## Tag working-1

It now builds and loads and works on Android.

## License

The `notification.png` is licensed via the [StreamLine Standard License](https://streamlineicons.com/ux/standard-license.html) to [XP Bytes](https://xpbytes.com). You may not use this without a StreamLine Standard or Extended License.
