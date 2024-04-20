import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Text,
  Dimensions,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../constants/colors";
import Carousel from "react-native-snap-carousel";

//Redux imports
import {
  fetchPlayers,
  fetchClubs,
  fetchTeamOfTheSeason,
  fetchMostValuablePlayer,
  fetchMostValuableYoungPlayer,
  fetchMostValuableGoalPlayer,
  fetchGameBar,
} from "../store/actions/home";
import { useSelector, useDispatch } from "react-redux";

//Custom components Import
import H1 from "../components/typography/H1";
import SpecialStats from "../components/home/SpecialStats";
import SpecialTeamStats from "../components/home/SpecialTeamStats";
import ProfileStats from "../components/home/ProfileStats";
import Stadium from "../components/layout/stadium/Stadium";
import GameBarCard from "../components/home/GameBarCard";
import { connect } from "react-redux";
const Home = (props) => {
  const dispatcher = useDispatch();

  const [isLoadingData, setIsLoadingData] = useState(true);
  const [carouselRef, setCarouselRef] = useState(null);
  const { width } = Dimensions.get("window");
  const lang = useSelector((state) => state.metadata.lang);
  const [nowDate, setNowDate] = useState(new Date().getTime());
  let everySecondIntervall = null;
  let everyFiveSecondIntervall = null;

  useEffect(() => {
    let isMounted = true;
    setIsLoadingData(true);

    props.fetchAllData().then((res) => {
      if (isMounted) {
        setIsLoadingData(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      if (everySecondIntervall) clearInterval(everySecondIntervall);
      if (everyFiveSecondIntervall) clearInterval(everyFiveSecondIntervall);

      everySecondIntervall = setInterval(() => {
        let newNowDate = new Date().getTime();
        setNowDate(newNowDate);
      }, 1000);
      everyFiveSecondIntervall = setInterval(() => {
        dispatcher(fetchGameBar());
      }, 5000);

      return () => {
        if (everySecondIntervall) clearInterval(everySecondIntervall);
        if (everyFiveSecondIntervall) clearInterval(everyFiveSecondIntervall);
      };
    }, [])
  );
  const getClosestGameIndex = () => {
    let closestGameIndex = 0;
    closestGameIndex = props.gamebar.findIndex((game) => {
      return game.closest_game;
    });
    return closestGameIndex;
  };
  const renderGamesBar = ({ index, item }) => {
    return (
      <GameBarCard
        key={item.id}
        game={item}
        lang={lang}
        now={nowDate}
      ></GameBarCard>
    );
  };
  if (isLoadingData) {
    return (
      <View style={Styles.centered}>
        <ActivityIndicator size="large" color={Colors.Primary} />
      </View>
    );
  }
  return (
    <SafeAreaView edges={["bottom", "left"]}>
      <ScrollView style={Styles.ScrollView}>
        <View style={Styles.specialStats}>
          <Carousel
            layout={"default"}
            ref={(c) => {
              setCarouselRef(c);
            }}
            data={props.gamebar}
            sliderWidth={width}
            itemWidth={200}
            firstItem={getClosestGameIndex()}
            renderItem={renderGamesBar}
            onLayout={() => {
              carouselRef.snapToItem(getClosestGameIndex());
            }}
          />
          <H1>Special Stats</H1>
          <SpecialStats stats={props.players}></SpecialStats>
          <SpecialTeamStats stats={props.clubs}></SpecialTeamStats>
          <H1>Olympia Rewards Top 5 Leagues</H1>
          <ProfileStats
            stats={props.mostValuablePlayer}
            title="Most Valuable Player"
            key="1"
          ></ProfileStats>
          <ProfileStats
            title="Most Valuable Goalkeeper"
            stats={props.mostValuableGoalKeeper}
            key="2"
          ></ProfileStats>
          <ProfileStats
            title="Most Valuable Young Player"
            stats={props.mostValuableYoungPlayer}
            key="3"
          ></ProfileStats>

          <Stadium
            positions={props.teamOfTheSeason}
            title={"Team Of The Season"}
          ></Stadium>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const Styles = StyleSheet.create({
  ScrollView: {
    paddingTop: 20,
  },
  specialStats: {},
});
const allActions = [
  fetchPlayers(),
  fetchClubs(),
  fetchMostValuablePlayer(),
  fetchMostValuableYoungPlayer(),
  fetchMostValuableGoalPlayer(),
  fetchTeamOfTheSeason(),
  fetchGameBar(),
];
const mapDispatchToProps = (dispatch) => ({
  fetchAllData: async () => {
    const unresolvedPromises = allActions.map(async (action) => {
      return await dispatch(action);
    });
    const results = await Promise.all(unresolvedPromises);
    return results;
  },
});
const mapStateToProps = (state) => {
  return {
    players: state.home.players,
    clubs: state.home.clubs,
    gamebar: state.home.gamebar,
    teamOfTheSeason: state.home.teamOfTheSeason,
    mostValuablePlayer: state.home.mostValuablePlayer,
    mostValuableYoungPlayer: state.home.mostValuableYoungPlayer,
    mostValuableGoalKeeper: state.home.mostValuableGoalKeeper,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
