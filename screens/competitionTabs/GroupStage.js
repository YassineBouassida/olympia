import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Switch,
} from "react-native";
import {
  Select,
  NativeBaseProvider,
  Modal,
  FormControl,
  Button,
} from "native-base";
//import DatePicker from the package we installed
import DatePicker from "react-native-datepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
// import Dummy data
import { stagesList } from "../../dummyData/groupStage";

// import constants
import Colors from "../../constants/colors";
//Import custom components
import Row from "../../components/UI/Row";
import Table from "../../components/UI/Table";
import Card from "../../components/UI/Card";
import H3 from "../../components/typography/H3";
import H1 from "../../components/typography/H1";
import Pre from "../../components/typography/Pre";
import MatchCard from "../../components/competitionParts/MatchCard";
//Redux imports
import { connect, useSelector, useDispatch } from "react-redux";
import {
  fetchGroupStage,
  fetchDefaultGroupStage,
} from "../../store/actions/edition";
const GroupStage = (props) => {
  const insets = useSafeAreaInsets();
  const [selectedStage, setSelectedStage] = useState(0);
  const [filters, setFilters] = useState({
    venue: "N",
    fromDate: "2021-06-11",
    toDate: "2022-06-11",
    fromMatchDay: 1,
    toMatchDay: 3,
    live: 0,
  });
  const [showFilterModal, setShowFilterModal] = useState(false);
  const lang = useSelector((state) => state.metadata.lang);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const dispatch = useDispatch();
  //Dispatch function
  const dispatchGroupStage = (id) => {
    setIsLoadingData(true);
    dispatch(fetchGroupStage(id, filters)).then(() => {
      setIsLoadingData(false);
    });
  };
  useEffect(() => {
    const id = props.route ? props.route.params.id : 0;
    setIsLoadingData(true);

    dispatch(fetchDefaultGroupStage(id)).then(() => {
      setIsLoadingData(false);
    });
  }, []);
  if (isLoadingData || Object(props.groupstage).length == 0) {
    return (
      <View style={Styles.centered}>
        <ActivityIndicator size="large" color={Colors.Primary} />
      </View>
    );
  }
  const tableHeaders = [
    {
      flex: 1,
      text: "#",
      ref: "Rank",
      type: "text",
    },
    {
      flex: 4,
      text: "Team",
      ref: "team",
      type: "elem",
      elements: [
        { param: "url", ref: "TeamIcon" },
        { param: "text", ref: "TeamName" },
      ],
    },
    {
      flex: 1,
      text: "Pts",
      ref: "Pts",
      type: "text",
    },
    {
      flex: 1,
      text: "P",
      ref: "P",
      type: "text",
    },
    {
      flex: 1,
      text: "W",
      ref: "W",
      type: "text",
    },

    {
      flex: 1,
      text: "D",
      ref: "D",
      type: "text",
    },
    {
      flex: 1,
      text: "L",
      ref: "L",
      type: "text",
    },
    {
      flex: 1,
      text: "GF",
      ref: "GF",
      type: "text",
    },
    {
      flex: 1,
      text: "GA",
      ref: "GA",
      type: "text",
    },
    {
      flex: 1,
      text: "GD",
      ref: "GD",
      type: "text",
    },
  ];
  //reforme Item
  const reformeItem = (item) => {
    // intialize reformed item or team
    let reformedItem = { ...item };
    //Map table header to make data suites the header
    tableHeaders.map((col) => {
      if (col.type == "text") {
        reformedItem[col.ref] = item[col.ref];
      } else if (col.type == "elem") {
        //Type elem means data is composed eg:team:{url:'',text:''}
        let elements = {};
        col.elements.map((elem) => {
          elements = { ...elements, [elem.param]: item[elem.ref] };
        });
        reformedItem[col.ref] = elements;
      }
    });
    return reformedItem;
  };
  //Reforme data to suite table headers
  const reformeData = () => {
    let data = props.groupstage.pages[selectedStage];
    let listOfPools = [[]];
    if (data.standings) {
      data.standings.map((item) => {
        //push reformed item to reformed data
        listOfPools[0].push(reformeItem(item));
      });
    } else if (data.pools) {
      data.pools.map((pool, index) => {
        pool.standings.map((item) => {
          //push reformed item to reformed data
          listOfPools[index]
            ? listOfPools[index].push(reformeItem(item))
            : (listOfPools[index] = [reformeItem(item)]);
        });
      });
    }
    return listOfPools;
  };
  //Find games if exist
  const findGames = () => {
    let matchDays = props.groupstage.pages[selectedStage].games;
    if (matchDays) {
      return matchDays.map((matchDay) => {
        if (matchDay.matchday >= filters.fromMatchDay) {
          return matchDay.games.map((game, index) => {
            return <MatchCard stats={game} key={index}></MatchCard>;
          });
        }
      });
    } else return null;
  };
  //Show Legneds
  const showLegends = () => {
    let legends =
      props.groupstage.pages[selectedStage].legend ||
      props.groupstage.pages[selectedStage].pools_legend;
    return legends.map((legend, index) => {
      return (
        <Row style={Styles.legends} key={index}>
          <View
            style={{ ...Styles.legendCube, backgroundColor: legend.color }}
          ></View>
          <Pre>{legend[`legend_${lang.key}`]}</Pre>
        </Row>
      );
    });
  };
  //  Go to next stage
  const goToNextStage = () => {
    if (selectedStage == props.groupstage.pages.length - 1) setSelectedStage(0);
    else setSelectedStage(selectedStage + 1);
  };
  //  Go to previous stage
  const goToPreviousStage = () => {
    if (selectedStage == 0) setSelectedStage(props.groupstage.pages.length - 1);
    else setSelectedStage(selectedStage - 1);
  };
  //On change declaration
  function onChange(index) {
    setSelectedStage(index);
  }
  //Render list of stages groups and matches
  const renderStagesList = () => {
    return (
      <View>
        {reformeData().map((group, index) => {
          return (
            <View key={index} style={Styles.tableGroup}>
              <H1>{group[0].Pool}</H1>
              <Table data={group} headers={tableHeaders}></Table>
            </View>
          );
        })}
        {findGames()}
        <View
          style={{
            marginVertical: 10,
            alignItems: "center",
            paddingHorizontal: 20,
          }}
        >
          {showLegends()}
        </View>
      </View>
    );
  };

  return (
    <NativeBaseProvider>
      <SafeAreaView style={{ paddingBottom: insets.bottom }}>
        <Modal
          isOpen={showFilterModal}
          onClose={() => setShowFilterModal(false)}
        >
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Filter</Modal.Header>
            <Modal.Body>
              {/* Home or Away */}
              <FormControl>
                <FormControl.Label>Home or Away</FormControl.Label>
                <Select
                  selectedValue={props.defaultgroupstage.venue}
                  minWidth="70%"
                  placeholder="Overall"
                  _selectedItem={{
                    bg: Colors.White,
                    _text: { color: Colors.Primary },
                  }}
                  borderWidth={2}
                  borderColor={Colors.White}
                  color={Colors.Primary}
                  fontFamily={"metropolisBold"}
                  bgColor={Colors.White}
                  isDisabled={props.defaultgroupstage.venue == "N"}
                  onValueChange={(picked) => {
                    setFilters({ ...filters, venue: picked });
                  }}
                >
                  <Select.Item label="Overall" value={"_"} />
                  <Select.Item label="Neutral" value={"N"} />
                  <Select.Item label="Home" value={"H"} />
                  <Select.Item label="Away" value={"A"} />
                </Select>
              </FormControl>
              {/* Starting game Date */}
              <FormControl>
                <FormControl.Label>Starting Date</FormControl.Label>
                <DatePicker
                  style={Styles.datePickerStyle}
                  date={props.defaultgroupstage.fromDate} //initial date from state
                  mode="date" //The enum of date, datetime and time
                  placeholder="select date"
                  format="YYYY-MM-DD"
                  minDate="01-01-2021"
                  maxDate={props.defaultgroupstage.toDate}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      //display: 'none',
                      position: "absolute",
                      left: 0,
                      top: 4,
                      marginLeft: 0,
                    },
                    dateInput: {
                      marginLeft: 36,
                    },
                  }}
                  onDateChange={(date) => {
                    setFilters({ ...filters, fromDate: date });
                  }}
                />
              </FormControl>
              {/* Ending game Date */}
              <FormControl>
                <FormControl.Label>Ending Date</FormControl.Label>
                <DatePicker
                  style={Styles.datePickerStyle}
                  date={props.defaultgroupstage.toDate} //initial date from state
                  mode="date" //The enum of date, datetime and time
                  placeholder="select date"
                  format="YYYY-MM-DD"
                  minDate={props.defaultgroupstage.fromDate}
                  maxDate="01-01-2023"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      //display: 'none',
                      position: "absolute",
                      left: 0,
                      top: 4,
                      marginLeft: 0,
                    },
                    dateInput: {
                      marginLeft: 36,
                    },
                  }}
                  onDateChange={(date) => {
                    setFilters({ ...filters, toDate: date });
                  }}
                />
              </FormControl>
              {/* Starting game day */}
              <FormControl>
                <FormControl.Label>Starting Game Day</FormControl.Label>
                <Select
                  selectedValue={props.defaultgroupstage.fromMatchDay}
                  minWidth="70%"
                  placeholder=""
                  _selectedItem={{
                    bg: Colors.White,
                    _text: { color: Colors.Primary },
                  }}
                  borderWidth={2}
                  borderColor={Colors.White}
                  color={Colors.Primary}
                  fontFamily={"metropolisBold"}
                  bgColor={Colors.White}
                  onValueChange={(picked) => {
                    setFilters({ ...filters, fromMatchDay: picked });
                  }}
                >
                  {[...Array(props.defaultgroupstage.toMatchDay).keys()].map(
                    (matchDay) => {
                      matchDay++;
                      return (
                        <Select.Item
                          label={`Match Day ${matchDay}`}
                          value={matchDay}
                          isDisabled={matchDay > filters.toMatchDay}
                          key={matchDay}
                        />
                      );
                    }
                  )}
                </Select>
              </FormControl>
              {/* Ending game day */}
              <FormControl>
                <FormControl.Label>Ending Game Day</FormControl.Label>
                <Select
                  selectedValue={props.defaultgroupstage.toMatchDay}
                  minWidth="70%"
                  placeholder="Overall"
                  _selectedItem={{
                    bg: Colors.White,
                    _text: { color: Colors.Primary },
                  }}
                  borderWidth={2}
                  borderColor={Colors.White}
                  color={Colors.Primary}
                  fontFamily={"metropolisBold"}
                  bgColor={Colors.White}
                  onValueChange={(picked) => {
                    setFilters({ ...filters, toMatchDay: picked });
                  }}
                >
                  {[...Array(props.defaultgroupstage.toMatchDay).keys()].map(
                    (matchDay) => {
                      matchDay++;
                      return (
                        <Select.Item
                          label={`Match Day ${matchDay}`}
                          value={matchDay}
                          isDisabled={matchDay < filters.fromMatchDay}
                          key={matchDay}
                        />
                      );
                    }
                  )}
                </Select>
              </FormControl>
              <Row>
                <Text>Live</Text>
                <Switch
                  style={{ marginTop: 30 }}
                  onValueChange={(value) => {
                    let live = value ? 1 : 0;
                    setFilters({ ...filters, live: live });
                  }}
                  value={!!filters.live}
                />
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    setShowFilterModal(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  style={{ backgroundColor: Colors.Primary }}
                  onPress={() => {
                    const id = props.route ? props.route.params.id : 0;

                    dispatchGroupStage(id);
                    setShowFilterModal(false);
                  }}
                >
                  Apply
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>

        <Row style={Styles.header}>
          <TouchableOpacity onPress={goToPreviousStage}>
            <Ionicons
              name="arrow-back-circle-sharp"
              size={34}
              color={Colors.White}
            />
          </TouchableOpacity>

          <Select
            selectedValue={selectedStage}
            minWidth="70%"
            placeholder="ALL"
            _selectedItem={{
              bg: Colors.Primary,
              _text: { color: Colors.White },
            }}
            borderWidth={2}
            borderColor={Colors.White}
            color={Colors.White}
            fontFamily={"metropolisBold"}
            bgColor={Colors.Primary}
            onValueChange={onChange}
          >
            {props.groupstage.pages.map((stage, index) => {
              return (
                <Select.Item label={stage[`title`]} value={index} key={index} />
              );
            })}
          </Select>

          <TouchableOpacity onPress={goToNextStage}>
            <Ionicons
              name="arrow-forward-circle-sharp"
              size={34}
              color={Colors.White}
            />
          </TouchableOpacity>
        </Row>

        <ScrollView style={Styles.scrollView}>{renderStagesList()}</ScrollView>
      </SafeAreaView>
      {/* Filter floating button */}
      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          ...Styles.touchableOpacityStyle,
          backgroundColor: Colors.Primary,
        }}
        onPress={() => {
          setShowFilterModal(true);
        }}
      >
        <Ionicons name="ios-filter-outline" size={24} color={Colors.White} />
      </TouchableOpacity>
    </NativeBaseProvider>
  );
};
const Styles = StyleSheet.create({
  safeView: {},
  scrollView: {},
  tableGroup: {
    marginVertical: 10,
  },
  touchableOpacityStyle: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
    zIndex: 99,
    borderRadius: 25,
  },
  floatingButtonStyle: {
    resizeMode: "contain",
    width: 50,
    height: 50,
    //backgroundColor:'black'
  },
  modal: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.Primary,
    padding: 100,
  },
  summary: {
    flexWrap: "wrap",
    marginTop: 20,
  },
  summaryComponent: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
    width: "100%",
  },
  sumComponentContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  view: {
    padding: 20,
    zIndex: 1,
  },
  header: {
    height: 60,
    backgroundColor: Colors.Primary,
    justifyContent: "space-around",
    alignItems: "center",
    zIndex: 2,
    marginTop: 3,
  },
  legends: {
    alignItems: "center",
    justifyContent: "center",
  },
  legendCube: {
    width: 15,
    height: 15,
    marginRight: 10,
  },
});
const mapStateToProps = (state) => {
  return {
    groupstage: state.edition.groupstage,
    defaultgroupstage: state.edition.defaultgroupstage,
  };
};
export default connect(mapStateToProps)(GroupStage);
