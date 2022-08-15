import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import _ from "lodash";
//Import custom components
import Avatar from "./Avatar";
import Colors from "../../constants/colors";
const Table = (props) => {
  const [columns, setColumns] = useState(props.headers);
  const [direction, setDirection] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [data, setData] = useState(props.data);
  const [filtredData, setFiltredData] = useState(props.data);
  const [keyword, setKeyword] = useState("");
  //Onchange keyword
  const onChangeKeyword = (value) => {
    setKeyword(value);
    const returnedData = data.filter((element) => {
      // console.log("keyword ", value, " element  ", element);
      let filtredCheck = false;
      Object.values(columns).map((col) => {
        // console.log("col ", col);
        //Check if keyword included inside elements
        let checker = false;
        if (col.type == "text") {
          checker = element[col.ref]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase());
        } else if (col.type == "elem") {
          checker = element[col.ref].text
            .toLowerCase()
            .includes(value.toLowerCase());
        }
        if (checker) {
          // console.log("checker ", checker);

          filtredCheck = checker;
        }
      });
      return filtredCheck;
    });
    setFiltredData(returnedData);
  };
  //Find out if table is searchable and render the search input
  const renderSearchable = () => {
    if (!props.searchable) {
      return null;
    } else {
      return (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TextInput
            style={Styles.searchableInput}
            placeholder="Keywords"
            onChangeText={onChangeKeyword}
            value={keyword}
          ></TextInput>
        </KeyboardAvoidingView>
      );
    }
  };
  //Sort data table by clicked column
  const sortTable = (column) => {
    const newDirection = direction === "desc" ? "asc" : "desc";
    const sortedData =
      column.type == "text"
        ? _.orderBy(
            props.searchable ? filtredData : data,
            [column.ref],
            [newDirection]
          )
        : _.orderBy(
            props.searchable ? filtredData : data,
            (item) => item[column.ref].text,
            [newDirection]
          );
    setSelectedColumn(column);
    setDirection(newDirection);

    props.searchable ? setFiltredData(sortedData) : setData(sortedData);
  };
  //Render table header
  const tableHeader = () => (
    <View>
      <View style={Styles.tableHeader}>
        {columns.map((column, index) => {
          {
            return (
              <TouchableOpacity
                key={index + "header"}
                style={{ ...Styles.columnHeader, flex: column.flex }}
                onPress={() => sortTable(column)}
              >
                <Text style={Styles.columnHeaderTxt}>
                  {column.text + " "}
                  {selectedColumn === column && (
                    <MaterialCommunityIcons
                      name={
                        direction === "desc"
                          ? "arrow-down-drop-circle"
                          : "arrow-up-drop-circle"
                      }
                    />
                  )}
                </Text>
              </TouchableOpacity>
            );
          }
        })}
      </View>
    </View>
  );

  return (
    <View style={Styles.container}>
      <View style={{ width: "100%" }}>{renderSearchable()}</View>
      <FlatList
        scrollEnabled={false}
        horizontal={false}
        data={props.searchable ? filtredData : data}
        style={{ width: "90%" }}
        keyExtractor={(item, index) => index + ""}
        ListHeaderComponent={tableHeader}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                ...Styles.tableRow,
                backgroundColor:
                  index % 2 == 1 ? Colors.BorderLine : Colors.Alpha,
                borderLeftColor: item.status
                  ? Colors[item.status.note]
                  : "transparent",
                borderLeftWidth: item.status ? 3 : 0,
              }}
            >
              {Object.keys(item).map((itemKey, index) => {
                const itemValue = item[itemKey];
                let columnHeader = columns.find(
                  (column) => column.ref == itemKey
                );
                if (itemValue.note) return;
                if (itemValue.url) {
                  return (
                    <View
                      key={index + itemKey}
                      style={{
                        ...Styles.columnRowTxt,
                        flex: columnHeader.flex,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Avatar
                        style={[Styles.avatar, { width: 30, height: 30 }]}
                        originalWidth={30}
                        originalHeight={30}
                        url={itemValue.url}
                        selected={false}
                      ></Avatar>
                      <Text>{itemValue.text}</Text>
                    </View>
                  );
                } else {
                  return (
                    <Text
                      key={index + itemKey}
                      style={{
                        ...Styles.columnRowTxt,
                        flex: columnHeader.flex,
                      }}
                    >
                      {itemValue}
                    </Text>
                  );
                }
              })}
            </View>
          );
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: Colors.Primary,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    height: 50,
    paddingHorizontal: 3,
  },
  searchableInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: Colors.BorderLine,
    padding: 10,
  },
  tableRow: {
    flexDirection: "row",
    height: 70,
    alignItems: "center",
    paddingHorizontal: 3,
    borderLeftWidth: 3,
  },
  columnHeader: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  columnHeaderTxt: {
    color: "white",
    fontWeight: "bold",
  },
  columnRowTxt: {
    width: "20%",
    textAlign: "center",
  },
});
export default Table;
