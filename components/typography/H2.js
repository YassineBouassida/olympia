import React from "react";
import { Text, StyleSheet, View } from "react-native";
import Typo from "../../constants/typo";
import Colors from "../../constants/colors";
const H2 = (props) => {
  return (
    <View>
      <Text style={{ ...Styles.scoped, ...props.style }}>{props.children}</Text>

      <View style={Styles.borderLine}></View>
    </View>
  );
};
const Styles = StyleSheet.create({
  scoped: {
    fontSize: Typo.X_large,
    fontFamily: "metropolisSemiBold",
    color: Colors.Primary,
    paddingVertical: 10,
  },

  borderLine: {
    borderTopColor: Colors.Primary,
    borderTopWidth: 1,
  },
});
export default H2;
