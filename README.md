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
C:/Users/Derk-Jan/Documents/Github/expo-34rc0-example/App.tsx
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

```text

```

## License

The `notification.png` is licensed via the [StreamLine Standard License](https://streamlineicons.com/ux/standard-license.html) to [XP Bytes](https://xpbytes.com). You may not use this without a StreamLine Standard or Extended License.
