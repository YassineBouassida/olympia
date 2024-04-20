import React from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

//Constant import
import Colors from "../../constants/colors";
//Custom components Import
import Avatar from "../UI/Avatar";
import Card from "../UI/Card";
import Row from "../UI/Row";
import H2 from "../typography/H2";
import H3 from "../typography/H3";
import Pre from "../typography/Pre";
import { useSelector } from "react-redux";

const ProfileStats = (props) => {
  const lang = useSelector((state) => state.metadata.lang);
  const navigation = useNavigation();

  return (
    <Card style={{ ...Styles.card, ...props.style }}>
      <H2>{props.title}</H2>
      <Row style={Styles.profile}>
        <View style={Styles.representer}>
          <Avatar
            style={[Styles.avatar]}
            imageStyle={Styles.avatarImage}
            originalWidth={180}
            originalHeight={180}
            url={props.stats.picture}
            selected={true}
          ></Avatar>
          <H3 style={{ color: Colors.Primary }}>
            {props.stats[`name_${lang.type}`]}
          </H3>
          <Row style={Styles.flags}>
            <Avatar
              style={[Styles.flag]}
              imageStyle={Styles.flagImage}
              originalWidth={60}
              originalHeight={60}
              url={props.stats.team_club_logo}
              onPress={() => {
                navigation.navigate("Team", { id: props.stats.team_club_id });
              }}
            ></Avatar>
            <Avatar
              style={[Styles.flag]}
              imageStyle={Styles.flagImage}
              originalWidth={60}
              originalHeight={60}
              url={props.stats.team_nation_logo}
              onPress={() => {
                navigation.navigate("Team", { id: props.stats.team_nation_id });
              }}
            ></Avatar>
          </Row>
        </View>
        <View style={Styles.stats}>
          <Row style={Styles.rating}>
            <Pre style={{ textAlign: "right" }}>OLYMPIA RATING</Pre>
            <H3 style={{ ...Styles.note, ...Styles.superNote }}>
              {props.stats.rating}
            </H3>
          </Row>
          <Row style={Styles.rating}>
            <Pre style={{ textAlign: "right" }}>MOTM Awards</Pre>
            <H3 style={{ ...Styles.note, ...Styles.normalNote }}>
              {props.stats.motm_awards}
            </H3>
          </Row>
          {props.stats.attributes.map((attr, index) => {
            return (
              <Row style={Styles.rating} key={index}>
                <Pre style={{ textAlign: "right" }}>
                  {attr[`name_${lang.key}`]}
                </Pre>
                <H3 style={{ ...Styles.note, ...Styles.normalNote }}>
                  {attr.value}
                </H3>
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
  },
  normalNote: {
    color: Colors.Primary,
  },
  superNote: {
    backgroundColor: Colors.Primary,
    color: Colors.White,
  },
});
export default ProfileStats;
