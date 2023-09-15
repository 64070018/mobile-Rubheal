import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, SafeAreaView, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// SplashScreen.preventAutoHideAsync();

const CartScreen = (props) => {
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
            <View style={{paddingHorizontal:10}}>
                <FlatList data={products} keyExtractor={(item) => item.id} renderItem={({ item }) => {
                    return (
                        <View style={styles.product}>
                            <Image style={{ width: 90, height: 90, borderColor: 'black', borderWidth: 1, }}
                                source={require("../assets/crocs.png")} resizeMode="contain"
                            />
                            <View style={{ marginLeft: 15 }}>
                                <Text style={{ fontSize: 18, fontFamily:'Josefin-Sans' }}>{item.name}{'\n'}x{item.price} บาท</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <AntDesign name="minussquareo" size={30} color="black" />
                                    <Text style={{ marginHorizontal: 5, fontSize: 18 }}>1</Text>
                                    <AntDesign name="plussquareo" size={30} color="black" />
                                </View>
                            </View>
                        </View>
                    )

                }}>
                </FlatList>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <Feather name="map-pin" size={24} color="black" />
                    <View style={{ marginLeft: 5 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", fontFamily: 'Anuphan' }}>ที่อยู่สำหรับการจัดส่ง</Text>
                        <Text style={{ fontSize: 16, fontFamily: 'Anuphan' }}>ลาดกระบัง</Text>
                        <Text style={{ fontSize: 16, fontFamily:'Josefin-Sans' }}>Aom 0949561292</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <Feather name="truck" size={24} color="black" />
                    <View style={{ marginLeft: 5 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>ขนส่ง</Text>
                        <Text style={{ fontSize: 16, fontFamily:'Josefin-Sans' }}>Flash</Text>
                    </View>
                </View>
                <View style={{ marginTop: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 16 }}>ราคา</Text>
                        <Text style={{ fontSize: 16 }}>24 บาท</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 16 }}>ค่าขนส่ง</Text>
                        <Text style={{ fontSize: 16 }}>24 บาท</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontFamily: '',fontWeight: 'bold', fontSize: 18 }}>ทั้งหมด</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>24 บาท</Text>
                    </View>
                </View>
            </View>
            <View style={{position:'absolute', bottom:0, width: '100%'}}>
               <Button title="สั่งซื้อ" color="#9276F2"></Button> 
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
        // justifyContent: 'flex-start',
        // width: '90%',
        // borderColor: 'black', borderWidth: 1
        // height: 50,
    }

});

export default CartScreen
