import React, { useEffect, useState } from "react";
import { Text, StyleSheet, ActivityIndicator, View, Image } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();

// import tabs
import Games from "./competitionTabs/Games";
import GroupStage from "./competitionTabs/GroupStage";
import Standings from "./competitionTabs/Standings";
import KnockOutStage from "./competitionTabs/KnockOutStage";
import Teams from "./competitionTabs/Teams";
import Players from "./competitionTabs/Players";
import Global from "./competitionTabs/Global";
//Import constants
import Colors from "../constants/colors";
//Redux imports
import { connect, useSelector } from "react-redux";

import {
  fetchStats,
  fetchSubMenu,
  fetchTeamOfTheSeason,
  fetchMostValuablePlayer,
  fetchMostValuableYoungPlayer,
  fetchMostValuableGoalPlayer,
} from "../store/actions/edition";
const Competition = (props) => {
  const lang = useSelector((state) => state.metadata.lang);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [editionId, setEditionId] = useState(0);
  useEffect(() => {
    setIsLoadingData(true);
    const { id, name_en } = props.route.params;
    setEditionId(id);
    props.fetchAllData(id).then((res) => {
      setIsLoadingData(false);
    });
  }, [props.route.params]);
  if (isLoadingData) {
    return (
      <View style={Styles.centered}>
        <ActivityIndicator size="large" color={Colors.Primary} />
      </View>
    );
  }
  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
        swipeEnabled: true,
        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: {
          backgroundColor: Colors.GreyText,
          height: 3,
        },
      }}
    >
      <Tab.Screen
        name={props.submenu[`name_${lang.key}`]}
        keyCode={props.submenu[`name_${lang.key}`]}
        component={() => {
          return (
            <Global
              stats={props.stats}
              teamOfTheSeason={props.teamOfTheSeason}
              mostValuableYoungPlayer={props.mostValuableYoungPlayer}
              mostValuablePlayer={props.mostValuablePlayer}
              mostValuableGoalKeeper={props.mostValuableGoalKeeper}
            ></Global>
          );
        }}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={{
                uri: props.submenu.logo,
                width: 50,
                height: 50,
              }}
            />
          ),
          tabBarLabel: "",
        }}
      />
      {props.submenu.items.map((sub) => {
        switch (sub.link) {
          case "/standings":
            return (
              <Tab.Screen
                name={sub[`name_${lang.key}`]}
                key={sub[`name_${lang.key}`]}
                component={Standings}
                initialParams={{ id: editionId }}
                lazy
              />
            );
            break;
          case "/groupstage":
            return (
              <Tab.Screen
                name={sub[`name_${lang.key}`]}
                key={sub[`name_${lang.key}`]}
                component={GroupStage}
                initialParams={{ id: editionId }}
                lazy
              />
            );
            break;
          case "/knockoutstage":
            return (
              <Tab.Screen
                name={sub[`name_${lang.key}`]}
                key={sub[`name_${lang.key}`]}
                component={KnockOutStage}
                initialParams={{ id: editionId }}
                lazy
              />
            );
            break;
          case "/teams":
            return (
              <Tab.Screen
                name={sub[`name_${lang.key}`]}
                key={sub[`name_${lang.key}`]}
                initialParams={{ id: editionId }}
                component={Teams}
                lazy
              />
            );
            break;
          case "/players":
            return (
              <Tab.Screen
                name={sub[`name_${lang.key}`]}
                key={sub[`name_${lang.key}`]}
                initialParams={{ id: editionId }}
                component={Players}
                lazy
              />
            );
            break;
          case "/games":
            return (
              <Tab.Screen
                name={sub[`name_${lang.key}`]}
                key={sub[`name_${lang.key}`]}
                component={Games}
                initialParams={{ id: editionId }}
              />
            );
            break;

          default:
            return null;
            break;
        }
      })}
    </Tab.Navigator>
  );
};
const Styles = StyleSheet.create({});
const allActions = [
  // fetchPlayers(),
  // fetchClubs(),
  fetchMostValuablePlayer(),
  fetchMostValuableYoungPlayer(),
  fetchMostValuableGoalPlayer(),
  fetchTeamOfTheSeason(),
  // fetchKnockOutStage(),
  // fetchGroupStage(),
  fetchStats(),
  // fetchGames(),
  fetchSubMenu(),
  // fetchStandings(),
  // fetchTeams(),
];
const mapDispatchToProps = (dispatch) => ({
  fetchAllData: async (id) => {
    console.log("id from map dispatch ", id);
    const unresolvedPromises = [
      await dispatch(fetchSubMenu(id)),
      await dispatch(fetchMostValuablePlayer(id)),
      await dispatch(fetchMostValuableYoungPlayer(id)),
      await dispatch(fetchMostValuableGoalPlayer(id)),
      await dispatch(fetchTeamOfTheSeason(id)),
      await dispatch(fetchStats(id)),
    ];

    const results = await Promise.all(unresolvedPromises);
    return results;
  },
});
const mapStateToProps = (state) => {
  return {
    submenu: state.edition.submenu,
    stats: state.edition.stats,
    teamOfTheSeason: state.edition.teamOfTheSeason,
    mostValuableYoungPlayer: state.edition.mostValuableYoungPlayer,
    mostValuablePlayer: state.edition.mostValuablePlayer,
    mostValuableGoalKeeper: state.edition.mostValuableGoalKeeper,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Competition);
