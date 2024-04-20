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
import { Select, NativeBaseProvider } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

// import constants
import Colors from "../../constants/colors";
//Import custom components
import Row from "../../components/UI/Row";
import Card from "../../components/UI/Card";
import H3 from "../../components/typography/H3";
import H1 from "../../components/typography/H1";
import Pre from "../../components/typography/Pre";
import MatchCard from "../../components/competitionParts/MatchCard";
//Redux imports
import { connect, useSelector, useDispatch } from "react-redux";
import { fetchGames } from "../../store/actions/edition";
const Games = (props) => {
  const insets = useSafeAreaInsets();
  const [selectedStage, setSelectedStage] = useState(0);
  const lang = useSelector((state) => state.metadata.lang);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(props.route);
    const id = props.route ? props.route.params.id : 0;

    setIsLoadingData(true);
    dispatch(fetchGames(id)).then(() => {
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
  //  Go to next stage
  const goToNextStage = () => {
    if (selectedStage == props.games.length - 1) setSelectedStage(0);
    else setSelectedStage(selectedStage + 1);
  };
  //  Go to previous stage
  const goToPreviousStage = () => {
    if (selectedStage == 0) setSelectedStage(props.games.length - 1);
    else setSelectedStage(selectedStage - 1);
  };
  //On change declaration
  function onChange(index) {
    setSelectedStage(index);
  }
  const renderSummary = () => {
    let stats = props.games[selectedStage].stats;
    if (!stats) return null;
    else {
      return (
        <View>
          <H1>Summary</H1>
          <Row style={Styles.summary}>
            <Card style={Styles.summaryComponent}>
              <View style={Styles.sumComponentContainer}>
                <Pre>Completed Games</Pre>
                <H3 style={{ color: Colors.Primary }}>
                  {stats.games_completed}
                </H3>
              </View>
            </Card>
            {/* Number of goals */}
            <Card style={Styles.summaryComponent}>
              <View style={Styles.sumComponentContainer}>
                <Image
                  source={{
                    uri: "https://olympia.phoinix.ai/icos/G.png",
                    width: 40,
                    height: 40,
                  }}
                ></Image>
                <H3>{stats.goals}</H3>
              </View>
            </Card>
            {/* Number of Own goals */}

            <Card style={Styles.summaryComponent}>
              <View style={Styles.sumComponentContainer}>
                <Image
                  source={{
                    uri: "https://olympia.phoinix.ai/icos/OG.png",
                    width: 40,
                    height: 40,
                  }}
                ></Image>
                <H3>{stats.own_goals}</H3>
              </View>
            </Card>
            {/* Number of Yellow cards */}

            <Card style={Styles.summaryComponent}>
              <View style={Styles.sumComponentContainer}>
                <Image
                  source={{
                    uri: "https://olympia.phoinix.ai/icos/Y.png",
                    width: 40,
                    height: 40,
                  }}
                ></Image>
                <H3>{stats.yellow_cards}</H3>
              </View>
            </Card>
            {/* Number of Second Yellow cards */}
            <Card style={Styles.summaryComponent}>
              <View style={Styles.sumComponentContainer}>
                <Image
                  source={{
                    uri: "https://olympia.phoinix.ai/icos/S.png",
                    width: 40,
                    height: 40,
                  }}
                ></Image>
                <H3>{stats.second_yellow_cards}</H3>
              </View>
            </Card>
            {/* Number of Red cards */}
            <Card style={Styles.summaryComponent}>
              <View style={Styles.sumComponentContainer}>
                <Image
                  source={{
                    uri: "https://olympia.phoinix.ai/icos/R.png",
                    width: 40,
                    height: 40,
                  }}
                ></Image>
                <H3>{stats.red_cards}</H3>
              </View>
            </Card>
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
            selectedValue={selectedStage}
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
            {props.games.map((stage, index) => {
              return (
                <Select.Item
                  label={stage[`title_${lang.key}`]}
                  value={index}
                  key={index}
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
          {props.games[selectedStage].games &&
            props.games[selectedStage].games.map((match, index) => {
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
const mapStateToProps = (state) => {
  return {
    games: state.edition.games,
  };
};
export default connect(mapStateToProps)(Games);
