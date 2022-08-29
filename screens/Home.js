import React, { useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//Dummy date Import
import {
  clubs,
  players,
  mostValuablePlayer,
  mostValuableGoalKeeper,
} from "../dummyData/home";
//Redux imports
import {
  fetchPlayers,
  fetchClubs,
  fetchMostValuablePlayer,
  fetchMostValuableYoungPlayer,
  fetchMostValuableGoalPlayer,
} from "../store/actions/home";

//Custom components Import
import H1 from "../components/typography/H1";
import SpecialStats from "../components/home/SpecialStats";
import ProfileStats from "../components/home/ProfileStats";
import Stadium from "../components/layout/stadium/Stadium";
import { connect } from "react-redux";
const Home = (props) => {
  useEffect(() => {
    props.fetchAllData().then((res) => {
      console.log("players ", props.players);
      console.log("clubs ", props.clubs);
      console.log("mostValuablePlayer ", props.mostValuablePlayer);
      console.log("mostValuableGoalKeeper ", props.mostValuableGoalKeeper);
    });
  }, []);
  return (
    <SafeAreaView edges={["bottom", "left"]}>
      <ScrollView style={Styles.ScrollView}>
        <View style={Styles.specialStats}>
          <H1>Special Stats</H1>
          {/* <SpecialStats stats={players}></SpecialStats>
          <SpecialStats stats={clubs}></SpecialStats>
          <H1>Olympia Rewards Top 5 Leagues</H1>
          <ProfileStats stats={mostValuablePlayer}></ProfileStats>
          <ProfileStats stats={mostValuableGoalKeeper}></ProfileStats>
          <ProfileStats stats={mostValuableGoalKeeper}></ProfileStats>
          <Stadium title={"Team Of The Season"}></Stadium>
          <H1>Season Overview</H1> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const Styles = StyleSheet.create({
  ScrollView: {
    paddingTop: 20,
  },
  specialStats: {},
});
const allActions = [
  fetchPlayers(),
  fetchClubs(),
  fetchMostValuablePlayer(),
  fetchMostValuableYoungPlayer(),
  fetchMostValuableGoalPlayer(),
];
const mapDispatchToProps = (dispatch) => ({
  fetchAllData: async () => {
    const unresolvedPromises = allActions.map(async (action) => {
      return await dispatch(action);
    });
    const results = await Promise.all(unresolvedPromises);
    return results;
  },
});
const mapStateToProps = (state) => {
  return {
    players: state.home.players,
    clubs: state.home.clubs,
    mostValuablePlayer: state.home.mostValuablePlayer,
    mostValuableGoalKeeper: state.home.mostValuableGoalKeeper,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
