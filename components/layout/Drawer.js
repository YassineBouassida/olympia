import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Accordion from "react-native-collapsible/Accordion";
import { Ionicons } from "@expo/vector-icons";
import { Text, StyleSheet, View } from "react-native";
//Custom components import
import Row from "../UI/Row";
import Pre from "../typography/Pre";
// import constants
import Typo from "../../constants/typo";
import Colors from "../../constants/colors";
const Drawer = (props) => {
  const { state } = props;
  const { routes, index } = state;
  const focusedRoute = routes[index].name;
  const [activeSections, setActiveSections] = useState([]);
  //console.log("props ", props);
  const navigateTo = (name) => {
    props.navigation.navigate(name);
  };

  const renderHeader = (link, index, isActive) => {
    return (
      <Row style={Styles.headLinkContainer}>
        <Pre style={Styles.headLink}>{link.name_en}</Pre>
        <Ionicons
          name={isActive ? "chevron-up" : "chevron-down"}
          size={24}
          color={Colors.White}
        />
      </Row>
    );
  };
  const renderContent = (link) => {
    return link.editions.map((subLink) => {
      return (
        <View key={subLink.id}>
          <Text
            style={[
              Styles.subLink,
              subLink.name_en === focusedRoute ? Styles.activeLink : null,
            ]}
            onPress={() => navigateTo(subLink.name_en)}
          >
            {subLink.name_en}
          </Text>
        </View>
      );
    });
  };
  const updateSections = (sections) => {
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };
  return (
    <SafeAreaView>
      <View style={Styles.drawer}>
        <Accordion
          sections={props.list}
          activeSections={activeSections}
          renderHeader={renderHeader}
          renderContent={renderContent}
          onChange={updateSections}
          keyExtractor={(item, index) => index}
          underlayColor={Colors.Primary}
        />
      </View>
    </SafeAreaView>
  );
};
const Styles = StyleSheet.create({
  drawer: {
    backgroundColor: Colors.Primary,
    height: "100%",
    paddingTop: 70,
  },
  headLinkContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    borderBottomColor: Colors.Alpha,
    borderBottomWidth: 0.5,
  },
  headLink: {
    color: Colors.White,
    textAlign: "center",
  },
  subLink: {
    color: Colors.Primary,
    backgroundColor: Colors.White,
    paddingVertical: 10,
    textAlign: "center",
  },
  activeLink: {
    backgroundColor: Colors.Alpha,
    fontFamily: "metropolisBold",
  },
});
export default Drawer;
