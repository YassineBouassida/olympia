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
import { useSelector } from "react-redux";

const image = require("../../../assets/img/Field.jpg");
//const window = Dimensions.get("window");

const Stadium = (props) => {
  const lang = useSelector((state) => state.metadata.lang);

  const [cardWidth, setCardWidth] = useState(0);
  const [playerCelWidth, setPlayerCelWidth] = useState(0);

  const getSize = (event, param) => {
    const { x, y, height, width } = event.nativeEvent.layout;
    setCardWidth(width - 20);
    setPlayerCelWidth((width - 40) / 4);
  };
  const getPosDetails = (pos) => {
    return props.positions.find((p) => pos == p.position);
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
              pos="ST"
              lang={lang}
              size={playerCelWidth}
              details={getPosDetails("ST")}
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
              pos="LW"
              lang={lang}
              size={playerCelWidth}
              details={getPosDetails("LW")}
              style={{
                ...Styles.playerContainer,
              }}
            ></PlayerInchor>
            <PlayerInchor
              pos="CM-L"
              lang={lang}
              size={playerCelWidth}
              details={getPosDetails("CM-L")}
              style={{
                ...Styles.playerContainer,
              }}
            ></PlayerInchor>
            <PlayerInchor
              pos="CM-R"
              lang={lang}
              size={playerCelWidth}
              details={getPosDetails("CM-R")}
              style={{
                ...Styles.playerContainer,
              }}
            ></PlayerInchor>
            <PlayerInchor
              pos="RW"
              lang={lang}
              size={playerCelWidth}
              details={getPosDetails("RW")}
              style={{
                ...Styles.playerContainer,
              }}
            ></PlayerInchor>
          </Row>
          <Row style={{ ...Styles.playersRow, ...Styles.central }}>
            <PlayerInchor
              pos="CM"
              lang={lang}
              size={playerCelWidth}
              details={getPosDetails("CM")}
              style={{
                ...Styles.playerContainer,
              }}
            ></PlayerInchor>
          </Row>
          <Row style={{ ...Styles.playersRow, ...Styles.defenders }}>
            <PlayerInchor
              pos="LB"
              lang={lang}
              size={playerCelWidth}
              details={getPosDetails("LB")}
              style={{
                ...Styles.playerContainer,
              }}
            ></PlayerInchor>
            <PlayerInchor
              pos="CD-L"
              lang={lang}
              size={playerCelWidth}
              details={getPosDetails("CD-L")}
              style={{
                ...Styles.playerContainer,
              }}
            ></PlayerInchor>
            <PlayerInchor
              pos="CD-R"
              lang={lang}
              size={playerCelWidth}
              details={getPosDetails("CD-R")}
              style={{
                ...Styles.playerContainer,
              }}
            ></PlayerInchor>
            <PlayerInchor
              pos="RB"
              lang={lang}
              size={playerCelWidth}
              details={getPosDetails("RB")}
              style={{
                ...Styles.playerContainer,
              }}
            ></PlayerInchor>
          </Row>
          <Row style={{ ...Styles.playersRow, ...Styles.goalKeeper }}>
            <PlayerInchor
              pos="GK"
              lang={lang}
              size={playerCelWidth}
              details={getPosDetails("GK")}
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
    paddingVertical: 15,
  },
  stadiumImage: {
    flex: 1,
    paddingVertical: 25,
  },
  playerContainer: {
    marginHorizontal: 2,
    marginVertical: 10,
    alignItems: "center",
  },
  playersRow: {
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
export default Stadium;
