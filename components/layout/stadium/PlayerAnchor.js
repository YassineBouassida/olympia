import React from "react";
import { Text, StyleSheet, View, Image } from "react-native";
//Import Canstants
import Colors from "../../../constants/colors";
// Import Custom components
import Avatar from "../../UI/Avatar";
import Pre from "../../typography/Pre";
const PlayerAnchor = (props) => {
  return (
    <View
      style={{
        ...props.style,
        width: props.size,
        height: props.size * 1.3,
      }}
    >
      <Text style={Styles.note}>{props.details.note}</Text>
      <Avatar
        style={[
          Styles.avatar,
          { with: props.size - 40, height: props.size - 40 },
        ]}
        imageStyle={{ ...Styles.avatarImage }}
        originalWidth={props.size - 40}
        originalHeight={props.size - 40}
        url={props.details.anchorUrl}
        selected={false}
      ></Avatar>
      <Pre style={Styles.name}>{props.details.anchorName}</Pre>
      <Image
        style={Styles.flag}
        source={{
          uri: props.details.flagUrl,
          width: 20,
          height: 20,
        }}
      ></Image>
    </View>
  );
};
const Styles = StyleSheet.create({
  avatar: {
    zIndex: 0,
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
  },
  flag: {
    zIndex: 3,
    top: -15,
  },
});
export default PlayerAnchor;
