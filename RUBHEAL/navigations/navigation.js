import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CartScreen from "../screens/cartScreen.js"

const CartNavigator = createNativeStackNavigator();
function Navigation() {
    return (
        <CartNavigator.Navigator>
            <CartNavigator.Screen name="Cart" component={CartScreen} />
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