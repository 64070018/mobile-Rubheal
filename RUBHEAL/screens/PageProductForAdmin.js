import { View, Text, Image, ScrollView, FlatList, TouchableOpacity } from "react-native";

import { PURCHASED } from "../data/data";
import React, { useState, useEffect } from 'react';
import { firebase, auth, firestore } from '../database';
import { collection, query, where, getDocs, QuerySnapshot, onSnapshot } from 'firebase/firestore';
import purchased from "../model/purchased";
import { useFonts } from 'expo-font';



const PageProductForAdmin = ({ navigation }) => {

  const [purchasedData, setProductData] = useState([])




  const AllData = async () => {
    const user = firebase.auth().currentUser;


    const q = query(collection(firebase.firestore(), "purchased"));
    const querySnapshot = await getDocs(q);
    // console.log(querySnapshot.size)
    const purchasedData = [];
    var i;

    for (i = 0; i < querySnapshot.size; i++) {


      const purchased = querySnapshot.docs[i].data();

      if (purchased.owner == user.uid) {
        purchasedData.push(purchased)


      }
    }

    console.log(purchasedData)

    const countByProductId = {};
    const saleTotalPrice = {};

    // Process the data to accumulate counts
    purchasedData.forEach((item) => {
      const productId = item.productId;
      if (productId) {
        // If productId is already in the countByProductId object, add the amount to the existing count; otherwise, initialize the count.
        countByProductId[productId] = (countByProductId[productId] || 0) + item.amount;
      }
    });
    purchasedData.forEach((item) => {
      const productId = item.productId;
      if (productId) {
        // If productId is already in the countByProductId object, add the amount to the existing count; otherwise, initialize the count.
        saleTotalPrice[productId] = (saleTotalPrice[productId] || 0) + item.total_price;
      }
    });


    console.log("####count####")
    console.log(countByProductId)

    console.log("###price###")
    console.log(saleTotalPrice)

    const countArray = Object.keys(countByProductId).map((productId) => ({
      productId,
      count: countByProductId[productId],
    }));


    const saleArray = Object.keys(saleTotalPrice).map((productId) => ({
      productId,
      sale: saleTotalPrice[productId],
    }));




    console.log(countArray);

    console.log(saleArray)

    const uniqueProducts = {};


    // Filter the data to keep only the unique products
    const filteredData = purchasedData.filter((item) => {
      if (!uniqueProducts[item.productId]) {
        uniqueProducts[item.productId] = true;
        return true;
      }
      return false;
    });

    // console.log(filteredData);




    // console.log("###count###")
    // console.log(filteredData)

    // console.log("####Data###")
    // console.log(filteredData[0].count)


    for (var i = 0; i < filteredData.length; i++) {
      filteredData[i].allcount = countArray[i].count
      filteredData[i].sale_total = saleArray[i].sale
    }
    //  console.log("###filter##")
    //  console.log(filteredData)

    setProductData(filteredData)
  }


  useEffect(() => {
    AllData()



  }, [])

  const [loaded] = useFonts({
    Anuphan: require("../assets/fonts/Anuphan/static/Anuphan-Medium.ttf")
  });
  if (!loaded) {
    return null;
  }


  // console.log(PURCHASED)
  const renderItem = (itemData) => {
    return (

      <TouchableOpacity onPress={() => {
        navigation.navigate('CustomerProduct', { productId: itemData.item.productId, owner: itemData.item.owner })
      }}>
        <View
          style={{
            flexDirection: "row",
            margin: 20,
            borderBottomWidth: 1,
            padding: 10,
            borderBottomColor: "#ccc",
          }}
        >
          <Image
            source={{ uri: itemData.item.pic }}
            style={{ width: 150, height: 150, borderRadius: 10 }}
          />
          <View style={{ margin: 10 }}>
            <Text style={{fontFamily:'Anuphan', fontSize: 18}}>{itemData.item.title}</Text>
            <Text style={{fontFamily:'Anuphan', fontSize: 16}}>ยอดฝากซื้อ : {itemData.item.allcount} </Text>
            <Text style={{fontFamily:'Anuphan', fontSize: 16}}>ยอดขาย : {itemData.item.sale_total} </Text>
          </View>
        </View>

      </TouchableOpacity>
    );
  };

  return (
    <ScrollView>


      <FlatList data={purchasedData} renderItem={renderItem} />

    </ScrollView>
  );
};

export default PageProductForAdmin;
