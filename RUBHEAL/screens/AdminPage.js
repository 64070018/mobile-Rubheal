import { View, Text, StyleSheet, Image, ScrollView, Button, FlatList, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import React, { useEffect, useState } from "react";

import { firebase } from "../database";
import { onSnapshot } from 'firebase/firestore';




const AdminPage = ({ navigation}) => {
  const [data, setData] = useState([]);
  const user = firebase.auth().currentUser;






  useEffect(() => {
    fetchData();



  }, []);

  const fetchData = () => {
    const collectionRef = firebase.firestore().collection("products");

    // Add a snapshot listener to receive real-time updates
    collectionRef.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((res) => {
        let info = res.data();
        if (info.owner === user.uid) {
          items.push({
            key: res.id,
            name: info.name,
            price: info.price,
            name: info.name,
            detail: info.detail,
            price: info.price,
            amount: info.amount,
            condition: info.condition,
            image: info.image,
            category: info.category,
            rating: info.rating
          });
        }
      });
      setData(items);
    }, (error) => {
      console.error('Error fetching data:', error);
    });
  };





  // const fetchData = () => {
  //   // console.log("########DATA#########")
  //   // console.log(data[0].rating)

  //   // Create a reference to your Firestore collection
  //   const collectionRef = firebase.firestore().collection("products");

  //   // Use the get() method to fetch the data
  //   collectionRef.get()
  //     .then((querySnapshot) => {
  //       const items = [];
  //       querySnapshot.forEach((res) => {
  //         // console.log(" INFORMATION ", res.data())
  //         let info = res.data()

  //         // console.log("###INFORMATION###")
  //         // console.log(info)

  //         if (info.owner == user.uid) {
  //           items.push({
  //             key: res.id,
  //             name: info.name,
  //             price: info.price,
  //             name: info.name,
  //             detail: info.detail,
  //             price: info.price,
  //             amount: info.amount,
  //             condition: info.condition,
  //             image: info.image,
  //             category: info.category,
  //             rating: info.rating
  //           });
  //         }
  //       });
  //       setData(items);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     });
  // }




  const deleteProduct = (productId) => {
    const productRef = firebase.firestore().collection('products').doc(productId);

    productRef
      .delete()
      .then(() => {
        console.log('Document successfully deleted!');
        fetchData()
      })
      .catch((error) => {
        console.error('Error deleting document:', error);
      });

  };



  const renderItem = (data) => {

    const starIcons = [];

    // Use a for loop to generate the star icons
    for (let i = 0; i < 5; i++) {

      if (i < data.item.rating) {
        starIcons.push(
          <AntDesign key={i} name="star" size={16} color="orange" />

        );

      }

      else {
        starIcons.push(
          <AntDesign key={i} name="star" size={16} color="grey" />

        )
      }
    }
    console.log(data)
    return (
      <View style={styles.contentBox}>
        <Image
          source={{ uri: data.item.image }}
          style={{ width: 100, height: 100 }}
        />
        <View style={{ flex: 1, padding: 10, alignItems: 'center' }}>
          <Text style={{fontFamily: 'Anuphan'}}> {data.item.name}</Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
              marginBottom: 5,
            }}
          >
            {starIcons}
            {/* <Text style={{ fontSize: 16, bottom: 0 }}> props.item.rate (5.0) </Text> */}
          </View>
          <Text style={{fontFamily: 'Anuphan'}}>Price : {data.item.price}</Text>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <View style={{ marginRight: 5 }}>
              <Button title="update" color="#FAB400" onPress={() => {
                navigation.navigate('Update', {
                  id: data.item.key,
                  name: data.item.name,
                  detail: data.item.detail,
                  price: data.item.price,
                  amount: data.item.amount,
                  condition: data.item.condition,
                  catagory: data.item.category,
                  image: data.item.image,
                  rating: data.item.rating
                })
              }} />
            </View>
            <Button title="delete" color="#FF7777" onPress={() => deleteProduct(data.item.key)} />
          </View>
        </View>
      </View>
    )

  }

  console.log("usersersser", user)

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

          <Text style={{ fontSize: 20, fontWeight: "700", marginTop: 10 }}>{user.email}</Text>
        </View>


        <View style={{ flexDirection: 'row', marginTop: 20, width: "100%" }}>

          <View style={{ width: "50%", borderColor: '#ddd', borderWidth: 1 }}>
            <TouchableOpacity style={styles.button} onPress={() => {
              navigation.navigate('Setting', { name: "setting" })
            }} >
              <Text style={styles.textbutton}>SETTINGS</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: "50%", borderColor: '#ddd', borderWidth: 1 }}>
            <TouchableOpacity style={styles.button} onPress={() => {
              navigation.navigate('Profilee', { name: "admin" })
            }} >
              <Text style={styles.textbutton}>HISTORY</Text>
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
          {/* <Text style={{ fontSize: 20, fontWeight: "700" }}>
                Purchased History
              </Text> */}
        </View>
        <View style={{ padding: 10 }}>
          <Button title="Orders" color={"#9276F2"} onPress={() => {
            navigation.navigate('AdminProduct')
          }} />
        </View>
        <View style={{ padding: 10 }}>
          <Button title="Create New product" color={"#B6CA8C"} onPress={() => {
            navigation.navigate('Create')
          }} />
        </View>

        {/* Product update delete */}

        <ScrollView showsVerticalScrollIndicator={false}>


          <FlatList renderItem={renderItem} data={data} numColumns={2} />

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
    fontFamily: 'Anuphan'
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
    fontFamily: 'Anuphan'
  },

  contentBox: {
    padding: 10,
    margin: 10,
    flex: 1,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#9276F2",
    width: "100%",
    height: 35,
    justifyContent: "center",
    alignContent: "center"
  },
  textbutton: {
    fontSize: 16,
    // fontWeight: "700",
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Anuphan'
  },
});

export default AdminPage;
