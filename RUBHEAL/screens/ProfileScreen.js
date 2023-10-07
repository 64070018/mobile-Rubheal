import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
  FlatList,
} from "react-native";
import React from "react";

import { PURCHASED } from "../data/data";

const ProfileScreen = ({ navigation }) => {


  const renderItem = (itemData) => {
    return (


      <View
        style={{
          flexDirection: "row",
          padding: 10,
          margin: 10,
        }}
      >
        <Image
          source={itemData.item.image}
          style={{ width: 100, height: 100 }}
        />

        <View style={{ flex: 1, padding: 10 }}>
          <Text>{itemData.item.productDetail}</Text>
          <Text>ราคาสินค้า :  {itemData.item.price}</Text>
        </View>
      </View>

    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        {/* <Text style={styles.navText}>Message</Text> */}
        <Image
          source={{
            uri: "https://www.thaiartstudio.com/wp-content/uploads/2017/08/1238030972.jpg",
          }}
          style={{ width: "100%", height: 150 }}
        />
      </View>


      <View style={styles.backgroundChat}>
        {/* <FlatList data={CHAT} renderItem={renderItem} /> */}
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../assets/profile.png")}
            style={{ width: 100, height: 100 }}
          />

          <Text style={{ fontSize: 20, fontWeight: "900" }}>Folk</Text>
        </View>


        <View style={{ flexDirection: 'row', marginTop: 20, width: "100%" }}>

          <View style={{ width: "50%" }}>
            <Button title="Setting" color={"#8667F2"} />
          </View>

          <View style={{ width: "50%" }}>
            <Button title="Swap Admin" color={"#8667F2"} onPress={() => {
              navigation.navigate('Admin', { name: "admin" })
            }} />

          </View>

        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 20,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "700" }}>
            Purchased History
          </Text>
        </View>

        <ScrollView>

          <FlatList data={PURCHASED} renderItem={renderItem} />



        </ScrollView>
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

  backgroundChat: {
    flex: 7,

    width: "100%",
  },

  iconPicture: {
    width: 40,
    height: 40,
  },
  iconText: {
    justifyContent: "center",
    padding: 10,
  },
});

export default ProfileScreen;