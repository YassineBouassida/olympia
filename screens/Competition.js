import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();
// import tabs
import Games from "./competitionTabs/Games";
//Import constants
import Colors from "../constants/colors";
const Competition = (props) => {
  const { id, name_en } = props.route.params;
  return (
    <Tab.Navigator
      screenOptions={{
        swipeEnabled: true,
        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: {
          backgroundColor: Colors.Primary,
          height: 3,
        },
      }}
    >
      <Tab.Screen name="Games" component={Games} />
      <Tab.Screen name="Group Stage" component={Games} />
      <Tab.Screen name="Knock Out Stage" component={Games} />
      <Tab.Screen name="Teams" component={Games} />
      <Tab.Screen name="Players" component={Games} />
    </Tab.Navigator>
  );
};
const Styles = StyleSheet.create({});
export default Competition;
