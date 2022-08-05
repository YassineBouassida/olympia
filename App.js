import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { StyleSheet } from "react-native";
import AppLoading from "expo-app-loading";

import { useFonts } from "expo-font";
import Colors from "./constants/colors";

//import dummy data
import { menu } from "./dummyData/menu";
//Navigation imports and constants
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
const Stack = createDrawerNavigator();
const Drawer = createDrawerNavigator();

// Custom Screens import
import Home from "./screens/Home";
import Competition from "./screens/Competition";

// Custom components import
import Header from "./components/layout/Header";
import CustomDrawer from "./components/layout/Drawer";
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
    <SafeAreaProvider style={Styles.safeView}>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawer {...props} list={menu} />}
          screenOptions={{ header: (props) => <Header {...props}></Header> }}
          useLegacyImplementation
          initialRouteName="Home"
        >
          <Drawer.Screen name="Home" component={Home} />
          {
            // Map menu headers
            menu.map((link) => {
              if (link.editions) {
                //Map menu sub headers and render them
                return link.editions.map((edition) => {
                  return (
                    <Drawer.Screen
                      name={edition.name_en}
                      key={edition.id}
                      component={Competition}
                      initialParams={{ ...edition }}
                    />
                  );
                });
              }
            })
          }
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
const Styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: Colors.White,
  },
});
