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
  const findMatchFinishType = () => {
    let number = props.stats.with_penalty_shoot_out
      ? 3
      : props.stats.with_extra_time
      ? 2
      : 1;
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
  const renderMatchPartsPoint = () => {
    let elements = [];
    let number = props.stats.with_penalty_shoot_out
      ? 3
      : props.stats.with_extra_time
      ? 2
      : 1;
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
  getTeamStatus = (pos, result) => {
    if (result == 0) return "draw";
    if (result == pos) {
      return "win";
    } else {
      return "lost";
    }
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
            url={props.stats.team1_icon}
            selected={false}
          ></Avatar>
          <Pre>{props.stats.team1_name}</Pre>
        </View>
        {/* Result part */}
        <View style={Styles.results}>
          {/* match Parts Number */}
          <Row style={Styles.matchPartsNumber}>{renderMatchPartsPoint()}</Row>
          {/* match Result Goals Number */}
          <Row style={Styles.matchResult}>
            <View
              style={[
                Styles.resultStatus,
                Styles[
                  getTeamStatus(1, props.stats.result || props.stats.qualified)
                ],
              ]}
            >
              <Pre style={Styles.resultStatusText}>
                {getTeamStatus(
                  1,
                  props.stats.result || props.stats.qualified
                )[0].toUpperCase()}
              </Pre>
            </View>
            <H3>
              {props.stats.timeline
                ? props.stats.timeline[props.stats.timeline.length - 1].score1
                : props.stats.score1}
            </H3>
            <H3> : </H3>
            <H3>
              {props.stats.timeline
                ? props.stats.timeline[props.stats.timeline.length - 1].score2
                : props.stats.score2}
            </H3>
            <View
              style={[
                Styles.resultStatus,
                Styles[
                  getTeamStatus(2, props.stats.result || props.stats.qualified)
                ],
              ]}
            >
              <Pre style={Styles.resultStatusText}>
                {getTeamStatus(
                  2,
                  props.stats.result || props.stats.qualified
                )[0].toUpperCase()}
              </Pre>
            </View>
          </Row>
          {/* match Time type */}
          <Row style={Styles.matchFinishType}>
            <Pre style={Styles.matchFinishTypeText}>
              {findMatchFinishType()}
            </Pre>
          </Row>
        </View>
        {/* Opponent part */}
        <View style={Styles.club}>
          <Avatar
            style={[Styles.avatar, { width: 40, height: 40 }]}
            originalWidth={40}
            originalHeight={40}
            url={props.stats.team2_icon}
            selected={false}
          ></Avatar>
          <Pre>{props.stats.team2_name}</Pre>
        </View>
      </Row>
      {/* Match details section */}
      <Row style={{ ...Styles.details, borderTopColor: props.stats.color }}>
        <View style={Styles.detailsComp}>
          <Ionicons name="calendar-outline" size={24} color="black" />
          <Pre>
            {props.stats.datetime ? props.stats.datetime.slice(0, 8) : ""}
          </Pre>
        </View>
        <View style={Styles.detailsComp}>
          <Ionicons name="time-outline" size={24} color="black" />
          <Pre>
            {props.stats.datetime
              ? props.stats.datetime.slice(10, props.stats.datetime.length)
              : ""}
          </Pre>
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
    width: "33%",
  },
  results: {
    width: "33%",
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
