import React from "react";
import { AntDesign } from "@expo/vector-icons";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import DetailScreen from "../screens/DetailScreen";
import CartScreen from "../screens/cartScreen";
import OrderDetail from "../screens/OrderDetail";




const stackNavigator = createNativeStackNavigator();


function Navigation() {
    return (
        <stackNavigator.Navigator initialRouteName="Cart">
            <stackNavigator.Screen name="Home" component={HomeScreen}  />
            <stackNavigator.Screen name="detail" component={DetailScreen}  />
            <stackNavigator.Screen name="cart" component={CartScreen} />
            <stackNavigator.Screen name="order" component={OrderDetail} />
        </stackNavigator.Navigator>
    )
}

export default function BuyFlow() {
    return (
        <NavigationContainer>
            <Navigation />
        </NavigationContainer>
    );
}