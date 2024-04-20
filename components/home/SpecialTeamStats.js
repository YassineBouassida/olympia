import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
//Custom components Import
import TeamAdditionalInfo from "./TeamAdditionalInfo";
import Avatar from "../UI/Avatar";
import Card from "../UI/Card";
import { useSelector } from "react-redux";

const SpecialStats = (props) => {
  const lang = useSelector((state) => state.metadata.lang);
  const [selectedStat, setselectedStat] = useState(0);
  const onPressAvatar = (playerId) => {
    setselectedStat(playerId);
  };
  const hasAdditionalInfo = (stat) => {
    if (!stat.ranking) return;
    else {
      return (
        <TeamAdditionalInfo
          info={{ ...stat, url: stat.team_icon }}
          lang={lang}
        ></TeamAdditionalInfo>
      );
    }
  };
  return (
    <Card style={{ ...Styles.card, ...props.style }}>
      <View style={Styles.gridView}>
        {props.stats &&
          props.stats.map((stat, index) => {
            return (
              <View key={index} style={Styles.avatarContainer}>
                <Avatar
                  onPress={() => onPressAvatar(index)}
                  style={[Styles.avatar]}
                  imageStyle={Styles.avatarImage}
                  originalWidth={180}
                  originalHeight={180}
                  url={stat.team_icon}
                  selected={selectedStat === index}
                ></Avatar>
              </View>
            );
          })}
      </View>
      {/* Stat additional information */}
      {hasAdditionalInfo(props.stats[selectedStat])}
    </Card>
  );
};
const Styles = StyleSheet.create({
  card: {
    flexWrap: "wrap",
  },
  gridView: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
  avatarContainer: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  avatar: {
    height: 80,
    width: 80,
  },
  avatarImage: {
    width: 60,
    height: 60,
  },
});
export default SpecialStats;
