import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { CHAT } from "../data/data.js";

const messageScreen = () => {
  console.log(CHAT);
  const renderItem = (itemData) => {
    return (
      <View style={styles.containerChat}>
        <View style={styles.picture}>
          <Image
            source={{
              uri: itemData.item.urlImage,
            }}
            style={{ width: 50, height: 50, borderRadius: 50 }}
          />
        </View>
        <View style={{ flex: 3, padding: 10 }}>
          <Text style={{ marginBottom: 10 }}>{itemData.item.name}</Text>
          <Text style={{ marginBottom: 10 }}>{itemData.item.message}</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>{itemData.item.time} mins ago</Text>
            <View style={{ flexDirection: "row" }}>
              <Text>{itemData.item.countChat} mins ago</Text>
              <TouchableOpacity>
                <Image
                  source={require("../assets/icons8-message-50.png")}
                  style={{ width: 20, height: 20, marginLeft: 5 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    // <View>
    //   <FlatList data={CHAT} renderItem={renderItem} />
    //   <Text>Folk</Text>
    // </View>
    <View style={styles.container}>
      {/* <View style={styles.nav}>
        <Text style={styles.navText}>Message</Text>
      </View> */}
      <View style={styles.backgroundMessage}>
        <FlatList data={CHAT} renderItem={renderItem} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: "red",
      alignItems: "center",
      // justifyContent: "center",
    },
  
    nav: {
      flex: 1,
      // backgroundColor: "blue",
      justifyContent: "center",
      width: "100%",
      alignItems: "center",
    },
    navText: {
      fontSize: 30,
      fontWeight: "700",
    },
  
    backgroundMessage: {
      flex: 6,
     
      width: "100%",
    },
  
    containerChat: {
      backgroundColor: "F6F7F9",
      flexDirection: "row",
      margin: 10,
      borderRadius: 20,
    },
    picture: {
      flex: 1,
      alignItems: "center",
      padding: 10,
    },
  });

export default messageScreen;
