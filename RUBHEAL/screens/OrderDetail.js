import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, SafeAreaView, FlatList, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// SplashScreen.preventAutoHideAsync();

const OrderDetail = (props) => {
    const [loaded] = useFonts({
        "Josefin-Sans": require("../assets/fonts/Josefin_Sans/static/JosefinSans-Medium.ttf"),
        Anuphan: require("../assets/fonts/Anuphan/static/Anuphan-Medium.ttf")
    });

    if (!loaded) {
        return null;
    }

    const products = [
        { id: 1, name: "Pencil", price: 5 },
        { id: 2, name: "Notebook", price: 10 },
        { id: 3, name: "Eraser", price: 2 },
        { id: 4, name: "Sharpener", price: 7 },
    ]
    return (

        <SafeAreaView style={styles.container}>
            <View style={{ paddingHorizontal: 10 }}>
                <View style={{ marginTop: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 18, fontFamily: 'Anuphan' }}>หมายเลขคำสั่งซื้อ</Text>
                        <Text style={{ fontSize: 18, fontFamily: 'Anuphan' }}>11100234</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 18, fontFamily: 'Anuphan' }}>วันที่สั่งซื้อ</Text>
                        <Text style={{ fontSize: 18, fontFamily: 'Anuphan' }}>23:43, 16/9/2023</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <Feather name="map-pin" size={24} color="black" />
                    <View style={{ marginLeft: 5 }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold", fontFamily: 'Anuphan' }}>ที่อยู่สำหรับการจัดส่ง</Text>
                        <Text style={{ fontSize: 18, fontFamily: 'Anuphan' }}>ลาดกระบัง</Text>
                        <Text style={{ fontSize: 18, fontFamily: 'Josefin-Sans' }}>Aom 0949561292</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <Feather name="truck" size={24} color="black" />
                    <View style={{ marginLeft: 5 }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold", fontFamily: 'Anuphan' }}>ขนส่ง</Text>
                        <Text style={{ fontSize: 18, fontFamily: 'Josefin-Sans' }}>Flash</Text>
                    </View>
                </View>
                <View style={{ marginTop: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 18, fontFamily: 'Anuphan' }}>ราคา</Text>
                        <Text style={{ fontSize: 18, fontFamily: 'Anuphan' }}>24 บาท</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 18, fontFamily: 'Anuphan' }}>ค่าขนส่ง</Text>
                        <Text style={{ fontSize: 18, fontFamily: 'Anuphan' }}>24 บาท</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, fontFamily: 'Anuphan' }}>ทั้งหมด</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, fontFamily: 'Anuphan' }}>24 บาท</Text>
                    </View>
                </View>
                <FlatList data={products} keyExtractor={(item) => item.id} renderItem={({ item }) => {
                    return (
                        <View style={styles.product}>
                            <Image style={{ width: 90, height: 90, borderColor: 'black', borderWidth: 1, }}
                                source={require("../assets/crocs.png")} resizeMode="contain"
                            />
                            <View style={{ marginLeft: 15 }}>
                                <Text style={{ fontSize: 20, fontFamily: 'Josefin-Sans' }}>{item.name}{'\n'}x{item.price} บาท</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ marginHorizontal: 5, fontSize: 18 }}>1</Text>
                                </View>
                            </View>
                        </View>
                    )

                }}>
                </FlatList>
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
        // paddingTop: 10,
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

export default OrderDetail
