import { View, Text, Image, FlatList } from "react-native";
import React from "react";

import { USERBUY } from "../data/data";





const CustomerBuyProduct = ({ route }) => {
  const { id } = route.params;
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
          source={itemData.item.image}
          style={{ width: 150, height: 150, borderRadius: 10 }}
        />
        <View style={{ margin: 10 }}>
          <Text>ชื่อลูกค้า {itemData.item.name}</Text>
          <Text>{itemData.item.price} บาท / ชิ้น  จำนวน {itemData.item.countBuy} ชื้น</Text>
          <Text>นัดรับ เบอร์ติดต่อ {itemData.item.phone}</Text>
          <Text></Text>
        </View>
      </View>

    </View>

    );
  };

  const displayedUserBuy = USERBUY.filter(
    (userBuy) => userBuy.productId === id
  )

  console.log(displayedUserBuy.length)

  if(displayedUserBuy.length > 0){

    return (
      <View>
         <FlatList renderItem={renderItem} data={displayedUserBuy}/>
      </View>
    );
  }
  else{
    return(
      <View style={{justifyContent : 'center', alignItems : 'center', padding : 10}}>
        <Text>ไม่มีการสั่งซื้อ</Text>
      </View>
    )
  }

};

export default CustomerBuyProduct;
