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
          <H3>{props.stats.goalsNumber}</H3>
          <Image
            source={{
              uri: "https://olympia.phoinix.ai/icos/G.png",
              width: 30,
              height: 30,
            }}
          ></Image>
        </Row>
        <Pre style={{ color: Colors.GreyText, textAlign: "center" }}>
          Goals scored ({props.stats.avg} per game)
        </Pre>
      </View>
      <Row style={Styles.positions}>
        {props.stats.positions.map((position) => {
          return (
            <View style={Styles.position} key={position.key}>
              <Image
                source={{
                  uri: position.url,
                  width: position.size,
                  height: position.size,
                }}
              ></Image>
              <H3 style={{ color: Colors.Primary }}>{position.number}</H3>
            </View>
          );
        })}
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
