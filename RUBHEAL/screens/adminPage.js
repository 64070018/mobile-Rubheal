import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
  FlatList
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import React from "react";

import { PURCHASED } from "../data/data";





const AdminPage = ({ navigation }) => {

  const renderItem = (itemData) => {
    return (
      <View style={styles.contentBox}>
        <Image
          source={itemData.item.image}
          style={{ width: 100, height: 100 }}
        />

        <View style={{ flex: 1, padding: 10, alignItems: 'center' }}>
          <Text> {itemData.item.productDetail}</Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
              marginBottom: 5,
            }}
          >
            <AntDesign name="star" size={25} color={"yellow"} />
            <AntDesign name="star" size={25} color={"yellow"} />
            <AntDesign name="star" size={25} color={"yellow"} />
            <AntDesign name="star" size={25} color={"yellow"} />
            <AntDesign name="star" size={25} color={"yellow"} />
            {/* <Text style={{ fontSize: 16, bottom: 0 }}> props.item.rate (5.0) </Text> */}
          </View>
          <Text>ราคาสินค้า : {itemData.item.price}</Text>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <View style={{ marginRight: 5 }}>
              <Button title="update" color="#FAB400" />
            </View>
            <Button title="delete" color="#FF7777" />
          </View>
        </View>
      </View>
    )

  }


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
            <Button title="Swap User" color={"#8667F2"} onPress={() => {
              navigation.navigate('Profile', { name: "admin" })
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
          {/* <Text style={{ fontSize: 20, fontWeight: "700" }}>
                Purchased History
              </Text> */}
        </View>
        <View style={{ padding: 10 }}>
          <Button title="Orders" color={"#8667F2"} onPress={() => {
            navigation.navigate('AdminProduct')
          }} />
        </View>
        <View style={{ padding: 10 }}>
          <Button title="Create New product" color={"#B6CA8C"} />
        </View>

        {/* Product update delete */}

        <ScrollView showsVerticalScrollIndicator={false}>


          <FlatList renderItem={renderItem} data={PURCHASED} numColumns={2} />

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
    flex: 6,

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

  contentBox: {
    padding: 10,
    margin: 10,
    flex: 1,
    alignItems: "center",
  },
});

export default AdminPage;
