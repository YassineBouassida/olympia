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
import { stagesList } from "../../dummyData/games";

// import constants
import Colors from "../../constants/colors";
//Import custom components
import Row from "../../components/UI/Row";
import Card from "../../components/UI/Card";
import H3 from "../../components/typography/H3";
import H1 from "../../components/typography/H1";
import Pre from "../../components/typography/Pre";
import MatchCard from "../../components/competitionParts/MatchCard";

const Games = (props) => {
  const insets = useSafeAreaInsets();
  const [selectedStage, setSelectedStage] = useState(stagesList[0]);
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
    setSelectedStage(stagesList.find((stage) => stage.item === index));
  }
  const renderSummary = () => {
    if (!selectedStage.summary) return null;
    else {
      return (
        <View>
          <H1>Summary</H1>
          <Row style={Styles.summary}>
            <Card style={Styles.summaryComponent}>
              <View style={Styles.sumComponentContainer}>
                <Pre>Completed Games</Pre>
                <H3 style={{ color: Colors.Primary }}>
                  {selectedStage.summary.completedMatches}
                </H3>
              </View>
            </Card>
            {Object.values(selectedStage.summary).map((val, index) => {
              if (index > 0) {
                return (
                  <Card style={Styles.summaryComponent} key={index + "sum"}>
                    <View style={Styles.sumComponentContainer}>
                      <Image
                        source={{ uri: val.url, width: 40, height: 40 }}
                      ></Image>
                      <H3>{val.nbr}</H3>
                    </View>
                  </Card>
                );
              }
            })}
          </Row>
        </View>
      );
    }
  };
  return (
    <NativeBaseProvider>
      <SafeAreaView
        style={{ paddingBottom: insets.bottom }}
        edges={["bottom", "left"]}
      >
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
            placeholder="Choose Service"
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
            {stagesList.map((stage, index) => {
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
        <ScrollView>
          {selectedStage.matches &&
            selectedStage.matches.map((match, index) => {
              return <MatchCard stats={match} key={index}></MatchCard>;
            })}

          {renderSummary()}
        </ScrollView>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};
const Styles = StyleSheet.create({
  safeView: {},
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
    height: 80,
    backgroundColor: Colors.Primary,
    justifyContent: "space-around",
    alignItems: "center",
    zIndex: 2,
    marginTop: 3,
  },
});
export default Games;
