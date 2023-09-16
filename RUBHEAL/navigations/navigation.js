import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CartScreen from "../screens/cartScreen.js"
import HomeScreen from "../screens/HomeScreen.js"
import chatScreen from "../screens/chatScreen.js";
import messageScreen from "../screens/messageScreen.js";
import profile from "../screens/profile.js";
import adminPage from "../screens/adminPage.js";

const CartNavigator = createNativeStackNavigator();
function Navigation() {
    return (
        <CartNavigator.Navigator>
        <CartNavigator.Screen name="Message" component={adminPage}  />
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