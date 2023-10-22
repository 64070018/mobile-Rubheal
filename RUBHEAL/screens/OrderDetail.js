import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, SafeAreaView, FlatList, ScrollView, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// SplashScreen.preventAutoHideAsync();

const OrderDetail = ({ route, navigate, navigation }, props) => {
    const [loaded] = useFonts({
        "Anuphan": require("../assets/fonts/Josefin_Sans/static/JosefinSans-Medium.ttf"),
        Anuphan: require("../assets/fonts/Anuphan/static/Anuphan-Medium.ttf")
    });

    if (!loaded) {
        return null;
    }
    const data = {
        date: route.params.date,
        time: route.params.time,
        pic: route.params.pic,
        title: route.params.title,
        price: route.params.price,
        total: route.params.total,
        amount: route.params.amount,
        numOrder: route.params.numOrder,
        address: route.params.address,
        addressName: route.params.addressName,
        phone: route.params.phone,
    }
    console.log(data)
    return (

        <SafeAreaView style={styles.container}>
            <ScrollView style={{ paddingHorizontal: 10 }}>
                <View style={{ marginTop: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                        <Text style={{ fontSize: 18, fontFamily: 'Anuphan' }}>Order No</Text>
                        <Text style={{ fontSize: 18, fontFamily: 'Anuphan' }}>{data.numOrder}</Text>
                    </View>
                    <View style={styles.seperator}/>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                        <Text style={{ fontSize: 18, fontFamily: 'Anuphan' }}>Placed on</Text>
                        <Text style={{ fontSize: 18, fontFamily: 'Anuphan' }}>{data.time}, {data.date}</Text>
                    </View>
                </View>
                <View style={styles.seperator}/>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Feather name="map-pin" size={24} color="black" />
                    <View style={{ marginLeft: 5, marginBottom: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold", fontFamily: 'Anuphan' }}>Ship to</Text>
                        <Text style={{ fontSize: 18, fontFamily: 'Anuphan' }}>{data.address}</Text>
                        <Text style={{ fontSize: 18, fontFamily: 'Anuphan' }}>{data.addressName} {data.phone}</Text>
                    </View>
                </View>
                <View style={styles.seperator}/>
                <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                    <Feather name="truck" size={24} color="black" />
                    <View style={{ marginLeft: 5 }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold", fontFamily: 'Anuphan' }}>Shipping</Text>
                        <Text style={{ fontSize: 18, fontFamily: 'Anuphan' }}>Flash</Text>
                    </View>
                </View>
                <View style={{ marginTop: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                        <Text style={{ fontSize: 18, fontFamily: 'Anuphan' }}>Price</Text>
                        <Text style={{ fontSize: 18, fontFamily: 'Anuphan' }}>{data.price} Baht</Text>
                    </View>
                    <View style={styles.seperator}/>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                        <Text style={{ fontSize: 18, fontFamily: 'Anuphan' }}>Shipping Fee</Text>
                        <Text style={{ fontSize: 18, fontFamily: 'Anuphan' }}>24 Baht</Text>
                    </View>
                    <View style={styles.seperator}/>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 22, fontFamily: 'Anuphan' }}>Total</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 22, fontFamily: 'Anuphan' }}>{data.total} Baht</Text>
                    </View>
                </View>

                <View style={styles.product}>
                    <Image style={{ width: 90, height: 90, borderColor: 'black', borderWidth: 1, }}
                        source={{ uri: data.pic }} resizeMode="contain"
                    />
                    <View style={{ marginLeft: 15 }}>
                        <Text style={{ fontSize: 20, fontFamily: 'Anuphan' }}>{data.title}{'\n'}x{data.price} Baht</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginHorizontal: 5, fontSize: 18 }}>Qty:{data.amount}</Text>
                        </View>
                    </View>
                </View>

            </ScrollView>
            <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                <Pressable style={styles.order} onPress={() => {
                    navigation.navigate('Home')}}>
                    <Text style={styles.textbutton}>Back to Home</Text>
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
    },
    product: {
        // flex: 1,
        flexDirection: 'row',
        marginTop: 20
    },
    order: {
        backgroundColor: "#9276F2",
        width: "100%",
        height: 60,
        justifyContent: "center",
        alignContent: "center"
    },
    textbutton: {
        fontWeight: "700",
        color: 'white',
        textAlign: 'center'
    },seperator: {
        height: 1,
        width: '100%',
        backgroundColor: '#ddd'
    }

});

export default OrderDetail
