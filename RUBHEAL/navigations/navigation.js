import React from "react";
import { AntDesign } from "@expo/vector-icons";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";



import CartScreen from "../screens/cartScreen.js"
import HomeScreen from "../screens/HomeScreen.js"
import RankScreen from "../screens/RankScreen.js"
import chatScreen from "../screens/chatScreen.js";
import messageScreen from "../screens/messageScreen.js";
import profile from "../screens/profile.js";
import adminPage from "../screens/adminPage.js";
import OrderDetail from "../screens/OrderDetail.js";
import pageProductForAdmin from "../screens/pageProductForAdmin.js";
import customerBuyProduct from "../screens/customerBuyProduct.js";
import DetailScreen from "../screens/DetailScreen.js";




const CartNavigator = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
function TabNavigator(){
    
    return (
        <Tab.Navigator initialRouteName="HomeScreen" screenOptions={{
            tabBarActiveTintColor: "darkblue",
            tabBarStyle: { backgroundColor: "#6A988B" },
            tabBarInactiveTintColor: "black"
          }}>
            <Tab.Screen name="HOME" component={Navigation} options={{ headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    return <AntDesign name="home" size={26} color={color} />;
                }, }} />
            <Tab.Screen name="TOP 10" component={RankScreen} options={{ headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    return <AntDesign name="Trophy" size={26} color={color} />;
                }, }} />
            <Tab.Screen name="Chat" component={messageScreen} options={{ headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    return <AntDesign name="wechat" size={26} color={color} />;
                }, }} />
            <Tab.Screen name="Me" component={profile} options={{ headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    return <AntDesign name="user" size={26} color={color} />;
                },}} />
        </Tab.Navigator>
    )

}


function Navigation() {
    return (
        <CartNavigator.Navigator initialRouteName="Home">
            <CartNavigator.Screen name="Home" component={HomeScreen}  />
            <CartNavigator.Screen name="Detail" component={DetailScreen}  />
            <CartNavigator.Screen name="Cart" component={CartScreen}  />
            <CartNavigator.Screen name="OrderDetail" component={OrderDetail}  />
            <CartNavigator.Screen name="customerBuy" component={customerBuyProduct} />
        </CartNavigator.Navigator>
    )

}

export default function Mainavigation() {
    return (
        <NavigationContainer>
            <TabNavigator />
        </NavigationContainer>
    );
}