import React from "react";
import { Text, StyleSheet, View } from "react-native";
import Typo from "../../constants/typo";
import Colors from "../../constants/colors";
const H3 = (props) => {
  return (
    <View>
      <Text style={{ ...Styles.scoped, ...props.style }}>{props.children}</Text>
    </View>
  );
};
const Styles = StyleSheet.create({
  scoped: {
    fontSize: Typo.Large,
    fontFamily: "metropolisBold",
    color: Colors.Text,
    paddingVertical: 10,
  },
});
export default H3;
