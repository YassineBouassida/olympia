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
        {props.stats.cards.map((card) => {
          return (
            <View style={Styles.number} key={card.key}>
              <Row style={{ alignItems: "center" }}>
                <H3 style={{ color: Colors.Primary }}>{card.number}</H3>
                <Image
                  source={{ uri: card.url, width: 30, height: 30 }}
                ></Image>
              </Row>
              <Pre style={{ color: Colors.GreyText }}>{card.text}</Pre>
              <Pre style={{ color: Colors.GreyText }}>
                ({card.percentage} per game)
              </Pre>
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
