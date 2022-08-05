import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Button } from "react-native";
//Constants Import
//Custom components Import

import H1 from "../components/typography/H1";

import SpecialStats from "../components/home/SpecialStats";
import ProfileStats from "../components/home/ProfileStats";
import Stadium from "../components/layout/stadium/Stadium";
const Home = (props) => {
  const [players, setPlayers] = useState([
    {
      key: 0,
      url: "https://olympia.phoinix.ai/pictures/players/23.jpg",
      name: "Liva0",
      additionalInfo: {
        title: "Karim Ben Zima",
        description: "BEST SOCCER WITH WEAKEST FOOT",
        link: { url: "", text: "IN TOP 5 LEAGUES" },
        top3: [
          { rank: 1, name: "Messi", goals: 9 },
          { rank: 2, name: "Cristiano Ronaldo", goals: 7 },
          { rank: 3, name: "Mbapee", goals: 4 },
        ],
      },
    },
    {
      key: 1,
      url: "https://olympia.phoinix.ai/pictures/players/60.jpg",
      name: "Liva1",
      additionalInfo: {
        title: "Livandowski",
        description: "BEST SOCCER WITH WEAKEST FOOT",
        link: { url: "", text: "IN TOP 5 LEAGUES" },
        top3: [
          { rank: 1, name: "Livandowski", goals: 9 },
          { rank: 2, name: "Mohamed Salah", goals: 7 },
          { rank: 3, name: "Sadio Mane", goals: 4 },
        ],
      },
    },
    {
      key: 2,
      url: "https://olympia.phoinix.ai/pictures/players/11.jpg",
      name: "Liva2",
    },
    {
      key: 3,
      url: "https://olympia.phoinix.ai/pictures/players/15.jpg",
      name: "Liva3",
    },
  ]);
  const [clubs, setClubs] = useState([
    {
      key: 0,
      url: "https://olympia.phoinix.ai/pictures/clubs/23.png",
      name: "Liva0",
      additionalInfo: {
        title: "Karim Ben Zima",
        description: "BEST SOCCER WITH WEAKEST FOOT",
        link: { url: "", text: "IN TOP 5 LEAGUES" },
        top3: [
          { rank: 1, name: "Messi", goals: 9 },
          { rank: 2, name: "Cristiano Ronaldo", goals: 7 },
          { rank: 3, name: "Mbapee", goals: 4 },
        ],
      },
    },
    {
      key: 1,
      url: "https://olympia.phoinix.ai/pictures/clubs/60.png",
      name: "Liva1",
      additionalInfo: {
        title: "Livandowski",
        description: "BEST SOCCER WITH WEAKEST FOOT",
        link: { url: "", text: "IN TOP 5 LEAGUES" },
        top3: [
          { rank: 1, name: "Livandowski", goals: 9 },
          { rank: 2, name: "Mohamed Salah", goals: 7 },
          { rank: 3, name: "Sadio Mane", goals: 4 },
        ],
      },
    },
    {
      key: 2,
      url: "https://olympia.phoinix.ai/pictures/clubs/11.png",
      name: "Liva2",
    },
    {
      key: 3,
      url: "https://olympia.phoinix.ai/pictures/clubs/15.png",
      name: "Liva3",
    },
  ]);
  const [mostValuablePlayer, setMostValuablePlayer] = useState({
    title: "Most Valuable Player",
    representerUrl: "https://olympia.phoinix.ai/pictures/players/15.jpg",
    profileName: "LEWANDOWSKI Robert",
    flags: [
      { url: "https://olympia.phoinix.ai/pictures/clubs/61.png", key: 1 },
      { url: "https://olympia.phoinix.ai/pictures/nations/174.png", key: 2 },
    ],
    ratings: [
      { name: "OLYMPIA RATING", note: "9.2", key: 1 },
      { name: "MOTM Awards", note: "8.2", key: 2 },
      { name: "Played Games", note: "7", key: 3 },
      { name: "Stat 1", note: "3.5", key: 4 },
      { name: "Stat 2", note: "9.5", key: 5 },
    ],
  });
  const [mostValuableGoalKeeper, setMostValuableGoalKeeper] = useState({
    title: "Most Valuable Goalkeper",
    representerUrl: "https://olympia.phoinix.ai/pictures/players/11.jpg",
    profileName: "Messi",
    flags: [
      { url: "https://olympia.phoinix.ai/pictures/clubs/61.png", key: 1 },
      { url: "https://olympia.phoinix.ai/pictures/nations/174.png", key: 2 },
    ],
    ratings: [
      { name: "OLYMPIA RATING", note: "7.2", key: 1 },
      { name: "MOTM Awards", note: "9.2", key: 2 },
      { name: "Played Games", note: "7.4", key: 3 },
      { name: "Stat 1", note: "3.5", key: 4 },
      { name: "Stat 2", note: "9.5", key: 5 },
    ],
  });

  return (
    <ScrollView style={Styles.ScrollView}>
      <View style={Styles.specialStats}>
        <H1>Special Stats</H1>
        <SpecialStats stats={players}></SpecialStats>
        <SpecialStats stats={clubs}></SpecialStats>
        <H1>Olympia Rewards Top 5 Leagues</H1>
        <ProfileStats stats={mostValuablePlayer}></ProfileStats>
        <ProfileStats stats={mostValuableGoalKeeper}></ProfileStats>
        <ProfileStats stats={mostValuableGoalKeeper}></ProfileStats>
        <Stadium title={"Team Of The Season"}></Stadium>
        <H1>Season Overview</H1>
      </View>
    </ScrollView>
  );
};
const Styles = StyleSheet.create({
  ScrollView: {
    padding: 20,
  },
  specialStats: {},
});
export default Home;
