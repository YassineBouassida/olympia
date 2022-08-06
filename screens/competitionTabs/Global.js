import React from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import * as Progress from "react-native-progress";
import { SafeAreaView } from "react-native-safe-area-context";

// import Dummy data
import {
  playersStatsCardData,
  goalsStatsCardData,
  cardsStatsCardData,
} from "../../dummyData/competition";
import {
  mostValuablePlayer,
  mostValuableGoalKeeper,
} from "../../dummyData/home";
// import constants
import Colors from "../../constants/colors";
//Import custom components
import H1 from "../../components/typography/H1";
import Pre from "../../components/typography/Pre";
import PlayersStatCard from "../../components/competitionParts/PlayersStatsCard";
import GoalsStatsCard from "../../components/competitionParts/GoalsStatsCard";
import CardsStatsCard from "../../components/competitionParts/CardsStatsCard";
import SpecialStats from "../../components/home/SpecialStats";
import ProfileStats from "../../components/home/ProfileStats";
import Stadium from "../../components/layout/stadium/Stadium";
const Games = (props) => {
  return (
    <SafeAreaView edges={["bottom", "left"]}>
      <ScrollView style={Styles.view}>
        <Pre style={{ color: Colors.Primary, alignSelf: "flex-end" }}>
          Completed games : 18
        </Pre>
        <Progress.Bar
          progress={18 / 51}
          color={Colors.Primary}
          height={15}
          width={null}
        >
          <Text style={Styles.progressText}>18/51</Text>
        </Progress.Bar>
        <Pre style={{ color: Colors.Text, alignSelf: "flex-end" }}>
          Scheduled games : 51
        </Pre>

        <H1>Key Stats</H1>
        <PlayersStatCard stats={playersStatsCardData}></PlayersStatCard>
        <GoalsStatsCard stats={goalsStatsCardData}></GoalsStatsCard>
        <CardsStatsCard stats={cardsStatsCardData}></CardsStatsCard>
        <H1>Olympia Rewards</H1>
        <ProfileStats stats={mostValuablePlayer}></ProfileStats>
        <ProfileStats stats={mostValuableGoalKeeper}></ProfileStats>
        <ProfileStats stats={mostValuableGoalKeeper}></ProfileStats>
        <Stadium title={"Team Of The Season"}></Stadium>
      </ScrollView>
    </SafeAreaView>
  );
};
const Styles = StyleSheet.create({
  view: {
    padding: 20,
  },
  progressText: {
    alignSelf: "flex-start",
    color: Colors.White,
    position: "absolute",
    top: 0,
    fontFamily: "metropolisBold",
    left: 10,
  },
});
export default Games;
