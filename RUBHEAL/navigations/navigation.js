import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CartScreen from "../screens/cartScreen.js"
import HomeScreen from "../screens/HomeScreen.js"
import chatScreen from "../screens/chatScreen.js";
import messageScreen from "../screens/messageScreen.js";
import profile from "../screens/profile.js";
import adminPage from "../screens/adminPage.js";
import OrderDetail from "../screens/OrderDetail.js";


const CartNavigator = createNativeStackNavigator();
function Navigation() {
    return (
        <CartNavigator.Navigator initialRouteName="Cart">
            <CartNavigator.Screen name="Cart" component={CartScreen}  />
            <CartNavigator.Screen name="OrderDetail" component={OrderDetail}  />
        </CartNavigator.Navigator>
    )

}

export default function Mainavigation() {
    return (
        <NavigationContainer>
            <Navigation />
        </NavigationContainer>
    );
}