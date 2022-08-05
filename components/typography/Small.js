import React from "react";
import { Text, StyleSheet, View } from "react-native";
import Typo from "../../constants/typo";
import Colors from "../../constants/colors";
const Small = (props) => {
  return (
    <View style={{ ...props.viewStyle }}>
      <Text style={{ ...Styles.scoped, ...props.style }}>{props.children}</Text>
    </View>
  );
};
const Styles = StyleSheet.create({
  scoped: {
    fontSize: Typo.Small,
    fontFamily: "metropolisSemiBold",
    color: Colors.Text,
  },
});
export default Small;
