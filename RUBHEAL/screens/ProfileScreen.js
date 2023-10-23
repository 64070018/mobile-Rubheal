import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Button, FlatList, } from "react-native";
import React, { useEffect, useState } from 'react';
import { firebase, auth, firestore } from '../database';
import { useFonts } from 'expo-font';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import History from "../components/History";

const ProfileScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if the user is authenticated
        if (auth.currentUser) {
          const userEmail = auth.currentUser.email;
          // Create a query to find the user document with a specific email
          const q = query(collection(firebase.firestore(), 'users'), where('email', '==', userEmail));
          // const history = query(collection(firebase.firestore(), 'purchased'));
          const history = query(collection(firebase.firestore(), 'purchased'), where('customer', '==', userEmail));
          const querySnapshot = await getDocs(q);
          const historySnapshot = await getDocs(history);
          // profile
          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            setData(userData);
            console.log(userData)
          } else {
            console.log('User document not found');
          }
          // history
          const result = []
          if (!historySnapshot.empty) {
            for (const history of historySnapshot.docs) {
              result.push(history.data())
            }
          } else {
            console.log('History document not found');
          }
          setHistoryData(result)
          console.log(result)
        }

      } catch (error) {
        console.error('Error fetching data from Firestore:', error);
      }
    };

    fetchData();
  }, []);

  const [loaded] = useFonts({
    Anuphan: require("../assets/fonts/Anuphan/static/Anuphan-Medium.ttf")
  });
  if (!loaded) {
    return null;
  }

  const renderItem = (itemData) => {
    console.log("itemdata", itemData)
    console.log("test RederItem")

    if (itemData.item != "No purchase history") {
      return (
        <History
          title={itemData.item.title}
          image={itemData.item.pic}
          price={itemData.item.total_price}
          date={itemData.item.date}
        />
      );
    } else {
      return (
        <View>
          <Text style={{
            textAlign: 'center',
            justifyContent: 'center',
            fontSize: 20,
            marginTop: responsiveHeight(10),
            color: '#999',
            fontFamily: 'Anuphan'
          }}> No purchase history </Text>
        </View>
      )
    }
  };

  const user = auth.currentUser

  console.log("------------        history pls        ----------------")
  console.log("historyData 2", historyData)
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
            source={
              user.photoURL
                ? { uri: user.photoURL }
                : require("../assets/profile.png")
            }
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />

          <Text style={{ fontSize: 20, fontWeight: "900" }}>{data.name}</Text>
        </View>


        <View style={{ flexDirection: 'col', marginTop: 20, width: "100%" }}>
          <View style={{ width: "100%" }}>
            <TouchableOpacity style={styles.button} onPress={() => {
              if (data.position == 'user') {
                navigation.navigate('Saler', { name: "Saler" })
              } else {
                navigation.navigate('Admin', { name: "admin" })
              }
            }} >
              <Text style={styles.textbutton}>Saler</Text>
            </TouchableOpacity>
          </View>

          <View style={{ width: "100%", marginVertical: 5 }}>
            <TouchableOpacity style={styles.button} onPress={() => {
              navigation.navigate('Setting', { name: "setting" })
            }} >
              <Text style={styles.textbutton}>Setting</Text>
            </TouchableOpacity>
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

          {/* <FlatList data={historyData} renderItem={renderItem} /> */}
          <FlatList
            data={historyData.length > 0 ? historyData : ["No purchase history"]}
            renderItem={renderItem}
            numColumns={1}
          />




        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
  button: {
    backgroundColor: "#9276F2",
    width: "100%",
    height: 45,
    justifyContent: "center",
    alignContent: "center"
  },
  textbutton: {
    fontSize: 16,
    fontWeight: "700",
    color: 'black',
    textAlign: 'center'
  },
});

export default ProfileScreen;
