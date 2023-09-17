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



const products = [
    { id: 1, name : "Nike Killshot 2 ", image: {uri : 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/90fb28a6-8634-4dc3-88d1-9a7866e5ef17/%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%97%E0%B9%89%E0%B8%B2%E0%B8%9C%E0%B8%B9%E0%B9%89-killshot-2-leather-DqWZ4j.png'}, price: 3600 },
    { id: 2, name : "นาฬิกา g shock", image: {uri : "https://casio-cmg.com/wp-content/uploads/2015/09/GA-110GB-1A_l.png"}, price: 4000 },
    { id: 3, name : "โกโก้อาม่า", image: {uri : "https://i.ytimg.com/vi/NZ9hyMaAsLc/maxresdefault.jpg"}, price: 55 },
    { id: 4, name : "BAOJIxTREASURE", image: {uri : "https://baoji.co.th/wp-content/uploads/2023/08/AW-OPEN-BOX-white_0-1.jpg"}, price: 4000 },
]

const AdminPage = ({navigation}) => {

    const renderItem = (itemData) => {
           return (
            <View style={styles.contentBox}>
            <Image
              source={itemData.item.image}
              style={{ width: 100, height: 100 }}
            />

            <View style={{ flex: 1, padding: 10 }}>
              <Text> {itemData.item.name}</Text>
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
              <View style={{ flexDirection: "row" }}>
                <View style={{ marginRight: 5 }}>
                  <Button title="update" color="green" />
                </View>
                <Button title="delete" color="red" />
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
          <Button title="Orders" onPress={() => {
            navigation.navigate('pageProductForAdmin')
        }}/>
        </View>
        <View style={{ padding: 10 }}>
          <Button title="Create New product" color={"green"} />
        </View>

        {/* Product update delete */}

        <ScrollView showsVerticalScrollIndicator={false}>


              <FlatList renderItem={renderItem} data={products}  numColumns={2}/>
       
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
