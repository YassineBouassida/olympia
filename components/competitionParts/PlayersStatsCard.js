import React from "react";
import { StyleSheet, View } from "react-native";
//Constant import
import Colors from "../../constants/colors";
//Custom components Import
import Avatar from "../UI/Avatar";
import Card from "../UI/Card";
import Row from "../UI/Row";
import H2 from "../typography/H2";
import H3 from "../typography/H3";
import Pre from "../typography/Pre";

const playersStatsCard = (props) => {
  return (
    <Card style={{ ...Styles.card, ...props.style }}>
      <H2>{props.stats.title}</H2>
      <Row style={Styles.globalNumbers}>
        <View style={Styles.number}>
          <H3 style={{ color: Colors.Primary }}>{props.stats.players}</H3>
          <Pre style={{ color: Colors.GreyText }}>Used Players</Pre>
        </View>
        <View style={Styles.number}>
          <H3 style={{ color: Colors.Primary }}>
            {props.stats.different_leagues}
          </H3>
          <Pre style={{ color: Colors.GreyText }}>Different Nationalities</Pre>
        </View>
      </Row>
      <Row style={Styles.nationalities}>
        {props.stats.most_occurences.map((nationality, key) => {
          return (
            <View style={Styles.nationality} key={key}>
              <Avatar
                style={[Styles.avatar, { width: 30, height: 30 }]}
                originalWidth={30}
                originalHeight={30}
                url={nationality.flag}
                selected={false}
              ></Avatar>
              <Row style={Styles.nationalityNumbers}>
                <H3 style={{ color: Colors.Primary, marginRight: 10 }}>
                  {nationality.number}
                </H3>
                <Pre style={{ color: Colors.GreyText }}>Players</Pre>
              </Row>
              <Pre style={{ color: Colors.GreyText }}>
                ({nationality.percentage}%)
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
export default playersStatsCard;
