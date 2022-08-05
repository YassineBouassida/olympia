import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { StyleSheet } from "react-native";
import AppLoading from "expo-app-loading";

import { useFonts } from "expo-font";
import Colors from "./constants/colors";
//Navigation imports and constants
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
// const Stack = createNativeStackNavigator();
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
  const dummyMenu = [
    {
      name_en: "International Competitions",
      name_fr: "Comp\u00e9titions Internationales",
      name_ar: "",
      editions: [
        {
          id: 1,
          link: "https://olympia.phoinix.ai/edition/1/",
          name_en: "EURO 2020",
          name_fr: "EURO 2020",
          name_ar: "",
        },
        {
          id: 2,
          link: "https://olympia.phoinix.ai/edition/2/",
          name_en: "Copa America 2021",
          name_fr: "Copa America 2021",
          name_ar: "",
        },
        {
          id: 13,
          link: "https://olympia.phoinix.ai/edition/13/",
          name_en: "Nations League 2021",
          name_fr: "Ligue des Nations 2021",
          name_ar: "",
        },
        {
          id: 14,
          link: "https://olympia.phoinix.ai/edition/14/",
          name_en: "AFCON 2021",
          name_fr: "CAN 2021",
          name_ar: "",
        },
      ],
    },
    {
      name_en: "Clubs Competitions",
      name_fr: "Comp\u00e9titions des Clubs",
      name_ar: "",
      editions: [
        {
          id: 3,
          link: "https://olympia.phoinix.ai/edition/3/",
          name_en: "UEFA Champions League",
          name_fr: "UEFA Ligue des Champions",
          name_ar: "",
        },
        {
          id: 4,
          link: "https://olympia.phoinix.ai/edition/4/",
          name_en: "UEFA Europa League",
          name_fr: "UEFA Ligue Europa",
          name_ar: "",
        },
        {
          id: 5,
          link: "https://olympia.phoinix.ai/edition/5/",
          name_en: "UEFA Europa Conference League",
          name_fr: "UEFA Ligue Europa Conf\u00e9rence",
          name_ar: "",
        },
        {
          id: 6,
          link: "https://olympia.phoinix.ai/edition/6/",
          name_en: "UEFA Super Cup",
          name_fr: "UEFA Super Coupe",
          name_ar: "",
        },
        {
          id: 12,
          link: "https://olympia.phoinix.ai/edition/12/",
          name_en: "FIFA Club World Cup",
          name_fr: "FIFA Coupe du Mondes des Clubs",
          name_ar: "",
        },
      ],
    },
    {
      name_en: "Leagues",
      name_fr: "Championnats",
      name_ar: "",
      editions: [
        {
          id: 7,
          link: "https://olympia.phoinix.ai/edition/7/",
          name_en: "Premier League",
          name_fr: "Premier League",
          name_ar: "",
        },
        {
          id: 8,
          link: "https://olympia.phoinix.ai/edition/8/",
          name_en: "Serie A",
          name_fr: "Serie A",
          name_ar: "",
        },
        {
          id: 9,
          link: "https://olympia.phoinix.ai/edition/9/",
          name_en: "La Liga",
          name_fr: "La Liga",
          name_ar: "",
        },
        {
          id: 10,
          link: "https://olympia.phoinix.ai/edition/10/",
          name_en: "Bundesliga",
          name_fr: "Bundesliga",
          name_ar: "",
        },
        {
          id: 11,
          link: "https://olympia.phoinix.ai/edition/11/",
          name_en: "Ligue 1",
          name_fr: "Ligue 1",
          name_ar: "",
        },
      ],
    },
  ];
  return (
    <SafeAreaProvider style={Styles.safeView}>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => (
            <CustomDrawer {...props} list={dummyMenu} />
          )}
          screenOptions={{ header: (props) => <Header {...props}></Header> }}
          useLegacyImplementation
          initialRouteName="Home"
        >
          <Drawer.Screen name="Home" component={Home} />
          {
            // Map menu headers
            dummyMenu.map((link) => {
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
