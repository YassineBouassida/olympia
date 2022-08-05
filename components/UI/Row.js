import React from "react";
import { StyleSheet, View } from "react-native";
const Row = (props) => {
  return (
    <View style={{ ...Styles.scoped, ...props.style }}>{props.children}</View>
  );
};
const Styles = StyleSheet.create({
  scoped: {
    flexDirection: "row",
  },
});
export default Row;
