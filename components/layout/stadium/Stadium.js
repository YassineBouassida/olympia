import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  Image,
} from "react-native";
//Constant import
import Colors from "../../../constants/colors";
//Custom components Import
import Avatar from "../../UI/Avatar";
import Card from "../../UI/Card";
import Row from "../../UI/Row";
import H2 from "../../typography/H2";
import H3 from "../../typography/H3";
import Pre from "../../typography/Pre";
import PlayerInchor from "./PlayerAnchor";

const image = { uri: "https://olympia.phoinix.ai/pictures/stadium.jpeg" };
//const window = Dimensions.get("window");

const ProfileStats = (props) => {
  const [cardWidth, setCardWidth] = useState(0);
  const [playerCelWidth, setPlayerCelWidth] = useState(0);
  const [playerAnchor, setPlayerAnchor] = useState({
    note: "9.2",
    anchorName: "Robert",
    anchorUrl: "https://olympia.phoinix.ai/pictures/players/464.jpg",
    flagUrl: "https://olympia.phoinix.ai/pictures/clubs/61.png",
  });

  const getSize = (event, param) => {
    const { x, y, height, width } = event.nativeEvent.layout;
    setCardWidth(width - 20);
    setPlayerCelWidth((width - 40) / 4);
  };
  //   const [windowWidth, setWindowWidth] = useState(window.width);
  //   const [windowHeight, setWindowHeight] = useState(window.height);
  //   useEffect(() => {
  //     const subscription = Dimensions.addEventListener(
  //       "change",
  //       ({ window, screen }) => {
  //         setWindowWidth(window.width);
  //         setWindowHeight(window.height);
  //       }
  //     );
  //     return () => subscription?.remove();
  //   });
  //   const playerDim=windowWidth-60
  return (
    <Card onLayout={getSize} style={{ ...Styles.card, ...props.style }}>
      <H2>{props.title}</H2>
      <View style={{ ...Styles.stadiumContainer }}>
        <ImageBackground
          source={image}
          resizeMode="stretch"
          style={Styles.stadiumImage}
        >
          <Row style={{ ...Styles.playersRow, ...Styles.striker }}>
            <PlayerInchor
              size={playerCelWidth}
              details={playerAnchor}
              style={{
                ...Styles.playerContainer,
              }}
            ></PlayerInchor>
          </Row>
          <Row style={{ ...Styles.playersRow, ...Styles.empty }}>
            <View
              style={{
                ...Styles.playerContainer,
                width: playerCelWidth,
                height: playerCelWidth,
              }}
            ></View>
          </Row>
          <Row style={{ ...Styles.playersRow, ...Styles.playMakers }}>
            <PlayerInchor
              size={playerCelWidth}
              details={playerAnchor}
              style={{
                ...Styles.playerContainer,
              }}
            ></PlayerInchor>
            <PlayerInchor
              size={playerCelWidth}
              details={playerAnchor}
              style={{
                ...Styles.playerContainer,
              }}
            ></PlayerInchor>
            <PlayerInchor
              size={playerCelWidth}
              details={playerAnchor}
              style={{
                ...Styles.playerContainer,
              }}
            ></PlayerInchor>
            <PlayerInchor
              size={playerCelWidth}
              details={playerAnchor}
              style={{
                ...Styles.playerContainer,
              }}
            ></PlayerInchor>
          </Row>
          <Row style={{ ...Styles.playersRow, ...Styles.central }}>
            <PlayerInchor
              size={playerCelWidth}
              details={playerAnchor}
              style={{
                ...Styles.playerContainer,
              }}
            ></PlayerInchor>
          </Row>
          <Row style={{ ...Styles.playersRow, ...Styles.defenders }}>
            <PlayerInchor
              size={playerCelWidth}
              details={playerAnchor}
              style={{
                ...Styles.playerContainer,
              }}
            ></PlayerInchor>
            <PlayerInchor
              size={playerCelWidth}
              details={playerAnchor}
              style={{
                ...Styles.playerContainer,
              }}
            ></PlayerInchor>
            <PlayerInchor
              size={playerCelWidth}
              details={playerAnchor}
              style={{
                ...Styles.playerContainer,
              }}
            ></PlayerInchor>
            <PlayerInchor
              size={playerCelWidth}
              details={playerAnchor}
              style={{
                ...Styles.playerContainer,
              }}
            ></PlayerInchor>
          </Row>
          <Row style={{ ...Styles.playersRow, ...Styles.goalKeeper }}>
            <PlayerInchor
              size={playerCelWidth}
              details={playerAnchor}
              style={{
                ...Styles.playerContainer,
              }}
            ></PlayerInchor>
          </Row>
        </ImageBackground>
      </View>
    </Card>
  );
};
const Styles = StyleSheet.create({
  card: {
    flexWrap: "wrap",
  },
  stadiumContainer: {
    marginTop: 10,
    width: "100%",
  },
  stadiumImage: {
    flex: 1,
  },
  playerContainer: {
    marginHorizontal: 2,
    marginVertical: 10,
    alignItems: "center",
  },
  striker: {
    justifyContent: "center",
  },
  playMakers: {
    justifyContent: "space-between",
  },
  central: {
    justifyContent: "center",
  },
  defenders: {
    justifyContent: "space-between",
  },
  goalKeeper: {
    justifyContent: "center",
  },
  avatar: {
    zIndex: 0,
  },
  avatarImage: {
    zIndex: 0,
  },
  note: {
    bottom: -5,
    zIndex: 2,
    backgroundColor: Colors.White,
    paddingHorizontal: 10,
    borderRadius: 5,
    overflow: "hidden",
  },
  name: {
    top: -5,
    zIndex: 2,
    backgroundColor: Colors.Text,
    color: Colors.White,
    paddingHorizontal: 10,
    borderRadius: 15,
    overflow: "hidden",
    borderColor: Colors.White,
    borderWidth: 1,
  },
  flag: {
    zIndex: 3,
    top: -15,
  },
});
export default ProfileStats;
