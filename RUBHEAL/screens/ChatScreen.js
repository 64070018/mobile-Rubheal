import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity, FlatList } from "react-native";
import React, { useRef, useState } from "react";
import { firebase } from "../database";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { and } from "firebase/firestore";





const senderZone = (itemData) => {
  // console.log("SenderZone");
  const time = itemData.Timestamp.toDate();
  const hour = time.getHours(); // Get the hours (0-23)
  const minute = time.getMinutes(); // Get the minutes (0-59)
  const formattedTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  // console.log(time)
  // console.log(itemData.text)
  return (
    <View style={styles.senderBox}>
      <View >
        <View style={styles.boxContent}>
          <Text style={styles.text}>
            {itemData.text}
          </Text>
        </View>
        <View style={styles.boxTimeLeft}>
          <Text>{formattedTime}</Text>
        </View>
      </View>
      <View style={styles.personLeft}>
        <Image
          source={{
            uri: "https://hips.hearstapps.com/hmg-prod/images/beautiful-smooth-haired-red-cat-lies-on-the-sofa-royalty-free-image-1678488026.jpg?crop=1xw:0.84415xh;center,top",
          }}
          style={{ width: 50, height: 50, borderRadius: 50 }}
        />
      </View>
    </View>
  )
}

const receiverZone = (itemData) => {
  // console.log("receiverZone")
  const time = itemData.Timestamp.toDate();
  const hour = time.getHours(); // Get the hours (0-23)
  const minute = time.getMinutes(); // Get the minutes (0-59)
  const formattedTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  return (
    <View style={styles.box}>
      <View style={styles.personRight}>
        <Image
          source={{
            uri: "https://img.freepik.com/free-photo/puppy-that-is-walking-snow_1340-37228.jpg",
          }}
          style={{ width: 50, height: 50, borderRadius: 50 }}
        />
      </View>

      <View>
        <View style={styles.boxContent}>
          <Text style={styles.text}>
            {itemData.text}
          </Text>
        </View>
        <View style={styles.boxTimeRight}>
          <Text>{formattedTime}</Text>
        </View>
      </View>
    </View>
  )
}

const Imagezone = () => {
  {/* <View style={styles.box}>
            <View style={styles.personRight}>
              <Image
                source={{
                  uri: "https://img.freepik.com/free-photo/puppy-that-is-walking-snow_1340-37228.jpg",
                }}
                style={{ width: 50, height: 50, borderRadius: 50 }}
              />
            </View>

            <View style={{ flex: 4 }}>
              <View style={{ flex: 1, borderRadius: 10, padding: 10 }}>
                <Image source={require("../assets/vase.png")} style={{ width: 250, height: 250 }} />
              </View>
              <View style={styles.boxTimeRight}>
                <Text>16:04</Text>
              </View>
            </View>
          </View> */}
}


const ChatScreen = (route) => {
  // console.log("firebase.auth().currentUser")
  // console.log(firebase.auth().currentUser)
  const email = route.route.params.email
  const UID = firebase.auth().currentUser.email;
  const messagesRef = firebase.firestore().collection('messages');
  const query = messagesRef.orderBy('Timestamp');
  const [messages] = useCollectionData(query, { idField: 'id' });

  const InputZone = () => {
    const [messageText, setMessageText] = useState("");
    const sendMessage = () => {
      const user = firebase.auth().currentUser;
      firebase.firestore().collection('messages')
        .add({
          Timestamp: new Date(),
          text: messageText,
          receiver: email,
          sender: user.email
        })
      setMessageText("")
    }
    return (
      <View style={styles.boxInput}>
        <TextInput style={styles.input} placeholder="Type Something" value={messageText} onChangeText={(val) => setMessageText(val)} />
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center", flexDirection: 'row', justifyContent: 'space-around' }}
        >
          <TouchableOpacity onPress={sendMessage}>
            <Image source={require("../assets/send.png")} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require("../assets/image.png")}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  if (messages && messages.length > 0) {
    const messageComponents = [];
    console.log(messages)
    messages.forEach((element) => {

      // if (element.receiver == email && element.sender != UID ) 
      if ((element.sender == UID && element.receiver == email) || (element.receiver == UID && element.sender == email)) {
        if (element.sender == UID) {
          // console.log(element.sender, 'sender')
          messageComponents.push(senderZone(element));
        } else if (element.sender == email) {
          // console.log(element.receiver, 'receiver')
          messageComponents.push(receiverZone(element));
        }
      }
    });

    return (
      <View style={{ backgroundColor: 'white', height: '100%' }}>
        <ScrollView>
          {messageComponents.map((component, index) => (
            <React.Fragment key={index}>{component}</React.Fragment>
          ))}
        </ScrollView>
        <InputZone />
      </View>

    );
  } else {
    return (
      <View>
        <Text>No messages found.</Text>
        <InputZone />
      </View>
    );
  }

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
    justifyContent: 'space-around',
    // backgroundColor: "blue",
  },

  box: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 20,
    // backgroundColor: "red",
  },
  input: {
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    flex: 3,
  },

  boxContent: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#F6F7F9',
  },
  boxTimeLeft: {
    alignItems: 'flex-end', padding: 10
  },
  boxTimeRight: {
    alignItems: 'flex-start', padding: 10
  },
  personRight: {
    flex: 0, justifyContent: 'flex-end'
  },
  personLeft: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  text: {
    fontSize: 20
  },
  senderBox: {
    justifyContent: "flex-end",
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 20,
    // backgroundColor: "red",
  },
  boxInput: {
    backgroundColor: 'white',
    width: '100%',
    flexDirection: "row", position: 'fixed', bottom: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 0.4,
    elevation: 2,
  }
});

export default ChatScreen;
