import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Select, NativeBaseProvider } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
// import Dummy data
import { stagesList } from "../../dummyData/groupStage";

// import constants
import Colors from "../../constants/colors";
//Import custom components
import Row from "../../components/UI/Row";
import Table from "../../components/UI/Table";
import Card from "../../components/UI/Card";
import H3 from "../../components/typography/H3";
import H1 from "../../components/typography/H1";
import Pre from "../../components/typography/Pre";
import MatchCard from "../../components/competitionParts/MatchCard";

const GroupStage = (props) => {
  const insets = useSafeAreaInsets();
  const [selectedStage, setSelectedStage] = useState({ item: "All" });
  //  Go to next stage
  const goToNextStage = () => {
    let currentId = selectedStage.id;
    if (currentId == undefined) return;
    let nextStageIndex = null;
    Object.values(stagesList).map((stage, index) => {
      if (stage.id === currentId) {
        nextStageIndex =
          index + 1 < Object.values(stagesList).length ? index + 1 : null;
        nextStageIndex != null &&
          setSelectedStage(Object.values(stagesList)[nextStageIndex]);
      }
    });
  };
  //  Go to previous stage
  const goToPreviousStage = () => {
    let currentId = selectedStage.id;
    if (currentId == undefined) return;
    let previousStageIndex = null;
    Object.values(stagesList).map((stage, index) => {
      if (stage.id === currentId) {
        previousStageIndex = index > 0 ? index - 1 : null;
        previousStageIndex != null &&
          setSelectedStage(Object.values(stagesList)[previousStageIndex]);
      }
    });
  };
  //On change declaration
  function onChange(index) {
    if (index == "All") {
      setSelectedStage({ item: "All", id: "ALL" });
    } else setSelectedStage(stagesList.find((stage) => stage.item === index));
  }
  //Render list of stages groups and matches
  const renderStagesList = () => {
    if (selectedStage.matches) {
      return (
        <View>
          <View style={Styles.tableGroup}>
            <H1>{selectedStage.item}</H1>
            <Table data={selectedStage.data} headers={tableHeaders}></Table>
          </View>

          {selectedStage.matches.map((match, index) => {
            return <MatchCard stats={match} key={index}></MatchCard>;
          })}
        </View>
      );
    } else {
      return stagesList.map((group, index) => {
        return (
          <View key={group.id} style={Styles.tableGroup}>
            <H1>{group.item}</H1>
            <Table data={group.data} headers={tableHeaders}></Table>
          </View>
        );
      });
    }
  };
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
      text: "Pts",
      ref: "points",
      type: "text",
    },
    {
      flex: 1,
      text: "P",
      ref: "playedMatches",
      type: "text",
    },
    {
      flex: 1,
      text: "W",
      ref: "wonMatches",
      type: "text",
    },

    {
      flex: 1,
      text: "D",
      ref: "drawMatches",
      type: "text",
    },
    {
      flex: 1,
      text: "L",
      ref: "lostMatches",
      type: "text",
    },
    {
      flex: 1,
      text: "GF",
      ref: "goalFor",
      type: "text",
    },
    {
      flex: 1,
      text: "GA",
      ref: "goalAgainst",
      type: "text",
    },
    {
      flex: 1,
      text: "GD",
      ref: "goalDifference",
      type: "text",
    },
  ];

  return (
    <NativeBaseProvider>
      <SafeAreaView style={{ paddingBottom: insets.bottom }}>
        <Row style={Styles.header}>
          <TouchableOpacity onPress={goToPreviousStage}>
            <Ionicons
              name="arrow-back-circle-sharp"
              size={34}
              color={Colors.White}
            />
          </TouchableOpacity>

          <Select
            selectedValue={selectedStage.item}
            minWidth="70%"
            placeholder="ALL"
            _selectedItem={{
              bg: Colors.Primary,
              _text: { color: Colors.White },
            }}
            borderWidth={2}
            borderColor={Colors.White}
            color={Colors.White}
            fontFamily={"metropolisBold"}
            bgColor={Colors.Primary}
            onValueChange={onChange}
          >
            {[...stagesList, { item: "All", id: "ALL" }].map((stage, index) => {
              return (
                <Select.Item
                  label={stage.item}
                  value={stage.item}
                  key={stage.id}
                />
              );
            })}
          </Select>

          <TouchableOpacity onPress={goToNextStage}>
            <Ionicons
              name="arrow-forward-circle-sharp"
              size={34}
              color={Colors.White}
            />
          </TouchableOpacity>
        </Row>
        <ScrollView style={Styles.scrollView}>{renderStagesList()}</ScrollView>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};
const Styles = StyleSheet.create({
  safeView: {},
  scrollView: {},
  tableGroup: {
    marginVertical: 10,
  },
  summary: {
    flexWrap: "wrap",
    marginTop: 20,
  },
  summaryComponent: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
    width: "100%",
  },
  sumComponentContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  view: {
    padding: 20,
    zIndex: 1,
  },
  header: {
    height: 60,
    backgroundColor: Colors.Primary,
    justifyContent: "space-around",
    alignItems: "center",
    zIndex: 2,
    marginTop: 3,
  },
});
export default GroupStage;
