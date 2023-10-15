import { StyleSheet, Text, View, Image, TextInput, FlatList, ScrollView, React, TouchableOpacity } from 'react-native';
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { AntDesign } from "@expo/vector-icons";

import { COMMENT } from "../data/dummy-data";
import comment from '../components/comment';

const DetailScreen = ({ navigation, route }) => {
    // const {title, pic} = route.params;
    // console.log('params')
    // console.log(route.params)
    // console.log(title)
    // console.log(route)
    // console.log(props)
    return (
        <ScrollView showsVerticalScrollIndicator={false} >
            <Image source={{ uri: route.params.pic }} style={{ width: '100%', height: responsiveHeight(40) }} />
            <View style={{ margin: 10, }}>
                <Text style={styles.title}>{route.params.title}</Text>
                <View style={{ flexDirection: 'row', marginTop: 5, }}>
                    <AntDesign name="star" size={25} color='#FFC400' />
                    <AntDesign name="star" size={25} color='#FFC400' />
                    <AntDesign name="star" size={25} color='#FFC400' />
                    <AntDesign name="star" size={25} color='#FFC400' />
                    <AntDesign name="star" size={25} color='#FFC400' />
                    {/* <Text style={{ fontSize: 16, bottom: 0 }}> prop.item.rate (5.0) </Text> */}
                </View>
                <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold', marginTop: 5 }}> {route.params.price} บาท </Text>

                <TouchableOpacity style={[styles.button]} onPress={() => {
                    navigation.navigate('Cart', {title:route.params.title, pic:route.params.pic, price:route.params.price})
                }}>
                    <Text style={styles.buttonText}>BUY</Text>
                </TouchableOpacity>

            </View>

            {/* store account */}
            <View style={{ borderBottomColor: '#aaa', borderBottomWidth: 1, paddingVertical: 7, flexDirection: 'row', alignItems: 'center', columnGap: 10, marginTop: 10 }}>
                <Image
                    source={{ uri: 'https://picsum.photos/200' }}
                    style={[styles.account, ]} />
                <Text style={{ fontSize: 20, fontWeight: '600', }}> Store Name </Text>
            </View>

            {/* Detail Product */}

            <View>
                <Text style={styles.header}>Description</Text>
                <Text style={styles.content}>

                    {route.params.detail}
                </Text>
            </View>
            <View style={{ borderTopWidth: 1, borderColor: 'gray', marginTop: 20 }}>
                <Text style={[styles.header,]}>Policy</Text>
                <Text style={[styles.content,]}>

                    {route.params.policy}
                </Text>
            </View>


            {/* comments */}

            <View style={{ marginTop: 30, }}>
                <Text style={[styles.header, {fontSize: 16}]}>Comments</Text>
                <TextInput style={styles.input}
                    multiline
                    numberOfLines={3}
                    maxLength={40} placeholder='Feedback'></TextInput>
            </View>

            <FlatList
                data={COMMENT}
                renderItem={comment}
                numColumns={1}
                keyExtractor={item => `${item.id}`}
            />

        </ScrollView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
        // margin: 5,
    },
    button: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: '20%',
        backgroundColor: '#9276F2',
        paddingVertical: 10
    },
    buttonText: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#fff'

    },
    input: {
        borderColor: "gray",
        width: "90%",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 5,
        backgroundColor: '#eee',
        fontSize: 16,
        height: responsiveHeight(10),
        marginHorizontal: '5%'
    },
    title: {
        fontSize: 30,
        fontWeight: 'light',
        textAlign: 'left'
    },
    header: {
        paddingHorizontal: 10,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
        marginTop: 20,
        marginBottom: 10
    },
    content: {
        paddingHorizontal: 10,
        fontSize: 16,
        fontWeight: 'light',
        textAlign: 'left',
        lineHeight: 20

    },
    account: {
        width: responsiveWidth(10),
        height: responsiveWidth(10),
        borderRadius: 50,
        marginLeft: 20,
    },
});


export default DetailScreen;