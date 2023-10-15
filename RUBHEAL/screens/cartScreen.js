import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, SafeAreaView, FlatList, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// SplashScreen.preventAutoHideAsync();

const CartScreen = ({ route, navigation }) => {
    const [loaded] = useFonts({
        "Anuphan": require("../assets/fonts/Josefin_Sans/static/JosefinSans-Medium.ttf"),
        Anuphan: require("../assets/fonts/Anuphan/static/Anuphan-Medium.ttf")
    });

    if (!loaded) {
        return null;
    }
    const data = {
        pic: route.params.pic,
        title: route.params.title,
        price: route.params.price
    }
    console.log(route)
    console.log(data)
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ padding: 10, marginBottom: 50 }}>
                <View style={styles.product}>
                    <Image style={{ width: 90, height: 90, borderColor: 'black', borderWidth: 1, }}
                        source={{ uri: data.pic }} resizeMode="contain"
                    />
                    <View style={{ marginLeft: 15 }}>
                        <Text style={{ fontSize: 20, fontFamily: 'Anuphan' }}>{data.title}{'\n'}x{data.price} Baht</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <AntDesign name="minussquareo" size={30} color="black" />
                            <Text style={{ marginHorizontal: 5, fontSize: 18 }}>1</Text>
                            <AntDesign name="plussquareo" size={30} color="black" />
                        </View>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <Feather name="map-pin" size={24} color="black" />
                    <View style={{ marginLeft: 5 }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold", fontFamily: 'Anuphan' }}>Ship To</Text>
                        <Text style={{ fontSize: 18, fontFamily: 'Anuphan' }}>Ladkrabang</Text>
                        <Text style={{ fontSize: 18, fontFamily: 'Anuphan' }}>Aom 0949561292</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <Feather name="truck" size={24} color="black" />
                    <View style={{ marginLeft: 5 }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold", fontFamily: 'Anuphan' }}>Shipping</Text>
                        <Text style={{ fontSize: 18, fontFamily: 'Anuphan' }}>Flash</Text>
                    </View>
                </View>
                <View style={{ marginVertical: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 18, fontFamily: 'Anuphan' }}>Price</Text>
                        <Text style={{ fontSize: 18, fontFamily: 'Anuphan' }}>24 Baht</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 18, fontFamily: 'Anuphan' }}>Shipping Fee</Text>
                        <Text style={{ fontSize: 18, fontFamily: 'Anuphan' }}>24 Baht</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, fontFamily: 'Anuphan' }}>Total</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, fontFamily: 'Anuphan' }}>24 Baht</Text>
                    </View>
                </View>
            </ScrollView>
            <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                <Button title="PLACE ORDER" color="#9276F2" onPress={() => {
                    navigation.navigate('OrderDetail', {title:route.params.title, pic:route.params.pic, price:route.params.price})
                }}></Button>
            </View>
        </SafeAreaView>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        // paddingHorizontal: 10,
        // alignItems: 'center'
        paddingTop: 10,
    },
    product: {
        // flex: 1,
        flexDirection: 'row',
        marginTop: 10
        // justifyContent: 'flex-start',
        // width: '90%',
        // borderColor: 'black', borderWidth: 1
        // height: 50,
    }

});

export default CartScreen
