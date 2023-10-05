import React from "react";
import { AntDesign } from "@expo/vector-icons";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CartScreen from "../screens/CartScreen.js"
import HomeScreen from "../screens/HomeScreen.js"
import RankScreen from "../screens/RankScreen.js"
import ChatScreen from "../screens/ChatScreen.js";
import MessageScreen from "../screens/MessageScreen.js";
import ProfileScreen from "../screens/Profile.js";
import AdminPage from "../screens/AdminPage.js";
import OrderDetail from "../screens/OrderDetail.js";
import CustomerBuyProduct from "../screens/CustomerBuyProduct.js";
import DetailScreen from "../screens/DetailScreen.js";




const CartNavigator = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
function TabNavigator() {

    return (
        <Tab.Navigator initialRouteName="HOME" screenOptions={{
            tabBarActiveTintColor: "darkblue",
            tabBarStyle: { backgroundColor: "#6A988B" },
            tabBarInactiveTintColor: "black"
        }}>
            <Tab.Screen name="HOME" component={Navigation} options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    return <AntDesign name="home" size={26} color={color} />;
                },
            }} />
            <Tab.Screen name="Top" component={Rank} options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    return <AntDesign name="Trophy" size={26} color={color} />;
                },
            }} />
            <Tab.Screen name="Chat" component={MessageScreen} options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    return <AntDesign name="wechat" size={26} color={color} />;
                },
            }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{
                headerShown: false,
                title: "ME",
                tabBarIcon: ({ color, size }) => {
                    return <AntDesign name="user" size={26} color={color} />;
                },
            }} />
        </Tab.Navigator>
    )

}


function Rank() {
    return (
        <CartNavigator.Navigator initialRouteName="Rank">
            <CartNavigator.Screen name="Rank" component={RankScreen} />
            <CartNavigator.Screen name="Detail" component={DetailScreen} />
            <CartNavigator.Screen name="Cart" component={CartScreen} />
            <CartNavigator.Screen name="OrderDetail" component={OrderDetail} />
            <CartNavigator.Screen name="customerBuy" component={CustomerBuyProduct} />
        </CartNavigator.Navigator>
    )
}

function Navigation() {
    return (
        <CartNavigator.Navigator initialRouteName="Home">
            <CartNavigator.Screen name="Home" component={HomeScreen} />
            <CartNavigator.Screen name="Detail" component={DetailScreen} />
            <CartNavigator.Screen name="Cart" component={CartScreen} />
            <CartNavigator.Screen name="OrderDetail" component={OrderDetail} />
            <CartNavigator.Screen name="customerBuy" component={CustomerBuyProduct} />
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