import React from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import Colors from "../../constants/colors";
const Avatar = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={props.onPress}
      style={[
        Styles.avatar,
        props.selected ? Styles.selectedAvatar : Styles.unSelectedAvatar,
        props.style,
      ]}
    >
      <Image
        style={{ ...Styles.avatarImage, ...props.imageStyle }}
        source={{
          uri: props.url,
          width: props.originalWidth,
          height: props.originalHeight,
        }}
      />
    </TouchableOpacity>
  );
};
const Styles = StyleSheet.create({
  avatar: {
    borderRadius: 150,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  selectedAvatar: {
    borderColor: Colors.Primary,
    borderWidth: 2,
  },
  unSelectedAvatar: {
    borderColor: Colors.White,
    borderWidth: 2,
  },
});
export default Avatar;
