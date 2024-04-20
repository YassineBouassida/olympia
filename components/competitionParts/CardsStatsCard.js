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

const CardsStatsCard = (props) => {
  return (
    <Card style={{ ...Styles.card, ...props.style }}>
      <H2>{props.stats.title}</H2>
      <Row style={Styles.globalNumbers}>
        <View style={Styles.number}>
          <Row style={{ alignItems: "center" }}>
            <H3 style={{ color: Colors.Primary }}>
              {props.stats.yellow_cards}
            </H3>
            <Image
              source={{
                uri: "https://olympia.phoinix.ai/icos/Y.png",
                width: 30,
                height: 30,
              }}
            ></Image>
          </Row>
          <Pre style={{ color: Colors.GreyText }}>Yellow Cards</Pre>
          <Pre style={{ color: Colors.GreyText }}>
            ({props.stats.yellow_cards_per_game} per game)
          </Pre>
        </View>

        <View style={Styles.number}>
          <Row style={{ alignItems: "center" }}>
            <H3 style={{ color: Colors.Primary }}>
              {props.stats.second_yellow_cards}
            </H3>
            <Image
              source={{
                uri: "https://olympia.phoinix.ai/icos/S.png",
                width: 30,
                height: 30,
              }}
            ></Image>
          </Row>
          <Pre style={{ color: Colors.GreyText }}>Second Yellow Cards</Pre>
          <Pre style={{ color: Colors.GreyText }}>
            ({props.stats.second_yellow_cards_per_game} per game)
          </Pre>
        </View>

        <View style={Styles.number}>
          <Row style={{ alignItems: "center" }}>
            <H3 style={{ color: Colors.Primary }}>{props.stats.red_cards}</H3>
            <Image
              source={{
                uri: "https://olympia.phoinix.ai/icos/R.png",
                width: 30,
                height: 30,
              }}
            ></Image>
          </Row>
          <Pre style={{ color: Colors.GreyText }}>Yellow Cards</Pre>
          <Pre style={{ color: Colors.GreyText }}>
            ({props.stats.red_cards_per_game} per game)
          </Pre>
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
    width: "100%",
    marginVertical: 20,
  },
  nationalities: {
    width: "100%",
    justifyContent: "space-between",
    marginTop: 25,
  },
  nationality: {
    flex: 1,
    alignItems: "center",
  },
  nationalityNumbers: {
    alignItems: "center",
  },
});
export default CardsStatsCard;
