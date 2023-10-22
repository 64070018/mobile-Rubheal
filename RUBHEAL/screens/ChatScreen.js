import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity, FlatList } from "react-native";
import React, { useRef, useState } from "react";
import { firebase, storage } from "../database"; // Import your Firebase configuration here
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"; // Corrected the import statement
import * as ImagePicker from 'expo-image-picker';
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";




const senderZone = (itemData) => {
  // console.log("SenderZone");
  const time = itemData.Timestamp.toDate();
  const hour = time.getHours(); // Get the hours (0-23)
  const minute = time.getMinutes(); // Get the minutes (0-59)
  const formattedTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  // console.log(time)
  // console.log(itemData.text)

  if (itemData.text != undefined) {
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

  } else {
    return (
      <View style={styles.senderBox}>
        <View >
          <View style={styles.boxTimeLeft}>
            <Image
              source={{
                uri: itemData.image,
              }}
              style={{ width: responsiveWidth(50), height: responsiveHeight(30), }}
            />
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
}


const receiverZone = (itemData) => {
  // console.log("receiverZone")
  const time = itemData.Timestamp.toDate();
  const hour = time.getHours(); // Get the hours (0-23)
  const minute = time.getMinutes(); // Get the minutes (0-59)
  const formattedTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  console.log("text", itemData.text)
  console.log("text", itemData.image)
  if (itemData.text != undefined) {
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

  } else {
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
          {/* <View style={styles.boxContent}> */}
          <Image
            source={{
              uri: itemData.image,
            }}
            style={{ width: responsiveWidth(50), height: responsiveHeight(30), }}
          />
          {/* </View> */}
          <View style={styles.boxTimeRight}>
            <Text>{formattedTime}</Text>
          </View>
        </View>
      </View>
    )
  }
}

const ChatScreen = (route) => {
  // console.log("firebase.auth().currentUser")
  // console.log(firebase.auth().currentUser)
  const email = route.route.params.email
  const UID = firebase.auth().currentUser.email;
  const messagesRef = firebase.firestore().collection('messages');
  const query = messagesRef.orderBy('Timestamp');
  const [messages] = useCollectionData(query, { idField: 'id' });
  const [image, setImage] = useState({ "uri": undefined });


  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (result.assets == null) {
        setIsImageError(true)
      }

      const source = { uri: result.assets[0].uri };
      console.log("asdf")
      // setImage(source);
      console.log("asdf2", image)

      const blob = await fetch(source.uri).then((response) => response.blob());
      const filename = Date.now() + '.jpg';
      const imageRef = ref(storage, filename);

      await uploadBytes(imageRef, blob);

      // const downloadURL = await getDownloadURL(imageRef);

      const user = firebase.auth().currentUser;
      await firebase.firestore().collection('messages')
        .add({
          Timestamp: new Date(),
          image: await getDownloadURL(imageRef),
          receiver: email,
          sender: user.email
        })

    } catch (error) {
      console.log("error", error)

    }

    // setImage(null)
  }

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
          <TouchableOpacity onPress={pickImage}>
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
