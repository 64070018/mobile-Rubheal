import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, SafeAreaView, FlatList, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// SplashScreen.preventAutoHideAsync();

const CartScreen = ({route, navigation}) => {
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
        { id: 5, name: "Sharpener", price: 7 },
    ]
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ padding: 10, marginBottom:50 }}>
                {products.map((item) => {
                    return (
                        <View key={item.id} style={styles.product}>
                            <Image style={{ width: 90, height: 90, borderColor: 'black', borderWidth: 1, }}
                                source={require("../assets/crocs.png")} resizeMode="contain"
                            />
                            <View style={{ marginLeft: 15 }}>
                                <Text style={{ fontSize: 20, fontFamily: 'Josefin-Sans' }}>{item.name}{'\n'}x{item.price} บาท</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <AntDesign name="minussquareo" size={30} color="black" />
                                    <Text style={{ marginHorizontal: 5, fontSize: 18 }}>1</Text>
                                    <AntDesign name="plussquareo" size={30} color="black" />
                                </View>
                            </View>
                        </View>
                    )

                })}
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
                <View style={{ marginVertical: 20 }}>
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
            </ScrollView>
            <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                <Button title="สั่งซื้อ" color="#9276F2" onPress={() => {
                    navigation.navigate('OrderDetail')
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
