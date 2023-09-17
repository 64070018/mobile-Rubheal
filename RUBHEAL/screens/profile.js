import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";

const profile = ({navigation}) => {
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

      <TouchableOpacity onPress={() => {
            navigation.navigate('adminPage')
        }}>
        <Image
          source={require("../assets/people.png")}
          style={{ position: "absolute", right: -150, top: -80 }}
        />
      </TouchableOpacity>
      <View style={styles.backgroundChat}>
        {/* <FlatList data={CHAT} renderItem={renderItem} /> */}
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../assets/profile.png")}
            style={{ width: 100, height: 100 }}
          />

          <Text style={{ fontSize: 20, fontWeight: "900" }}>Folk</Text>
        </View>
        {/* <View style={{ flexDirection: 'row', justifyContent: "space-around", backgroundColor: '#F8F0E5', padding: 30, margin: 20 }}>

            <View style={{flexDirection : 'row'}}>
            <Text style={{fontWeight : '700', fontSize : 15}}>220 </Text>
            <Text style={{fontSize : 15}}>Followers</Text>

            </View>


            <View style={{flexDirection : 'row'}}>
            <Text style={{fontWeight : '700', fontSize : 15}}>150 </Text>
            <Text style={{fontSize : 15}}>Following</Text>

            </View>




        </View> */}

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
          <View
            style={{
              flexDirection: "row",
              padding: 10,
              margin: 10,
            }}
          >
            <Image
              source={{
                uri: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/90fb28a6-8634-4dc3-88d1-9a7866e5ef17/%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%97%E0%B9%89%E0%B8%B2%E0%B8%9C%E0%B8%B9%E0%B9%89-killshot-2-leather-DqWZ4j.png",
              }}
              style={{ width: 100, height: 100 }}
            />

            <View style={{ flex: 1, padding: 10 }}>
              <Text>ชื่อสินค้า : Nike Killshot 2 Leather</Text>
              <Text>ราคาสินค้า : 3600</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",

              padding: 10,
              margin: 10,
            }}
          >
            <Image
              source={{
                uri: "https://casio-cmg.com/wp-content/uploads/2015/09/GA-110GB-1A_l.png",
              }}
              style={{ width: 100, height: 100 }}
            />

            <View style={{ flex: 1, padding: 10 }}>
              <Text>ชื่อสินค้า : นาฬิกา g shock</Text>
              <Text>ราคาสินค้า : 4000</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              padding: 10,
              margin: 10,
            }}
          >
            <Image
              source={{
                uri: "https://i.ytimg.com/vi/NZ9hyMaAsLc/maxresdefault.jpg",
              }}
              style={{ width: 100, height: 100 }}
            />

            <View style={{ flex: 1, padding: 10 }}>
              <Text>ชื่อสินค้า :โกโก้อาม่า </Text>
              <Text>ราคาสินค้า : 55</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",

              padding: 10,
              margin: 10,
            }}
          >
            <Image
              source={{
                uri: "https://baoji.co.th/wp-content/uploads/2023/08/AW-OPEN-BOX-white_0-1.jpg",
              }}
              style={{ width: 100, height: 100 }}
            />

            <View style={{ flex: 1, padding: 10 }}>
              <Text>ชื่อสินค้า : BAOJIxTREASURE</Text>
              <Text>ราคาสินค้า : 4000</Text>
            </View>
          </View>
        </ScrollView>

        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 20 }}>
            <View style={{ alignItems: 'center' }}>
                <Image source={require("../assets/bag.png")} style={styles.iconPicture} />
                <View style={styles.iconText}>
                    <Text>Pack Product</Text>

                </View>
            </View>
            <View style={{ alignItems: 'center' }}>
                <Image source={require("../assets/tack.png")} style={styles.iconPicture} />
                <View style={styles.iconText}>
                    <Text>Pack Product in car</Text>

                </View>

            </View>
            <View style={{ alignItems: 'center' }}>
                <Image source={require("../assets/car.png")} style={styles.iconPicture} resizeMode='contain' />
                <View style={styles.iconText}>
                    <Text>send Product</Text>

                </View>

            </View>
        </View> */}
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
});

export default profile;
