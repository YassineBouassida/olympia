import React from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

//Import Canstants
import Colors from "../../../constants/colors";
import Typo from "../../../constants/typo";
// Import Custom components
import Avatar from "../../UI/Avatar";
import Pre from "../../typography/Pre";
const PlayerAnchor = (props) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        ...props.style,
        width: props.size,
        height: props.size * 1.3,
        ...Styles.playerAnchor,
      }}
      onPress={() => props.navigation.navigate("Player")}
    >
      <Text style={Styles.note}>{props.details.rating}</Text>
      <Avatar
        style={[
          Styles.avatar,
          { with: props.size - 40, height: props.size - 40 },
        ]}
        imageStyle={{ ...Styles.avatarImage }}
        originalWidth={props.size - 40}
        originalHeight={props.size - 40}
        url={props.details.player_picture}
        selected={true}
        onPress={() =>
          navigation.navigate("Player", { id: props.details.player_id })
        }
      ></Avatar>
      <Pre style={Styles.name}>
        {props.details[`player_name_${props.lang.type}`]}
      </Pre>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Team", { id: props.details.team_club_id })
        }
      >
        <Image
          style={Styles.flag}
          source={{
            uri: props.details.team_club_logo,
            width: 30,
            height: 30,
          }}
        ></Image>
      </TouchableOpacity>
    </View>
  );
};
const Styles = StyleSheet.create({
  playerAnchor: {
    justifyContent: "center",
  },
  avatar: {
    zIndex: 0,
    backgroundColor: "rgba(0,0,0,.5)",
  },
  avatarImage: {},
  note: {
    bottom: -5,
    zIndex: 2,
    backgroundColor: Colors.White,
    paddingHorizontal: 10,
    borderRadius: 5,
    overflow: "hidden",
  },
  name: {
    top: -5,
    zIndex: 2,
    backgroundColor: Colors.Text,
    color: Colors.White,
    paddingHorizontal: 10,
    borderRadius: 15,
    overflow: "hidden",
    borderColor: Colors.White,
    borderWidth: 1,
    fontSize: Typo.XSmall,
  },
  flag: {
    zIndex: 3,
    top: -15,
  },
});
export default PlayerAnchor;
