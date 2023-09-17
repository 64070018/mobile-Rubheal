import { View, Text, Image, FlatList } from "react-native";
import React from "react";


const UserBuy = [
  {
    id: 1,
    name: "Tên sản phẩm1",
    image: require("../assets/vase.png"),
    price: 500,
    countBuy: 4,
    productId: 1,
  },
  {
    id: 2,
    name: "Tên sản phẩm2",
    image: require("../assets/vase.png"),
    price: 500,
    countBuy: 1,
    productId: 1,
  },
  {
    id: 3,
    name: "Tên sản phẩm3",
    image: require("../assets/vase.png"),
    price: 500,
    countBuy: 1,
    productId: 2,
  },
  {
    id: 4,
    name: "Tên sản phẩm4",
    image: require("../assets/vase.png"),
    price: 500,
    countBuy: 1,
    productId: 2,
  },
];





const customerBuyProduct = ({ route }) => {
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
          <Text>ชื่อสินค้า {itemData.item.name}</Text>
          <Text>ราคา {itemData.item.price}</Text>
          <Text>จำนวนที่ซื้อ {itemData.item.countBuy}</Text>
        </View>
      </View>

    </View>

    );
  };

  const displayedUserBuy = UserBuy.filter(
    (userBuy) => userBuy.productId === id
  )

  return (
    <View>
       <FlatList renderItem={renderItem} data={displayedUserBuy}/>
    </View>
  );
};

export default customerBuyProduct;
