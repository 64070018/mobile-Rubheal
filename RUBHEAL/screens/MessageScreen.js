import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  TextInput,
  AntDesign
} from "react-native";
import React, { useEffect, useState } from "react";
import { CHAT } from "../data/data.js";
import { firebase } from "../database.js";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getDoc, query, where } from "firebase/firestore";







const MessageScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [searchText, setSearchText] = useState("")
  const UID = firebase.auth().currentUser.uid;
  // console.log(UID);

  const userRef = firebase.firestore().collection('users');
  const [users] = useCollectionData(userRef);
  // console.log("users")
  // console.log(users)

  const getMessage = async () => {
    users.forEach(async (user) => {
      const message = await firebase.firestore().collection('messages').where('reciever', '==', user.email).get()
      console.log('user', '=>', user)
      console.log('mes', '=>', message.docs)
    })
  }
  useEffect(() => {
    getMessage()
  })
  if (users === undefined) {
    return <Text>Loading...</Text>; // You can return a loading indicator while waiting for data
  }


  const currentUserEmail = firebase.auth().currentUser.email;

  const realUsers = users.filter((user) => user.email !== currentUserEmail);
  console.log("real user", realUsers)
  const search = realUsers.filter((user) => user.name.includes(searchText))
  console.log("search", search)




  const renderItem = (itemData) => {
    // console.log(itemData)
    return (
      <TouchableOpacity onPress={() => {
        navigation.navigate("Chat", { email: itemData.item.email })
      }}>
        <View style={styles.containerChat}>
          <View style={styles.picture}>
            <Image
              source={
                itemData.item.photoURL
                  ? { uri: itemData.item.photoURL }
                  : require("../assets/profile.png")
              }
              style={{ width: 50, height: 50, borderRadius: 50 }}
            />
          </View>
          <View style={{ flex: 3, padding: 10 }}>
            <Text style={{ marginBottom: 10, fontWeight: "700", fontSize: 16 }}>{itemData.item.name}</Text>
            {/* <Text style={{ marginBottom: 10, color: "#242424" }}>{getMessage(itemData.item.email)}</Text> */}
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              {/* <Text style={{ color: "#BDBDBD" }}>{itemData.item.time} mins ago</Text> */}
              {/* <View style={{ flexDirection: "row" }}>
                <Text>{itemData.item.countChat}</Text>

                // <Image
                //   source={require("../assets/icons8-message-50.png")}
                //   style={{ width: 20, height: 20, marginLeft: 5 }}
                // />
              </View> */}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    // <View>
    //   <FlatList data={CHAT} renderItem={renderItem} />
    //   <Text>Folk</Text>
    // </View>
    <SafeAreaView style={{ flex: 1, paddingVertical: 10, backgroundColor: 'white' }}>

      <View style={styles.container}>
        {/* <View style={styles.input}> */}
          <TextInput style={styles.input} placeholder="Search" onChangeText={text => setSearchText(text)} value={searchText} />
        {/* </View> */}

        <View style={styles.backgroundMessage}>
          <FlatList data={search} renderItem={renderItem} />
        </View>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "white",
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
    backgroundColor: "#F6F7F9",
    flexDirection: "row",
    margin: 10,
    paddingVertical: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  picture: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  input: {
    borderColor: "gray",
    width: "95%",
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  searchIcon: {
    padding: 5,
    position: 'absolute',
    top: 0,
    right: 5,
  },
});

export default MessageScreen;
