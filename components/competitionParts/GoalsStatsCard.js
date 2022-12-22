import React from "react";
import { StyleSheet, View, Image } from "react-native";
//Constant import
import Colors from "../../constants/colors";
//Custom components Import
import Avatar from "../UI/Avatar";
import Card from "../UI/Card";
import Row from "../UI/Row";
import H2 from "../typography/H2";
import H3 from "../typography/H3";
import Pre from "../typography/Pre";

const GoalsStatsCard = (props) => {
  return (
    <Card style={{ ...Styles.card, ...props.style }}>
      <H2>{props.stats.title}</H2>
      <View style={Styles.globalNumbers}>
        <Row
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <H3>{props.stats.goals}</H3>
          <Image
            source={{
              uri: "https://olympia.phoinix.ai/icos/G.png",
              width: 30,
              height: 30,
            }}
          ></Image>
        </Row>
        <Pre style={{ color: Colors.GreyText, textAlign: "center" }}>
          Goals scored ({props.stats.goals_per_game} per game)
        </Pre>
      </View>
      <Row style={Styles.positions}>
        <View style={Styles.position}>
          <Image
            source={{
              uri: "https://olympia.phoinix.ai/icos/G_with_L.png",
              width: 30,
              height: 30,
            }}
          ></Image>
          <H3 style={{ color: Colors.Primary }}>{props.stats.left_goals}</H3>
        </View>
        <View style={Styles.position}>
          <Image
            source={{
              uri: "https://olympia.phoinix.ai/icos/G_with_R.png",
              width: 30,
              height: 30,
            }}
          ></Image>
          <H3 style={{ color: Colors.Primary }}>{props.stats.right_goals}</H3>
        </View>
        <View style={Styles.position}>
          <Image
            source={{
              uri: "https://olympia.phoinix.ai/icos/G_with_H.png",
              width: 30,
              height: 30,
            }}
          ></Image>
          <H3 style={{ color: Colors.Primary }}>{props.stats.head_goals}</H3>
        </View>
        <View style={Styles.position}>
          <Image
            source={{
              uri: "https://olympia.phoinix.ai/icos/G_with_B.png",
              width: 30,
              height: 30,
            }}
          ></Image>
          <H3 style={{ color: Colors.Primary }}>
            {props.stats.other_part_goals}
          </H3>
        </View>
        <View style={Styles.position}>
          <Image
            source={{
              uri: "https://olympia.phoinix.ai/icos/OG.png",
              width: 30,
              height: 30,
            }}
          ></Image>
          <H3 style={{ color: Colors.Primary }}>{props.stats.own_goals}</H3>
        </View>
      </Row>
    </Card>
  );
};
const Styles = StyleSheet.create({
  card: {
    flexWrap: "wrap",
  },
  globalNumbers: {
    alignItems: "center",
    justifyContent: "space-around",
    flexWrap: "wrap",
    marginVertical: 10,
    width: "100%",
  },
  number: {
    alignItems: "center",
  },
  positions: {
    width: "100%",
    justifyContent: "space-between",
    marginTop: 25,
  },
  position: {
    flex: 1,
    alignItems: "center",
  },
  positionNumbers: {
    alignItems: "center",
  },
});
export default GoalsStatsCard;
