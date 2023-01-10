import React from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import { set, ref, get, query, limitToFirst } from "firebase/database";
import { realtime } from "../Database/firebase";
// import firebase from "firebase";

export default function Hadiths({ navigation }) {
  //   const [tafseerNames, setTafseerNames] = useState([]);
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const snapshot = await firebase
  //         .database()
  //         .ref(realtime)
  //         .once("value");
  //       setTafseerNames(snapshot.val());
  //     };
  //     fetchData();
  //   }, []);
  const [data, setdata] = useState(null);
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  //   fetch data
  useEffect(() => {
    const refRTDB = ref(realtime);
    const recentPostsRef = query(ref(realtime, "data"), limitToFirst(100));
    console.log(recentPostsRef);
    get(recentPostsRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          setdata(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // add data
  const create = () => {
    set(ref(realtime, "data/" + 0), {
      username: data,
    })
      .then(() => {
        console.log("Data Sent");
      })
      .catch(() => {
        console.log("failed");
      });
  };
  function GoToNext(catchedValue) {
    navigation.navigate("Details Screen", {
      prop: catchedValue,
    });
  }
  const showID = (item) => {
    navigation.navigate("Details Screen", { Id: item.Id });
    console.log(item.Id);
  };

  const searchFilterFunction = (text) => {
    if (text) {
      setChangeColour(text);
      const newData = data.filter(function (item) {
        const itemData = item.Tafseer ? item.Tafseer : "";
        const textData = text;
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(data);
      setSearch(text);
    }
  };

  const image = require("../assets/notbg.png");
  return (
    <>
      <View style={styles.container}>
        <View style={{ flex: 1, backgroundColor: "#ffe6b6" }}>
          <ImageBackground
            source={image}
            resizeMode="cover"
            style={styles.image}
          >
            <View style={styles.innerArea}>
              {/* present prayer */}
              <Text style={styles.smallText}>Now</Text>
              <Text style={styles.largeText}>DHUHR</Text>
              <View
                style={{ flexDirection: "row", alignContent: "space-between" }}
              >
                {/* upcoming prayer */}
                <View style={{ flex: 1 }}>
                  <Text style={[styles.smallText, { paddingTop: 30 }]}>
                    upcoming
                  </Text>
                  <Text style={styles.largeText}>ASR</Text>
                  <Text style={styles.smallText}>04:04 pm</Text>
                </View>
                {/* Date */}
                <View style={{ flex: 1 }}>
                  <Text
                    style={[
                      styles.largeText,
                      { paddingTop: 30, textAlign: "right" },
                    ]}
                  >
                    12
                  </Text>
                  <Text style={[styles.smallText, { textAlign: "right" }]}>
                    Rajab, 1442
                  </Text>
                  <Text style={[styles.smallText, { textAlign: "right" }]}>
                    Thursday 25-02-2021
                  </Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={{ flex: 2, backgroundColor: "#f7f7f7" }}>
          <View style={styles.innerArea}>
            <TextInput
              style={styles.input}
              placeholder="Search in Hadees Books"
            />
            <View style={styles.bookmarkView}>
              <Icon.Button
                name="bookmark"
                backgroundColor="#f7f7f7"
                onPress={() => alert("This is a Menubar!")}
                color="#000"
                style={styles.bookmark}
              ></Icon.Button>
              <Text style={styles.bookmark}>Bookmark</Text>
            </View>

            <View style={styles.container}></View>
            <FlatList
              data={data}
              // data={filteredDataSource}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      GoToNext(item?.Tafseer);
                    }}
                  >
                    <Text
                      style={[
                        styles.card,
                        {
                          marginHorizontal: 14,
                          fontSize: 25,
                          fontWeight: "500",
                        },
                      ]}
                    >
                      {item.TafseerName}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  innerArea: {
    padding: 20,
  },
  smallText: {
    // fontWeight: "bold",
  },
  largeText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  bookmark: {
    alignSelf: "center",
    // backgroundColor: "red",
  },
  bookmarkView: {
    marginTop: 10,
  },
  input: {
    height: 45,
    width: 350,
    margin: 12,
    // borderWidth: 1,
    paddingLeft: 15,
    borderRadius: 10,
    borderColor: "#cccccc",
    position: "absolute",
    top: -35,
    right: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  card: {
    width: "90%",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    elevation: 4,
    margin: 10,
  },
});
