import React from "react";
import { Text, StyleSheet, View } from "react-native";
import Typo from "../../constants/typo";
import Colors from "../../constants/colors";
const Pre = (props) => {
  return (
    <View>
      <Text style={{ ...Styles.scoped, ...props.style }}>{props.children}</Text>
    </View>
  );
};
const Styles = StyleSheet.create({
  scoped: {
    fontSize: Typo.Medium,
    fontFamily: "metropolis",
    color: Colors.Text,
    paddingVertical: 5,
  },
});
export default Pre;
