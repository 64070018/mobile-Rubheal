import { View, Text, Image, FlatList } from "react-native";
import React, { useState, useEffect } from 'react';


import { USERBUY } from "../data/data";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { firebase, auth, firestore } from '../database';






const CustomerBuyProduct = ({ route }) => {
  const { productId, owner } = route.params;
  const [customerBuyProuductData, setcustomerBuyProductData] = useState([])

  const customerBuyData = async () => {

    const productAll = [];
    const q = query(
      collection(firebase.firestore(), 'purchased'),
      where('productId', '==', productId), // Filter by productId
      where('owner', '==', owner) // Filter by owner
    );
    const querySnapshot = await getDocs(q);

    // Iterate through the query results
    querySnapshot.forEach((doc) => {
        productAll.push(doc.data())
    });


    setcustomerBuyProductData(productAll)

  }


  useEffect(() => {
    customerBuyData()

  }, [])



  const renderItem = (itemData) => {

    return (
      <View>
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
            source={{uri : itemData.item.pic}}
            style={{ width: 150, height: 150, borderRadius: 10 }}
          />
          <View style={{ margin: 10 }}>
            <Text>ชื่อลูกค้า {itemData.item.addressName}</Text>
            <Text>จำนวน {itemData.item.amount} ชื้น</Text>
            <Text>นัดรับ เบอร์ติดต่อ {itemData.item.phone}</Text>
            <Text></Text>
          </View>
        </View>

      </View>

    );
  };

  // const displayedUserBuy = USERBUY.filter(
  //   (userBuy) => userBuy.productId === id
  // )

  // console.log(displayedUserBuy.length)

  if (customerBuyProuductData.length > 0) {

    return (
      <View>
        <FlatList renderItem={renderItem} data={customerBuyProuductData} />
      </View>
    );
  }
  else {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
        <Text>ไม่มีการสั่งซื้อ</Text>
      </View>
    )
  }

};

export default CustomerBuyProduct;
