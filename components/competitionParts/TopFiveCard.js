import React from "react";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
//Constant import
import Colors from "../../constants/colors";
//Custom components Import
import Avatar from "../UI/Avatar";
import Card from "../UI/Card";
import Row from "../UI/Row";
import H2 from "../typography/H2";
import H3 from "../typography/H3";
import Pre from "../typography/Pre";
import { Link } from "native-base";

const TopFiveCard = (props) => {
  return (
    <Card style={{ ...Styles.card, ...props.style }}>
      <H2>{props.stats.title}</H2>
      <View style={Styles.cardHeader}>
        <H3>{props.stats.header.text}</H3>
      </View>
      <View style={Styles.cardBody}>
        {props.stats.data.map((item, index) => {
          if (index == 0) {
            return (
              <Row style={Styles.firstRow} key={index + "top5"}>
                <View>
                  <Row>
                    <H3>{index + 1 + ". "}</H3>
                    <H3>{item.name}</H3>
                  </Row>
                  <H3 style={Styles.number}>{item.nbr}</H3>
                </View>
                <Avatar
                  style={[Styles.avatar, { width: 45, height: 45 }]}
                  originalWidth={45}
                  originalHeight={45}
                  url={item.url}
                  selected={false}
                ></Avatar>
              </Row>
            );
          }
          return (
            <Row style={Styles.regularRow} key={index + "top5"}>
              <Row>
                <Pre>{index + 1 + ". "}</Pre>
                <Row>
                  <Avatar
                    style={[Styles.avatar, { width: 25, height: 25 }]}
                    originalWidth={25}
                    originalHeight={25}
                    url={item.url}
                    selected={false}
                  ></Avatar>
                  <Pre>{item.name}</Pre>
                </Row>
              </Row>

              <H3 style={Styles.number}>{item.nbr}</H3>
            </Row>
          );
        })}
      </View>
      <View style={Styles.cardFooter}>
        <Pre>{props.stats.footer.text}</Pre>
      </View>
    </Card>
  );
};
const Styles = StyleSheet.create({
  card: {
    flexDirection: "column",
  },
  avatar: {
    marginRight: 5,
  },
  regularRow: {
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.BorderLine,
  },
  firstRow: {
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 10,
    marginHorizontal: -10,
  },
  number: {
    color: Colors.Primary,
  },
});
export default TopFiveCard;
