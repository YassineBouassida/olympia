import React from "react";
import { Text, StyleSheet, View } from "react-native";
import Typo from "../../constants/typo";
import Colors from "../../constants/colors";
const H1 = (props) => {
  return (
    <View>
      <View style={Styles.headline}>
        <Text style={{ ...Styles.scoped, ...props.style }}>
          {props.children}
        </Text>
      </View>
      <View style={Styles.borderLine}></View>
    </View>
  );
};
const Styles = StyleSheet.create({
  scoped: {
    fontSize: Typo.Xx_large,
    fontFamily: "metropolisBlack",
    fontWeight: "bold",
    color: Colors.Primary,
    paddingVertical: 10,
  },
  headline: {
    borderBottomColor: Colors.Primary,
    borderBottomWidth: 3,
    alignSelf: "flex-start",
    zIndex: 1,
    paddingRight: 5,
  },
  borderLine: {
    borderTopColor: Colors.BorderLine,
    borderTopWidth: 3,
    marginTop: -3,
  },
});
export default H1;
