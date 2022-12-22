import React from "react";
import { StyleSheet, View } from "react-native";
import Colors from "../../constants/colors";
import { FontAwesome5 } from "@expo/vector-icons";

//Custom components
import H3 from "../typography/H3";
import Pre from "../typography/Pre";
import Small from "../typography/Small";
import Row from "../UI/Row";
import Avatar from "../UI/Avatar";
const formatTime = (milliseconds) => {
  var seconds = (milliseconds / 1000).toFixed(0);
  var minutes = Math.floor(seconds / 60);
  var hours = "";

  seconds = Math.floor(seconds % 60);

  seconds = seconds >= 10 ? seconds : "0" + seconds;

  if (minutes > 59) {
    hours = Math.floor(minutes / 60);
    minutes = minutes - hours * 60;
    minutes = minutes >= 10 ? minutes : "0" + minutes;
  }

  if (hours != "") {
    return hours + ":" + minutes + ":" + seconds;
  }

  return minutes + ":" + seconds;
};

const convertDate = (dateTime) => {
  let result = { date: "", time: "" };
  let date = [];
  let time = "";
  if (dateTime) {
    let dateTimeArray = dateTime.split(" ");
    date = dateTimeArray[0].split("-");
    //date = date[1] + "-" + date[0] + "-" + date[2];
    time = dateTimeArray[1].split(":");
    let createdDate = new Date(
      Date.UTC(date[2], date[1] - 1, date[0], time[0], time[1])
    );

    result = {
      fullDate: createdDate,
      date: createdDate.toLocaleDateString(),
      time: createdDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  }
  return result;
};
const GameBarCard = (props) => {
  const countDown = (dateTime) => {
    if (!dateTime) return "";
    let gameTime = convertDate(dateTime).fullDate.getTime();
    console.log("====================================");
    console.log(
      "game time",
      convertDate(dateTime).fullDate,
      new Date(gameTime),
      "now time",
      new Date(props.now)
    );
    console.log("====================================");
    // if (gameTime - props.now > 86400000) return "";
    return formatTime(gameTime - props.now);
  };
  getTeamStatus = (pos, result) => {
    if (result == 0) return "draw";
    if (result == pos) {
      return "win";
    } else if (result == undefined) {
      return "empty";
    } else {
      return "lost";
    }
  };
  return (
    <View
      style={{
        ...Styles.gameBarCard,
        ...props.style,
        borderColor: props.game.status_color,
      }}
    >
      <Row style={Styles.edition}>
        <Avatar
          style={[Styles.avatar, { width: 25, height: 25 }]}
          originalWidth={25}
          originalHeight={25}
          url={props.game.edition_logo}
          selected={false}
        ></Avatar>
        <Pre style={{ fontWeight: "bold" }}>
          {props.game[`edition_name_${props.lang.key}`]}
        </Pre>
      </Row>
      <View style={Styles.dateTime}>
        <Pre>{convertDate(props.game.datetime).date}</Pre>
        <Pre>{convertDate(props.game.datetime).time}</Pre>
        <Pre>
          {props.game.status_en == "Live"
            ? props.game[`timing_${props.lang.key}`]
            : countDown(props.game.datetime)}
        </Pre>
      </View>
      <Row style={Styles.flagsAndResults}>
        <View style={{ ...Styles.team1, ...Styles.team }}>
          <View
            style={[
              Styles.point,
              Styles[
                getTeamStatus(1, props.game.result || props.game.qualified)
              ],
            ]}
          ></View>
          <Avatar
            style={[Styles.avatar, { width: 50, height: 50 }]}
            originalWidth={50}
            originalHeight={50}
            url={props.game.team1_icon}
            selected={false}
          ></Avatar>
        </View>
        <Row style={Styles.results}>
          <Pre style={Styles.score}>
            {props.game.timeline
              ? props.game.timeline[props.game.timeline.length - 1].score1
              : props.game.score1}
          </Pre>
          <Pre style={Styles.score}>:</Pre>
          <Pre style={Styles.score}>
            {props.game.timeline
              ? props.game.timeline[props.game.timeline.length - 1].score2
              : props.game.score2}
          </Pre>
        </Row>
        <View style={{ ...Styles.team2, ...Styles.team }}>
          <View
            style={[
              Styles.point,
              Styles[
                getTeamStatus(2, props.game.result || props.game.qualified)
              ],
            ]}
          ></View>
          <Avatar
            style={[Styles.avatar, { width: 50, height: 50 }]}
            originalWidth={50}
            originalHeight={50}
            url={props.game.team2_icon}
            selected={false}
          ></Avatar>
        </View>
      </Row>
      <Row style={Styles.context}>
        <Pre style={{ textAlign: "center" }}>
          {props.game[`context_${props.lang.key}`]}
        </Pre>
      </Row>
      <FontAwesome5
        name="external-link-alt"
        size={24}
        color={props.game.status_color}
      />
    </View>
  );
};
const Styles = StyleSheet.create({
  gameBarCard: {
    width: 200,
    alignItems: "center",
    borderWidth: 1,
    padding: 5,
  },
  edition: {
    alignItems: "center",
    justifyContent: "center",
  },
  dateTime: {
    alignItems: "center",
    justifyContent: "center",
  },
  flagsAndResults: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  team: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  results: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
  point: {
    width: 8,
    height: 8,
    borderRadius: 8,
    marginVertical: 5,
  },
  context: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
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
  score: {
    fontSize: 32,
    marginHorizontal: 3,
  },
});
export default GameBarCard;
