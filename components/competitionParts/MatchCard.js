import React from "react";
import { StyleSheet, View } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
//Constant import
import Colors from "../../constants/colors";
//Custom components Import
import Avatar from "../UI/Avatar";
import Card from "../UI/Card";
import Row from "../UI/Row";
import H2 from "../typography/H2";
import H3 from "../typography/H3";
import Pre from "../typography/Pre";

const MatchCard = (props) => {
  const findMatchFinishType = (number) => {
    switch (number) {
      case 1:
        return "Regular Time";
        break;
      case 2:
        return "Additional Time";
        break;
      case 3:
        return "Penalty Shoot-out";
        break;

      default:
        break;
    }
  };
  const renderMatchPartsPoint = (number) => {
    let elements = [];
    for (let index = 3; index > 0; index--) {
      const element = (
        <View
          key={index}
          style={[
            Styles.matchPartPoint,
            number >= index ? Styles.filledPoint : Styles.emptyPoint,
          ]}
        ></View>
      );
      elements.push(element);
    }
    return elements;
  };
  return (
    <Card style={{ ...Styles.card, ...props.style }}>
      <Row style={Styles.opponents}>
        {/* Host part */}
        <View style={Styles.club}>
          <Avatar
            style={[Styles.avatar, { width: 40, height: 40 }]}
            originalWidth={40}
            originalHeight={40}
            url={props.stats.host.flagUrl}
            selected={false}
          ></Avatar>
          <Pre>{props.stats.host.name}</Pre>
        </View>
        {/* Result part */}
        <View>
          {/* match Parts Number */}
          <Row style={Styles.matchPartsNumber}>
            {renderMatchPartsPoint(props.stats.matchPartsNumber)}
          </Row>
          {/* match Result Goals Number */}
          <Row style={Styles.matchResult}>
            <View
              style={[Styles.resultStatus, Styles[props.stats.host.status]]}
            >
              <Pre style={Styles.resultStatusText}>
                {props.stats.host.status[0].toUpperCase()}
              </Pre>
            </View>
            <H3>{props.stats.host.goals}</H3>
            <H3> : </H3>
            <H3>{props.stats.opponent.goals}</H3>
            <View
              style={[Styles.resultStatus, Styles[props.stats.opponent.status]]}
            >
              <Pre style={Styles.resultStatusText}>
                {props.stats.opponent.status[0].toUpperCase()}
              </Pre>
            </View>
          </Row>
          {/* match Time type */}
          <Row style={Styles.matchFinishType}>
            <Pre style={Styles.matchFinishTypeText}>
              {findMatchFinishType(props.stats.matchPartsNumber)}
            </Pre>
          </Row>
        </View>
        {/* Opponent part */}
        <View style={Styles.club}>
          <Avatar
            style={[Styles.avatar, { width: 40, height: 40 }]}
            originalWidth={40}
            originalHeight={40}
            url={props.stats.opponent.flagUrl}
            selected={false}
          ></Avatar>
          <Pre>{props.stats.opponent.name}</Pre>
        </View>
      </Row>
      {/* Match details section */}
      <Row style={Styles.details}>
        <View style={Styles.detailsComp}>
          <Ionicons name="calendar-outline" size={24} color="black" />
          <Pre>{props.stats.date}</Pre>
        </View>
        <View style={Styles.detailsComp}>
          <Ionicons name="time-outline" size={24} color="black" />
          <Pre>{props.stats.time}</Pre>
        </View>
        <View style={Styles.detailsComp}>
          <MaterialCommunityIcons
            name="stadium-variant"
            size={24}
            color="black"
          />
          <Pre>{props.stats.stadium}</Pre>
        </View>
        <View style={Styles.detailsComp}>
          <Ionicons name="md-people-outline" size={24} color="black" />
          <Pre>{props.stats.attendance}</Pre>
        </View>
      </Row>
    </Card>
  );
};
const Styles = StyleSheet.create({
  card: {
    flexWrap: "wrap",
  },
  opponents: {
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  club: {
    alignItems: "center",
  },
  matchResult: {
    justifyContent: "center",
    alignItems: "center",
  },
  resultStatus: {
    width: 35,
    height: 35,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 3,
    marginHorizontal: 10,
  },
  resultStatusText: {
    color: Colors.White,
    fontFamily: "metropolisBold",
  },
  matchPartsNumber: {
    justifyContent: "center",
    marginVertical: 5,
  },
  matchPartPoint: {
    width: 15,
    height: 15,
    borderRadius: 30,
    marginHorizontal: 2,
  },
  filledPoint: {
    backgroundColor: Colors.Primary,
  },
  emptyPoint: {
    backgroundColor: Colors.White,
  },
  win: {
    backgroundColor: Colors.Success,
  },
  draw: {
    backgroundColor: Colors.Info,
  },
  lost: {
    backgroundColor: Colors.Warning,
  },
  matchFinishType: {
    justifyContent: "center",
  },
  matchFinishTypeText: {
    textAlign: "center",
  },
  details: {
    borderTopColor: Colors.BorderLine,
    borderTopWidth: 2,
    width: "100%",
    paddingVertical: 10,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  detailsComp: {
    alignItems: "center",
    marginHorizontal: 5,
  },
});
export default MatchCard;
