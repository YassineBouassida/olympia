import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import Colors from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";

//Custom components
import H3 from "../typography/H3";
import Pre from "../typography/Pre";
import Small from "../typography/Small";
const AdditionalInfo = (props) => {
  const navigation = useNavigation();
  return (
    <View style={Styles.additionalInfo}>
      <View style={Styles.representer}>
        <Image
          source={{
            uri: props.info.url,
            height: 100,
            width: 100,
          }}
        />
      </View>
      <View style={Styles.stats}>
        <H3 style={{ textAlign: "center" }}>
          {props.info[`player_name_${props.lang.type}`]}
        </H3>
        <Pre style={{ textAlign: "center" }}>
          {props.info[`title_${props.lang.key}`]}
        </Pre>
        <Pre style={{ textAlign: "center", textDecorationLine: "underline" }}>
          {props.info[`competition_${props.lang.key}`]}
        </Pre>
        <View style={Styles.topThree}>
          <View style={{ width: "100%" }}>
            {props.info.ranking.map((player) => {
              return (
                <TouchableOpacity
                  style={Styles.rankLine}
                  key={player.rank}
                  onPress={() => {
                    navigation.navigate("Player", { id: player.player_id });
                  }}
                >
                  <Small viewStyle={Styles.rankContainer} style={Styles.rank}>
                    {player.rank}
                  </Small>
                  <H3 style={{ textAlign: "left" }}>
                    {player[`player_name_${props.lang.type}`]}
                  </H3>
                  <Pre>{player.value}</Pre>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
};
const Styles = StyleSheet.create({
  additionalInfo: {
    borderTopColor: Colors.White,
    borderTopWidth: 1,
    width: "100%",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  representer: {
    width: "100%",
    alignItems: "center",
  },
  stats: {
    flex: 3,
    marginLeft: 0,
    width: "100%",
  },
  topThree: {
    alignItems: "flex-start",
    width: "100%",
  },
  rankLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.Primary,
  },
  rank: {
    color: Colors.White,
    textAlign: "center",
    paddingVertical: 3,
    fontFamily: "metropolisBold",
  },
  rankContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    overflow: "hidden",
    backgroundColor: Colors.Primary,
    width: 30,
    height: 30,
  },
});
export default AdditionalInfo;
