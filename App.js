import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { StyleSheet } from "react-native";
import AppLoading from "expo-app-loading";

import { useFonts } from "expo-font";
import Colors from "./constants/colors";
import { Provider } from "react-redux";

//import dummy data
//import { menu } from "./dummyData/menu";
//redux imports & config

import { store } from "./store";

//Navigation imports and constants
import NavigationWrapper from "./navigation/index";

export default () => {
  //  Initializing the app and loading fonts
  let [fontsLoaded] = useFonts({
    metropolis: require("./assets/fonts/metropolis.regular.otf"),
    metropolisLight: require("./assets/fonts/metropolis.light.otf"),
    metropolisBold: require("./assets/fonts/metropolis.bold.otf"),
    metropolisBlack: require("./assets/fonts/metropolis.black.otf"),
    metropolisSemiBold: require("./assets/fonts/metropolis.semi-bold.otf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  // Waiting for fonts to load

  return (
    <Provider store={store}>
      <SafeAreaProvider style={Styles.safeView}>
        <NavigationWrapper></NavigationWrapper>
      </SafeAreaProvider>
    </Provider>
  );
};
const Styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: Colors.White,
  },
});
