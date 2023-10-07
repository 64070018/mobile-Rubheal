import { View, Text, Image, ScrollView, FlatList, TouchableOpacity } from "react-native";
import React from "react";

import { PURCHASED } from "../data/data";


const PageProductForAdmin = ({navigation}) => {
  console.log(PURCHASED)
  const renderItem = (itemData) => {
    return (

        <TouchableOpacity onPress={() => {
            navigation.navigate('CustomerProduct', {id : itemData.item.id})
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
          source={itemData.item.image}
          style={{ width: 150, height: 150, borderRadius: 10 }}
        />
        <View style={{ margin: 10 }}>
          <Text>{itemData.item.productDetail}</Text>
          <Text>{itemData.item.price} บาท / ชิ้น</Text>
          <Text>ยอดฝากซื้อ : {itemData.item.countBuy}  เป็นเงิน {itemData.item.countBuy * itemData.item.price}</Text>
        </View>
      </View>

        </TouchableOpacity>  
    );
  };

  return (
    <ScrollView>
    

        <FlatList data={PURCHASED} renderItem={renderItem} />
     
    </ScrollView>
  );
};

export default PageProductForAdmin;
