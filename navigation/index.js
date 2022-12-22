import React, { useEffect, useState } from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";

import Colors from "../constants/colors";
import { useSelector, useDispatch } from "react-redux";

//import dummy data
//import { menu } from "./dummyData/menu";
//redux imports & config

import * as menuActions from "../store/actions/menu";
//Navigation imports and constants
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator(); // Stack contains Screen & Navigator properties
// Custom Screens import
import Home from "../screens/Home";
import Competition from "../screens/Competition";
import Player from "../screens/Player";
import Team from "../screens/Team";

// Custom components import
import Header from "../components/layout/Header";
import CustomDrawer from "../components/layout/Drawer";
export default () => {
  //Menu data loading
  const [isLoadingMenu, setIsLoadingMenu] = useState(false);
  const menu = useSelector((state) => state.menu.menu);
  const dispatch = useDispatch();
  useEffect(() => {
    let isMounted = true;
    setIsLoadingMenu(true);
    dispatch(menuActions.fetchMenu()).then(() => {
      if (isMounted) setIsLoadingMenu(false);
    });
    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  if (isLoadingMenu) {
    return (
      <View style={Styles.centered}>
        <ActivityIndicator size="large" color={Colors.Primary} />
      </View>
    );
  }
  // Waiting for fonts to load

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => {
          const filteredProps = {
            ...props,
            state: {
              ...props.state,
              routeNames: props.state.routeNames.filter((routeName) => {
                routeName !== "Player" && routeName !== "Team";
              }),
              routes: props.state.routes.filter(
                (route) => route.name !== "Player" && route.name !== "Team"
              ),
            },
          };
          return <CustomDrawer {...filteredProps} list={menu} />;
        }}
        screenOptions={{ header: (props) => <Header {...props}></Header> }}
        useLegacyImplementation
        initialRouteName="Home"
      >
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Player" component={Player} />
        <Drawer.Screen name="Team" component={Team} />

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
  );
};
const Styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
