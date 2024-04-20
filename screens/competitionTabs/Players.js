import React, { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// import Dummy data
import { playersRankings, rankingTableData } from "../../dummyData/players";

// import constants
//Import custom components
import Table from "../../components/UI/Table";
import H1 from "../../components/typography/H1";
import TopFive from "../../components/competitionParts/TopFiveCard";

const Players = (props) => {
  const tableHeaders = [
    {
      flex: 1,
      text: "#",
      ref: "rank",
      type: "text",
    },
    {
      flex: 4,
      text: "Team",
      ref: "team",
      type: "elem",
    },
    {
      flex: 1,
      text: "Total",
      ref: "total",
      type: "text",
    },
  ];

  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={{ paddingBottom: insets.bottom }}
      edges={["bottom", "left"]}
    >
      <ScrollView>
        <H1>Rankings</H1>
        {playersRankings.map((category) => {
          return <TopFive stats={category}></TopFive>;
        })}
        <H1>Lost Possession - Full Ranking</H1>
        <Table
          searchable={true}
          data={rankingTableData}
          headers={tableHeaders}
        ></Table>
      </ScrollView>
    </SafeAreaView>
  );
};
const Styles = StyleSheet.create({
  safeView: {},

  view: {
    padding: 20,
    zIndex: 1,
  },
});
export default Players;
