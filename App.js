import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Dimensions } from "react-native";
import Header from "./components/layout/Header";

export default () => {
  return (
    <SafeAreaView style={{ width: Dimensions.get("window").width }}>
      <Header></Header>
    </SafeAreaView>
  );
};
