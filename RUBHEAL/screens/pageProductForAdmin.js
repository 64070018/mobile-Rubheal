import { View, Text, Image, ScrollView, FlatList, TouchableOpacity } from "react-native";
import React from "react";

const productsAdmin = [
  {
    id: 1,
    name: "นาฬิกา g shock",
    image:{uri : "https://casio-cmg.com/wp-content/uploads/2015/09/GA-110GB-1A_l.png"},
    price: 4000,
    countBuy: 5,
  },
  {
    id: 2,
    name: "Nike Killshot 2 Leather",
    image: {uri : "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/90fb28a6-8634-4dc3-88d1-9a7866e5ef17/%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%97%E0%B9%89%E0%B8%B2%E0%B8%9C%E0%B8%B9%E0%B9%89-killshot-2-leather-DqWZ4j.png"},
    price: 3600,
    countBuy: 2,
  },
  {
    id: 3,
    name: "โกโก้อาม่า",
    image: {uri : "https://i.ytimg.com/vi/NZ9hyMaAsLc/maxresdefault.jpg"},
    price: 55,
    countBuy: 6,
  },
  {
    id: 4,
    name: "BAOJIxTREASURE",
    image: {uri : "https://baoji.co.th/wp-content/uploads/2023/08/AW-OPEN-BOX-white_0-1.jpg"},
    price: 500,
    countBuy: 2,
  },
];

const PageProductForAdmin = ({navigation}) => {
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

export default PageProductForAdmin;
