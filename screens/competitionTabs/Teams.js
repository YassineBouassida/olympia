import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
// import Dummy data
import { teamsRankings, rankingTableData } from "../../dummyData/teams";

// import constants
import Colors from "../../constants/colors";
//Import custom components
import Row from "../../components/UI/Row";
import Table from "../../components/UI/Table";
import H3 from "../../components/typography/H3";
import H1 from "../../components/typography/H1";
import Pre from "../../components/typography/Pre";
import TopFive from "../../components/competitionParts/TopFiveCard";
//Redux imports
import { connect, useSelector, useDispatch } from "react-redux";
import { fetchTeams } from "../../store/actions/edition";
const Teams = (props) => {
  const [selectedStage, setSelectedStage] = useState(0);
  const lang = useSelector((state) => state.metadata.lang);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const id = props.route ? props.route.params.id : 0;

    setIsLoadingData(true);
    dispatch(fetchTeams(id)).then(() => {
      setIsLoadingData(false);
    });
  }, []);
  if (isLoadingData) {
    return (
      <View style={Styles.centered}>
        <ActivityIndicator size="large" color={Colors.Primary} />
      </View>
    );
  }

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
        {teamsRankings.map((category) => {
          return <TopFive stats={category}></TopFive>;
        })}
        <H1>Successful Passes Into The Box - Full Ranking</H1>
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
const mapStateToProps = (state) => {
  return {
    teams: state.edition.teams,
  };
};
export default connect(mapStateToProps)(Teams);
