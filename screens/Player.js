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
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

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
import { fetchPlayer } from "../store/actions/player";
const Player = (props) => {
  const insets = useSafeAreaInsets();
  const lang = useSelector((state) => state.metadata.lang);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const id = props.route ? props.route.params.id : 0;
    setIsLoadingData(true);
    dispatch(fetchPlayer(id)).then(() => {
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
        style={{ paddingBottom: insets.bottom }}
        edges={["bottom", "left"]}
      >
        <ScrollView style={Styles.container}>
          <View style={Styles.boxContainer}>
            <View style={Styles.outerBox}>
              <View style={Styles.innerBox}>
                <View style={Styles.profilePicture}>
                  <Image
                    source={{
                      uri: props.player.picture,
                      height: 200,
                      width: 200,
                    }}
                  ></Image>
                  <View style={Styles.playerName}>
                    <H3 style={Styles.playerNameText}>
                      {props.player[`name_${lang.type}`]}
                    </H3>
                  </View>
                  <Row style={Styles.flags}>
                    <Avatar
                      style={[
                        Styles.avatar,
                        { width: 25, height: 25, marginHorizontal: 5 },
                      ]}
                      originalWidth={25}
                      originalHeight={25}
                      url={props.player.club_logo}
                      selected={false}
                    ></Avatar>
                    <Avatar
                      style={[
                        Styles.avatar,
                        { width: 25, height: 25, marginHorizontal: 5 },
                      ]}
                      originalWidth={25}
                      originalHeight={25}
                      url={props.player.nation_flag}
                      selected={false}
                    ></Avatar>
                  </Row>
                  <View style={Styles.statContainer}>
                    <Row style={Styles.statRow}>
                      <View style={Styles.statColumn}>
                        <FontAwesome5
                          name="crosshairs"
                          size={24}
                          color={Colors.Text}
                        />
                        <Pre>{props.player.position}</Pre>
                      </View>
                      <View style={Styles.statColumn}>
                        <Image
                          source={
                            props.player.foot == "L"
                              ? require(`../assets/icons/strongest_foot_left.png`)
                              : props.player.foot == "R"
                              ? require(`../assets/icons/strongest_foot_right.png`)
                              : require(`../assets/icons/strongest_foot_both.png`)
                          }
                        ></Image>
                        <Pre>
                          {props.player.foot == "L"
                            ? "Left Foot"
                            : props.player.foot == "R"
                            ? "Right Foot"
                            : "Both Feet"}
                        </Pre>
                      </View>
                    </Row>
                    <Row style={Styles.statRow}>
                      <View style={Styles.statColumn}>
                        <FontAwesome5
                          name="arrows-alt-v"
                          size={24}
                          color={Colors.Text}
                        />
                        <Pre>
                          {(props.player.height / 100).toFixed(2) + " m"}
                        </Pre>
                      </View>
                      <View style={Styles.statColumn}>
                        <FontAwesome5
                          name="weight"
                          size={24}
                          color={Colors.Text}
                        />
                        <Pre>{props.player.weight + " Kg"}</Pre>
                      </View>
                    </Row>
                    <Row style={Styles.statRow}>
                      <View style={Styles.statColumn}>
                        <FontAwesome5
                          name="birthday-cake"
                          size={24}
                          color={Colors.Text}
                        />
                        <Pre>{props.player.birthday}</Pre>
                      </View>
                      <View style={Styles.statColumn}>
                        <Ionicons
                          name="location"
                          size={24}
                          color={Colors.Text}
                        />
                        <Pre>
                          {props.player[`birth_city_name_${lang.type}`]}
                        </Pre>
                      </View>
                    </Row>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={Styles.section}>
            <H1>Games</H1>
            {props.player.games
              ? props.player.games.map((game, index) => {
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
  boxContainer: {
    paddingHorizontal: 20,
  },
  outerBox: {
    width: "100%",
    height: 600,
    backgroundColor: Colors.Primary,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  innerBox: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.Beta,
    borderRadius: 20,
  },
  profilePicture: {
    justifyContent: "center",
    alignItems: "center",
  },
  playerName: {
    color: Colors.Primary,
    borderBottomColor: Colors.Primary,
    borderTopColor: Colors.Primary,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    marginVertical: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  playerNameText: {
    color: Colors.Primary,
  },
  statContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 15,
  },
  statColumn: {
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
  },
  statRow: {
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
});
const mapStateToProps = (state) => {
  return {
    player: state.player.player,
  };
};
export default connect(mapStateToProps)(Player);
