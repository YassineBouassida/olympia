import React from "react";
import { StyleSheet, View } from "react-native";
import Colors from "../../constants/colors";
const Card = (props) => {
  return (
    <View
      onLayout={props.onLayout}
      style={{ ...Styles.scoped, ...props.style }}
    >
      {props.children}
    </View>
  );
};
const Styles = StyleSheet.create({
  scoped: {
    backgroundColor: Colors.Alpha,
    marginVertical: 20,
    padding: 10,
    flexWrap: "wrap",
    flexDirection: "row",
  },
});
export default Card;
