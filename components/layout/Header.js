import React from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import Colors from "../../constants/colors";

const Header = (props) => {
  return (
    <View style={{ ...Styles.view, ...props.style }}>
      <View style={Styles.brand}>
        <Image
          style={Styles.logo}
          source={require("../../assets/img/logo.png")}
        />
        <Image
          style={Styles.logo}
          source={require("../../assets/img/logo_type.png")}
        />
      </View>
    </View>
  );
};
const Styles = StyleSheet.create({
  view: {
    backgroundColor: Colors.Primary,
    alignItems: "center",
    height: 90,
    width: "100%",
    justifyContent: "space-between",
  },
  brand: {
    maxWidth: Dimensions.get("window").width / 3,
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    height: 80,
    width: 80,
  },
});
export default Header;
