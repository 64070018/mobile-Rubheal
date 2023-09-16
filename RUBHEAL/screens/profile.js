import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";

const profile = () => {
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
              source={require("../assets/vase.png")}
              style={{ width: 100, height: 100 }}
            />

            <View style={{ flex: 1, padding: 10 }}>
              <Text>ชื่อสินค้า : Tên sản phẩm</Text>
              <Text>ราคาสินค้า : 500</Text>
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
              source={require("../assets/Row.png")}
              style={{ width: 100, height: 100 }}
            />

            <View style={{ flex: 1, padding: 10 }}>
              <Text>ชื่อสินค้า : Tên sản phẩm</Text>
              <Text>ราคาสินค้า : 500</Text>
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
              source={require("../assets/vase.png")}
              style={{ width: 100, height: 100 }}
            />

            <View style={{ flex: 1, padding: 10 }}>
              <Text>ชื่อสินค้า : Tên sản phẩm</Text>
              <Text>ราคาสินค้า : 500</Text>
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
              source={require("../assets/Row.png")}
              style={{ width: 100, height: 100 }}
            />

            <View style={{ flex: 1, padding: 10 }}>
              <Text>ชื่อสินค้า : Tên sản phẩm</Text>
              <Text>ราคาสินค้า : 500</Text>
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
              source={require("../assets/vase.png")}
              style={{ width: 100, height: 100 }}
            />

            <View style={{ flex: 1, padding: 10 }}>
              <Text>ชื่อสินค้า : Tên sản phẩm</Text>
              <Text>ราคาสินค้า : 500</Text>
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
              source={require("../assets/Row.png")}
              style={{ width: 100, height: 100 }}
            />

            <View style={{ flex: 1, padding: 10 }}>
              <Text>ชื่อสินค้า : Tên sản phẩm</Text>
              <Text>ราคาสินค้า : 500</Text>
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
