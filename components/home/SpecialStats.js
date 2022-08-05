import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
//Custom components Import
import AdditionalInfo from "./AdditionalInfo";
import Avatar from "../UI/Avatar";
import Card from "../UI/Card";

const SpecialStats = (props) => {
  const [selectedStat, setselectedStat] = useState(1);
  const onPressAvatar = (playerId) => {
    setselectedStat(playerId);
  };
  const hasAdditionalInfo = (stat) => {
    if (!stat.additionalInfo) return;
    else {
      return (
        <AdditionalInfo
          info={{ ...stat.additionalInfo, url: stat.url }}
        ></AdditionalInfo>
      );
    }
  };
  return (
    <Card style={{ ...Styles.card, ...props.style }}>
      <View style={Styles.gridView}>
        {props.stats &&
          props.stats.map((stat) => {
            return (
              <View key={stat.key} style={Styles.avatarContainer}>
                <Avatar
                  onPress={() => onPressAvatar(stat.key)}
                  style={[Styles.avatar]}
                  imageStyle={Styles.avatarImage}
                  originalWidth={180}
                  originalHeight={180}
                  url={stat.url}
                  selected={selectedStat === stat.key}
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
