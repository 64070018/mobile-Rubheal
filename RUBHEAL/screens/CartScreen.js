import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, SafeAreaView, FlatList, ScrollView, Pressable, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { firebase, config, storage } from '../database';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import dayjs  from "dayjs";
// SplashScreen.preventAutoHideAsync();

const CartScreen = ({ route, navigation }) => {
    //อย่าเอาไว้หลังconditionเด็ดขาดไม่งั้นพังแน่
    const [productAmount, setproductAmount] = useState(1);
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
        price: route.params.price,
        amount: productAmount
    }
    const total = parseFloat(data.price) + 24
    console.log(route)
    console.log(data)

    const user = firebase.auth().currentUser;

    // purchased table
    const purchased = () => {
        myDate = dayjs(new Date).format('DD/MM/YYYY')
        myTime = dayjs(new Date).format('HH:mm')
        console.log(myDate)
        firebase
            .firestore()
            .collection("purchased")
            .add({
                time: myDate,
                title: data.title,
                total_price: total,
                amount: data.amount,
                owner: user.uid
            })
            .then(() => {
                navigation.navigate('OrderDetail', { date: myDate, time: myTime, title: route.params.title, pic: route.params.pic, price: route.params.price, amount: data.amount  })
            });
    }
    
    function minus() {
        if (data.amount <= 1) {
            Alert.alert('DELETE', 'Are you sure to delete from the cart?', [
                {
                    text: 'yes',
                    onPress: () => navigation.navigate('Home')
                }
            ])
        } else {
            setproductAmount(data.amount - 1)
        }
    }
    function plus() {
        setproductAmount(productAmount+1)
    }
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
                            <Pressable onPress={minus}>
                                <AntDesign name="minussquareo" size={30} color="black" />
                            </Pressable>
                            <Text style={{ marginHorizontal: 5, fontSize: 18 }}>{data.amount}</Text>
                            <Pressable onPress={plus}>
                                <AntDesign name="plussquareo" size={30} color="black" />
                            </Pressable>
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
                        <Text style={{ fontSize: 18, fontFamily: 'Anuphan' }}>{data.price} Baht</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 18, fontFamily: 'Anuphan' }}>Shipping Fee</Text>
                        <Text style={{ fontSize: 18, fontFamily: 'Anuphan' }}>24 Baht</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, fontFamily: 'Anuphan' }}>Total</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, fontFamily: 'Anuphan' }}>{total} Baht</Text>
                    </View>
                </View>
            </ScrollView>
            <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                <Pressable style={styles.order} onPress={purchased}>
                    <Text style={styles.textbutton}>PLACE ORDER</Text>
                </Pressable>
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
    },
    order: {
        backgroundColor: "#9276F2",
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignContent: "center"
    },
    textbutton: {
        fontWeight: "700",
        color: 'white',

    }

});

export default CartScreen
