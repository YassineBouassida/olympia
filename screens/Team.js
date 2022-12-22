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
import { useNavigation } from "@react-navigation/native";

import { Select, NativeBaseProvider } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { A } from "@expo/html-elements";

// import constants
import Colors from "../constants/colors";
//Import custom components
import Row from "../components/UI/Row";
import Avatar from "../components/UI/Avatar";
import H3 from "../components/typography/H3";
import H1 from "../components/typography/H1";
import Pre from "../components/typography/Pre";
import MatchCard from "../components/competitionParts/MatchCard";
//Redux imports
import { connect, useSelector, useDispatch } from "react-redux";
import { fetchTeam } from "../store/actions/team";
const Team = (props) => {
  const navigation = useNavigation();

  const insets = useSafeAreaInsets();
  const lang = useSelector((state) => state.metadata.lang);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const id = props.route ? props.route.params.id : 0;
    setIsLoadingData(true);
    dispatch(fetchTeam(id)).then(() => {
      setIsLoadingData(false);
    });
  }, [props.route]);
  if (isLoadingData) {
    return (
      <View style={Styles.centered}>
        <ActivityIndicator size="large" color={Colors.Primary} />
      </View>
    );
  }

  return (
    <NativeBaseProvider>
      <SafeAreaView
        style={{ ...Styles.safeView, paddingBottom: insets.bottom }}
        edges={["bottom", "left"]}
      >
        <ScrollView style={Styles.container}>
          <View style={Styles.section}>
            <H1>{props.team.type} Info</H1>
            <View style={Styles.infoBar}>
              <Row>
                <Image
                  source={{
                    uri: "https://olympia-api.phoinix.ai/pictures/nations/0.png",
                    width: 60,
                    height: 60,
                  }}
                ></Image>
                <H3>{props.team[`name_${lang.key}`]}</H3>
              </Row>
              <Row style={Styles.infoRow}>
                <FontAwesome5 name="landmark" size={32} color={Colors.Text} />
                <H3 style={Styles.infoText}>
                  {props.team[`stadium_${lang.key}`]}
                </H3>
              </Row>
              <Row style={Styles.infoRow}>
                <Ionicons name="location" size={32} color={Colors.Text} />
                <H3 style={Styles.infoText}>
                  {props.team.type == "nation"
                    ? props.team[`capital_city_${lang.key}`]
                    : props.team[`city_${lang.key}`]}
                </H3>
              </Row>
              <Row style={Styles.infoRow}>
                <FontAwesome5
                  name="birthday-cake"
                  size={32}
                  color={Colors.Text}
                />
                <H3 style={Styles.infoText}>{props.team.foundation}</H3>
              </Row>
              <Row style={Styles.infoRow}>
                <FontAwesome5 name="globe" size={32} color={Colors.Text} />
                <A style={Styles.infoText} href={props.team.webste}>
                  {props.team.webste}
                </A>
              </Row>
            </View>
          </View>
          <View style={Styles.section}>
            <H1>Squad</H1>
            <View style={Styles.infoBar}>
              {props.team.players.map((player, index) => {
                return (
                  <View style={Styles.playerCard} key={index}>
                    <Pre style={Styles.playerNumber}>{player.number}</Pre>
                    <Avatar
                      style={[
                        Styles.avatar,
                        { width: 100, height: 100, marginHorizontal: 5 },
                      ]}
                      originalWidth={95}
                      originalHeight={95}
                      url={player.picture}
                      selected={false}
                      onPress={() => {
                        navigation.navigate(
                          "Player",
                          { id: player.id },
                          null,
                          "Team"
                        );
                      }}
                    ></Avatar>
                    <Pre style={Styles.playerName}>
                      {player[`name_${lang.type}`]}
                    </Pre>
                  </View>
                );
              })}
            </View>
          </View>
          <View style={Styles.section}>
            <H1>Games</H1>
            {props.team.games
              ? props.team.games.map((game, index) => {
                  return <MatchCard stats={game} key={index}></MatchCard>;
                })
              : null}
          </View>
        </ScrollView>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};
const Styles = StyleSheet.create({
  safeView: {},
  section: {
    marginVertical: 20,
  },
  container: {
    marginVertical: 20,
  },
  infoBar: {
    padding: 20,
    backgroundColor: Colors.FullWhite,
    marginVertical: 20,
  },
  infoRow: {
    marginVertical: 10,
    alignItems: "center",
  },
  infoText: {
    marginLeft: 8,
  },
  playerCard: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
  avatar: {
    zIndex: 0,
  },
  playerName: {
    backgroundColor: Colors.White,
    color: Colors.Text,
    paddingHorizontal: 10,
    borderRadius: 15,
    overflow: "hidden",
    borderColor: Colors.White,
    borderWidth: 1,
  },
  playerNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    paddingVertical: 5,
    textAlign: "center",
    borderWidth: 1,
    borderColor: Colors.White,
    color: Colors.Text,
    backgroundColor: Colors.White,
    left: -45,
    bottom: -30,
    zIndex: 999,
    overflow: "hidden",
  },
});
const mapStateToProps = (state) => {
  return {
    team: state.team.team,
  };
};
export default connect(mapStateToProps)(Team);
