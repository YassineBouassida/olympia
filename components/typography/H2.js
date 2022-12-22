import React from "react";
import { Text, StyleSheet, View } from "react-native";
import Typo from "../../constants/typo";
import Colors from "../../constants/colors";
const H2 = (props) => {
  return (
    <View style={Styles.container}>
      <Text style={{ ...Styles.scoped, ...props.style }}>{props.children}</Text>

      <View style={Styles.borderLine}></View>
    </View>
  );
};
const Styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  scoped: {
    fontSize: Typo.X_large,
    color: Colors.Primary,
    fontWeight: "bold",
    paddingVertical: 10,
    fontVariant: ["small-caps"],
  },

  borderLine: {
    borderTopColor: Colors.Primary,
    borderTopWidth: 1,
  },
});
export default H2;
