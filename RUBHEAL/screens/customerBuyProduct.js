import { View, Text, Image, FlatList } from "react-native";
import React from "react";


const UserBuy = [
  {
    id: 1,
    name: "Folk",
    image:{uri : "https://casio-cmg.com/wp-content/uploads/2015/09/GA-110GB-1A_l.png"},
    price: 500,
    countBuy: 4,
    productId: 1,
  },
  {
    id: 2,
    name: "Fern",
    image:{uri : "https://casio-cmg.com/wp-content/uploads/2015/09/GA-110GB-1A_l.png"},
    price: 500,
    countBuy: 1,
    productId: 1,
  },
  {
    id: 3,
    name: "Boss",
    image: {uri : "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/90fb28a6-8634-4dc3-88d1-9a7866e5ef17/%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%97%E0%B9%89%E0%B8%B2%E0%B8%9C%E0%B8%B9%E0%B9%89-killshot-2-leather-DqWZ4j.png"},
    price: 500,
    countBuy: 1,
    productId: 2,
  },
  {
    id: 4,
    name: "Aom",
    image: {uri : "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/90fb28a6-8634-4dc3-88d1-9a7866e5ef17/%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%97%E0%B9%89%E0%B8%B2%E0%B8%9C%E0%B8%B9%E0%B9%89-killshot-2-leather-DqWZ4j.png"},
    price: 500,
    countBuy: 1,
    productId: 2,
  },
];





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
