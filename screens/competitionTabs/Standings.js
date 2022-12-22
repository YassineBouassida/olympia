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
  fetchStandings,
  fetchDefaultStandings,
} from "../../store/actions/edition";
const Standings = (props) => {
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
  const dispatchStandings = (id) => {
    setIsLoadingData(true);
    dispatch(fetchStandings(id, filters)).then(() => {
      setIsLoadingData(false);
    });
  };
  useEffect(() => {
    const id = props.route ? props.route.params.id : 0;
    setIsLoadingData(true);
    console.log("outside use effect standing", props.standings.venue);

    dispatch(fetchDefaultStandings(id)).then(() => {
      console.log("inside use effect standing", props.standings.venue);

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
    let data = props.standings;
    let listOfPools = [];
    if (data) {
      data.standings.map((item) => {
        //push reformed item to reformed data
        listOfPools.push(reformeItem(item));
      });
    }
    return listOfPools;
  };

  //Show Legneds
  const showLegends = () => {
    let legends = props.standings.legend || props.standings.pools_legend;
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
  //Render Standings table list
  const renderStandings = () => {
    return (
      <View>
        {
          <View style={Styles.tableGroup}>
            <Table data={reformeData()} headers={tableHeaders}></Table>
          </View>
        }

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
                  selectedValue={props.defaultstandings.venue}
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
                  isDisabled={props.defaultstandings.venue == "N"}
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
                  date={props.defaultstandings.fromDate} //initial date from state
                  mode="date" //The enum of date, datetime and time
                  placeholder="select date"
                  format="YYYY-MM-DD"
                  minDate="01-01-2021"
                  maxDate={props.defaultstandings.toDate}
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
                  date={props.defaultstandings.toDate} //initial date from state
                  mode="date" //The enum of date, datetime and time
                  placeholder="select date"
                  format="YYYY-MM-DD"
                  minDate={props.defaultstandings.fromDate}
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
                  selectedValue={props.defaultstandings.fromMatchDay}
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
                  {[...Array(props.defaultstandings.toMatchDay).keys()].map(
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
                  selectedValue={props.defaultstandings.toMatchDay}
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
                  {[...Array(props.defaultstandings.toMatchDay).keys()].map(
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

                    dispatchStandings(id);
                    setShowFilterModal(false);
                  }}
                >
                  Apply
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>

        <ScrollView style={Styles.scrollView}>{renderStandings()}</ScrollView>
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
    standings: state.edition.standings,
    defaultstandings: state.edition.defaultstandings,
  };
};
export default connect(mapStateToProps)(Standings);
