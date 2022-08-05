//import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/colors";
//import * as ScreenOrientation from "expo-screen-orientation";

const Header = (props) => {
  // const [screenWidth, setScreenWidth] = useState(
  //   Dimensions.get("window").width
  // );
  // useEffect(() => {
  //   ScreenOrientation.addOrientationChangeListener((e) => {
  //     setScreenWidth(Dimensions.get("window").width);
  //   });
  // }, []);
  const BackButton = () => {
    if (!props.navigation.canGoBack()) {
      return null;
    }
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => props.navigation.goBack()}
      >
        <Ionicons
          name="arrow-back-circle-outline"
          size={34}
          color={Colors.Alpha}
        />
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView>
      <View style={{ ...Styles.view, ...props.style }}>
        <BackButton></BackButton>
        <TouchableOpacity
          activeOpacity={0.6}
          style={Styles.brand}
          onPress={() => props.navigation.navigate("Home")}
        >
          <Image
            style={Styles.logo}
            source={require("../../assets/img/logo.png")}
          />
          <Image
            style={Styles.logo}
            source={require("../../assets/img/logo_type.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          style={Styles.menuButton}
          onPress={() => props.navigation.openDrawer()}
        >
          <Ionicons name="md-menu-outline" size={34} color={Colors.Alpha} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const Styles = StyleSheet.create({
  view: {
    backgroundColor: Colors.Primary,
    alignItems: "center",
    height: 90,
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  brand: {
    maxWidth: Dimensions.get("window").width / 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 180,
  },
  logo: {
    height: 70,
    maxWidth: 70,
  },
  menuButton: {
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    padding: 5,
    borderRadius: 4,
  },
});
export default Header;
