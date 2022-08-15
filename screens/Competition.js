import React from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();
// import tabs
import Games from "./competitionTabs/Games";
import GroupStage from "./competitionTabs/GroupStage";
import KnockOutStage from "./competitionTabs/KnockOutStage";
import Teams from "./competitionTabs/Teams";
import Players from "./competitionTabs/Players";
import Global from "./competitionTabs/Global";
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
          backgroundColor: Colors.GreyText,
          height: 3,
        },
      }}
    >
      <Tab.Screen
        name="euro 2022"
        component={Global}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={{
                uri: "https://olympia.phoinix.ai/pictures/editions/1_2.png",
                width: 50,
                height: 50,
              }}
            />
          ),
          tabBarLabel: "",
        }}
      />
      <Tab.Screen name="Games" component={Games} />
      <Tab.Screen name="Group Stage" component={GroupStage} />
      <Tab.Screen name="Knock Out Stage" component={KnockOutStage} />
      <Tab.Screen name="Teams" component={Teams} />
      <Tab.Screen name="Players" component={Players} />
    </Tab.Navigator>
  );
};
const Styles = StyleSheet.create({});
export default Competition;
