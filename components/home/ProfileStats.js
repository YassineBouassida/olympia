import React from "react";
import { StyleSheet, View } from "react-native";
//Constant import
import Colors from "../../constants/colors";
//Custom components Import
import Avatar from "../UI/Avatar";
import Card from "../UI/Card";
import Row from "../UI/Row";
import H2 from "../typography/H2";
import H3 from "../typography/H3";
import Pre from "../typography/Pre";

const ProfileStats = (props) => {
  const getNoteStyle = (note) => {
    return note > 9
      ? { ...Styles.note, ...Styles.superNote }
      : { ...Styles.note };
  };
  return (
    <Card style={{ ...Styles.card, ...props.style }}>
      <H2>{props.stats.title}</H2>
      <Row style={Styles.profile}>
        <View style={Styles.representer}>
          <Avatar
            style={[Styles.avatar]}
            imageStyle={Styles.avatarImage}
            originalWidth={180}
            originalHeight={180}
            url={props.stats.representerUrl}
            selected={true}
          ></Avatar>
          <H3 style={{ color: Colors.Primary }}>{props.stats.profileName}</H3>
          <Row style={Styles.flags}>
            {props.stats.flags.map((flag) => {
              return (
                <Avatar
                  style={[Styles.flag]}
                  imageStyle={Styles.flagImage}
                  originalWidth={60}
                  originalHeight={60}
                  url={flag.url}
                  key={flag.key}
                ></Avatar>
              );
            })}
          </Row>
        </View>
        <View style={Styles.stats}>
          {props.stats.ratings.map((rating) => {
            return (
              <Row style={Styles.rating} key={rating.key}>
                <Pre style={{ textAlign: "right" }}>{rating.name}</Pre>
                <H3 style={getNoteStyle(rating.note)}>{rating.note}</H3>
              </Row>
            );
          })}
        </View>
      </Row>
    </Card>
  );
};
const Styles = StyleSheet.create({
  card: {
    flexWrap: "wrap",
  },
  profile: {
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  representer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  flag: {
    width: 50,
    height: 50,
    margin: 10,
  },
  flagImage: {
    width: 50,
    height: 50,
  },
  avatarContainer: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  avatar: {
    height: 120,
    width: 120,
    marginBottom: 10,
  },
  avatarImage: {
    width: 110,
    height: 110,
  },
  stats: {
    width: "100%",
  },
  rating: {
    justifyContent: "flex-end",
    alignItems: "center",
    marginVertical: 5,
  },
  note: {
    fontFamily: "metropolisBold",
    width: 50,
    height: 45,
    borderWidth: 2,
    borderColor: Colors.Primary,
    alignItems: "center",
    textAlign: "center",
    marginLeft: 10,
    color: Colors.Primary,
  },
  superNote: {
    backgroundColor: Colors.Primary,
    color: Colors.White,
  },
});
export default ProfileStats;
