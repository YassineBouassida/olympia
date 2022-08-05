import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Button } from "react-native";
//Dummy date Import
import {
  clubs,
  players,
  mostValuablePlayer,
  mostValuableGoalKeeper,
} from "../dummyData/home";
//Custom components Import

import H1 from "../components/typography/H1";

import SpecialStats from "../components/home/SpecialStats";
import ProfileStats from "../components/home/ProfileStats";
import Stadium from "../components/layout/stadium/Stadium";
const Home = (props) => {
  return (
    <ScrollView style={Styles.ScrollView}>
      <View style={Styles.specialStats}>
        <H1>Special Stats</H1>
        <SpecialStats stats={players}></SpecialStats>
        <SpecialStats stats={clubs}></SpecialStats>
        <H1>Olympia Rewards Top 5 Leagues</H1>
        <ProfileStats stats={mostValuablePlayer}></ProfileStats>
        <ProfileStats stats={mostValuableGoalKeeper}></ProfileStats>
        <ProfileStats stats={mostValuableGoalKeeper}></ProfileStats>
        <Stadium title={"Team Of The Season"}></Stadium>
        <H1>Season Overview</H1>
      </View>
    </ScrollView>
  );
};
const Styles = StyleSheet.create({
  ScrollView: {
    padding: 20,
  },
  specialStats: {},
});
export default Home;
