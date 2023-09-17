import { View, Text, Image, ScrollView, FlatList, TouchableOpacity } from "react-native";
import React from "react";

const productsAdmin = [
  {
    id: 1,
    name: "Tên sản phẩm",
    image: require("../assets/vase.png"),
    price: 500,
    countBuy: 5,
  },
  {
    id: 2,
    name: "Tên sản phẩm",
    image: require("../assets/vase.png"),
    price: 500,
    countBuy: 2,
  },
  {
    id: 3,
    name: "Tên sản phẩm",
    image: require("../assets/vase.png"),
    price: 500,
    countBuy: 6,
  },
  {
    id: 4,
    name: "Tên sản phẩm",
    image: require("../assets/vase.png"),
    price: 500,
    countBuy: 2,
  },
];

const pageProductForAdmin = ({navigation}) => {
  const renderItem = (itemData) => {
    return (

        <TouchableOpacity onPress={() => {
            navigation.navigate('customerBuy', {id : itemData.item.id})
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
          <Text>ชื่อสินค้า {itemData.item.name}</Text>
          <Text>ราคา {itemData.item.price}</Text>
          <Text>จำนวนที่ซื้อ {itemData.item.countBuy}</Text>
        </View>
      </View>

        </TouchableOpacity>  
    );
  };

  return (
    <ScrollView>
      {/* <View style={{flexDirection : 'row', margin : 20,borderBottomWidth : 1, padding : 10, borderBottomColor : '#ccc'}}>
            <Image source={require("../assets/Row.png")} style={{width : 150, height : 150, borderRadius : 10}}/>
            <View style={{margin: 10}}>
                <Text>ชื่อสินค้า</Text>
                <Text>ราคา</Text>
                <Text>จำนวนที่ซื้อ</Text>

            </View>
        </View> */}

        <FlatList data={productsAdmin} renderItem={renderItem} />
     
    </ScrollView>
  );
};

export default pageProductForAdmin;
